import * as C from './catalog.js?v=52';
import {bindBalance,applyBalance,emptyBalance} from './balance-runtime.js?v=52';
bindBalance({heroes:C.COMPANIONS,enemies:C.ENEMIES,bosses:C.BOSSES,relics:C.RELICS,cards:C.CARDS});
// 新しい版が公開されていたら、古いキャッシュのままにせず最新版を読み直す
const BUILD='v=52';
// version.json は配信側（CDN）にも10分残るため、毎回別URLで取りに行く。読み直しても古ければもう一度だけ別URLで試す
try{const r=await fetch('version.json?t='+Date.now(),{cache:'no-store',signal:AbortSignal.timeout(4000)});if(r.ok){const latest=(await r.json()).build;const key='lantern-build-reload:'+latest;let tries=0;try{tries=Number(sessionStorage.getItem(key))||0}catch{}if(latest&&latest!==BUILD&&tries<2){try{sessionStorage.setItem(key,String(tries+1))}catch{}const url=new URL(location.href);url.searchParams.set('build',latest.replace('v=',''));if(tries)url.searchParams.set('t',Date.now().toString(36));location.replace(url.href);await new Promise(()=>{})}}}catch{}
const preview=/\/debug(\/(index\.html)?)?$/.test(location.pathname)&&new URLSearchParams(location.search).has('balancePreview');
let current=emptyBalance();
try{if(preview)current=JSON.parse(localStorage.getItem('lantern:balance-draft')||'null')||current;else{const r=await fetch('api/balance/current',{cache:'no-store',signal:AbortSignal.timeout(6000)});if(r.ok)current=await r.json()}applyBalance(current)}catch{applyBalance(emptyBalance())}
const app=await import('./app.js?v=52');
if(preview){const badge=document.createElement('div');badge.className='balance-preview-badge';badge.textContent='未公開の性能プレビュー';document.body.append(badge)}
else{let pending=false;async function refresh(){if(pending||document.hidden)return;pending=true;try{const r=await fetch('api/balance/current',{cache:'no-store',signal:AbortSignal.timeout(6000)});if(r.ok){const next=await r.json();if(next.revision!==current.revision){app.receiveBalanceUpdate(next);current=next}}}catch{}finally{pending=false}}setInterval(refresh,45000);document.addEventListener('visibilitychange',refresh)}
