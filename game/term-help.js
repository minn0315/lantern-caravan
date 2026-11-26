import {GLOSSARY} from './glossary.js?v=46';
const openTerm=Symbol('open-term-help');
const aliases={hp:['HP','最大HP'],shield:['盾','シールド'],power:['闘志'],poison:['毒'],weak:['弱点'],vulnerable:['脆弱'],stun:['足止め'],rage:['怒り'],regen:['再生'],thorns:['反撃'],energy:['気力','コスト'],cleanse:['浄化','解毒'],hits:['連撃','多段攻撃'],exhaust:['消滅'],draw:['ドロー'],selfCost:['HP消費'],next:['次ターン'],ultimate:['特殊カード'],fusion:['合成'],goddess:['湖の女神']};
const terms=new Map();for(const g of GLOSSARY)for(const word of aliases[g.id]||g.name.split(/[・（]/).filter(w=>w.length>=2))terms.set(word,g.id);
for(const [id,words]of Object.entries({shield:['Shield','护盾'],power:['Resolve','斗志'],poison:['Poison'],weak:['Weakness','弱点'],vulnerable:['Vulnerable','脆弱'],stun:['Stun','禁足'],rage:['Rage','愤怒'],regen:['Regeneration','再生'],energy:['Energy','能量'],exhaust:['Exhaust','消耗'],draw:['Draw','抽牌'],fusion:['Fusion','合成']}))for(const word of words)terms.set(word,id);
const expression=new RegExp([...terms.keys()].sort((a,b)=>b.length-a.length).map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
export function annotateTerms(root,doc=document){
 if(!root?.nodeType||!doc.createTreeWalker)return;const bind=span=>span.onclick=event=>{event.preventDefault();event.stopImmediatePropagation();doc[openTerm]?.(span)};root.querySelectorAll('[data-term]').forEach(bind);
 const walker=doc.createTreeWalker(root,4),nodes=[];let node;
 while((node=walker.nextNode()))if(node.parentElement&&!node.parentElement.closest('[data-term],script,style,svg,input,textarea,select,option,kbd,.term-popover,[data-action="glossary"],.glossary-grid'))nodes.push(node);
 for(const text of nodes){const control=text.parentElement.closest('button,a,[data-action]');if(control&&!text.parentElement.closest('.card-description,.card-bottom,.statuses,.intent,.relic-choice p,.drawback,.option small'))continue;const content=text.nodeValue;if(!content)continue;expression.lastIndex=0;let match,last=0,fragment=null;
  while((match=expression.exec(content))){if(match[0]==='ラン'&&content.slice(expression.lastIndex,expression.lastIndex+2)==='ダム')continue;fragment??=doc.createDocumentFragment();fragment.append(doc.createTextNode(content.slice(last,match.index)));const span=doc.createElement('span');span.className='term-link';span.dataset.term=terms.get(match[0]);span.setAttribute('role','button');span.setAttribute('tabindex','0');span.setAttribute('aria-label',match[0]+'：用語の説明');span.textContent=match[0];bind(span);fragment.append(span);last=expression.lastIndex}
  if(fragment){fragment.append(doc.createTextNode(content.slice(last)));text.replaceWith(fragment)}
 }
}
export function installTermHelp({doc=document,translate=s=>s,onOpen=()=>{}}={}){
 let panel=null,source=null;
 function close(){panel?.remove();panel=null;source?.focus?.({preventScroll:true});source=null}
 function open(element){const entry=GLOSSARY.find(g=>g.id===element.dataset.term);if(!entry)return;panel?.remove();source=element;onOpen();panel=doc.createElement('aside');panel.className='term-popover';panel.setAttribute('role','dialog');panel.setAttribute('aria-label',translate(entry.name));
  const title=doc.createElement('h3'),short=doc.createElement('p'),body=doc.createElement('p'),button=doc.createElement('button');title.textContent=translate(entry.name);short.textContent=translate(entry.short);body.textContent=translate(entry.text);button.textContent=translate('説明を閉じる');button.className='btn';button.addEventListener('click',close);panel.append(title,short,body,button);doc.body.append(panel);button.focus();
 }
 doc[openTerm]=open;
 doc.addEventListener('click',event=>{if(panel&&!event.target.closest?.('[data-term],.term-popover'))close()},true);
 doc.addEventListener('keydown',event=>{if(panel&&event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();close();return}if(event.target?.dataset?.term&&['Enter',' '].includes(event.key)){event.preventDefault();event.stopImmediatePropagation();open(event.target)}},true);
 return {close};
}
