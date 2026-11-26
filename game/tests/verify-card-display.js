// カード表示の数値が実際の効果（engine.applyEffects）と一致するかを全カードで検証する。
// ブラウザで: await (await import('/tests/verify-card-display.js')).run()
import * as E from '../engine.js?v=48';
import {resolveDiceEffects} from '../dice-rules.js?v=48';
import {cardLines} from '../presentation.js?v=48';

const sum = a => a.reduce((n, v) => n + v, 0);

function makeState(card, rng, relics) {
  const owner = E.cardOwner(card);
  const others = E.COMPANIONS ? [] : [];
  const s = E.fresh(12345 + Math.floor(rng() * 1e6), 'ember', rng() < .5, 'eda');
  const pool = ['eda', 'sena', 'nico', 'row', 'kai', 'rika', 'luca', 'orlo'].filter(id => id !== owner);
  s.party = [owner, pool[0], pool[1]];
  s.heroes = s.party.map(() => ({hp: 60, max: 80, shield: 0, power: 0, poison: 0, vulnerable: 0, regen: 0, thorns: 0}));
  s.relics = relics;
  s.gold = Math.floor(rng() * 400);
  s.fuel = Math.floor(rng() * 100);
  E.startBattle(s, 'battle');
  const b = s.battle;
  b.enemies = [b.enemies[0]];
  const e = b.enemies[0];
  e.index = 0; e.max = 10000; e.hp = rng() < .5 ? 10000 : 4000; e.shield = 0;
  e.weak = Math.floor(rng() * 3); e.stun = rng() < .3 ? 1 : 0; e.poison = Math.floor(rng() * 12);
  const me = s.heroes[0];
  me.power = Math.floor(rng() * 5); me.hp = rng() < .4 ? 30 : 70;
  b.cardsPlayed = Math.floor(rng() * 4);
  b.hand = [card, ...b.hand].slice(0, 6);
  return s;
}

export async function run({trials = 3, seed = 7} = {}) {
  let x = seed; const rng = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648;
  const relicIds = (await import('../catalog.js?v=48')).RELICS.map(r => r.id);
  const failures = []; let checked = 0, textErrors = 0;
  for (const id of Object.keys(E.CARDS || (await import('../catalog.js?v=48')).CARDS)) {
    const base = (await import('../catalog.js?v=48')).CARDS[id];
    if (base.status) continue;
    for (let t = 0; t < trials; t++) {
      const relics = Array.from({length: 1 + Math.floor(rng() * 6)}, () => relicIds[Math.floor(rng() * relicIds.length)]);
      const card = {id, up: 0, branches: [], uid: 9999};
      let s;
      try { s = makeState(card, rng, relics); } catch (err) { failures.push({id, err: 'state ' + err.message}); break; }
      const c = E.cardValues(card, s);
      const parts = c.components || [c];
      if (!parts.some(p => p.damage || p.aoe || p.poisonBurst)) continue;
      try { cardLines(card, s); } catch (err) { textErrors++; failures.push({id, err: 'text ' + err.message}); continue; }
      const enemy = s.battle.enemies[0];
      const actual = E.projectCardDamage(s, card, enemy);
      const faces = parts.some(p => p.dice) ? [1, 6] : [null];
      faces.forEach((face, fi) => {
        // previewCardHits は1パートずつ順に評価（弱点消費・HP減少を引き継ぐ）
        const sim = JSON.parse(JSON.stringify(s));
        let predicted = 0;
        for (const p of parts) {
          const resolved = p.dice ? resolveDiceEffects(p, p.dice * face) : p;
          const r = E.previewCardHits(sim, resolved);
          const got = sum(r.single) + sum(r.aoe) + sum(r.burst);
          predicted += got;
          const foe = sim.battle.enemies[0];
          // 次のパートのために状態を進める（実エンジンと同じく弱点・毒を消費）
          const hitsUsed = r.single.length + r.aoe.length + r.burst.length;
          foe.weak = Math.max(0, foe.weak - hitsUsed); if (resolved.poisonBurst) foe.poison = 0;
          foe.hp = Math.max(0, foe.hp - got);
          if (resolved.poison) foe.poison += resolved.poison; // poisonBurst順序の簡易追従
        }
        const real = face === null ? actual.damage : fi === 0 ? actual.minDamage ?? actual.damage : actual.maxDamage;
        checked++;
        if (predicted !== real) failures.push({id, face, predicted, real, relics, weak: enemy.weak, stun: enemy.stun, hp: enemy.hp});
      });
    }
  }
  return {checked, failures: failures.length, textErrors, sample: failures.slice(0, 15)};
}
