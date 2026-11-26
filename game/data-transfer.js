// 全データ（セーブ・手動記録・実績・解放状況・図鑑・隠し要素・設定・デバッグ版データ）の書き出し／読み込み
import {mergeProgress,emptyProgress} from './progress.js?v=50';
import {decodeSave} from './saves.js?v=50';
import {normalizeHiddenProgress} from './hidden-traveler.js?v=50';

export const BACKUP_FORMAT='lantern-backup';
const PROGRESS_KEYS=['lantern-caravan-progress-v1','lantern-debug:lantern-caravan-progress-v1'];
const EXCLUDED=new Set(['lantern:balance-draft']);
const isGameKey=key=>typeof key==='string'&&key.startsWith('lantern')&&!EXCLUDED.has(key)&&key.length<200;

export function collectBackup(storage=globalThis.localStorage){
 const data={};
 for(let i=0;i<storage.length;i++){const key=storage.key(i);if(isGameKey(key))data[key]=storage.getItem(key)}
 return{format:BACKUP_FORMAT,version:1,exportedAt:Date.now(),origin:globalThis.location?.origin||'',data};
}

export function encodeBackup(storage){return JSON.stringify(collectBackup(storage))}

// 旧サイトのブックマークレット・本サイトの書き出し・コピーしたテキストのどれでも受け付ける
export function parseBackup(text){
 let raw;try{raw=JSON.parse(String(text).trim())}catch{throw Error('引き継ぎデータを読み取れませんでした。ファイルまたは貼り付けた内容を確認してください')}
 if(!raw||raw.format!==BACKUP_FORMAT||!raw.data||typeof raw.data!=='object'||Array.isArray(raw.data))throw Error('灯火のキャラバンの引き継ぎデータではありません');
 const data={};for(const[key,value]of Object.entries(raw.data))if(isGameKey(key)&&typeof value==='string'&&value.length<20_000_000)data[key]=value;
 if(!Object.keys(data).length)throw Error('引き継ぐデータが入っていません。旧サイトで一度遊んだブラウザで書き出してください');
 return{...raw,data};
}

const parseJSON=v=>{try{return JSON.parse(v)}catch{return null}};

export function summarizeBackup(backup){
 const keys=Object.keys(backup.data),progress=parseJSON(backup.data['lantern-caravan-progress-v1']);
 const unlocked=progress?.unlocked?Object.values(progress.unlocked).filter(Boolean).length:0;
 let run=null;const auto=backup.data['lantern-caravan-save-v1'];if(auto){try{const s=decodeSave(auto).state;run={chapter:s.chapter+1,step:Math.max(0,s.step+1),phase:s.phase}}catch{}}
 return{
  keys:keys.length,
  achievements:unlocked,
  travelers:Array.isArray(progress?.collected)?progress.collected.length:0,
  wins:progress?.stats?.wins||0,
  run,
  manualSlots:keys.filter(k=>/^lantern-manual-slot-\d+$/.test(k)).length,
  settings:keys.some(k=>k.includes('prefs')),
  debug:keys.some(k=>k.startsWith('lantern-debug:')),
 };
}

// 実績・解放状況は「今ある記録」と統合（どちらかで達成していれば達成）。セーブ・設定は引き継ぎデータで置き換える。
export function applyBackup(backup,storage=globalThis.localStorage){
 let applied=0;
 for(const[key,value]of Object.entries(backup.data)){
  if(PROGRESS_KEYS.includes(key)){
   const incoming=parseJSON(value);if(!incoming)continue;
   const current=parseJSON(storage.getItem(key));
   const merged=mergeProgress(mergeProgress(emptyProgress(),current),incoming);
   // 統計（勝利数など）は多い方を採用（mergeProgressは既存側を優先するため）
   for(const[k,v]of Object.entries(incoming.stats||{}))if(typeof v==='number'&&Number.isFinite(v)&&!(merged.stats?.[k]>=v))merged.stats[k]=v;
   const finalProgress=normalizeHiddenProgress(merged);
   storage.setItem(key,JSON.stringify(finalProgress));applied++;continue;
  }
  storage.setItem(key,value);applied++;
 }
 return applied;
}
