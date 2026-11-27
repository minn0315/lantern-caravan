// 敵の出現数の確認：序盤は仲間の人数どおり　途中からは人数に関係なく複数体
// ブラウザで: await (await import('/tests/verify-enemy-count.js')).run()
import * as E from '../engine.js?v=53';

function setup(seed, partySize, chapter, step) {
  const s = E.fresh(seed, 'ember', false, 'eda');
  const ids = ['eda', 'sena', 'nico'].slice(0, partySize);
  s.party = ids;
  s.heroes = ids.map(() => ({hp: 80, max: 80, shield: 0, power: 0, poison: 0, vulnerable: 0, regen: 0, thorns: 0}));
  s.chapter = chapter; s.step = step; s.tutorial = 1;
  return s;
}

function autoBattle(s) {
  for (let guard = 0; guard < 400 && s.phase === 'battle'; guard++) {
    const b = s.battle;
    const target = b.enemies.findIndex(e => e.hp > 0);
    let played = false;
    for (let i = 0; i < b.hand.length; i++) {
      const before = b.hand.length;
      try { E.play(s, i, Math.max(0, target), 0); } catch { continue; }
      if (b.hand.length !== before || s.phase !== 'battle') { played = true; break; }
    }
    E.checkBattle(s);
    if (s.phase !== 'battle') break;
    if (!played) { E.endTurn(s); E.checkBattle(s); }
  }
  return s.phase;
}

export async function run({seeds = 40} = {}) {
  const counts = {}, problems = [];
  for (const party of [1, 2, 3]) for (const chapter of [0, 1, 2, 3, 6]) for (const step of [0, 3, 6, 9]) for (const type of ['battle', 'elite', 'boss']) {
    const seen = new Set();
    for (let k = 0; k < 6; k++) {
      const s = setup(1000 + k, party, chapter, step);
      E.startBattle(s, type);
      const n = s.battle.enemies.length, treasure = s.battle.enemies.some(e => e.id === 'treasure_sprite');
      seen.add(n);
      const base = type === 'boss' ? 1 : Math.max(party, E.minimumEnemies(s, type)), expected = treasure && base === 1 ? 2 : base;
      if (n !== expected) problems.push({party, chapter, step, type, n, expected});
      if (s.battle.enemies.some((e, i) => e.index !== i)) problems.push({party, chapter, step, type, badIndex: true});
    }
    counts[`${type} 人数${party} 第${chapter + 1}ステージ ${step + 1}地点`] = [...seen].join('/');
  }
  // 1人パーティでの勝率（自動操作）：極端に詰まないことの目安
  const winRate = {};
  for (const chapter of [0, 1, 2]) for (const step of [2, 8]) {
    let wins = 0;
    for (let k = 0; k < seeds; k++) { const s = setup(5000 + k, 1, chapter, step); E.startBattle(s, 'battle'); if (autoBattle(s) !== 'battle' && s.heroes.some(h => h.hp > 0)) wins++; }
    winRate[`1人 第${chapter + 1}ステージ ${step + 1}地点`] = `${wins}/${seeds}`;
  }
  return {problems, counts, winRate};
}
