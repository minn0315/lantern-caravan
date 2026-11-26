// One understandable benefit; boss relics additionally have one explicit drawback.
const percent=n=>Math.round(Math.abs(n)*100);
const descriptions={
 firstEnergy:n=>`各戦闘の最初のターン、気力+${n}。`,winHeal:n=>`戦闘勝利時、全員のHPを${n}回復。`,draw:n=>`毎ターンの手札${n>0?'+':''}${n}。`,energy:n=>`毎ターンの気力${n>0?'+':''}${n}。`,
 linkHeal:n=>`連携するたび、全員のHPを${n}回復。`,attack:n=>`攻撃カードの威力+${n}。`,shieldTurn:n=>`毎ターン全員に盾${n}。`,campFuel:n=>`野営地での灯油回復+${n}。`,goldFlat:n=>`戦闘の銀貨報酬+${n}。`,firstShield:n=>`戦闘開始時、全員に盾${n}。`,campHeal:n=>`野営で休むと、HP回復+${n}。`,
 firstSkillDraw:n=>`毎ターン最初の策略カードで${n}枚引く。`,cheapAttack:n=>`1コストの攻撃カードの威力+${n}。`,heal:n=>`回復カードの回復量${n>0?'+':''}${n}。`,potionHeal:n=>`回復薬の回復量+${n}。`,firstDraw:n=>`最初のターン、手札+${n}。`,poison:n=>`付与する毒+${n}。`,weakBonus:n=>`弱点のある敵へのダメージが、さらに+${n}。`,maxHP:n=>`取得時、全員の最大HP+${n}、HP+${n}。`,goldMult:n=>`戦闘の銀貨報酬が${percent(n)}%増える。`,
 lateAttack:n=>`そのターン3枚目以降の攻撃の威力+${n}。`,aoe:n=>`全体攻撃の威力+${n}。`,block:n=>`カードで得る盾+${n}。`,linkShield:n=>`連携で得る盾が、さらに+${n}。`,linkEnergy:n=>`連携で得る気力+${n}。`,carryEnergy:n=>`使わなかった気力を最大${n}、次ターンに持ち越す。`,fuelCost:n=>`マス移動時の灯油消費${n>0?'+':''}${n}。`,shopDiscount:n=>`ショップの価格が${percent(n)}%安くなる。`,upgradeHeal:n=>`カード強化時、生存者全員のHPを${n}回復。`,
 revive:n=>`各戦闘で一度だけ、倒れる仲間をHP${n}で復帰させる。`,eliteGold:n=>`強敵勝利時、銀貨+${n}。`,mysteryLuck:n=>`未知のマスで、良い出来事の確率+${percent(n)}%。`,poisonDraw:n=>`毎ターン最初に毒を付与するカードで${n}枚引く。`,exhaustEnergy:n=>`毎ターン最初に消滅カードを使うと気力+${n}。`,turnRegen:n=>`毎ターン、生存者全員のHPを${n}回復。`,firstWeak:n=>`戦闘開始時、敵全員に弱点${n}。`,shopStock:n=>`ショップのカード陳列数+${n}。`,emptyEnergy:n=>`気力0でターンを終えると、次の気力+${n}。`,carryShield:n=>`仲間の盾を最大${n}、次ターンに持ち越す。`,bossHeal:n=>`章クリア時のHP回復+${n}。`,debuffWard:n=>`仲間が受ける毒・脆弱の量-${n}。`,allHeal:n=>`全体回復カードの回復量+${n}。`,zeroPing:n=>`0コストのカードを使うたび、ランダムな敵に${n}ダメージ。`,thirdDraw:n=>`3の倍数ターン、手札+${n}。`,attackMult:n=>`攻撃カードの威力が${percent(n)}%増える。`,upgradeCostOffset:n=>`強化済みカードの消費気力${n>0?'+':''}${n}。`,
 healMult:n=>`回復カード・回復薬の回復量が${percent(n)}%減る。`,enemyAtk:n=>`すべての敵の攻撃力+${n}。`,attackSelfDamage:n=>`攻撃カードを使うたび、使用者のHP-${n}。`,campHealDisabled:()=>`野営で休んでもHPが回復しない。`,attackCost:n=>`攻撃カードの消費気力+${n}。`,nodeDamage:n=>`マス移動時に全員のHP-${n}。`,firstCardCostHP:n=>`毎ターン最初のカードで、使用者のHP-${n}。`,enemyHP:n=>`敵の最大HPが${percent(n)}%増える。`,noGold:()=>`戦闘で銀貨を得られなくなる。`,cardHealDisabled:()=>`回復カードによるHP回復ができない。`,unupgradedCostOffset:n=>`未強化カードの消費気力+${n}。`
};
const positiveIsHarmful=new Set(['enemyAtk','attackSelfDamage','campHealDisabled','attackCost','nodeDamage','firstCardCostHP','enemyHP','noGold','cardHealDisabled','unupgradedCostOffset']);
export function relicEffectIsDrawback(key,value){return positiveIsHarmful.has(key)?value>0:['fuelCost','upgradeCostOffset'].includes(key)?value>0:value<0}
export function describeRelicEffect(key,value){if(!descriptions[key])throw Error('Unknown relic effect '+key);return descriptions[key](value)}
export function simplifyRelic(relic){
 if(relic.designVersion===2)return relic;
 const entries=Object.entries(relic.effects),benefit=entries.find(([key,value])=>!relicEffectIsDrawback(key,value)),cost=entries.find(([key,value])=>relicEffectIsDrawback(key,value));
 if(!benefit||!descriptions[benefit[0]])throw Error('Relic benefit has no description: '+relic.id);
 if(entries.length===(relic.tier==='boss'?2:1)&&(!cost||relic.tier==='boss'))return relic;
 const selected=[benefit];if(relic.tier==='boss'){if(!cost||!descriptions[cost[0]])throw Error('Boss relic has no explicit drawback: '+relic.id);selected.push(cost)}
 relic.effects=Object.fromEntries(selected);relic.desc=descriptions[benefit[0]](benefit[1]);relic.drawback=relic.tier==='boss'?descriptions[cost[0]](cost[1]):'';
 return relic;
}
