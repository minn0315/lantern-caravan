import {assignEnemyTraits,TREASURE_ENEMY} from './enemy-traits.js?v=52';
import {KITS,LEGACY_SPECIAL_NAMES,kitSpecials,finalizeKitEffect} from './character-kits.js?v=52';
import {roundHP} from './health.js?v=52';
import {enemyFlavor} from './enemy-lore.js?v=52';
import {designRelic} from './relic-design.js?v=52';
import {DEMON_BOSS} from './demon-stage.js?v=52';
import {simplifyRelic} from './simple-relics.js?v=52';
import {attachUpgradePool} from './upgrade-pool.js?v=52';
import {ADDITIONAL_RELICS,SPECIAL_RELICS} from './relic-expansion.js?v=52';
export {SPECIAL_RELICS};
export const HEROES=[{id:'row',name:'ロウ',job:'灯の守り手',max:76,color:'#b8c59c',icon:'shield',actor:0,art:0,passive:'通常の盾カードの効果 +1',bonus:{block:1}},{id:'sena',name:'セナ',job:'星詠みの射手',max:56,color:'#c4b2e7',icon:'bow',actor:1,art:1,passive:'弱点のある敵への攻撃 +1',bonus:{weakAttack:1}},{id:'nico',name:'ニコ',job:'旅の錬金術師',max:60,color:'#e2ba86',icon:'flask',actor:2,art:2,passive:'回復カードの回復量 +1',bonus:{heal:1}}];
export const COMPANIONS=[...HEROES,{id:'kai',name:'カイ',job:'旧都の衛士',max:86,color:'#a9bc9b',icon:'shield',actor:0,art:3,passive:'毎ターン自身に盾2',bonus:{selfTurnShield:2}},{id:'eda',name:'エダ',job:'灰刃の傭兵',max:66,color:'#b7b48e',icon:'sword',actor:0,art:4,passive:'自身の攻撃カードの威力 +2',bonus:{attack:2}},{id:'rika',name:'リカ',job:'湿地の猟師',max:62,color:'#c4afd3',icon:'bow',actor:1,art:5,passive:'自身が付与する毒 +2',bonus:{poison:2}},{id:'mio',name:'ミオ',job:'迷い星の占者',max:50,color:'#b2b8dc',icon:'star',actor:1,art:6,passive:'毎ターン最初の策略カードで1枚引く',bonus:{firstSkillDraw:1}},{id:'fin',name:'フィン',job:'巡礼の薬師',max:66,color:'#d8bf91',icon:'leaf',actor:2,art:7,passive:'回復カードの回復量 +3',bonus:{heal:3}},{id:'towa',name:'トワ',job:'硝子の調香師',max:54,color:'#d5b195',icon:'flask',actor:2,art:8,passive:'自身の全体攻撃 +3、毒 +1',bonus:{aoe:3,poison:1}}];

// Twenty-one travelers with independent combat economies and passives.
COMPANIONS.push({"id": "orlo", "name": "オルロ", "job": "銀貨の剣商", "actor": 0, "max": 64, "icon": "coin", "color": "#c7aa72", "art": 9, "bonus": {"cardGold": 2}, "passive": "自身のカード使用後に銀貨2枚を得る。", "theme": "gold"});
COMPANIONS.push({"id": "luca", "name": "ルカ", "job": "六面の賭博師", "actor": 1, "max": 58, "icon": "star", "color": "#b4afcc", "art": 10, "bonus": {"diceAttack": 1}, "passive": "サイコロを使う攻撃カードのダメージ+1。", "theme": "dice"});
COMPANIONS.push({"id": "bram", "name": "ブラム", "job": "城壁の石工", "actor": 0, "max": 88, "icon": "shield", "color": "#c7aa72", "art": 11, "bonus": {"selfTurnShield": 4}, "passive": "毎ターン自身に盾4。盾を残して攻める。", "theme": "armor"});
COMPANIONS.push({"id": "shion", "name": "シオン", "job": "灰書の綴り手", "actor": 2, "max": 52, "icon": "book", "color": "#a3ba9a", "art": 12, "bonus": {"exhaustDraw": 1}, "passive": "消滅カードを使うたび1枚引く。", "theme": "exhaust"});
COMPANIONS.push({"id": "haku", "name": "ハク", "job": "白刃の決闘士", "actor": 0, "max": 62, "icon": "sword", "color": "#c7aa72", "art": 13, "bonus": {"lowAttack": 4}, "passive": "HP半分以下のとき攻撃威力+4。", "theme": "blood"});
COMPANIONS.push({"id": "yura", "name": "ユラ", "job": "毒蔓の園師", "actor": 2, "max": 60, "icon": "leaf", "color": "#a3ba9a", "art": 14, "bonus": {"poison": 3}, "passive": "自身が付与する毒+3。毒を消費して大打撃。", "theme": "venom"});
COMPANIONS.push({"id": "glen", "name": "グレン", "job": "灯油の機工士", "actor": 0, "max": 72, "icon": "flame", "color": "#c7aa72", "art": 15, "bonus": {"fuelTurn": 1}, "passive": "毎ターン灯油1回復。灯油を燃やして攻める。", "theme": "fuel"});
COMPANIONS.push({"id": "rune", "name": "ルネ", "job": "紙片の魔導師", "actor": 2, "max": 54, "icon": "book", "color": "#a3ba9a", "art": 16, "bonus": {"openingDraw": 1}, "passive": "毎戦闘、最初のターンに1枚多く引く。", "theme": "hand"});
COMPANIONS.push({"id": "aoi", "name": "アオイ", "job": "青祈の施療師", "actor": 2, "max": 64, "icon": "heart", "color": "#a3ba9a", "art": 17, "bonus": {"woundedHeal": 3}, "passive": "対象のHP半分以下なら回復量+3。", "theme": "wounded"});
COMPANIONS.push({"id": "saku", "name": "サク", "job": "拾遺の盗賊", "actor": 1, "max": 60, "icon": "bag", "color": "#b4afcc", "art": 18, "bonus": {"discardShield": 1}, "passive": "毎ターン自身に捨札2枚につき盾1（最大6）。", "theme": "discard"});
COMPANIONS.push({"id": "iris", "name": "イリス", "job": "緋眼の剣客", "actor": 1, "max": 58, "icon": "eye", "color": "#b4afcc", "art": 19, "bonus": {"weakAttack": 3}, "passive": "弱点のある敵への攻撃+3。", "theme": "weak"});
COMPANIONS.push({"id": "noa", "name": "ノア", "job": "冬告げの鐘守", "actor": 2, "max": 62, "icon": "bell", "color": "#a3ba9a", "art": 20, "bonus": {"stunnedAttack": 5}, "passive": "足止め中の敵への攻撃+5。", "theme": "frost"});
COMPANIONS.push({"id": "ren", "name": "レン", "job": "雷鼓の奏者", "actor": 0, "max": 68, "icon": "star", "color": "#c7aa72", "art": 21, "bonus": {"chainAttack": 1}, "passive": "このターンの使用枚数ぶん攻撃威力+1（最大6）。", "theme": "chain"});
COMPANIONS.push({"id": "lira", "name": "リラ", "job": "巡礼の吟遊詩人", "actor": 1, "max": 58, "icon": "sun", "color": "#b4afcc", "art": 22, "bonus": {"harmonyHeal": 2}, "passive": "自身のカード使用後に行動済み旅人数ぶんHP回復（最大4）。", "theme": "harmony"});
COMPANIONS.push({"id": "zeke", "name": "ジーク", "job": "弔灯の墓守", "actor": 0, "max": 78, "icon": "moon", "color": "#c7aa72", "art": 23, "bonus": {"fallenAttack": 6}, "passive": "戦闘不能の仲間1人につき攻撃威力+6。", "theme": "fallen"});
COMPANIONS.push({"id": "koto", "name": "コト", "job": "糸操りの人形師", "actor": 2, "max": 54, "icon": "eye", "color": "#a3ba9a", "art": 24, "bonus": {"firstSkillShield": 5}, "passive": "毎ターン最初の策略で自身に盾5。", "theme": "puppet"});
COMPANIONS.push({"id": "fuga", "name": "フウガ", "job": "風渡りの修験者", "actor": 1, "max": 56, "icon": "leaf", "color": "#b4afcc", "art": 25, "bonus": {"zeroShield": 3}, "passive": "気力0のカード使用後に自身に盾3。", "theme": "wind"});
COMPANIONS.push({"id": "hina", "name": "ヒナ", "job": "紅燈の祭司", "actor": 2, "max": 60, "icon": "flame", "color": "#a3ba9a", "art": 26, "bonus": {"selfHarmPower": 1}, "passive": "自身のHPを代償にするカード使用後に闘志+1。", "theme": "flame"});
COMPANIONS.push({"id": "sui", "name": "スイ", "job": "潮詠みの魔女", "actor": 2, "max": 64, "icon": "flask", "color": "#a3ba9a", "art": 27, "bonus": {"regenTurn": 1}, "passive": "毎ターン自身に再生1。再生と全体回復が得意。", "theme": "tide"});
COMPANIONS.push({"id": "tetsu", "name": "テツ", "job": "旅路の鍛冶師", "actor": 0, "max": 82, "icon": "anvil", "color": "#c7aa72", "art": 28, "bonus": {"upgradeAttack": 2}, "passive": "強化済みカードの攻撃威力+2。", "theme": "forge"});
COMPANIONS.push({"id": "mira", "name": "ミラ", "job": "鏡盾の騎士", "actor": 0, "max": 74, "icon": "shield", "color": "#c7aa72", "art": 29, "bonus": {"turnThorns": 2}, "passive": "毎ターン自身に反撃2。反撃量を攻撃に変える。", "theme": "mirror"});
COMPANIONS.push({id:'aurora',name:'アウロラ',job:'黎明の継承者',max:92,color:'#e4c57c',icon:'sun',actor:2,art:30,hidden:true,theme:'aurora',passive:'毎ターン気力+1・自身に盾6。攻撃威力+6、回復量+4。',bonus:{energy:1,selfTurnShield:6,attack:6,heal:4}});
// blackparty：通常の方法では仲間にならない旅人（プレイヤーには見えない括り）
COMPANIONS.push({id:'maou',name:'まおう',job:'からっぽの王',actor:1,max:62,icon:'star',color:'#9fa8de',art:31,blackparty:true,bonus:{ownerRefund:1},passive:'元の持ち主ごとに最初の1枚で気力+1（1ターン10回まで）　同じ持ち主の2枚目からはコスト+2'});
export const SPECIAL_CHAPTER={name:'無明の星骸',en:'THE ABYSSAL CONVERGENCE',desc:'五十の夜が重なるときだけ現れる、灯の届かない異界。',color:'#d197a5',beats:['夜の道に存在しないはずの扉が開く。','時を越えた巡礼者の影。ここでは灯さえ喰らわれる。','古い宿場の灯だけがかろうじて異界の侵食を退けている。','星の亡骸が目を開く。この世界に戻るには主を越えるしかない。']};
export const CHAPTERS=[
{name:'ささやきの森',en:'THE WHISPERING WOODS',desc:'故郷を覆った夜を抜け、根の王が守る古道へ。',boss:'根を張る王',color:'#a6b991',beats:['村を発った。古い灯台へ続く道は森に呑まれていた。','木々に刻まれた巡礼の印。先を歩いた誰かがまだいる。','森の奥で地面が脈を打つ。灯を奪った根の気配が近い。','古道の門が見えた。森の主を越えれば霧の巡礼路へ出られる。']},
{name:'霧の巡礼路',en:'THE DROWNED PILGRIMAGE',desc:'沈んだ修道院で夜を呼ぶ鐘を止める。',boss:'鐘楼の番人',color:'#a5bacb',beats:['森を越えると道は冷たい水面へと続いていた。','水没した祠から忘れられた巡礼歌が聞こえる。','鐘が鳴るたびに霧が濃くなる。修道院はまだ夜を祈っていた。','鐘楼の影が迫る。この鐘を止めなければ王都へは進めない。']},
{name:'灰の王都',en:'THE ASHEN CAPITAL',desc:'灰冠の支配を破り夜明けの門を開く。',boss:'灰冠の女王',color:'#d09e7e',beats:['霧の向こうに焼け落ちた王都が姿を現した。','瓦礫の壁に最後の夜を記した布告が貼られている。','王城はまだ熱を持つ。失われた朝を灰の兵が守り続けていた。','大門に灯をかざす。王都の主との決戦が待つ。']},
{name:'夜明けの境界',en:'THE EDGE OF DAWN',desc:'朝を奪ったものと対峙し最後の灯を空へ。',boss:'終わらない夜',color:'#c0b3d0',beats:['王都の門を抜けると地平そのものが割れていた。','星の残骸が道を照らす。ここでは夜さえ、形を失っている。','灯は小さい。それでも三人の影は消えなかった。','夜明けの境界に着いた。最後の戦いを越え、空に灯を返そう。']}
];
CHAPTERS.push(
{name:'氷晶の採掘場',en:'THE FROZEN QUARRY',desc:'氷に閉じ込められた灯の鉱脈をたどる。',boss:'未知の章の主',color:'#a5c8d1',beats:['氷に閉じ込められた灯の鉱脈をたどる。', '氷晶の採掘場にもかつて朝はあった。残された巡礼の印が道を示している。', '旅人たちは灯を囲み、次の門へ進む支度を整えた。', '遠くに門が見えた。この土地の主がその向こうで待っている。']},
{name:'胞子の庭',en:'THE SPORE GARDENS',desc:'光る胞子が降る、忘れられた庭を抜ける。',boss:'未知の章の主',color:'#b7bd92',beats:['光る胞子が降る、忘れられた庭を抜ける。', '胞子の庭にもかつて朝はあった。残された巡礼の印が道を示している。', '旅人たちは灯を囲み、次の門へ進む支度を整えた。', '遠くに門が見えた。この土地の主がその向こうで待っている。']},
{name:'砂塵の霊廟',en:'THE DUSTBOUND TOMB',desc:'砂の下に眠る王の道を探す。',boss:'未知の章の主',color:'#d2b986',beats:['砂の下に眠る王の道を探す。', '砂塵の霊廟にもかつて朝はあった。残された巡礼の印が道を示している。', '旅人たちは灯を囲み、次の門へ進む支度を整えた。', '遠くに門が見えた。この土地の主がその向こうで待っている。']},
{name:'錆の歯車都市',en:'THE RUSTED CITY',desc:'止まらない機械の街で次の門を開く。',boss:'未知の章の主',color:'#bb9f7c',beats:['止まらない機械の街で次の門を開く。', '錆の歯車都市にもかつて朝はあった。残された巡礼の印が道を示している。', '旅人たちは灯を囲み、次の門へ進む支度を整えた。', '遠くに門が見えた。この土地の主がその向こうで待っている。']},
{name:'深紅の湿原',en:'THE CRIMSON MARSH',desc:'血色の葦と古い祈りが揺れる湿原へ。',boss:'未知の章の主',color:'#bd8c8e',beats:['血色の葦と古い祈りが揺れる湿原へ。', '深紅の湿原にもかつて朝はあった。残された巡礼の印が道を示している。', '旅人たちは灯を囲み、次の門へ進む支度を整えた。', '遠くに門が見えた。この土地の主がその向こうで待っている。']},
{name:'沈黙の書庫',en:'THE SILENT ARCHIVE',desc:'夜の始まりを記した失われた書を追う。',boss:'未知の章の主',color:'#b2a1c3',beats:['夜の始まりを記した失われた書を追う。', '沈黙の書庫にもかつて朝はあった。残された巡礼の印が道を示している。', '旅人たちは灯を囲み、次の門へ進む支度を整えた。', '遠くに門が見えた。この土地の主がその向こうで待っている。']},
{name:'竜骨の峡谷',en:'THE DRAGONBONE RIFT',desc:'巨大な竜の骨が架ける橋を渡る。',boss:'未知の章の主',color:'#c7baa0',beats:['巨大な竜の骨が架ける橋を渡る。', '竜骨の峡谷にもかつて朝はあった。残された巡礼の印が道を示している。', '旅人たちは灯を囲み、次の門へ進む支度を整えた。', '遠くに門が見えた。この土地の主がその向こうで待っている。']},
{name:'雷鳴の浮島',en:'THE THUNDER ISLES',desc:'雷雲の間に浮かぶ島々を越える。',boss:'未知の章の主',color:'#9cb9d3',beats:['雷雲の間に浮かぶ島々を越える。', '雷鳴の浮島にもかつて朝はあった。残された巡礼の印が道を示している。', '旅人たちは灯を囲み、次の門へ進む支度を整えた。', '遠くに門が見えた。この土地の主がその向こうで待っている。']},
{name:'鏡の宮廷',en:'THE MIRROR COURT',desc:'映るもののすべてが真実ではない宮廷へ。',boss:'未知の章の主',color:'#b9c5d1',beats:['映るもののすべてが真実ではない宮廷へ。', '鏡の宮廷にもかつて朝はあった。残された巡礼の印が道を示している。', '旅人たちは灯を囲み、次の門へ進む支度を整えた。', '遠くに門が見えた。この土地の主がその向こうで待っている。']},
{name:'星屑の墓標',en:'THE STARFALL GRAVE',desc:'落ちた星が眠る空の墓地を進む。',boss:'未知の章の主',color:'#b1a3d3',beats:['落ちた星が眠る空の墓地を進む。', '星屑の墓標にもかつて朝はあった。残された巡礼の印が道を示している。', '旅人たちは灯を囲み、次の門へ進む支度を整えた。', '遠くに門が見えた。この土地の主がその向こうで待っている。']},
{name:'止まった大聖堂',en:'THE TIMELESS CATHEDRAL',desc:'時を失った聖堂で最後の鐘を探す。',boss:'未知の章の主',color:'#baa991',beats:['時を失った聖堂で最後の鐘を探す。', '止まった大聖堂にもかつて朝はあった。残された巡礼の印が道を示している。', '旅人たちは灯を囲み、次の門へ進む支度を整えた。', '遠くに門が見えた。この土地の主がその向こうで待っている。']},
{name:'黎明の心臓',en:'THE HEART OF DAWN',desc:'夜を生み続ける心臓に最後の灯を届ける。',boss:'未知の章の主',color:'#dbbc8b',beats:['夜を生み続ける心臓に最後の灯を届ける。', '黎明の心臓にもかつて朝はあった。残された巡礼の印が道を示している。', '旅人たちは灯を囲み、次の門へ進む支度を整えた。', '遠くに門が見えた。この土地の主がその向こうで待っている。']}
);
const cards={};
function add(actor,id,name,cost,effect,icon='sword',power={},tactical={}){
 const type=effect.damage||effect.aoe?'攻撃':effect.heal||effect.allHeal||effect.selfHeal||effect.regen||effect.allRegen||effect.revive?'回復':effect.shield||effect.selfShield||effect.allShield||effect.thorns?'守備':'策略';
 let p={...power},t={...tactical};
 if(!Object.keys(p).length){for(let k of ['damage','aoe','shield','selfShield','allShield','heal','allHeal','selfHeal','poison','allPoison','regen','allRegen','power','allPower','thorns'])if(effect[k])p[k]=effect[k]+(k==='damage'||k==='shield'||k==='heal'?4:k==='aoe'||k==='allShield'||k==='allHeal'?3:2);if(!Object.keys(p).length){if(effect.draw)p.draw=effect.draw+1;else if(effect.energy)p.energy=effect.energy+1;else if(effect.weak)p.weak=effect.weak+2;else if(effect.nextEnergy)p.nextEnergy=effect.nextEnergy+1;else p.draw=1}}
 if(!Object.keys(t).length){if(cost>0)t.cost=cost-1;else if(effect.exhaust)t.exhaust=false;else t.draw=(effect.draw||0)+1}
 cards[id]={id,name,actor,cost,type,icon,...effect,upgrades:{power:{name:'鍛錬',...p},tactical:{name:'技巧',...t}}};
}
// 守り手：多段、防御、反撃、挑発、貫通。
add(0,'slash','灯火の一閃',1,{damage:9});add(0,'guard','揺るがぬ盾',1,{shield:12,target:'hero'},'shield');add(0,'bash','シールドバッシュ',2,{damage:14,selfShield:6},'shield');add(0,'rally','守り手の誓い',2,{allShield:8,target:'all'},'sun');add(0,'resolve','灯を絶やすな',0,{selfShield:7,draw:1,target:'all'},'sun');
add(0,'cleave','横薙ぎ',1,{aoe:6,target:'all'});add(0,'fortify','不落の構え',2,{shield:22,target:'hero'},'shield');add(0,'taunt','ここは通さない',1,{allShield:5,redirect:true,target:'all'},'shield',{allShield:9},{cost:0});add(0,'wardstrike','盾の間合い',1,{damage:7,selfShield:5},'shield');add(0,'breakthrough','門砕き',2,{damage:18,ignoreShield:true});
add(0,'execute','断頭の刃',2,{damage:12,lowBonus:15});add(0,'counterstance','返し棘',1,{shield:5,thorns:6,target:'hero'},'shield');add(0,'battlecry','進軍の声',1,{allPower:2,target:'all'},'sun');add(0,'quickstep','半歩の守り',0,{selfShield:5,draw:1,exhaust:true,target:'all'},'shield',{selfShield:9},{exhaust:false});add(0,'secondwind','息を継ぐ',1,{selfHeal:10,selfShield:4,target:'all'},'leaf');
add(0,'ironmarch','鉄の巡礼',2,{allShield:10,nextEnergy:1,target:'all'},'shield');add(0,'dualstrike','二連の刃',1,{damage:5,hits:2},'sword',{damage:7},{cost:0});add(0,'sacrifice','血の覚悟',0,{energy:2,selfCost:6,exhaust:true,target:'all'},'flame',{energy:3},{selfCost:2});add(0,'laststand','最後の防衛線',2,{damage:20,selfLowBonus:10});add(0,'bastion','暁の城塞',3,{allShield:22,exhaust:true,target:'all'},'shield');
add(0,'precision','鎧の綻び',1,{damage:8,weak:2});add(0,'heavyblow','巨人の一撃',3,{damage:34});add(0,'guardbreak','盾割り',1,{damage:7,stripShield:true});add(0,'rescue','手を離すな',1,{heal:7,shield:7,target:'hero'},'leaf');add(0,'drainblade','命継ぎの刃',2,{damage:14,selfHeal:5});
add(0,'shockwave','地鳴り',2,{aoe:10,allWeak:1,target:'all'});add(0,'oath','不退の誓い',0,{power:3,selfCost:3,exhaust:true,target:'all'},'sun',{power:5},{selfCost:0});add(0,'torchrush','灯の突進',1,{damage:11,nextEnergy:1,exhaust:true},'flame');add(0,'ironwill','清き鉄心',1,{selfShield:8,allCleanse:true,target:'all'},'shield');add(0,'thunderclap','轟く盾',3,{aoe:7,allStun:1,exhaust:true,target:'all'},'shield');
// 射手：手札循環、弱点、足止め、先読み。
add(1,'arrow','星屑の矢',1,{damage:10},'bow');add(1,'mark','月影の刻印',1,{damage:5,weak:3},'moon');add(1,'rain','流星群',2,{aoe:9,target:'all'},'star');add(1,'focus','澄みわたる心',0,{draw:2,target:'all'},'eye',{draw:3},{energy:1});add(1,'nova','夜を裂く光',3,{damage:30},'star');add(1,'pierce','一筋の星',1,{damage:15,weak:1},'bow');
add(1,'twinshot','双星',1,{damage:6,hits:2},'bow');add(1,'ambush','待ち伏せ',2,{damage:16,weakBonus:9},'moon');add(1,'hunt','狩人の印',0,{weak:2,draw:1,exhaust:true},'eye',{weak:4},{exhaust:false});add(1,'scatter','散り矢',1,{aoe:5,draw:1,target:'all'},'bow');
add(1,'icearrow','霜の矢',1,{damage:7,stun:1,exhaust:true},'bow');add(1,'quiver','隠し矢筒',0,{draw:3,exhaust:true,target:'all'},'bow',{draw:4},{exhaust:false});add(1,'quickshot','瞬きの矢',0,{damage:5,exhaust:true},'bow',{damage:9},{exhaust:false});add(1,'poisonarrow','蛇毒の鏃',1,{damage:8,poison:2},'bow');add(1,'snipe','鷹の眼',2,{damage:21,ignoreShield:true},'eye');
add(1,'eclipse','落月',3,{aoe:18,allWeak:2,exhaust:true,target:'all'},'moon');add(1,'study','星を読む',1,{nextEnergy:2,nextDraw:1,target:'all'},'eye',{nextEnergy:3,nextDraw:2},{cost:0});add(1,'survey','地平を測る',0,{draw:1,energy:1,exhaust:true,target:'all'},'eye',{draw:2},{exhaust:false});add(1,'moonstride','月影の歩み',1,{selfShield:10,draw:1,target:'all'},'moon');add(1,'guidingstar','導き星',1,{allPower:1,allShield:4,target:'all'},'star');
add(1,'predator','牙を射る',2,{damage:13,hits:2,exhaust:true},'bow');add(1,'net','星紡ぎの網',1,{damage:4,weak:3},'star');add(1,'bloodarrow','血染めの矢',1,{damage:18,selfCost:3},'bow');add(1,'stormbow','嵐の弦',2,{aoe:12,target:'all'},'bow');add(1,'finisher','暁を射抜く',3,{damage:42,exhaust:true},'star');
add(1,'starlight','星の手当て',1,{heal:6,draw:1,target:'hero'},'star');add(1,'wingguard','翼の庇護',0,{shield:7,exhaust:true,target:'hero'},'shield',{shield:11},{exhaust:false});add(1,'rebound','追い矢',1,{damage:10,drawIfWeak:2},'bow');add(1,'forecast','天球儀',1,{draw:3,target:'all'},'eye',{draw:4},{cost:0});add(1,'silence','静寂の一矢',2,{damage:9,attackDown:2},'moon');
// 錬金術師：毒、再生、復帰、気力と消滅。
add(2,'spark','火花の小瓶',1,{damage:7,poison:4},'flask');add(2,'heal','野草の手当て',1,{heal:8,target:'hero'},'leaf');add(2,'tonic','活力の調合',0,{energy:1,draw:1,target:'all'},'flask',{energy:2},{draw:2});add(2,'smoke','銀霧のヴェール',1,{allShield:5,draw:1,target:'all'},'moon');add(2,'bloom','生命の雫',2,{allHeal:10,target:'all'},'leaf');add(2,'inferno','琥珀の火炎',2,{aoe:12,allPoison:2,target:'all'},'flame');
add(2,'antidote','解毒薬',0,{heal:4,cleanse:true,target:'hero'},'leaf');add(2,'venom','濃毒',1,{poison:7},'flask');add(2,'acid','錆喰いの酸',2,{damage:8,poison:4,stripShield:true},'flask');add(2,'elixir','賦活の霊薬',1,{energy:3,exhaust:true,target:'all'},'flask',{energy:4},{cost:0});
add(2,'restorative','上薬草',2,{heal:21,target:'hero'},'leaf');add(2,'spores','漂う胞子',1,{allPoison:3,exhaust:true,target:'all'},'leaf');add(2,'vitalmist','滋養の霧',2,{allHeal:7,allShield:4,target:'all'},'moon');add(2,'catalyst','触媒',1,{poisonMultiplier:2},'flask',{poisonMultiplier:3},{cost:0});add(2,'distill','夜露の蒸留',0,{draw:2,selfCost:3,target:'all'},'flask',{draw:3},{selfCost:0});
add(2,'transmute','知識の抽出',1,{draw:4,exhaust:true,target:'all'},'eye',{draw:5},{cost:0});add(2,'volatile','揮発する火',1,{aoe:9,selfCost:3,target:'all'},'flame');add(2,'extract','生命の抽出',1,{damage:6,selfHeal:5},'flask');add(2,'regen','息吹の軟膏',1,{regen:3,target:'hero'},'leaf');add(2,'revive','帰還の霊水',3,{heal:12,revive:true,exhaust:true,target:'hero'},'flask');
add(2,'stimulant','奮起の香',1,{targetPower:3,target:'hero'},'flask',{targetPower:5},{cost:0});add(2,'smokescreen','白煙の幕',1,{allShield:7,allCleanse:true,target:'all'},'moon');add(2,'oilbomb','油壺',2,{aoe:10,allWeak:1,target:'all'},'flame');add(2,'corrosion','腐食液',1,{poison:4,attackDown:1},'flask');add(2,'sunvial','日輪の小瓶',2,{allHeal:15,exhaust:true,target:'all'},'sun');
add(2,'conserve','備えの調合',0,{nextEnergy:1,selfShield:4,target:'all'},'flask',{nextEnergy:2,selfShield:7},{draw:1});add(2,'fieldkit','野戦救急',1,{heal:9,draw:1,target:'hero'},'leaf');add(2,'nighttea','夜茶',0,{allRegen:1,exhaust:true,target:'all'},'leaf',{allRegen:3},{exhaust:false});add(2,'firebrew','火喰い酒',2,{damage:19,poison:3},'flame');add(2,'purify','浄化の雨',1,{allCleanse:true,allHeal:4,target:'all'},'leaf');
// 仲間固有の技。役割が同じでもカードと組み合わせは共有しない。
const uniqueSets={
 eda:[['灰刃',1,{damage:11,selfShield:2},'sword'],['受け流す刃',1,{shield:9,target:'hero'},'sword'],['戦場の呼吸',1,{selfHeal:8,selfShield:3,target:'all'},'leaf'],['血火の誓い',0,{power:2,selfCost:3,exhaust:true,target:'all'},'flame'],['踏み込み',0,{damage:5,exhaust:true},'sword'],['紅蓮の円舞',2,{aoe:10,selfCost:2,target:'all'},'flame'],['返しの太刀',1,{damage:7,selfShield:7},'sword'],['傭兵の勘',1,{draw:2,nextEnergy:1,target:'all'},'eye'],['鎧断ち',2,{damage:18,stripShield:true},'sword'],['灰の再起',2,{selfHeal:16,cleanse:true,target:'hero'},'leaf'],['一騎の覚悟',1,{power:4,selfCost:4,target:'all'},'sun'],['落日の断罪',3,{damage:32,lowBonus:12,exhaust:true},'flame']],
 kai:[['衛士の槍',1,{damage:8,selfShield:5},'sword'],['大盾の庇護',1,{shield:14,target:'hero'},'shield'],['糧食',1,{selfHeal:9,target:'all'},'leaf'],['陣形を組む',1,{allShield:6,redirect:true,target:'all'},'shield'],['槍の牽制',1,{damage:5,attackDown:1},'sword'],['鉄城の守り',2,{allShield:14,exhaust:true,target:'all'},'shield'],['城門の一突き',2,{damage:16,ignoreShield:true},'sword'],['盾を並べよ',0,{selfShield:7,exhaust:true,target:'all'},'shield'],['衛士の号令',1,{allPower:1,nextEnergy:1,target:'all'},'sun'],['献身の壁',2,{shield:18,thorns:5,target:'hero'},'shield'],['古都の備蓄',0,{draw:2,exhaust:true,target:'all'},'bag'],['不屈の巡回',1,{selfShield:10,allCleanse:true,target:'all'},'shield']],
 rika:[['沼矢',1,{damage:7,poison:3},'bow'],['葦の隠れ身',1,{selfShield:10,draw:1,target:'all'},'leaf'],['湿地の薬',1,{heal:7,cleanse:true,target:'hero'},'leaf'],['猟罠',1,{damage:4,stun:1,exhaust:true},'bow'],['腐毒の雨',2,{allPoison:5,target:'all'},'flask'],['獲物の足跡',0,{weak:2,exhaust:true},'eye'],['葦を渡る',0,{selfShield:5,nextDraw:1,exhaust:true,target:'all'},'leaf'],['蛇牙の三矢',2,{damage:4,hits:3,poison:2},'bow'],['獲物を追う',1,{damage:9,drawIfWeak:2},'eye'],['濁流の鏃',2,{damage:13,poison:6},'bow'],['狩りの用意',1,{draw:2,nextEnergy:1,target:'all'},'bag'],['毒沼の月',3,{allPoison:9,allWeak:2,exhaust:true,target:'all'},'moon']],
 mio:[['星紋',1,{damage:8,weak:1},'star'],['天幕の護り',1,{shield:8,nextDraw:1,target:'hero'},'moon'],['願いの灯',1,{heal:6,draw:1,target:'hero'},'star'],['未来の栞',0,{nextEnergy:1,nextDraw:1,exhaust:true,target:'all'},'book'],['運命を読む',1,{draw:3,target:'all'},'eye'],['流星の託宣',2,{aoe:8,allWeak:2,target:'all'},'star'],['星を繋ぐ',1,{allShield:5,allPower:1,target:'all'},'star'],['逆さの月',1,{damage:6,attackDown:2},'moon'],['天球の鍵',0,{energy:2,selfCost:3,exhaust:true,target:'all'},'eye'],['夜空の返事',2,{damage:20,draw:1},'star'],['静謐の祈り',1,{allCleanse:true,allHeal:4,target:'all'},'moon'],['星海を拓く',3,{aoe:17,draw:3,exhaust:true,target:'all'},'star']],
 fin:[['薬師の杖',1,{damage:8,selfHeal:2},'leaf'],['薬草の包帯',1,{shield:7,heal:3,target:'hero'},'leaf'],['巡礼の手当て',1,{heal:11,target:'hero'},'leaf'],['救護の準備',0,{draw:1,nextEnergy:1,exhaust:true,target:'all'},'bag'],['苦い煎じ薬',1,{poison:5,attackDown:1},'flask'],['緑の息吹',2,{allRegen:3,target:'all'},'leaf'],['旅路の滋養',1,{allHeal:5,allCleanse:true,target:'all'},'leaf'],['眠れる香',1,{stun:1,exhaust:true},'leaf'],['冬越しの備え',2,{allShield:9,allHeal:4,target:'all'},'bag'],['命を繋ぐ',3,{heal:15,revive:true,exhaust:true,target:'hero'},'heart'],['若葉の誓い',1,{regen:4,target:'hero'},'leaf'],['大樹の祝福',3,{allHeal:18,allPower:2,exhaust:true,target:'all'},'sun']],
 towa:[['玻璃の炸薬',1,{damage:9,poison:2},'flask'],['香煙の帳',1,{allShield:6,target:'all'},'moon'],['甘露の香',1,{heal:7,regen:1,target:'hero'},'flask'],['火薬の調律',0,{energy:2,selfCost:4,exhaust:true,target:'all'},'flame'],['硝子の雨',2,{aoe:11,allPoison:2,target:'all'},'flask'],['香りの記憶',0,{draw:2,selfCost:2,target:'all'},'eye'],['紅い閃光',2,{aoe:14,selfCost:3,target:'all'},'flame'],['腐香',1,{allPoison:3,target:'all'},'flask'],['眠り香',2,{allStun:1,exhaust:true,target:'all'},'moon'],['芳醇な抽出',1,{poisonMultiplier:2,draw:1},'flask'],['硝煙の翼',1,{allShield:8,nextEnergy:1,exhaust:true,target:'all'},'moon'],['万華の爆炎',3,{aoe:21,allWeak:1,selfCost:5,exhaust:true,target:'all'},'flame']]
};
for(const [owner,set] of Object.entries(uniqueSets))set.forEach(([name,cost,effect,icon],i)=>{add(COMPANIONS.find(h=>h.id===owner).actor,owner+'_'+i,name,cost,effect,icon);cards[owner+'_'+i].owner=owner});
for(const c of Object.values(cards))c.owner??=HEROES[c.actor].id;
export const STARTERS=['eda','sena','nico'];
export const STARTER_DECKS={
 row:['slash','slash','slash','guard','guard','rescue','secondwind','rally','resolve','bash'],
 sena:['arrow','arrow','arrow','moonstride','moonstride','starlight','starlight','focus','mark','rain'],
 nico:['spark','spark','spark','conserve','conserve','heal','heal','tonic','smoke','extract'],
 ...Object.fromEntries(Object.keys(uniqueSets).map(id=>[id,[id+'_0',id+'_0',id+'_0',id+'_1',id+'_1',id+'_2',id+'_2',id+'_3',id+'_4',id+'_5']]))
};
export const RECRUIT_DECKS=Object.fromEntries(Object.entries(STARTER_DECKS).map(([id,deck])=>[id,[deck[0],deck[1],deck[3],deck[5],deck[7],deck[9]]]));
// 旧セーブのカードID。
add(0,'bulwark','暁の城壁',2,{allShield:15,target:'all'},'shield');
cards.bulwark.owner='row';
// 一人につき50枚の新しい固有カード。効果の組み合わせと名称を役割ごとに分ける。
const cardWords={
 row:[['灯守の','古城の','不退の','巡礼の','暁光の'],['剣戟','防陣','誓約','破城','灯火','連斬','救援','衝波','決意','城壁']],
 sena:[['北天の','月影の','白羽の','遠望の','星雲の'],['一矢','歩法','照準','矢雨','速射','予見','手当て','狙撃','封矢','導き']],
 nico:[['旅薬の','夜露の','琥珀の','野草の','日輪の'],['火薬瓶','煎じ薬','胞子袋','治癒霧','蒸留','薬布','爆薬瓶','活性剤','霊水','触媒']],
 kai:[['衛士の','鉄門の','城塞の','王城の','不屈の'],['槍撃','大盾','号令','崩し','歩哨','連突','救護','制圧','備え','堅陣']],
 eda:[['灰刃の','血誓の','落日の','傭兵の','紅蓮の'],['太刀','受流し','覚悟','断鎧','呼吸','二連刃','応急術','円舞','奮起','返し刃']],
 rika:[['湿地の','葦原の','蛇牙の','獣道の','狩月の'],['毒矢','隠れ身','標的','散弓','早業','観察','薬草','貫き','捕縛','猟の印']],
 mio:[['天球の','迷い星の','星読みの','夢見の','流転の'],['星弾','天幕','啓示','星嵐','瞬星','先見','願い','星槍','封星','祝詞']],
 fin:[['薬師の','若葉の','巡礼草の','生命樹の','緑風の'],['毒杖','上薬','香草袋','癒し風','調薬','包帯','苦薬瓶','滋養剤','蘇生水','抽出']],
 towa:[['玻璃の','芳香の','硝煙の','万華の','香月の'],['香瓶','甘露','毒煙','癒香','濃縮','香布','炸裂瓶','賦活香','霊香','腐香']]
};
const effectSignature=c=>JSON.stringify(Object.entries(c).filter(([k])=>!['id','name','owner','actor','upgrades','icon'].includes(k)).sort(([a],[b])=>a.localeCompare(b)));
for(const h of COMPANIONS.filter(h=>cardWords[h.id])){
 const used=new Set(Object.values(cards).filter(c=>c.owner===h.id).map(effectSignature));
 for(let rank=0;rank<5;rank++)for(let k=0;k<10;k++){
  let effect,cost=rank>=3?2:1,ic=h.icon;
  if(h.actor===0){const g=rank;effect=[{damage:8+g*2,selfShield:3+g},{shield:10+g*3,target:'hero'},{allShield:5+g*2,target:'all'},{damage:6+g,weak:1+Math.floor(g/2)},{selfShield:6+g*2,power:1+Math.floor(g/3),target:'all'},{damage:5+g,hits:2},{heal:6+g*2,shield:4+g,target:'hero'},{aoe:5+g*2,allWeak:g>=3?1:0,target:'all'},{energy:1,nextDraw:1,selfShield:3+g,exhaust:true,target:'all'},{shield:13+g*3,thorns:3+g,target:'hero'}][k];if(k===8)cost=0;if(k===5||k===9)cost=2;if(h.id==='eda'){if(effect.damage)effect.damage+=2;if(g>=2){effect.selfCost=2;effect.power=(effect.power||0)+1}}if(h.id==='kai'){if(effect.shield)effect.shield+=2;if(effect.damage&&g>=2)effect.attackDown=1}ic=effect.shield||effect.allShield?'shield':effect.heal?'leaf':effect.aoe?'flame':'sword'}
  else if(h.actor===1){const g=rank;effect=[{damage:8+g*2,drawIfWeak:g>=2?1:0},{selfShield:7+g,draw:1,target:'all'},{damage:4+g,weak:2+g},{aoe:5+g*2,allWeak:g>=3?1:0,target:'all'},{damage:4+g,exhaust:true},{draw:1+Math.floor(g/2),nextEnergy:1,target:'all'},{heal:5+g,draw:1,target:'hero'},{damage:16+g*3,ignoreShield:true},{damage:5+g,stun:1,exhaust:true},{targetPower:1+Math.floor(g/2),shield:3+g,target:'hero'}][k];if(k===4)cost=0;if(k===7||k===8)cost=2;if(h.id==='rika'&&effect.damage)effect.poison=2+Math.floor(g/2);if(h.id==='mio'&&k%3===1)effect.nextDraw=1;ic=k===5?'eye':effect.heal?'star':effect.shield?'shield':effect.aoe?'moon':'bow'}
  else{const g=rank;effect=[{damage:6+g*2,poison:2+Math.floor(g/2)},{heal:8+g*3,target:'hero'},{allPoison:2+Math.floor(g/2),draw:1,target:'all'},{allHeal:5+g*2,target:'all'},{draw:2+Math.floor(g/3),selfCost:2,target:'all'},{shield:5+g*2,regen:1+Math.floor(g/2),target:'hero'},{aoe:6+g*2,allPoison:1+Math.floor(g/2),target:'all'},{energy:2,nextDraw:1,exhaust:true,target:'all'},{heal:12+g*3,revive:g>=3,exhaust:true,target:'hero'},{poisonMultiplier:2+Math.floor(g/3),attackDown:g>=2?1:0}][k];if(k===4)cost=0;if([3,6,8].includes(k))cost=2;if(h.id==='fin'){if(effect.heal)effect.heal+=2;if(effect.selfCost)delete effect.selfCost}if(h.id==='towa'){if(effect.aoe)effect.aoe+=2;if(effect.poison)effect.poison++}ic=effect.heal||effect.allHeal?'leaf':effect.aoe?'flame':'flask'}
  const id=`${h.id}_journey_${rank*10+k}`,name=cardWords[h.id][0][rank]+cardWords[h.id][1][k];
  add(h.actor,id,name,cost,effect,ic);cards[id].owner=h.id;
  while(used.has(effectSignature(cards[id])))cards[id].nextDraw=(cards[id].nextDraw||0)+1;
  used.add(effectSignature(cards[id]));
 }
}


const strategies={aurora:{allPower:1,selfShield:6},gold:{goldSpend:8,goldScale:80},dice:{dice:1},armor:{armorRatio:.35},exhaust:{exhaustScale:2},blood:{selfLowBonus:8,selfCost:2},venom:{poisonBurst:1},fuel:{fuelCost:3,fuelScale:20},hand:{handScale:1},wounded:{woundedScale:8},discard:{discardScale:.7},weak:{weakBonus:5,weak:1},frost:{stun:1,exhaust:true},chain:{chainScale:2},harmony:{harmonyScale:3},fallen:{fallenScale:8},puppet:{attackDown:2},wind:{nextEnergy:1},flame:{selfCost:3,power:1},tide:{selfHeal:3},forge:{upgradeScale:3},mirror:{thornsRatio:1}};
for(const h of COMPANIONS.filter(h=>h.theme)){
 const kit=KITS[h.id],seen=new Set(),sig=e=>JSON.stringify(Object.entries(e).sort());
 for(let n=0;n<62;n++){
  const k=n%12,rank=Math.floor(n/12),[stem,costDef,make,ic]=kit.cards[k],cost=typeof costDef==='function'?costDef(rank):costDef;
  const id=h.id+'_art_'+n;let effect=finalizeKitEffect(cost,make(rank));if(seen.has(k+sig(effect)))effect={...effect,selfShield:(effect.selfShield||0)+2*rank};seen.add(k+sig(effect));
  add(h.actor,id,kit.prefix[rank]+stem,cost,effect,ic||h.icon);cards[id].owner=h.id;
 }
 STARTER_DECKS[h.id]=[0,0,0,1,1,2,2,4,5,8].map(n=>h.id+'_art_'+n);RECRUIT_DECKS[h.id]=[0,0,1,2,4,5].map(n=>h.id+'_art_'+n);
}
// One ultimate may be carried by the whole caravan. All are drawn last.
// まおう専用カード（入手できるかどうかも抽選）
export const MAOU_STARTERS=['maou_s0','maou_s1','maou_s2','maou_s3','maou_s4'],MAOU_NORMALS=['maou_n0','maou_n1','maou_n2','maou_n3','maou_n4'];
{const a=COMPANIONS.find(h=>h.id==='maou').actor,mk=(id,name,cost,effect,ic)=>{add(a,id,name,cost,effect,ic);cards[id].owner='maou'};
 mk('maou_s0','借り物の剣',1,{damage:7},'sword');
 mk('maou_s1','借り物の盾',1,{selfShield:8,target:'all'},'shield');
 mk('maou_s2','からっぽの器',0,{draw:1,exhaust:true,target:'all'},'moon');
 mk('maou_s3','ものまね',1,{damage:4,hits:2},'star');
 mk('maou_s4','王様の気まぐれ',1,{heal:6,target:'hero'},'heart');
 mk('maou_n0','強奪の手',1,{stealCard:1,exhaust:true,noUpgrade:true,target:'all'},'bag');
 mk('maou_n1','寄せ集めの軍勢',2,{aoe:9,target:'all'},'flame');
 mk('maou_n2','王座の守り',2,{allShield:8,target:'all'},'shield');
 mk('maou_n3','臣下のまねごと',1,{damage:5,weak:1},'eye');
 mk('maou_n4','気まぐれな施し',0,{energy:1,draw:1,exhaust:true,target:'all'},'star');
 mk('maou_ultimate_0','秘奥・からっぽの玉座',2,{stealCard:3,energy:1,special:true,exhaust:true,target:'all'},'star');}
STARTER_DECKS.maou=[...MAOU_STARTERS];RECRUIT_DECKS.maou=[...MAOU_STARTERS];
for(const h of COMPANIONS.filter(h=>!h.blackparty)){
 const kit=KITS[h.id],themed=kit?kitSpecials(kit):null,names=kit?kit.specials:LEGACY_SPECIAL_NAMES[h.id];
 for(let k=0;k<10;k++){
  const id=h.id+'_ultimate_'+k;
  if(themed){const[cost,effect]=themed[k];add(h.actor,id,'秘奥・'+names[k],cost,effect,h.icon)}
  else{const effect=[{damage:65,ignoreShield:true},{aoe:30,allWeak:3,target:'all'},{allShield:40,target:'all'},{allHeal:30,allCleanse:true,target:'all'},{damage:30,hits:3},{allPower:6,allShield:15,target:'all'},{allPoison:18,allStun:1,target:'all'},{heal:60,revive:true,shield:25,target:'hero'},{energy:4,draw:4,target:'all'},{damage:45,weak:5,selfHeal:20}][k];add(h.actor,id,'秘奥・'+(names?.[k]||['破門','星落','不落','帰還','三連','誓約','蝕夜','再臨','開眼','灯継'][k]),k===8?0:3,{...effect,special:true,exhaust:true},h.icon)}
  cards[id].owner=h.id;
 }
}

cards.wound={id:'wound',name:'焦燥',actor:0,cost:1,type:'妨害',icon:'moon',target:'all',exhaust:true,status:true};
for(let c of Object.values(cards)){
 if(c.status)continue;
 let primary=['damage','aoe','shield','allShield','heal','allHeal','selfShield','selfHeal','poison','allPoison','draw','energy','weak','targetPower','regen','allRegen','nextEnergy'].find(k=>c[k]);
 let key=primary||'draw',base=c[key]||0;
 c.upgrades.overcharge={name:'過充填',cost:c.cost+1,[key]:base+(['draw','energy','nextEnergy'].includes(key)?2:8)};
 c.upgrades.efficient=c.cost>0?{name:'軽量化',cost:c.cost-1,[key]:Math.max(0,base-(['draw','energy'].includes(key)?1:3))}:{name:'薄明の循環',draw:(c.draw||0)+1,selfCost:(c.selfCost||0)+2};
 c.upgrades.echo=c.damage?{name:'残響',hits:(c.hits||1)+1,damage:Math.max(1,c.damage-2)}:{name:'複写',draw:(c.draw||0)+2,cost:c.cost+1};
 c.upgrades.risky={name:'血誓', [key]:base+(['draw','energy','nextEnergy'].includes(key)?2:7),selfCost:(c.selfCost||0)+4};
 c.upgrades.tempo={name:'前借り',nextEnergy:(c.nextEnergy||0)+2,cost:c.cost+1};
 c.upgrades.deep={name:'叡智',draw:(c.draw||0)+2,[key]:base+(['draw','energy'].includes(key)?2:2),cost:c.cost+1};
 c.upgrades.unbound={name:'解放',exhaust:false,draw:(c.draw||0)+1,selfCost:(c.selfCost||0)+3};
 c.upgrades.sealed={name:'秘封',exhaust:true,[key]:base+(['draw','energy','nextEnergy'].includes(key)?3:11)};
 c.upgrades.spirit={name:'闘気',power:(c.power||0)+2,selfCost:(c.selfCost||0)+1};
 c.upgrades.warded={name:'守護紋',selfShield:(c.selfShield||0)+6,cost:c.cost+1};
 c.upgrades.toxic=c.target==='hero'?{name:'奮起の呪印',targetPower:(c.targetPower||0)+2,selfVulnerable:(c.selfVulnerable||0)+1}:c.target==='all'?{name:'瘴気',allPoison:(c.allPoison||0)+2,selfVulnerable:(c.selfVulnerable||0)+1}:{name:'毒刻',poison:(c.poison||0)+3,selfVulnerable:(c.selfVulnerable||0)+1};
 c.upgrades.exposed=c.target==='hero'?{name:'茨の加護',thorns:(c.thorns||0)+4,cost:c.cost+1}:c.target==='all'?{name:'看破',allWeak:(c.allWeak||0)+1,cost:c.cost+1}:{name:'穿孔',weak:(c.weak||0)+2,cost:c.cost+1};
 c.upgrades.binding=c.target==='hero'?{name:'再生の符',regen:(c.regen||0)+2,exhaust:true}:c.target==='all'?{name:'封縛陣',allStun:(c.allStun||0)+1,exhaust:true,cost:c.cost+1}:{name:'封縛',stun:(c.stun||0)+1,exhaust:true,cost:c.cost+1};
 c.upgrades.purified=c.target==='hero'?{name:'清澄',cleanse:true,draw:(c.draw||0)+1}:{name:'清祓い',selfCleanse:true,draw:(c.draw||0)+1};
 c.upgrades.reckless={name:'狂熱',[key]:base+(['draw','energy','nextEnergy'].includes(key)?2:7),selfVulnerable:(c.selfVulnerable||0)+2};
 c.upgrades.serpentoath={name:'蛇の契約',power:(c.power||0)+3,selfPoison:(c.selfPoison||0)+2};
 c.upgrades.relief_debuff={name:'呪縛の緩和',rare:true};
 c.upgrades.relief_hp={name:'代償の緩和',rare:true};c.upgrades.relief_cost={name:'負担の解消',rare:true};c.upgrades.relief_effect={name:'損耗の修復',rare:true};
}
for(const c of Object.values(cards))if(!c.status)attachUpgradePool(c);
export const CARDS=Object.freeze(cards);
export const NORMAL_RELICS=[];export const BOSS_RELICS=[];
function relic(id,name,desc,icon,effects,drawback=''){let r={id,name,desc,icon,effects,drawback,tier:drawback?'boss':'normal'};(drawback?BOSS_RELICS:NORMAL_RELICS).push(r)}
relic('ember','消えない熾火','各戦闘の最初のターンに気力+1。','flame',{firstEnergy:1});relic('root','旅人の根飾り','戦闘勝利時に全員のHPを4回復。','leaf',{winHeal:4});relic('star','星図のかけら','毎ターンの手札+1。','star',{draw:1});relic('bell','夜明けの鈴','連携するたびに全員のHPを3回復。','bell',{linkHeal:3});relic('fang','銀狼の牙','攻撃カードの威力+2。','sword',{attack:2});relic('shell','月白の護符','毎ターン全員に盾3。','shield',{shieldTurn:3});relic('flask','小さな蒸留器','野営地での灯油回復+8。','flask',{campFuel:8});relic('coin','巡礼の硬貨','戦闘の銀貨報酬+10。','coin',{goldFlat:10});
relic('candle','門守の蝋燭','戦闘開始時に全員に盾6。','flame',{firstShield:6});relic('compass','帰路の羅針盤','野営で休むとHP回復+7。','map',{campHeal:7});relic('quill','預言者の羽根','毎ターン最初の策略カードで1枚引く。','eye',{firstSkillDraw:1});relic('whetstone','古い砥石','1コストの攻撃カードの威力+2。','sword',{cheapAttack:2});relic('herb','結び薬草','回復カードの回復量+2。','leaf',{heal:2});relic('pitcher','陶器の薬壺','回復薬の回復量+10。取得時に回復薬+1。','flask',{potionHeal:10,pickupPotion:1});relic('ribbon','星紡ぎのリボン','最初のターンに手札+2。','star',{firstDraw:2});relic('salt','湿地の白塩','付与する毒+1。','flask',{poison:1});
relic('lens','ひび割れた照準器','弱点のある敵へのダメージがさらに+2。','eye',{weakBonus:2});relic('medal','名もなき勲章','全員の攻撃カードの威力+1。','sword',{attack:1});relic('rope','巡礼の結び紐','取得時に全員の最大HP+5、HP+5。','heart',{maxHP:5});relic('clover','四つ葉の銀細工','戦闘の銀貨報酬が25%増える。','leaf',{goldMult:.25});relic('fossil','琥珀の化石','そのターン3枚目以降の攻撃の威力+3。','star',{lateAttack:3});relic('charcoal','踊る炭片','全体攻撃の威力+3。','flame',{aoe:3});relic('ice','氷河の留め具','カードで得る盾+2。','shield',{block:2});relic('branch','抱擁の枝','連携で得る盾がさらに+3。','leaf',{linkShield:3});
relic('harp','三弦の小竪琴','連携で得る気力+1。','bell',{linkEnergy:1});relic('hourglass','砂漏れの時計','使わなかった気力を最大1、次ターンに持ち越す。','eye',{carryEnergy:1});relic('lanterncore','灯芯の核','マス移動時の灯油消費-1。','flame',{fuelCost:-1});relic('purse','商人の財布','ショップの価格が15%安くなる。','coin',{shopDiscount:.15});relic('rations','保存食の包み','野営地での灯油回復+10。','bag',{campFuel:10});relic('anvil','巡礼鍛冶の印','カード強化時に生存者全員のHPを5回復。','shield',{upgradeHeal:5});relic('amulet','身代わりの人形','各戦闘で一度だけ、倒れる仲間をHP12で復帰させる。','heart',{revive:12});relic('mask','討伐者の仮面','強敵勝利時に銀貨+20・全員のHP+6。','elite',{eliteGold:20,eliteHeal:6});
relic('mapcase','折り畳み星図','未知のマスで良い出来事が起きやすくなる。','map',{mysteryLuck:.2});relic('needle','毒銀の針','毎ターン最初に毒を付与するカードで1枚引く。','flask',{poisonDraw:1});relic('talisman','燃える札','毎ターン最初に消滅カードを使うと気力+1。','flame',{exhaustEnergy:1});relic('seed','眠らない種','毎ターン生存者全員のHPを1回復。','leaf',{turnRegen:1});relic('magnet','夜明けの磁石','戦闘開始時に敵全員に弱点1。','star',{firstWeak:1});relic('book','行商の帳面','ショップのカード陳列数+1。','book',{shopStock:1});relic('crystal','空腹の結晶','気力0でターンを終えると次の気力+1。','star',{emptyEnergy:1});relic('snail','宿り貝','仲間の盾を最大5、次ターンに持ち越す。','shield',{carryShield:5});
relic('chalice','暁の聖杯','章クリア時のHP回復+10。','sun',{bossHeal:10});relic('ward','浄めの鈴緒','仲間が受ける毒・脆弱の量-1。','bell',{debuffWard:1});relic('vase','慈雨の水瓶','全体回復カードの回復量+3。','leaf',{allHeal:3});relic('shard','零光の欠片','0コストのカードを使うたびにランダムな敵に3ダメージ。','star',{zeroPing:3});
relic('bloodsun','血の日輪','毎ターンの気力+1。','sun',{energy:1,healMult:-.5},'回復カード・回復薬による回復量が半分。');relic('blackcrown','黒星の冠','毎ターンの手札+2。','boss',{draw:2,energy:-1},'毎ターンの気力-1。');relic('ironheart','鉄の心臓','毎ターン全員に盾5。','shield',{shieldTurn:5,draw:-1},'毎ターンの手札-1。');relic('hollowlantern','虚ろな大灯籠','毎ターンの気力+1。','flame',{energy:1,fuelCost:1},'マス移動時の灯油消費+1。');
relic('goldcontract','黄金の契約','戦闘の銀貨報酬が2倍。','coin',{goldMult:1,enemyAtk:3},'すべての敵の攻撃力+3。');relic('sacrificeseal','赤誓の封蝋','攻撃カードの威力+5。','sword',{attack:5,attackSelfDamage:1},'攻撃カードを使うたびにその仲間のHP-1。');relic('frozenclock','凍った巡礼時計','毎ターンの手札+1、最初の手札はさらに+2。','eye',{draw:1,firstDraw:2,campHealDisabled:1},'野営で休んでもHPが回復しない。');relic('thorncrown','毒棘の冠','付与する毒+3。','leaf',{poison:3,heal:-3},'回復カードの回復量-3。');
relic('fractureplate','砕けぬ甲冑','カードで得る盾+6。','shield',{block:6,attackCost:1},'攻撃カードの消費気力+1。');relic('wildstar','野生の星核','毎ターンの気力+1。','star',{energy:1,draw:-2},'毎ターンの手札-2。');relic('hungryidol','飢えた偶像','取得時に全員の最大HP+18、HP+18。','heart',{maxHP:18,nodeDamage:2},'マス移動時に全員のHP-2。');relic('deathbell','死告の三重鐘','連携で得る気力がさらに+2。','bell',{linkEnergy:2,firstCardCostHP:3},'毎ターン最初のカードで使用者のHP-3。');
relic('oracleeye','深淵の観測眼','毎ターンの手札+2。','eye',{draw:2,enemyHP:.25},'敵の最大HPが25%増える。');relic('whiteash','白灰の心壺','戦闘勝利時に全員のHPを12回復。','leaf',{winHeal:12,noGold:1},'戦闘で銀貨を得られなくなる。');relic('eclipseblade','蝕の剣','攻撃カードの威力が35%増える。','sword',{attackMult:.35,cardHealDisabled:1},'回復カードによるHP回復ができない。');relic('pilgrimking','遍歴王の印','強化済みカードの消費気力-1。','boss',{upgradeCostOffset:-1,unupgradedCostOffset:1},'未強化カードの消費気力+1。');
NORMAL_RELICS.push(...ADDITIONAL_RELICS.filter(r=>r.tier==='normal'));BOSS_RELICS.push(...ADDITIONAL_RELICS.filter(r=>r.tier==='boss'));
export const RELICS=[...NORMAL_RELICS,...BOSS_RELICS,...SPECIAL_RELICS].map(designRelic);
const enemyRows=[
['wolf','霧まといの狼',0,24,7,['attack','attack','heavy','guard'],'骨面の狩り手。単体への強打を狙う。'],['tree','うろの番兵',0,33,7,['guard','attack','heavy'],'硬い樹皮：毎ターン盾2。',{shieldTurn:2}],['moth','夜渡りの蛾',0,23,6,['hex','disrupt','sweep'],'鱗粉で脆弱を付け、全体を襲う。'],['poacher','森の密猟者',0,27,7,['attack','flurry','guard'],'連撃で薄い盾を削る。'],['beetle','棘の使い魔',0,31,6,['guard','venom','attack'],'甲殻：毎ターン盾3。毒の棘を持つ。',{shieldTurn:3}],['antlerbeast','茸角の獣',0,36,7,['mend','heavy','attack'],'胞子の再生：毎ターンHP2。',{regen:2}],
['drowned','水没の巡礼者',1,34,9,['venom','curse','mend'],'毒を流し込み、傷を再生する。'],['bellbat','鐘抱き蝙蝠',1,28,8,['flurry','hex','sweep'],'素早い連撃と全体攻撃。'],['stonecrab','遺跡宿り',1,44,8,['guard','heavy','attack'],'遺跡の甲殻：毎ターン盾4。',{shieldTurn:4}],['jelly','灯籠水母',1,30,8,['venom','sweep','mend'],'毒の触手。再生で持久戦に持ち込む。',{regen:2}],['abbeyknight','朽ちた聖堂騎士',1,43,10,['guard','attack','heavy'],'大盾：毎ターン盾3。',{shieldTurn:3}],['mistweaver','霧織り',1,32,9,['hex','wither','sweep'],'脆弱と毒を重ねる。'],
['ashguard','灰鎧の衛兵',2,44,12,['attack','guard','heavy'],'焦げた甲冑：毎ターン盾4。',{shieldTurn:4}],['cinderhound','熾火の猟犬',2,36,12,['attack','flurry','heavy'],'休まず攻める灰の追跡者。'],['glasswitch','硝子面の魔女',2,37,11,['hex','sweep','venom'],'脆弱を付けて全体を焼く。'],['furnacespider','炉蜘蛛',2,47,10,['guard','venom','flurry'],'鉄脚：毎ターン盾5。',{shieldTurn:5}],['crowreaper','黒鴉の処刑人',2,42,13,['hex','heavy','attack'],'脆弱の後に強打を放つ。'],['ashscholar','焼書の学徒',2,38,11,['curse','healAll','sweep'],'燃え残る記憶：毎ターンHP3。',{regen:3}],
['starleech','星喰い蛭',3,50,14,['venom','flurry','mend'],'星の再生：毎ターンHP4。',{regen:4}],['voidmoth','虚空の蛾',3,42,13,['hex','disrupt','flurry'],'幻翼の鱗粉で逃げ場を奪う。'],['mirrorangel','鏡翼の使徒',3,53,14,['guardAlly','sweep','heavy'],'鏡の盾：毎ターン盾6。',{shieldTurn:6}],['nightrider','夜駆けの騎士',3,55,15,['attack','heavy','flurry'],'強打と連撃を交互に狙う。'],['eclipseorb','蝕の檻',3,48,13,['hex','wither','sweep'],'夜の檻：毎ターン盾4。',{shieldTurn:4}],['clockkeeper','砂時計の番人',3,51,14,['rally','heavy','sweep'],'時の再生：毎ターンHP5。',{regen:5}]
];
export const ENEMIES=enemyRows.map((r,i)=>({id:r[0],name:r[1],chapter:r[2],hp:r[3],atk:r[4],pattern:r[5],ability:r[6],...r[7],art:i,kind:r[0]}));
export const BOSSES=[
{id:'rootking',name:'根を張る王',chapter:0,hp:150,atk:11,pattern:['guard','heavy','sweep'],ability:'樹皮：毎ターン盾3。HP半分で攻撃力+3、盾18。',shieldTurn:3,enrage:3,phaseShield:18,art:0},
{id:'huntmatriarch',name:'骨冠の狩母',chapter:0,hp:138,atk:12,pattern:['flurry','hex','heavy','sweep'],ability:'飢えた狩り：毎ターンHP3。HP半分で攻撃力+4。',regen:3,enrage:4,art:1},
{id:'bellkeeper',name:'鐘楼の番人',chapter:1,hp:225,atk:15,pattern:['guard','curse','sweep','heavy'],ability:'鐘の鎧：毎ターン盾4。HP半分で攻撃力+4、盾20。',shieldTurn:4,enrage:4,phaseShield:20,art:2},
{id:'drownedsaint',name:'水底の聖女',chapter:1,hp:210,atk:14,pattern:['venom','healAll','wither','flurry'],ability:'不死の祈り：毎ターンHP5。HP半分で攻撃力+5。',regen:5,enrage:5,art:3},
{id:'ashqueen',name:'灰冠の女王',chapter:2,hp:320,atk:18,pattern:['hex','sweep','curse','heavy'],ability:'灰の冠：毎ターン盾5。HP半分で攻撃力+5、盾25。',shieldTurn:5,enrage:5,phaseShield:25,art:4},
{id:'executioner',name:'鉄葬の執行官',chapter:2,hp:350,atk:20,pattern:['guard','heavy','flurry'],ability:'執行鎧：毎ターン盾9。HP半分で攻撃力+5。',shieldTurn:9,enrage:5,art:5},
{id:'nighteater',name:'終わらない夜',chapter:3,hp:480,atk:23,pattern:['drain','sweep','curse','heavy'],ability:'圧夜：3ターンごとに気力-1。HP半分で攻撃力+6、盾30。',energyDrain:1,enrage:6,phaseShield:30,art:6},
{id:'dawnwarden',name:'暁を閉ざす者',chapter:3,hp:455,atk:22,pattern:['guard','venom','sweep','heavy'],ability:'境界の再生：毎ターンHP7、盾6。HP半分で攻撃力+7。',regen:7,shieldTurn:6,enrage:7,art:7}
].map(b=>({...b,boss:true,kind:b.id}));
BOSSES.push(
 {id:'seedoracle',name:'種蒔きの巫',chapter:0,hp:145,atk:10,pattern:['venom','mend','hex','sweep'],ability:'胞子の再生：毎ターンHP3。毒と脆弱を重ねる。HP半分で攻撃力+3。',regen:3,enrage:3,art:8},
 {id:'tidemirror',name:'潮鏡の双頭',chapter:1,hp:235,atk:14,pattern:['flurry','guard','disrupt','heavy'],ability:'鏡鱗：毎ターン盾5。手札を崩して連撃を放つ。HP半分で攻撃力+4、盾24。',shieldTurn:5,enrage:4,phaseShield:24,art:9},
 {id:'furnacedrake',name:'炉心の竜',chapter:2,hp:340,atk:18,pattern:['rally','sweep','wither','heavy'],ability:'炉心装甲：毎ターン盾5。自己強化で全体攻撃が加速。HP半分で攻撃力+6。',shieldTurn:5,enrage:6,art:10},
 {id:'starserpent',name:'星喰いの蛇',chapter:3,hp:470,atk:22,pattern:['curse','drain','sweep','flurry'],ability:'星の飢え：3ターンごとに気力-1。妨害札と連撃。HP半分で攻撃力+7。',energyDrain:true,enrage:7,art:11}
);
for(const boss of BOSSES){boss.boss=true;boss.kind=boss.id}
ENEMIES.push({id:'region_4_0',kind:'region_4_0',name:'氷坑の採掘者',chapter:4,hp:36,atk:14,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'再生を交えて毒を重ねる。',shieldTurn:0,regen:0,atlas:{file:'enemy-extra-0',cell:0}});
ENEMIES.push({id:'region_4_1',kind:'region_4_1',name:'霜牙の狼',chapter:4,hp:41,atk:15,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'硬い守りから強打を狙う。',shieldTurn:2,regen:0,atlas:{file:'enemy-extra-0',cell:1}});
ENEMIES.push({id:'region_4_2',kind:'region_4_2',name:'氷殻の古亀',chapter:4,hp:46,atk:16,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'妨害と連撃で隙を突く。',shieldTurn:4,regen:0,atlas:{file:'enemy-extra-0',cell:2}});
ENEMIES.push({id:'region_5_0',kind:'region_5_0',name:'灯茸の歩き手',chapter:5,hp:41,atk:15,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'再生を交えて毒を重ねる。',shieldTurn:0,regen:2,atlas:{file:'enemy-extra-0',cell:3}});
ENEMIES.push({id:'region_5_1',kind:'region_5_1',name:'胞子羽の蛾',chapter:5,hp:46,atk:16,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'硬い守りから強打を狙う。',shieldTurn:2,regen:0,atlas:{file:'enemy-extra-0',cell:4}});
ENEMIES.push({id:'region_5_2',kind:'region_5_2',name:'苔茸の猪',chapter:5,hp:51,atk:17,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'妨害と連撃で隙を突く。',shieldTurn:4,regen:0,atlas:{file:'enemy-extra-0',cell:5}});
ENEMIES.push({id:'region_6_0',kind:'region_6_0',name:'砂布の山犬',chapter:6,hp:46,atk:15,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'再生を交えて毒を重ねる。',shieldTurn:0,regen:0,atlas:{file:'enemy-extra-0',cell:6}});
ENEMIES.push({id:'region_6_1',kind:'region_6_1',name:'霊廟の蠍',chapter:6,hp:51,atk:16,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'硬い守りから強打を狙う。',shieldTurn:2,regen:0,atlas:{file:'enemy-extra-0',cell:7}});
ENEMIES.push({id:'region_6_2',kind:'region_6_2',name:'封印の甲虫壺',chapter:6,hp:56,atk:17,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'妨害と連撃で隙を突く。',shieldTurn:4,regen:0,atlas:{file:'enemy-extra-0',cell:8}});
ENEMIES.push({id:'region_7_0',kind:'region_7_0',name:'歯車の猟犬',chapter:7,hp:51,atk:16,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'再生を交えて毒を重ねる。',shieldTurn:0,regen:2,atlas:{file:'enemy-extra-0',cell:9}});
ENEMIES.push({id:'region_7_1',kind:'region_7_1',name:'真鍮の蟷螂',chapter:7,hp:56,atk:17,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'硬い守りから強打を狙う。',shieldTurn:2,regen:0,atlas:{file:'enemy-extra-0',cell:10}});
ENEMIES.push({id:'region_7_2',kind:'region_7_2',name:'蒸気の鎧兵',chapter:7,hp:61,atk:18,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'妨害と連撃で隙を突く。',shieldTurn:4,regen:0,atlas:{file:'enemy-extra-0',cell:11}});
ENEMIES.push({id:'region_8_0',kind:'region_8_0',name:'深紅の葦巫女',chapter:8,hp:56,atk:17,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'再生を交えて毒を重ねる。',shieldTurn:0,regen:0,atlas:{file:'enemy-extra-1',cell:0}});
ENEMIES.push({id:'region_8_1',kind:'region_8_1',name:'血吸いの鹿',chapter:8,hp:61,atk:18,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'硬い守りから強打を狙う。',shieldTurn:2,regen:0,atlas:{file:'enemy-extra-1',cell:1}});
ENEMIES.push({id:'region_8_2',kind:'region_8_2',name:'棘背の這い手',chapter:8,hp:66,atk:19,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'妨害と連撃で隙を突く。',shieldTurn:4,regen:0,atlas:{file:'enemy-extra-1',cell:2}});
ENEMIES.push({id:'region_9_0',kind:'region_9_0',name:'鎖の魔導書',chapter:9,hp:61,atk:17,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'再生を交えて毒を重ねる。',shieldTurn:0,regen:2,atlas:{file:'enemy-extra-1',cell:3}});
ENEMIES.push({id:'region_9_1',kind:'region_9_1',name:'墨羽の鴉',chapter:9,hp:66,atk:18,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'硬い守りから強打を狙う。',shieldTurn:2,regen:0,atlas:{file:'enemy-extra-1',cell:4}});
ENEMIES.push({id:'region_9_2',kind:'region_9_2',name:'羊皮紙の書記',chapter:9,hp:71,atk:19,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'妨害と連撃で隙を突く。',shieldTurn:4,regen:0,atlas:{file:'enemy-extra-1',cell:5}});
ENEMIES.push({id:'region_10_0',kind:'region_10_0',name:'骨翼の小竜',chapter:10,hp:66,atk:18,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'再生を交えて毒を重ねる。',shieldTurn:0,regen:0,atlas:{file:'enemy-extra-1',cell:6}});
ENEMIES.push({id:'region_10_1',kind:'region_10_1',name:'角骨の飛竜',chapter:10,hp:71,atk:19,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'硬い守りから強打を狙う。',shieldTurn:2,regen:0,atlas:{file:'enemy-extra-1',cell:7}});
ENEMIES.push({id:'region_10_2',kind:'region_10_2',name:'化石の大蛇',chapter:10,hp:76,atk:20,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'妨害と連撃で隙を突く。',shieldTurn:4,regen:0,atlas:{file:'enemy-extra-1',cell:8}});
ENEMIES.push({id:'region_11_0',kind:'region_11_0',name:'嵐羽の巨鳥',chapter:11,hp:71,atk:19,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'再生を交えて毒を重ねる。',shieldTurn:0,regen:2,atlas:{file:'enemy-extra-1',cell:9}});
ENEMIES.push({id:'region_11_1',kind:'region_11_1',name:'雷雲の水母',chapter:11,hp:76,atk:20,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'硬い守りから強打を狙う。',shieldTurn:2,regen:0,atlas:{file:'enemy-extra-1',cell:10}});
ENEMIES.push({id:'region_11_2',kind:'region_11_2',name:'風衣の槍手',chapter:11,hp:81,atk:21,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'妨害と連撃で隙を突く。',shieldTurn:4,regen:0,atlas:{file:'enemy-extra-1',cell:11}});
ENEMIES.push({id:'region_12_0',kind:'region_12_0',name:'鏡鎧の騎士',chapter:12,hp:76,atk:19,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'再生を交えて毒を重ねる。',shieldTurn:0,regen:0,atlas:{file:'enemy-extra-2',cell:0}});
ENEMIES.push({id:'region_12_1',kind:'region_12_1',name:'銀硝子の豹',chapter:12,hp:81,atk:20,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'硬い守りから強打を狙う。',shieldTurn:2,regen:0,atlas:{file:'enemy-extra-2',cell:1}});
ENEMIES.push({id:'region_12_2',kind:'region_12_2',name:'磁器面の舞手',chapter:12,hp:86,atk:21,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'妨害と連撃で隙を突く。',shieldTurn:4,regen:0,atlas:{file:'enemy-extra-2',cell:2}});
ENEMIES.push({id:'region_13_0',kind:'region_13_0',name:'彗星殻の甲虫',chapter:13,hp:81,atk:20,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'再生を交えて毒を重ねる。',shieldTurn:0,regen:2,atlas:{file:'enemy-extra-2',cell:3}});
ENEMIES.push({id:'region_13_1',kind:'region_13_1',name:'星屑の亡霊',chapter:13,hp:86,atk:21,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'硬い守りから強打を狙う。',shieldTurn:2,regen:0,atlas:{file:'enemy-extra-2',cell:4}});
ENEMIES.push({id:'region_13_2',kind:'region_13_2',name:'黒軌道の獣',chapter:13,hp:91,atk:22,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'妨害と連撃で隙を突く。',shieldTurn:4,regen:0,atlas:{file:'enemy-extra-2',cell:5}});
ENEMIES.push({id:'region_14_0',kind:'region_14_0',name:'時計面の修道女',chapter:14,hp:86,atk:21,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'再生を交えて毒を重ねる。',shieldTurn:0,regen:0,atlas:{file:'enemy-extra-2',cell:6}});
ENEMIES.push({id:'region_14_1',kind:'region_14_1',name:'振り子の処刑人',chapter:14,hp:91,atk:22,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'硬い守りから強打を狙う。',shieldTurn:2,regen:0,atlas:{file:'enemy-extra-2',cell:7}});
ENEMIES.push({id:'region_14_2',kind:'region_14_2',name:'砂時計の影',chapter:14,hp:96,atk:23,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'妨害と連撃で隙を突く。',shieldTurn:4,regen:0,atlas:{file:'enemy-extra-2',cell:8}});
ENEMIES.push({id:'region_15_0',kind:'region_15_0',name:'熾火冠の獅子',chapter:15,hp:91,atk:21,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'再生を交えて毒を重ねる。',shieldTurn:0,regen:2,atlas:{file:'enemy-extra-2',cell:9}});
ENEMIES.push({id:'region_15_1',kind:'region_15_1',name:'黒日の偶像',chapter:15,hp:96,atk:22,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'硬い守りから強打を狙う。',shieldTurn:2,regen:0,atlas:{file:'enemy-extra-2',cell:10}});
ENEMIES.push({id:'region_15_2',kind:'region_15_2',name:'白灰の六脚獣',chapter:15,hp:101,atk:23,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'妨害と連撃で隙を突く。',shieldTurn:4,regen:0,atlas:{file:'enemy-extra-2',cell:11}});
BOSSES.push({id:'sovereign_4_0',kind:'sovereign_4_0',boss:true,name:'氷冠の鹿王',chapter:4,hp:460,atk:21,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'毎ターン盾4。HP半分で攻撃力が上がる。',shieldTurn:4,regen:0,enrage:4,phaseShield:12,energyDrain:0,atlas:{file:'boss-extra-0',cell:0}});
BOSSES.push({id:'sovereign_4_1',kind:'sovereign_4_1',boss:true,name:'凍鐘の巨人',chapter:4,hp:490,atk:22,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'毎ターンHP3回復。妨害と全体攻撃を使う。',shieldTurn:0,regen:3,enrage:4,phaseShield:12,energyDrain:0,atlas:{file:'boss-extra-0',cell:1}});
BOSSES.push({id:'sovereign_5_0',kind:'sovereign_5_0',boss:true,name:'胞子の女王',chapter:5,hp:510,atk:22,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'毎ターン盾4。HP半分で攻撃力が上がる。',shieldTurn:4,regen:0,enrage:4,phaseShield:14,energyDrain:0,atlas:{file:'boss-extra-0',cell:2}});
BOSSES.push({id:'sovereign_5_1',kind:'sovereign_5_1',boss:true,name:'腐森の大亀',chapter:5,hp:540,atk:23,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'毎ターンHP3回復。妨害と全体攻撃を使う。',shieldTurn:0,regen:3,enrage:4,phaseShield:14,energyDrain:0,atlas:{file:'boss-extra-0',cell:3}});
BOSSES.push({id:'sovereign_6_0',kind:'sovereign_6_0',boss:true,name:'砂葬の王',chapter:6,hp:560,atk:22,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'毎ターン盾5。HP半分で攻撃力が上がる。',shieldTurn:5,regen:0,enrage:4,phaseShield:16,energyDrain:0,atlas:{file:'boss-extra-0',cell:4}});
BOSSES.push({id:'sovereign_6_1',kind:'sovereign_6_1',boss:true,name:'黄金棺の甲王',chapter:6,hp:590,atk:23,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'毎ターンHP4回復。妨害と全体攻撃を使う。',shieldTurn:0,regen:4,enrage:4,phaseShield:16,energyDrain:0,atlas:{file:'boss-extra-0',cell:5}});
BOSSES.push({id:'sovereign_7_0',kind:'sovereign_7_0',boss:true,name:'六腕の歯車帝',chapter:7,hp:610,atk:23,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'毎ターン盾5。HP半分で攻撃力が上がる。',shieldTurn:5,regen:0,enrage:5,phaseShield:18,energyDrain:0,atlas:{file:'boss-extra-0',cell:6}});
BOSSES.push({id:'sovereign_7_1',kind:'sovereign_7_1',boss:true,name:'蒸海の機鯨',chapter:7,hp:640,atk:24,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'毎ターンHP4回復。妨害と全体攻撃を使う。',shieldTurn:0,regen:4,enrage:5,phaseShield:18,energyDrain:0,atlas:{file:'boss-extra-0',cell:7}});
BOSSES.push({id:'sovereign_8_0',kind:'sovereign_8_0',boss:true,name:'深紅の聖者',chapter:8,hp:660,atk:24,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'毎ターン盾6。HP半分で攻撃力が上がる。',shieldTurn:6,regen:0,enrage:5,phaseShield:20,energyDrain:0,atlas:{file:'boss-extra-0',cell:8}});
BOSSES.push({id:'sovereign_8_1',kind:'sovereign_8_1',boss:true,name:'血冠の大蛭',chapter:8,hp:690,atk:25,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'毎ターンHP5回復。妨害と全体攻撃を使う。',shieldTurn:0,regen:5,enrage:5,phaseShield:20,energyDrain:0,atlas:{file:'boss-extra-0',cell:9}});
BOSSES.push({id:'sovereign_9_0',kind:'sovereign_9_0',boss:true,name:'鎖書の大司書',chapter:9,hp:710,atk:25,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'毎ターン盾6。HP半分で攻撃力が上がる。',shieldTurn:6,regen:0,enrage:5,phaseShield:22,energyDrain:0,atlas:{file:'boss-extra-0',cell:10}});
BOSSES.push({id:'sovereign_9_1',kind:'sovereign_9_1',boss:true,name:'千冊の黒鴉',chapter:9,hp:740,atk:26,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'毎ターンHP5回復。妨害と全体攻撃を使う。',shieldTurn:0,regen:5,enrage:5,phaseShield:22,energyDrain:0,atlas:{file:'boss-extra-0',cell:11}});
BOSSES.push({id:'sovereign_10_0',kind:'sovereign_10_0',boss:true,name:'竜骨の君主',chapter:10,hp:760,atk:26,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'毎ターン盾7。HP半分で攻撃力が上がる。',shieldTurn:7,regen:0,enrage:6,phaseShield:24,energyDrain:0,atlas:{file:'boss-extra-1',cell:0}});
BOSSES.push({id:'sovereign_10_1',kind:'sovereign_10_1',boss:true,name:'化石眼の巨人',chapter:10,hp:790,atk:27,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'毎ターンHP6回復。妨害と全体攻撃を使う。',shieldTurn:0,regen:6,enrage:6,phaseShield:24,energyDrain:0,atlas:{file:'boss-extra-1',cell:1}});
BOSSES.push({id:'sovereign_11_0',kind:'sovereign_11_0',boss:true,name:'雷雲の鳥王',chapter:11,hp:810,atk:26,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'毎ターン盾7。HP半分で攻撃力が上がる。',shieldTurn:7,regen:0,enrage:6,phaseShield:26,energyDrain:0,atlas:{file:'boss-extra-1',cell:2}});
BOSSES.push({id:'sovereign_11_1',kind:'sovereign_11_1',boss:true,name:'嵐を渡る巨鯨',chapter:11,hp:840,atk:27,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'毎ターンHP6回復。妨害と全体攻撃を使う。',shieldTurn:0,regen:6,enrage:6,phaseShield:26,energyDrain:0,atlas:{file:'boss-extra-1',cell:3}});
BOSSES.push({id:'sovereign_12_0',kind:'sovereign_12_0',boss:true,name:'鏡面の女王',chapter:12,hp:860,atk:27,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'毎ターン盾8。HP半分で攻撃力が上がる。',shieldTurn:8,regen:0,enrage:6,phaseShield:28,energyDrain:0,atlas:{file:'boss-extra-1',cell:4}});
BOSSES.push({id:'sovereign_12_1',kind:'sovereign_12_1',boss:true,name:'双頭の銀獅子',chapter:12,hp:890,atk:28,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'毎ターンHP7回復。妨害と全体攻撃を使う。',shieldTurn:0,regen:7,enrage:6,phaseShield:28,energyDrain:1,atlas:{file:'boss-extra-1',cell:5}});
BOSSES.push({id:'sovereign_13_0',kind:'sovereign_13_0',boss:true,name:'彗星の巨鯨',chapter:13,hp:910,atk:28,pattern:['guard', 'heavy', 'rally', 'sweep', 'flurry'],ability:'毎ターン盾8。HP半分で攻撃力が上がる。',shieldTurn:8,regen:0,enrage:7,phaseShield:30,energyDrain:0,atlas:{file:'boss-extra-1',cell:6}});
BOSSES.push({id:'sovereign_13_1',kind:'sovereign_13_1',boss:true,name:'黒星の蜘蛛后',chapter:13,hp:940,atk:29,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'毎ターンHP7回復。妨害と全体攻撃を使う。',shieldTurn:0,regen:7,enrage:7,phaseShield:30,energyDrain:1,atlas:{file:'boss-extra-1',cell:7}});
BOSSES.push({id:'sovereign_14_0',kind:'sovereign_14_0',boss:true,name:'振鐘の門衛',chapter:14,hp:960,atk:29,pattern:['curse', 'wither', 'healAll', 'sweep', 'drain'],ability:'毎ターン盾9。HP半分で攻撃力が上がる。',shieldTurn:9,regen:0,enrage:7,phaseShield:32,energyDrain:0,atlas:{file:'boss-extra-1',cell:8}});
BOSSES.push({id:'sovereign_14_1',kind:'sovereign_14_1',boss:true,name:'時針翼の天使',chapter:14,hp:990,atk:30,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'毎ターンHP8回復。妨害と全体攻撃を使う。',shieldTurn:0,regen:8,enrage:7,phaseShield:32,energyDrain:1,atlas:{file:'boss-extra-1',cell:9}});
BOSSES.push({id:'sovereign_15_0',kind:'sovereign_15_0',boss:true,name:'蝕日の竜',chapter:15,hp:1010,atk:30,pattern:['flurry', 'disrupt', 'attack', 'guardAlly', 'heavy'],ability:'毎ターン盾9。HP半分で攻撃力が上がる。',shieldTurn:9,regen:0,enrage:7,phaseShield:34,energyDrain:0,atlas:{file:'boss-extra-1',cell:10}});
BOSSES.push({id:'sovereign_15_1',kind:'sovereign_15_1',boss:true,name:'黎明の不死鳥',chapter:15,hp:1040,atk:31,pattern:['venom', 'attack', 'hex', 'mend', 'heavy'],ability:'毎ターンHP8回復。妨害と全体攻撃を使う。',shieldTurn:0,regen:8,enrage:7,phaseShield:34,energyDrain:1,atlas:{file:'boss-extra-1',cell:11}});
// 耐性・固有能力・複数回行動の割り当てと逃げる敵の追加
for(const e of ENEMIES)assignEnemyTraits(e);for(const b of BOSSES)assignEnemyTraits(b,{boss:true});
ENEMIES.push({...TREASURE_ENEMY,art:ENEMIES.length});
export const NODE_TYPES=['battle','elite','boss','camp','shop','event','mystery','treasure','shrine','forge','recruit','blessing','goddess'];
export const EVENTS=[
{title:'苔むした祠',text:'祠の奥に巡礼者が残した灯がある。',options:[['祈る','生存者のHP+14 / 灯油-6'],['油を買う','銀貨20 / 灯油+28'],['立ち去る','何も消費せず進む']]},
{title:'道に迷った行商人',text:'「灯を分けてもらえませんか」。行商人が古い遺物を差し出した。',options:[['灯を分ける','灯油-12 / 通常レリックを3択から選ぶ'],['道を教える','銀貨+25'],['薬を買う','銀貨20 / 回復薬+1']]},
{title:'星降る水辺',text:'水面に浮かぶ星をしばらく見つめた。',options:[['星の水を汲む','回復薬+1'],['技を磨く','好きなカードを1枚、分岐強化'],['岸辺を探す','銀貨+35']]},
{title:'錆びた門',text:'門の奥には銀貨がある。足元には黒い棘が伸びている。',options:[['棘を越える','全員に8ダメージ / 銀貨+65'],['灯で払う','灯油-10 / 銀貨+35'],['迂回する','灯油-2']]},
{title:'忘れられた焚き火',text:'手記には仲間と交わした約束が書かれていた。',options:[['手記を読む','3枚からカードを1枚選ぶ'],['体を休める','生存者のHP+14'],['油を集める','灯油+22']]},
{title:'夜の取引',text:'仮面の人物が命の代わりに力を売るという。',options:[['命を差し出す','先頭の仲間のHP-15 / 通常レリックを選択'],['銀貨を払う','銀貨40 / 全員の最大HP+7'],['断る','何も消費せず進む']]},
{title:'失われた隊商',text:'崩れた荷車に誰かが集めた旅の品が残されている。',options:[['物資を拾う','灯油+15 / 回復薬+1'],['銀貨を探す','銀貨+45'],['重荷を降ろす','カードを1枚選んで無料除去']]},
{title:'渡し守の問い',text:'「何を残して何を持っていく？」渡し守が道を塞いだ。',options:[['技を差し出す','好きなカード1枚を除去'],['傷を預ける','生存者のHP+20 / 銀貨-25'],['急いで渡る','灯油-5 / 銀貨+15']]}
];
export const MYSTERIES=[
{title:'祝福の泉',text:'霧の下に温かな水が湧いていた。',kind:'good',effect:'heal'},
{title:'埋もれた小箱',text:'古い小箱にはまだ使える物資が残っていた。',kind:'good',effect:'supplies'},
{title:'星の落とし物',text:'掌に収まるほどの、世界の欠片を見つけた。',kind:'good',effect:'relic'},
{title:'旅人の教え',text:'通りがかった旅人が一つの技を教えてくれた。',kind:'good',effect:'card'},
{title:'盗人の影',text:'振り返ると銀貨の袋に切れ目が走っていた。',kind:'bad',effect:'goldLoss'},
{title:'底なしの泥',text:'道が沈んだ。荷を守るために灯油を失った。',kind:'bad',effect:'fuelLoss'},
{title:'呪いの雨',text:'冷たい雨が体温と気力を奪っていく。',kind:'bad',effect:'hurt'},
{title:'伏兵',text:'道の両側から夜の獣が襲いかかってくる。',kind:'bad',effect:'ambush'}
];

for(const boss of BOSSES){boss.multiStrike=2;boss.ability+=' 攻撃行動は基本2連撃。';if(boss.chapter%3===1){boss.pattern.push('summon');boss.summonLimit=2;boss.ability+=' 2回まで増援を呼ぶ。'}if(boss.chapter>=8){boss.multiStrike=3;boss.ability+=' 後半は3連撃。'}}
for(let chapter=0;chapter<16;chapter++){
 const base=ENEMIES.find(e=>e.chapter===chapter),summoner=chapter%2===0;
 ENEMIES.push({...base,id:'herald_'+chapter,kind:'herald_'+chapter,name:summoner?['根呼びの祭司','霧笛の指揮官','灰旗の伝令','夜詠みの召喚師'][Math.floor(chapter/2)%4]:['双牙の追跡者','三刃の執行兵','疾風の影狩り','連撃の門番'][Math.floor(chapter/2)%4],hp:base.hp*1.15,atk:Math.round(base.atk*.85),pattern:summoner?['attack','summon','guardAlly','rally']:['flurry','heavy','venom','sweep'],multiStrike:summoner?1:2,summonLimit:summoner?2:0,ability:summoner?'増援を2回まで呼ぶ。新たな敵は次のターンから行動。':'攻撃行動が2連撃。',specialEnemy:true,atlas:{file:'heralds',cell:chapter%12}});
}

// Each regular region gains one new guardian; the convergence has its own ecology.
for(let chapter=0;chapter<16;chapter++){
 const base=BOSSES.find(b=>b.chapter===chapter);
 BOSSES.push({...base,id:'watcher_'+chapter,kind:'watcher_'+chapter,name:['封門の双剣卿','星紋の司令官','忌火の巡察者','影喰らいの巨神','白晶の女侯','腐花の庭主','砂冠の審判者','鉄心の造物主','血潮の司祭','禁書の守護者','骸竜の巫女','雷雲の騎王','虚鏡の皇女','星墓の葬送者','鐘律の聖王','暁蝕の番人'][chapter],hp:base.hp*1.08,pattern:['flurry','summon','hex','guard','heavy'],summonLimit:2,ability:'2〜3連撃、増援、脆弱で隊商を追い詰める。',atlas:{file:'abyss-bosses',cell:3+chapter%6},multiStrike:chapter>=8?3:2});
}
for(let i=0;i<12;i++)ENEMIES.push({id:'abyss_foe_'+i,kind:'abyss_foe_'+i,chapter:16,name:['星喰いの幼獣','虚空の祈祷師','鎖月の処刑人','砕鐘の亡者','黒曜の狩人','灯裂きの巨兵','墓標の歌姫','時蝕の織り手','無明の司書','逆光の聖骸','凍星の傀儡','深淵の告解者'][i],hp:220+i*12,atk:26+i,pattern:i%3===0?['summon','rally','hex','heavy','flurry']:i%3===1?['wither','healAll','flurry','venom']:['sweep','heavy','flurry','guard'],multiStrike:3,summonLimit:2,ability:'異界の特殊能力。3連撃と強力な妨害。',atlas:{file:'abyss-enemies',cell:i}});
for(let i=0;i<3;i++)BOSSES.push({id:'abyss_lord_'+i,kind:'abyss_lord_'+i,boss:true,chapter:16,name:['無明の星骸王','輪廻を裂く審判者','終末の灯喰らい'][i],hp:2200+i*300,atk:42+i*4,pattern:[['summon','flurry','hex','sweep','rally'],['wither','heavy','healAll','flurry','summon'],['venom','sweep','flurry','curse','summon']][i],multiStrike:4,summonLimit:4,regen:12,shieldTurn:14,enrage:15,phaseShield:80,ability:'異界専用の王。4連撃、増援、再生、毎ターン盾。HP半分でさらに強化。',atlas:{file:'abyss-bosses',cell:i}});

BOSSES.push(DEMON_BOSS);

// Lore is display text only; behavior is defined by numeric fields and patterns.
for(const enemy of [...ENEMIES,...BOSSES])Object.assign(enemy,{ability:enemyFlavor(enemy),hp:roundHP(enemy.hp)});
