import {simplifyRelic,describeRelicEffect,relicEffectIsDrawback} from './simple-relics.js?v=52';
export const RELIC_RARITIES={common:{name:'コモン',weight:55},uncommon:{name:'アンコモン',weight:28},rare:{name:'レア',weight:14},legendary:{name:'レジェンド',weight:3}};
const levels=['common','uncommon','rare','legendary'];
// A boss reward changes how the deck plays; its price is always visible.
const bossPacts=[
 {energy:2,healMult:-.65}, {draw:3,attackCost:1}, {shieldTurn:9,carryShield:6,draw:-2},
 {attackMult:.45,attackSelfDamage:3}, {poison:4,poisonDraw:1,cardHealDisabled:1},
 {upgradeCostOffset:-1,attack:4,unupgradedCostOffset:1}, {linkEnergy:2,linkShield:8,energy:-1},
 {exhaustEnergy:2,firstDraw:2,enemyHP:.4}, {cheapAttack:7,firstEnergy:2,firstCardCostHP:4},
 {lateAttack:8,draw:2,firstCardCostHP:4}, {zeroPing:5,firstDraw:2,enemyAtk:4},
 {turnRegen:4,winHeal:8,campHealDisabled:1}, {goldMult:.8,shopDiscount:.2,enemyHP:.35},
 {carryEnergy:3,emptyEnergy:2,draw:-2}, {firstEnergy:3,firstShield:18,fuelCost:3},
 {block:5,carryShield:12,attackCost:1}, {firstWeak:3,attack:8,enemyAtk:6},
 {aoe:8,shieldTurn:4,noGold:1}, {revive:25,attack:6,nodeDamage:3}
];
const originalBossIds='bloodsun blackcrown ironheart hollowlantern goldcontract sacrificeseal frozenclock thorncrown fractureplate wildstar hungryidol deathbell oracleeye whiteash eclipseblade pilgrimking'.split(' ');
const originalPacts=[bossPacts[0],{draw:3,firstDraw:2,energy:-1},bossPacts[2],{energy:2,carryEnergy:2,fuelCost:3},bossPacts[12],bossPacts[3],{draw:2,thirdDraw:2,campHealDisabled:1},bossPacts[4],bossPacts[15],{energy:2,emptyEnergy:2,draw:-2},{maxHP:24,winHeal:6,nodeDamage:3},bossPacts[6],{draw:3,firstWeak:2,enemyHP:.4},{winHeal:16,turnRegen:2,noGold:1},{attackMult:.5,lateAttack:5,cardHealDisabled:1},bossPacts[5]];
function designBoss(r){
 const match=r.id.match(/^expansion_b_(\d+)_(\d+)$/),index=match?16+(Number(match[1])-1)*3+Number(match[2])-1:originalBossIds.indexOf(r.id),template=match?bossPacts[(index-16)%bossPacts.length]:originalPacts[index],n=[...r.id].reduce((n,c)=>n+c.charCodeAt(0),0)%20;
 r.rarity=n<9?'uncommon':n<17?'rare':'legendary';const rank=levels.indexOf(r.rarity)-1;
 r.effects={...template};const benefit=Object.entries(template).find(([k,v])=>!relicEffectIsDrawback(k,v)),[key,value]=benefit;
 // Rarity strengthens the defining benefit; the small set variant keeps IDs distinct.
 const variant=Math.floor(index/bossPacts.length),boost=rank+variant*.25;
 if(['energy','draw','upgradeCostOffset','linkEnergy','exhaustEnergy','carryEnergy','firstEnergy','firstWeak'].includes(key))r.effects[key]=value<0?value:value+Math.min(1,rank);
 else r.effects[key]=Number.isInteger(value)?value+Math.round(boost*(key==='revive'?3:2)):Math.round((value+boost*.05)*100)/100;
 const good=Object.entries(r.effects).filter(([k,v])=>!relicEffectIsDrawback(k,v)),bad=Object.entries(r.effects).filter(([k,v])=>relicEffectIsDrawback(k,v));
 r.desc=good.map(([k,v])=>describeRelicEffect(k,v)).join('');r.drawback=bad.map(([k,v])=>describeRelicEffect(k,v)).join('');r.family='gain:'+key;r.designVersion=2;return r;
}

const keys=['attack','block','heal','firstShield','winHeal','poison','aoe','goldFlat','campFuel','campHeal','linkShield','linkHeal','potionHeal','firstDraw','firstEnergy','carryShield','upgradeHeal','allHeal','eliteGold','bossHeal','turnRegen','firstWeak','thirdDraw','zeroPing'];
const units={attack:1,block:1,heal:1,firstShield:3,winHeal:2,poison:1,aoe:2,goldFlat:5,campFuel:5,campHeal:3,linkShield:2,linkHeal:2,potionHeal:4,firstDraw:1,firstEnergy:1,carryShield:3,upgradeHeal:2,allHeal:2,eliteGold:10,bossHeal:4,turnRegen:1,firstWeak:1,thirdDraw:1,zeroPing:2};
const sourceNames={deck:'デッキ',upgraded:'強化済みカード',relics:'所持レリック',gold:'所持銀貨',exhaust:'戦闘中の消滅札',discard:'捨札'};
const targetNames={attack:'攻撃威力',block:'カードで得る盾',heal:'回復カードの回復量',poison:'付与する毒',firstShield:'戦闘開始時の盾',goldFlat:'戦闘の銀貨報酬'};
export function designRelic(r){
 if(r.designVersion===2)return r;
 if(r.tier==='boss')return designBoss(r);
 if(r.tier==='normal'&&r.id.startsWith('expansion_n_')){
  const match=r.id.match(/_(\d+)_(\d+)$/),i=(Number(match[1])-1)*9+Number(match[2])-1,rank=i%10<5?0:i%10<8?1:i%10===8?2:3,key=keys[Math.floor(i/3)%keys.length],kind=i%3,amount=units[key]*(rank+1)+(Math.floor(i/(keys.length*3))%2)*units[key];
  r.rarity=levels[rank];r.effects={};r.scaling=undefined;r.drawback='';
  if(kind===0){r.effects[key]=amount;r.desc=describeRelicEffect(key,amount);r.family='gain:'+key}
  else if(kind===1){const costs=[['heal',-1],['firstCardCostHP',1],['fuelCost',1],['attackSelfDamage',1],['nodeDamage',1],['draw',-1]],cost=costs[Math.floor(i/3)%costs.length];r.effects[key]=amount+units[key];if(cost[0]===key)cost[0]='firstCardCostHP';r.effects[cost[0]]=cost[1];r.desc=describeRelicEffect(key,r.effects[key]);r.drawback=describeRelicEffect(cost[0],cost[1]);r.family='gain:'+key}
  else{const sources=['deck','upgraded','relics','gold','exhaust','discard'],targets=['attack','block','firstShield','heal','poison','goldFlat'],source=sources[Math.floor(i/3)%6],target=targets[Math.floor(i/18)%6],every=Math.max(1,({deck:8,upgraded:4,relics:5,gold:100,exhaust:3,discard:5}[source])+Math.floor(i/54)%3-rank),step=target==='firstShield'?2:target==='goldFlat'?3:1,cap=(2+rank)*step;
   r.scaling={source,target,every,amount:step,cap};r.desc=`${sourceNames[source]}${every}${source==='gold'?'枚':source==='relics'?'個':'枚'}につき、${targetNames[target]}+${step}（最大+${cap}）。`;r.family='gain:'+target}
  r.icon=['block','firstShield','carryShield','linkShield'].includes(key)?'shield':['goldFlat','eliteGold'].includes(key)?'coin':['heal','winHeal','potionHeal','campHeal'].includes(key)?'leaf':r.icon;
 }else{
  simplifyRelic(r);const benefit=Object.entries(r.effects).find(([k,v])=>!relicEffectIsDrawback(k,v));r.family='gain:'+benefit[0];
  if(r.tier==='special')r.rarity='legendary';
  else r.rarity=['draw','energy','revive'].includes(benefit[0])?'rare':'common';
 }
 r.designVersion=2;return r;
}
export function relicScalingBonus(r,s){if(!r.scaling)return null;const x=r.scaling,count=x.source==='deck'?s.deck.length:x.source==='upgraded'?s.deck.filter(c=>(c.ledger?.length||c.up||0)>0).length:x.source==='relics'?s.relics.length:x.source==='gold'?s.gold:x.source==='exhaust'?(s.battle?.exhaust?.length||0):(s.battle?.discard?.length||0);return{key:x.target,value:Math.min(x.cap,Math.floor(count/x.every)*x.amount)}}

export function relicBenefitFamilies(r){return [...new Set([r.family,...Object.entries(r.effects).filter(([k,v])=>!relicEffectIsDrawback(k,v)).map(([k])=>'gain:'+k)])]}
