/** Offline localization. The Japanese catalog remains the canonical gameplay data.
 * Exact phrases precede parameterized effects and longest-first terms. Numbers are never rounded or rewritten.
 */
import {CARDS,COMPANIONS,CHAPTERS,ENEMIES,BOSSES,RELICS} from './catalog.js?v=53';
export const LANGUAGES=Object.freeze([{id:'ja',code:'ja',label:'日本語'},{id:'en',code:'en',label:'English'},{id:'zh-CN',code:'zh-CN',label:'简体中文'},{id:'ko',code:'ko',label:'한국어'}]);
const dictionaries={en:new Map(),'zh-CN':new Map(),ko:new Map()};
let termsCache={};
const cache=new Map();
const normKey=t=>String(t).replace(/[。、\s　]/g,'');const normalized={en:new Map(),'zh-CN':new Map(),ko:new Map()};
// 数値入りの定型文（N を数値に置き換えて照合）
const templates=[];
export function registerTemplates(list){for(const [ja,en,zh,ko] of list){const re=new RegExp('^'+String(ja).split('N').map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('([0-9.]+)')+'$');templates.push({re,en,'zh-CN':zh,ko})}cache.clear()}
export function templateFirst(text,lang){return fromTemplate(String(text).trim(),lang)??translateText(text,lang)}
function fromTemplate(text,lang){const t=normKey(text);for(const tp of templates){const m=t.match(tp.re)||text.match(tp.re);if(m&&tp[lang])return tp[lang].replace(/\{(\d+)\}/g,(_,i)=>m[+i])}}
export function registerTranslations(rows){for(const [ja,en,zh,ko] of rows){if(en)dictionaries.en.set(ja,en);if(zh)dictionaries['zh-CN'].set(ja,zh);if(ko){dictionaries.ko.set(ja,ko);if(typeof ja==='string')normalized.ko.set(normKey(ja),String(ko))}if(typeof ja==='string'){const k=normKey(ja);if(en&&!normalized.en.has(k))normalized.en.set(k,String(en));if(zh&&!normalized['zh-CN'].has(k))normalized['zh-CN'].set(k,String(zh))}
 // 文末の「。」を省いた表記でも同じ訳が当たるようにする
 if(typeof ja==='string'&&ja.length>1&&ja.endsWith('。')){const bare=ja.slice(0,-1);if(en&&!dictionaries.en.has(bare))dictionaries.en.set(bare,String(en).replace(/\.$/,''));if(zh&&!dictionaries['zh-CN'].has(bare))dictionaries['zh-CN'].set(bare,String(zh).replace(/。$/,''))}}termsCache={};cache.clear();}
const rows=s=>s.trim().split('\n').filter(Boolean).map(line=>line.split('|'));
registerTranslations(rows(`
灯火のキャラバン|Lantern Caravan|灯火商队
灯の守り手|Keeper of the Flame|灯火守卫
星詠みの射手|Starseer Archer|占星射手
旅の錬金術師|Traveling Alchemist|旅行炼金术师
旧都の衛士|Old Capital Sentinel|旧都卫士
灰刃の傭兵|Ashblade Mercenary|灰刃佣兵
湿地の猟師|Marsh Hunter|湿地猎人
迷い星の占者|Wandering Star Oracle|迷星占卜师
巡礼の薬師|Pilgrim Herbalist|巡礼药师
硝子の調香師|Glass Perfumer|琉璃调香师
銀貨の剣商|Silver Sword Merchant|银币剑商
六面の賭博師|Six-Sided Gambler|六面赌徒
城壁の石工|Rampart Mason|城墙石匠
灰書の綴り手|Ashbook Scribe|灰书抄写员
白刃の決闘士|Whiteblade Duelist|白刃决斗士
毒蔓の園師|Venomvine Gardener|毒蔓园丁
灯油の機工士|Lantern Engineer|灯油机械师
紙片の魔導師|Paper Mage|纸片魔导师
青祈の施療師|Blue Prayer Healer|青祈治疗师
拾遺の盗賊|Scavenger Thief|拾遗盗贼
緋眼の剣客|Scarlet-Eyed Swordswoman|绯眼剑客
冬告げの鐘守|Winter Bell Keeper|报冬守钟人
雷鼓の奏者|Thunder Drummer|雷鼓乐师
巡礼の吟遊詩人|Pilgrim Bard|巡礼吟游诗人
弔灯の墓守|Funeral Lantern Keeper|悼灯守墓人
糸操りの人形師|Puppet Master|丝线傀儡师
風渡りの修験者|Windwalker Ascetic|渡风修行者
紅燈の祭司|Crimson Lantern Priest|红灯祭司
潮詠みの魔女|Tidechant Witch|咏潮女巫
旅路の鍛冶師|Traveling Smith|旅途铁匠
鏡盾の騎士|Mirrorshield Knight|镜盾骑士
通常の盾カードの効果 +1|Shield cards grant +1 Shield.|普通护盾卡的护盾量+1。
弱点のある敵への攻撃 +1|Attack damage +1 against enemies with Exposed.|对带有破绽的敌人攻击伤害+1。
回復カードの回復量 +1|Healing cards restore +1 HP.|治疗卡的恢复量+1。
毎ターン自身に盾2|Gain 2 Shield each turn.|每回合自身获得2护盾。
自身の攻撃カードの威力 +2|Your attack cards deal +2 damage.|自身攻击卡伤害+2。
自身が付与する毒 +2|Apply +2 Poison.|自身施加的中毒+2。
毎ターン最初の策略カードで1枚引く|Draw 1 card after your first Skill each turn.|每回合首次使用策略卡后抽1张牌。
回復カードの回復量 +3|Healing cards restore +3 HP.|治疗卡的恢复量+3。
自身の全体攻撃 +3、毒 +1|Your area attacks deal +3 damage; apply +1 Poison.|自身群体攻击伤害+3，施加的中毒+1。
自身のカード使用後に銀貨2枚を得る。|Gain 2 silver after playing your own card.|使用自身的卡牌后获得2银币。
サイコロを使う攻撃カードのダメージ+1。|Damage +1 for attack cards that use dice.|使用骰子的攻击卡伤害+1。
毎ターン自身に盾4。盾を残して攻める。|Gain 4 Shield each turn. Turn your defense into offense.|每回合自身获得4护盾。保留护盾，转守为攻。
消滅カードを使うたび1枚引く。|Draw 1 card whenever you play an Exhaust card.|每次使用带有消耗的卡牌时抽1张牌。
HP半分以下のとき攻撃威力+4。|Attack damage +4 while at half HP or less.|HP不超过一半时攻击伤害+4。
自身が付与する毒+3。毒を消費して大打撃。|Apply +3 Poison. Consume Poison to deal a powerful blow.|自身施加的中毒+3。消耗中毒造成重创。
毎ターン灯油1回復。灯油を燃やして攻める。|Restore 1 fuel each turn. Burn fuel to power attacks.|每回合恢复1灯油。消耗灯油强化攻击。
毎戦闘、最初のターンに1枚多く引く。|Draw 1 extra card on the first turn of each battle.|每场战斗首回合多抽1张牌。
対象のHP半分以下なら回復量+3。|Restore +3 HP when the target is at half HP or less.|目标HP不超过一半时恢复量+3。
毎ターン自身に捨札2枚につき盾1（最大6）。|Each turn, gain 1 Shield per 2 discarded cards (max 6).|每回合自身每有2张弃牌获得1护盾（最多6）。
弱点のある敵への攻撃+3。|Attack damage +3 against enemies with Exposed.|对带有破绽的敌人攻击伤害+3。
足止め中の敵への攻撃+5。|Attack damage +5 against Stunned enemies.|对被定身的敌人攻击伤害+5。
このターンの使用枚数ぶん攻撃威力+1（最大6）。|Attack damage +1 per card played this turn (max 6).|本回合每使用1张牌，攻击伤害+1（最多6）。
自身のカード使用後に行動済み旅人数ぶんHP回復（最大4）。|After playing your own card, restore HP equal to the number of travelers who acted (max 4).|使用自身卡牌后，按已行动旅人数恢复HP（最多4）。
戦闘不能の仲間1人につき攻撃威力+6。|Attack damage +6 per fallen ally.|每有1名倒下的同伴，攻击伤害+6。
毎ターン最初の策略で自身に盾5。|Gain 5 Shield after your first Skill each turn.|每回合首次使用策略卡后自身获得5护盾。
気力0のカード使用後に自身に盾3。|Gain 3 Shield after playing a 0-energy card.|使用0费用卡牌后自身获得3护盾。
自身のHPを代償にするカード使用後に闘志+1。|Gain +1 Might after playing a card that costs your HP.|使用消耗自身HP的卡牌后，斗志+1。
毎ターン自身に再生1。再生と全体回復が得意。|Gain 1 Regen each turn. Specializes in Regen and party healing.|每回合自身获得1再生。擅长再生与群体治疗。
強化済みカードの攻撃威力+2。|Upgraded cards deal +2 attack damage.|已强化卡牌的攻击伤害+2。
毎ターン自身に反撃2。反撃量を攻撃に変える。|Gain 2 Thorns each turn. Turn Thorns into attack damage.|每回合自身获得2反击。将反击值转化为攻击伤害。
`));
const heroEN=['Row','Sena','Nico','Kai','Eda','Rika','Mio','Fin','Towa','Orlo','Luca','Bram','Shion','Haku','Yura','Glen','Rune','Aoi','Saku','Iris','Noa','Ren','Lira','Zeke','Koto','Fuga','Hina','Sui','Tetsu','Mira','Aurora'];
const heroZH=['罗','塞娜','尼可','凯','艾达','莉卡','米欧','芬','托瓦','奥尔罗','卢卡','布拉姆','诗音','白','尤拉','格伦','露妮','葵','朔','伊莉丝','诺亚','莲','莉拉','齐克','琴','风雅','雏','翠','铁','米拉','奥罗拉'];
COMPANIONS.forEach((h,i)=>registerTranslations([[h.name,heroEN[i],heroZH[i]]]));
const stageZH=['低语森林','雾中巡礼路','灰烬王都','黎明边界','冰晶采石场','孢子花园','沙尘陵墓','锈蚀齿轮城','深红湿原','寂静书库','龙骨峡谷','雷鸣浮岛','镜之宫廷','星屑墓地','停滞大教堂','黎明之心'];
CHAPTERS.forEach((c,i)=>registerTranslations([[c.name,c.en.toLowerCase().replace(/\b\w/g,x=>x.toUpperCase()),stageZH[i]]]));
registerTranslations(rows(`
灯火の一閃|Lantern Slash|灯火一闪
揺るがぬ盾|Unyielding Shield|坚定之盾
シールドバッシュ|Shield Bash|盾击
守り手の誓い|Keeper's Oath|守卫誓言
灯を絶やすな|Keep the Flame|守住灯火
横薙ぎ|Cleave|横扫
不落の構え|Bastion Stance|不破架势
ここは通さない|None Shall Pass|休想通过
盾の間合い|Shield Reach|盾之间距
門砕き|Gatebreaker|破门
断頭の刃|Executioner's Blade|断头刃
返し棘|Barbed Riposte|荆棘反击
進軍の声|Marching Cry|进军号令
半歩の守り|Sidestep Guard|半步防守
息を継ぐ|Second Wind|喘息
鉄の巡礼|Iron Pilgrimage|铁之巡礼
二連の刃|Twin Blades|二连刃
血の覚悟|Blood Resolve|血之觉悟
最後の防衛線|Last Stand|最后防线
暁の城塞|Dawn Bastion|破晓城塞
鎧の綻び|Armor Gap|铠甲破绽
巨人の一撃|Giant's Blow|巨人重击
盾割り|Shieldbreaker|破盾
手を離すな|Hold On|别松手
命継ぎの刃|Lifebinding Blade|续命之刃
地鳴り|Earthshaker|地鸣
不退の誓い|Oath of Resolve|不退誓言
灯の突進|Lantern Charge|灯火冲锋
清き鉄心|Pure Iron Will|澄澈铁心
轟く盾|Thunder Shield|轰鸣之盾
星屑の矢|Stardust Arrow|星屑之箭
月影の刻印|Moonshadow Mark|月影刻印
流星群|Meteor Shower|流星雨
澄みわたる心|Clear Mind|澄心
夜を裂く光|Nightpiercing Light|破夜之光
一筋の星|Shooting Star|一线星光
双星|Twin Stars|双星
待ち伏せ|Ambush|埋伏
狩人の印|Hunter's Mark|猎人印记
散り矢|Scattershot|散射
霜の矢|Frost Arrow|霜之箭
隠し矢筒|Hidden Quiver|暗藏箭筒
瞬きの矢|Blink Shot|瞬矢
蛇毒の鏃|Venom Arrowhead|蛇毒箭镞
鷹の眼|Hawk Eye|鹰眼
落月|Moonfall|落月
星を読む|Read the Stars|读星
地平を測る|Survey the Horizon|测量地平线
月影の歩み|Moonshadow Step|月影步
導き星|Guiding Star|引路星
牙を射る|Fang Shot|射牙
星紡ぎの網|Starwoven Net|织星之网
血染めの矢|Bloodstained Arrow|染血之箭
嵐の弦|Stormstring|风暴之弦
暁を射抜く|Pierce the Dawn|贯穿黎明
星の手当て|Starlit Aid|星光治疗
翼の庇護|Winged Shelter|羽翼庇护
追い矢|Follow-up Shot|追箭
天球儀|Celestial Globe|天球仪
静寂の一矢|Silent Arrow|寂静一箭
火花の小瓶|Spark Vial|火花小瓶
野草の手当て|Wildherb Remedy|野草治疗
活力の調合|Vitality Tonic|活力调合
銀霧のヴェール|Silvermist Veil|银雾面纱
生命の雫|Drops of Life|生命之滴
琥珀の火炎|Amber Flame|琥珀火焰
解毒薬|Antidote|解毒药
濃毒|Concentrated Venom|浓毒
錆喰いの酸|Rust-Eating Acid|蚀锈酸液
賦活の霊薬|Invigorating Elixir|赋活灵药
上薬草|Potent Herbs|上等药草
漂う胞子|Drifting Spores|漂浮孢子
滋養の霧|Nourishing Mist|滋养之雾
触媒|Catalyst|催化剂
夜露の蒸留|Nightdew Distillation|夜露蒸馏
知識の抽出|Extract Knowledge|提炼知识
揮発する火|Volatile Fire|挥发之火
生命の抽出|Extract Life|提炼生命
息吹の軟膏|Breath Salve|生息软膏
帰還の霊水|Water of Return|归还灵水
奮起の香|Rousing Incense|奋起熏香
白煙の幕|White Smoke Screen|白烟幕
油壺|Oil Bomb|油壶
腐食液|Corrosive Fluid|腐蚀液
日輪の小瓶|Sun Vial|日轮小瓶
備えの調合|Prepared Tonic|预备调合
野戦救急|Field Medicine|战地急救
夜茶|Night Tea|夜茶
火喰い酒|Firebreather's Brew|吞火酒
浄化の雨|Cleansing Rain|净化之雨
暁の城壁|Dawn Rampart|破晓城墙
焦燥|Agitation|焦躁
灰刃|Ashblade|灰刃
受け流す刃|Parrying Blade|卸力之刃
戦場の呼吸|Battlefield Breath|战场呼吸
血火の誓い|Bloodfire Oath|血火誓言
踏み込み|Lunge|踏前
紅蓮の円舞|Crimson Waltz|红莲圆舞
返しの太刀|Riposte Blade|回斩之刃
傭兵の勘|Mercenary's Instinct|佣兵直觉
鎧断ち|Armor Cleaver|断铠
灰の再起|Rise from Ash|灰烬再起
一騎の覚悟|Lone Warrior's Resolve|独骑觉悟
落日の断罪|Sunset Judgment|落日断罪
衛士の槍|Sentinel's Spear|卫士长枪
大盾の庇護|Greatshield Shelter|大盾庇护
糧食|Rations|口粮
陣形を組む|Form Ranks|结成阵形
槍の牽制|Spear Feint|长枪牵制
鉄城の守り|Iron Citadel Guard|铁城防守
城門の一突き|Gatehouse Thrust|城门突刺
盾を並べよ|Shields Up|列盾
衛士の号令|Sentinel's Command|卫士号令
献身の壁|Wall of Devotion|献身之壁
古都の備蓄|Old Capital Stores|古都储备
不屈の巡回|Unyielding Patrol|不屈巡逻
沼矢|Marsh Arrow|沼泽之箭
葦の隠れ身|Reed Concealment|芦苇藏身
湿地の薬|Marsh Medicine|湿地药剂
猟罠|Hunter's Trap|猎人陷阱
腐毒の雨|Rotvenom Rain|腐毒之雨
獲物の足跡|Quarry Tracks|猎物足迹
葦を渡る|Across the Reeds|渡苇
蛇牙の三矢|Three Fang Arrows|蛇牙三矢
獲物を追う|Pursue the Quarry|追猎
濁流の鏃|Torrent Arrowhead|浊流箭镞
狩りの用意|Prepare the Hunt|狩猎准备
毒沼の月|Venom Marsh Moon|毒沼之月
星紋|Star Sigil|星纹
天幕の護り|Canopy Ward|天幕守护
願いの灯|Wishing Flame|祈愿之灯
未来の栞|Future Bookmark|未来书签
運命を読む|Read Fate|解读命运
流星の託宣|Meteor Oracle|流星神谕
星を繋ぐ|Link the Stars|连接星辰
逆さの月|Inverted Moon|倒悬之月
天球の鍵|Celestial Key|天球之钥
夜空の返事|Night Sky's Reply|夜空回应
静謐の祈り|Tranquil Prayer|静谧祈祷
星海を拓く|Open the Star Sea|开辟星海
薬師の杖|Herbalist's Staff|药师之杖
薬草の包帯|Herbal Bandage|草药绷带
巡礼の手当て|Pilgrim's Aid|巡礼治疗
救護の準備|Prepare Relief|救护准备
苦い煎じ薬|Bitter Decoction|苦味煎药
緑の息吹|Verdant Breath|翠绿生息
旅路の滋養|Trail Nourishment|旅途滋养
眠れる香|Slumber Incense|安眠熏香
冬越しの備え|Winter Preparations|越冬准备
命を繋ぐ|Preserve Life|延续生命
若葉の誓い|Youngleaf Oath|嫩叶誓言
大樹の祝福|Great Tree's Blessing|巨树祝福
玻璃の炸薬|Glass Explosive|琉璃炸药
香煙の帳|Incense Veil|香烟之帐
甘露の香|Nectar Fragrance|甘露之香
火薬の調律|Gunpowder Tuning|火药调律
硝子の雨|Glass Rain|玻璃之雨
香りの記憶|Scent Memory|香气记忆
紅い閃光|Crimson Flash|绯红闪光
腐香|Rotting Incense|腐香
眠り香|Sleep Incense|安眠香
芳醇な抽出|Fragrant Extract|芳醇提取
硝煙の翼|Smoke Wings|硝烟之翼
万華の爆炎|Kaleidoscope Inferno|万华爆炎
`));
// Every generated card gets a meaningful localized name, with its traveler/rank/move identity intact.
const journey={
row:[['Lanternkeeper','Old Castle','Resolute','Pilgrim','Dawnlight'],['Swordplay','Guard Formation','Pledge','Siege','Flame','Twin Slash','Rescue','Shockwave','Resolve','Rampart'],['灯守','古城','不退','巡礼','曙光'],['剑击','防阵','誓约','破城','灯火','连斩','救援','冲波','决意','城墙']],
sena:[['Northern Sky','Moonshadow','Whitefeather','Farseeing','Nebula'],['Arrow','Footwork','Aim','Arrow Rain','Rapid Shot','Foresight','Aid','Snipe','Sealing Arrow','Guidance'],['北天','月影','白羽','远望','星云'],['一箭','步法','瞄准','箭雨','速射','预见','治疗','狙击','封箭','引导']],
nico:[['Traveler','Nightdew','Amber','Wildherb','Sunwheel'],['Powder Vial','Decoction','Spore Bag','Healing Mist','Distillation','Medicinal Cloth','Bomb Vial','Activator','Spirit Water','Catalyst'],['旅药','夜露','琥珀','野草','日轮'],['火药瓶','煎药','孢子袋','治愈雾','蒸馏','药布','炸药瓶','活性剂','灵水','催化剂']],
kai:[['Sentinel','Iron Gate','Citadel','Royal Castle','Unyielding'],['Spear Strike','Greatshield','Command','Break','Sentry','Twin Thrust','Relief','Suppression','Readiness','Bulwark'],['卫士','铁门','城塞','王城','不屈'],['枪击','大盾','号令','破势','步哨','连刺','救护','压制','准备','坚阵']],
eda:[['Ashblade','Blood Oath','Sunset','Mercenary','Crimson'],['Longblade','Parry','Resolve','Armor Break','Breath','Twin Blades','First Aid','Dance','Rally','Riposte'],['灰刃','血誓','落日','佣兵','红莲'],['太刀','卸力','觉悟','断铠','呼吸','二连刃','急救','圆舞','奋起','回刃']],
rika:[['Marsh','Reedbed','Serpent Fang','Beast Trail','Hunting Moon'],['Poison Arrow','Concealment','Target','Scatterbow','Sleight','Observation','Herbs','Pierce','Snare','Hunt Mark'],['湿地','芦原','蛇牙','兽径','猎月'],['毒箭','藏身','标靶','散弓','快手','观察','药草','贯穿','捕缚','猎印']],
mio:[['Celestial','Wandering Star','Starseer','Dreaming','Everchanging'],['Starbolt','Canopy','Revelation','Starstorm','Starflash','Vision','Wish','Star Lance','Sealed Star','Prayer'],['天球','迷星','读星','梦见','流转'],['星弹','天幕','启示','星岚','瞬星','先见','祈愿','星枪','封星','祝词']],
fin:[['Herbalist','Youngleaf','Pilgrim Herb','Life Tree','Greenwind'],['Venom Staff','Potent Remedy','Herb Bag','Healing Wind','Medicine','Bandage','Bitter Vial','Nourishing Tonic','Revival Water','Extraction'],['药师','嫩叶','巡礼草','生命树','绿风'],['毒杖','上药','香草袋','疗愈风','调药','绷带','苦药瓶','滋养剂','复苏水','提取']],
towa:[['Crystal','Aromatic','Gunsmoke','Kaleidoscope','Fragrant Moon'],['Perfume Vial','Nectar','Poison Smoke','Healing Scent','Concentration','Scent Cloth','Burst Vial','Vital Incense','Spirit Incense','Rotting Incense'],['琉璃','芳香','硝烟','万华','香月'],['香瓶','甘露','毒烟','疗香','浓缩','香布','爆裂瓶','赋活香','灵香','腐香']]
};
const artWordsEN=['Strike','Guard','Aid','Expansion','Scheme','Readiness','Combo','Seal','Turning Point','Support','Discovery','Secret Art'];
const artWordsZH=['一击','防守','治疗','展开','谋略','准备','连技','封印','转机','援护','探索','奥传'];
const rankEN=['Flame','Path','Moon','Star','Night','Dawn'],rankZH=['灯','道','月','星','夜','晓'];
const ultimateEN=['Gatebreaker','Starfall','Unbreakable','Homecoming','Triple Strike','Pledge','Eclipse','Second Coming','Awakening','Flame Legacy'];
const ultimateZH=['破门','星落','不破','归还','三连','誓约','蚀夜','再临','开眼','灯继'];
for(const card of Object.values(CARDS)){
 const h=COMPANIONS.find(h=>h.id===card.owner),hi=COMPANIONS.indexOf(h);let m;
 if((m=card.id.match(/_journey_(\d+)$/))){const n=+m[1],r=Math.floor(n/10),k=n%10,w=journey[card.owner];if(w)registerTranslations([[card.name,`${w[0][r]} ${w[1][k]}`,`${w[2][r]}之${w[3][k]}`]])}
 else if((m=card.id.match(/_art_(\d+)$/))){const n=+m[1],r=Math.floor(n/12),k=n%12;registerTranslations([[card.name,`${heroEN[hi]} · ${rankEN[r]} ${artWordsEN[k]}`,`${heroZH[hi]}·${rankZH[r]}${artWordsZH[k]}`]])}
 else if((m=card.id.match(/_ultimate_(\d+)$/))){const k=+m[1];registerTranslations([[card.name,`${heroEN[hi]}'s Secret · ${ultimateEN[k]}`,`${heroZH[hi]}的秘奥·${ultimateZH[k]}`]])}
}
registerTranslations(rows(`
根を張る王|Rootbound King|扎根之王
鐘楼の番人|Belfry Keeper|钟楼守卫
灰冠の女王|Ashcrowned Queen|灰冠女王
終わらない夜|Endless Night|无尽长夜
骨冠の狩母|Bonecrowned Huntmother|骨冠猎母
水底の聖女|Drowned Saint|水底圣女
鉄葬の執行官|Ironbound Executioner|铁葬执行官
暁を閉ざす者|Dawn Warden|封晓者
種蒔きの巫|Seed Oracle|播种巫女
潮鏡の双頭|Tidemirror Twinhead|潮镜双首
炉心の竜|Furnace Dragon|炉心之龙
星喰いの蛇|Star-Eating Serpent|噬星之蛇
霧まといの狼|Mistcloaked Wolf|披雾之狼
うろの番兵|Hollow Sentry|树洞哨兵
夜渡りの蛾|Nightfaring Moth|渡夜之蛾
森の密猟者|Forest Poacher|森林盗猎者
棘の使い魔|Thorn Familiar|荆棘使魔
茸角の獣|Mushroom-Antler Beast|菇角兽
水没の巡礼者|Drowned Pilgrim|沉水巡礼者
鐘抱き蝙蝠|Bell-Cradling Bat|抱钟蝙蝠
遺跡宿り|Ruin Dweller|遗迹寄居者
灯籠水母|Lantern Jellyfish|灯笼水母
朽ちた聖堂騎士|Fallen Abbey Knight|朽败圣堂骑士
霧織り|Mistweaver|织雾者
灰鎧の衛兵|Asharmored Guard|灰铠卫兵
熾火の猟犬|Ember Hound|余烬猎犬
硝子面の魔女|Glass-Masked Witch|玻璃面具女巫
炉蜘蛛|Furnace Spider|炉蜘蛛
黒鴉の処刑人|Raven Executioner|黑鸦刽子手
焼書の学徒|Burned-Book Scholar|焚书学徒
星喰い蛭|Star-Eating Leech|噬星水蛭
虚空の蛾|Void Moth|虚空之蛾
鏡翼の使徒|Mirrorwing Apostle|镜翼使徒
夜駆けの騎士|Nightrider|夜驰骑士
蝕の檻|Eclipse Cage|蚀之牢笼
砂時計の番人|Hourglass Keeper|沙漏守卫
氷坑の採掘者|Icepit Miner|冰坑矿工
霜牙の狼|Frostfang Wolf|霜牙之狼
氷殻の古亀|Ice-Shelled Ancient Turtle|冰壳古龟
灯茸の歩き手|Glowshroom Walker|灯菇行者
胞子羽の蛾|Sporewing Moth|孢翼之蛾
苔茸の猪|Mossboar|苔菇野猪
砂布の山犬|Sandcloth Jackal|沙布野犬
霊廟の蠍|Tomb Scorpion|陵墓之蝎
封印の甲虫壺|Sealed Scarab Jar|封印甲虫壶
歯車の猟犬|Gear Hound|齿轮猎犬
真鍮の蟷螂|Brass Mantis|黄铜螳螂
蒸気の鎧兵|Steam Armored Soldier|蒸汽铠兵
深紅の葦巫女|Crimson Reed Priestess|深红苇巫女
血吸いの鹿|Blooddrinking Deer|吸血鹿
棘背の這い手|Thornback Crawler|棘背爬行者
鎖の魔導書|Chained Grimoire|锁链魔导书
墨羽の鴉|Inkwing Raven|墨羽乌鸦
羊皮紙の書記|Parchment Scribe|羊皮纸书记员
骨翼の小竜|Bonewing Drake|骨翼幼龙
角骨の飛竜|Hornbone Wyvern|角骨飞龙
化石の大蛇|Fossil Serpent|化石巨蛇
嵐羽の巨鳥|Stormwing Roc|岚羽巨鸟
雷雲の水母|Thundercloud Jellyfish|雷云水母
風衣の槍手|Windcloaked Lancer|风衣枪手
鏡鎧の騎士|Mirrorarmored Knight|镜铠骑士
銀硝子の豹|Silverglass Panther|银玻璃猎豹
磁器面の舞手|Porcelain-Masked Dancer|瓷面舞者
彗星殻の甲虫|Comet-Shell Beetle|彗壳甲虫
星屑の亡霊|Stardust Wraith|星屑亡灵
黒軌道の獣|Black-Orbit Beast|黑轨之兽
時計面の修道女|Clockface Nun|钟面修女
振り子の処刑人|Pendulum Executioner|钟摆刽子手
砂時計の影|Hourglass Shadow|沙漏之影
熾火冠の獅子|Embercrowned Lion|余烬冠狮
黒日の偶像|Black Sun Idol|黑日偶像
白灰の六脚獣|Whiteash Hexapod|白灰六足兽
氷冠の鹿王|Icecrowned Stag King|冰冠鹿王
凍鐘の巨人|Frozen Bell Giant|冻钟巨人
胞子の女王|Spore Queen|孢子女王
腐森の大亀|Rotwood Great Turtle|腐林巨龟
砂葬の王|Sandburied King|沙葬之王
黄金棺の甲王|Golden Sarcophagus Scarab King|金棺甲王
六腕の歯車帝|Six-Armed Gear Emperor|六臂齿轮帝
蒸海の機鯨|Steam-Sea Machine Whale|蒸海机鲸
深紅の聖者|Crimson Saint|深红圣者
血冠の大蛭|Bloodcrowned Leech|血冠巨蛭
鎖書の大司書|Chained-Book Grand Librarian|锁书大图书管理员
千冊の黒鴉|Thousand-Book Raven|千册黑鸦
竜骨の君主|Dragonbone Sovereign|龙骨君主
化石眼の巨人|Fossil-Eyed Giant|化石眼巨人
雷冠の天鳥|Thundercrowned Skybird|雷冠天鸟
嵐を渡る巨鯨|Stormfaring Great Whale|渡岚巨鲸
鏡面の女王|Mirror Queen|镜面女王
双頭の銀獅子|Twin-Headed Silver Lion|双首银狮
彗星の巨鯨|Comet Whale|彗星巨鲸
黒星の蜘蛛后|Blackstar Spider Queen|黑星蛛后
振鐘の門衛|Swinging Bell Gatekeeper|振钟门卫
時針翼の天使|Clockhand-Winged Angel|时针翼天使
蝕日の竜|Eclipse Dragon|蚀日之龙
黎明の不死鳥|Dawn Phoenix|黎明不死鸟
雷雲の鳥王|Thundercloud Bird King|雷云鸟王
嵐を渡る鯨王|Stormfaring Whale King|渡岚鲸王
根呼びの祭司|Rootcalling Priest|唤根祭司
霧笛の指揮官|Foghorn Commander|雾笛指挥官
灰旗の伝令|Ashbanner Herald|灰旗传令
夜詠みの召喚師|Nightchant Summoner|咏夜召唤师
双牙の追跡者|Twinfang Tracker|双牙追踪者
三刃の執行兵|Tripleblade Enforcer|三刃执行兵
疾風の影狩り|Gale Shadowhunter|疾风影猎人
連撃の門番|Combo Gatekeeper|连击守门人
未知の章の主|Unknown Sovereign|未知领主
消えない熾火|Undying Ember|不灭余烬
旅人の根飾り|Traveler's Root Charm|旅人根饰
星図のかけら|Star Chart Fragment|星图碎片
夜明けの鈴|Dawn Bell|黎明之铃
銀狼の牙|Silver Wolf Fang|银狼之牙
月白の護符|Moonwhite Charm|月白护符
小さな蒸留器|Small Still|小型蒸馏器
巡礼の硬貨|Pilgrim's Coin|巡礼硬币
門守の蝋燭|Gatekeeper's Candle|守门蜡烛
帰路の羅針盤|Homeward Compass|归途罗盘
預言者の羽根|Prophet's Feather|预言者羽毛
古い砥石|Old Whetstone|古老磨刀石
結び薬草|Knotted Herbs|药草束
陶器の薬壺|Ceramic Medicine Jar|陶制药壶
星紡ぎのリボン|Starwoven Ribbon|织星缎带
湿地の白塩|Marsh White Salt|湿地白盐
ひび割れた照準器|Cracked Sight|开裂瞄准镜
名もなき勲章|Nameless Medal|无名勋章
巡礼の結び紐|Pilgrim's Knot|巡礼结绳
四つ葉の銀細工|Silver Clover|四叶银饰
琥珀の化石|Amber Fossil|琥珀化石
踊る炭片|Dancing Charcoal|舞炭
氷河の留め具|Glacier Clasp|冰川扣
抱擁の枝|Embracing Branch|拥抱之枝
三弦の小竪琴|Three-String Harp|三弦小竖琴
砂漏れの時計|Leaking Hourglass|漏沙时计
灯芯の核|Lantern Core|灯芯核心
商人の財布|Merchant's Purse|商人钱袋
保存食の包み|Preserved Rations|干粮包
巡礼鍛冶の印|Pilgrim Smith's Mark|巡礼铁匠印
身代わりの人形|Substitute Doll|替身人偶
討伐者の仮面|Slayer's Mask|讨伐者面具
折り畳み星図|Folding Star Chart|折叠星图
毒銀の針|Venomsilver Needle|毒银针
燃える札|Burning Talisman|燃烧符纸
眠らない種|Sleepless Seed|不眠种子
夜明けの磁石|Dawn Magnet|黎明磁石
行商の帳面|Peddler's Ledger|行商账本
空腹の結晶|Hungry Crystal|饥饿结晶
宿り貝|Sheltering Shell|寄居贝
暁の聖杯|Dawn Chalice|破晓圣杯
浄めの鈴緒|Cleansing Bell Rope|净化铃绳
慈雨の水瓶|Gentle Rain Vessel|甘霖水瓶
零光の欠片|Zerolight Shard|零光碎片
血の日輪|Blood Sun|血色日轮
黒星の冠|Blackstar Crown|黑星之冠
鉄の心臓|Iron Heart|钢铁心脏
虚ろな大灯籠|Hollow Great Lantern|空洞大灯笼
黄金の契約|Golden Contract|黄金契约
赤誓の封蝋|Red Oath Seal|赤誓封蜡
凍った巡礼時計|Frozen Pilgrim Clock|冰封巡礼时钟
毒棘の冠|Venomthorn Crown|毒棘之冠
砕けぬ甲冑|Unbroken Armor|不碎铠甲
野生の星核|Wild Star Core|野生星核
飢えた偶像|Starving Idol|饥饿偶像
死告の三重鐘|Triple Death Bell|报丧三重钟
深淵の観測眼|Abyssal Observer|深渊观测眼
白灰の心壺|Whiteash Heart Jar|白灰心壶
蝕の剣|Eclipse Blade|蚀之剑
遍歴王の印|Wandering King's Seal|游历王之印
`));
registerTranslations(rows(`
新しい旅|New Journey|新的旅程
続きから|Continue|继续旅程
遊び方と練習|How to Play & Practice|玩法与练习
遊び方|How to Play|玩法说明
設定・音量・セーブ|Settings, Sound & Saves|设置、音量与存档
設定とセーブ|Settings & Saves|设置与存档
設定する|Configure|设置
設定|Settings|设置
言語|Language|语言
音量調節|Volume|音量调节
全体音量|Master Volume|总音量
効果音|Sound Effects|音效
サウンド|Sound|声音
全体・BGM・効果音を別々に設定|Set master, music and effects volumes separately.|分别设置总音量、音乐与音效。
BGM・効果音をまとめて調節|Adjust music and effects together.|同时调节音乐与音效。
探索曲と戦闘曲の音量|Exploration and battle music volume.|探索和战斗音乐音量。
攻撃・盾・回復・連携などの音量|Volume of attacks, shields, healing and links.|攻击、护盾、治疗与联携等音效音量。
場面に合わせた79曲。16の土地それぞれの探索・戦闘曲と36体のボス専用曲。全体・BGM・効果音を個別に調整できます。|79 tracks: exploration and battle music for 16 lands, plus themes for 36 bosses. Adjust master, music and effects volumes separately.|79首配乐：16片土地的探索与战斗曲，以及36位首领的专属曲。可分别调整总音量、音乐与音效。
音量はこのブラウザに保存します。画面を閉じると音は止まります。BGMは探索中と戦闘中で切り替わります。|Volume settings are saved in this browser. Closing the page stops audio. Music changes between exploration and battle.|音量设置保存在此浏览器中。关闭页面会停止声音。音乐随探索和战斗切换。
消音を解除|Unmute|取消静音
すべて消音|Mute All|全部静音
効果音を試聴|Test Sound Effects|试听音效
BGMを再生・再開|Play / Resume Music|播放／继续音乐
クリック・タップで音楽が始まります。|Click or tap to start the music.|点击或轻触即可开始播放音乐。
アニメーション|Animations|动画
OFFでは戦闘演出を短縮します|OFF shortens battle animations.|关闭后缩短战斗演出。
画面と文字|Display & Text|画面与文字
読みやすさ・PCでの全画面表示|Readability and desktop fullscreen.|文字可读性与电脑全屏显示。
文字：大|Text: Large|文字：大
文字：標準|Text: Standard|文字：标准
全画面|Fullscreen|全屏
ゲームに戻る|Return to Game|返回游戏
元の画面に戻る|Return to Previous Screen|返回原画面
戻る|Back|返回
閉じる|Close|关闭
わかった|Got It|明白了
メニュー|Menu|菜单
ゲームメニュー|Game Menu|游戏菜单
一時停止|Paused|已暂停
保存してタイトルへ|Save & Return to Title|保存并返回标题
タイトルへ戻る|Return to Title|返回标题
旅の記録を保存・読込|Save / Load Journey|保存／读取旅程
記録の管理|Manage Saves|存档管理
自動保存＋手動記録3つ|Autosave + 3 manual slots|自动存档＋3个手动存档
記録を開く|Open Saves|打开存档
現在の旅を保存|Save Current Journey|保存当前旅程
各行動後に自動でも保存されます|Also saves automatically after each action.|每次行动后也会自动保存。
保存する|Save|保存
セーブを書き出す|Export Save|导出存档
バックアップ・別の端末への移行|Back up or transfer to another device.|备份或迁移至其他设备。
書き出す|Export|导出
セーブを読み込む|Import Save|导入存档
現在の旅をファイルの内容に置き換えます|Replace the current journey with the imported file.|用文件内容替换当前旅程。
読み込む|Import|导入
セーブはこのブラウザに保存されます。クラウド同期はありません。|Saves are stored in this browser. Cloud sync is unavailable.|存档保存在此浏览器中。无云端同步。
保存に失敗しています。セーブを書き出してください。|Saving failed. Please export your save.|保存失败。请导出存档。
保存済み|Saved|已保存
未保存|Unsaved|未保存
オートセーブ|Autosave|自动保存
自動保存|Autosave|自动保存
自動保存済み|Autosaved|已自动保存
読み込みエラー|Load Error|读取错误
空の記録|Empty Slot|空存档
この記録にはまだ旅がありません。|This slot has no journey yet.|此存档位还没有旅程。
現在の旅を記録|Save Current Journey|记录当前旅程
この旅を再開|Resume This Journey|继续此旅程
ファイルを読み込む|Import a File|导入文件
現在の旅を書き出す|Export Current Journey|导出当前旅程
記録の上書き|Overwrite Save|覆盖存档
この内容で上書き|Overwrite with This Journey|用此旅程覆盖
現在の旅を上書きします。残す場合は先に手動スロットへ保存してください。|This replaces your current journey. Save it to a manual slot first if you want to keep it.|这会覆盖当前旅程。如需保留，请先保存至手动存档位。
元のセーブを自動で上書きしません。記録管理から復元できます。|The original save is preserved. Restore it from Save Management.|原存档会保留。可在存档管理中恢复。
セーブを書き出しました。別の端末で読み込めます。|Save exported. You can import it on another device.|存档已导出。可在其他设备上导入。
セーブを読み込みました。続きから遊べます。|Save imported. Your journey is ready to continue.|存档已导入。可以继续旅程。
旅を保存しました。デッキとレリックも完全に保持します。|Journey saved, including your full deck and relics.|旅程已保存，包括完整牌组和遗物。
旅を始めると自動保存されます。|Your journey autosaves once you begin.|开始旅程后会自动保存。
この記録は空です。|This slot is empty.|此存档位为空。
有効なセーブファイルではありません。現在の旅は保持しました。|Invalid save file. Your current journey has been preserved.|存档文件无效。当前旅程已保留。
最初の旅人を選ぶ|Choose Your First Traveler|选择首位旅人
最初のレリックを選ぶ|Choose Your Starting Relic|选择初始遗物
選んだ1人とその人の固有カード10枚で出発します。|Depart with one traveler and 10 of their unique cards.|带着1位旅人与其10张专属卡出发。
最初の旅人はこのラン中、交代できません。|Your first traveler stays with you for this entire run.|本次旅程中首位旅人无法替换。
最初の旅人は交代できません|Your first traveler cannot be replaced.|首位旅人无法替换。
最初の旅人（固定）|First Traveler (Fixed)|首位旅人（固定）
最初の戦闘で操作ガイドを表示|Show a guide in the first battle|首场战斗显示操作引导
攻撃・守り・ターンの進め方を確認|Learn attacks, defense and turn flow.|学习攻击、防守与回合推进。
高難度「夜深き旅」|Hard Mode: Deep Night|高难度「深夜之旅」
全16ステージ。新たな土地と強大な主が待つ|16 stages. New lands and mighty sovereigns await.|共16关。新的土地与强大领主在前方等待。
終わりなき旅|Endless Journey|无尽旅程
高難度16ステージを繰り返し倒れるまで進む。16ステージ踏破ごとに2倍強化。|Repeat 16 hard stages until you fall. Earn a double upgrade after every 16 stages.|循环挑战16个高难度关卡，直至倒下。每通过16关获得双倍强化。
攻防一体・血を代価に強化|Attack and defense; power at the cost of blood.|攻防一体，以鲜血换取力量。
弱点・連射・手札の循環|Expose, rapid shots and card cycling.|破绽、连射与手牌循环。
毒・調合・回復|Poison, alchemy and healing.|中毒、调合与治疗。
基本はこの3つ。|Three essentials.|掌握这三点。
予告を見る|Read Enemy Intent|查看行动预告
カードを使う|Play Cards|使用卡牌
ターンを終える|End Turn|结束回合
カード → 対象|Card → Target|卡牌 → 目标
数字の分だけ気力を消費。|Spend energy equal to the card's cost.|消耗卡面数字所示的能量。
盾で攻撃を防ぐのも大切。|Use Shield to protect against attacks.|使用护盾抵挡攻击也很重要。
敵が予告どおりに行動。|Enemies carry out their announced actions.|敌人按预告行动。
気力4・手札6枚|4 Energy · 6 Cards|4能量・6张手牌
残りの気力は持ち越せません。|Unused energy does not carry over.|剩余能量不会保留到下回合。
仲間を3人そろえて → 三人の連携！|Recruit 3 travelers → Caravan Link!|集齐3位同伴 → 三人联携！
同じターンに全員が行動すると、|When everyone acts in the same turn,|全员在同一回合行动后，
全員に盾6・気力+1|6 Shield to all · +1 Energy|全员6护盾・能量+1
全員に盾6 · 気力 +1|6 Shield to all · +1 Energy|全员6护盾・能量+1
仲間の役割|Traveler Roles|同伴职责
全用語と固有能力の説明|All Terms & Passive Abilities|全部术语与固有能力说明
マップとセーブ|Map & Saving|地图与存档
実際に操作して覚える|Learn by Playing|实战练习
すべての用語|All Terms|全部术语
旅と戦闘の用語集|Journey & Battle Glossary|旅程与战斗术语表
用語や説明を検索（例：闘志）|Search terms or descriptions (e.g. Might)|搜索术语或说明（如：斗志）
用語を検索|Search Terms|搜索术语
すべての用語を表示|Show All Terms|显示全部术语
一致する用語がありません。|No matching terms.|没有匹配的术语。
いつでも確認|Inspect Anytime|随时查看
旅の手帳|Traveler's Notebook|旅人手册
地図|Map|地图
レリック|Relics|遗物
デッキ|Deck|牌组
仲間・固有能力|Travelers & Passives|同伴与固有能力
用語集|Glossary|术语表
仲間と固有能力|Travelers & Passive Abilities|同伴与固有能力
固有能力（常時発動）|Passive Ability (Always Active)|固有能力（自动生效）
この仲間のカードを見る|View This Traveler's Cards|查看此同伴的卡牌
能力の用語を調べる|Look Up Ability Terms|查询能力术语
仲間へ戻る|Back to Travelers|返回同伴
全体マップ|Full Map|完整地图
所持レリック|Owned Relics|持有遗物
ボスレリック|Boss Relic|首领遗物
通常レリック|Normal Relic|普通遗物
デメリット（代償）|Drawback (Price)|负面效果（代价）
デメリット：|Drawback: |负面效果：
効果の詳細|Effect Details|效果详情
交代する仲間を選択|Choose a Traveler to Replace|选择要替换的同伴
外す仲間を選んでください。離脱した仲間はこのラン中は二度と加入しません。|Choose who leaves. Departed travelers cannot return during this run.|选择离队的同伴。本次旅程中离队者无法再次加入。
交代せずに戻る|Back Without Replacing|不替换并返回
仲間の交代を確認|Confirm Traveler Replacement|确认替换同伴
相手を選び直す|Choose Someone Else|重新选择
この交代を確定|Confirm Replacement|确认替换
この旅で迎えられる新しい仲間はもういません。|No new travelers remain to recruit this run.|本次旅程中已无新的旅人可招募。
仲間に迎える|Recruit|招募同伴
迎えて交代相手を選ぶ|Recruit & Choose Replacement|招募并选择替换者
今の仲間で進む|Continue with Current Party|以当前队伍继续
固有カード6枚を追加。加入時HPは80%。脱退した仲間はこのラン中に戻りません。|Adds 6 unique cards. Joins at 80% HP. Departed travelers cannot return this run.|添加6张专属卡。以80% HP加入。离队者在本次旅程中不会返回。
旅のデッキ|Journey Deck|旅程牌组
カードを強化|Upgrade Card|强化卡牌
カードを除去|Remove Card|移除卡牌
カードの詳細|Card Details|卡牌详情
一覧へ戻る|Back to List|返回列表
強化前後の比較|Compare Upgrade|强化前后比较
この強化を確定|Confirm Upgrade|确认强化
別のカードを確認|Inspect Another Card|查看其他卡牌
この条件で強化できるカードがありません。|No cards can be upgraded under these conditions.|没有符合条件的可强化卡牌。
このカードは今回の条件で強化できません。|This card cannot be upgraded under these conditions.|此卡不符合本次强化条件。
カードは最大3回まで通常18種類＋条件付き希少強化からランダム強化できます。|Cards can be upgraded 3 times, with 300 shared and 300 card-specific options plus conditional rare upgrades.|每张卡最多强化3次，从300种通用强化与300种专属强化与符合条件的稀有强化中随机选择。
確認して確定するまで消費はありません。|Nothing is spent until you review and confirm.|查看并确认前不会消耗资源。
各カード最大3段階。候補を確認してから確定できます。|Each card has up to 3 upgrades. Review the offer before confirming.|每张卡最多强化3次。可查看候选后再确认。
強化するカードを選ぶ|Choose a Card to Upgrade|选择要强化的卡牌
強化せず進む|Continue Without Upgrading|不强化并继续
カードをランダム強化|Random Card Upgrade|随机强化卡牌
無料の安全強化 ×1|Free Safe Upgrade ×1|免费安全强化×1
無料で1回。確定するまで恩恵は消費されません。|One free upgrade. The blessing is spent only when confirmed.|免费强化1次。确认前不会消耗恩惠。
この合成を確定|Confirm Fusion|确认合成
素材を選び直す|Choose Materials Again|重新选择素材
最初の素材を選ぶ|Choose First Material|选择第一张素材
もう1枚の素材を選ぶ|Choose Second Material|选择第二张素材
合成できる組み合わせがありません。|No valid fusion pairs.|没有可合成的组合。
同じ旅人のカード2枚を1枚に|Fuse 2 cards from the same traveler into 1.|将同一旅人的2张卡合为1张。
灯の融合|Flame Fusion|灯火融合
二つの灯を一つに。|Two flames become one.|两盏灯，合而为一。
生命の泉|Fountain of Life|生命之泉
全員のHPを最大まで回復|Restore Everyone to Full HP|恢复全员全部HP
清らかな鍛錬|Pure Training|纯净锻炼
灯の備蓄|Lantern Supplies|灯火储备
巡礼者の財宝|Pilgrim's Treasure|巡礼者财宝
ここでは1つだけ選べます。|Choose only one here.|此处只能选择一项。
受け取りました|Claimed|已领取
取らずに進む|Continue Without Taking|不领取并继续
受け取らずに進む|Continue Without Claiming|不领取并继续
カードを取らずに進む|Continue Without a Card|不拿卡牌并继续
このカードを獲得|Take This Card|获得此卡牌
旅の技を学ぶ|Learn a New Art|学习旅途技艺
力には代償がある。|Power Has a Price.|力量需要代价。
旅のお守りを選ぶ|Choose a Journey Charm|选择旅途护身符
カードを取らず小さなデッキで進むのも戦略です。|Keeping a small deck by skipping cards is a valid strategy.|放弃卡牌、保持精简牌组也是一种策略。
選ばなかった候補は同じ種類の未所持レリックが一巡するまで出現しません。|Unchosen offers return only after all unowned relics of that tier have been offered.|未选的候选需等该类型所有未持有遗物轮换一遍后才会再次出现。
この種類のレリックはすべて所持しています。|You own every relic of this tier.|你已持有此类型的全部遗物。
通常レリック / 所持で永続発動|Normal relic / Passive while owned|普通遗物／持有时持续生效
所持している間、自動的に効果が適用されます。|Applies automatically while owned.|持有时自动生效。
所持している間、恩恵と代償の両方が自動で適用されます。|Both benefit and drawback apply automatically while owned.|持有时恩惠与代价均自动生效。
この店のレリックは売り切れです。|This shop has sold out of relics.|此商店的遗物已售罄。
夜道の行商人|Nightroad Merchant|夜路行商
灯のある店|Lamplit Shop|灯火商店
買い物を終える|Finish Shopping|结束购物
カード除去|Remove a Card|移除卡牌
キャンセルしても費用はかかりません。|Canceling costs nothing.|取消无需支付费用。
重荷を降ろす|Lighten the Load|卸下重担
除去せずに進む|Continue Without Removing|不移除并继续
灯を囲む焚き火|Campfire by the Lantern|围灯篝火
薪の音が夜の静けさにほどける。|Crackling wood softens the silence of the night.|薪火噼啪声融入夜的寂静。
休む|Rest|休息
灯油を精製|Refine Fuel|提炼灯油
戦闘不能者はHP18で復帰|Fallen travelers revive with 18 HP.|倒下者以18 HP复活。
地図に戻る|Return to Map|返回地图
戦闘に戻る|Return to Battle|返回战斗
旅へ戻る|Return to Journey|返回旅程
進む道を選ぶ|Choose Your Path|选择道路
地図を広げる|Open Map|展开地图
先へ進む|Continue|继续前进
先を確かめる|Investigate|查看前方
遠回りで避ける|Take a Safe Detour|绕路避开
灯油を追加で8消費して安全に進む。|Spend 8 extra fuel to pass safely.|额外消耗8灯油安全通过。
霧の向こうに何があるのか、まだ分からない。|What waits beyond the mist is still unknown.|迷雾彼端有何物，仍是未知。
巡礼の祭壇|Pilgrim Shrine|巡礼祭坛
命を捧げ、遺物を求める|Offer Life for a Relic|献出生命求取遗物
銀貨35で浄める|Purify for 35 Silver|支付35银币净化
祈りだけを残して進む|Leave Only a Prayer|留下祈祷后前行
巡礼の地図|Pilgrimage Map|巡礼地图
巡礼の出発点|Pilgrimage Departure|巡礼起点
巡礼の記録|Pilgrimage Journal|巡礼记录
これまでの旅を読む|Read the Journey So Far|阅读旅程记录
序幕を読み返す|Read the Prologue Again|重读序幕
夜明けの物語をもう一度|Revisit the Story of Dawn|重温黎明故事
物語をスキップ|Skip Story|跳过故事
前の絵へ|Previous Scene|上一幕
次の絵へ|Next Scene|下一幕
道へ進む|Take the Road|踏上道路
自分のペースで読めます。PC：← → / Enter・Escでスキップ。途中のページも自動保存。|Read at your own pace. PC: ← → to turn pages; Enter or Esc to skip. Each page autosaves.|可按自己的节奏阅读。电脑：← →翻页，Enter或Esc跳过。每页自动保存。
練習を終えて戻る|Finish Practice & Return|结束练习并返回
本編へ戻る ×|Return to Journey ×|返回正式旅程×
練習モード · 本編のデータは保持されています|Practice Mode · Your journey is preserved|练习模式・正式旅程数据已保留
戦い方を練習する|Practice Battle|练习战斗
ガイドを終了|End Guide|结束引导
カードを使ってみる|Try Playing a Card|尝试使用卡牌
自分の戦略で進む|Continue with Your Strategy|按自己的策略前进
敵の次の行動を確認|Check the Enemy's Next Action|查看敌人的下一行动
敵の予告を読もう|Read Enemy Intent|阅读敌方预告
攻撃カードを敵へ|Play an Attack on an Enemy|对敌人使用攻击卡
守り・回復も組み合わせる|Combine Defense and Healing|结合防守与治疗
準備ができたらターンを終える|End Your Turn When Ready|准备好后结束回合
連携、成功！|Link Complete!|联携成功！
三人の連携！|Caravan Link!|三人联携！
三人の連携|Caravan Link|三人联携
仲間が3人そろうと解放|Unlocked with 3 travelers|3位旅人到齐后解锁
敵のターン|Enemy Turn|敌方回合
予告された行動を実行|Resolving announced actions|执行预告行动
あなたの行動|Your Actions|你的行动
あなたのターンです。|Your turn.|轮到你了。
戦闘に勝利しました。|Battle won.|战斗胜利。
戦闘が終了しました。|Battle ended.|战斗结束。
手札なし。ターンを終えると新しいカードを引きます。|No cards in hand. End your turn to draw new cards.|没有手牌。结束回合即可抽取新卡。
気力が足りません。ターンを終えると回復します。|Not enough energy. End your turn to replenish it.|能量不足。结束回合即可恢复。
手札を使い切りました。ターンを終えて補充しましょう。|Your hand is empty. End your turn to refill it.|手牌已用尽。结束回合补充手牌。
敵の行動を見守りましょう。|Wait for the enemies to finish acting.|等待敌方行动结束。
カードを選んで対象をタップ ／ 対象へドラッグ|Choose a card, then tap a target / drag onto a target|选择卡牌再点击目标／拖至目标
クリック／タップ、または対象へドラッグ|Click / tap, or drag onto a target|点击／轻触，或拖至目标
発動する|Play Card|发动
解除 ×|Cancel ×|取消×
離して使う|Release to Play|松开发动
選択中|Selected|已选中
気力不足|Not Enough Energy|能量不足
銀貨・灯油不足|Not Enough Silver / Fuel|银币／灯油不足
戦闘不能|Fallen|无法战斗
選択後に発動|Select, then Play|选择后发动
敵を選ぶ|Choose an Enemy|选择敌人
仲間を選ぶ|Choose a Traveler|选择同伴
敵と仲間を選ぶ|Choose Enemy & Ally|选择敌人与同伴
敵と仲間を1人ずつ選択|Choose 1 enemy and 1 ally|各选择1名敌人与同伴
緑の枠の仲間を選択／ドロップ|Select / drop on a green ally|选择／拖至绿框同伴
赤い枠の敵を選択／ドロップ|Select / drop on a red enemy|选择／拖至红框敌人
発動ボタン、または戦場へドロップ|Press Play, or drop onto the battlefield|按发动按钮，或拖至战场
使う相手|Target|使用目标
効果を付与|Apply Effect|施加效果
撃破できる|Lethal|可击倒
撃破|Defeated|已击倒
盾で防げる|Blocked by Shield|可用护盾抵挡
狙われていない|Not Targeted|未被瞄准
攻撃後|After Attack|攻击后
敵の情報|Enemy Information|敌人信息
次の行動：|Next Action: |下一行动：
行動候補：|Possible Actions: |行动候选：
ボスは足止めされても行動しますがその回の威力は半減します。|Stunned bosses still act, but their action's power is halved.|首领被定身后仍会行动，但该次行动的威力减半。
先制殲滅！|First-Turn Victory!|先发歼灭！
戦いに勝利|Battle Won|战斗胜利
敵が動く前に1ターンで倒し切りました。|You won in one turn, before the enemies could act.|你在敌人行动前，于1回合内击败了全体敌人。
次の旅に備え、カードを1枚選びましょう。|Choose a card for the journey ahead.|选择1张卡牌，为接下来的旅程做好准备。
そして朝が来た。|And Morning Came.|于是，清晨到来。
この旅はここまで。|This Journey Ends Here.|此程到此为止。
仲間が全員倒れ、灯は消えてしまいました。|All travelers have fallen. The lantern has gone out.|所有同伴都已倒下，灯火熄灭了。
覚えた戦略を持ってもう一度旅立ちましょう。|Set out again with the strategies you have learned.|带着学到的策略，再次出发吧。
この隊商でエンドレスへ|Continue into Endless with This Caravan|带此商队进入无尽模式
夜はさらに深くなる。|The Night Grows Deeper.|夜色愈发深沉。
旅の時間|Journey Time|旅程时间
到達ステージ|Stage Reached|到达关卡
勝利した戦闘|Battles Won|获胜战斗
所持する遺物|Owned Relics|持有遗物
途中のデッキ・強化・山札も含めて保存|Saves include your deck, upgrades and draw pile.|存档包含当前牌组、强化与抽牌堆。
引いた順|Draw Order|抽取顺序
入手順|Acquisition Order|获得顺序
コスト順|Energy Cost|费用顺序
使用キャラ順|Traveler Order|使用者顺序
名前順|Name|名称顺序
強化段階順|Upgrade Level|强化等级
手札の表示方法|Hand Layout|手牌显示方式
一覧表示|Grid View|网格显示
横並び|Card Row|横向排列
ホイールでも移動|Scroll wheel supported|也可用滚轮移动
左の手札へ|Scroll Hand Left|向左滚动手牌
右の手札へ|Scroll Hand Right|向右滚动手牌
`));
registerTranslations(rows(`
敵の盾を先にすべて破壊|Destroy all of the enemy's Shield first.|先摧毁敌人的全部护盾。
敵の盾を無視する|Ignore the enemy's Shield.|无视敌人的护盾。
敵の単体攻撃を使用者に向ける|Redirect enemy single-target attacks to the user.|将敌方单体攻击转向使用者。
対象の毒・脆弱を取り除く|Remove Poison and Vulnerable from the target.|移除目标的中毒与易伤。
全員の毒・脆弱を取り除く|Remove Poison and Vulnerable from all allies.|移除全员的中毒与易伤。
使用者の毒・脆弱を取り除く|Remove Poison and Vulnerable from the user.|移除使用者的中毒与易伤。
戦闘不能の仲間にも使える|Can target fallen allies to revive them.|可对倒下的同伴使用并使其复活。
先に敵の毒をすべて消費しその数ぶんダメージ|Consume all enemy Poison first and deal that much damage.|先消耗敌人的全部中毒，造成等量伤害。
特殊：山札の一番下・デッキ全体で1枚まで|Special: drawn last. Only 1 Special card in the entire deck.|特殊：置于抽牌堆底部。整个牌组最多持有1张特殊卡。
効果なし。使うと戦闘中の山札から消える|No effect. Playing it removes it for the rest of this battle.|无效果。使用后本场战斗中不再抽到。
消滅：この戦闘では再使用不可|Exhaust: cannot be reused this battle.|消耗：本场战斗不可再次使用。
合計6以上で2枚、それ以外は1枚追加で引く|Draw 2 extra cards if the total is at least 6; otherwise draw 1.|点数总和至少为6时额外抽2张，否则抽1张。
足止め：行動しない|Stunned: skips action|定身：跳过行动
増援1体 / 次ターンから行動|Summon 1 reinforcement / acts next turn|召唤1名增援／下回合开始行动
増援を呼ぶ|Summon Reinforcement|召唤增援
味方を防御|Guard Ally|保护友方
自己回復|Self Heal|自身治疗
全体回復|Party Heal|群体治疗
全員に脆弱|Vulnerable to All|全员易伤
妨害カード|Hindrance Card|干扰卡
山札を崩す|Disrupt Draw Pile|扰乱抽牌堆
敵全員を強化|Empower All Enemies|强化全体敌人
銀貨と気力を奪う|Steal Silver & Energy|夺取银币与能量
毒と手札減少|Poison & Reduced Draw|中毒与减少抽牌
毒攻撃|Poison Attack|毒攻击
強打|Heavy Attack|重击
連撃|Multi-Hit|连击
全体攻撃|Area Attack|群体攻击
防御|Guard|防御
魔物との戦い|Battle with Monsters|对抗魔物
強敵に挑む|Challenge an Elite|挑战精英
焚き火で野営|Camp by the Fire|篝火野营
道中の出来事|Roadside Event|途中事件
行商人の店|Merchant's Shop|行商店铺
章の主との決戦|Sovereign Battle|领主决战
未知の道|Unknown Path|未知道路
忘れられた宝箱|Forgotten Chest|被遗忘的宝箱
古道の鍛冶場|Old Road Forge|古道锻冶场
旅人の野営|Traveler Camp|旅人营地
全ルートが合流する中間地点。5つの恩恵から1つ選ぶ。|A midpoint where all paths meet. Choose 1 of 5 blessings.|所有路线汇合的中途地点。从5项恩惠中选择1项。
章が進むほど強くなる敵。後半は強敵化することも。|Enemies grow stronger in later chapters and may become elites.|敌人随章节推进而变强，后期可能变为精英。
危険な戦い。勝利後は通常レリック3択。|A dangerous battle. Victory offers a choice of 3 normal relics.|危险的战斗。获胜后可从3件普通遗物中选1件。
HP回復・3段階の分岐強化・灯油補給から1つ。|Choose healing, a card upgrade (up to 3 levels), or fuel.|选择恢复HP、卡牌强化（最多3级）或补充灯油。
選択が旅を変える。後半ほど不運に注意。|Choices change your journey. Misfortune grows likelier later.|选择会改变旅程。后期要格外小心厄运。
カード・通常レリック・高額のカード強化。|Cards, normal relics and costly card upgrades.|出售卡牌、普通遗物与高价卡牌强化。
このランのボスを倒し尖ったボスレリックを選ぶ。|Defeat the sovereign and choose a powerful boss relic with a drawback.|击败本次首领，选择具有强大恩惠与代价的首领遗物。
幸運も災難も。章が進むほど悪い結果が増える。|Fortune or disaster. Bad outcomes grow likelier in later chapters.|可能幸运，也可能遭灾。章节越后，坏结果越多。
銀貨・灯油・回復薬が残されている。|Silver, fuel and healing potions await.|里面留有银币、灯油与治疗药水。
命を代価に遺物を求めるか、銀貨で傷を癒す。|Offer life for a relic, or pay silver to heal.|献出生命求取遗物，或支付银币治愈伤口。
銀貨35でカードを1回強化。最大3段階まで。|Upgrade 1 card for 35 silver, up to 3 levels.|花费35银币强化1张卡，最多3级。
新しい仲間を迎え、得意技とパッシブを入れ替える。|Recruit a traveler to change your party's cards and passives.|招募新同伴，调整专长卡牌与被动能力。
頭上の予告はターンを終えるまで実行されません。攻撃だけでなく毒・回復・手札への妨害もあります。|Enemy intents resolve after you end your turn. They include attacks, Poison, healing and hand disruption.|头顶的预告会在你结束回合后执行。除了攻击，还有中毒、治疗与手牌干扰。
「灯火の一閃」を選んで敵をタップ、またはカードを敵までドラッグして離します。左上は使う気力です。|Select Lantern Slash, then tap an enemy, or drag the card onto it. The top-left number is its energy cost.|选择「灯火一闪」后点击敌人，或将卡牌拖至敌人后松开。左上角数字是能量费用。
「揺るがぬ盾」を仲間へドラッグ、または選んで仲間をタップ。対象の外で離すとキャンセル。盾は次の自分のターンに消えます。|Drag Unyielding Shield onto an ally, or select it and tap an ally. Release outside a target to cancel. Shield expires at the start of your next turn.|将「坚定之盾」拖至同伴，或选卡后点击同伴。在目标外松开可取消。护盾在你的下回合开始时消失。
「星屑の矢」「火花の小瓶」も使いましょう。三人全員が行動すると連携が発動します。|Try Stardust Arrow and Spark Vial too. A Link activates when all 3 travelers act.|也试试「星屑之箭」和「火花小瓶」。3位旅人全部行动后会触发联携。
全員に盾6と、気力1を獲得しました。準備ができたらターンを終えましょう。|Everyone gained 6 Shield, and you gained 1 Energy. End your turn when ready.|全员获得6护盾，你获得1能量。准备好后结束回合吧。
毎ターン基本は気力4・手札6枚。敵を全員倒せば勝利。最初のターンに倒し切ると先制殲滅ボーナスもあります。|Each turn starts with 4 Energy and 6 cards. Defeat all enemies to win. Win on the first turn for a bonus.|每回合基础为4能量与6张手牌。击败全体敌人即可获胜。首回合全灭敌人还有额外奖励。
最初は1人。攻撃・防御・回復を固有カードで組み合わせます。後で仲間が加入します。|You start alone. Combine attacks, defense and healing with your unique cards. More travelers join later.|开局只有1人。用专属卡组合攻击、防御与治疗。之后会有同伴加入。
カードを選んで敵をタップ、または敵までドラッグして離します。|Select a card and tap an enemy, or drag it onto the enemy and release.|选择卡牌后点击敌人，或拖至敌人后松开。
盾や回復カードを使いましょう。自分への効果や全体効果は戦場へのドロップでも使えます。|Use Shield and healing cards. Self and area effects can also be played by dropping onto the battlefield.|使用护盾或治疗卡。自身效果与全体效果也可拖至战场发动。
敵は予告どおりに行動します。次のターンには気力と手札が補充されます。|Enemies perform their announced actions. Your energy and hand refill next turn.|敌人按预告行动。下回合会补充能量与手牌。
① 攻撃カード → 敵を選ぶ|① Attack card → Choose enemy|①攻击卡 → 选择敌人
② 盾カード → 仲間を選ぶ|② Shield card → Choose ally|②护盾卡 → 选择同伴
③ 三人それぞれのカードを使う|③ Play a card from each traveler|③分别使用3位旅人的卡牌
新しい手札で次の一手を|A Fresh Hand, a New Plan|用新手牌谋划下一步
`));
// Templates consume a whole meaningful clause before the vocabulary pass.
const rules=[];
function rule(pattern,en,zh){rules.push([pattern,en,zh]);}
rule(/敵1体に\s*([\d.〜]+)\s*ダメージ/g,(_,n)=>`Deal ${n} damage to 1 enemy`,(_,n)=>`对1名敌人造成${n}伤害`);
rule(/敵全員に\s*([\d.〜]+)\s*ダメージ/g,(_,n)=>`Deal ${n} damage to all enemies`,(_,n)=>`对全体敌人造成${n}伤害`);
rule(/全員に\s*([\d.]+)\s*ダメージ/g,(_,n)=>`Deal ${n} damage to all allies`,(_,n)=>`对全体同伴造成${n}伤害`);
const targets={'選んだ仲間':'chosen ally','仲間全員':'all allies','仲間1人':'1 ally','自分':'self','敵全員':'all enemies','使用者':'user','全員':'all allies','対象':'target'};
const targetsZH={'選んだ仲間':'所选同伴','仲間全員':'全体同伴','仲間1人':'1名同伴','自分':'自身','敵全員':'全体敌人','使用者':'使用者','全員':'全员','対象':'目标'};
const statEN={'盾':'Shield','再生':'Regen','毒':'Poison','足止め':'Stun','脆弱':'Vulnerable','反撃':'Thorns','闘志':'Might','弱点':'Exposed'};
const statZH={'盾':'护盾','再生':'再生','毒':'中毒','足止め':'定身','脆弱':'易伤','反撃':'反击','闘志':'斗志','弱点':'破绽'};
rule(/(選んだ仲間|仲間全員|仲間1人|自分|使用者|全員|対象)の\s*HP\s*を\s*([\d.〜]+)\s*回復/g,(_,who,n)=>`Restore ${n} HP to ${targets[who]}`,(_,who,n)=>`为${targetsZH[who]}恢复${n} HP`);
rule(/(選んだ仲間|仲間全員|仲間1人|敵全員|自分|使用者|全員|対象)に\s*(盾|再生|毒|脆弱|反撃|弱点)\s*([\d.〜]+)/g,(_,who,stat,n)=>`Apply ${n} ${statEN[stat]} to ${targets[who]}`,(_,who,stat,n)=>`给予${targetsZH[who]}${n}${statZH[stat]}`);
rule(/(仲間全員|仲間1人|自分|使用者)の闘志\s*\+(\d+)/g,(_,who,n)=>`${targets[who]}: Might +${n}`,(_,who,n)=>`${targetsZH[who]}斗志+${n}`);
rule(/毒\s*(\d+)\s*を付与/g,(_,n)=>`Apply ${n} Poison`,(_,n)=>`施加${n}中毒`);
rule(/弱点\s*(\d+)回\s*を付与/g,(_,n)=>`Apply ${n} Exposed`,(_,n)=>`施加${n}次破绽`);
rule(/敵の毒を\s*(\d+)倍\s*にする/g,(_,n)=>`Multiply enemy Poison by ${n}`,(_,n)=>`使敌人的中毒变为${n}倍`);
rule(/敵全員を\s*足止め\s*(\d+)回/g,(_,n)=>`Stun all enemies for ${n} actions`,(_,n)=>`使全体敌人定身${n}次`);
rule(/足止め\s*(\d+)回/g,(_,n)=>`Stun for ${n} actions`,(_,n)=>`定身${n}次`);
rule(/カードを\s*([\d.〜]+)枚\s*引く/g,(_,n)=>`Draw ${n} cards`,(_,n)=>`抽${n}张牌`);
rule(/敵に弱点があれば\s*(\d+)枚\s*引く/g,(_,n)=>`Draw ${n} cards if the enemy has Exposed`,(_,n)=>`若敌人有破绽则抽${n}张牌`);
rule(/敵HP半分以下なら威力\s*\+(\d+)/g,(_,n)=>`Damage +${n} if the enemy is at half HP or less`,(_,n)=>`敌人HP不超过一半时伤害+${n}`);
rule(/自分HP半分以下なら威力\s*\+(\d+)/g,(_,n)=>`Damage +${n} if the user is at half HP or less`,(_,n)=>`自身HP不超过一半时伤害+${n}`);
rule(/銀貨\s*(\d+)枚を消費/g,(_,n)=>`Spend ${n} silver`,(_,n)=>`消耗${n}银币`);
rule(/銀貨\s*(\d+)枚を得る/g,(_,n)=>`Gain ${n} silver`,(_,n)=>`获得${n}银币`);
rule(/所持銀貨(\d+)枚ごとに威力\+1（最大\+30・現在の威力に反映）/g,(_,n)=>`Damage +1 per ${n} silver held (max +30; included in displayed damage)`,(_,n)=>`每持有${n}银币，伤害+1（最多+30，已计入当前伤害）`);
rule(/灯油\s*(\d+)を消費/g,(_,n)=>`Spend ${n} fuel`,(_,n)=>`消耗${n}灯油`);
rule(/出目合計×(\d+(?:\.\d+)?)の追加ダメージ/g,(_,n)=>`extra damage equal to total roll ×${n}`,(_,n)=>`额外伤害为点数总和×${n}`);
rule(/出目合計×(\d+(?:\.\d+)?)の追加回復/g,(_,n)=>`extra healing equal to total roll ×${n}`,(_,n)=>`额外恢复量为点数总和×${n}`);
rule(/出目合計×(\d+(?:\.\d+)?)の追加の盾/g,(_,n)=>`extra Shield equal to total roll ×${n}`,(_,n)=>`额外护盾为点数总和×${n}`);
rule(/サイコロ(\d+)個：/g,(_,n)=>`${n} dice: `,(_,n)=>`${n}枚骰子：`);
const scales={'使用者の盾':"the user's Shield",'消滅した枚数':'cards exhausted','残り灯油':'remaining fuel','他の手札枚数':'other cards in hand','仲間全員の負傷':'total missing ally HP','捨札枚数':'discard pile size','このターンの使用枚数':'cards played this turn','行動した旅人数':'travelers who acted','戦闘不能の仲間数':'fallen allies','このカードの強化回数':"this card's upgrade count",'使用者の反撃':"the user's Thorns"};
const scalesZH=['使用者的护盾','已消耗卡牌数量','剩余灯油','其他手牌数量','同伴损失的总HP','弃牌数量','本回合出牌数量','已行动旅人数','倒下同伴数量','此卡强化次数','使用者的反击'];
Object.entries(scales).forEach(([ja,en],i)=>rule(new RegExp(ja+'に応じて威力上昇（現在の威力に反映）','g'),()=>`Damage scales with ${en} (included in displayed damage)`,()=>`伤害随${scalesZH[i]}提升（已计入当前伤害）`));
rule(/素材の効果を順に発動（合計気力(\d+)）/g,(_,n)=>`Resolve material effects in order (total energy ${n})`,(_,n)=>`按顺序发动素材效果（总费用${n}）`);
rule(/山札に焦燥\s*(\d+)枚/g,(_,n)=>`Add ${n} Agitation cards to draw pile`,(_,n)=>`向抽牌堆加入${n}张焦躁`);
rule(/山札(\d+)枚を捨て次の手札-1/g,(_,n)=>`Discard ${n} cards from draw pile; draw 1 fewer next turn`,(_,n)=>`弃掉抽牌堆${n}张牌，下回合抽牌-1`);
rule(/第(\d+)ステージ/g,(_,n)=>`Stage ${n}`,(_,n)=>`第${n}关`);
rule(/第(\d+)章/g,(_,n)=>`Chapter ${n}`,(_,n)=>`第${n}章`);
rule(/(\d+)地点目/g,(_,n)=>`Location ${n}`,(_,n)=>`第${n}地点`);
rule(/(\d+)枚のカード/g,(_,n)=>`${n} cards`,(_,n)=>`${n}张卡牌`);
rule(/手動記録\s*(\d+)/g,(_,n)=>`Manual Save ${n}`,(_,n)=>`手动存档${n}`);
rule(/あなたのターン\s*(\d+)/g,(_,n)=>`Your Turn ${n}`,(_,n)=>`你的回合${n}`);
rule(/(\d+)枚/g,(_,n)=>`${n} cards`,(_,n)=>`${n}张`);
rule(/(\d+)個/g,(_,n)=>`${n}`,(_,n)=>`${n}个`);
rule(/(\d+)回/g,(_,n)=>`${n} times`,(_,n)=>`${n}次`);
registerTranslations(rows(`
次ターンの気力|Next turn's Energy|下回合能量
次ターンの手札|Next turn's Draw|下回合抽牌
次の気力|Next turn's Energy|下回合能量
次の手札|Next turn's Draw|下回合抽牌
使用者のHP|User HP|使用者HP
敵の攻撃力|Enemy Attack|敌方攻击力
最大HP|Max HP|最大HP
基礎HP|Base HP|基础HP
消費気力|Energy Cost|能量费用
気力|Energy|能量
ダメージ|damage|伤害
回復薬|Healing Potion|治疗药水
灯油|Fuel|灯油
銀貨|Silver|银币
盾|Shield|护盾
闘志|Might|斗志
弱点|Exposed|破绽
脆弱|Vulnerable|易伤
足止め|Stun|定身
再生|Regen|再生
反撃|Thorns|反击
毒|Poison|中毒
攻撃力|Attack Power|攻击力
威力|Power|威力
攻撃|Attack|攻击
守備|Defense|防守
回復|Healing|治疗
策略|Skill|策略
妨害|Hindrance|干扰
固有能力|Passive Ability|固有能力
専用カード|Unique Cards|专属卡牌
固有カード|Unique Cards|专属卡牌
特殊カード|Special Card|特殊卡牌
特殊|Special|特殊
希少・強化済み|Rare · Upgraded|稀有・已强化
強化済み|Upgraded|已强化
希少強化|Rare Upgrade|稀有强化
ランダム強化|Random Upgrade|随机强化
カード合成|Card Fusion|卡牌合成
強化|Upgrade|强化
除去|Remove|移除
消滅|Exhaust|消耗
カード|Card|卡牌
手札|Hand|手牌
山札|Draw Pile|抽牌堆
捨札|Discard Pile|弃牌堆
戦闘|Battle|战斗
強敵化！|Elite Encounter!|精英化！
強敵|Elite|精英
章の主|Sovereign|领主
出来事|Event|事件
野営地|Camp|营地
商店|Shop|商店
ショップ|Shop|商店
未知|Unknown|未知
宝箱|Treasure|宝箱
祭壇|Shrine|祭坛
鍛冶|Forge|锻冶
祝福の宿場|Blessing Waystation|祝福驿站
祝福|Blessing|祝福
旅人|Traveler|旅人
仲間全員|All Allies|全体同伴
敵全員|All Enemies|全体敌人
全員|Everyone|全员
仲間|Ally|同伴
ターン|Turn|回合
日目|Day|日
ステージ|Stage|关卡
地点|Location|地点
恩恵|Blessing|恩惠
段階目|Upgrade Level|级强化
代償あり|Has Drawback|附带代价
二重の祝福|Double Blessing|双重祝福
所持|Owned|持有
合成後|After Fusion|合成后
強化後|After Upgrade|强化后
現在|Current|当前
役割|Role|职责
並び順|Sort Order|排序
一覧|List|列表
詳細|Details|详情
料金|Price|费用
次の旅路への支度|Prepare for the Road Ahead|准备下一段旅程
夜深き旅|Deep Night Journey|深夜之旅
進路|Route|路线
予測|Forecast|预测
攻撃予告の見方|How to Read Intent|如何阅读行动预告
運命の賽|Dice of Fate|命运之骰
出目合計|Roll Total|点数总和
サイコロの結果|Dice Results|骰子结果
生存者|Surviving Allies|存活同伴
残り|Remaining|剩余
獲得済み|Acquired|已获得
パーセント| percent|％
鍛錬|Training|锻炼
技巧|Technique|技巧
過充填|Overcharge|过载
軽量化|Lightweight|轻量化
薄明の循環|Twilight Cycle|薄暮循环
残響|Echo|回响
複写|Copy|复制
血誓|Blood Oath|血誓
前借り|Borrowed Time|预支
叡智|Wisdom|睿智
解放|Unbound|解放
秘封|Secret Seal|秘封
闘気|Fighting Spirit|斗气
守護紋|Guardian Sigil|守护纹
奮起の呪印|Rousing Curse|奋起咒印
瘴気|Miasma|瘴气
毒刻|Venom Mark|毒刻
茨の加護|Thorn Blessing|荆棘加护
看破|Insight|看破
穿孔|Puncture|穿孔
再生の符|Regen Talisman|再生符
封縛陣|Binding Circle|封缚阵
封縛|Binding|封缚
清澄|Clarity|澄澈
清祓い|Cleansing|清祓
狂熱|Fervor|狂热
蛇の契約|Serpent Pact|蛇之契约
呪縛の緩和|Curse Relief|咒缚缓解
代償の緩和|Price Relief|代价缓解
負担の解消|Burden Relief|负担消解
損耗の修復|Wear Repair|损耗修复
`));
function normalizedLanguage(lang){return lang==='zh'||lang==='zh-Hans'||lang==='zh-CN'?'zh-CN':lang==='en'?'en':lang==='ko'?'ko':'ja'}
function translationRegex(lang){if(!termsCache[lang]){const keys=[...dictionaries[lang].keys()].sort((a,b)=>b.length-a.length);termsCache[lang]=new RegExp(keys.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g')}return termsCache[lang]}
export function translateText(text,language='ja'){
 if(text==null)return text;const lang=normalizedLanguage(language);if(lang==='ja'||typeof text!=='string'||!text)return text;
 const key=lang+'\0'+text;if(cache.has(key))return cache.get(key);
 const leading=text.match(/^\s*/)[0],trailing=text.match(/\s*$/)[0],trimmed=text.trim(),dictionary=dictionaries[lang];
 let result=dictionary.get(trimmed);
 if(result===undefined)result=fromTemplate(trimmed,lang);
 if(result===undefined)result=normalized[lang]?.get(normKey(trimmed));
 // 韓国語は未訳の文を英語で補う
 if(result===undefined&&lang==='ko'){const en=translateText(text,'en');cache.set(key,en);return en}
 // 文ごと（。改行 全角スペース区切り）に訳せるなら訳す
 if(result===undefined&&/[。\n\u3000]/.test(trimmed)){const parts=trimmed.split(/([。\n\u3000]+)/);if(parts.length>1){const out=parts.map((part,i)=>i%2?(lang==='en'?(part.includes('\n')?'\n':'. '):part.includes('\n')?'\n':'。'):part?translateText(part,lang):part).join('');if(!/[ぁ-んァ-ヶ]/.test(out))result=out}}
 if(result!==undefined)return leading+result+trailing;
 result=text;
 for(const [pattern,en,zh]of rules)result=result.replace(pattern,lang==='en'?en:zh);
 result=result.replace(translationRegex(lang),match=>dictionary.get(match));
 if(lang==='en')result=result.replace(/([a-z])([A-Z][a-z])/g,'$1 $2').replace(/。/g,'. ').replace(/、/g,', ').replace(/：/g,': ').replace(/（/g,' (').replace(/）/g,')').replace(/「/g,'“').replace(/」/g,'”');
 if(cache.size>12000)cache.clear();cache.set(key,result);return result;
}
/** Translates text and accessible labels without touching handlers, IDs, values, or gameplay data. */
export function translateHTML(html,language='ja'){
 if(normalizedLanguage(language)==='ja'||typeof document==='undefined')return html;
 const template=document.createElement('div');template.innerHTML=html;
 const walker=document.createTreeWalker(template,NodeFilter.SHOW_TEXT);let node;
 while((node=walker.nextNode()))if(!['SCRIPT','STYLE'].includes(node.parentElement?.tagName))node.nodeValue=translateText(node.nodeValue,language);
 for(const el of template.querySelectorAll('*'))for(const attr of ['title','aria-label','aria-valuetext','placeholder','alt'])if(el.hasAttribute(attr))el.setAttribute(attr,translateText(el.getAttribute(attr),language));
 return template.innerHTML;
}
export function localizedEntity(entity,language='ja'){return {...entity,...Object.fromEntries(['name','job','passive','desc','drawback','ability'].filter(k=>typeof entity[k]==='string').map(k=>[k,translateText(entity[k],language)]))}}
// Parameterized relic prose is expanded to exact phrases from the live catalog.
const numberTemplates=rows(`
Nコストのカードを使うたびにランダムな敵にNダメージ|Whenever you play a {1}-cost card, deal {2} damage to a random enemy|每次使用{1}费用卡牌时，对随机敌人造成{2}伤害
Nコストの攻撃カードの威力+N|{1}-cost attack cards deal +{2} damage|{1}费用攻击卡伤害+{2}
すべての敵の攻撃力+N|All enemies gain +{1} Attack|全体敌人攻击力+{1}
そのターンN枚目以降の攻撃の威力+N|Attack damage +{2} from the {1}th card played each turn|每回合第{1}张及之后的攻击伤害+{2}
カードで付与する毒+N|Cards apply +{1} Poison|卡牌施加的中毒+{1}
カードで得る盾+N|Cards grant +{1} Shield|卡牌提供的护盾+{1}
カードによるHP回復量+N|Cards restore +{1} HP|卡牌的HP恢复量+{1}
カードの全体HP回復量+N|Area healing cards restore +{1} HP|群体治疗卡的HP恢复量+{1}
カードの全体攻撃威力+N|Area attack damage +{1}|卡牌群体攻击伤害+{1}
カードの攻撃威力+N%|Card attack damage +{1}%|卡牌攻击伤害+{1}%
カードの攻撃威力+N|Card attack damage +{1}|卡牌攻击伤害+{1}
カード・生存者への回復薬のHP回復量-N%（端数切捨て）|Card and potion healing on living allies is reduced by {1}% (rounded down)|卡牌与药水对存活同伴的HP恢复量减少{1}%（向下取整）
カード強化時に生存者全員のHPをN回復|Upgrading a card restores {1} HP to all living allies|强化卡牌时，为全体存活同伴恢复{1} HP
ショップのカード陳列数+N|Shops offer +{1} cards|商店卡牌陈列数量+{1}
ショップの価格がN%安くなる|Shop prices are {1}% lower|商店价格降低{1}%
ショップ価格の割引率+Nポイント（合計上限N%）|Shop discount +{1} percentage points (total cap {2}%)|商店折扣增加{1}个百分点（总上限{2}%）
ターン中N枚目以降に使うカードの攻撃威力+N|Attack damage +{2} from the {1}th card played each turn|每回合第{1}张及之后的卡牌攻击伤害+{2}
マス移動時に全員のHP-N|Everyone loses {1} HP when traveling to a location|移动到地点时全员HP-{1}
マス移動時に全員のHP-N|Everyone loses {1} HP when traveling to a location|移动到地点时全员HP-{1}
マス移動時の灯油消費+N|Travel fuel cost +{1}|移动灯油消耗+{1}
マス移動時の灯油消費+N（最低N）|Travel fuel cost +{1} (minimum {2})|移动灯油消耗+{1}（最低{2}）
マス移動時の灯油消費-N|Travel fuel cost -{1}|移动灯油消耗-{1}
マス移動時の灯油消費-N（最低N）|Travel fuel cost -{1} (minimum {2})|移动灯油消耗-{1}（最低{2}）
三人連携時に生存者全員のHPをN回復|Caravan Link restores {1} HP to all living allies|三人联携时为全体存活同伴恢复{1} HP
三人連携時に得る気力+N|Caravan Link grants +{1} Energy|三人联携提供的能量+{1}
三人連携時に得る盾+N|Caravan Link grants +{1} Shield|三人联携提供的护盾+{1}
今後の加入者にも最大HP加算|Future recruits also gain the Max HP bonus|之后加入的同伴也获得最大HP加成
付与する毒+N|Apply +{1} Poison|施加的中毒+{1}
仲間が受ける毒・脆弱の量-N|Allies receive {1} less Poison and Vulnerable|同伴受到的中毒与易伤层数-{1}
仲間の盾を最大N、次ターンに持ち越す|Carry over up to {1} ally Shield to the next turn|同伴最多保留{1}护盾至下回合
使わなかった気力を最大N、次ターンに持ち越す|Carry over up to {1} unused Energy to the next turn|最多保留{1}点剩余能量至下回合
全体回復カードの回復量+N|Area healing cards restore +{1} HP|群体治疗卡恢复量+{1}
全体攻撃の威力+N|Area attack damage +{1}|群体攻击伤害+{1}
全員の攻撃カードの威力+N|All travelers' attack cards deal +{1} damage|全员攻击卡伤害+{1}
取得時に全員の最大HP+N、HP+N|On pickup, everyone gains {1} Max HP and {2} HP|获得时，全员最大HP+{1}、HP+{2}
取得時に回復薬+N|On pickup, gain {1} healing potions|获得时，治疗药水+{1}
取得時に回復薬+N（所持上限N個）|On pickup, gain {1} healing potions (carry limit {2})|获得时，治疗药水+{1}（持有上限{2}瓶）
取得時に在籍者全員の最大HP+N、生存者のHP+N|On pickup, party Max HP +{1}; living allies restore {2} HP|获得时，全员最大HP+{1}，存活同伴HP+{2}
各戦闘で一度、被ダメージで倒れる仲間N人をHPNで復帰（最大HPまで）|Once per battle, revive {1} ally defeated by damage with {2} HP (up to Max HP)|每场战斗1次，使{1}名受到伤害而倒下的同伴以{2} HP复活（不超过最大HP）
各戦闘で一度だけ、倒れる仲間をHPNで復帰させる|Once per battle, revive a fallen ally with {1} HP|每场战斗1次，使倒下同伴以{1} HP复活
各戦闘のNの倍数ターンに手札+N|Draw {2} extra cards every {1} turns in each battle|每场战斗中每隔{1}回合，手牌+{2}
各戦闘の最初のターンに手札+N|Draw {1} extra cards on the first turn of each battle|每场战斗首回合手牌+{1}
各戦闘の最初のターンに気力+N|Gain +{1} Energy on the first turn of each battle|每场战斗首回合能量+{1}
各戦闘の最初のターンに生存者全員に盾N|All living allies gain {1} Shield on the first turn of each battle|每场战斗首回合全体存活同伴获得{1}护盾
回復カードによるHP回復ができない|Healing cards cannot restore HP|无法通过治疗卡恢复HP
回復カードの回復量+N|Healing cards restore +{1} HP|治疗卡恢复量+{1}
回復カードの回復量-N|Healing cards restore {1} less HP|治疗卡恢复量-{1}
回復カード・回復薬による回復量が半分|Healing cards and potions restore half as much HP|治疗卡与治疗药水恢复量减半
回復薬の回復量+N|Healing potions restore +{1} HP|治疗药水恢复量+{1}
弱点のある敵へのダメージがさらに+N|Deal +{1} extra damage to enemies with Exposed|对带有破绽的敌人额外伤害+{1}
弱点を消費して与えるダメージが追加で+N|Damage that consumes Exposed gains +{1} damage|消耗破绽时造成的伤害额外+{1}
強化済みカードの消費気力-N|Upgraded cards cost {1} less Energy|已强化卡牌能量费用-{1}
強化済みカードの消費気力-N（最低N）|Upgraded cards cost {1} less Energy (minimum {2})|已强化卡牌能量费用-{1}（最低{2}）
強敵勝利時に生存者全員のHPを追加でN回復|Elite victories restore {1} extra HP to all living allies|战胜精英后全体存活同伴额外恢复{1} HP
強敵勝利時に銀貨+N|Elite victories grant {1} silver|战胜精英后获得{1}银币
強敵勝利時に銀貨+N・全員のHP+N|Elite victories grant {1} silver and restore {2} HP to everyone|战胜精英后银币+{1}，全员HP+{2}
強敵戦の基礎銀貨報酬+N|Base silver reward from elite battles +{1}|精英战基础银币奖励+{1}
戦闘で銀貨を得られなくなる|Battles no longer award silver|战斗不再提供银币
戦闘の基礎銀貨報酬+N|Base battle silver reward +{1}|战斗基础银币奖励+{1}
戦闘の銀貨報酬+N|Battle silver reward +{1}|战斗银币奖励+{1}
戦闘の銀貨報酬+N%|Battle silver reward +{1}%|战斗银币奖励+{1}%
戦闘の銀貨報酬がN%増える|Battle silver reward increases by {1}%|战斗银币奖励增加{1}%
戦闘の銀貨報酬がN倍|Battle silver rewards ×{1}|战斗银币奖励×{1}
戦闘勝利時に全員のHPをN回復|After battle victory, everyone restores {1} HP|战斗胜利后全员恢复{1} HP
戦闘勝利時に生存者全員のHPをN回復|After battle victory, all living allies restore {1} HP|战斗胜利后全体存活同伴恢复{1} HP
戦闘開始時に全員に盾N|Everyone starts each battle with {1} Shield|战斗开始时全员获得{1}护盾
戦闘開始時に敵全員に弱点N|Apply {1} Exposed to all enemies at battle start|战斗开始时全体敌人获得{1}破绽
攻撃カードの威力+N|Attack card damage +{1}|攻击卡伤害+{1}
攻撃カードの威力がN%増える|Attack card damage increases by {1}%|攻击卡伤害增加{1}%
攻撃カードの消費気力+N|Attack cards cost +{1} Energy|攻击卡能量费用+{1}
攻撃カードを使うたびにその仲間のHP-N|Each attack card played costs its user {1} HP|每次使用攻击卡，使用者HP-{1}
攻撃カード使用時に使用者のHP-N（盾を無視）|Playing an attack card costs the user {1} HP (ignores Shield)|使用攻击卡时使用者HP-{1}（无视护盾）
敵から受ける毒・脆弱の付与量-N（最低N）|Receive {1} less Poison and Vulnerable from enemies (minimum {2})|受到敌人施加的中毒与易伤层数-{1}（最低{2}）
敵の最大HP+N%|Enemy Max HP +{1}%|敌人最大HP+{1}%
敵の最大HPがN%増える|Enemy Max HP increases by {1}%|敌人最大HP增加{1}%
敵全員の攻撃力+N|All enemies gain +{1} Attack|全体敌人攻击力+{1}
最初のターンに手札+N|Draw {1} extra cards on the first turn|首回合手牌+{1}
未使用の気力を最大N、次ターンへ持ち越す|Carry over up to {1} unused Energy to the next turn|最多保留{1}剩余能量至下回合
未強化カードの消費気力+N|Unupgraded cards cost +{1} Energy|未强化卡牌能量费用+{1}
未知のマスで良い出来事が起きやすくなる|Good outcomes are more likely at unknown locations|未知地点更易发生好事
未知のマスの良い出来事の確率+Nポイント（上限N%）|Good outcome chance at unknown locations +{1} percentage points (cap {2}%)|未知地点好事概率+{1}个百分点（上限{2}%）
毎ターン生存者全員に盾N|All living allies gain {1} Shield each turn|每回合全体存活同伴获得{1}护盾
毎ターン生存者全員のHPをN回復|Restore {1} HP to all living allies each turn|每回合全体存活同伴恢复{1} HP
毎ターンの手札+N|Draw {1} extra cards each turn|每回合手牌+{1}
毎ターンの手札+N、最初の手札はさらに+N|Draw {1} extra cards each turn, plus {2} more on the first turn|每回合手牌+{1}，首回合再额外+{2}
毎ターンの手札+N（最低N枚）|Draw {1} extra cards each turn (minimum {2} cards)|每回合手牌+{1}（最低{2}张）
毎ターンの手札-N|Draw {1} fewer cards each turn|每回合手牌-{1}
毎ターンの手札-N（最低N枚）|Draw {1} fewer cards each turn (minimum {2} cards)|每回合手牌-{1}（最低{2}张）
毎ターンの気力+N|Energy +{1} each turn|每回合能量+{1}
毎ターンの気力+N（最低N）|Energy +{1} each turn (minimum {2})|每回合能量+{1}（最低{2}）
毎ターンの気力-N|Energy -{1} each turn|每回合能量-{1}
毎ターン全員に盾N|Everyone gains {1} Shield each turn|每回合全员获得{1}护盾
毎ターン最初に毒を付与するカードでN枚引く|Draw {1} cards after the first Poison-applying card each turn|每回合首次使用施加中毒的卡牌后抽{1}张牌
毎ターン最初に消滅カードを使うと気力+N|Gain {1} Energy after the first Exhaust card each turn|每回合首次使用消耗卡后能量+{1}
毎ターン最初のカードで使用者のHP-N|The first card each turn costs its user {1} HP|每回合首次出牌时使用者HP-{1}
毎ターン最初のカード使用時に使用者のHP-N（盾を無視）|The first card each turn costs its user {1} HP (ignores Shield)|每回合首次出牌时使用者HP-{1}（无视护盾）
毎ターン最初の毒付与・毒増幅カード使用時にN枚引く|Draw {1} cards after the first Poison-applying or multiplying card each turn|每回合首次使用施毒或增毒卡时抽{1}张牌
毎ターン最初の消滅カード使用時に気力+N|Gain {1} Energy after the first Exhaust card each turn|每回合首次使用消耗卡时能量+{1}
毎ターン最初の策略カードでN枚引く|Draw {1} cards after the first Skill each turn|每回合首次使用策略卡后抽{1}张牌
毎ターン最初の策略カード使用時にN枚引く|Draw {1} cards after the first Skill each turn|每回合首次使用策略卡时抽{1}张牌
気力Nでターンを終えると次の気力+N|End with {1} Energy to gain +{2} Energy next turn|以{1}能量结束回合时，下回合能量+{2}
気力Nでターンを終えると次ターンの気力+N|End with {1} Energy to gain +{2} Energy next turn|以{1}能量结束回合时，下回合能量+{2}
消費気力Nのカードの攻撃威力+N|{1}-cost cards deal +{2} attack damage|{1}费用卡牌攻击伤害+{2}
消費気力Nのカード使用時に生存中の敵N体にランダムでNダメージ|Playing a {1}-cost card deals {3} damage to {2} random living enemy|使用{1}费用卡牌时，对{2}名随机存活敌人造成{3}伤害
生存者への回復薬のHP回復量+N|Healing potions restore +{1} HP to living allies|药水对存活同伴的恢复量+{1}
盾を最大N、次ターンへ持ち越す|Carry over up to {1} Shield to the next turn|最多保留{1}护盾至下回合
章クリア時に生存者のHP回復量+N|Living allies restore {1} extra HP after clearing a chapter|通关章节时存活同伴额外恢复{1} HP
章クリア時のHP回復+N|Restore {1} extra HP after clearing a chapter|通关章节时HP恢复量+{1}
連携するたびに全員のHPをN回復|Each Link restores {1} HP to everyone|每次联携全员恢复{1} HP
連携で得る気力+N|Link grants +{1} Energy|联携提供的能量+{1}
連携で得る気力がさらに+N|Link grants +{1} extra Energy|联携额外提供{1}能量
連携で得る盾がさらに+N|Link grants +{1} extra Shield|联携额外提供{1}护盾
野営での灯油回復量+N|Restore {1} extra fuel at camps|营地灯油恢复量+{1}
野営で休むとHP回復+N|Resting at camp restores {1} extra HP|营地休息时HP恢复量+{1}
野営で休んでもHPが回復しない|Resting at camp does not restore HP|营地休息不恢复HP
野営の休息で生存者のHPが回復しない（倒れた仲間の復帰は可能）|Resting at camp does not heal living allies (fallen allies can still revive)|营地休息不恢复存活同伴的HP（仍可复活倒下者）
野営の休息による生存者のHP回復量+N|Resting at camp restores {1} extra HP to living allies|营地休息对存活同伴的HP恢复量+{1}
野営地での灯油回復+N|Restore {1} extra fuel at camps|营地灯油恢复量+{1}
`);
const numberPatterns=numberTemplates.map(([ja,en,zh])=>[new RegExp('^'+ja.split('N').map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('([0-9.]+)')+'$'),en,zh]);
function relicProse(text,lang){return text.split('。').filter(Boolean).map(clause=>{for(const [re,en,zh]of numberPatterns){const match=clause.match(re);if(match)return (lang==='en'?en:zh).replace(/\{(\d+)\}/g,(_,i)=>match[+i]);}return translateText(clause,lang)}).join(lang==='en'?'. ':'。')+(text.endsWith('。')?(lang==='en'?'.':'。'):'')}
for(const r of RELICS){
 if(r.enName||r.zhName)registerTranslations([[r.name,r.enName,r.zhName]]);
 for(const key of ['desc','drawback'])if(r[key])registerTranslations([[r[key],relicProse(r[key],'en'),relicProse(r[key],'zh-CN')]]);
}
registerTranslations(rows(`
アウロラ|Aurora|奥罗拉
黎明の継承者|Heir of Dawn|黎明继承者
毎ターン気力+1・自身に盾6。攻撃威力+6、回復量+4。|Each turn: +1 Energy and 6 Shield to self. Attack damage +6; healing +4.|每回合能量+1，自身获得6护盾。攻击伤害+6，恢复量+4。
無明の星骸|The Abyssal Convergence|无明星骸
星喰いの幼獣|Star-Eating Cub|噬星幼兽
虚空の祈祷師|Void Prayerkeeper|虚空祈祷师
鎖月の処刑人|Chainmoon Executioner|锁月刽子手
砕鐘の亡者|Broken-Bell Revenant|碎钟亡者
黒曜の狩人|Obsidian Hunter|黑曜猎人
灯裂きの巨兵|Lantern-Rending Colossus|裂灯巨兵
墓標の歌姫|Gravestone Songstress|墓碑歌姬
時蝕の織り手|Time-Eclipse Weaver|时蚀织者
無明の司書|Abyssal Librarian|无明图书管理员
逆光の聖骸|Backlit Holy Remains|逆光圣骸
凍星の傀儡|Frozen-Star Puppet|冻星傀儡
深淵の告解者|Abyssal Confessor|深渊告解者
封門の双剣卿|Twinblade Gate Lord|封门双剑卿
星紋の司令官|Starsigil Commander|星纹司令官
忌火の巡察者|Forbidden Flame Inspector|忌火巡察者
影喰らいの巨神|Shadow-Eating Titan|噬影巨神
白晶の女侯|White Crystal Marchioness|白晶女侯
腐花の庭主|Rotflower Gardener|腐花园主
砂冠の審判者|Sandcrowned Judge|沙冠审判者
鉄心の造物主|Ironheart Creator|铁心造物主
血潮の司祭|Bloodtide Priest|血潮祭司
禁書の守護者|Forbidden Book Guardian|禁书守护者
骸竜の巫女|Dragonbone Priestess|骸龙巫女
雷雲の騎王|Thundercloud Knight King|雷云骑王
虚鏡の皇女|Hollow Mirror Princess|虚镜皇女
星墓の葬送者|Stargrave Mourner|星墓送葬者
鐘律の聖王|Bellrhythm Holy King|钟律圣王
暁蝕の番人|Dawneclipse Keeper|晓蚀守卫
無明の星骸王|Abyssal Starbone King|无明星骸王
輪廻を裂く審判者|Cycle-Rending Judge|撕裂轮回的审判者
終末の灯喰らい|Doomsday Flame Eater|终末噬灯者
再生を交えて毒を重ねる。|Combines regeneration with stacking Poison.|结合再生叠加中毒。
硬い守りから強打を狙う。|Uses tough defenses to prepare heavy attacks.|以坚固防守伺机重击。
妨害と連撃で隙を突く。|Exploits openings with disruption and multi-hit attacks.|通过干扰和连击寻找破绽。
増援を2回まで呼ぶ。新たな敵は次のターンから行動。|Summons reinforcements up to 2 times. New enemies act from the next turn.|最多召唤2次增援。新敌人从下回合开始行动。
攻撃行動が2連撃。|Attack actions hit 2 times.|攻击行动为2连击。
攻撃行動は基本2連撃。|Attack actions normally hit 2 times.|攻击行动通常为2连击。
2回まで増援を呼ぶ。|Summons reinforcements up to 2 times.|最多召唤2次增援。
後半は3連撃。|Later bosses hit 3 times.|后期为3连击。
HP半分で攻撃力が上がる。|Attack rises at half HP.|HP降至一半时攻击力提升。
妨害と全体攻撃を使う。|Uses disruption and area attacks.|使用干扰与群体攻击。
2〜3連撃、増援、脆弱で隊商を追い詰める。|Pressures the caravan with 2–3 hits, reinforcements and Vulnerable.|以2至3连击、增援与易伤逼迫商队。
異界の特殊能力。3連撃と強力な妨害。|Otherworldly abilities: 3-hit attacks and powerful disruption.|异界特殊能力：3连击与强力干扰。
異界専用の王。4連撃、増援、再生、毎ターン盾。HP半分でさらに強化。|Otherworld sovereign: 4-hit attacks, reinforcements, regeneration and Shield each turn. Grows stronger at half HP.|异界领主：4连击、增援、再生与每回合护盾。HP降至一半时进一步强化。
世界が朝を忘れた。|The World Forgot Morning.|世界忘记了清晨。
鐘が最後に鳴った夜、太陽は戻らなかった。村の門に残されたのは消えない小さな灯がひとつ。|On the night the bell rang for the last time, the sun never returned. At the village gate, only one small, undying flame remained.|钟声最后响起的那一夜，太阳再也没有归来。村口只留下一盏小小的不灭灯火。
序幕 / 消えた朝|Prologue / The Lost Morning|序幕／消失的清晨
旅立ち / 最初の旅人|Departure / The First Traveler|启程／首位旅人
第一章 / ささやきの森|Chapter One / The Whispering Woods|第一章／低语森林
君の足跡が道になる。|Your Footsteps Become the Road.|你的足迹，将成为道路。
古い灯台へ続く巡礼路。その先に朝を取り戻す手がかりがある。道を選び、出会う仲間と灯をつないでいこう。|The pilgrim road leads to an old lighthouse, and a clue to restoring morning. Choose your path and carry the flame with the travelers you meet.|巡礼之路通向古老灯塔，那里有找回清晨的线索。选择道路，与途中相遇的同伴一起传递灯火。
「道が閉ざされているなら切り拓くまでさ。」灰刃を携え、一人の傭兵が夜へ踏み出す。|“If the road is closed, I'll cut one open.” Carrying her ashblade, a lone mercenary steps into the night.|「道路若被封住，就把它劈开。」一位佣兵携着灰刃，独自踏入长夜。
「星が隠れていても進む道は読める。」弓を背に射手は静かな夜へ踏み出す。|“Even when the stars are hidden, I can read the way.” Bow on her back, the archer steps into the quiet night.|「即使星辰隐藏，我也能读出前进的路。」射手背着弓，步入寂静的夜。
「まだ灯がある。それならできることもある。」薬の鞄を抱え、錬金術師は夜へ踏み出す。|“There's still a flame. That means there's still something I can do.” With a medicine bag in hand, the alchemist steps into the night.|「灯火还在，那就还有能做的事。」炼金术师抱起药袋，踏入长夜。
「この灯を朝まで運ぼう。」旅人は支度を整え、長い夜へ踏み出す。|“Let's carry this flame until morning.” The traveler prepares and steps into the long night.|「把这盏灯，送到清晨吧。」旅人整装完毕，踏入漫漫长夜。
ひとつ、夜を越えた。|One Night Behind Us.|又越过了一夜。
新たな道 / 次の章の主|A New Road / The Next Sovereign|新的道路／下一位领主
灯の行く先に待つもの。|What Waits Beyond the Flame.|灯火前方的等待者。
古い道の先にはその土地の夜を守る主がいるという。まだ見ぬ影を越えて灯を次の土地へ運ぼう。|They say a sovereign guards the night at the end of each old road. Overcome the unseen shadow and carry the flame to the next land.|传说古道尽头，有守护当地长夜的领主。越过未曾见过的阴影，将灯火带往下一片土地。
終幕 / 最後の境界|Epilogue / The Final Boundary|终幕／最后的边界
終わらない夜がほどけていく。|The Endless Night Unravels.|无尽长夜，逐渐消散。
最後の影が崩れ、星のない空に細い亀裂が走った。ここまで運んだ灯をそっと掲げる。|The last shadow crumbles. A thin crack crosses the starless sky. You gently raise the flame you carried all this way.|最后的阴影崩解，无星夜空裂开一道细缝。你轻轻举起一路带来的灯火。
夜明け / A NEW DAWN|Dawn / A NEW DAWN|黎明／A NEW DAWN
灯は空へ昇りやわらかな金色に変わった。森にも水底の鐘楼にも灰の王都にも光が届いていく。|The flame rises into the sky and turns a gentle gold. Light reaches the forest, the drowned belfry, and the ashen capital.|灯火升向天空，化作柔和的金光。光芒洒向森林、水底钟楼与灰烬王都。
この道を歩いた、あなたへ。|To You, Who Walked This Road.|献给走过此路的你。
名もない巡礼路にいくつもの足跡が残った。共に歩いた仲間の顔を朝の光が初めて照らす。|Countless footsteps remain on the nameless pilgrim road. For the first time, morning light touches the faces of those who walked beside you.|无名巡礼路上留下许多足迹。清晨的光，第一次照亮与你同行的伙伴们。
五十の夜が重なるときだけ現れる、灯の届かない異界。|An otherworld beyond the reach of flame, appearing only when fifty nights converge.|仅在五十个长夜交叠时出现，灯火无法抵达的异界。
夜の道に存在しないはずの扉が開く。|A door that should not exist opens on the night road.|夜路上，一扇本不该存在的门开启了。
時を越えた巡礼者の影。ここでは灯さえ喰らわれる。|Shadows of pilgrims beyond time. Here, even flame can be devoured.|超越时空的巡礼者之影。在这里，连灯火也会被吞噬。
古い宿場の灯だけがかろうじて異界の侵食を退けている。|Only an old waystation's flame barely holds back the otherworld's corruption.|唯有古老驿站的灯火，勉强抵御着异界侵蚀。
星の亡骸が目を開く。この世界に戻るには主を越えるしかない。|The corpse of a star opens its eyes. To return, you must overcome its sovereign.|星之亡骸睁开双眼。若想回到原来的世界，唯有击败领主。
`));
rules.unshift([/合計6以上で2枚、それ以外は1枚追加で引く/g,()=>`Draw 2 extra cards if the total is at least 6; otherwise draw 1.`,()=>`点数总和至少为6时额外抽2张，否则抽1张。`]);
rule(/(.+)は、?灯を受け取った。?/g,(_,name)=>`${translateText(name,'en')} Received the Flame.`,(_,name)=>`${translateText(name,'zh-CN')}接过了灯火。`);
rule(/を覆っていた気配が背後へ遠ざかる。キャラバンの灯はまだ燃えている。/g,()=>` fades behind you. The caravan's flame still burns.`,()=>`的阴影渐渐远去。商队的灯火仍在燃烧。`);
registerTranslations(rows(`
故郷を覆った夜を抜け、根の王が守る古道へ。|Leave the night over your homeland and follow the old road guarded by the Root King.|穿过笼罩故乡的长夜，前往根王守护的古道。
沈んだ修道院で夜を呼ぶ鐘を止める。|Silence the bell that calls the night in the drowned abbey.|在沉没修道院中，止住呼唤长夜的钟声。
灰冠の支配を破り夜明けの門を開く。|Break the Ash Crown's rule and open the gate of dawn.|打破灰冠的统治，打开黎明之门。
朝を奪ったものと対峙し最後の灯を空へ。|Face what stole the morning and return the final flame to the sky.|面对夺走清晨的存在，将最后的灯火送还天空。
氷に閉じ込められた灯の鉱脈をたどる。|Follow the veins of lantern ore trapped in ice.|追寻冰封的灯火矿脉。
光る胞子が降る、忘れられた庭を抜ける。|Cross a forgotten garden beneath a fall of glowing spores.|穿过飘落发光孢子的遗忘花园。
砂の下に眠る王の道を探す。|Seek the royal road sleeping beneath the sand.|寻找沉睡沙下的王之道路。
止まらない機械の街で次の門を開く。|Open the next gate in a city of tireless machines.|在机械永不停歇的城市打开下一扇门。
血色の葦と古い祈りが揺れる湿原へ。|Enter the marsh where crimson reeds and ancient prayers sway.|前往血色芦苇与古老祈祷摇曳的湿原。
夜の始まりを記した失われた書を追う。|Track a lost book that records the beginning of night.|追寻记载长夜开端的失落之书。
巨大な竜の骨が架ける橋を渡る。|Cross a bridge formed by the bones of a colossal dragon.|渡过巨龙骨骸架起的桥。
雷雲の間に浮かぶ島々を越える。|Travel between islands floating among thunderclouds.|穿越漂浮于雷云之间的岛屿。
映るもののすべてが真実ではない宮廷へ。|Enter a court where reflections cannot be trusted.|踏入映像未必真实的宫廷。
落ちた星が眠る空の墓地を進む。|Walk a skybound graveyard where fallen stars sleep.|走过坠星长眠的天空墓地。
時を失った聖堂で最後の鐘を探す。|Seek the last bell in a cathedral beyond time.|在失去时间的圣堂中寻找最后的钟。
夜を生み続ける心臓に最後の灯を届ける。|Bring the last flame to the heart that keeps giving birth to night.|将最后的灯火送往不断孕育长夜的心脏。
村を発った。古い灯台へ続く道は森に呑まれていた。|You leave the village. The forest has swallowed the road to the old lighthouse.|离开村庄。通向古灯塔的道路已被森林吞没。
木々に刻まれた巡礼の印。先を歩いた誰かがまだいる。|Pilgrim marks are carved into the trees. Someone who walked before you is still here.|树上刻着巡礼的印记。先行者似乎仍在这里。
森の奥で地面が脈を打つ。灯を奪った根の気配が近い。|Deep in the forest, the earth pulses. The roots that stole the flame are close.|森林深处，大地脉动。夺走灯火的根已近在咫尺。
古道の門が見えた。森の主を越えれば霧の巡礼路へ出られる。|The old gate appears. Defeat the forest sovereign to reach the drowned pilgrimage.|古道之门已映入眼帘。越过森林领主，便能抵达雾中巡礼路。
森を越えると道は冷たい水面へと続いていた。|Beyond the forest, the road leads onto cold water.|穿过森林，道路伸向冰冷水面。
水没した祠から忘れられた巡礼歌が聞こえる。|A forgotten pilgrim song rises from a submerged shrine.|沉没的祠堂传来遗忘的巡礼歌。
鐘が鳴るたびに霧が濃くなる。修道院はまだ夜を祈っていた。|Each toll thickens the mist. The abbey is still praying for night.|每次钟响，雾便更浓。修道院仍在向长夜祈祷。
鐘楼の影が迫る。この鐘を止めなければ王都へは進めない。|The belfry's shadow looms. Its bell must fall silent before the capital can be reached.|钟楼的阴影逼近。不止住这钟声，便无法前往王都。
霧の向こうに焼け落ちた王都が姿を現した。|Beyond the mist, the burned capital emerges.|迷雾彼端，焚毁的王都显现。
瓦礫の壁に最後の夜を記した布告が貼られている。|A proclamation of the final night clings to a ruined wall.|瓦砾墙上，贴着记录最后一夜的布告。
王城はまだ熱を持つ。失われた朝を灰の兵が守り続けていた。|The castle still radiates heat. Ashen soldiers guard the morning that was lost.|王城仍有余温。灰烬士兵仍守着失去的清晨。
大門に灯をかざす。王都の主との決戦が待つ。|You raise the lantern at the great gate. The capital's sovereign awaits.|在大门前举起灯火。王都领主的决战就在前方。
王都の門を抜けると地平そのものが割れていた。|Beyond the capital's gate, the horizon itself has split.|走出王都之门，连地平线本身都已裂开。
星の残骸が道を照らす。ここでは夜さえ、形を失っている。|Fragments of stars light the road. Even night loses its shape here.|星辰残骸照亮道路。此地连长夜都失去了形体。
灯は小さい。それでも三人の影は消えなかった。|The flame is small. Yet the three travelers' shadows endure.|灯火很小。即便如此，三人的影子也未消失。
夜明けの境界に着いた。最後の戦いを越え、空に灯を返そう。|You reach the edge of dawn. Win the final battle and return the flame to the sky.|抵达黎明边界。越过最后一战，将灯火送还天空。
旅人たちは灯を囲み、次の門へ進む支度を整えた。|The travelers gather around the flame and prepare for the next gate.|旅人们围在灯火旁，准备前往下一扇门。
遠くに門が見えた。この土地の主がその向こうで待っている。|A gate appears in the distance. This land's sovereign waits beyond it.|远处出现一道门。这片土地的领主在门后等待。
最後の灯を空へ返した。世界に朝が来た。|The final flame returns to the sky. Morning comes to the world.|最后的灯火重返天空。世界迎来了清晨。
苔むした祠|Moss-Covered Shrine|覆苔祠堂
祠の奥に巡礼者が残した灯がある。|Deep within the shrine, a pilgrim's flame remains.|祠堂深处，留有巡礼者的灯火。
祈る|Pray|祈祷
油を買う|Buy Fuel|购买灯油
立ち去る|Leave|离开
何も消費せず進む|Continue at no cost|不消耗资源继续前进
道に迷った行商人|Lost Peddler|迷路行商
「灯を分けてもらえませんか」。行商人が古い遺物を差し出した。|“Could you spare some flame?” The peddler offers an old relic.|「能分我一点灯火吗？」行商递出一件古老遗物。
灯を分ける|Share the Flame|分享灯火
道を教える|Give Directions|指明道路
薬を買う|Buy Medicine|购买药品
星降る水辺|Starfall Shore|落星水畔
水面に浮かぶ星をしばらく見つめた。|You pause to watch the stars reflected in the water.|凝望水面漂浮的星影片刻。
星の水を汲む|Gather Star Water|汲取星水
技を磨く|Hone an Art|磨练技艺
岸辺を探す|Search the Shore|搜索岸边
錆びた門|Rusted Gate|锈蚀之门
門の奥には銀貨がある。足元には黒い棘が伸びている。|Silver lies beyond the gate. Black thorns coil around its base.|门后有银币，脚下却蔓延着黑色荆棘。
棘を越える|Cross the Thorns|越过荆棘
灯で払う|Burn Them Away|用灯火驱散
迂回する|Go Around|绕路
忘れられた焚き火|Forgotten Campfire|遗忘篝火
手記には仲間と交わした約束が書かれていた。|A journal records a promise once made between companions.|手记上写着曾与同伴许下的约定。
手記を読む|Read the Journal|阅读手记
体を休める|Rest|休息
油を集める|Gather Fuel|收集灯油
夜の取引|Night Bargain|夜之交易
仮面の人物が命の代わりに力を売るという。|A masked stranger offers power in exchange for life.|一位面具客声称，愿以力量换取生命。
命を差し出す|Offer Your Life|献出生命
銀貨を払う|Pay Silver|支付银币
断る|Decline|拒绝
失われた隊商|Lost Caravan|失落商队
崩れた荷車に誰かが集めた旅の品が残されている。|An overturned cart holds supplies gathered by another traveler.|翻倒的货车里，留有某人收集的旅行物资。
物資を拾う|Gather Supplies|拾取物资
銀貨を探す|Search for Silver|寻找银币
渡し守の問い|Ferryman's Question|摆渡人的问题
「何を残して何を持っていく？」渡し守が道を塞いだ。|“What will you leave, and what will you carry?” The ferryman blocks the road.|「留下些什么，又带走什么？」摆渡人挡住道路。
技を差し出す|Offer an Art|献出技艺
傷を預ける|Leave Your Wounds|托付伤痛
急いで渡る|Cross Quickly|快速渡过
祝福の泉|Blessed Spring|祝福之泉
霧の下に温かな水が湧いていた。|Warm water wells up beneath the mist.|雾下涌出温暖泉水。
埋もれた小箱|Buried Casket|埋藏小箱
古い小箱にはまだ使える物資が残っていた。|The old casket contains supplies that can still be used.|古老小箱中留有仍可使用的物资。
星の落とし物|A Fallen Star's Gift|星之遗物
掌に収まるほどの、世界の欠片を見つけた。|You find a fragment of the world small enough to hold in your palm.|找到一块能放入掌中的世界碎片。
旅人の教え|Traveler's Lesson|旅人教诲
通りがかった旅人が一つの技を教えてくれた。|A passing traveler teaches you an art.|路过的旅人传授了一项技艺。
盗人の影|Thief's Shadow|窃贼之影
振り返ると銀貨の袋に切れ目が走っていた。|You look back to find your silver pouch has been slit.|回头一看，银币袋已被划开。
底なしの泥|Bottomless Mire|无底泥潭
道が沈んだ。荷を守るために灯油を失った。|The road sinks. You lose fuel while saving the cargo.|道路下陷。为保住行李，损失了灯油。
呪いの雨|Cursed Rain|诅咒之雨
冷たい雨が体温と気力を奪っていく。|Cold rain drains warmth and strength.|冰冷雨水夺走体温与力气。
伏兵|Ambush|伏兵
道の両側から夜の獣が襲いかかってくる。|Night beasts spring from both sides of the road.|长夜之兽从道路两侧扑来。
`));
for(const chapter of CHAPTERS){const ja=chapter.name+'にもかつて朝はあった。残された巡礼の印が道を示している。';registerTranslations([[ja,`Morning once reached ${translateText(chapter.name,'en')} too. The pilgrims' remaining marks show the way.`,`${translateText(chapter.name,'zh-CN')}也曾有过清晨。残留的巡礼印记指明道路。`]])}
registerTranslations(rows(`
最初の足跡|First Footsteps|最初的足迹
最初の旅へ出発する。|Begin your first journey.|开始第一次旅程。
灯を守る|Protect the Flame|守护灯火
戦闘に1回勝利する。|Win 1 battle.|赢得1场战斗。
道を拓く|Trailblazer|开辟道路
通算10勝する。|Win 10 battles in total.|累计赢得10场战斗。
夜道の古参|Nightroad Veteran|夜路老兵
通算100勝する。|Win 100 battles in total.|累计赢得100场战斗。
灯の伝説|Legend of the Flame|灯火传说
通算1000勝する。|Win 1000 battles in total.|累计赢得1000场战斗。
三つの灯|Three Flames|三盏灯火
3人の隊商を結成する。|Form a caravan of 3 travelers.|组建3人商队。
夜道の縁|Nightroad Bonds|夜路之缘
10種類の旅人を迎える。|Recruit 10 different travelers.|招募10种不同旅人。
巡礼の盟友|Pilgrimage Allies|巡礼盟友
20種類の旅人を迎える。|Recruit 20 different travelers.|招募20种不同旅人。
すべての灯|Every Flame|所有灯火
通常の旅人30種類を迎える。|Recruit all 30 regular travelers.|招募全部30种普通旅人。
境界を越えて|Beyond the Boundary|越过边界
第4ステージを踏破する。|Clear Stage 4.|通过第4关。
十六の夜|Sixteen Nights|十六个长夜
第16ステージを踏破する。|Clear Stage 16.|通过第16关。
異界の征服者|Otherworld Conqueror|异界征服者
第50ステージの主を倒す。|Defeat the Stage 50 sovereign.|击败第50关领主。
百夜の巡礼|Hundred-Night Pilgrimage|百夜巡礼
第100ステージの主を倒す。|Defeat the Stage 100 sovereign.|击败第100关领主。
無明を照らす|Light the Abyss|照亮无明
第150ステージの主を倒す。|Defeat the Stage 150 sovereign.|击败第150关领主。
朝を取り戻す|Restore the Morning|夺回清晨
通常の旅をクリアする。|Complete a normal journey.|通关普通旅程。
夜深き旅の終わり|Deep Night's End|深夜旅程的终点
高難度16ステージをクリアする。|Complete all 16 hard stages.|通过全部16个高难度关卡。
孤灯の巡礼|Lone Flame Pilgrimage|孤灯巡礼
仲間を増やさず高難度をクリアする。|Complete hard mode without recruiting allies.|不招募同伴通关高难度。
研ぎ澄まされた灯|A Refined Flame|淬炼之灯
8枚以下のデッキで高難度をクリアする。|Complete hard mode with a deck of 8 cards or fewer.|用不超过8张卡的牌组通关高难度。
薬に頼らぬ旅|A Journey Without Medicine|不依赖药物的旅程
回復薬を使わず高難度をクリアする。|Complete hard mode without using healing potions.|不使用治疗药水通关高难度。
一閃の夜明け|Dawn in a Flash|一闪黎明
1ターンで戦闘に勝利する。|Win a battle in 1 turn.|在1回合内赢得战斗。
影より速く|Faster Than Shadows|快过阴影
1ターン勝利を30回達成する。|Achieve 30 first-turn victories.|达成30次首回合胜利。
技の積み重ね|Practice Makes Power|技艺累积
カードを通算100回使う。|Play 100 cards in total.|累计使用100次卡牌。
千の一手|A Thousand Moves|千次出手
カードを通算1000回使う。|Play 1000 cards in total.|累计使用1000次卡牌。
王を退ける者|Sovereign Slayer|退王之人
ボスを通算30体倒す。|Defeat 30 bosses in total.|累计击败30名首领。
六の兆し|A Sign of Six|六之征兆
サイコロで6を出す。|Roll a 6 on a die.|骰子掷出6点。
金で道を切り拓く|Pave the Way with Silver|用银币开路
カードで銀貨を通算1000枚消費する。|Spend 1000 silver through cards in total.|通过卡牌累计消耗1000银币。
秘奥を携えて|Secret Art Bearer|携带秘奥
特殊カードを手に入れる。|Acquire a Special card.|获得1张特殊卡牌。
二つの灯|Two Flames|两盏灯火
カードを合成する。|Fuse two cards.|合成卡牌。
極まる一枚|Perfected Card|极致一张
カードを3回強化する。|Upgrade a card 3 times.|将1张卡强化3次。
遺物の巡礼者|Relic Pilgrim|遗物巡礼者
1ランでレリックを20個所持する。|Hold 20 relics in one run.|单次旅程中持有20件遗物。
銀の山|Mountain of Silver|银币之山
銀貨を1000枚所持する。|Hold 1000 silver.|持有1000银币。
条件不明。|Unknown condition.|条件不明。
隠された実績|Hidden Achievement|隐藏成就
夜明けの継承者|Heir of Dawn|黎明继承者
アウロラを解放した。|Unlocked Aurora.|已解锁奥罗拉。
未達成|Locked|未达成
実績|Achievements|成就
巡礼の実績|Pilgrimage Achievements|巡礼成就
共有リンク|Share Link|分享链接
灯火のキャラバンを共有|Share Lantern Caravan|分享灯火商队
このURLを友だちに送るとブラウザから遊べます。セーブと実績はプレイヤーそれぞれの端末に保存されます。|Send this URL to friends so they can play in their browser. Saves and achievements are stored on each player's own device.|将此链接发给好友，即可在浏览器游玩。存档与成就分别保存在各玩家自己的设备上。
共有URL|Share URL|分享网址
リンクをコピー|Copy Link|复制链接
共有リンクをコピーしました。|Share link copied.|已复制分享链接。
表示中のURLを選択してコピーしてください。|Select and copy the displayed URL.|请选择并复制显示的网址。
このブラウザでの冒険の記録です。セーブ書き出しにも記録を含みます。|Your adventures in this browser. Progress is included in exported saves.|此浏览器中的冒险记录。导出存档也包含这些记录。
灯火の|Lantern|灯火
キャラバン|Caravan|商队
灰暁の巡礼 / THE LAST PILGRIMAGE|THE LAST PILGRIMAGE|灰晓巡礼／THE LAST PILGRIMAGE
森、沈む聖堂、灰の王都、夜明けの果て。|Forests, drowned abbeys, an ashen capital, and the edge of dawn.|森林、沉没圣堂、灰烬王都，以及黎明尽头。
ひとりで出発し仲間と失われた朝を取り戻す。|Begin alone. Find companions. Restore the lost morning.|独自出发，结识同伴，找回失落清晨。
通常4ステージ／高難度16ステージ・ターン制・自動保存|4 normal / 16 hard stages · Turn-based · Autosave|普通4关／高难度16关・回合制・自动存档
通常4ステージ／高難度16ステージのボスを倒すこと|Defeat the bosses of 4 normal or 16 hard stages|击败普通4关或高难度16关的首领
いつでも中断できる|Pause Anytime|随时中断
急ぐ必要はありません。|Take your time.|无需着急。
戦闘中もゆっくり考えてから操作できます。|You can think as long as you like during battle.|战斗中也可充分思考后再行动。
次の行動が見えます。|Their next action is shown.|这里会显示下一步行动。
敵の頭上に|Above an enemy|敌人头顶
の順。|in that order.|依此顺序。
次は|Next: |接下来：
旅の進め方|Journey Guide|旅程指南
道を選び、章の主を倒そう。|Choose your road and defeat each sovereign.|选择道路，击败各章领主。
灯油とHPを管理|Manage Fuel & HP|管理灯油与HP
各行動後に自動保存します。同じブラウザで再び開けば続きから。別端末へは設定からセーブを書き出し読み込んで移せます。|Every action autosaves. Reopen in the same browser to continue. To change devices, export your save in Settings and import it on the other device.|每次行动后自动保存。在同一浏览器中重新打开即可继续。跨设备时可在设置中导出存档，再于另一设备导入。
練習中は本編のセーブを変更しません。PC：数字キー・Q/Wでカード選択、Enterでターン終了、Escで選択解除。|Practice preserves your main save. PC: number keys / Q / W select cards, Enter ends the turn, Esc cancels selection.|练习不会更改正式存档。电脑：数字键／Q／W选卡，Enter结束回合，Esc取消选择。
`));
rule(/(\d+)種の固有技/g,(_,n)=>`${n} unique arts`,(_,n)=>`${n}种专属技艺`);
rule(/(\d+)種のレリック/g,(_,n)=>`${n} relics`,(_,n)=>`${n}种遗物`);
rule(/(\d+)体の章の主/g,(_,n)=>`${n} sovereigns`,(_,n)=>`${n}位领主`);
registerTranslations(rows(`
朝へ続く足跡|Footsteps Toward Morning|通向清晨的足迹
最初の旅人|First Traveler|首位旅人
新たな道へ。|A New Road.|踏上新路。
灯はまだ燃えている。|The Flame Still Burns.|灯火仍在燃烧。
夜が明ける。|Dawn Breaks.|长夜将明。
灯を次の旅路へ。|Carry the Flame Onward.|将灯火送往下一段旅程。
物語の続きを。|The Story Continues.|故事继续。
旅のカード|Journey Cards|旅程卡牌
デッキを確認|Inspect Deck|查看牌组
所持レリック一覧|View Owned Relics|持有遗物列表
所持レリック|Owned Relics|持有遗物
通常|Normal|普通
妨害・使うと消滅|Hindrance · Exhausts on play|干扰・使用后消耗
攻撃する敵を選んでください。|Choose an enemy to attack.|请选择要攻击的敌人。
守る、または回復する仲間を選んでください。|Choose an ally to protect or heal.|请选择要保护或治疗的同伴。
発動するボタンを選んでください。|Press Play Card.|请选择发动按钮。
敵と仲間をそれぞれ選び、「発動する」を押してください。|Choose an enemy and an ally, then press Play Card.|分别选择敌人与同伴，然后按「发动」。
このカードは仲間を対象にします。緑の枠の仲間を選んでください。|This card targets an ally. Choose a traveler with a green outline.|此卡以同伴为目标。请选择绿色边框的同伴。
このカードは敵を対象にします。赤い枠の敵を選んでください。|This card targets an enemy. Choose an enemy with a red outline.|此卡以敌人为目标。请选择红色边框的敌人。
敵と仲間を選んで発動|Choose Enemy & Ally to Play|选择敌人与同伴后发动
選択カードの対象|Selected Card's Targets|所选卡牌的目标
操作ガイド|Controls Guide|操作引导
三人の連携が発動しました。|Caravan Link activated.|三人联携已发动。
仲間を選択しました。敵も選び、発動してください。|Ally selected. Choose an enemy, then play the card.|已选择同伴。再选择敌人后发动。
敵を選択しました。仲間も選び、発動してください。|Enemy selected. Choose an ally, then play the card.|已选择敌人。再选择同伴后发动。
もう一方の対象を選び、発動してください。|Choose the other target, then play the card.|请选择另一目标后发动。
敵か仲間へドロップした後にもう一方を選んで発動|Drop onto an enemy or ally, then select the other target to play|拖至敌人或同伴后，选择另一目标发动
仲間まで動かして離す · 対象の外で離すとキャンセル|Release over an ally · Release outside a target to cancel|拖至同伴后松开・在目标外松开可取消
戦場まで動かして離すと発動 · 手札へ戻すとキャンセル|Release over the battlefield to play · Return to your hand to cancel|拖至战场后松开发动・拖回手牌可取消
敵まで動かして離す · 対象の外で離すとキャンセル|Release over an enemy · Release outside a target to cancel|拖至敌人后松开・在目标外松开可取消
毒は敵の行動直前に発動し毎回1減ります。|Poison triggers just before the enemy acts and decreases by 1 each time.|中毒在敌人行动前生效，每次减少1层。
弱点がある敵への攻撃はダメージ+4。攻撃を受けるたび残り回数が減ります。|Attacks against Exposed enemies deal +4 damage. Each hit consumes one charge.|攻击带有破绽的敌人时伤害+4。每次命中消耗1层破绽。
最大3回まで強化。通常18種類＋条件付き希少強化を現在の性能と比較できます。まだ料金は発生しません。|Upgrade up to 3 times. Compare 300 shared and 300 card-specific and conditional rare upgrades with the current card. No payment yet.|最多强化3次。可将300种通用强化与300种专属强化与符合条件的稀有强化和当前卡牌比较。此时尚不收费。
無料で1枚を1回強化します。不利益が増えない候補だけを提示します。確定前に他の恩恵へ選び直せます。|Upgrade 1 card once for free. Only offers without increased drawbacks appear. You may choose a different blessing before confirming.|免费强化1张卡1次。只提供不会增加负面效果的候选。确认前可改选其他恩惠。
周回の祝福：通常2回分の効果を強化1枠で得られます。不利益が増えない候補から選びます。|Cycle blessing: gain 2 upgrades' worth of effects using 1 upgrade slot. Offers do not increase drawbacks.|循环祝福：使用1个强化次数获得通常2次强化的效果。候选不会增加负面效果。
比較から戻っても位置を保持|Keeps your position after comparison|从比较页返回后保留位置
候補はこの地点で固定され、再読み込みでも変わりません。|This location's offer is fixed and does not change when reloaded.|此地点候选固定，重新载入也不会改变。
祝福の強化：不利益が増えない候補だけから選ばれています。|Blessed upgrade: chosen only from offers that do not increase drawbacks.|祝福强化：仅从不增加负面效果的候选中选择。
このカードの通常18種類＋条件付き希少強化から選ばれた、今回の強化です。|This offer is drawn from the card's 300 shared and 300 card-specific and conditional rare upgrades.|本次强化来自此卡的300种通用强化与300种专属强化与符合条件的稀有强化。
祝福により新しい不利益は付きません。元からある代償は軽減されるか、そのまま残ります。|The blessing adds no new drawbacks. Existing costs are reduced or remain unchanged.|祝福不会增加新的负面效果。已有代价会减轻或保持不变。
消費気力・HP消費・消滅など、デメリットが増える強化もあります。|Some upgrades increase drawbacks such as energy cost, HP cost or Exhaust.|部分强化会增加能量费用、HP消耗或消耗属性等负面效果。
最大3段階。確定前に強化前後と代償を比較できます。|Up to 3 upgrades. Compare the before and after effects and drawbacks before confirming.|最多强化3次。确认前可比较强化前后效果及代价。
この店で除去するたび次の料金が上がります。|Each removal at this shop increases its next removal price.|在此商店每移除1次，下次费用就会增加。
この地点はすべての道が合流します。恩恵を受け取るまで選び直せます。|All roads meet here. You may change your choice until claiming a blessing.|所有道路在此汇合。领取恩惠前可重新选择。
通常2回分の効果を強化1枠で。安全な候補から1枚を無料強化。確定前に比較できます。|Gain 2 upgrades' effects in 1 slot. Upgrade 1 card for free from safe offers. Compare before confirming.|1次强化获得通常2次的效果。从安全候选中免费强化1张卡。确认前可比较。
どちらか1つを選択。16・32・48…ステージ踏破のたびに訪れます。|Choose one. Returns after clearing stages 16, 32, 48 and so on.|选择其中1项。每通过16、32、48等关卡时出现。
この旅で別れた仲間：|Travelers who left this journey: |本次旅程离队的同伴：
このラン中は再加入しません。|They cannot return during this run.|本次旅程中不会再次加入。
固有能力は持ち主のカードにのみ適用（毎ターンの能力は本人に適用）。戦闘不能の仲間のカードは使用できません。交代するとその人のカードと強化はデッキから除去されます。|Passives affect only their owner's cards (turn passives affect the owner). Fallen travelers' cards cannot be played. Replacing a traveler removes all their cards and upgrades from your deck.|固有能力仅影响持有者的卡牌（每回合能力作用于本人）。倒下同伴的卡牌无法使用。替换同伴会从牌组移除其全部卡牌与强化。
まずは3人の隊商を結成しましょう。この出会いでは1人を迎えて進みます。|First, form a caravan of 3. Recruit one traveler at this encounter to continue.|先组建3人商队。本次相遇需招募1位旅人后继续。
空席に新しい仲間を迎えます。|A new traveler will fill an empty slot.|新同伴将填入空位。
加入する仲間を選んでから誰と交代するかを指定できます。|Choose the recruit first, then choose who they replace.|先选择加入的同伴，再指定替换谁。
敵の強さは引き継がれ、周回ごとにさらに増していきます。|Enemy strength carries over and increases with each cycle.|敌人强度会继承，并随循环进一步增加。
`));
const personPattern=COMPANIONS.map(h=>h.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|');
rules.unshift([new RegExp('('+personPattern+')と出発する','g'),(_,who)=>`Depart with ${translateText(who,'en')}`,(_,who)=>`与${translateText(who,'zh-CN')}出发`]);
rules.unshift([new RegExp('('+personPattern+')の(攻撃|守備|回復|策略)カード','g'),(_,who,type)=>`${translateText(who,'en')}'s ${translateText(type,'en')} card`,(_,who,type)=>`${translateText(who,'zh-CN')}的${translateText(type,'zh-CN')}卡`]);
rules.unshift([new RegExp('('+personPattern+')に(\\d+)ダメージ','g'),(_,who,n)=>`${n} damage to ${translateText(who,'en')}`,(_,who,n)=>`对${translateText(who,'zh-CN')}造成${n}伤害`]);
import {GLOSSARY} from './glossary.js?v=53';
const glossaryDetails=rows(`
hp|Max HP is your healing limit. HP carries into later battles. The journey ends when everyone reaches 0 HP.|最大HP是可恢复的上限。HP会继承至后续战斗。全员HP归零时旅程结束。
fallen|Potions and camp rest revive with 18 HP; defeating a boss revives with 45% Max HP. Ordinary healing cannot target fallen allies; cards must explicitly allow revival.|药水与营地休息均以18 HP复活；击败首领后以45%最大HP复活。普通治疗卡无法治疗倒下者，只有带复活效果的卡牌能以其为目标。
energy|Start your turn with 4 Energy, or 3 when fuel is 0. Unused energy normally expires. Relics and cards may change energy or let it carry over.|回合开始时基础能量为4；灯油为0时为3。剩余能量通常不保留。遗物与卡牌可增减能量或使其保留。
intent|Shows targets, power, number of hits, healing, debuffs and disruption. Plan ahead: defeat the enemy, gain Shield, or use Stun before ending your turn.|显示攻击目标、威力、连击次数、治疗、弱化与干扰。可提前击败敌人、准备护盾或用定身应对。
shield|With 12 Shield against 7 damage, HP stays unchanged and 5 Shield remains. Ally Shield expires at your next turn's start unless a relic preserves it. Enemy Shield lasts until broken. Shield cannot block Poison, HP costs or shield-piercing attacks.|12护盾受到7伤害时，HP不减并剩5护盾。同伴护盾在你的下回合开始时消失（保留护盾遗物除外）；敌方护盾持续到被削尽。无法抵挡中毒、HP消耗或无视护盾的攻击。
power|3 Might adds +3 to each single-target and area attack. Each hit of a multi-hit attack gains the bonus. Lasts for this battle, then resets to 0 at the next battle.|3斗志使单体与群体攻击伤害分别+3，连击的每次命中均生效。持续至战斗结束，下场战斗开始时归零。
poison|Before enemies act, or at the start of your turn for allies, lose HP equal to Poison, then reduce Poison by 1. Poison 4 deals 4→3→2→1 damage. Enemies killed by Poison do not act. Clears after battle.|敌人行动前、同伴在你的回合开始时，按中毒层数损失HP，然后中毒减少1。4中毒依次造成4→3→2→1伤害。被毒倒的敌人不会行动。战斗结束后清除。
weak|3 Exposed affects the next 3 hits, losing 1 charge per hit. Relics and Sena's passive may add bonuses. Poison does not consume Exposed.|3破绽作用于后续3次命中，每次消耗1层。遗物与塞娜固有能力可额外加成。中毒不消耗破绽。
vulnerable|2 Vulnerable strengthens the next 2 enemy hits, decreasing by 1 each time. Shield blocks the added damage too. Poison and card HP costs do not consume it.|2易伤会强化后续2次敌方命中，每次减少1。增加的伤害也可用护盾抵挡。中毒与卡牌HP消耗不消耗易伤。
stun|1 Stun makes a normal enemy skip its next action and decreases by 1. Bosses still act, but their action's power is halved. Poison still triggers while Stunned.|1定身使普通敌人跳过下次行动并减少1。首领不会停手，但该次行动威力减半。定身期间中毒照常触发。
regen|3 Regen restores 3 HP at turn start, then decreases to 2. It restores 2 next time, then 1. Does not trigger while fallen. Clears after battle.|3再生在回合开始恢复3 HP，然后降为2；之后依次恢复2、1 HP。倒下时不触发，战斗结束后清除。
thorns|6 Thorns deals 6 direct HP damage to an attacker after each hit, even when Shield blocks it completely. Resets to 0 at your next turn's start. Poison does not trigger Thorns.|6反击使每次命中的攻击者直接损失6 HP，即使伤害被护盾完全抵挡也会反击。在你的下回合开始时归零。中毒不触发反击。
cleanse|Cleanse All affects every ally. Beneficial effects such as Might, Shield and Regen remain.|全员净化对所有同伴生效。斗志、护盾与再生等有益状态不会移除。
redirect|Changes the targets of currently announced attacks. Area attacks remain area attacks. Enemies choose new targets next turn.|改变当前预告的攻击目标。群体攻击不会变为单体攻击。下回合敌人会重新选择目标。
pierce|Ignore Shield deals HP damage without reducing enemy Shield. Destroy Shield sets the enemy's Shield to 0 before resolving this card's attack.|无视护盾会直接伤害HP，不减少敌方护盾。破盾会先将敌人护盾变为0，再结算本卡攻击。
hits|Shield, Exposed, Might and Thorns resolve separately for each hit. If a hit defeats the target, remaining hits do not transfer to another enemy.|护盾、破绽、斗志与反击逐次命中结算。目标中途倒下后，剩余命中不会转移至其他敌人。
aoe|Includes attacks and Poison against all enemies, or Shield and healing for all allies. Select the card and press Play Card, or drag it onto the battlefield and release.|包括对全体敌人的攻击与中毒，以及对全体同伴的护盾与治疗。选卡后按「发动」，或将卡牌拖至战场后松开。
selfCost|Shield cannot prevent HP costs, which may cause the user to fall. When combined with healing or attacks, the cost is paid after those effects.|护盾无法抵挡HP消耗，使用者可能因此倒下。若与治疗或攻击一起发生，则在这些效果之后支付HP代价。
next|Not gained immediately. Next Energy +2 adds 2 to next turn's base energy. Enemy disruption reductions are included in the total.|不会立刻增加。「下回合能量+2」会给下回合基础能量加2。敌方干扰造成的减少也会合并计算。
draw|Hand limit: 12 cards. Normal starting hand: 6 cards. An empty draw pile reshuffles the discard pile into a new draw pile. If both piles are empty, you cannot draw.|手牌上限12张，通常起始手牌6张。抽牌堆为空时，洗混弃牌堆成为新抽牌堆。两者都空时无法抽牌。
deck|Rewards and shops offer cards for current party members. Recruiting adds 6 unique cards. A departing traveler loses all their cards, including upgraded copies.|奖励与商店提供当前同伴的专属卡。加入时添加6张专属卡。离队时移除其全部卡牌，包括已强化的卡牌。
discard|When the draw pile runs out, the discard pile is shuffled and reused. Playing a normal card does not remove it from your permanent journey deck.|抽牌堆耗尽时会洗混弃牌堆再次使用。使用普通卡牌不会将其从永久旅程牌组中移除。
exhaust|Goes to the Exhaust pile instead of the discard pile and is not reshuffled. It returns from your permanent deck next battle. This differs from permanent removal.|进入消耗区而非弃牌堆，不会被洗回。下场战斗仍可从永久牌组中使用。与永久移除不同。
remove|At the same shop, removal prices rise 35→60→85… before discounts. Removal is unavailable when the permanent deck has 6 cards or fewer.|同一家店的移除费用依次为35→60→85…（折扣前）。永久牌组不超过6张时无法移除。
status|Agitation has no effect; playing it costs 1 Energy and Exhausts it. It is never added to your permanent deck and disappears after battle.|焦躁没有效果，消耗1能量使用后将其消耗。不会加入永久牌组，战斗后消失。
upgrade|Upgrading strengthens a card or adds effects. Compare its effects and price before confirming. Only the selected card is changed.|强化可增强卡牌或增加效果。确认前请比较性能与费用。仅改变选中的卡牌。
variants|Upgrades may increase damage or shields, reduce cost, or add draw and status effects. They can also add HP costs or higher energy costs. Check the comparison before confirming.|强化可增加伤害或护盾、降低费用，或添加抽牌与状态效果。也可能增加HP消耗或费用。确认前请查看比较画面。
relief|Only cards with actual drawbacks qualify. Price Relief reduces HP cost by 4. Burden Relief reduces an upgrade-added cost by 1. Wear Repair restores up to 4 lost effect points. Curse Relief reduces self-Poison and self-Vulnerable by 2 each. Rarer than standard upgrades; unavailable if neither the original nor upgraded card has the relevant drawback.|只针对确有负面效果的卡牌。代价缓解将HP消耗降低4；负担消解将强化增加的费用降低1；损耗修复最多恢复4点损失效果；咒缚缓解分别降低自身中毒与易伤各2。比普通强化少见；原卡与强化后卡都没有对应负面效果时不会出现。
cardtypes|Damage-focused cards are Attacks; Shield cards are Defense; healing and Regen cards are Healing; all others are Skills. Some passives and relics trigger when you play a Skill.|以伤害为主的卡为攻击，护盾为防守，恢复与再生为治疗，其余为策略。部分固有能力与遗物在使用策略卡时触发。
passive|Examples include bonuses to the owner's attacks, healing and Poison, or Shield at turn start. Inspect them anytime through Travelers & Passives.|包括仅适用于持有者卡牌的攻击、治疗与中毒加成，以及回合开始时的护盾。可随时通过「同伴与固有能力」查看。
link|Available with 3 travelers. If each plays at least one card in the same turn, all living allies gain 6 Shield and you gain 1 Energy. Once per turn; relics can strengthen it. Hindrance cards such as Agitation do not count.|3位同伴到齐后可用。同回合每人至少出1张卡时，全体存活同伴获得6护盾、能量+1。每回合1次，可由遗物强化。焦躁等干扰卡不计入联携。
recruit|Meet new companions during your journey. A traveler who leaves cannot rejoin during that journey.|旅途中会遇见新的同伴。离队的旅人在本次旅途中无法再次加入。
relic|Passively active while owned. Elite victories usually offer 1 of 3 normal relics; boss victories offer 1 of 3 boss relics. Normal relics can also be bought in shops.|持有即自动生效。精英胜利通常可从3件普通遗物中选1，首领胜利可从3件首领遗物中选1。商店也出售普通遗物。
bossRelic|Powerful benefits come with major drawbacks: more Energy but less healing, or stronger attacks that cost HP. Read the red drawback before choosing. Inspect owned relics anytime.|强大恩惠伴随重大代价，例如增加能量但降低恢复量，或增强攻击但消耗HP。选择前请查看红色代价。可随时在持有遗物页查看。
cycle|A relic you passed over may appear again later in the journey. Choose benefits that suit your current party and deck.|曾经放弃的遗物可能在旅途后期再次出现。请选择适合当前同伴与牌组的恩惠。
potion|No Energy cost. Restores 24 HP, or revives a fallen ally with 18 HP. Relics may alter normal healing. Cannot target full-HP allies or empty slots. Use the Healing Potion button at the top.|不消耗能量，恢复24 HP；倒下者以18 HP复活。遗物可改变普通恢复量。无法对满HP同伴或空位使用。点击上方「治疗药水」使用。
fuel|Travel normally costs 2 fuel. Traveling at 0 fuel makes everyone lose 5 HP and reduces base battle Energy from 4 to 3. Refill at camps, shops and events. Relics may change travel fuel costs.|移动通常消耗2灯油。灯油为0时移动全员HP-5，战斗基础能量由4降为3。可在营地、商店与事件补充。遗物可能改变移动消耗。
gold|Spent on cards, relics, potions, fuel, upgrades and removal. Earned from battles and events; some enemies and disasters can steal it.|可用于卡牌、遗物、药水、灯油、强化与移除。通过战斗与事件获得，也可能被部分敌人和灾难夺走。
blessing|Appears at the midpoint, location 6, in stages 2 and 4, then every 3 stages (7, 10, 13, 16…). Choose one: copy an owned non-Special card preserving upgrades/fusion, fuse cards from the same traveler, one free safe upgrade, full party healing and revival, stage-scaled silver, or full fuel plus 3 potions and 80 silver. Safe upgrades never worsen an existing drawback or add a new one.|必经的第6中途地点，在第2、4关以及之后每隔3关（7、10、13、16…）出现。选择1项：同旅人卡牌合成、免费安全强化1次、全员全恢复与复活、随关卡增加的银币，或灯油全补＋3瓶药水＋80银币。安全强化不会恶化已有代价或增加新负面效果。
camp|Choose rest, an upgrade or fuel. Rest restores 18 HP to living allies, revives fallen allies at 18 HP and adds 10 fuel (modified by relics). Upgrading is free. Supplies grant 35 fuel. Return to the map afterward.|可选休息、强化或补给。休息为存活者恢复18 HP，倒下者以18 HP复活，并恢复10灯油（受遗物影响）。强化免费。补给获得35灯油。选择后返回地图。
shop|Upgrade prices are normally 110→180→250 G. Removal starts at 35 G and rises by 25 G at the same shop. Normal relics generally cost 190–250 G. Discount relics affect each price.|强化通常为110→180→250 G。同店移除从35 G起，每次增加25 G。普通遗物通常为190–250 G。折扣遗物适用于各项费用。
forge|Usually 35 G for one upgrade. Selecting a card costs nothing. Compare the offer, then confirm. Some events provide free upgrades.|通常花费35 G强化1次。仅选择卡牌不会收费。比较候选后再确认。部分事件提供免费强化。
shrine|Blood Offering costs each living ally 10 HP but leaves at least 1. Purification costs 35 G, heals everyone for 20 HP and can revive fallen allies.|鲜血供品使存活同伴HP降低10，但至少保留1。净化花费35 G，全员恢复20 HP，也可复活倒下者。
mystery|May grant supplies, healing and discoveries, or cause loss, injury and ambushes. Bad outcomes grow likelier in later chapters. Investigate after traveling or spend 8 extra fuel to avoid it.|可能获得物资、治疗与发现，也可能损失资源、受伤或遭埋伏。后期坏结果概率增加。移动后可查看结果，或额外花费8灯油避开。
elite|Stronger than ordinary enemies. Later chapters may turn ordinary battles into elite encounters. Victory offers normal relic choices in addition to cards.|比普通敌人更强。后期普通战斗也可能变为精英战。胜利后除了卡牌，还会提供普通遗物候选。
boss|A powerful enemy at each chapter's end. At half HP or less, enters phase 2 with increased Attack and other bonuses. After victory, choose a boss relic, heal and refuel, then continue.|各章末尾的强敌。HP不超过一半时进入第二形态，攻击力等提升。击败后选择首领遗物，恢复HP与灯油，前往下一章。
perfect|Defeat every enemy on turn 1 before any enemy action resolves. Earn 1.5× silver, 4 card offers instead of 3, and 3 fuel. Poison victories after enemy action resolution begins do not qualify.|在首回合、敌方行动结算前全灭敌人，可获得1.5倍银币、4张卡牌候选（通常3张）与3灯油。进入敌方结算后由中毒等造成的胜利不计入。
save|Saves companions, belongings, your deck and battle progress. Three manual slots are available. You can export and import your records. Cloud sync is not available.|保存同伴、物品、牌组与战斗进度。提供三个手动存档位，可导出与导入记录。不支持云同步。
story|Shown at departure, chapter changes and the end of a journey. Move between scenes or skip them. Replay the opening from your journal and the ending from the results screen.|在出发、章节转换与旅途结束时呈现。可以前后翻看或跳过。从旅途记录重温序幕，从结果画面重温结局。
tactics|Actions react to the situation rather than following a fixed sequence. Later enemies seek vulnerable targets and use healing or defense appropriately. Intents are chosen at your turn's start and never secretly replaced afterward.|行动会随局势变化，而非固定顺序。后期敌人更会瞄准可击倒或护盾薄弱的目标，并适时治疗、防御。行动在你的回合开始时预告，之后不会偷偷更换。
fusion|At a blessing waystation, fuse 2 cards from the same traveler into 1. Remove both materials, sum their base costs, and resolve effects in material order. Keep material upgrades and gain 3 new upgrade slots, affecting the first material. Fuse up to 4 cards' worth. If effects target both an enemy and an ally, choose both targets.|祝福驿站可将同旅人的2张卡合成1张。移除素材，合计基础费用，按素材顺序发动效果。保留素材强化，合成后可再强化3次，作用于第一素材。最多合成4张卡的效果。若同时作用于敌人与同伴，需分别选择两种目标。
endless|Repeat the 16 lands until the caravan falls. Select at departure or continue after clearing 16 hard stages. The next cycle starts at stage 17; enemy HP, Attack and danger do not reset. After stages 16, 32, 48… choose supplies or a safe upgrade worth 2 normal upgrades in 1 slot.|循环16片土地直至全队倒下。可在开始时选择，或通关高难度16关后继续。下一循环从第17关起，敌方HP、攻击与危险度不重置。通过16、32、48…关后可选补给，或以1次强化获得通常2次效果的安全强化。
fixed-traveler|The starting traveler cannot leave during this run. Other members can be replaced at recruitment encounters. Departed travelers never return, even in later cycles.|首位旅人在本次旅程中无法替换。其他同伴可在招募时选择替换。离队者即使进入后续循环也不会再加入。
ultimate|A powerful trump card, drawn after normal cards. You can carry only one Special card across the caravan. Taking a new Special replaces the old one, including its upgrades. Special cards cannot be fused.|强力王牌会在普通卡后抽到。整个商队最多持有一张特殊卡。获得新的特殊卡会替换旧卡及其强化。特殊卡不能合成。
rare-card|These cards are already upgraded when acquired. Each card can be upgraded up to three times in total.|入手时已完成强化。包括入手后的强化在内，每张卡最多强化三次。
summon|At most 3 enemies on the field. Reinforcements act from the next turn and may occupy defeated enemies' slots. Each summoner can summon up to 2 times. Defeat all reinforcements to win. Boss attacks normally hit 2 times, or 3 in later stages.|场上最多3名敌人。增援从下回合行动，可出现在倒下敌人的位置。每名召唤者最多召唤2次。需击败全部增援才能获胜。首领通常2连击，后期3连击。
dice|The die roll changes a card's extra effect. Luca turns 1 into 2. Rolls are fixed only when played; selection, previewing and reloading do not reroll. Damage previews show minimum–maximum damage.|点数影响卡牌额外效果。卢卡将1点改为2点。仅实际使用时确定点数；选择、预览或重新载入不会重掷。攻击预览显示最低至最高伤害。
rng|One journey lasts from departure until victory or defeat. A new journey brings different routes, encounters and cards.|从出发到胜利或全灭为一次旅途。新的旅途会有不同的路线、相遇和卡牌。
`);
for(const [id,en,zh]of glossaryDetails){const g=GLOSSARY.find(g=>g.id===id);if(g)registerTranslations([[g.text,en,zh]])}
registerTranslations(rows(`
操作設定|Controls|操作设置
キーボード・コントローラー・カードの即発動|Keyboard, controller and quick card casting|键盘、手柄与卡牌即时发动
対象不要のカードを即発動|Quick Cast Untargeted Cards|无需目标的卡牌即时发动
ON：全体・自身向けは押すと発動。敵や仲間を選ぶカードは押した後に対象を指定します。|ON: play area and self-target cards immediately when pressed. For cards targeting an enemy or ally, press the card then choose its target.|开启：点击群体或自身卡牌即发动。需要选择敌人或同伴的卡牌则在点击后指定目标。
コントローラー：方向キー／左スティックで移動、決定で選択。カード選択後は対象のボタンへ移ります。設定の数値・選択肢は左右で変更。割り当ては下で変更できます。|Controller: move with the D-pad / left stick and confirm to select. Selecting a card moves focus to its targets. Use left / right to adjust settings and choices. Remap controls below.|手柄：用方向键／左摇杆移动，按确认选择。选卡后焦点会移至目标按钮。用左右调整设置数值与选项。可在下方修改按键。
キーボード|Keyboard|键盘
コントローラー|Controller|手柄
割り当てるキーを押してください。Escで取り消し。|Press a key to bind. Esc cancels.|请按要绑定的键。Esc取消。
標準Gamepad API対応のコントローラーを接続しいずれかのボタンを押してください。接続中もマウス・タッチ・キーボードを併用できます。|Connect a controller supporting the standard Gamepad API and press any button. Mouse, touch and keyboard remain available while connected.|连接支持标准Gamepad API的手柄，然后按任意按钮。连接后也可同时使用鼠标、触屏与键盘。
割り当てを初期化|Reset Bindings|重置按键
コントローラーを接続しました。設定から操作を変更できます。|Controller connected. Change controls in Settings.|手柄已连接。可在设置中更改操作。
決定・発動|Confirm / Play|确认／发动
キャンセル|Cancel|取消
ターン終了|End Turn|结束回合
カード詳細|Card Details|卡牌详情
前のカード|Previous Card|上一张卡
次のカード|Next Card|下一张卡
戦闘の基本|Battle Basics|战斗基础
状態・効果|Statuses & Effects|状态与效果
カード・デッキ|Cards & Deck|卡牌与牌组
仲間・レリック|Travelers & Relics|同伴与遗物
旅・施設|Journey & Facilities|旅程与设施
報酬・記録|Rewards & Records|奖励与记录
カード・強化|Cards & Upgrades|卡牌与强化
旅の仕組み|Journey Systems|旅程机制
HP・最大HP|HP & Max HP|HP与最大HP
戦闘不能・復帰|Fallen & Revival|倒下与复活
気力・コスト|Energy & Cost|能量与费用
行動予告|Enemy Intent|行动预告
盾（シールド）|Shield|护盾
浄化・解毒|Cleanse & Detoxify|净化与解毒
挑発・攻撃を向ける|Taunt & Redirect|嘲讽与转移攻击
盾無視・盾破壊|Ignore & Destroy Shield|无视护盾与破盾
連撃・多段攻撃|Multi-Hit Attacks|连击与多段攻击
全体攻撃・全体効果|Area Attacks & Effects|群体攻击与全体效果
HP消費・代償|HP Costs & Drawbacks|HP消耗与代价
次ターンの気力・手札|Next-Turn Energy & Draw|下回合能量与抽牌
ドロー・引く|Draw|抽牌
デッキ・固有カード|Deck & Unique Cards|牌组与专属卡
妨害カード・焦燥|Hindrance Cards & Agitation|干扰卡与焦躁
強化・ランダム強化|Upgrades & Random Upgrades|强化与随机强化
強化の種類|Upgrade Types|强化种类
希少強化・不利益の軽減|Rare Upgrades & Drawback Relief|稀有强化与负面减轻
攻撃・守備・回復・策略|Attack, Defense, Healing & Skill|攻击、防守、治疗与策略
固有能力・パッシブ|Passive Abilities|固有能力与被动
加入・交代・脱退|Recruit, Replace & Depart|加入、替换与离队
レリック・遺物|Relics|遗物
レリック候補の一巡|Relic Offer Cycle|遗物候选循环
銀貨・G|Silver & G|银币与G
祝福の宿場・安全強化|Blessing Waystation & Safe Upgrades|祝福驿站与安全强化
行商人・ショップ|Merchant & Shop|行商与商店
鍛冶場|Forge|锻冶场
未知の道・ランダムマス|Unknown Paths & Random Locations|未知道路与随机地点
強敵・強敵化|Elites & Elite Encounters|精英与精英化
章の主・第二形態|Sovereigns & Phase Two|领主与第二形态
先制殲滅・1ターン撃破|First-Turn Victory|先发歼灭与首回合击破
自動保存・手動記録|Autosave & Manual Saves|自动与手动存档
序幕・幕間・終幕|Prologue, Interludes & Epilogue|序幕、幕间与终幕
敵の判断|Enemy Decisions|敌方判断
強化済み希少カード|Rare Upgraded Cards|已强化稀有卡
増援|Reinforcements|增援
サイコロ|Dice|骰子
乱数・ラン|Randomness & Runs|随机数与单次旅程
HPが0になると戦闘不能。|At 0 HP, a traveler falls.|HP归零时无法战斗。
戦闘不能の仲間のカードは使えません。|Fallen travelers' cards cannot be played.|倒下同伴的卡牌无法使用。
カード左上の数だけ気力を消費。|Spend Energy equal to the top-left number.|消耗卡牌左上角数字所示的能量。
敵の頭上にターン終了後の行動を表示。|Actions after End Turn appear above enemies.|敌人头顶显示结束回合后将执行的行动。
ダメージを数値分だけ防ぎます。|Blocks damage equal to its value.|按数值抵挡伤害。
持ち主の攻撃カードの威力を増やします。|Increases the owner's attack card damage.|提高持有者攻击卡的伤害。
盾を無視してHPを減らす継続効果。|Ongoing HP loss that ignores Shield.|无视护盾持续减少HP。
攻撃を受けたときダメージ+4。|Take +4 damage when hit by an attack.|受到攻击时伤害+4。
敵の攻撃1ヒットにつき、被ダメージ+3。|Take +3 damage per enemy attack hit.|敌方攻击每次命中时受到伤害+3。
通常敵の次の行動を止めます。|Stops a normal enemy's next action.|阻止普通敌人的下次行动。
自分のターン開始時にHPを回復。|Restores HP at the start of your turn.|在你的回合开始时恢复HP。
攻撃を受けるたびに攻撃者へ直接ダメージ。|Deals direct damage to an attacker after each hit.|每次受到攻击时，直接伤害攻击者。
対象の毒と脆弱を取り除きます。|Removes Poison and Vulnerable from the target.|移除目标的中毒与易伤。
敵の単体攻撃の対象を使用者へ変更。|Redirects enemy single-target attacks to the user.|将敌方单体攻击转向使用者。
盾を越えて攻撃する効果。|Attacks through or removes Shield.|越过或移除护盾的攻击效果。
「5×2」は威力5の攻撃を2回。|5×2 means two hits of 5 damage.|「5×2」代表2次威力5的攻击。
現在生存している対象全員へ効果。|Affects all currently living targets.|对当前全部存活目标生效。
使用者のHPを直接減らします。|Directly reduces the user's HP.|直接减少使用者HP。
次の自分のターン開始時に追加。|Added at the start of your next turn.|在你的下回合开始时增加。
山札から手札へカードを移します。|Moves cards from the draw pile into your hand.|将卡牌从抽牌堆移至手牌。
カードは1人の仲間に所属します。|Each card belongs to one traveler.|每张卡属于1位同伴。
使ったカードとターン終了時の手札の行き先。|Holds played cards and cards left at turn end.|存放用过的卡牌与回合结束时剩余手牌。
その戦闘が終わるまで再使用不可。|Cannot be reused until the next battle.|本场战斗结束前无法再次使用。
永久デッキからカードを1枚取り除きます。|Removes 1 card from the permanent deck.|从永久牌组移除1张卡。
敵が戦闘の山札に混入させるカード。|Cards enemies add to your battle draw pile.|敌人混入战斗抽牌堆的卡牌。
同じカードを最大3回強化できます。|The same card can be upgraded up to 3 times.|同一张卡最多强化3次。
威力・コスト・循環・代償などが変化。|Changes damage, cost, draw, drawbacks and more.|改变威力、费用、循环、代价等。
実際に不利益のあるカードだけが対象。|Only applies to cards with actual drawbacks.|仅适用于确有负面效果的卡牌。
カードの主な効果による分類。|Classified by a card's main effect.|根据卡牌主要效果分类。
操作せず自動で発動する、仲間固有の能力。|A traveler's unique ability that activates automatically.|同伴自动触发的专属能力。
同じターンに3人それぞれが1回以上カードを使用。|Each of 3 travelers plays at least 1 card in a turn.|同回合3位旅人各至少使用1张卡。
加入は最大3人、満員なら交代相手を選択。|Up to 3 travelers. Choose a replacement when full.|最多3人，满员时选择替换对象。
持っているだけで自動的に効果を発揮。|Effects apply automatically while owned.|持有即自动生效。
強い恩恵と大きな代償を併せ持つ遺物。|Relics with powerful benefits and major drawbacks.|兼具强大恩惠与重大代价的遗物。
提示された候補は未提示を優先する間は再登場しません。|Previously offered relics wait while unseen ones remain.|未展示候选优先期间，已展示者不会再次出现。
気力を使わずHP24回復、戦闘不能ならHP18で復帰。|Restores 24 HP for no Energy, or revives with 18 HP.|不消耗能量恢复24 HP，倒下者以18 HP复活。
目的地への移動で基本2消費。|Traveling to a location normally costs 2.|移动到地点通常消耗2。
ショップや施設で使う通貨。|Currency used in shops and facilities.|商店与设施使用的货币。
中間の6地点目に必ず通る、恩恵の合流地点。|All routes meet at location 6 for a blessing.|在必经的第6中途地点汇合并获得恩惠。
休息・カード強化・灯油補給の1つを選択。|Choose rest, a card upgrade or fuel.|选择休息、卡牌强化或灯油补给。
買い物とカードの整理ができる施設。|A place to shop and manage your deck.|购买物品与整理牌组的设施。
通常35Gでカードを1回強化。|Normally 35 G for 1 card upgrade.|通常花费35 G强化卡牌1次。
HPを捧げてレリック、または銀貨で回復。|Offer HP for a relic, or spend silver to heal.|献出HP求取遗物，或花银币治疗。
幸運にも災難にもなる未確定の地点。|An unknown location with fortune or disaster.|可能带来幸运或灾难的未知地点。
通常より強い敵との戦闘。|Battle against stronger enemies.|对抗更强敌人的战斗。
各章の最後に待つ強大な敵。|A powerful enemy at each chapter's end.|各章末尾等待的强大敌人。
1ターン目、敵が行動する前に全滅させると追加報酬。|Earn bonus rewards by winning on turn 1 before enemies act.|在第1回合敌人行动前全灭敌人可获额外奖励。
行動ごとにブラウザ内へ旅全体を保存。|Saves the whole journey in this browser after every action.|每次行动后将完整旅程保存在浏览器中。
物語は3枚の紙芝居で進みます。|The story unfolds in 3 illustrated scenes.|故事通过3幅绘本画面推进。
行動は固定順ではなく状況に応じて変わります。|Actions adapt to the situation.|行动根据局势变化。
同じ旅人の2枚を両方の効果を持つ1枚へ。|Fuse 2 cards from one traveler into 1 with both effects.|将同旅人的2张卡合为兼具两者效果的1张卡。
16の土地を繰り返し倒れるまで進む。|Repeat 16 lands until the caravan falls.|循环16片土地，直至倒下。
出発時に選んだ旅人はこのラン中交代できません。|Your starting traveler cannot be replaced this run.|本次旅程中首位旅人无法替换。
旅人ごとに10種類。隊商全体で1枚まで。|10 types per traveler. Only 1 across the caravan.|每位旅人10种，整个商队最多1张。
低確率で強化を1〜2回済ませた状態で出現。|Rarely appears with 1–2 upgrades already applied.|低概率以已强化1至2次的状态出现。
場に最大3体。呼ばれた敵は次のターンから行動。|Up to 3 enemies. Summoned enemies act next turn.|场上最多3名敌人。召唤的敌人从下回合行动。
出目に応じてカードの追加効果が変わる。|The roll changes a card's bonus effect.|额外卡牌效果随骰子点数变化。
出発から勝利または全滅までが1ラン。|One run lasts from departure to victory or defeat.|从出发至胜利或全灭算作一次旅程。
`));

registerTranslations([["コストを必ず1下げる（最低0）。", "Always reduce cost by 1, to a minimum of 0.", "费用必定降低1，最低为0。"], ["ドロー効果を必ず1増やす。", "Always add 1 card drawn.", "抽牌效果必定增加1。"], ["自身の闘志を必ず2増やす。", "Always add 2 Might for the user.", "自身斗志必定增加2。"], ["自身への盾を必ず6増やす。", "Always add 6 Shield for the user.", "自身护盾必定增加6。"], ["自身への回復を必ず6増やす。", "Always add 6 healing for the user.", "自身回复必定增加6。"], ["仲間全員への盾を必ず4増やす。", "Always add 4 Shield for all allies.", "全体友军护盾必定增加4。"], ["仲間全員への回復を必ず4増やす。", "Always add 4 healing for all allies.", "全体友军回复必定增加4。"], ["敵全員への毒を必ず2増やす。", "Always add 2 Poison for all enemies.", "全体敌人中毒必定增加2。"], ["敵全員への弱点を必ず1増やす。", "Always add 1 Weakness for all enemies.", "全体敌人破绽必定增加1。"], ["敵全員への足止めを必ず1増やす。", "Always add 1 Stun for all enemies.", "全体敌人眩晕必定增加1。"], ["気力獲得を必ず1増やす。", "Always add 1 Energy gained.", "能量获取必定增加1。"], ["次ターンの気力を必ず1増やす。", "Always add 1 Energy next turn.", "下回合能量必定增加1。"], ["次ターンの手札を必ず1増やす。", "Always draw 1 more card next turn.", "下回合抽牌必定增加1。"], ["仲間全員の闘志を必ず1増やす。", "Always add 1 Might for all allies.", "全体友军斗志必定增加1。"], ["自身の毒・脆弱を除去する効果を必ず付ける。", "Always add an effect that removes Poison and Vulnerable from the user.", "必定添加清除自身中毒与易伤的效果。"], ["盾を無視する効果を必ず付ける。", "Always add Shield piercing.", "必定添加无视护盾效果。"], ["敵の盾を全破壊する効果を必ず付ける。", "Always add an effect that destroys enemy Shield.", "必定添加摧毁敌方全部护盾的效果。"], ["攻撃回数を必ず1増やす。", "Always add 1 attack hit.", "攻击次数必定增加1。"], ["攻撃の基礎威力を必ず6増やす。", "Always add 6 base attack damage.", "攻击基础伤害必定增加6。"], ["消滅を必ず取り除く。", "Always remove Exhaust.", "必定移除消耗。"], ["自身のHP消費を必ず3減らす（最低0）。", "Always reduce the user’s HP cost by 3, to a minimum of 0.", "自身HP消耗必定降低3，最低为0。"], ["自身に付く毒・脆弱を必ず2減らす（最低0）。", "Always reduce self-inflicted Poison and Vulnerable by 2, to a minimum of 0.", "自身附加的中毒与易伤必定降低2，最低为0。"], ["銀貨獲得を必ず8増やす。", "Always add 8 silver gained.", "银币获取必定增加8。"], ["仲間全員への再生を必ず1増やす。", "Always add 1 Regeneration for all allies.", "全体友军再生必定增加1。"], ["性能をそのまま保ち、使用済みの強化ポイントを1戻す。", "Preserve all effects and refund 1 spent upgrade point.", "保留全部性能，返还1点已用强化点数。"], ["3つの恩恵から効果を選び、付与するカードを選ぶ。", "Choose 1 of 3 effects, then choose the card that receives it.", "从3项效果中选择1项，再选择接受效果的卡牌。"], ["選んだ効果は必ず付き、追加の効果・代償はランダム。通常は強化ポイント+1。コストは0未満になりません。記憶を残す水鏡は強化済みカードの性能を保ち、強化ポイントを1戻します。この場合はポイントを使わず0ポイントのカードは選べません。", "The chosen effect is guaranteed; extra effects and drawbacks are random. Normally spends 1 upgrade point. Cost cannot fall below 0. The Mirror of Memory instead preserves all effects and refunds 1 spent point; cards with no spent points are ineligible.", "所选效果必定生效，额外效果和代价随机。通常已用强化点数+1，费用不会低于0。留忆水镜则保留全部效果并返还1点已用强化点数，不消耗新点数，未使用强化点数的卡牌不可选。"]]);

const lakeNames=[['軽やかな一手','A Lighter Hand','轻盈之手'],['知恵の水面','Waters of Wisdom','智慧水面'],['戦意の波紋','Ripples of Resolve','战意涟漪'],['護りの水鏡','Mirror of Protection','守护水镜'],['慈愛の雫','Drops of Mercy','慈爱之滴'],['湖面の防壁','Wall of the Lake','湖面防壁'],['癒しの雨','Healing Rain','治愈之雨'],['翠の毒露','Emerald Venom','翠绿毒露'],['真実のさざ波','Ripples of Truth','真相微波'],['凍てつく静寂','Frozen Stillness','冰封寂静'],['湧き上がる活力','Welling Vitality','涌动活力'],['明日への潮','Tomorrow’s Tide','明日之潮'],['未来の水影','Reflection of Tomorrow','未来水影'],['湖畔の誓い','Oath by the Lake','湖畔誓言'],['清澄な泉','Clear Spring','清澈之泉'],['水穿つ刃','Water-Piercing Blade','穿水之刃'],['崩れる水鏡','Shattered Water Mirror','破碎水镜'],['幾重もの波','Layered Waves','层层波浪'],['深淵の一撃','Abyssal Strike','深渊一击'],['尽きぬ水脈','Endless Spring','不竭水脉'],['軽くなる代償','A Lighter Price','减轻代价'],['ほどける呪縛','Unraveling Curse','解除咒缚'],['銀の泉','Silver Spring','白银之泉'],['巡る生命','Circling Life','循环生命'],['記憶を残す水鏡','Mirror of Memory','留忆水镜'],['湖の女神','Lady of the Lake','湖中女神']];registerTranslations(lakeNames);

registerTranslations([['（切り捨て）',' (rounded down)','（向下取整）']]);

rule(/出目合計×([\d.]+)（上の数値に反映・切り捨て）/g,(_,n)=>`total roll ×${n} (included above; rounded down)`,(_,n)=>`点数总和×${n}（已计入上方数值，向下取整）`);
registerTranslations([['レリックの代償','Relic drawback','遗物代价'],['策略で追加','Extra from a skill','策略额外'],['毒の付与で追加','Extra from applying poison','施毒额外'],['消滅カードで気力','Energy from exhaust','消耗卡获得能量'],['盾・弱点を適用','Shield and weakness apply','适用护盾和弱点'],['全快または回復制限','Full HP or healing restricted','已满血或治疗受限'],['現在のレリック効果を反映した回復後のHPを下に表示します。戦闘不能の仲間はHP18で復帰します。','The HP after healing below includes current relic effects. Fallen allies revive with18 HP.','下方恢复后的HP已计入当前遗物效果。倒下的同伴以18 HP复归。']]);

registerTranslations([['外部の音楽・動画を優先','Prioritize external music and videos','优先外部音乐和视频'],['外部の音楽・動画を優先中（ゲーム音声OFF）','External playback priority (game audio off)','外部播放优先（游戏音频关闭）'],['ゲーム音声を開始せず別で再生している音楽や動画を妨げません。','Game audio stays off so your other music and videos can keep playing.','不启动游戏音频，避免打断其他正在播放的音乐或视频。'],['ゲームのBGM・効果音を使用します。端末によっては外部の再生が止まる場合があります。','Use game music and sound effects. This may interrupt external playback on some devices.','使用游戏音乐和音效。某些设备可能会中断外部播放。'],['ゲーム音声を選択しました。画面操作で再生します','Game audio selected. Interact to start playback.','已选择游戏音频，操作画面后开始播放。']]);

registerTranslations(rows(`
強化するカードを選んでください。確定前に効果と費用を確認できます。|Choose a card to upgrade. Review its effects and price before confirming.|请选择要强化的卡牌。确认前可以查看效果与费用。
不利益を増やさずに強化します。|Upgrade without adding drawbacks.|强化不会增加负面效果。
強化前後の効果を確認してください。|Compare the effects before and after upgrading.|请比较强化前后的效果。
この強化はキャンセルできません。必ず1枚を選んでください。|This upgrade cannot be cancelled. Choose one card.|本次强化不能取消。请选择一张卡牌。
カードと遺物を組み合わせ、あなただけの戦い方を。|Find your own strategy with cards and relics.|组合卡牌与遗物，创造属于你的战斗方式。
レリックとの出会い|Discovering Relics|发现遗物
旅の途中でさまざまな遺物と出会います。|Discover different relics along your journey.|旅途中会发现各式遗物。
強力な切り札。隊商全体で1枚まで。|A powerful trump card. Carry only one across the caravan.|强力王牌。整个商队最多持有一张。
旅の節目に描かれる物語。|Stories at the turning points of your journey.|描绘旅途重要时刻的故事。
ラン・ひとつの旅|Run / Journey|一次旅途
`));

rule(/次の強化：(\d+) G/g,(_,n)=>`Next upgrade: ${n} G`,(_,n)=>`下次强化：${n} G`);

registerTranslations(rows(`
図鑑|Encyclopedia|图鉴
旅の図鑑|Caravan Encyclopedia|旅途图鉴
図鑑の詳細|Encyclopedia Entry|图鉴详情
図鑑の一覧へ|Back to Encyclopedia|返回图鉴列表
キャラ|Travelers|旅人
カード|Cards|卡牌
敵|Enemies|敌人
ボス|Bosses|首领
見つけた項目を検索|Search discovered entries|搜索已发现的条目
発見済みのみ|Discovered only|仅已发现
未解放の項目|Undiscovered entry|未发现的条目
基本の効果|Base Effects|基础效果
物語|Lore|故事
恩恵|Benefits|恩惠
旅の中で出会うと記録されます。|Discover this entry during your journey.|旅途中发现后会记录于此。
光っているマスを押すと移動します。|Tap a glowing location to travel.|点击发光的地点即可前往。
現在地と道を確認できます。|Review your location and routes.|可查看当前位置与路线。
地図アイコンの説明|Map Legend|地图图例
`));

registerTranslations([["最後の灯を託され、夜の道へ踏み出した守り手。","Entrusted with the last lantern, a guardian steps into the night.","受托守护最后的灯火，踏入漫漫夜路的守护者。"],["星の消えた夜にも弓を引く指は行き先を忘れない。","Even without stars, the fingers drawing the bow remember the way.","纵使繁星消失，拉弓的手仍记得前路。"],["旅の鞄には薬瓶とまだ誰も知らない処方箋。","A traveling bag holds medicine bottles and recipes no one has yet discovered.","行囊中装着药瓶，以及尚无人知晓的药方。"],["朽ちた門を離れた衛士。その盾には帰りを待つ街の紋が残る。","A guard leaves a ruined gate, carrying the crest of a city awaiting his return.","离开残破城门的卫士，盾上仍留着故城的纹章。"],["灰の街で刃を磨き、失われた朝を探す旅人。","A blade honed in the city of ash, carried in search of a lost dawn.","在灰烬之城磨砺刀锋，寻找失落清晨的旅人。"],["霧の向こうで獲物を追い、誰より静かに仲間の帰路を守る。","A quiet hunter follows the mist and watches over the road home.","循着雾追踪猎物，静静守护同伴的归途。"],["迷った星の名を数えながらまだ空にない明日を占う。","Counting lost stars, a seer divines a tomorrow not yet written in the sky.","细数迷失的星辰，占卜尚未写入天空的明日。"],["巡礼路に置かれた薬袋にはいつも誰かのための一瓶がある。","A medicine pouch beside the pilgrim road always holds a bottle for someone else.","巡礼路旁的药袋中，总留着为他人准备的一瓶药。"],["小さな硝子瓶に消えてしまった故郷の香りを集めている。","Small glass bottles preserve the scent of a homeland that vanished.","将消逝故乡的气息，收集在小小的玻璃瓶中。"],["失った店を建て直す日まで銀貨の音だけを道標に剣を振る。","Until the lost shop is rebuilt, the sound of silver guides his sword.","在重建失去的店铺之前，以银币的响声为路标挥剑。"],["六つの目に六つの明日。どれが出ても笑えるように賽を握る。","Six faces, six tomorrows. The dice are held with a smile ready for any result.","六面骰子，六种明日。握住骰子，微笑着迎接任何点数。"],["崩れた城壁の石を一つ携え、次の誰かの居場所を築こうとしている。","A stone from a fallen wall is carried toward a new shelter for someone else.","携着坍塌城墙的一块石头，为后来者筑起新的居所。"],["焼け残った紙に夜の向こうへ消えた人々の名を綴る。","On pages spared by fire, a scribe records the names lost beyond the night.","在劫后残存的纸页上，写下消失于长夜的人们之名。"],["白刃に映るのは敵の姿ではなく果たせなかったひとつの約束。","A white blade reflects an unfulfilled promise rather than an enemy.","白刃映出的并非敌人，而是未能兑现的约定。"],["誰も近づかない毒の庭で最初に咲いた花を覚えている。","In a garden others fear, the first flower to bloom is never forgotten.","在无人敢接近的毒园中，始终记得第一朵盛开的花。"],["灯が尽きた夜を二度と見たくなくて壊れた機関を直し続ける。","Broken engines are repaired so no one must see another night without light.","不停修复破损机关，只愿无人再度面对灯火耗尽的夜。"],["散らばった紙片をつなげば失われた物語の結末が読めるという。","Join the scattered scraps, and perhaps the ending of a lost tale can be read.","据说拼起散落纸片，就能读到失落故事的结局。"],["冷たい手を温めるために旅へ出た。今もその祈りは変わらない。","The journey began to warm a cold hand. That prayer has never changed.","为温暖冰冷的双手踏上旅途，那份祈愿从未改变。"],["落とし物を拾うたびに持ち主の帰り道を少しだけ探してしまう。","Every lost object invites a search for the road its owner might take home.","每拾起一件失物，总会寻找失主可能的归途。"],["緋色の瞳は傷の奥に隠された、生き延びるための道を見つける。","Scarlet eyes find a path to survival hidden within old wounds.","绯色双眼能从伤痕深处，发现生存的道路。"],["雪に埋もれた里の鐘を春の来ない巡礼路へ運んでいる。","A bell from a snowbound village travels a road that has forgotten spring.","带着雪埋故乡的钟，行走在春天不再到来的路上。"],["夜に響く太鼓の音。その続きを聞くために仲間はもう一歩進める。","A drumbeat in the night gives companions the courage for one more step.","夜中响起的鼓声，鼓舞同伴再向前一步。"],["忘れられた歌を口ずさむ。誰かがその続きを覚えていると信じて。","Forgotten songs are sung in the hope that someone remembers the next verse.","轻唱被遗忘的歌，相信仍有人记得后续的旋律。"],["墓標のない場所に灯を置き、夜が静まるまでそばに立つ。","A lantern is left where no gravestone stands, watched until the night grows still.","在没有墓碑的地方留下灯火，静守至长夜安息。"],["切れた糸を結び直す指は人と人との縁にも同じように優しい。","Fingers that mend broken strings are just as gentle with the bonds between people.","修补断线的手，对人与人之间的羁绊也同样温柔。"],["風の音に故郷の声を探し足跡を残さず長い夜を越えてきた。","Searching the wind for a familiar voice, a wanderer crosses the night without footprints.","在风声中寻找故乡的声音，不留足迹地越过长夜。"],["灰になっても消えない火を守る。その熱だけが帰る場所を知っている。","A flame that survives even ash remembers the way home.","守护化作灰烬也不会熄灭的火，唯有其温度记得归途。"],["波のない岸辺で祈った日から遠い潮騒が耳を離れない。","Since a prayer on a shore without waves, distant tides have never fallen silent.","自从在无浪岸边祈祷，遥远潮声便再未离开耳畔。"],["旅人がまた歩けるように夜ごと炉に小さな火を入れる。","Each night a small fire is lit in the forge so travelers may walk again.","每夜在炉中点起小火，只愿旅人能再次前行。"],["割れた鏡の中にも守りたい誰かの姿はまだ映っている。","Even a broken mirror can still reflect someone worth protecting.","破碎的镜中，仍映着值得守护的身影。"],["長い夜の果てで誰かが守り続けた黎明を継ぐ者。","Beyond the long night, a traveler inherits the dawn someone kept alive.","在漫漫长夜尽头，继承他人始终守护的黎明。"]]);

registerTranslations([['外部の音楽・動画とゲーム音声を同時に再生します。端末やブラウザによっては同時再生できない場合があります。','Mix game audio with external music and videos. Simultaneous playback may not be supported on every device or browser.','同时播放外部音乐、视频与游戏音频。部分设备或浏览器可能不支持同时播放。']]);

registerTranslations([
 ['加入時のカード','Cards on joining','加入时的卡牌'],['の追加カード',"’s joining cards",'的加入卡牌'],['加入すると次のカードが合計','Joining adds these cards: ','加入后将以下卡牌共计'],['枚デッキに加わります。',' cards in total.','张加入牌组。'],['加入画面に戻る','Back to recruitment','返回招募'],['追加されるカードを確認','View joining cards','查看加入卡牌'],['追加カードを見る','View joining cards','查看加入卡牌'],['加入を見送って進む','Continue without recruiting','跳过招募并继续'],['空席に迎える仲間を選べます。加入を見送ることもできます。','Choose a traveler for the open slot, or continue without recruiting.','可以选择旅人填补空位，也可以跳过招募。']
]);

registerTranslations([
 ['現在のレリック効果を反映した回復後のHPを下に表示します。戦闘不能の仲間には使用できません。','The HP after healing below includes current relic effects. Potions cannot be used on fallen allies.','下方恢复后的HP已计入当前遗物效果。无法对倒下的同伴使用恢复药。'],
 ['戦闘不能（回復薬は使用不可）','Fallen (cannot use a potion)','战斗不能（无法使用恢复药）'],['生存中の仲間のHPを、気力を使わず24回復。','Restores 24 HP to a living ally without spending Energy.','不消耗能量，为存活同伴恢复24 HP。'],['戦闘不能・満タンの仲間と空席には使用できません。','Cannot be used on fallen allies, allies at full HP, or empty slots.','无法对倒下、满血的同伴或空位使用。'],['回復薬と通常の回復カードは戦闘不能を治せず、','Potions and normal healing cards cannot revive fallen allies; ','恢复药与普通治疗卡无法复活倒下的同伴，']
]);

registerTranslations([['まおう','Maou','魔王酱'],['からっぽの王','Hollow King','空虚之王'],['元の持ち主ごとに最初の1枚で気力+1（1ターン10回まで）　同じ持ち主の2枚目からはコスト+2','The first card from each original owner restores 1 Energy (up to 10 per turn). Further cards from the same owner cost +2','每位原持有者的第一张牌恢复1点能量（每回合最多10次）　同一持有者的第二张起费用+2'],['このターン同じ持ち主のカードを使ったのでコスト+2','Cost +2: a card from this owner was already played this turn','本回合已使用同一持有者的牌，费用+2'],['パスワード','Password','密码'],['パスワードを入力','Enter Password','输入密码'],['パスワードが違います。','Wrong password.','密码错误。'],['決定','OK','确定']]);
