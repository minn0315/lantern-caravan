/* 灯火のキャラバン 旧サイト → 新サイト（GitHub Pages）データ移行ボタン
 * 旧サイトの index.html と debug/index.html の </body> 直前に
 *   <script src="/migrate-out.js" defer></script>
 * を1行追加し、このファイルを公開フォルダの直下に置くだけで動作します（ゲーム本体は変更しません）。 */
(function(){
 'use strict';
 var NEW_SITE='https://minn0315.github.io/lantern-caravan/';
 var NEW_ORIGIN='https://minn0315.github.io';
 if(window.__lanternMigrateOut)return;window.__lanternMigrateOut=true;

 function collect(){
  var data={},n=0;
  for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf('lantern')===0&&k!=='lantern:balance-draft'){data[k]=localStorage.getItem(k);n++}}
  return{count:n,json:JSON.stringify({format:'lantern-backup',version:1,exportedAt:Date.now(),origin:location.origin,data:data})};
 }
 function download(json){
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([json],{type:'application/json'}));a.download='lantern-caravan-all-data.json';document.body.appendChild(a);a.click();a.remove();
 }
 // データを gzip 圧縮して base64url にする（URLの # 以降はサーバーへ送信されない）
 function toBase64Url(bytes){var bin='';for(var i=0;i<bytes.length;i+=0x8000)bin+=String.fromCharCode.apply(null,bytes.subarray(i,i+0x8000));return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
 function pack(json){
  if(!window.CompressionStream||!window.Response)return Promise.resolve('j.'+encodeURIComponent(json));
  var stream=new Blob([json]).stream().pipeThrough(new CompressionStream('gzip'));
  return new Response(stream).arrayBuffer().then(function(buf){return 'g.'+toBase64Url(new Uint8Array(buf))});
 }
 var busy=false;
 function migrate(){
  if(busy)return;var dump=collect();
  if(!dump.count){if(confirm('このブラウザには移すデータがありません。新しいサイトを開きますか？'))location.href=NEW_SITE;return}
  busy=true;setStatus('データをまとめています…');
  pack(dump.json).then(function(packed){
   if(packed.length<=1500000){location.href=NEW_SITE+'receive.html#data='+packed;return}
   download(dump.json);
   alert('データが大きいため、ファイル（lantern-caravan-all-data.json）に保存しました。\n新しいサイトの「設定・音量・セーブ」→「データの引き継ぎ」→「ファイルを選ぶ」で読み込んでください。');
   location.href=NEW_SITE;
  }).catch(function(){download(dump.json);alert('ファイル（lantern-caravan-all-data.json）に保存しました。新しいサイトの「データの引き継ぎ」で読み込んでください。');location.href=NEW_SITE});
 }
 var statusEl;
 function setStatus(text){if(statusEl)statusEl.textContent=text}
 function mount(){
  if(document.getElementById('lantern-migrate-banner'))return;
  var bar=document.createElement('div');bar.id='lantern-migrate-banner';bar.setAttribute('role','region');bar.setAttribute('aria-label','新しいサイトへの移行');
  bar.style.cssText='position:fixed;left:50%;bottom:calc(12px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:2147483000;display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;max-width:calc(100vw - 24px);background:#23241e;color:#ece3cc;border:1px solid #c96a4a;border-radius:12px;padding:10px 12px;box-shadow:0 8px 28px rgba(0,0,0,.45);font:14px/1.5 "Noto Sans JP",system-ui,sans-serif';
  var text=document.createElement('span');text.textContent='灯火のキャラバンは新しいサイトへ引っ越しました。';
  var go=document.createElement('button');go.type='button';go.textContent='新しいサイトへデータを移す';go.style.cssText='font:inherit;font-weight:700;background:#c96a4a;color:#fff;border:0;border-radius:8px;padding:8px 14px;cursor:pointer';
  go.addEventListener('click',migrate);
  var close=document.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label','閉じる');close.style.cssText='font:inherit;background:transparent;color:#b7ad94;border:0;padding:4px 8px;cursor:pointer;font-size:18px';
  close.addEventListener('click',function(){bar.remove();try{sessionStorage.setItem('lantern-migrate-banner-hidden','1')}catch(e){}});
  statusEl=document.createElement('small');statusEl.style.cssText='flex-basis:100%;text-align:center;color:#b7ad94';
  bar.appendChild(text);bar.appendChild(go);bar.appendChild(close);bar.appendChild(statusEl);
  document.body.appendChild(bar);
 }
 // タイトル画面にいる間だけ表示（戦闘などの操作を邪魔しない）
 function hidden(){try{return !!sessionStorage.getItem('lantern-migrate-banner-hidden')}catch(e){return false}}
 function sync(){if(hidden())return;var onTitle=!!document.querySelector('#app .title-layout');var bar=document.getElementById('lantern-migrate-banner');if(onTitle&&!bar)mount();else if(!onTitle&&bar&&!statusEl.textContent)bar.remove()}
 function start(){sync();var app=document.getElementById('app');if(app&&window.MutationObserver)new MutationObserver(sync).observe(app,{childList:true,subtree:false})}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
