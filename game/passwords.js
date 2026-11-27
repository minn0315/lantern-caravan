// タイトル画面のパスワード　正しいパスワードで対応する機能を解放する。
// パスワード本体はソースに平文で置かずSHA-256（正規化後）のハッシュで照合する。
//
// 追加方法：
//   1. ブラウザのコンソールで  await (await import('./passwords.js?v=NN')).passwordHash('合言葉')  を実行してハッシュを得る
//   2. 下の PASSWORDS に { hash:'得たハッシュ', feature:'機能ID', label:'解放される内容（表示名）' } を追加
//   3. ゲーム側で hasFeature(storage,'機能ID') を見て機能を有効にする
export const PASSWORDS=[
 {hash:'e2c30a67510b677ccdd6a5c4b78deee5e90d71ff6e7667114168219b774a1071',feature:'maou',label:'まおうを最初の旅人に選べる'},
];
const KEY='lantern-caravan-passwords-v1';
export function normalizePassword(text){return String(text||'').normalize('NFKC').replace(/\s+/g,'').toUpperCase()}
export async function passwordHash(text){
 const bytes=new TextEncoder().encode('lantern:'+normalizePassword(text));
 const digest=await crypto.subtle.digest('SHA-256',bytes);
 return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
export function unlockedFeatures(storage){try{const list=JSON.parse(storage.getItem(KEY)||'[]');return Array.isArray(list)?list.filter(x=>typeof x==='string'):[]}catch{return[]}}
export function hasFeature(storage,feature){return unlockedFeatures(storage).includes(feature)}
// 結果: {status:'empty'|'wrong'|'already'|'unlocked', entry?}
export async function redeemPassword(storage,text){
 if(!normalizePassword(text))return{status:'empty'};
 const hash=await passwordHash(text),entry=PASSWORDS.find(p=>p.hash===hash);
 if(!entry)return{status:'wrong'};
 const list=unlockedFeatures(storage);if(list.includes(entry.feature))return{status:'already',entry};
 storage.setItem(KEY,JSON.stringify([...list,entry.feature]));return{status:'unlocked',entry};
}
export function unlockedLabels(storage){const list=unlockedFeatures(storage);return PASSWORDS.filter(p=>list.includes(p.feature)).map(p=>p.label)}
