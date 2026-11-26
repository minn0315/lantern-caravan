export const roundHP=value=>Math.round((value+Number.EPSILON)*10)/10;
export function normalizeHealth(state){if(!state)return;for(const unit of [...state.heroes||[],...state.battle?.enemies||[]]){if(Number.isFinite(unit.max))unit.max=roundHP(unit.max);if(Number.isFinite(unit.hp))unit.hp=roundHP(Math.max(0,Math.min(unit.max,unit.hp)))}}
