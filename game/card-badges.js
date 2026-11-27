// カード効果の「アイコン＋数字」表示。
// 数値は cardLines（レリック・闘志・弱点などを反映済み）の文章から取り出すため、文章表示と必ず一致する。
const P={
 sword:'M14.5 3H21v6.5L10 20.5 7.5 18l-2 2L4 18.5l2-2L3.5 14 14.5 3Zm1.3 2-9.4 9.4 3.2 3.2L19 8.2V5h-3.2Z',
 swords:'M3 3h4.5l7 7-2.3 2.3-7-7H3V3Zm18 0v2.3l-9.5 9.5 2 2L12 18.4l-2-2-1.5 1.5L10 19.4 8.6 20.8l-4.4-4.4L5.6 15l1.5 1.5L8.6 15l-2-2 1.6-1.6 2 2L19.7 3H21ZM16.4 15.2l1.6-1.6 1.5 1.5 1.5-1.5 1.4 1.4-1.5 1.5L22.4 18 18 22.4l-1.4-1.4 1.5-1.5-1.7-1.7Z',
 shield:'M12 2 20 5v6.2c0 5-3.4 9.3-8 10.8-4.6-1.5-8-5.8-8-10.8V5l8-3Z',
 heart:'M12 21s-8.5-5.2-8.5-11.2A4.8 4.8 0 0 1 12 6.7a4.8 4.8 0 0 1 8.5 3.1C20.5 15.8 12 21 12 21Z',
 regen:'M12 21c-4.4 0-7-3-7-7 0-5 7-11 7-11s7 6 7 11c0 4-2.6 7-7 7Zm-1-8v-2.5h2V13h2.5v2H13v2.5h-2V15H8.5v-2H11Z',
 poison:'M9 2h6v2h-1v4.3l5.5 9.2A3 3 0 0 1 17 22H7a3 3 0 0 1-2.5-4.5L10 8.3V4H9V2Zm-.3 12-2.4 4.5c-.2.3 0 .5.3.5h10.8c.3 0 .5-.2.3-.5L15.3 14H8.7Z',
 weak:'M12 4.5C6.5 4.5 2.5 12 2.5 12s4 7.5 9.5 7.5 9.5-7.5 9.5-7.5-4-7.5-9.5-7.5Zm0 11.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2.3a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z',
 stun:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2.2a7.8 7.8 0 0 1 6.2 12.5L7.3 5.8A7.8 7.8 0 0 1 12 4.2Zm-6.2 3.1 10.9 10.9A7.8 7.8 0 0 1 5.8 7.3Z',
 power:'M12 2c1 3.2-1.8 4.6-.6 7.6.9-1.5 2.3-2.2 3.1-3.8 3 3.6 4.5 6.4 3.4 9.7C16.7 19.6 14.5 22 12 22s-5.6-1.8-6.2-5.3C5 12.7 8 9.5 9.6 7.4c-.2 2.6.6 3.6 1.4 4.4.8-3.8-1.7-6 1-9.8Z',
 thorns:'M12 2 14 8l6-2-2 6 4 2-6 2 2 6-6-3-6 3 2-6-6-2 4-2-2-6 6 2 2-6Z',
 down:'M11 3h2v13.2l4.6-4.6L19 13l-7 7-7-7 1.4-1.4 4.6 4.6V3Z',
 energy:'M13.5 2 4.5 13.5H11L9.5 22l10-12.5H13L13.5 2Z',
 draw:'M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm4 6v3H8v2h3v3h2v-3h3v-2h-3V9h-2Z',
 coin:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 3.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm-1 2.5v1.2c-1.3.3-2.2 1.2-2.2 2.4 0 1.5 1.2 2 2.7 2.4 1 .2 1.4.4 1.4.8s-.4.7-1.1.7c-.8 0-1.4-.3-1.9-.8l-1.2 1.2c.6.6 1.4 1 2.3 1.1V18h2v-1.3c1.3-.3 2.2-1.2 2.2-2.4 0-1.6-1.3-2.1-2.8-2.5-.9-.2-1.3-.4-1.3-.7s.4-.6 1-.6c.6 0 1.1.2 1.6.6l1.1-1.2c-.5-.5-1.2-.8-1.8-.9V8h-2Z',
 fuel:'M10 2h4v2h2v3h-1.2l1.9 2.4c.9 1.1 1.3 2.5 1.3 3.9V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6.7c0-1.4.4-2.8 1.3-3.9L9.2 7H8V4h2V2Zm2 9s-2.5 2.6-2.5 4.4a2.5 2.5 0 0 0 5 0C14.5 13.6 12 11 12 11Z',
 dice:'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2.5 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM7.5 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z',
 hurt:'M12 21s-8.5-5.2-8.5-11.2A4.8 4.8 0 0 1 12 6.7l-1.5 3.8 3 2-2 3.5 4.5-4.5-3-2 1.3-2.8a4.8 4.8 0 0 1 6.7 3.1C20.5 15.8 12 21 12 21Z',
 cleanse:'M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Zm6 11 .9 2.6 2.6.9-2.6.9L18 20l-.9-2.6-2.6-.9 2.6-.9L18 13ZM6 14l.7 1.8 1.8.7-1.8.7L6 19l-.7-1.8-1.8-.7 1.8-.7L6 14Z',
 vulnerable:'M12 2 20 5v6.2c0 5-3.4 9.3-8 10.8-4.6-1.5-8-5.8-8-10.8V5l8-3Zm-1 4v5.5l-2.5 2 3 2.5-1 3 4-4-3-2.5 2-2.2L12 6h-1Z',
 exhaust:'M12 2c3 4 6 6.5 6 11a6 6 0 0 1-12 0c0-2.8 1.6-4.6 3-6 0 2 .8 3.3 2 4 0-3.4-.8-6.2 1-9Z',
};
const svg=name=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${P[name]}" fill="currentColor" fill-rule="evenodd"/></svg>`;
const N='(\\d+(?:\\.\\d+)?(?:〜\\d+(?:\\.\\d+)?)?)';
// [正規表現, アイコン, 種類, 対象（全=全体 / 自=自分）, 表示する数字の組み立て]
const RULES=[
 [new RegExp(`^敵1体に ${N} ダメージ(?: ×(\\d+))?$`),'sword','attack','',m=>m[1]+(m[2]?`<i>×${m[2]}</i>`:'')],
 [new RegExp(`^敵全員に ${N} ダメージ(?: ×(\\d+))?$`),'swords','attack','全',m=>m[1]+(m[2]?`<i>×${m[2]}</i>`:'')],
 [new RegExp(`^選んだ仲間に 盾 ${N}$`),'shield','guard','',m=>m[1]],
 [new RegExp(`^自分に 盾 ${N}$`),'shield','guard','自',m=>m[1]],
 [new RegExp(`^仲間全員に 盾 ${N}$`),'shield','guard','全',m=>m[1]],
 [new RegExp(`^選んだ仲間の HP を ${N} 回復$`),'heart','heal','',m=>m[1]],
 [new RegExp(`^自分の HP を ${N} 回復$`),'heart','heal','自',m=>m[1]],
 [new RegExp(`^仲間全員の HP を ${N} 回復$`),'heart','heal','全',m=>m[1]],
 [new RegExp(`^仲間1人に 再生 ${N}$`),'regen','heal','',m=>m[1]],
 [new RegExp(`^仲間全員に 再生 ${N}$`),'regen','heal','全',m=>m[1]],
 [new RegExp(`^毒 ${N} を付与$`),'poison','debuff','',m=>m[1]],
 [new RegExp(`^敵全員に 毒 ${N}$`),'poison','debuff','全',m=>m[1]],
 [new RegExp(`^敵の毒を ${N}倍 にする$`),'poison','debuff','',m=>'×'+m[1]],
 [new RegExp(`^弱点 ${N}回 を付与$`),'weak','debuff','',m=>m[1]],
 [new RegExp(`^敵全員に 弱点 ${N}$`),'weak','debuff','全',m=>m[1]],
 [new RegExp(`^足止め ${N}回$`),'stun','debuff','',m=>m[1]],
 [new RegExp(`^敵全員を 足止め ${N}回$`),'stun','debuff','全',m=>m[1]],
 [new RegExp(`^敵の攻撃力 -${N}$`),'down','debuff','',m=>'-'+m[1]],
 [new RegExp(`^自分の闘志 \\+${N}$`),'power','buff','自',m=>'+'+m[1]],
 [new RegExp(`^仲間1人の闘志 \\+${N}$`),'power','buff','',m=>'+'+m[1]],
 [new RegExp(`^仲間全員の闘志 \\+${N}$`),'power','buff','全',m=>'+'+m[1]],
 [new RegExp(`^仲間1人に 反撃 ${N}$`),'thorns','buff','',m=>m[1]],
 [new RegExp(`^気力 \\+${N}$`),'energy','resource','',m=>'+'+m[1]],
 [new RegExp(`^カードを ${N}枚 引く$`),'draw','resource','',m=>'+'+m[1]],
 [new RegExp(`^次ターンの気力 \\+${N}$`),'energy','resource','次',m=>'+'+m[1]],
 [new RegExp(`^次ターンの手札 \\+${N}$`),'draw','resource','次',m=>'+'+m[1]],
 [new RegExp(`^銀貨 ${N}枚を得る$`),'coin','resource','',m=>'+'+m[1]],
 [new RegExp(`^銀貨 ${N}枚を消費$`),'coin','cost','',m=>'-'+m[1]],
 [new RegExp(`^灯油 ${N}を消費$`),'fuel','cost','',m=>'-'+m[1]],
 [new RegExp(`^使用者のHP -${N}$`),'hurt','cost','自',m=>'-'+m[1]],
 [new RegExp(`^自分に 毒 ${N}$`),'poison','cost','自',m=>m[1]],
 [new RegExp(`^自分に 脆弱 ${N}$`),'vulnerable','cost','自',m=>m[1]],
 [/^対象の毒・脆弱を取り除く$/,'cleanse','heal','',()=>''],
 [/^使用者の毒・脆弱を取り除く$/,'cleanse','heal','自',()=>''],
 [/^全員の毒・脆弱を取り除く$/,'cleanse','heal','全',()=>''],
 [/^消滅：この戦闘では再使用不可$/,'exhaust','cost','',()=>'消滅'],
 [/^サイコロ(\d+)個：/,'dice','resource','',m=>m[1]+'<i>個</i>'],
 [/^敵の盾を無視する$/,null,'attack','',()=>'盾無視'],
 [/^敵の盾を先にすべて破壊$/,null,'attack','',()=>'盾破壊'],
 [/^戦闘不能の仲間にも使える$/,null,'heal','',()=>'復活可'],
 [/^敵の単体攻撃を使用者に向ける$/,null,'guard','',()=>'狙いを引受'],
 [/^特殊：山札の一番下・デッキ全体で\d+枚まで$/,null,'resource','',()=>'山札の底'],
];
// 文章1行 → バッジ（該当しなければ null）
export function lineBadge(line){
 for(const[re,iconName,tone,scope,value]of RULES){const m=re.exec(line);if(m)return{icon:iconName,tone,scope,value:value(m),line}}
 return null;
}
// 短い補足文（そのまま載せると長すぎる説明は短縮）
function shortNote(line){
 return line
  .replace(/^(.+)に応じて威力上昇（現在の威力に反映）$/,'$1で威力上昇')
  .replace(/^自分HP半分以下なら威力 \+(\d+)$/,'自分HP半分以下：威力+$1')
  .replace(/^敵HP半分以下なら威力 \+(\d+)$/,'敵HP半分以下：威力+$1')
  .replace(/^敵に弱点があれば (\d+)枚 引く$/,'敵が弱点なら$1枚引く')
  .replace(/^先に敵の毒をすべて消費しその数ぶんダメージ/,'敵の毒を消費してダメージ')
  .replace(/^所持銀貨(\d+)枚ごとに威力\+1.*$/,'銀貨$1枚ごとに威力+1')
  .replace(/^特殊：山札の一番下・デッキ全体で1枚まで$/,'特殊カード（山札の一番下）')
  .replace(/^効果なし　使うと戦闘中の山札から消える$/,'効果なし・使うと消える');
}
export function badgeHTML(b){
 if(!b.icon)return `<span class="cb cb-tag cb-${b.tone}" title="${b.line.replace(/"/g,'&quot;')}">${b.value}</span>`;
 const scope=b.scope?`<em class="cb-scope">${b.scope}</em>`:'';
 return `<span class="cb cb-${b.tone}${/〜/.test(b.value)?' cb-range':''}" title="${b.line.replace(/"/g,'&quot;')}">${svg(b.icon)}${b.value?`<b>${b.value}</b>`:''}${scope}</span>`;
}
// カード表面用：バッジ列＋短い補足（最大 noteLimit 行、残りは拡大表示で確認）
export function cardFaceHTML(lines,{noteLimit=2}={}){
 const badges=[],notes=[];
 for(const line of lines){const b=lineBadge(line);if(b)badges.push(b);else notes.push(shortNote(line))}
 const shown=notes.slice(0,noteLimit),hidden=notes.length-shown.length;
 return `<span class="cb-row">${badges.map(badgeHTML).join('')}</span>${shown.map(n=>`<span class="cb-note">${n.replace(/(\d+(?:〜\d+)?)/g,'<b>$1</b>')}</span>`).join('')}${hidden>0?`<span class="cb-more">ほか${hidden}件（拡大で確認）</span>`:''}`;
}
// 凡例（遊び方・設定などで使用）
export const BADGE_LEGEND=[['sword','attack','敵1体にダメージ'],['swords','attack','敵全員にダメージ'],['shield','guard','盾'],['heart','heal','HP回復'],['regen','heal','再生'],['poison','debuff','毒'],['weak','debuff','弱点'],['stun','debuff','足止め'],['down','debuff','敵の攻撃力ダウン'],['power','buff','闘志'],['thorns','buff','反撃'],['energy','resource','気力'],['draw','resource','カードを引く'],['coin','resource','銀貨'],['dice','resource','サイコロ（数値は出目で変化）'],['fuel','cost','灯油'],['hurt','cost','自分のHPを消費'],['vulnerable','cost','脆弱'],['cleanse','heal','毒・脆弱を解除'],['exhaust','cost','消滅（この戦闘で再使用不可）']];
export function legendHTML(){return `<div class="cb-legend">${BADGE_LEGEND.map(([i,t,label])=>`<span class="cb cb-${t}">${svg(i)}</span><span>${label}</span>`).join('')}<span class="cb cb-attack"><em class="cb-scope">全</em></span><span>全体が対象</span><span class="cb cb-guard"><em class="cb-scope">自</em></span><span>自分が対象</span><span class="cb cb-resource"><em class="cb-scope">次</em></span><span>次のターン</span></div>`}
