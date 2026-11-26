// Shared by combat resolution and the card description.
export const DICE_BALANCE=Object.freeze({singleAttack:2.5,areaAttack:1.75,heal:1.75,shield:1.75,extraDrawThreshold:6});
export function diceMultiplier(card){return (card.diceMultiplier??1)*(card.diceMode==='heal'?DICE_BALANCE.heal:card.diceMode==='shield'?DICE_BALANCE.shield:card.aoe?DICE_BALANCE.areaAttack:DICE_BALANCE.singleAttack)}
export function diceBonus(card,sum){return Math.floor(sum*(card.diceMultiplier??1)*(card.diceMode==='heal'?DICE_BALANCE.heal:card.diceMode==='shield'?DICE_BALANCE.shield:card.aoe?DICE_BALANCE.areaAttack:DICE_BALANCE.singleAttack))}

export function resolveDiceEffects(card,sum){const c={...card},bonus=diceBonus(c,sum);if(c.diceMode==='heal'){const k=c.allHeal?'allHeal':c.selfHeal?'selfHeal':'heal';c[k]=(c[k]||0)+bonus}else if(c.diceMode==='shield'){const k=c.allShield?'allShield':c.shield?'shield':'selfShield';c[k]=(c[k]||0)+bonus}else if(c.diceMode==='draw')c.draw=(c.draw||0)+(sum>=DICE_BALANCE.extraDrawThreshold?2:1);else{const k=c.aoe?'aoe':'damage';c[k]=(c[k]||0)+bonus}return c}
