// Pointer Events keep mouse, pen and touch on the same input path.
// The game callbacks own validation and casting; this controller only owns gestures.
export function installCardDrag({root,read,select,restore,target,cast,announce=()=>{},doc=document,win=window}){
 let gesture=null,blockedClick=false,blockedTouch=false,frame=0;
 const on=(el,type,fn,options)=>el.addEventListener(type,fn,options);
 function releaseCapture(id){try{if(root.hasPointerCapture?.(id))root.releasePointerCapture(id)}catch{}}
 function clearVisual(g){
  if(frame)win.cancelAnimationFrame(frame);frame=0;
  g.hover?.element.classList.remove('card-drop-hover');
  g.ghost?.remove();g.hint?.remove();root.classList.remove('card-dragging');
  root.querySelectorAll?.('.card-drag-source,.card-drop-ready').forEach(el=>el.classList.remove('card-drag-source','card-drop-ready'));
 }
 function finish(commit=false){
  const g=gesture;if(!g)return;gesture=null;releaseCapture(g.pointerId);clearVisual(g);
  if(g.panning||g.pagePanning){blockedClick=true;return}
  if(!g.active){if(Math.hypot(g.x-g.startX,g.y-g.startY)>=12)blockedClick=true;return;}
  blockedClick=true;
  const valid=commit&&g.hover&&read(g.index)?.uid===g.card.uid;
  if(valid)cast(g.card,g.hover);else{restore(g.previous);announce('カードを手札に戻しました。気力は消費していません。')}
 }
 function inspect(){
  const g=gesture;if(!g?.active)return;
  const hit=doc.elementFromPoint(g.x,g.y),next=target(g.card,hit);
  if(g.hover?.element!==next?.element){g.hover?.element.classList.remove('card-drop-hover');next?.element.classList.add('card-drop-hover')}
  g.hover=next;
  g.ghost.classList.toggle('can-drop',!!next);
  g.hint.classList.toggle('can-drop',!!next);
  const message=next?next.label:g.card.instruction;
  if(message!==g.hint.textContent){g.hint.textContent=message;announce(message)}
 }
 function paint(){
  const g=gesture;if(!g?.active)return;
  const viewport=win.visualViewport;
  const left=viewport?.offsetLeft||0,top=viewport?.offsetTop||0,width=viewport?.width||win.innerWidth,height=viewport?.height||win.innerHeight;
  const x=Math.max(left+70,Math.min(left+width-70,g.x));
  const y=Math.max(top+8,Math.min(top+height-195,g.y-190));
  g.ghost.style.transform=`translate3d(${x-67}px,${y}px,0)`;
  g.hint.style.top=`${top+10}px`;
  inspect();
 }
 function scrollLoop(){
  const g=gesture;if(!g?.active)return;
  const viewport=win.visualViewport,top=viewport?.offsetTop||0,bottom=top+(viewport?.height||win.innerHeight);
  const edge=86,delta=g.y<top+edge?-Math.ceil((top+edge-g.y)/edge*18):g.y>bottom-edge?Math.ceil((g.y-bottom+edge)/edge*18):0;
  if(delta&&doc.documentElement?.getAttribute?.('data-compact-battle')!=='on'){win.scrollBy({top:delta,left:0,behavior:'instant'});paint()}
  frame=win.requestAnimationFrame(scrollLoop);
 }
 function begin(g){
  g.active=true;
  g.ghost=doc.createElement('div');g.ghost.className='card-drag-ghost';g.ghost.setAttribute('aria-hidden','true');
  const copy=g.source.cloneNode(true);copy.removeAttribute('id');copy.removeAttribute('data-action');copy.removeAttribute('disabled');copy.tabIndex=-1;g.ghost.append(copy);
  g.hint=doc.createElement('div');g.hint.className='card-drag-hint';g.hint.setAttribute('aria-hidden','true');
  select(g.index);root.classList.add('card-dragging');
  root.querySelector(`[data-action="card"][data-uid="${g.card.uid}"]`)?.classList.add('card-drag-source');
  root.querySelectorAll('.unit,.battle-stage,.card-target-dock button').forEach(el=>{if(target(g.card,el))el.classList.add('card-drop-ready')});
  doc.body.append(g.ghost,g.hint);paint();frame=win.requestAnimationFrame(scrollLoop);
 }
 on(root,'pointerdown',ev=>{if(ev.pointerType!=='touch'&&ev.target.closest?.('[data-term]')?.dataset?.term||ev.target.closest?.('[data-action="zoom-card"]')?.dataset?.action==='zoom-card')return;
  if(gesture||ev.isPrimary===false||ev.button!==0)return;
  blockedClick=false;blockedTouch=ev.pointerType==='touch';
  const source=ev.target.closest('.hand [data-action="card"]');if(!source||source.disabled)return;
  const index=Number(source.dataset.index),card=read(index);if(!card&&ev.pointerType!=='touch')return;
  gesture={pointerId:ev.pointerId,index,card,previous:card?.previous??null,source,hand:source.closest('.hand'),x:ev.clientX,y:ev.clientY,startX:ev.clientX,startY:ev.clientY,active:false};
  gesture.startScroll=gesture.hand?.scrollLeft||0;gesture.lastY=ev.clientY;
  // Keep pending taps on the button so the browser generates the existing click.
 });
 on(doc,'pointermove',ev=>{
  const g=gesture;if(!g||ev.pointerId!==g.pointerId)return;
  g.x=ev.clientX;g.y=ev.clientY;
  // A horizontal swipe still browses the hand on a phone; lift a card toward
  // the battlefield to start casting. Mouse and pen can drag in any direction.
  if(!g.active&&!g.panning&&ev.pointerType==='touch'&&Math.abs(g.x-g.startX)>=12&&Math.abs(g.x-g.startX)>Math.abs(g.y-g.startY)*1.7){g.panning=true;try{root.setPointerCapture(g.pointerId)}catch{}}
  if(!g.active&&!g.panning&&!g.pagePanning&&ev.pointerType==='touch'&&g.y-g.startY>=12&&g.y-g.startY>Math.abs(g.x-g.startX)*1.2){g.pagePanning=true;try{root.setPointerCapture(g.pointerId)}catch{}}
  if(g.pagePanning){ev.preventDefault();if(doc.documentElement?.getAttribute?.('data-compact-battle')!=='on')win.scrollBy({top:g.lastY-g.y,left:0,behavior:'instant'});g.lastY=g.y;return}
  if(g.panning){ev.preventDefault();if(g.hand&&doc.documentElement?.getAttribute?.('data-phone-screen')!=='on')g.hand.scrollLeft=g.startScroll+g.startX-g.x;return}
  if(!g.active&&!g.card&&Math.hypot(g.x-g.startX,g.y-g.startY)>=12){blockedClick=true;finish();return}
  if(!g.active&&Math.hypot(g.x-g.startX,g.y-g.startY)>=(ev.pointerType==='touch'?12:7)){
   if(!read(g.index)||read(g.index).uid!==g.card.uid){finish();return}
   try{root.setPointerCapture(g.pointerId)}catch{}
   begin(g);
  }
  if(g.active){ev.preventDefault();paint()}
 },{passive:false});
 on(doc,'pointerup',ev=>{
  if(!gesture||ev.pointerId!==gesture.pointerId)return;
  if(gesture.panning||gesture.pagePanning)ev.preventDefault();
  if(gesture.active){ev.preventDefault();gesture.x=ev.clientX;gesture.y=ev.clientY;inspect()}
  finish(true);
 });
 on(doc,'pointercancel',ev=>{if(gesture?.pointerId===ev.pointerId)finish()});
 on(root,'lostpointercapture',ev=>{if(ev.target===root&&gesture?.pointerId===ev.pointerId)finish()});
 on(doc,'click',ev=>{if(blockedClick&&(blockedTouch||ev.detail!==0)){blockedClick=false;ev.preventDefault();ev.stopImmediatePropagation()}},true);
 on(doc,'keydown',ev=>{if(!gesture?.active){blockedClick=false;return}ev.preventDefault();ev.stopImmediatePropagation();if(ev.key==='Escape')finish()},true);
 on(win,'blur',()=>finish());
 on(doc,'visibilitychange',()=>{if(doc.hidden)finish()});
 on(doc,'dragstart',ev=>{if(ev.target.closest('.hand [data-action="card"]'))ev.preventDefault()});
 return {cancel:()=>finish(),get active(){return !!gesture?.active}};
}
