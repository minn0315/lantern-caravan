import {cardValues} from './engine.js?v=47';
const names=new Intl.Collator('ja',{numeric:true,sensitivity:'base'});
export const CARD_SORTS={draw:'引いた順',acquired:'入手順',cost:'コスト順',actor:'使用キャラ順',name:'名前順',upgraded:'強化段階順'};
export function cardEntries(cards,sort='acquired',state){
 const entries=cards.map((card,index)=>({card,index}));if(sort==='draw')return entries;
 const values=new Map(entries.map(({card,index})=>[index,cardValues(card,state)]));
 const acquired=({card,index})=>Number.isFinite(card.uid)&&card.uid>=0?card.uid:Number.MAX_SAFE_INTEGER+index;
 const compare=(a,b)=>{
  const ca=values.get(a.index),cb=values.get(b.index);let n=0;
  if(sort==='cost')n=ca.cost-cb.cost;
  else if(sort==='actor')n=(ca.status?99:ca.actor)-(cb.status?99:cb.actor);
  else if(sort==='name')n=names.compare(ca.name,cb.name);
  else if(sort==='upgraded')n=(b.card.up||0)-(a.card.up||0);
  if(n)return n;
  if(sort==='cost'||sort==='actor')n=Number(!!ca.status)-Number(!!cb.status);
  return n||acquired(a)-acquired(b)||a.index-b.index;
 };
 return entries.sort(compare);
}
