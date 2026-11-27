import * as E from './engine.js?v=51';

// A lake blessing may change card effects, never the permanent inventory.
// Compare only the same journey/node/party; intentional removals elsewhere are unaffected.
export function recoverGoddessCards(before,after){
 if(!before||!after||before.phase!=='goddess'||!['goddess','map'].includes(after.phase)||before.debugRun||after.debugRun||!Array.isArray(before.deck)||!Array.isArray(after.deck)||!before.goddess)return [];
 if(['initialSeed','started','chapter','step','lane'].some(key=>before[key]!==after[key])||JSON.stringify(before.party)!==JSON.stringify(after.party))return [];
 if(after.phase==='map'&&!E.nodeClaimed(after,'goddess'))return [];
 const current=new Map(after.deck.map(c=>[c.uid,c])),newSpecial=after.deck.some(c=>E.CARDS[c.id]?.special&&!before.deck.some(old=>old.uid===c.uid&&old.id===c.id));const missing=before.deck.filter(c=>{if(E.CARDS[c.id]?.special&&newSpecial)return false;const now=current.get(c.uid);return !now||now.id!==c.id||E.cardOwner(now)!==E.cardOwner(c)});if(!missing.length)return [];
 const prepared=JSON.parse(JSON.stringify(before)),restored=[];
 for(const original of missing){
  let card=JSON.parse(JSON.stringify(original));const gift=prepared.goddess.selected,key=gift+':'+card.uid+':'+card.up+':'+E.upgradeLedger(card).length;
  if(after.phase==='map'&&missing.length===1&&gift&&(gift==='refund'||Object.hasOwn(prepared.goddess.variants||{},key))){const offer=E.goddessUpgradeOffer(prepared,card.uid);if(offer&&offer.after.uid===card.uid&&offer.after.id===card.id)card=offer.after}
  const present=after.deck.findIndex(c=>c.uid===card.uid),index=before.deck.findIndex(c=>c.uid===card.uid);if(present>=0){const displaced=after.deck[present];if(displaced.id!==card.id){displaced.uid=E.allocateCardUid(after);after.deck.push(displaced)}after.deck[present]=card}else after.deck.splice(Math.min(index,after.deck.length),0,card);restored.push(card.uid);
  if(missing.length===1)after.lastCardUpgrade={uid:card.uid,id:card.id,beforeCost:E.cardValues(original,before).cost,afterCost:E.cardValues(card,after).cost};
 }
 after.nextUid=E.nextFreeCardUid(after);after.notice='湖の強化前の記録から所持カードを復元しました。所持デッキを確認してください。';return restored;
}
