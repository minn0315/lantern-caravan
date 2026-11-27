import {treasureStats,treasureReward,treasureChance,TREASURE_ENEMY} from './enemy-traits.js?v=51';
import {eligibleTraveler,hiddenTravelerUnlocked,allNormalTravelersCollected} from './hidden-traveler.js?v=51';
import {enemyActionRange} from './enemy-actions.js?v=51';
import {roundHP,normalizeHealth} from './health.js?v=51';
import {stampFreshBalance} from './balance-runtime.js?v=51';
import {debugGod,maintainDebugGod,overrideDebugCard} from './debug-rules.js?v=51';
export {debugGod,maintainDebugGod};
import {endingInfo} from './endings.js?v=51';
import {RELIC_RARITIES,relicScalingBonus,relicBenefitFamilies} from './relic-design.js?v=51';
import {allNormalStartersUnlocked,recordProgress,emptyProgress} from './progress.js?v=51';
import {DEMON_CHAPTER,DEMON_SKILLS} from './demon-stage.js?v=51';
import {DICE_BALANCE,diceBonus,resolveDiceEffects} from './dice-rules.js?v=51';
import {GODDESS_GIFTS,forceGoddessEffect} from './goddess.js?v=51';
export {GODDESS_GIFTS};
import {EXPANDED_UPGRADE_IDS} from './upgrade-pool.js?v=51';
import {STORY_KINDS,STORY_LENGTH} from './story.js?v=51';
export {storyFrames} from './story.js?v=51';
import {HEROES,COMPANIONS,CHAPTERS,SPECIAL_CHAPTER,CARDS,RELICS,NORMAL_RELICS,BOSS_RELICS,SPECIAL_RELICS,ENEMIES,BOSSES,NODE_TYPES,EVENTS,MYSTERIES,STARTERS,STARTER_DECKS,RECRUIT_DECKS,MAOU_STARTERS,MAOU_NORMALS} from './catalog.js?v=51';
export {HEROES,COMPANIONS,CHAPTERS,SPECIAL_CHAPTER,CARDS,RELICS,NORMAL_RELICS,BOSS_RELICS,SPECIAL_RELICS,ENEMIES,BOSSES,NODE_TYPES,EVENTS,MYSTERIES,STARTERS,STARTER_DECKS,RECRUIT_DECKS};
export const MAX_UPGRADES=3;
export const isSpecialStage=s=>!s.demon?.active&&!!s.endless&&s.legacySpecialChapter!==s.chapter&&(s.chapter+1)%50===0;
export const regularIndex=s=>s.chapter-(s.endless?Math.floor((s.chapter+1)/50):0)+(s.skippedAbyss||0);
export const biomeIndex=s=>s.demon?.active?17:isSpecialStage(s)?16:((regularIndex(s)%16)+16)%16;
export const chapterInfo=s=>s.demon?.active?DEMON_CHAPTER:isSpecialStage(s)?SPECIAL_CHAPTER:CHAPTERS[biomeIndex(s)];
export const campaignLength=s=>s.hard||s.endless?16:4;
export const loopNumber=s=>Math.floor(s.chapter/16);

export function randomSeed(){let v=new Uint32Array(1);if(globalThis.crypto?.getRandomValues){crypto.getRandomValues(v);return v[0]}return (Date.now()^Math.floor(Math.random()*4294967296))>>>0}
function seedWords(seed){let a=seed>>>0;return Array.from({length:4},()=>{a=(a+0x9e3779b9)>>>0;let z=a;z=Math.imul(z^(z>>>16),0x21f0aaad);z=Math.imul(z^(z>>>15),0x735a2d97);return(z^(z>>>15))>>>0})}
const rotl=(a,k)=>((a<<k)|(a>>>(32-k)))>>>0;
export function randomWord(s){s.rngState??=seedWords(s.seed??s.initialSeed);let a=s.rngState,r=Math.imul(rotl(Math.imul(a[1],5),7),9)>>>0,t=a[1]<<9;a[2]^=a[0];a[3]^=a[1];a[1]^=a[2];a[0]^=a[3];a[2]^=t;a[3]=rotl(a[3],11);s.rngState=a.map(n=>n>>>0);return r}
export function rng(s){return randomWord(s)/4294967296}
export function randomInt(s,n){if(!n)return 0;let limit=Math.floor(4294967296/n)*n,r;do{r=randomWord(s)}while(r>=limit);return r%n}
export function pick(s,a){return a[randomInt(s,a.length)]}
export function shuffle(s,a){a=[...a];for(let i=a.length-1;i>0;i--){let j=randomInt(s,i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
export function has(s,id){return s.relics.includes(id)}
export function mods(s){let m={};for(let id of s.relics){let r=RELICS.find(r=>r.id===id);for(let[k,v]of Object.entries(r?.effects||{}))m[k]=(m[k]||0)+v;const scaled=r&&relicScalingBonus(r,s);if(scaled)m[scaled.key]=(m[scaled.key]||0)+scaled.value}return m}
export function heroInfo(s,i){return COMPANIONS.find(h=>h.id===s.party?.[i])||{id:null,name:'空席',job:'仲間を募集中',max:0,color:'#888',icon:'heart',art:0,bonus:{},passive:''}}
export function currentBoss(s){return BOSSES.find(b=>b.id===s.bossId)||BOSSES.find(b=>b.chapter===biomeIndex(s))}
export function storyBeat(s){return chapterInfo(s).beats[Math.min(3,Math.floor(Math.max(0,s.step+1)/3))]}
const baseHero=h=>({hp:h.max,max:h.max,shield:0,power:0,poison:0,vulnerable:0,regen:0,thorns:0});
export function fresh(seed=randomSeed(),doctrine='ember',hard=false,starter='eda',endless=false){
 if(!COMPANIONS.some(h=>h.id===starter))starter='eda';
 hard=hard||endless;let s={version:4,worldRevision:2,endless,seed:seed>>>0,initialSeed:seed>>>0,rngState:seedWords(seed),hard,started:Date.now(),elapsed:0,chapter:0,step:-1,lane:1,gold:75,fuel:100,potions:3,deck:STARTER_DECKS[starter].map((id,uid)=>({id,up:0,branches:[],uid})),nextUid:10,relics:[doctrine],relicCycles:{normal:{seen:[],cycle:1},boss:{seen:[],cycle:1}},starterId:starter,maxBonus:0,departed:[],party:[starter,null,null],heroes:[baseHero(COMPANIONS.find(h=>h.id===starter)),baseHero({max:0}),baseHero({max:0})],phase:'map',battle:null,log:[],visited:[],wins:0,cardBag:[],journal:[],notice:'',route:[],edges:[],routeX:[]};if(isBlack(starter)){s.deck=randomBorrowedDeck(s,starter,10).map((c,uid)=>({...c,uid}))}s.route=makeRoute(s);s.bossId=pick(s,BOSSES.filter(b=>b.chapter===0)).id;s.journal.push(storyBeat(s));return stampFreshBalance(s);
}
export function freshTeam(seed=randomSeed(),doctrine='ember',hard=false){let s=fresh(seed,doctrine,hard,'row');s.starterId=null;s.party=HEROES.map(h=>h.id);s.heroes=HEROES.map(baseHero);s.deck=['slash','slash','guard','guard','bash','rally','arrow','arrow','mark','rain','focus','spark','spark','heal','tonic','smoke'].map((id,uid)=>({id,up:0,branches:[],uid}));s.nextUid=16;return stampFreshBalance(s)}
export function canResumeRun(s){return !!s&&s.phase!=='lost'}
export function loseRun(s){if(debugGod(s)){maintainDebugGod(s);return false}if(s.phase==='lost')return false;s.phase='lost';delete s.travel;startStory(s,'defeat');return true}
export function startStory(s,kind,chapter=s.chapter){if(!STORY_KINDS.includes(kind)||kind==='chapter'&&chapter<1||kind==='ending'&&s.phase!=='won'||kind==='defeat'&&s.phase!=='lost')return false;s.cutscene={kind,chapter:kind==='intro'?0:chapter,index:0};return true}
export function advanceStory(s,direction=1){if(!s.cutscene||![1,-1].includes(direction))return false;s.cutscene.index=Math.max(0,s.cutscene.index+direction);if(s.cutscene.index>=STORY_LENGTH)finishStory(s);return true}
export function finishStory(s){if(!s.cutscene)return false;const key=`${s.cutscene.kind}:${s.cutscene.chapter}`;s.storiesSeen??=[];if(!s.storiesSeen.includes(key))s.storiesSeen.push(key);delete s.cutscene;return true}
export function rebuildGraph(s){
 s.routeX=s.route.map(row=>row.map((_,i)=>row.length===1?.5:(i+.4+rng(s)*.2)/row.length));
 s.edges=s.route.slice(0,-1).map((row,r)=>{
  let next=s.route[r+1],links=row.map((_,i)=>{let near=next.map((_,j)=>j).sort((a,b)=>Math.abs(s.routeX[r][i]-s.routeX[r+1][a])-Math.abs(s.routeX[r][i]-s.routeX[r+1][b]));return near.slice(0,rng(s)<.48?Math.min(2,next.length):1)});
  for(let j=0;j<next.length;j++)if(!links.some(a=>a.includes(j))){let source=row.map((_,i)=>i).sort((a,b)=>Math.abs(s.routeX[r][a]-s.routeX[r+1][j])-Math.abs(s.routeX[r][b]-s.routeX[r+1][j]))[0];links[source].push(j)}
  return links.map(a=>[...new Set(a)].sort((a,b)=>a-b));
 });
}
export const BLESSING_ROW=5;
export function hasBlessingStage(chapter,endless=false){const stage=chapter+1;if(endless&&stage%50===0)return true;return stage===2||stage>=4&&(stage-4)%3===0}
// Only the unvisited midpoint is adjusted; previous choices and RNG stay intact.
export function ensureBlessing(s){
 if(!hasBlessingStage(s.chapter,s.endless)||s.step>=BLESSING_ROW)return false;
 if(s.route[BLESSING_ROW]?.length===1&&s.route[BLESSING_ROW][0]==='blessing')return false;
 s.route[BLESSING_ROW]=['blessing'];s.routeX[BLESSING_ROW]=[.5];
 s.edges[BLESSING_ROW-1]=s.route[BLESSING_ROW-1].map(()=>[0]);
 s.edges[BLESSING_ROW]=[s.route[BLESSING_ROW+1].map((_,i)=>i)];
 if(s.travel?.row===BLESSING_ROW)s.travel.lane=0;return true;
}
export function blessingGold(s){return Math.min(600,200+50*s.chapter)}
const blessingKey=s=>`${s.chapter}:${s.step}`;
function canTakeBlessing(s){return s.phase==='blessing'&&!(s.blessingClaims||[]).includes(blessingKey(s))}
function takeBlessing(s,label){claimNode(s,'blessing');s.blessingClaims??=[];s.blessingClaims.push(blessingKey(s));s.journal.push(`第${s.chapter+1}章の祝福の宿場：${label}。`);s.phase='map';delete s.upgradeContext}
export function nextFreeCardUid(s){return (s.deck||[]).reduce((next,c)=>Number.isSafeInteger(c?.uid)&&c.uid>=0?Math.max(next,c.uid+1):next,Number.isSafeInteger(s.nextUid)&&s.nextUid>=0?s.nextUid:0)}
export function allocateCardUid(s){const uid=nextFreeCardUid(s);s.nextUid=uid+1;return uid}
export function copyBlessingCard(s,uid){if(!canTakeBlessing(s))return false;const card=s.deck.find(c=>c.uid===uid);if(!card||CARDS[card.id].special||CARDS[card.id].status)return false;const copy=JSON.parse(JSON.stringify(card));copy.uid=allocateCardUid(s);s.deck.push(copy);takeBlessing(s,CARDS[card.id].name+'をコピー');return true}
export function blessingChoice(s,choice){
 if(!canTakeBlessing(s))return false;
 if(choice==='copy')return s.deck.some(c=>!CARDS[c.id].special);
 if(choice==='upgrade'){if(!s.deck.some(c=>safeUpgradeVariants(c,s).length))return false;s.upgradeContext={source:'blessing'};return true}
 if(choice==='heal'){if(s.heroes.every(h=>h.hp===h.max))return false;for(const h of s.heroes)if(h.max>0){h.hp=h.max;h.poison=0;h.vulnerable=0}takeBlessing(s,'全員を全回復・復帰')}
 else if(choice==='gold'){s.gold+=blessingGold(s);takeBlessing(s,`銀貨${blessingGold(s)}枚`)}
 else if(choice==='fuel'){s.fuel=100;addPotions(s,3);s.gold+=80;takeBlessing(s,'灯油全補充・回復薬3個・銀貨80枚')}
 else return false;return true;
}
export function makeRoute(s){
 let weighted=['battle','battle','battle','battle','battle','elite','event','event','mystery','mystery','camp','shop','treasure','shrine','forge','recruit','goddess'];
 let route=Array.from({length:12},(_,row)=>Array.from({length:row===11?1:2+randomInt(s,4)},()=>row===11?'boss':row===0?'battle':pick(s,weighted)));
 for(let type of ['camp','camp','shop','elite']){let row=2+randomInt(s,8);route[row][randomInt(s,route[row].length)]=type}
 if(s.chapter===0&&s.party.filter(Boolean).length<3)for(let row of [2,5])route[row]=route[row].map(()=>'recruit');
 if(hasBlessingStage(s.chapter,s.endless))route[BLESSING_ROW]=['blessing'];
 s.route=route;rebuildGraph(s);return route;
}
export function reachable(s,row,lane){return !s.cutscene&&s.phase==='map'&&row===s.step+1&&lane>=0&&lane<s.route[row]?.length&&(s.step===-1||s.edges[s.step]?.[s.lane]?.includes(lane))}
export function escalationChance(s){return s.chapter===0&&s.step===0?0:Math.min(.4,Math.max(0,s.chapter*.105+s.step*.006-.025))}
export function mysteryGoodChance(s){return Math.max(.18,Math.min(.95,.7-s.chapter*.14-Math.max(0,s.step)*.006+(mods(s).mysteryLuck||0)))}
export function offerRelics(s,tier='normal',count=3){
 s.relicCycles??={normal:{seen:[],cycle:1},boss:{seen:[],cycle:1}};const tracker=s.relicCycles[tier]??={seen:[],cycle:1},pool=(tier==='special'?SPECIAL_RELICS:tier==='boss'?BOSS_RELICS:NORMAL_RELICS).filter(r=>!has(s,r.id)),result=[],families=new Set();
 while(result.length<Math.min(count,pool.length)){
  let unseen=pool.filter(r=>!tracker.seen.includes(r.id)&&!result.includes(r.id));if(!unseen.length){tracker.seen=[];tracker.cycle++;unseen=pool.filter(r=>!result.includes(r.id))}
  const available=unseen.filter(r=>!relicBenefitFamilies(r).some(f=>families.has(f)));if(!available.length)break;
  const rarities=Object.keys(RELIC_RARITIES).filter(key=>available.some(r=>r.rarity===key)),weight=key=>tier==='boss'?({common:0,uncommon:45,rare:40,legendary:15}[key]):RELIC_RARITIES[key].weight;
  let roll=rng(s)*rarities.reduce((n,key)=>n+weight(key),0),rarity=rarities.at(-1);for(const key of rarities){roll-=weight(key);if(roll<0){rarity=key;break}}
  const r=pick(s,available.filter(r=>r.rarity===rarity));result.push(r.id);relicBenefitFamilies(r).forEach(f=>families.add(f));tracker.seen.push(r.id);
 }return result;
}
export function ensureRelicOfferDiversity(s){
 const repair=(ids,tier)=>{const families=new Set(),result=[];for(const id of ids){const r=RELICS.find(r=>r.id===id);if(!r||relicBenefitFamilies(r).some(f=>families.has(f)))continue;relicBenefitFamilies(r).forEach(f=>families.add(f));result.push(id)}let tries=0;while(result.length<ids.length&&tries++<8){const candidates=offerRelics(s,tier,3);for(const id of candidates){const r=RELICS.find(r=>r.id===id);if(!relicBenefitFamilies(r).some(f=>families.has(f))){relicBenefitFamilies(r).forEach(f=>families.add(f));result.push(id);if(result.length===ids.length)break}}}return result};
 if(s.phase==='reward'&&s.reward&&!s.reward.relicClaimed)s.reward.offeredRelics=repair(s.reward.offeredRelics,s.reward.tier);
 if(s.phase==='relic'&&s.relicOffer&&!s.relicOffer.relicClaimed)s.relicOffer.offeredRelics=repair(s.relicOffer.offeredRelics,s.relicOffer.tier);
 if(s.phase==='shop'&&s.shopRelics){const ids=repair(s.shopRelics.map(r=>r.id),'normal');s.shopRelics=ids.map((id,i)=>({id,price:s.shopRelics[i]?.price||190}))}
}
export function addRelic(s,id){let r=RELICS.find(r=>r.id===id);if(!r||has(s,id))return false;s.relics.push(id);if(r.effects.maxHP)s.heroes.filter(h=>h.max>0).forEach(h=>{h.max+=r.effects.maxHP;if(h.hp)h.hp+=r.effects.maxHP});if(r.effects.pickupPotion)addPotions(s,r.effects.pickupPotion);return true}
export function addPotions(s,n){const before=Math.min(3,s.potions);s.potions=Math.min(3,Math.max(0,before+n));return s.potions-before}
export function shuffleDraw(s,cards){const mixed=shuffle(s,cards);return [...mixed.filter(c=>CARDS[c.id].special),...mixed.filter(c=>!CARDS[c.id].special)]}
export function offeredCard(s,id){return JSON.parse(JSON.stringify(s.offeredCards?.[id]||{id,up:0,branches:[]}))}
export function acquireCard(s,id){if(!CARDS[id]||CARDS[id].status)return false;let card=offeredCard(s,id),uid=allocateCardUid(s);if(CARDS[id].special)s.deck=s.deck.filter(c=>!CARDS[c.id].special);s.deck.push({...card,...(!card.owner&&!s.party.includes(CARDS[id].owner)?{owner:s.party[CARDS[id].actor]}:{}),uid});return true}
export function buyCard(s,index){let id=s.stock?.[index],price=shopPrice(s,40);if(s.phase!=='shop'||!id||s.gold<price)return false;s.gold-=price;acquireCard(s,id);s.stock.splice(index,1);maintainDebugGod(s);return true}
export const MAOU_REFUND_CAP=10,MAOU_REPEAT_COST=2;
export function cardOwner(card){return card.owner||CARDS[card.id]?.owner}
// まおう（blackparty）：全旅人のカードを「借り物」として使う
const isBlack=id=>!!COMPANIONS.find(h=>h.id===id)?.blackparty;
const borrowableOwner=id=>{const h=COMPANIONS.find(h=>h.id===id);return !!h&&!h.hidden&&!h.blackparty};
export function originOwner(card){return CARDS[card.id]?.owner}
function borrowPool(kind){if(kind==='starter')return[...new Set(COMPANIONS.filter(h=>borrowableOwner(h.id)).flatMap(h=>STARTER_DECKS[h.id]||[])),...MAOU_STARTERS];return[...Object.keys(CARDS).filter(id=>!CARDS[id].status&&!CARDS[id].special&&borrowableOwner(CARDS[id].owner)),...MAOU_NORMALS]}
export function randomBorrowedDeck(s,holder,count,kind='starter'){const pool=borrowPool(kind);return Array.from({length:count},()=>({id:pick(s,pool),up:0,branches:[],owner:holder}))}
export function offerCards(s,count=3){let eligible=Object.keys(CARDS).filter(id=>!CARDS[id].status&&!CARDS[id].special&&s.party.includes(CARDS[id].owner)),special=Object.keys(CARDS).filter(id=>CARDS[id].special&&s.party.includes(CARDS[id].owner)),result=[];s.offeredCards={};s.cardBag=(s.cardBag||[]).filter(id=>eligible.includes(id));const black=s.party.filter(id=>id&&isBlack(id)),members=s.party.filter(Boolean).length||1,borrow=black.length?borrowPool('normal'):[];let guard=0;while(result.length<Math.min(count,eligible.length+borrow.length)&&guard++<200){let id,holder=null;if(special.length&&rng(s)<.045)id=pick(s,special.filter(id=>!result.includes(id)));else if(black.length&&rng(s)<black.length/members){id=pick(s,borrow);holder=pick(s,black)}else{if(!s.cardBag.length)s.cardBag=shuffle(s,eligible);id=s.cardBag.pop()}if(!id||result.includes(id))continue;result.push(id);const card={id,up:0,branches:[],...(holder&&CARDS[id].owner!==holder?{owner:holder}:{})};if(!CARDS[id].special&&rng(s)<.065){const amount=rng(s)<.2?2:1;card.rarity='upgraded';for(let i=0;i<amount;i++){const safe=safeUpgradeVariants(card,s);card.branches.push(pick(s,safe).id);card.up++}}s.offeredCards[id]=card}return result}
export function shopPrice(s,base){return Math.max(1,Math.round(base*(1-Math.min(.5,mods(s).shopDiscount||0))))}
export function removePrice(s){return shopPrice(s,35+(s.shopRemovals||0)*25)}
export function upgradeVariants(card){
 if(CARDS[card.id]?.noUpgrade)return[];
 const values=cardValues(card),c=values.components?.[0]||values,base=CARDS[card.id],normal=EXPANDED_UPGRADE_IDS.map(id=>({id,weight:1}));
 const eligible={relief_debuff:(c.selfPoison||0)>0||(c.selfVulnerable||0)>0,relief_hp:(c.selfCost||0)>0,relief_cost:c.cost>base.cost,relief_effect:Object.keys(base).some(k=>!['actor','cost','selfCost'].includes(k)&&typeof base[k]==='number'&&base[k]>0&&typeof c[k]==='number'&&c[k]<base[k])};
 for(const [id,yes]of Object.entries(eligible))if(yes)normal.push({id,weight:5});return normal;
}
export function upgradeLedger(card){return card.ledger?card.ledger.map(entry=>({...entry})):(card.branches?.length?card.branches:Array.from({length:card.up||0},()=>card.branch||'power')).map((id,i)=>({id,potency:card.potencies?.[i]||1,paid:true}))}
export function withUpgrade(card,branch,potency=1,gift){const next={...card,up:card.up+1,branches:[...(card.branches||[]),branch],potencies:[...(card.potencies||Array(card.up||0).fill(1)),potency]};if(card.ledger||gift)next.ledger=[...upgradeLedger(card),{id:branch,potency,paid:true,...(gift?{gift}:{})}];return next}
export function hasUpgradeDrawback(before,after){
 if(after.cost>before.cost||!before.exhaust&&after.exhaust)return true;
 for(const k of ['selfCost','selfPoison','selfVulnerable','goldSpend','fuelCost'])if((after[k]||0)>(before[k]||0))return true;
 for(const [k,v]of Object.entries(before)){
  if(['cost','selfCost','selfPoison','selfVulnerable','goldSpend','fuelCost','goldScale','actor'].includes(k))continue;
  if(typeof v==='number'&&(after[k]??0)<v)return true;
  if(typeof v==='boolean'&&v&&k!=='exhaust'&&!after[k])return true;
 }
 return !!(before.goldScale&&after.goldScale>before.goldScale);
}
export function isSafeUpgrade(card,branch,s,potency=1){
 const before=cardValues(card),after=cardValues(withUpgrade(card,branch,potency));
 if(!after||hasUpgradeDrawback(before,after))return false;
 if(s&&cardValues(withUpgrade(card,branch,potency),s).cost>cardValues(card,s).cost)return false;
 return JSON.stringify(before)!==JSON.stringify(after);
}
export function weightedUpgradeVariants(card,variants=upgradeVariants(card),gift){
 const before=cardValues(card);
 return variants.map(v=>({...v,weight:v.weight*(hasUpgradeDrawback(before,cardValues(withUpgrade(card,v.id,1,gift)))?1.25:1)}));
}
function pickUpgrade(s,card,variants,gift,boost=true){
 const pool=boost?weightedUpgradeVariants(card,variants,gift):variants;
 let roll=rng(s)*pool.reduce((n,v)=>n+v.weight,0);
 for(const v of pool){roll-=v.weight;if(roll<0)return v.id}return pool.at(-1).id;
}
export function safeUpgradeVariants(card,s,potency=1){return card.up>=3?[]:upgradeVariants(card).filter(v=>isSafeUpgrade(card,v.id,s,potency))}
export function upgradeOffer(s,uid){let card=s.deck.find(c=>c.uid===uid);if(!card||card.up>=3)return null;s.upgradeOffers??={};let safe=['blessing','cycle'].includes(s.phase),potency=s.phase==='cycle'?2:1,key=`${s.phase==='shopupgrade'?'shop'+s.shopForge.roll+':':s.phase==='cycle'?'double:':safe?'safe:':''}${s.chapter}:${s.step}:${uid}:${card.up}`;if(!s.upgradeOffers[key]){let variants=safe?safeUpgradeVariants(card,s,potency):upgradeVariants(card);if(!variants.length)return null;s.upgradeOffers[key]=pickUpgrade(s,card,variants,undefined,!safe)}let variant=s.upgradeOffers[key],after=withUpgrade(card,variant,potency);return{group:CARDS[card.id].upgrades[variant].group||'legacy',variant,name:CARDS[card.id].upgrades[variant].name,rare:!!CARDS[card.id].upgrades[variant].rare,safe,potency,before:card,after}}
export function shopUpgradePrice(s,card){return s.shopForge?.price??shopForgePrice(s)}
function setupShop(s){s.stock=offerCards(s,3+(mods(s).shopStock||0));s.shopRelics=offerRelics(s,'normal',2).map(id=>({id,price:shopPrice(s,190+randomInt(s,61))}));s.shopRemovals=0;s.shopUpgrades=0;delete s.shopForge;s.phase='shop'}
export function enter(s,row,lane){
 if(!reachable(s,row,lane)||(s.nodeClaims||[]).includes(`${s.chapter}:${row}:${lane}:${s.route[row][lane]}`))return false;s.step=row;s.lane=lane;s.visited.push([s.chapter,row,lane]);s.notice='';s.escalated=false;
 let m=mods(s);s.fuel=Math.max(0,s.fuel-Math.max(1,2+(m.fuelCost||0)));let harm=(s.fuel===0?5:0)+(m.nodeDamage||0);if(harm&&!debugGod(s))s.heroes.forEach(h=>h.hp=Math.max(0,h.hp-harm));
 if(s.heroes.every(h=>!h.hp)){loseRun(s);return true}
 if(row%3===0&&!s.journal.includes(storyBeat(s)))s.journal.push(storyBeat(s));let type=s.route[row][lane];s.nodeType=type;
 if(type==='battle'&&rng(s)<escalationChance(s)){type='elite';s.escalated=true;s.notice='通常の道に強敵が出現した！'}
 if(['battle','elite','boss'].includes(type))startBattle(s,type);
 else if(type==='shop')setupShop(s);
 else if(type==='event'){s.phase='event';s.event=randomInt(s,EVENTS.length)}
 else if(type==='mystery'){s.phase='mystery';let good=rng(s)<mysteryGoodChance(s);s.mystery=pick(s,MYSTERIES.filter(e=>(e.kind==='good')===good)).effect}
 else if(type==='recruit'){s.phase='recruit';s.recruits=shuffle(s,COMPANIONS.filter(h=>eligibleTraveler(s,h.id)&&!s.party.includes(h.id)&&!(s.departed||[]).includes(h.id))).slice(0,3).map(h=>h.id)}
 else if(type==='goddess')startGoddess(s);
 else if(type==='treasure'){s.phase='incident';s.incident={title:'巡礼者の宝箱',text:'置き去りにされた物資が旅を支えてくれる。',effect:'treasure',resolved:false}}
 else s.phase=type;
 maintainDebugGod(s);return true;
}
function applyRawUpgrade(c,base,branch){
 if(branch==='relief_debuff'){c.selfPoison=Math.max(0,(c.selfPoison||0)-2);c.selfVulnerable=Math.max(0,(c.selfVulnerable||0)-2);return}
 if(branch==='relief_hp'){c.selfCost=Math.max(0,(c.selfCost||0)-4);return}
 if(branch==='relief_cost'){c.cost=Math.max(base.cost,c.cost-1);return}
 if(branch==='relief_effect'){const k=Object.keys(base).find(k=>!['actor','cost','selfCost'].includes(k)&&typeof base[k]==='number'&&base[k]>0&&typeof c[k]==='number'&&c[k]<base[k]);if(k)c[k]=Math.min(base[k],c[k]+4);return}
 let upgrade=base.upgrades?.[branch]||base.upgrades?.power;if(!upgrade)return;let changed=false;
 for(let[k,v]of Object.entries(upgrade)){if(k==='name'||k==='rare'||k==='group')continue;let previous=c[k];if(typeof v==='number'){let delta=v-(typeof base[k]==='number'?base[k]:0);c[k]=Math.max(k==='cost'||k==='selfCost'?0:(typeof base[k]==='number'&&base[k]>0?1:0),(c[k]||0)+delta)}else c[k]=v;if(c[k]!==previous)changed=true}if(!changed)c.draw=(c.draw||0)+1;
}
export function hasUpgradeBenefit(before,after,s,level=1){const m=s?mods(s):{},role=s?s.party.indexOf(before.owner):-1,bonus=role>=0?heroInfo(s,role).bonus:{};
 const cost=(c,up)=>Math.max(0,c.cost+(c.type==='攻撃'?(m.attackCost||0):0)+(up?(m.upgradeCostOffset||0):(m.unupgradedCostOffset||0)));
 if(cost(after,true)<cost(before,level>1))return true;
 for(const key of ['selfCost','selfPoison','selfVulnerable','goldSpend','fuelCost'])if((after[key]||0)<(before[key]||0))return true;
 if(before.goldScale&&(after.goldScale||before.goldScale)<before.goldScale)return true;if(before.exhaust&&!after.exhaust)return true;
 for(const key of ['draw','nextDraw','energy','nextEnergy','shield','selfShield','allShield','power','targetPower','allPower','regen','allRegen','thorns','poison','allPoison','weak','allWeak','stun','allStun','attackDown','poisonMultiplier','poisonBurst','lowBonus','selfLowBonus','weakBonus','goldGain','dice','diceMultiplier','armorRatio','exhaustScale','handScale','woundedScale','discardScale','chainScale','harmonyScale','fallenScale','upgradeScale','thornsRatio'])if(!(['regen','allRegen'].includes(key)&&m.cardHealDisabled)&&(after[key]||0)>(before[key]||0))return true;
 for(const key of ['heal','selfHeal','allHeal']){if(m.cardHealDisabled||1+(m.healMult||0)<=0)continue;const effective=c=>c[key]?Math.max(0,Math.floor((c[key]+(m.heal||0)+(bonus.heal||0))*Math.max(0,1+(m.healMult||0)))):0;if(effective(after)>effective(before))return true}
 for(const key of ['damage','aoe'])if((after[key]||0)*(after.hits||1)>(before[key]||0)*(before.hits||1))return true;
 for(const key of ['ignoreShield','stripShield','cleanse','selfCleanse','allCleanse','revive','redirect'])if(after[key]&&!before[key])return true;return false;
}
// Every source uses one bounded upgrade step. Cycle potency repeats this step twice.
const upgradeCaps={damage:3,aoe:3,shield:4,selfShield:3,allShield:2,heal:3,selfHeal:3,allHeal:2,poison:2,allPoison:1,power:1,targetPower:1,allPower:1,regen:1,allRegen:1,thorns:2,draw:1,nextDraw:1,energy:1,nextEnergy:1,weak:1,allWeak:1,stun:1,allStun:1,attackDown:1,goldGain:4,dice:1,diceMultiplier:.15,hits:1,poisonBurst:1,poisonMultiplier:.25,armorRatio:.1,exhaustScale:1,handScale:1,woundedScale:1,discardScale:1,chainScale:1,harmonyScale:1,fallenScale:1,upgradeScale:1,thornsRatio:.1};
const upgradeWeights={damage:1,aoe:2,shield:1,selfShield:1,allShield:2,heal:1,selfHeal:1,allHeal:2,poison:2,allPoison:4,power:4,targetPower:4,allPower:6,regen:3,allRegen:6,thorns:2,draw:6,nextDraw:4,energy:6,nextEnergy:4,weak:3,allWeak:6,stun:6,allStun:6,attackDown:3,goldGain:1,dice:6,diceMultiplier:32,hits:6,poisonBurst:4,poisonMultiplier:12,armorRatio:20,exhaustScale:3,handScale:3,woundedScale:3,discardScale:3,chainScale:3,harmonyScale:3,fallenScale:3,upgradeScale:3,thornsRatio:20};
const giftField={draw:'draw',power:'power',shield:'selfShield',heal:'selfHeal',allshield:'allShield',allheal:'allHeal',poison:'allPoison',weak:'allWeak',stun:'allStun',energy:'energy',next:'nextEnergy',foresee:'nextDraw',rally:'allPower',cleanse:'selfCleanse',pierce:'ignoreShield',break:'stripShield',hits:'hits',silver:'goldGain',regen:'allRegen'};
function boundedUpgrade(c,before,gift,branch,base){
 for(const [key,cap]of Object.entries(upgradeCaps))if(typeof c[key]==='number'){const old=key==='hits'?(before.hits||1):key==='diceMultiplier'?(before.diceMultiplier??1):(before[key]||0);c[key]=old+Math.max(-Math.min(cap,2),Math.min(cap,c[key]-old))}
 c.cost=Math.max(0,Math.max(before.cost-1,Math.min(before.cost+1,c.cost)));
 for(const [key,cap]of Object.entries({selfCost:2,selfPoison:1,selfVulnerable:1,goldSpend:4,fuelCost:2}))if(typeof c[key]==='number'){const old=before[key]||0;c[key]=Math.max(0,old+Math.max(-cap,Math.min(cap,c[key]-old)))}
 if(before.goldScale&&c.goldScale)c.goldScale=Math.max(10,before.goldScale+Math.max(-5,Math.min(5,c.goldScale-before.goldScale)));
 let budget=6+Math.min(2,Math.max(0,c.cost-before.cost)*2+Math.max(0,(c.selfCost||0)-(before.selfCost||0))*.5);
 const booleanKeys=['ignoreShield','stripShield','cleanse','selfCleanse','allCleanse','revive','redirect'];
 const primary=['damage','aoe','shield','allShield','heal','allHeal','selfShield','selfHeal','poison','allPoison','draw','energy','weak','targetPower','regen','allRegen','nextEnergy'].find(k=>base[k])||'draw';
 const commonFocus=['selfShield','selfHeal','draw','nextDraw','nextEnergy','energy','power','allShield','allHeal','allPower','allRegen','selfCleanse','allCleanse','cost','exhaust',primary,'goldGain','allPoison','allWeak','allStun'];
 const signatureFocus=[primary,primary,primary,primary,'draw','nextEnergy','selfShield','allShield','cost','power',base.target==='hero'?'targetPower':base.target==='all'?'allPoison':'poison',base.target==='hero'?'thorns':base.target==='all'?'allWeak':'weak',base.target==='hero'?'regen':base.target==='all'?'allStun':'stun','power','selfHeal',primary,'energy','exhaust','selfCleanse','allPower'];
 const match=/^(common|signature)_(\d{3})$/.exec(branch),diceFocus=base.dice&&match?.[1]==='signature'&&Number(match[2])>=225?(Math.floor(Number(match[2])/15)%2===0&&base.diceMode!=='draw'?'diceMultiplier':'dice'):null,focus=diceFocus||(match?(match[1]==='common'?commonFocus:signatureFocus)[Math.floor(Number(match[2])/15)]:primary);
 const selected=gift==='damage'?(before.aoe?'aoe':'damage'):gift==='cost'?'cost':gift==='permanent'?'exhaust':giftField[gift]||focus;
 const fields=[...new Set([selected,'cost','exhaust',...booleanKeys,...Object.keys(upgradeCaps)])].filter(Boolean);
 // A chosen goddess benefit gets first claim; other benefits share the remaining budget.
 for(const key of fields){
  if(key==='cost'){if(c.cost<before.cost){if(budget>=6)budget-=6;else c.cost=before.cost}continue}
  if(key==='exhaust'){if(before.exhaust&&!c.exhaust){if(budget>=6)budget-=6;else c.exhaust=true}continue}
  if(booleanKeys.includes(key)){if(c[key]&&!before[key]){if(budget>=6)budget-=6;else c[key]=false}continue}
  const old=key==='hits'?(before.hits||1):key==='diceMultiplier'?(before.diceMultiplier??1):(before[key]||0),delta=(c[key]??old)-old;if(delta<=0)continue;
  const weight=(upgradeWeights[key]||1)*(key==='damage'||key==='aoe'?(before.hits||1):1),step=Number.isInteger(delta)?1:.05;
  const allowed=Math.min(delta,Math.floor((budget/weight+1e-8)/step)*step);c[key]=old+allowed;budget=Math.max(0,budget-allowed*weight);
 }
 // One extra hit cannot multiply an already powerful card's total output unchecked.
 for(const key of ['damage','aoe'])if(c[key]){const oldTotal=(before[key]||0)*(before.hits||1),cap=key==='aoe'?3:3;c[key]=Math.min(c[key],Math.floor((oldTotal+cap)/(c.hits||1)))}
}
function applyUpgrade(c,base,branch,s,level,gift){const before={...c};applyRawUpgrade(c,base,branch);if(gift)forceGoddessEffect(c,before,gift);if(base.upgradePolicy!=='custom')boundedUpgrade(c,before,gift,branch,base);if(!hasUpgradeBenefit(before,c,s,level)){c.draw=Math.max(c.draw||0,before.draw||0)+1;c.upgradeCompensation=(c.upgradeCompensation||0)+1}
 // New free draw/energy engines must be one-use; removing exhaust instead costs one energy.
 const freeEngine=c.cost===0&&((c.draw||0)>(before.draw||0)||(c.energy||0)>(before.energy||0)||(before.cost>0||before.exhaust&&!c.exhaust)&&((c.draw||0)>0||(c.energy||0)>0));
 if(freeEngine&&!c.exhaust){if(gift==='permanent'||before.exhaust&&gift!=='cost')c.cost=1;else c.exhaust=true}
 if(!hasUpgradeBenefit(before,c,s,level)){c.selfShield=Math.max(c.selfShield||0,before.selfShield||0)+1;c.upgradeCompensation=(c.upgradeCompensation||0)+1}
}
export function cardValues(card,s){
 const base=CARDS[card.id];if(!base)return null;let c={...base};delete c.upgrades;
 let components=card.fusion?card.fusion.parts.flatMap(p=>{let v=cardValues(p);return v.components||[v]}):null;
 if(components)c={...components[0]};
 const history=upgradeLedger(card),effectiveUp=history.length;
 history.forEach((entry,i)=>{for(let n=0;n<entry.potency;n++){if(components&&entry.gift==='permanent')c.exhaust=!!c.exhaust||components.some(p=>p.exhaust);applyUpgrade(c,base,entry.id,s,i+1,entry.gift);if(components&&entry.gift==='permanent'){for(const part of components)part.exhaust=false;const parts=[c,...components.slice(1)];if(parts.reduce((n,p)=>n+p.cost,0)===0&&parts.some(p=>(p.draw||0)>0||(p.energy||0)>0))c.cost=1}}});
 if(components){
  components[0]=c;const list=components;const enemy=list.some(v=>!v.target),hero=list.some(v=>v.target==='hero'||v.target==='dual');
  const combined={...c,name:'合成：'+list.map(v=>v.name.slice(0,5)).join('×'),cost:list.reduce((n,v)=>n+v.cost,0),target:enemy&&hero?'dual':enemy?undefined:hero?'hero':'all',components:list,fused:true,exhaust:list.some(v=>v.exhaust),revive:list.some(v=>v.revive),type:list.some(v=>v.type==='攻撃')?'攻撃':list.some(v=>v.type==='回復')?'回復':'策略'};
  for(const key of ['damage','aoe','shield','allShield','selfShield','heal','allHeal','selfHeal','power','targetPower','allPower','poison','allPoison','draw','energy','nextEnergy','nextDraw','selfCost','selfPoison','selfVulnerable'])combined[key]=list.reduce((n,v)=>n+(v[key]||0)*(['damage','aoe'].includes(key)?v.hits||1:1),0);
  combined.hits=1;c=combined;
 }
 c=overrideDebugCard(c,card,s);
 if(s){const m=mods(s),actor=c.status?Math.max(0,s.heroes.findIndex(h=>h.hp>0)):s.party.indexOf(cardOwner(card));const adjust=v=>({...v,role:v.actor,owner:cardOwner(card),actor});c={...adjust(c),upgraded:!!effectiveUp,upgradeLevel:effectiveUp,cost:Math.max(0,c.cost+(c.type==='攻撃'?(m.attackCost||0):0)+(effectiveUp?(m.upgradeCostOffset||0):(m.unupgradedCostOffset||0)))};if(c.components)c.components=c.components.map(v=>({...adjust(v),castCost:c.cost,upgraded:!!effectiveUp,upgradeLevel:effectiveUp}));}
 if(s){if(c.components)c.components=c.components.map(p=>scaleCard(p,s));else c=scaleCard(c,s);}
 if(s?.battle&&!c.status&&heroInfo(s,c.actor)?.bonus?.ownerRefund&&s.battle.originsUsed?.includes(originOwner(card)))c={...c,cost:c.cost+MAOU_REPEAT_COST,repeatOrigin:true};
 if(debugGod(s)){c={...c,cost:0,goldSpend:0,fuelCost:0,selfCost:0,selfPoison:0,selfVulnerable:0};if(c.components)c.components=c.components.map(p=>({...p,castCost:0,cost:0,goldSpend:0,fuelCost:0,selfCost:0,selfPoison:0,selfVulnerable:0}))}
 return c;
}
function scaleCard(value,s){let c={...value};let actor=c.actor,h=s.heroes[actor],b=s.battle;const extra=(c.goldScale?Math.min(30,Math.floor(s.gold/c.goldScale)):0)+(c.armorRatio?Math.floor((h?.shield||0)*c.armorRatio):0)+(c.exhaustScale?(b?.exhaust.length||0)*c.exhaustScale:0)+(c.fuelScale?Math.floor(s.fuel/c.fuelScale):0)+(c.handScale?Math.max(0,(b?.hand.length||1)-1)*c.handScale:0)+(c.woundedScale?Math.floor(s.heroes.filter(x=>x.max).reduce((v,h)=>v+1-h.hp/h.max,0)*c.woundedScale):0)+(c.discardScale?Math.floor((b?.discard.length||0)*c.discardScale):0)+(c.chainScale?(b?.cardsPlayed||0)*c.chainScale:0)+(c.harmonyScale?(b?.actors.length||0)*c.harmonyScale:0)+(c.fallenScale?s.heroes.filter(h=>h.max&&!h.hp).length*c.fallenScale:0)+(c.upgradeScale?(c.upgradeLevel||0)*c.upgradeScale:0)+(c.thornsRatio?Math.floor((h?.thorns||0)*c.thornsRatio):0);if(c.damage)c.damage+=extra;if(c.aoe)c.aoe+=extra;return c;}
function fusionLeafCount(card){return card.fusion?card.fusion.parts.reduce((n,p)=>n+fusionLeafCount(p),0):1}
export function fusionPreview(s,firstUid,secondUid){
 if(!canTakeBlessing(s)||firstUid===secondUid)return null;const a=s.deck.find(c=>c.uid===firstUid),b=s.deck.find(c=>c.uid===secondUid);if(!a||!b||s.deck.filter(c=>c.uid===firstUid).length!==1||s.deck.filter(c=>c.uid===secondUid).length!==1||CARDS[a.id].special||CARDS[b.id].special||CARDS[a.id].noUpgrade||CARDS[b.id].noUpgrade||cardOwner(a)!==cardOwner(b)||fusionLeafCount(a)+fusionLeafCount(b)>4)return null;
 return{id:a.id,owner:cardOwner(a),uid:nextFreeCardUid(s),up:0,branches:[],potencies:[],fusion:{parts:JSON.parse(JSON.stringify([a,b]))}};
}
export function fuseCards(s,firstUid,secondUid){const card=fusionPreview(s,firstUid,secondUid);if(!card)return false;card.uid=allocateCardUid(s);s.deck=s.deck.filter(c=>c.uid!==firstUid&&c.uid!==secondUid);s.deck.push(card);takeBlessing(s,'同じ旅人のカードを合成');return true}
function noteCardUpgrade(s,card,beforeCost){s.nextUid=nextFreeCardUid(s);s.lastCardUpgrade={uid:card.uid,id:card.id,beforeCost,afterCost:cardValues(card,s).cost}}
export function upgradeCard(s,uid,branch='power'){
 let card=s.deck.find(c=>c.uid===uid);if(!card||s.deck.filter(c=>c.uid===uid).length!==1||card.up>=3||!CARDS[card.id].upgrades?.[branch])return false;
 if(CARDS[card.id].upgrades[branch].rare&&!upgradeVariants(card).some(v=>v.id===branch))return false;
 let source=s.phase==='cycle'?'cycle':s.phase==='blessing'?'blessing':s.upgradeContext?.source||(s.phase==='camp'?'camp':s.phase==='forge'?'forge':null);if(!source)return false;
 if(source==='blessing'&&(!canTakeBlessing(s)||!isSafeUpgrade(card,branch,s)))return false;
 if(source==='cycle'&&(!s.cycleReward||!isSafeUpgrade(card,branch,s,2)))return false;
 let offered=s.upgradeOffers?.[`${source==='shop'?'shop'+s.shopForge?.roll+':':source==='cycle'?'double:':source==='blessing'?'safe:':''}${s.chapter}:${s.step}:${uid}:${card.up}`];if(offered&&offered!==branch)return false;
 if(['camp','forge','event'].includes(source)&&nodeClaimed(s,source==='camp'?'camp':'forge'))return false;
 if(source==='shop'&&(s.phase!=='shopupgrade'||!s.shopForge?.cards.includes(uid)))return false;
 let cost=source==='shop'?s.shopForge.price:source==='forge'?shopPrice(s,35):0;if(s.gold<cost)return false;s.gold-=cost;
 const beforeCost=cardValues(card,s).cost;if(card.ledger)card.ledger.push({id:branch,potency:source==='cycle'?2:1,paid:true});card.branches??=Array.from({length:card.up||0},()=>card.branch||'power');card.potencies??=Array(card.up||0).fill(1);card.potencies.push(source==='cycle'?2:1);card.branches.push(branch);card.up=(card.up||0)+1;noteCardUpgrade(s,card,beforeCost);
 healAll(s,mods(s).upgradeHeal||0,false,'other');s.notice=`${CARDS[card.id].name}を${card.up}段階まで強化した。`;
 if(['camp','forge','event'].includes(source))claimNode(s,source==='camp'?'camp':'forge');
 if(source==='cycle')finishCycle(s);else if(source==='blessing')takeBlessing(s,'不利益の増えないカード強化1回');else{s.phase=source==='shop'?'shop':'map';if(source==='shop'){s.shopUpgrades=(s.shopUpgrades||0)+1;delete s.shopForge}delete s.upgradeContext}return true;
}
export function shopForgePrice(s){return shopPrice(s,110+(s.shopUpgrades||0)*70)}
export function startShopUpgrade(s){if(s.phase!=='shop'||s.gold<shopForgePrice(s))return false;const eligible=s.deck.filter(c=>c.up<3&&!CARDS[c.id].noUpgrade);if(!eligible.length)return false;s.shopForge={cards:shuffle(s,eligible).slice(0,3).map(c=>c.uid),price:shopForgePrice(s),roll:(s.shopUpgrades||0)+1};s.phase='shopupgrade';s.upgradeContext={source:'shop'};for(const uid of s.shopForge.cards)upgradeOffer(s,uid);return true}
export function requestUpgrade(s,source){if(source==='shop')return startShopUpgrade(s);if(source==='camp'&&s.phase!=='camp'||source==='forge'&&s.phase!=='forge')return false;s.upgradeContext={source};return true}
const alive=s=>s.heroes.map((h,i)=>h.hp>0?i:-1).filter(i=>i>=0);
export function addLog(s,text){s.log.unshift(text);s.log=s.log.slice(0,25)}
function healHero(s,i,n,revive=false,source='card'){let h=s.heroes[i],m=mods(s);if(!h||!h.max||!h.hp&&!revive)return 0;let v=Math.max(0,n);if(source==='card')v=m.cardHealDisabled?0:Math.max(0,v+(m.heal||0));if(['card','potion'].includes(source))v=Math.floor(v*Math.max(0,1+(m.healMult||0)));let before=h.hp;h.hp=roundHP(Math.min(h.max,h.hp+v));return h.hp-before}
function healAll(s,n,revive=false,source='card'){s.heroes.forEach((h,i)=>healHero(s,i,n,revive,source))}
function hurtHero(s,i,n,ignoreShield=false){if(debugGod(s))return{damage:0,blocked:0};let h=s.heroes[i];if(!h||!h.hp)return{damage:0,blocked:0};let hit=Math.max(0,n)+(ignoreShield?0:h.vulnerable>0?3:0);if(!ignoreShield&&h.vulnerable>0)h.vulnerable--;let blocked=ignoreShield?0:Math.min(h.shield,hit),damage=Math.min(h.hp,Math.max(0,hit-blocked));if(!ignoreShield)h.shield-=blocked;h.hp=roundHP(h.hp-damage);let b=s.battle,m=mods(s);if(damage&&b?.damageEvents)b.damageEvents.push({side:'hero',index:i,amount:damage});if(h.hp===0&&b&&m.revive&&!b.reviveUsed){b.reviveUsed=true;h.hp=Math.min(h.max,m.revive);addLog(s,`${heroInfo(s,i).name}は身代わりの人形で復帰した。`)}return{damage,blocked}}
export function attackPower(s,c){let m=mods(s),h=s.heroes[c.actor],member=heroInfo(s,c.actor),b=s.battle;return(member.bonus.lowAttack&&h?.hp<=h?.max/2?member.bonus.lowAttack:0)+(member.bonus.fallenAttack||0)*s.heroes.filter(h=>h.max&&!h.hp).length+(member.bonus.chainAttack||0)*Math.min(6,b?.cardsPlayed||0)+(c.upgraded?(member.bonus.upgradeAttack||0):0)+(m.attack||0)+(member.bonus.attack||0)+(c.dice&&c.type==='攻撃'?(member.bonus.diceAttack||0):0)+(h?.power||0)+((c.castCost??c.cost)===1?(m.cheapAttack||0):0)+(b?.cardsPlayed>=2?(m.lateAttack||0):0)}
function hitEnemy(s,e,n,{ignoreShield=false,weakAttack=0,aoe=false}={}){if(!e.hp)return 0;let amount=n;if(e.weak>0){amount+=4+(mods(s).weakBonus||0)+weakAttack;e.weak--}amount=resistedHit(e,amount,aoe);let block=ignoreShield?0:Math.min(e.shield,amount);if(!ignoreShield)e.shield-=block;let d=s.debugRun&&s.debugOptions?.oneHit?e.hp:Math.min(e.hp,Math.max(0,amount-block));e.hp=roundHP(e.hp-d);if(d&&s.battle?.damageEvents)s.battle.damageEvents.push({side:'enemy',index:e.index,amount:d});return d}
export function resistedHit(e,amount,aoe=false){if(aoe&&e.aoeResist)amount=Math.floor(amount/2);if(e.armor&&amount>0)amount=Math.max(1,amount-e.armor);if(e.hitCap)amount=Math.min(amount,e.hitCap);return amount}
const resistPoison=(e,n)=>e.poisonResist?Math.ceil(n/2):n;
function bossPhases(s){for(let e of s.battle.enemies){if(e.boss&&e.hp>0&&e.phase===1&&e.hp<=e.max/2){e.phase=2;if(e.phaseActions)e.actionsMax=Math.max(e.actionsMax||1,e.phaseActions);e.atk+=e.enrage||0;e.shield+=e.phaseShield||0;if(e.intent?.factor)e.intent.value=Math.max(0,Math.round(e.atk*e.intent.factor));for(const action of e.actions||[])if(action.factor)action.value=Math.max(1,Math.round(e.atk*action.factor));addLog(s,`${e.name}が第二形態へ！`);s.notice=`${e.name}：第二形態`}}}
export function draw(s,n){let b=s.battle;for(let i=0;i<Math.max(0,n);i++){if(!b.draw.length){b.draw=shuffleDraw(s,b.discard);b.discard=[]}if(!b.draw.length||b.hand.length>=12)break;b.hand.push(b.draw.pop())}}
export function startBattle(s,type){
 let m=mods(s),boss=type==='boss',elite=type==='elite',pool=ENEMIES.filter(e=>e.chapter===biomeIndex(s)),count=boss?1:s.party.filter(Boolean).length===1?1:s.party.filter(Boolean).length===2?2:3;
 let enemies=Array.from({length:count},(_,i)=>{let def=boss?currentBoss(s):pick(s,pool),biome=biomeIndex(s),loop=loopNumber(s);let factor=boss?(s.hard?1.18:1):1+biome*.075+Math.max(0,s.step)*.01+(elite?.2:0)+(s.hard?.18:0);let floor=boss?150+s.chapter*55:20+s.chapter*13;let raw=Math.max(def.hp*factor,floor*(boss?1:.9+def.hp/500));let max=Math.round(raw*(isSpecialStage(s)?2.25:1)*Math.pow(1.25,loop)*(1+(m.enemyHP||0)));let attack=Math.max(def.atk*(boss?(s.hard?1.15:1):1+biome*.025+(elite?.18:0)+(s.hard?.15:0)),8+s.chapter*1.35);return{...def,max:def.fixedStats?def.hp:max,hp:def.fixedStats?def.hp:max,atk:def.fixedStats?def.atk:Math.round(attack*(isSpecialStage(s)?1.5:1)*Math.pow(1.18,loop))+(m.enemyAtk||0),shield:0,poison:0,weak:def.weakImmune?0:m.firstWeak||0,stun:0,phase:1,intent:null,index:i}});
 if(s.demon?.active){const e=enemies[0],base=s.demon.base,mult=s.demon.multiplier;if(!e.fixedStats){e.max=e.hp=Math.round(base.max*mult*(e.balanceHPFactor||1));e.atk=Math.round(base.atk*mult*(e.balanceAtkFactor||1))}for(const[k,v]of Object.entries({enrage:Math.round(e.atk*.2),phaseShield:Math.round(e.max*.06),shieldTurn:Math.round((base.shieldTurn||0)*mult),regen:Math.round((base.regen||0)*mult)}))if(!e.balanceEdited?.includes(k))e[k]=v}
 if(elite&&s.chapter>=3)for(const e of enemies)if(!e.demon)e.actionsMax=Math.max(e.actionsMax||1,2);
 if(!boss&&!s.demon?.active&&!isSpecialStage(s)&&s.tutorial!==0&&randomInt(s,1000)<treasureChance(s)*1000){const st=treasureStats(s.chapter,loopNumber(s)),foe={...TREASURE_ENEMY,max:st.max,hp:st.max,armor:st.armor,hitCap:st.hitCap,fleeTurns:st.fleeTurns,shield:0,poison:0,weak:0,stun:0,phase:1,intent:null,index:0};if(enemies.length>=2)enemies[enemies.length-1]=foe;else enemies.push(foe);enemies.forEach((e,i)=>e.index=i)}
 s.battle={type,turn:0,enemies,draw:shuffleDraw(s,s.deck.map(c=>({...c,branches:[...(c.branches||[])]}))),discard:[],exhaust:[],hand:[],energy:0,actors:[],linked:false,selected:null,target:0,heroTarget:0,cardsPlayed:0,nextEnergy:0,nextDraw:0,carryEnergy:0,reviveUsed:false,enemyActions:0,statusUid:-1};
 s.heroes.forEach(h=>{for(let k of ['shield','power','poison','vulnerable','regen','thorns'])h[k]=0});s.phase='battle';s.log=[boss?`${currentBoss(s).name}との決戦。`:s.escalated?'強敵が通常の道に現れた！':'夜の気配が近づいてくる。'];beginTurn(s);if(s.tutorial===0&&s.chapter===0&&s.step===0)prepareTutorial(s);
}
export function enemyTactics(s){return Math.min(.94,.12+s.chapter*.23+Math.max(0,s.step)*.012+(s.hard?.08:0))}
function planDemonIntents(s,e){
 const rules=e.demonRules||{},{actionsMin:minimum,actionsMax:maximum}=enemyActionRange(e),count=minimum+randomInt(s,maximum-minimum+1),targets=alive(s),legacy=[...new Set(BOSSES.filter(b=>!b.demon).flatMap(b=>b.pattern))].filter(kind=>e.pattern.includes(kind));
 if(rules.apocalypseEnabled!==false&&s.battle.turn>=(rules.apocalypseTurn??10)){e.stun=0;e.actions=Array.from({length:count},()=>({kind:'sweep',target:targets[0]||0,value:rules.apocalypseDamage??99999,hits:1,poison:0,factor:0,apocalypse:true,skill:'apocalypse',label:'終焉・アポカリプス'}));return e.actions[0]}
 const pool=[...legacy.map(kind=>({kind,id:kind,name:kind})),...DEMON_SKILLS.filter(skill=>e.pattern.includes(skill.kind))],choices=shuffle(s,pool).slice(0,count);while(choices.length<count)choices.push(pick(s,pool));
 e.actions=choices.map((skill,i)=>{const kind=skill.kind,factor=skill.factor??({attack:1,heavy:1.5,sweep:.7,flurry:.6,venom:.75,guard:1.3,guardAlly:1.3,mend:1.2,healAll:.8,rally:.2}[kind]||0);return{kind,target:targets.length?targets[(randomInt(s,targets.length)+i)%targets.length]:0,value:skill.value??(factor?Math.max(1,Math.round(e.atk*factor)):kind==='drain'?40:2),hits:skill.hits||(kind==='flurry'?2:1),poison:skill.poison||(kind==='venom'?3:0),factor,skill:skill.id,...(skill.id.startsWith('demon-')?{label:skill.name}:{})}});return e.actions[0];
}
export function planIntent(s,e){
 if(e.fleeing){delete e.actions;return{kind:'guard',target:0,value:0,hits:1,poison:0,flee:Math.max(1,(e.fleeTurns||3)-(s.battle?.turn||1)+1)}}
 if(e.demon)return planDemonIntents(s,e);
 const {actionsMin,actionsMax}=enemyActionRange(e),count=actionsMin===actionsMax?actionsMin:actionsMin+randomInt(s,actionsMax-actionsMin+1),previousAction=e.lastAction,previousTarget=e.lastAttackTarget;
 if(count===1){delete e.actions;return planSingleIntent(s,e)}
 e.actions=[];try{for(let i=0;i<count;i++){const action=planSingleIntent(s,e);e.actions.push(action);e.lastAction=action.kind;if(['attack','heavy','flurry','venom'].includes(action.kind))e.lastAttackTarget=action.target}}finally{if(previousAction===undefined)delete e.lastAction;else e.lastAction=previousAction;if(previousTarget===undefined)delete e.lastAttackTarget;else e.lastAttackTarget=previousTarget}
 return e.actions[0];
}
function planSingleIntent(s,e){
 const b=s.battle,targets=alive(s),allies=b.enemies.filter(foe=>foe.hp>0),tactics=enemyTactics(s),factors={attack:1,heavy:1.65,sweep:.65,flurry:.62,venom:.75,guard:1.3,mend:1.15,healAll:.7,guardAlly:1.5};
 const threat=Math.max(...targets.map(i=>(s.heroes[i].max-s.heroes[i].hp)/s.heroes[i].max),0),ownMissing=1-e.hp/e.max,allyMissing=Math.max(...allies.map(a=>1-a.hp/a.max),0),missingHP=allies.reduce((n,a)=>n+a.max-a.hp,0);
 const killable=targets.some(i=>s.heroes[i].hp+s.heroes[i].shield<=Math.round(e.atk*1.65)+(s.heroes[i].vulnerable?3:0));
 const wounds=[...b.hand,...b.draw,...b.discard].filter(c=>c.id==='wound').length;
 let options=[...new Set(e.pattern)].map(kind=>{
  let weight=kind==='attack'?1.3:1;
  if(kind===e.lastAction)weight*=.18;weight*=.65+rng(s)*.7;
  if(kind==='summon')weight=(e.summons||0)>=(e.summonLimit||2)||allies.length>=3?0:weight*(1+tactics);
  if(kind==='mend')weight=ownMissing<=.02?0:weight*(.35+ownMissing*(1+tactics*11));
  if(kind==='healAll')weight=missingHP<=1?0:weight*(.25+allyMissing*(1+tactics*10));
  if(kind==='guard')weight*=e.shield>=e.max*.45?.12:.5+ownMissing*(1+tactics*4);
  if(kind==='guardAlly')weight*=.4+allyMissing*(1+tactics*5);
  if(['attack','heavy','flurry','venom','sweep'].includes(kind))weight*=1+threat*tactics*(killable?5:1.5);
  if(kind==='sweep')weight*=targets.length===1?.55:1+targets.filter(i=>s.heroes[i].shield===0).length*tactics*.3;
  if(kind==='rally')weight*=allies.length===1?.5:1+tactics*.8;
  if(kind==='curse')weight*=wounds>=7?.12:1+tactics*.6;
  if(kind==='disrupt')weight*=b.draw.length<2?.2:1+tactics*.4;
  return{kind,weight};
 }).filter(o=>o.weight>0);
 if(!options.length)options=[{kind:e.pattern[0]||'attack',weight:1}];
 if(rng(s)<.16)options=options.map(o=>({...o,weight:1}));
 let roll=rng(s)*options.reduce((n,o)=>n+o.weight,0),kind=options.at(-1).kind;
 for(const o of options){roll-=o.weight;if(roll<0){kind=o.kind;break}}
 const factor=factors[kind]||0,value=factor?Math.max(1,Math.round(e.atk*factor)):kind==='curse'?2+Math.floor(s.chapter/2):kind==='disrupt'?2:kind==='drain'?8+s.chapter*4:2;
 // Coordinate pressure rather than repeatedly executing the weakest traveler.
 const attack=['attack','heavy','flurry','venom'].includes(kind),pressure=targets.map(i=>({i,count:allies.filter(foe=>foe!==e&&foe.intentTurn===b.turn&&['attack','heavy','flurry','venom'].includes(foe.intent?.kind)&&foe.intent.target===i).length}));
 let candidates=attack&&targets.length>1?pressure.filter(t=>t.count<2):pressure;if(!candidates.length)candidates=pressure;
 const weighted=candidates.map(({i,count})=>{const h=s.heroes[i],hits=Math.max(kind==='flurry'?2:1,e.multiStrike||1),raw=value*hits+(h.vulnerable?3*Math.min(hits,h.vulnerable):0),damage=Math.max(0,raw-h.shield),lethal=damage>=h.hp&&damage>0;
  let weight=1+tactics*(Math.min(1,damage/Math.max(1,raw))*.7+(1-h.hp/h.max)*.25+(lethal?.2:0));
  if(!damage)weight*=1-tactics*.95;
  if(attack&&targets.length>1){weight*=Math.pow(.18,count);if(e.lastAttackTarget===i)weight*=.4}
  return{i,weight};});
 let target=weighted.at(-1)?.i,targetRoll=rng(s)*weighted.reduce((n,t)=>n+t.weight,0);for(const t of weighted){targetRoll-=t.weight;if(targetRoll<0){target=t.i;break}}
 e.intentTurn=b.turn;
 return{kind,target:target??0,value,hits:['attack','heavy','sweep','venom','flurry'].includes(kind)?Math.max(kind==='flurry'?2:1,e.multiStrike||1):1,poison:kind==='venom'?2+Math.floor(s.chapter/2):0,factor};
}
export function beginTurn(s,timeline=null){
 let b=s.battle,m=mods(s);b.turn++;b.cardsPlayed=0;b.firstSkillUsed=false;b.poisonDrawUsed=false;b.exhaustEnergyUsed=false;b.memberSkillUsed=[];b.actors=[];b.memberShieldUsed=[];b.linked=false;b.selected=null;b.originsUsed=[];b.refunds=0;
 const companionEnergy=s.heroes.reduce((n,h,i)=>n+(h.hp?heroInfo(s,i).bonus.energy||0:0),0);let drain=b.enemies.some(e=>e.hp&&e.energyDrain&&b.turn%3===0)?1:0;b.energy=Math.max(1,(s.fuel===0?3:4)+companionEnergy+(m.energy||0)+(b.turn===1?(m.firstEnergy||0):0)+(b.nextEnergy||0)+(b.carryEnergy||0)-drain);b.nextEnergy=0;b.carryEnergy=0;
 s.heroes.forEach((h,i)=>{if(!h.hp)return;h.shield=Math.min(h.shield,m.carryShield||0)+(m.shieldTurn||0)+(b.turn===1?(m.firstShield||0):0)+(heroInfo(s,i).bonus.selfTurnShield||0);h.thorns=0;if(h.poison>0){const result=hurtHero(s,i,h.poison,true);h.poison--;if(timeline&&result.damage)timeline.push({kind:'poison',enemyIndex:0,heroIndex:i,amount:result.damage,blocked:0,label:heroInfo(s,i).name+'の毒ダメージ',heroes:s.heroes.map(h=>({...h})),enemies:b.enemies.map(e=>({...e,intent:{...e.intent}}))})}if(h.hp&&(h.regen||m.turnRegen)){healHero(s,i,(h.regen||0)+(m.turnRegen||0),false,'other');if(h.regen)h.regen--}});
 if(s.heroes.every(h=>!h.hp)){loseRun(s);return}
 draw(s,Math.max(1,6+(m.draw||0)+(b.nextDraw||0)+(b.turn===1?(m.firstDraw||0):0)+(m.thirdDraw&&b.turn%3===0?m.thirdDraw:0)));b.nextDraw=0;
 s.heroes.forEach((h,i)=>{if(!h.hp)return;const bonus=heroInfo(s,i).bonus;h.shield+=(bonus.discardShield||0)*Math.min(6,Math.floor(b.discard.length/2));h.thorns+=bonus.turnThorns||0;h.regen+=bonus.regenTurn||0;s.fuel=Math.min(100,s.fuel+(bonus.fuelTurn||0));if(b.turn===1&&bonus.openingDraw)draw(s,bonus.openingDraw)});
 b.enemies.forEach(e=>{if(!e.hp)return;if(b.turn>1&&e.regen)e.hp=Math.min(e.max,e.hp+e.regen);e.shield+=e.shieldTurn||0;e.intent=planIntent(s,e)});maintainDebugGod(s);addLog(s,`ターン${b.turn} — 気力${b.energy}、手札${b.hand.length}枚。`);
}
export function prepareTutorial(s){let b=s.battle,all=[...b.hand,...b.draw];b.hand=[];if(s.party.filter(Boolean).length<3){for(const test of [c=>c.damage,c=>c.shield||c.selfShield||c.allShield,c=>c.heal||c.selfHeal]){let i=all.findIndex(card=>test(CARDS[card.id]));if(i>=0)b.hand.push(all.splice(i,1)[0])}while(b.hand.length<6&&all.length)b.hand.push(all.pop());b.draw=all;return}for(let id of ['slash','guard','arrow','spark','tonic','focus']){let i=all.findIndex(c=>c.id===id);if(i>=0)b.hand.push(all.splice(i,1)[0])}if(mods(s).draw>0&&all.length)b.hand.push(all.pop());b.draw=all}
export function damageAmount(s,c,e,aoe=false){let m=mods(s),member=heroInfo(s,c.actor),base=aoe?c.aoe:c.damage;let value=(base||0)+attackPower(s,c)+(aoe?(m.aoe||0)+(member.bonus.aoe||0):0);if(e.weak>0)value+=c.weakBonus||0;if(e.stun>0)value+=member.bonus.stunnedAttack||0;if(e.hp<=e.max*.5)value+=c.lowBonus||0;const self=s.heroes[c.actor];if(self?.max&&self.hp<=self.max*.5)value+=c.selfLowBonus||0;return Math.max(0,Math.round(value*(1+(m.attackMult||0))))}
// 表示用：盾を除き、レリック・闘志・弱点・足止め・HP条件・連撃での弱点消費まで実戦と同じ式でダメージ列を求める
export function previewCardHits(s,c){
 const m=mods(s),member=heroInfo(s,c.actor),weakAdd=4+(m.weakBonus||0)+(member.bonus.weakAttack||0),hits=c.hits||1,foes=(s?.battle?.enemies||[]).filter(e=>e.hp>0);
 if(!foes.length){const dummy={hp:1e9,max:1e9,weak:0,stun:0,poison:0};return{dummy:true,single:c.damage?[damageAmount(s,c,dummy)]:[],aoe:c.aoe?[damageAmount(s,c,dummy,true)]:[],burst:[]}}
 const out={dummy:false,single:[],aoe:[],burst:[]},hit=(e,n,aoe=false)=>{if(e.weak>0){n+=weakAdd;e.weak--}n=resistedHit(e,n,aoe);e.hp=Math.max(0,e.hp-n);return n};
 for(let t=0;t<foes.length;t++){const sim=foes.map(e=>({...e})),e=sim[t];
  if(c.poisonBurst&&e.poison){out.burst.push(hit(e,e.poison*c.poisonBurst));e.poison=0}
  for(let h=0;h<hits;h++){if(c.damage&&e.hp>0)out.single.push(hit(e,damageAmount(s,c,e)));if(c.aoe)for(const f of sim)if(f.hp>0)out.aoe.push(hit(f,damageAmount(s,c,f,true),true))}
 }
 return out;
}
export function projectCardDamage(s,card,enemy){let c=cardValues(card,s),parts=c.components||[c];if(!parts.some(p=>p.damage||p.aoe||p.poisonBurst))return null;const random=parts.some(p=>p.dice);const project=face=>{let copy=JSON.parse(JSON.stringify(s)),idx=copy.battle.enemies.findIndex(e=>e.index===enemy.index);if(idx<0)return null;let foe=copy.battle.enemies[idx],hp=foe.hp,shield=foe.shield;for(const part of parts)applyEffects(copy,part,idx,Math.max(0,copy.heroes.findIndex(h=>h.hp)),face);return{damage:hp-foe.hp,remaining:foe.hp,blocked:shield-foe.shield}};const low=project(1);if(!random)return low;const high=project(6);return{...low,random:true,minDamage:low.damage,maxDamage:high.damage}}
export function projectCardSupport(s,card,index){const c=cardValues(card,s),parts=c.components||[c];const project=face=>{const clone=JSON.parse(JSON.stringify(s)),before={...clone.heroes[index]};for(const part of parts)applyEffects(clone,part,clone.battle.target??0,index,face);const after=clone.heroes[index];return Object.fromEntries(['hp','shield','power','regen','thorns'].map(k=>[k,Math.max(0,after[k]-before[k])]))};return{low:project(1),high:project(6)}}
export function play(s,index,target,heroTarget){
 if(s.cutscene||s.phase!=='battle')return false;let b=s.battle,card=b.hand[index];if(!card||s.pendingCast&&s.pendingCast.uid!==card.uid)return false;let c=cardValues(card,s),owner=s.heroes[c.actor],member=heroInfo(s,c.actor),m=mods(s),e=b.enemies[target],h=s.heroes[heroTarget];
 if(c.cost>b.energy||!c.status&&!owner?.hp)return false;const rawParts=c.components||[c],goldCost=rawParts.reduce((n,p)=>n+(p.goldSpend||0),0),fuelCost=rawParts.reduce((n,p)=>n+(p.fuelCost||0),0);if(s.gold<goldCost||s.fuel<fuelCost)return false;
 if(['hero','dual'].includes(c.target)&&(!h||!h.hp&&!c.revive))return false;
 if((!c.target||c.target==='dual')&&(!e||!e.hp))return false;
 b.damageEvents=[];let hadWeak=e?.weak>0;s.gold-=goldCost;s.fuel-=fuelCost;s.feats??={};s.feats.silver=(s.feats.silver||0)+goldCost;b.diceRolls=[];b.energy-=c.cost;b.hand.splice(index,1);(c.exhaust?b.exhaust:b.discard).push({...card});b.selected=null;
 const parts=c.components||[c];for(const part of parts)applyEffects(s,part,target,heroTarget);const isSkill=parts.some(p=>p.type==='策略');
 if(isSkill&&!b.firstSkillUsed){b.firstSkillUsed=true;if(m.firstSkillDraw)draw(s,m.firstSkillDraw)}
 if(isSkill&&member.bonus.firstSkillShield&&!b.memberShieldUsed?.includes(c.actor)){b.memberShieldUsed??=[];b.memberShieldUsed.push(c.actor);owner.shield+=member.bonus.firstSkillShield}
 if(isSkill&&member.bonus.firstSkillDraw&&!b.memberSkillUsed.includes(c.actor)){b.memberSkillUsed.push(c.actor);draw(s,member.bonus.firstSkillDraw)}
 if(parts.some(p=>p.poison||p.allPoison||p.poisonMultiplier)&&!b.poisonDrawUsed&&m.poisonDraw){b.poisonDrawUsed=true;draw(s,m.poisonDraw)}
 if(c.exhaust&&!b.exhaustEnergyUsed&&m.exhaustEnergy){b.exhaustEnergyUsed=true;b.energy+=m.exhaustEnergy}
 if(member.bonus.ownerRefund&&!c.status){const origin=originOwner(card);b.originsUsed??=[];b.refunds??=0;if(origin&&!b.originsUsed.includes(origin)){b.originsUsed.push(origin);if(b.refunds<MAOU_REFUND_CAP){b.refunds++;b.energy+=member.bonus.ownerRefund;addLog(s,`${member.name}：${COMPANIONS.find(h=>h.id===origin)?.name||'自分'}のカードを初めて使い、気力+${member.bonus.ownerRefund}`)}}}
 const steal=parts.reduce((n,p)=>n+(p.stealCard||0),0);if(steal)stealCards(s,card,c.actor,steal);
 if(c.cost===0&&m.zeroPing){let foe=pick(s,b.enemies.filter(e=>e.hp));if(foe)hitEnemy(s,foe,m.zeroPing)}
 let selfDamage=(c.components?0:c.selfCost||0)+(c.type==='攻撃'?(m.attackSelfDamage||0):0)+(b.cardsPlayed===0?(m.firstCardCostHP||0):0);if(selfDamage)hurtHero(s,c.actor,selfDamage,true);
 if(member.bonus.cardGold)s.gold+=member.bonus.cardGold;if(c.exhaust&&member.bonus.exhaustDraw)draw(s,member.bonus.exhaustDraw);if(c.cost===0)owner.shield+=member.bonus.zeroShield||0;if(c.selfCost&&member.bonus.selfHarmPower)owner.power+=member.bonus.selfHarmPower;if(member.bonus.harmonyHeal)healHero(s,c.actor,Math.min(4,b.actors.length*member.bonus.harmonyHeal));
 s.feats.cards=(s.feats.cards||0)+1;if(b.diceRolls?.includes(6))s.feats.sixes=(s.feats.sixes||0)+1;b.cardsPlayed++;if(!c.status&&!b.actors.includes(c.actor))b.actors.push(c.actor)
 addLog(s,`${c.status?'妨害を除去':member.name+'：'+c.name}${card.up?' ＋'+card.up:''}`);
 if(b.actors.length===3&&!b.linked){b.linked=true;b.energy+=1+(m.linkEnergy||0);s.heroes.forEach((h,i)=>{if(!h.hp)return;h.shield+=6+(m.linkShield||0);healHero(s,i,m.linkHeal||0,false,'other')});addLog(s,'三人の連携！ 盾と気力を獲得。')}
 bossPhases(s);if(s.heroes.every(h=>!h.hp)){loseRun(s);return true}checkBattle(s);return true;
}
function stealCards(s,source,actor,count){const b=s.battle,holder=s.party[actor],allies=s.party.filter(id=>id&&id!==holder&&!isBlack(id));let pool=Object.keys(CARDS).filter(id=>!CARDS[id].status&&!CARDS[id].special&&allies.includes(CARDS[id].owner));if(!pool.length)pool=borrowPool('normal').filter(id=>!MAOU_NORMALS.includes(id));
 for(let i=0;i<count;i++){const id=pick(s,pool),card={id,up:0,branches:[],owner:holder,uid:allocateCardUid(s)};s.deck.push(card);const copy={...card,branches:[]};if(b.hand.length<12)b.hand.push(copy);else b.discard.push(copy);addLog(s,`${heroInfo(s,actor).name}は「${CARDS[id].name}」を奪った`)}
 if(CARDS[source.id].noUpgrade)s.deck=s.deck.filter(c=>c.uid!==source.uid)}
function applyEffects(s,c,target,heroTarget,previewFace){c={...c};let b=s.battle,owner=s.heroes[c.actor],member=heroInfo(s,c.actor),m=mods(s),e=b.enemies[target],h=s.heroes[heroTarget],hadWeak=e?.weak>0;
 if(c.dice){let rolls=Array.from({length:c.dice},(_,i)=>{const rolled=previewFace||randomInt(s,6)+1;return previewFace?rolled:(s.pendingCast?.rolls?.[(b.diceRolls?.length||0)+i]??rolled)}),sum=rolls.reduce((a,b)=>a+b,0);b.diceRolls??=[];b.diceRolls.push(...rolls);c=resolveDiceEffects(c,sum);addLog(s,`${member.name}の出目：${rolls.join('・')}`)}
 if(c.goldGain)s.gold+=c.goldGain;
 if(c.poisonBurst&&e?.hp&&e.poison){hitEnemy(s,e,e.poison*c.poisonBurst);e.poison=0}
 let spikes=0;
 if(c.stripShield){if(c.target==='all')b.enemies.filter(e=>e.hp).forEach(e=>e.shield=0);else if(e)e.shield=0;}
 for(let hit=0;hit<(c.hits||1);hit++){
  if(c.damage&&e?.hp){spikes+=e.spikes||0;hitEnemy(s,e,damageAmount(s,c,e),{ignoreShield:!!c.ignoreShield,weakAttack:member.bonus.weakAttack||0})}
  if(c.aoe)for(let foe of b.enemies.filter(e=>e.hp)){spikes+=foe.spikes||0;hitEnemy(s,foe,damageAmount(s,c,foe,true),{ignoreShield:!!c.ignoreShield,weakAttack:member.bonus.weakAttack||0,aoe:true})}
 }
 if(spikes&&owner?.hp){hurtHero(s,c.actor,spikes);addLog(s,`棘で${heroInfo(s,c.actor).name}に${spikes}ダメージ。`)}
 if(c.weak&&e?.hp&&!e.weakImmune)e.weak+=c.weak;if(c.allWeak)b.enemies.filter(e=>e.hp&&!e.weakImmune).forEach(e=>e.weak+=c.allWeak);
 let poisonBonus=(m.poison||0)+(member.bonus.poison||0);if(c.poison&&e?.hp)e.poison+=resistPoison(e,c.poison+poisonBonus);
 if(c.allPoison)b.enemies.filter(e=>e.hp).forEach(e=>e.poison+=resistPoison(e,c.allPoison+poisonBonus));
 if(c.poisonMultiplier&&e?.hp)e.poison*=c.poisonMultiplier;
 if(c.stun&&e?.hp)applyStun(s,e,c.stun);if(c.allStun)b.enemies.filter(e=>e.hp).forEach(e=>applyStun(s,e,c.allStun));
 if(c.attackDown&&e?.hp){e.atk=Math.max(1,e.atk-c.attackDown);for(const action of new Set([e.intent,...e.actions||[]]))if(action.factor)action.value=Math.max(1,Math.round(e.atk*action.factor))}
 const blockBonus=(m.block||0)+(member.bonus.block||0),healBonus=member.bonus.heal||0;
 if(c.shield)h.shield+=c.shield+blockBonus;if(c.selfShield)owner.shield+=c.selfShield+blockBonus;if(c.allShield)s.heroes.filter(h=>h.hp).forEach(h=>h.shield+=c.allShield+blockBonus);
 if(c.heal)healHero(s,heroTarget,c.heal+healBonus+(h?.hp<=h?.max/2?member.bonus.woundedHeal||0:0),!!c.revive);if(c.selfHeal)healHero(s,c.actor,c.selfHeal+healBonus);if(c.allHeal)healAll(s,c.allHeal+healBonus+(m.allHeal||0));
 if(c.regen&&!m.cardHealDisabled)h.regen+=c.regen;if(c.allRegen&&!m.cardHealDisabled)s.heroes.filter(h=>h.hp).forEach(h=>h.regen+=c.allRegen);
 if(c.thorns)h.thorns+=c.thorns;if(c.power)owner.power+=c.power;if(c.targetPower)h.power+=c.targetPower;if(c.allPower)s.heroes.filter(h=>h.hp).forEach(h=>h.power+=c.allPower);
 if(c.cleanse){h.poison=0;h.vulnerable=0}if(c.allCleanse)s.heroes.forEach(h=>{h.poison=0;h.vulnerable=0});
 if(c.selfCleanse){owner.poison=0;owner.vulnerable=0}if(c.selfPoison)owner.poison+=c.selfPoison;if(c.selfVulnerable)owner.vulnerable+=c.selfVulnerable;
 if(c.redirect)b.enemies.filter(e=>e.hp).forEach(e=>e.intent.target=c.actor);
 if(c.energy)b.energy+=c.energy;if(c.nextEnergy)b.nextEnergy+=c.nextEnergy;if(c.nextDraw)b.nextDraw+=c.nextDraw;
 if(c.draw)draw(s,c.draw);if(c.drawIfWeak&&hadWeak)draw(s,c.drawIfWeak);

 if(c.castCost!==undefined&&c.selfCost)hurtHero(s,c.actor,c.selfCost,true);
}
function addDebuff(s,i,key,n){if(debugGod(s))return;let h=s.heroes[i];if(h?.hp)h[key]+=Math.max(0,n-(mods(s).debuffWard||0))}
export function applyStun(s,enemy,turns){
 if(!enemy?.hp||!Number.isInteger(turns)||turns<1)return false;if(enemy.stunImmune){addLog(s,`${enemy.name}は不動　足止めを受けない。`);return false}if(enemy.demon&&enemy.demonRules?.apocalypseEnabled!==false&&s.battle.turn>=(enemy.demonRules?.apocalypseTurn??10)){addLog(s,'終焉の詠唱は足止めで止められない。');return false;}
 enemy.rage=1;
 if(enemy.lastStunnedTurn===s.battle.turn-1){addLog(s,`${enemy.name}は連続する足止めを無効化し怒りを得た。`);return false}
 enemy.stun=(enemy.stun||0)+turns;return true;
}
export function enemyIntentValue(enemy){
 if(enemy.intent.apocalypse)return enemy.intent.value;const attack=['attack','heavy','flurry','venom','sweep'].includes(enemy.intent.kind);
 return Math.max(1,Math.round(enemy.intent.value*(attack&&enemy.rage?1.2:1)));
}
function refreshAttackValues(s){for(let foe of s.battle.enemies){for(const action of new Set([foe.intent,...foe.actions||[]]))if(action.factor)action.value=Math.max(1,Math.round(foe.atk*action.factor))}}
export function resolveEnemyRound(s,withTimeline=false){
 let b=s.battle,timeline=[],activeSkill='';const record=(kind,ei,hi,amount,blocked=0,label='')=>{normalizeHealth(s);if(withTimeline)timeline.push({kind,enemyIndex:ei,heroIndex:hi,amount,blocked,label:activeSkill||label,heroes:s.heroes.map(h=>({...h})),enemies:b.enemies.map(e=>({...e,intent:{...e.intent}}))})};
 const acting=b.enemies.filter(e=>e.hp);for(const e of acting){activeSkill='';let i=e.index;if(!e.hp)continue;
  if(e.poison){let amount=Math.min(e.hp,e.poison);e.hp-=amount;e.poison--;record('poison',i,null,amount,0,`${e.name}に毒${amount}`);addLog(s,`${e.name}：毒で${amount}ダメージ。`)}
  if(!e.hp)continue;bossPhases(s);
  if(e.demon&&e.demonRules?.apocalypseEnabled!==false&&b.turn>=(e.demonRules?.apocalypseTurn??10))e.stun=0;
  if(e.fleeing){e.turnSeen=b.turn;if(b.turn>=(e.fleeTurns||3)){e.fled=true;e.hp=0;e.poison=0;addLog(s,`${e.name}は宝を抱えて逃げ去った…`);record('guard',i,null,0,0,`${e.name}が逃げ去った`)}continue}
  if(e.stun>0){e.stun--;e.lastStunnedTurn=b.turn;e.rage=1;record('stun',i,null,0,0,`${e.name}は足止めされた`);addLog(s,`${e.name}は足止めで行動できない。`);continue}
  const roundRage=e.rage||0;e.rage=0;for(const t of e.actions||[e.intent]){activeSkill=t.label||'';if(!e.hp)break;bossPhases(s);let n=enemyIntentValue({...e,intent:t,rage:roundRage});b.enemyActions++;e.lastAction=t.kind;
  if(t.skill==='demon-chain')b.nextEnergy--;if(t.skill==='demon-zero')b.nextDraw--;
  if(['attack','heavy','flurry','venom','sweep'].includes(t.kind)){
   for(let hit=0;hit<(t.hits||1);hit++){
    let targets=t.kind==='sweep'?alive(s):[s.heroes[t.target]?.hp>0?t.target:alive(s)[0]];
    for(let target of targets){if(target===undefined||!e.hp)break;if(t.kind!=='sweep')e.lastAttackTarget=target;let result=hurtHero(s,target,n,!!t.apocalypse);if(t.poison)addDebuff(s,target,'poison',t.poison);if(s.heroes[target].thorns&&e.hp){let reflected=Math.min(e.hp,s.heroes[target].thorns);e.hp-=reflected}addLog(s,`${e.name} → ${heroInfo(s,target).name}に${result.damage}ダメージ。`);record('attack',i,target,result.damage,result.blocked,t.label||`${e.name}の${t.kind==='sweep'?'全体攻撃':t.kind==='flurry'?'連撃':'攻撃'}`)}
   }
  }else if(t.kind==='summon'&&e.demon){for(const target of alive(s)){const result=hurtHero(s,target,Math.round(e.atk*.5));record('attack',i,target,result.damage,result.blocked,'亡霊軍の進撃')}
  }else if(t.kind==='summon'){
   if((e.summons||0)<(e.summonLimit||2)&&b.enemies.filter(e=>e.hp).length<3){const pool=ENEMIES.filter(d=>d.chapter===biomeIndex(s)&&!d.specialEnemy),def=pick(s,pool);const slot=b.enemies.findIndex(e=>!e.hp),index=slot<0?b.enemies.length:slot,hp=Math.max(12,Math.round(e.max*(e.boss?.18:.55))),foe={...def,index,max:hp,hp,atk:Math.max(4,Math.round(e.atk*.65)),shield:0,poison:0,weak:0,stun:0,phase:1,summonedTurn:b.turn};foe.intent=planIntent(s,foe);if(slot<0)b.enemies.push(foe);else b.enemies[slot]=foe;e.summons=(e.summons||0)+1;record('summon',i,null,1,0,`${e.name}が${def.name}を呼んだ`)}
  }else if(t.kind==='guard'||t.kind==='guardAlly'){
   let ally=t.kind==='guardAlly'?b.enemies.filter(e=>e.hp).sort((a,c)=>a.hp/a.max-c.hp/c.max)[0]:e;if(ally)ally.shield+=n;record('guard',i,null,n,0,`${e.name}が盾${n}を展開`);
  }else if(t.kind==='mend'||t.kind==='healAll'){
   for(let ally of t.kind==='healAll'?b.enemies.filter(e=>e.hp):[e])ally.hp=Math.min(ally.max,ally.hp+n);record('mend',i,null,n,0,`${e.name}が${t.kind==='healAll'?'敵全員を':'自身を'}回復`);
  }else if(t.kind==='hex'){
   for(let target of alive(s))addDebuff(s,target,'vulnerable',2);record('hex',i,null,2,0,'仲間全員に脆弱2');
  }else if(t.kind==='curse'){
   for(let k=0;k<n;k++)b.draw.push({id:'wound',uid:b.statusUid--,up:0,branches:[]});b.draw=shuffleDraw(s,b.draw);record('curse',i,null,n,0,`山札に妨害「焦燥」を${n}枚混入`);
  }else if(t.kind==='disrupt'){
   b.discard.push(...b.draw.splice(Math.max(0,b.draw.length-n),n));b.nextDraw--;record('disrupt',i,null,n,0,`山札${n}枚を捨て次の手札-1`);
  }else if(t.kind==='rally'){
   for(let ally of b.enemies.filter(e=>e.hp))ally.atk+=n;refreshAttackValues(s);record('rally',i,null,n,0,`敵全員の攻撃力+${n}`);
  }else if(t.kind==='drain'){
   let stolen=Math.min(s.gold,n);s.gold-=stolen;b.nextEnergy--;record('drain',i,null,stolen,0,`銀貨${stolen}を奪い、次の気力-1`);
  }else if(t.kind==='wither'){
   for(let target of alive(s))addDebuff(s,target,'poison',2);b.nextDraw--;record('hex',i,null,2,0,'全員に毒2、次の手札-1');
  }
  if(s.heroes.every(h=>!h.hp)){loseRun(s);break}
  }
  if(s.phase==='lost')break;
 }
 normalizeHealth(s);return timeline;
}
export function endTurn(s,withTimeline=false){
 if(s.cutscene||s.phase!=='battle')return [];let b=s.battle,m=mods(s);b.carryEnergy=Math.min(b.energy,m.carryEnergy||0);if(b.energy===0)b.nextEnergy+=m.emptyEnergy||0;b.discard.push(...b.hand);b.hand=[];b.selected=null;
 b.damageEvents=[];let timeline=resolveEnemyRound(s,withTimeline);if(s.phase==='lost')return timeline;if(checkBattle(s))return timeline;beginTurn(s,withTimeline?timeline:null);maintainDebugGod(s);return timeline;
}
export function checkBattle(s){
 maintainDebugGod(s);
 if(s.phase!=='battle'||s.battle.enemies.some(e=>e.hp))return false;
 let b=s.battle,type=b.type,m=mods(s),perfect=b.turn===1&&b.enemyActions===0,base=(type==='boss'?85:type==='elite'?48:25)+(m.goldFlat||0)+(type==='elite'?(m.eliteGold||0):0),gold=m.noGold?0:Math.round(base*(1+(m.goldMult||0))*(perfect?1.5:1));s.gold+=gold;s.wins++;s.feats??={};if(perfect)s.feats.perfect=(s.feats.perfect||0)+1;if(type==='boss')s.feats.bosses=(s.feats.bosses||0)+1;if(type==='boss'&&isSpecialStage(s)){s.specialWins??=[];if(!s.specialWins.includes(s.chapter+1))s.specialWins.push(s.chapter+1);if(s.chapter+1===150&&allNormalTravelersCollected(s.codex))s.hiddenVictory=true}
 if(type==='boss'&&!s.demon?.active&&s.hard&&s.chapter+1===16){s.hardVictory=true;s.hardVictoryParty=[...s.party.filter(Boolean)]}
 if(type==='boss'&&s.demon?.active){s.demonWins??=[];if(!s.demonWins.includes(s.chapter+1))s.demonWins.push(s.chapter+1);s.feats.demons=(s.feats.demons||0)+1}
 healAll(s,(m.winHeal||0)+(type==='elite'?(m.eliteHeal||0):0),false,'other');if(perfect)s.fuel=Math.min(100,s.fuel+3);
 if(settleCampaignVictory(s))return true;
 let tier=type==='boss'?(isSpecialStage(s)?'special':'boss'):'normal',offeredRelics=type==='boss'||type==='elite'?offerRelics(s,tier):[];
 const treasure=b.enemies.some(e=>e.treasure&&!e.fled&&e.hp<=0);let treasureInfo=null;
 if(treasure){const t=treasureReward(s.chapter);gold+=t.gold;s.gold+=t.gold;const potions=addPotions(s,t.potions);if(!offeredRelics.length)offeredRelics=offerRelics(s,'normal');treasureInfo={gold:t.gold,potions};addLog(s,`宝抱えの灯精を倒した！ 銀貨+${t.gold}`)}
 s.reward={type,gold,perfect,cards:offerCards(s,perfect||treasure?4:3),cardClaimed:false,relicClaimed:offeredRelics.length===0,offeredRelics,tier,extraFuel:perfect?3:0,...(treasureInfo?{treasure:treasureInfo}:{})};s.phase='reward';return true;
}
function completeCampaign(s,kind){s.endingKind=kind;s.phase='won';s.reward=null;delete s.demonGate;delete s.upgradeContext;const info=endingInfo(s);s.journal.push(info.title);startStory(s,'ending');return true}
function openDemonGate(s){const boss=s.battle.enemies.find(e=>e.boss);s.demonGate={stage:s.chapter+1,priorBossId:s.bossId,base:{max:boss.max,atk:boss.atk,shieldTurn:boss.shieldTurn||0,regen:boss.regen||0},multiplier:2};s.reward=null;s.phase='demon-gate';return true}
export function settleCampaignVictory(s){if(s.endless||!['battle','reward'].includes(s.phase)||s.battle?.type!=='boss'||s.battle.enemies.some(e=>e.hp)||!s.demon?.active&&s.chapter+1<campaignLength(s))return false;if(s.demon?.active){s.bossId=s.demon.priorBossId;delete s.demon;return completeCampaign(s,'true')}const profile=recordProgress(s.codex||emptyProgress(),s).profile;if(s.hard&&!s.demonSeen?.includes(s.chapter+1)&&allNormalStartersUnlocked(profile))return openDemonGate(s);return completeCampaign(s,s.hard?'unanswered':'partial')}
export function acceptReward(s,id){if(s.phase!=='reward'||s.reward.cardClaimed||id&&!s.reward.cards.includes(id))return false;if(id)acquireCard(s,id);s.reward.cardClaimed=true;finishReward(s);return true}
export function chooseRelicReward(s,id){if(!['reward','relic'].includes(s.phase))return false;let reward=s.phase==='reward'?s.reward:s.relicOffer;if(reward.relicClaimed||id&&!reward.offeredRelics.includes(id))return false;if(id)addRelic(s,id);reward.relicClaimed=true;if(s.phase==='reward')finishReward(s);else{s.phase='map';delete s.relicOffer}return true}
export function advanceStage(s){s.chapter++;s.step=-1;s.lane=1;s.route=makeRoute(s);s.bossId=pick(s,BOSSES.filter(b=>b.chapter===biomeIndex(s))).id;s.journal.push(storyBeat(s));s.notice=`第${s.chapter+1}ステージ ${chapterInfo(s).name}`;s.phase='map';s.battle=null;s.reward=null;delete s.upgradeContext;startStory(s,'chapter')}
function finishReward(s){let r=s.reward;if(!r.cardClaimed||!r.relicClaimed)return;
 if(r.type==='boss'){
  if(s.demon?.active){const original=s.demon;s.bossId=original.priorBossId;delete s.demon;return finishAfterBoss(s)}
  const stage=s.chapter+1;if(!s.demonSeen?.includes(stage)&&(stage===16&&allNormalStartersUnlocked(s.codex||{})||s.endless&&stage%200===0)){const boss=s.battle.enemies.find(e=>e.boss);s.demonGate={stage,priorBossId:s.bossId,base:{max:boss.max,atk:boss.atk,shieldTurn:boss.shieldTurn||0,regen:boss.regen||0},multiplier:s.endless&&stage%200===0?2.5:2};s.phase='demon-gate';return}
  return finishAfterBoss(s);
 }
 s.phase='map';s.battle=null;s.reward=null;
}
export function enterDemonStage(s){if(s.phase!=='demon-gate'||!s.demonGate)return false;s.demon={...s.demonGate,active:true};s.demonSeen??=[];if(!s.demonSeen.includes(s.chapter+1))s.demonSeen.push(s.chapter+1);delete s.demonGate;s.heroes.forEach(h=>{if(h.max){h.hp=h.max;for(const k of ['poison','vulnerable','shield','power','regen','thorns'])h[k]=0}});s.bossId='demon_king';startBattle(s,'boss');return true}
export function skipDemonStage(s){if(s.phase!=='demon-gate'||!s.demonGate)return false;s.demonSeen??=[];s.demonSeen.push(s.chapter+1);delete s.demonGate;return finishAfterBoss(s)}
function finishAfterBoss(s){
  let m=mods(s);s.heroes.forEach((h,i)=>{if(!h.max)return;if(!h.hp)h.hp=Math.round(h.max*.45);else healHero(s,i,20+(m.bossHeal||0),false,'other')});s.fuel=Math.min(100,s.fuel+28);
  if(s.endless&&(s.chapter+1)%16===0){s.phase='cycle';s.cycleReward={stage:s.chapter+1};s.battle=null;s.reward=null;return}
  if(!s.endless&&s.chapter+1>=campaignLength(s))return completeCampaign(s,(s.demonWins||[]).includes(16)?'true':s.hard?'unanswered':'partial')
  advanceStage(s);return;
}
export function continueEndless(s){if(s.phase!=='won'||!s.hard||s.chapter+1!==16)return false;delete s.cutscene;s.endless=true;s.phase='cycle';s.cycleReward={stage:16};s.battle=null;s.reward=null;return true}
export function finishCycle(s){if(s.phase!=='cycle'||!s.cycleReward)return false;delete s.cycleReward;advanceStage(s);return true}
export function cycleChoice(s,choice){if(s.phase!=='cycle'||!s.cycleReward)return false;if(choice==='copy')return s.deck.some(c=>!CARDS[c.id].special);
 if(choice==='upgrade'){if(!s.deck.some(c=>safeUpgradeVariants(c,s,2).length))return false;s.upgradeContext={source:'cycle'};return true}if(choice==='supplies'){s.gold+=600;addPotions(s,3);return finishCycle(s)}return false}
function relicOffer(s){s.relicOffer={offeredRelics:offerRelics(s,'normal'),tier:'normal',relicClaimed:false};s.phase='relic'}
export function potion(s,index){let h=s.heroes[index];if(!h||!h.max||h.hp<=0||s.potions<=0||h.hp===h.max)return false;s.potions--;s.feats??={};s.feats.potions=(s.feats.potions||0)+1;healHero(s,index,24+(mods(s).potionHeal||0),false,'potion');return true}
export function nodeClaimKey(s,kind=s.nodeType||s.phase){return `${s.chapter}:${s.step}:${s.lane}:${kind}`}
export function nodeClaimed(s,kind=s.nodeType||s.phase){return(s.nodeClaims||[]).includes(nodeClaimKey(s,kind))}
export function claimNode(s,kind=s.nodeType||s.phase){const key=nodeClaimKey(s,kind);s.nodeClaims??=[];if(!s.nodeClaims.includes(key))s.nodeClaims.push(key);if(['treasure','mystery'].includes(s.nodeType)&&kind==='incident'){const origin=nodeClaimKey(s,s.nodeType);if(!s.nodeClaims.includes(origin))s.nodeClaims.push(origin)}}
export function camp(s,choice,uid,branch='power'){
 if(s.phase!=='camp')return false;if(nodeClaimed(s,'camp')){s.phase='map';return false}const m=mods(s);
 if(choice==='upgrade'){s.upgradeContext={source:'camp'};return upgradeCard(s,uid,branch)}
 if(choice==='copy')return s.deck.some(c=>!CARDS[c.id].special);
 if(choice==='rest'){s.heroes.forEach((h,i)=>{if(!h.max)return;if(!h.hp)h.hp=Math.min(h.max,18);else if(!m.campHealDisabled)healHero(s,i,18+(m.campHeal||0),false,'other')});s.fuel=Math.min(100,s.fuel+10+(m.campFuel||0))}
 else if(choice==='fuel')s.fuel=Math.min(100,s.fuel+35+(m.campFuel||0));else return false;
 claimNode(s,'camp');s.phase='map';delete s.upgradeContext;return true;
}
export function goddessEligible(s,card,gift){if(CARDS[card.id]?.noUpgrade)return false;const c=cardValues(card,s);if(gift==='refund')return card.up>=1;if(card.up>=3)return false;if(['heal','allheal','regen'].includes(gift)&&mods(s).cardHealDisabled)return false;switch(gift){case'cost':return c.cost>0;case'permanent':return !!c.exhaust;case'mercy':return(c.selfCost||0)>0;case'relief':return(c.selfPoison||0)>0||(c.selfVulnerable||0)>0;case'pierce':return!!(c.damage||c.aoe)&&!c.ignoreShield;case'break':return!!(c.damage||c.aoe)&&!c.stripShield;case'hits':return!!(c.damage||c.aoe);case'damage':return!!(c.damage||c.aoe)&&(c.hits||1)<=3;case'cleanse':return!c.selfCleanse;default:return true}}
export function startGoddess(s){const available=GODDESS_GIFTS.filter(g=>s.deck.some(c=>goddessEligible(s,c,g.id)));const offers=shuffle(s,GODDESS_GIFTS).slice(0,3);if(available.length&&!offers.some(g=>available.includes(g)))offers[0]=pick(s,available);s.goddess={offers:offers.map(g=>g.id),selected:null,variants:{}};s.phase='goddess';return true}
export function chooseGoddessGift(s,id){if(s.phase!=='goddess'||!s.goddess.offers.includes(id)||!s.deck.some(c=>goddessEligible(s,c,id)))return false;s.goddess.selected=id;return true}
export function goddessUpgradeOffer(s,uid){if(s.phase!=='goddess'||nodeClaimed(s,'goddess')||!s.goddess.selected)return null;const card=s.deck.find(c=>c.uid===uid),gift=s.goddess.selected;if(!card||!goddessEligible(s,card,gift))return null;if(gift==='refund'){const after=JSON.parse(JSON.stringify(card));after.ledger=upgradeLedger(card);const last=after.ledger.findLast(e=>e.paid);last.paid=false;after.up--;after.branches=after.ledger.filter(e=>e.paid).map(e=>e.id);after.potencies=after.ledger.filter(e=>e.paid).map(e=>e.potency);return{before:card,after,gift,variant:null}}
 const key=gift+':'+uid+':'+card.up+':'+upgradeLedger(card).length;s.goddess.variants[key]??=pickUpgrade(s,card,EXPANDED_UPGRADE_IDS.map(id=>({id,weight:1})),gift);const variant=s.goddess.variants[key];return{before:card,after:withUpgrade(card,variant,1,gift),gift,variant}
}
export function applyGoddessGift(s,uid){const offer=goddessUpgradeOffer(s,uid);if(!offer)return false;const index=s.deck.findIndex(c=>c.uid===uid),before=s.deck[index],after=offer.after;if(index<0||s.deck.filter(c=>c.uid===uid).length!==1||!after||after.uid!==before.uid||after.id!==before.id||cardOwner(after)!==cardOwner(before))return false;const beforeCost=cardValues(before,s).cost;s.deck[index]=after;noteCardUpgrade(s,after,beforeCost);claimNode(s,'goddess');s.phase='map';if(offer.gift!=='refund')healAll(s,mods(s).upgradeHeal||0,false,'other');s.notice=offer.gift==='refund'?'性能を保ったまま、強化ポイントを1戻しました。':'選んだ恩恵を必ず付与しました。';delete s.goddess;return true}
export function leave(s){if(['shop','forge','shrine','recruit','incident','mystery','goddess'].includes(s.phase)){claimNode(s,s.phase);s.phase='map';delete s.upgradeContext;return true}return false}
export function buyRelic(s,id){if(s.phase!=='shop')return false;let stock=s.shopRelics.find(r=>r.id===id);if(!stock||s.gold<stock.price||has(s,id))return false;s.gold-=stock.price;addRelic(s,id);s.shopRelics=s.shopRelics.filter(r=>r.id!==id);maintainDebugGod(s);return true}
export function eventRisk(s,index){let safe=index===2&&[0,3,5].includes(s.event);return safe?0:Math.min(.5,.04+s.chapter*.1+Math.max(0,s.step)*.006)}
function eventHazard(s,index){let risk=eventRisk(s,index);if(rng(s)<risk){let harm=3+s.chapter*2;s.heroes.forEach(h=>h.hp=Math.max(0,h.hp-harm));s.notice=`不運が重なった… 全員のHP-${harm}（危険度${Math.round(risk*100)}%）`;if(s.heroes.every(h=>!h.hp))loseRun(s)}}
export function eventChoice(s,index){
 if(s.phase!=='event'||nodeClaimed(s,'event')||!EVENTS[s.event]?.options[index])return false;let ev=s.event,cost=ev===0&&index===1?20:ev===1&&index===2?20:ev===5&&index===1?40:ev===7&&index===1?25:0;if(s.gold<cost)return false;s.gold-=cost;claimNode(s,'event');s.phase='map';
 if(ev===0){if(index===0){healAll(s,14,false,'other');s.fuel=Math.max(0,s.fuel-6)}if(index===1)s.fuel=Math.min(100,s.fuel+28)}
 if(ev===1){if(index===0){s.fuel=Math.max(0,s.fuel-12);relicOffer(s)}if(index===1)s.gold+=25;if(index===2)addPotions(s,1)}
 if(ev===2){if(index===0)addPotions(s,1);if(index===1){s.phase='forge';s.upgradeContext={source:'event'}}if(index===2)s.gold+=35}
 if(ev===3){if(index===0){s.heroes.forEach(h=>h.hp=Math.max(0,h.hp-8));s.gold+=65}if(index===1){s.fuel=Math.max(0,s.fuel-10);s.gold+=35}if(index===2)s.fuel=Math.max(0,s.fuel-2)}
 if(ev===4){if(index===0){s.phase='cardpick';s.cardOffer=offerCards(s)}if(index===1)healAll(s,14,false,'other');if(index===2)s.fuel=Math.min(100,s.fuel+22)}
 if(ev===5){if(index===0){s.heroes[alive(s)[0]].hp=Math.max(0,s.heroes[alive(s)[0]].hp-15);relicOffer(s)}if(index===1){s.heroes.filter(h=>h.max>0).forEach(h=>{h.max+=7;if(h.hp)h.hp+=7});s.maxBonus=(s.maxBonus||0)+7}}
 if(ev===6){if(index===0){addPotions(s,1);s.fuel=Math.min(100,s.fuel+15)}if(index===1)s.gold+=45;if(index===2){s.phase='remove';s.removeCost=0}}
 if(ev===7){if(index===0){s.phase='remove';s.removeCost=0}if(index===1)healAll(s,20,false,'other');if(index===2){s.fuel=Math.max(0,s.fuel-5);s.gold+=15}}
 eventHazard(s,index);maintainDebugGod(s);if(s.heroes.every(h=>!h.hp))loseRun(s);return true;
}
export function resolveMystery(s){if(s.phase!=='mystery')return false;let def=MYSTERIES.find(m=>m.effect===s.mystery);s.incident={title:def.title,text:def.text,effect:def.effect,resolved:false};s.phase='incident';return true}
export function resolveIncident(s){if(s.phase!=='incident'||s.incident.resolved||nodeClaimed(s,'incident'))return false;let effect=s.incident.effect;s.incident.resolved=true;claimNode(s,'incident');s.phase='map';if(effect==='heal')healAll(s,18,false,'other');if(effect==='supplies'||effect==='treasure'){s.gold+=effect==='treasure'?55:35;addPotions(s,1);s.fuel=Math.min(100,s.fuel+12)}if(effect==='relic')relicOffer(s);if(effect==='card'){s.phase='cardpick';s.cardOffer=offerCards(s)}if(effect==='goldLoss')s.gold=Math.max(0,s.gold-(25+s.chapter*10));if(effect==='fuelLoss')s.fuel=Math.max(0,s.fuel-(12+s.chapter*3));if(effect==='hurt')s.heroes.forEach(h=>h.hp=Math.max(0,h.hp-(5+s.chapter*3)));if(effect==='ambush'){s.escalated=s.chapter>1;startBattle(s,s.escalated?'elite':'battle')}maintainDebugGod(s);if(s.heroes.every(h=>!h.hp))loseRun(s);return true}
export function shrineChoice(s,choice){if(s.phase!=='shrine'||nodeClaimed(s,'shrine'))return false;if(choice==='blood'){s.heroes.forEach(h=>{if(h.hp)h.hp=Math.max(1,h.hp-10)});relicOffer(s)}else if(choice==='purify'){if(s.gold<35)return false;s.gold-=35;healAll(s,20,true,'other');s.phase='map'}else s.phase='map';claimNode(s,'shrine');maintainDebugGod(s);return true}
export function recruit(s,id,slot){
 if(s.phase!=='recruit'||!eligibleTraveler(s,id)||!s.recruits.includes(id)||s.party.includes(id)||(s.departed||[]).includes(id))return false;
 const empty=s.party.indexOf(null);if(empty>=0)slot=empty;
 if(!Number.isInteger(slot)||slot<0||slot>2)return false;
 const member=COMPANIONS.find(h=>h.id===id),old=s.party[slot];if(s.starterId&&old===s.starterId)return false;
 s.nextUid=nextFreeCardUid(s);if(old){s.departed??=[];s.departed.push(old);s.deck=s.deck.filter(c=>cardOwner(c)!==old)}
 const max=member.max+(mods(s).maxHP||0)+(s.maxBonus||0);
 s.party[slot]=id;s.heroes[slot]={...baseHero(member),max,hp:Math.ceil(max*.8)};
 for(const card of member.blackparty?randomBorrowedDeck(s,id,6):RECRUIT_DECKS[id].map(id=>({id,up:0,branches:[]})))s.deck.push({...card,uid:allocateCardUid(s)});
 s.cardBag=[];s.phase='map';if(!old){s.joinedCount=(s.joinedCount||1)+1}s.journal.push(`${old?COMPANIONS.find(h=>h.id===old).name+'に別れを告げ、':''}${member.name}が隊商に加わった。`);return true;
}
export function pickEventCard(s,id){if(s.phase!=='cardpick'||id&&!s.cardOffer.includes(id))return false;if(id)acquireCard(s,id);s.phase='map';return true}
export function removeCard(s,uid){if(!['shop','remove'].includes(s.phase)||s.deck.length<=6)return false;let card=s.deck.find(c=>c.uid===uid),price=s.phase==='shop'?removePrice(s):s.removeCost||0;if(!card||s.deck.filter(c=>c.uid===uid).length!==1||s.gold<price)return false;s.gold-=price;s.deck=s.deck.filter(c=>c.uid!==uid);if(s.phase==='shop')s.shopRemovals=(s.shopRemovals||0)+1;if(s.phase==='remove')s.phase='map';maintainDebugGod(s);return true}

// Repair only the accidental pre-unlock traveler, preserving other cards and resources.
export function enforceHiddenTravelerAccess(s,profile){
 if(hiddenTravelerUnlocked(profile)||hiddenTravelerUnlocked(s.codex))return false;
 let changed=false;

 const hidden=s.party.flatMap((id,slot)=>COMPANIONS.find(h=>h.id===id)?.hidden?[{id,slot}]:[]);
 for(const {id,slot}of hidden){
  const member=COMPANIONS.find(h=>h.id===id),pool=COMPANIONS.filter(h=>!h.hidden&&!h.blackparty&&!s.party.includes(h.id)&&!s.departed.includes(h.id)),next=pool.find(h=>h.id==='nico')||pool.find(h=>h.actor===member.actor)||pool[0]||COMPANIONS.find(h=>!h.hidden&&!h.blackparty&&!s.party.includes(h.id));
  if(!next)continue;
  const cards=s.deck.filter(c=>cardOwner(c)===id),old=s.heroes[slot],wasStarter=s.starterId===id;s.hiddenTravelerArchive??=[];s.hiddenTravelerArchive.push({id,slot,hero:{...old},cards:JSON.parse(JSON.stringify(cards)),starter:wasStarter});
  const max=Math.max(.1,Math.min(5000,next.max+(mods(s).maxHP||0)+(s.maxBonus||0))),hp=old.hp>0?Math.max(.1,Math.min(max,roundHP(max*old.hp/old.max))):0;
  s.party[slot]=next.id;s.heroes[slot]={...old,max,hp};if(s.starterId===id)s.starterId=next.id;s.departed=s.departed.filter(x=>x!==id&&x!==next.id);s.deck=s.deck.filter(c=>cardOwner(c)!==id);
  if(s.battle){for(const key of ['hand','draw','discard','exhaust'])if(Array.isArray(s.battle[key]))s.battle[key]=s.battle[key].filter(c=>cardOwner(c)!==id);s.battle.selected=null;delete s.pendingCast}
  for(const card of wasStarter?STARTER_DECKS[next.id]:RECRUIT_DECKS[next.id]){const added={id:card,up:0,branches:[],uid:allocateCardUid(s)};s.deck.push(added);if(s.phase==='battle')s.battle.draw.push({...added,branches:[]})}
  s.cardBag=(s.cardBag||[]).filter(cid=>CARDS[cid]?.owner!==id);
  for(const key of ['stock','cardOffer'])if(s[key])s[key]=s[key].filter(cid=>CARDS[cid]?.owner!==id);
  if(s.reward?.cards)s.reward.cards=s.reward.cards.filter(cid=>CARDS[cid]?.owner!==id);
  if(s.offeredCards)for(const cid of Object.keys(s.offeredCards))if(CARDS[cid]?.owner===id)delete s.offeredCards[cid];
  if(s.shopForge){const valid=s.deck.filter(c=>c.up<3);s.shopForge.cards=[...new Set([...s.shopForge.cards.filter(uid=>valid.some(c=>c.uid===uid)),...valid.map(c=>c.uid)])].slice(0,3)}
  if(s.lastCardUpgrade&&cards.some(c=>c.uid===s.lastCardUpgrade.uid))delete s.lastCardUpgrade;
  s.hiddenTravelerRepair={replacement:next.name};changed=true;
 }
 if(s.recruits){const before=JSON.stringify(s.recruits),count=s.recruits.length;s.recruits=s.recruits.filter(id=>!COMPANIONS.find(h=>h.id===id)?.hidden&&!s.party.includes(id)&&!s.departed.includes(id));for(const h of COMPANIONS){if(s.recruits.length>=Math.min(3,count))break;if(!h.hidden&&!s.party.includes(h.id)&&!s.departed.includes(h.id)&&!s.recruits.includes(h.id))s.recruits.push(h.id)}changed||=before!==JSON.stringify(s.recruits)}
 if(changed){s.nextUid=nextFreeCardUid(s);normalizeHealth(s)}return changed;
}
