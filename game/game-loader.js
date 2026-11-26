import * as C from './catalog.js?v=46';
import {bindBalance,applyBalance,emptyBalance} from './balance-runtime.js?v=46';
bindBalance({heroes:C.COMPANIONS,enemies:C.ENEMIES,bosses:C.BOSSES,relics:C.RELICS,cards:C.CARDS});
const preview=/\/debug(\/(index\.html)?)?$/.test(location.pathname)&&new URLSearchParams(location.search).has('balancePreview');
let current=emptyBalance();
try{if(preview)current=JSON.parse(localStorage.getItem('lantern:balance-draft')||'null')||current;else{const r=await fetch('api/balance/current',{cache:'no-store',signal:AbortSignal.timeout(6000)});if(r.ok)current=await r.json()}applyBalance(current)}catch{applyBalance(emptyBalance())}
const app=await import('./app.js?v=46');
if(preview){const badge=document.createElement('div');badge.className='balance-preview-badge';badge.textContent='未公開の性能プレビュー';document.body.append(badge)}
else{let pending=false;async function refresh(){if(pending||document.hidden)return;pending=true;try{const r=await fetch('api/balance/current',{cache:'no-store',signal:AbortSignal.timeout(6000)});if(r.ok){const next=await r.json();if(next.revision!==current.revision){app.receiveBalanceUpdate(next);current=next}}}catch{}finally{pending=false}}setInterval(refresh,45000);document.addEventListener('visibilitychange',refresh)}
