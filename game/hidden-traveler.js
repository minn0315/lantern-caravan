import {COMPANIONS} from './catalog.js?v=52';
export function allNormalTravelersCollected(profile){const collected=new Set(profile?.collected||[]);return COMPANIONS.filter(h=>!h.hidden&&!h.blackparty).every(h=>collected.has(h.id))}
export function hiddenTravelerUnlocked(profile){return profile?.hiddenUnlocked===true&&profile.specials?.includes(150)&&allNormalTravelersCollected(profile)}
export function eligibleTraveler(state,id){const member=COMPANIONS.find(h=>h.id===id);if(!member)return false;if(member.blackparty)return !!COMPANIONS.find(h=>h.id===state.starterId)?.blackparty;return !member.hidden||hiddenTravelerUnlocked(state.codex)}
export function normalizeHiddenProgress(profile){if(!hiddenTravelerUnlocked(profile)){profile.hiddenUnlocked=false;profile.collected=(profile.collected||[]).filter(id=>!COMPANIONS.find(h=>h.id===id)?.hidden);if(profile.unlocked)delete profile.unlocked.secret}return profile}
