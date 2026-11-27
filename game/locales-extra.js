// 追加の翻訳（英語・中国語の見直し分と、韓国語の基本UI）
import {registerTranslations,registerTemplates,translateText,templateFirst} from './locales.js?v=52';
import {COMPANIONS} from './catalog.js?v=52';
const rows=s=>s.trim().split('\n').filter(Boolean).map(line=>line.split('|'));

// 数値入りの定型文：N が数値、{1}{2}… が訳文での位置
const scaleSrc=[['デッキN枚','every {1} cards in your deck','卡组每{1}张','덱 {1}장마다'],['強化済みカードN枚','every {1} upgraded cards','每{1}张已强化卡牌','강화된 카드 {1}장마다'],['所持レリックN個','every {1} relics you hold','每持有{1}件遗物','유물 {1}개마다'],['所持銀貨N枚','every {1} silver you hold','每持有{1}银币','은화 {1}개마다'],['戦闘中の消滅札N枚','every {1} cards exhausted this battle','本场战斗每消耗{1}张牌','이번 전투에서 소멸한 카드 {1}장마다'],['捨札N枚','every {1} cards in the discard pile','弃牌堆每{1}张','버린 카드 {1}장마다']];
const scaleDst=[['攻撃威力','Attack damage','攻击伤害','공격 피해'],['カードで得る盾','Shield from cards','卡牌获得的护盾','카드로 얻는 방패'],['戦闘開始時の盾','Shield at battle start','战斗开始时的护盾','전투 시작 시 방패'],['回復カードの回復量','Healing from cards','治疗卡恢复量','회복 카드 회복량'],['付与する毒','Poison applied','施加的中毒','부여하는 독'],['戦闘の銀貨報酬','Battle silver reward','战斗银币奖励','전투 은화 보상']];
const tpl=[];
for(const [sj,se,sz,sk] of scaleSrc)for(const [dj,de,dz,dk] of scaleDst)tpl.push([`${sj}につき${dj}+N（最大+N）`,`${de} +{2} for ${se} (max +{3})`,`${sz}，${dz}+{2}（最多+{3}）`,`${sk} ${dk} +{2} (최대 +{3})`],[`${sj}につき、${dj}+N（最大+N）`,`${de} +{2} for ${se} (max +{3})`,`${sz}，${dz}+{2}（最多+{3}）`,`${sk} ${dk} +{2} (최대 +{3})`]);
tpl.push(
 ['攻撃カードを使うたびに使用者のHP-N','Each Attack card costs its user {1} HP','每使用攻击卡，使用者HP-{1}','공격 카드를 쓸 때마다 사용자 HP -{1}'],
 ['第Nステージまで踏破する','Reach stage {1}','抵达第{1}关','{1}스테이지까지 돌파'],
 ['Nの倍数ターンに手札+N','Draw {2} extra cards every {1} turns','每逢{1}的倍数回合，手牌+{2}','{1}의 배수 턴마다 손패 +{2}'],
 ['累計N回戦闘に勝利する','Win {1} battles in total','累计赢得{1}场战斗','전투에서 총 {1}번 승리'],
 ['累計N回先制殲滅する','Win in the first turn {1} times in total','累计{1}次首回合全歼','첫 턴 섬멸 총 {1}번'],
 ['N回の旅でレリックをN個所持する','Hold {2} relics in a single run','单次旅程中持有{2}件遗物','한 번의 여정에서 유물 {2}개 보유'],
 ['回復カード・回復薬の回復量がN%減る','Healing from cards and potions is reduced by {1}%','治疗卡与回复药的恢复量减少{1}%','회복 카드와 회복약의 회복량 {1}% 감소'],
 ['累計N回ボスを倒す','Defeat bosses {1} times in total','累计击败首领{1}次','보스를 총 {1}번 처치'],
 ['累計N回以上の銀貨をカードで消費する','Spend {1} or more silver through cards in total','累计通过卡牌消耗{1}以上银币','카드로 은화를 총 {1} 이상 소비'],
 ['毎ターンの手札+N','Draw {1} extra cards each turn','每回合手牌+{1}','매 턴 손패 +{1}'],
 ['第Nステージ後の魔王を討伐する','Defeat the Demon King after stage {1}','击败第{1}关后的魔王','{1}스테이지 이후의 마왕 토벌'],
 ['逃げる前に倒すと銀貨・回復薬・通常レリックN択・カード候補+Nを得られます','Defeat it before it flees to earn silver, a potion, a choice of {1} relics, and {2} extra card choice','在其逃跑前击倒，可获得银币、回复药、{1}选1普通遗物与+{2}张卡牌候选','도망치기 전에 쓰러뜨리면 은화·회복약·일반 유물 {1}택 1·카드 후보 +{2}을 얻습니다']
);
registerTemplates(tpl);

registerTranslations(rows(`
幾度もの夜を越えてもここだけは世界の外側にある|No matter how many nights pass, this place stands outside the world|无论越过多少个夜晚，唯有这里身处世界之外|수많은 밤을 넘어도 이곳만은 세계 바깥에 있다
森は道を覚えている|The forest remembers the road|森林记得道路|숲은 길을 기억한다
帰らなかった巡礼者の足音まで|Even the footsteps of pilgrims who never returned|连未曾归来的巡礼者的脚步声也记得|돌아오지 못한 순례자의 발소리까지
沈んだ祈りが霧にほどけ、忘れられた聖堂をさまよう|Sunken prayers unravel into mist and wander the forgotten cathedral|沉没的祈祷化作雾气，在被遗忘的圣堂中徘徊|가라앉은 기도가 안개로 풀려 잊힌 성당을 떠돈다
沈んだ祈りが霧にほどけ忘れられた聖堂をさまよう|Sunken prayers unravel into mist and wander the forgotten cathedral|沉没的祈祷化作雾气，在被遗忘的圣堂中徘徊|가라앉은 기도가 안개로 풀려 잊힌 성당을 떠돈다
王都の火は消えた|The fires of the capital have gone out|王都的火焰已经熄灭|왕도의 불은 꺼졌다
それでも灰の下では古い命令が燃えている|Yet beneath the ash, old orders still burn|然而灰烬之下，古老的命令仍在燃烧|그래도 재 아래에서는 오래된 명령이 타오른다
夜空に縫いつけられた影|A shadow stitched to the night sky|被缝在夜空上的影子|밤하늘에 꿰매어진 그림자
星のない方角からやって来た|It came from a direction with no stars|它来自没有星辰的方向|별 없는 방향에서 찾아왔다
氷の奥に閉じ込められた息が誰かの灯を探している|A breath sealed deep in the ice searches for someone's flame|封在冰层深处的气息，正在寻找某人的灯火|얼음 깊이 갇힌 숨결이 누군가의 등불을 찾고 있다
朽ちた森には花の代わりに失われた夢が芽吹く|In the rotting forest, lost dreams sprout instead of flowers|腐朽的森林里，萌发的不是花，而是失落的梦|썩은 숲에는 꽃 대신 잃어버린 꿈이 싹튼다
砂は墓標を隠しても埋められた名までは忘れない|The sand may hide the gravestones, but never the names beneath|黄沙能掩埋墓碑，却忘不了埋下的名字|모래는 묘비를 숨겨도 묻힌 이름까지는 잊지 않는다
止まったはずの機関が持ち主のいない街を歩き続ける|Engines that should have stopped keep walking through an ownerless city|本应停转的机器，仍在无主的街道上行走|멈췄어야 할 기관이 주인 없는 거리를 계속 걷는다
赤い葦の間からもう戻らない人を呼ぶ声がする|From the red reeds, a voice calls for someone who will never return|赤色芦苇间，传来呼唤不归之人的声音|붉은 갈대 사이로 돌아오지 않을 사람을 부르는 목소리가 들린다
禁じられた書架の影|A shadow of the forbidden shelves|禁忌书架的影子|금지된 서가의 그림자
最後の頁だけがまだ書き終わっていない|Only the final page remains unwritten|只有最后一页尚未写完|마지막 페이지만이 아직 다 쓰이지 않았다
骨だけになった大地で太古の誇りは今も眠らない|On land worn down to bone, ancient pride still does not sleep|在只剩白骨的大地上，远古的骄傲至今未眠|뼈만 남은 대지에서 태고의 긍지는 지금도 잠들지 않는다
嵐の向こうで生まれた影|A shadow born beyond the storm|诞生于风暴彼岸的影子|폭풍 너머에서 태어난 그림자
雷が光るときだけ、その輪郭が見える|Its outline appears only when lightning flashes|唯有雷光闪过之时，才能看见它的轮廓|번개가 칠 때만 그 윤곽이 보인다
雷が光るときだけその輪郭が見える|Its outline appears only when lightning flashes|唯有雷光闪过之时，才能看见它的轮廓|번개가 칠 때만 그 윤곽이 보인다
鏡に置き去りにされたものがこちら側の温もりを欲しがっている|Something left behind in the mirror longs for the warmth on this side|被遗留在镜中的东西，渴望着这一侧的温暖|거울에 남겨진 것이 이쪽의 온기를 탐내고 있다
落ちた星の欠片には地上のものではない夜が宿る|A night not of this earth lives within the fallen star's shard|坠落星辰的碎片里，栖宿着不属于大地的夜|떨어진 별의 조각에는 지상의 것이 아닌 밤이 깃들어 있다
時を忘れた修道院で終わらない一秒を歩いている|It walks an endless second in a monastery that forgot time|在遗忘了时间的修道院里，走着永不结束的一秒|시간을 잊은 수도원에서 끝나지 않는 일 초를 걷고 있다
暁を待ちすぎた魂|A soul that waited too long for dawn|等待黎明太久的灵魂|새벽을 너무 오래 기다린 영혼
差し出された灯さえ、沈む太陽に見える|Even an offered flame looks like a setting sun|就连递来的灯火，也像是西沉的太阳|건네받은 등불조차 지는 해처럼 보인다
差し出された灯さえ沈む太陽に見える|Even an offered flame looks like a setting sun|就连递来的灯火，也像是西沉的太阳|건네받은 등불조차 지는 해처럼 보인다
夜の道に残された影|A shadow left on the night road|遗留在夜路上的影子|밤길에 남겨진 그림자
遠い灯だけを見つめている|It gazes only at a distant flame|它只凝望着远方的灯火|먼 등불만을 바라보고 있다
地に埋めた古い王冠から今も帰らぬ春を待つ声がする|From an old crown buried in the earth, a voice still waits for a spring that never returns|从埋入地下的古老王冠中，仍传来等待不归之春的声音|땅에 묻은 낡은 왕관에서 지금도 돌아오지 않는 봄을 기다리는 목소리가 들린다
森が子を失うたびに白い骨がその冠にひとつ加わる|Each time the forest loses a child, one more white bone is added to that crown|森林每失去一个孩子，那顶王冠上便多一根白骨|숲이 아이를 잃을 때마다 그 관에 흰 뼈가 하나 더해진다
帰る者のいない鐘楼で夜明けを告げる鐘を守っている|In a belfry no one returns to, it guards the bell that once announced the dawn|在无人归来的钟楼里，守护着报晓的钟|돌아올 이 없는 종루에서 새벽을 알리는 종을 지키고 있다
水底に沈めた祈りは誰にも届かぬまま真珠になった|Prayers sunk to the depths became pearls before anyone could hear them|沉入水底的祈祷无人听见，化作了珍珠|물밑에 가라앉힌 기도는 누구에게도 닿지 못한 채 진주가 되었다
焼け落ちた玉座には灰を払う者も王を降ろす者もいない|No one sweeps the ash from the burned throne, and no one removes its king|焚毁的王座上，无人拂去灰烬，也无人废黜君王|불타 무너진 옥좌에는 재를 털 이도 왕을 끌어내릴 이도 없다
最後の刑はまだ終わらない|The final sentence is not yet carried out|最后的刑罚仍未结束|마지막 형벌은 아직 끝나지 않았다
鎖の先に主の姿はもうない|At the end of the chain, its master is gone|锁链的另一端，已不见主人的身影|사슬 끝에 주인의 모습은 더 이상 없다
星が消えた場所に口が開き、夜は夜さえも呑みこんだ|A mouth opened where the stars vanished, and the night swallowed even itself|星辰消失之处张开了巨口，夜连夜本身都吞了下去|별이 사라진 곳에 입이 열리고 밤은 밤마저 삼켰다
星が消えた場所に口が開き夜は夜さえも呑みこんだ|A mouth opened where the stars vanished, and the night swallowed even itself|星辰消失之处张开了巨口，夜连夜本身都吞了下去|별이 사라진 곳에 입이 열리고 밤은 밤마저 삼켰다
門の向こうに朝がある|Morning lies beyond the gate|门的另一边就是清晨|문 너머에 아침이 있다
それを知る者だけが門を閉ざし続ける|Only those who know it keep the gate shut|唯有知晓此事者，一直紧闭着门|그것을 아는 자만이 문을 계속 닫아 둔다
まだ咲かない花の名を世界が忘れた言葉でささやく|It whispers the names of unbloomed flowers in a language the world forgot|用世界遗忘的语言，低语着尚未绽放之花的名字|아직 피지 않은 꽃의 이름을 세상이 잊은 말로 속삭인다
ふたつの顔が見つめる水面に同じ月は二度と映らない|The water watched by two faces never reflects the same moon twice|两张面孔凝视的水面，不会再映出同一轮月亮|두 얼굴이 바라보는 수면에 같은 달은 두 번 비치지 않는다
冷えた炉の底で故郷の太陽を夢に見る|At the bottom of a cold furnace, it dreams of its homeland's sun|在冰冷的熔炉底部，梦见故乡的太阳|식은 화로 바닥에서 고향의 태양을 꿈꾼다
星座からほどけた一筋の影が失われた空を探して巡る|A thread of shadow unraveled from a constellation wanders in search of its lost sky|从星座中松脱的一缕影子，徘徊寻找失去的天空|별자리에서 풀려난 한 줄기 그림자가 잃어버린 하늘을 찾아 떠돈다
白い王冠は一度も春を知らずに育った枝|The white crown is a branch that grew without ever knowing spring|白色王冠，是从未见过春天便长成的枝条|흰 왕관은 한 번도 봄을 알지 못하고 자란 가지
凍りついた鐘の中で最後の呼び声が鳴り続ける|Inside a frozen bell, the last call keeps ringing|在冻结的钟里，最后的呼唤仍在回响|얼어붙은 종 안에서 마지막 부름이 계속 울린다
森に還れなかった夢がひとつの花冠に集まった|Dreams that could not return to the forest gathered into a single crown of flowers|无法回归森林的梦，聚成了一顶花冠|숲으로 돌아가지 못한 꿈들이 하나의 화관으로 모였다
甲羅に生えた森だけがこの古い命の歳を知っている|Only the forest growing on its shell knows the age of this ancient life|唯有甲壳上生长的森林，知道这古老生命的年岁|등껍질에 자란 숲만이 이 오래된 생명의 나이를 안다
砂に沈んだ国を見えない玉座から見下ろしている|From an unseen throne, it looks down on a kingdom sunk in sand|从看不见的王座上，俯视沉入黄沙的国度|모래에 잠긴 나라를 보이지 않는 옥좌에서 내려다보고 있다
棺は空になった|The coffin is empty|棺材已经空了|관은 비었다
それでも黄金の殻は王の眠りを守り続ける|Yet the golden shell keeps guarding the king's sleep|即便如此，黄金外壳仍守护着君王的长眠|그래도 황금 껍데기는 왕의 잠을 계속 지킨다
六つの腕が覚えているのはもう作れない朝のかたち|Its six arms remember the shape of a morning that can no longer be made|六只手臂记得的，是再也造不出的清晨的形状|여섯 팔이 기억하는 것은 더는 만들 수 없는 아침의 모양
蒸気の海を渡るたびに失われた工都の汽笛が響く|Each time it crosses the sea of steam, the whistle of the lost forge city echoes|每次渡过蒸汽之海，失落工都的汽笛便会响起|증기의 바다를 건널 때마다 사라진 공도의 기적이 울린다
赤い水面に膝をつき、返事のない祈りを捧げる|Kneeling on the red water, it offers prayers that receive no answer|跪在赤红的水面上，献上没有回应的祈祷|붉은 수면에 무릎을 꿇고 대답 없는 기도를 올린다
赤い水面に膝をつき返事のない祈りを捧げる|Kneeling on the red water, it offers prayers that receive no answer|跪在赤红的水面上，献上没有回应的祈祷|붉은 수면에 무릎을 꿇고 대답 없는 기도를 올린다
王冠の赤は名も知らぬ者たちの記憶で染まっている|The red of the crown is dyed with memories of the nameless|王冠的红，是由无名之人的记忆染成的|왕관의 붉은빛은 이름 모를 이들의 기억으로 물들어 있다
最後の本を閉じることがこの司書にはできなかった|This librarian could never close the final book|这位司书始终无法合上最后一本书|이 사서는 마지막 책을 덮을 수 없었다
千の頁が羽ばたくたびに禁じられた物語が夜にこぼれる|Each time a thousand pages flutter, forbidden stories spill into the night|千页书翻飞之时，禁忌的故事便洒落夜空|천 장의 페이지가 날갯짓할 때마다 금지된 이야기가 밤으로 쏟아진다
肉を失っても空を統べた記憶だけは朽ちなかった|Though its flesh is gone, the memory of ruling the sky has not decayed|即使失去血肉，统御天空的记忆也未曾腐朽|살을 잃어도 하늘을 다스리던 기억만은 썩지 않았다
石になった瞳は誰も覚えていない時代の夕日を見ている|Eyes turned to stone watch the sunset of an age no one remembers|化为石头的双眼，望着无人记得的时代的夕阳|돌이 된 눈동자는 아무도 기억하지 못하는 시대의 석양을 보고 있다
稲妻を冠にした影が雲の海に帰らぬ子を探す|A shadow crowned with lightning searches the sea of clouds for a child who will not return|头戴闪电的影子，在云海中寻找不归的孩子|번개를 관으로 쓴 그림자가 구름 바다에서 돌아오지 않는 아이를 찾는다
嵐はこの巨体の寝息|The storm is this giant's breathing in its sleep|风暴是这庞然巨物的鼻息|폭풍은 이 거대한 몸의 숨소리
晴れ間は遠い故郷の夢だ|Clear skies are its dream of a distant home|晴空是它对遥远故乡的梦|맑게 갠 하늘은 먼 고향의 꿈이다
鏡の中だけで愛された女王はついに鏡の外へ歩き出した|The queen who was loved only inside the mirror has finally stepped out of it|只在镜中被爱的女王，终于走出了镜子|거울 속에서만 사랑받던 여왕이 마침내 거울 밖으로 걸어 나왔다
二つの頭が見る夢は違っても帰る場所は同じひとつだった|Its two heads dream different dreams, yet they return to the same place|两颗头颅做着不同的梦，归处却始终相同|두 머리가 꾸는 꿈은 달라도 돌아갈 곳은 같은 하나였다
海を失った巨鯨は彗星の尾を潮に見立てて泳ぐ|The great whale that lost its sea swims along a comet's tail as if it were the tide|失去大海的巨鲸，把彗星的尾巴当作潮水游弋|바다를 잃은 고래는 혜성의 꼬리를 조수 삼아 헤엄친다
ほどけた星座を夜の糸で縫い直そうとしている|It tries to sew the unraveled constellations back together with threads of night|它想用夜之丝线，重新缝合散开的星座|풀린 별자리를 밤의 실로 다시 꿰매려 한다
誰も通らぬ門で時刻だけを律儀に数えている|At a gate no one passes, it faithfully counts the hours|在无人经过的门前，一丝不苟地数着时刻|아무도 지나지 않는 문에서 시각만을 꼬박꼬박 세고 있다
時針の翼が止まれば待ち続けた明日も消えてしまう|If its clock-hand wings stop, the tomorrow it awaited will vanish too|若时针之翼停下，苦等的明天也将消失|시침의 날개가 멈추면 기다려 온 내일도 사라지고 만다
呑みこんだ太陽の名を今も喉の奥に隠している|It still hides the name of the sun it swallowed deep in its throat|至今仍把吞下的太阳之名藏在喉咙深处|삼킨 태양의 이름을 지금도 목 깊숙이 숨기고 있다
幾度灰になっても初めて見た暁の色だけは忘れない|However many times it turns to ash, it never forgets the color of the first dawn it saw|无论化为灰烬多少次，都忘不了初见的黎明之色|몇 번이고 재가 되어도 처음 본 새벽의 빛깔만은 잊지 않는다
古道に立つ双剣は帰還を許されなかった兵の誓い|The twin swords on the old road are the oath of soldiers never allowed to return|伫立古道的双剑，是未获准归乡的士兵之誓|옛길에 선 쌍검은 귀환이 허락되지 않은 병사의 맹세
鎧の星紋はもう地図にない国のしるし|The star crest on its armor marks a nation no longer on any map|铠甲上的星纹，是已从地图上消失的国度之印|갑옷의 별 문양은 더는 지도에 없는 나라의 표식
誰も呼ばなくなった夜警が灯の跡を辿って巡る|A night watch no one calls anymore makes its rounds along the trail of flames|再无人呼唤的守夜人，循着灯火的痕迹巡行|아무도 부르지 않게 된 야경꾼이 등불의 자취를 따라 순찰한다
その影に呑まれた者の名は世界のどの墓にもない|The names of those swallowed by its shadow appear on no grave in the world|被那影子吞没之人的名字，不在世上任何一座坟墓上|그 그림자에 삼켜진 자의 이름은 세상 어느 무덤에도 없다
白い水晶の奥で閉ざされた舞踏会が続いている|Deep within white crystal, a sealed ball goes on and on|在白色水晶深处，一场被封闭的舞会仍在继续|흰 수정 깊은 곳에서 닫힌 무도회가 계속되고 있다
朽ちた花壇に水をやる|It waters a withered flower bed|为枯萎的花坛浇水|시든 화단에 물을 준다
戻らない季節を待ちながら|While waiting for a season that will not return|等待着不会归来的季节|돌아오지 않을 계절을 기다리며
秤の片側に砂をもう片側に帰らぬ魂を載せる|On one side of the scale, sand; on the other, souls that will not return|天平一侧放着沙，另一侧放着不归的灵魂|저울 한쪽에는 모래를 다른 쪽에는 돌아오지 않는 영혼을 올린다
作り手を失った心臓が造りかけの街で脈を打つ|A heart that lost its maker beats in an unfinished city|失去造物主的心脏，在未完成的城市里跳动|만든 이를 잃은 심장이 짓다 만 거리에서 고동친다
祭壇を満たす赤い潮に亡き人々の声を聞いている|In the red tide that fills the altar, it hears the voices of the dead|在注满祭坛的赤潮中，聆听逝者的声音|제단을 채운 붉은 물결 속에서 죽은 이들의 목소리를 듣고 있다
禁じられた頁を抱き、最後の読者を待ち続ける|Clutching forbidden pages, it keeps waiting for the last reader|怀抱禁忌之页，一直等待最后的读者|금지된 페이지를 품고 마지막 독자를 계속 기다린다
禁じられた頁を抱き最後の読者を待ち続ける|Clutching forbidden pages, it keeps waiting for the last reader|怀抱禁忌之页，一直等待最后的读者|금지된 페이지를 품고 마지막 독자를 계속 기다린다
骨の谷に響く子守唄は竜が生きていた頃のもの|The lullaby echoing through the valley of bones dates from when dragons lived|回荡在白骨山谷的摇篮曲，来自巨龙尚存的年代|뼈의 골짜기에 울리는 자장가는 용이 살아 있던 시절의 것
雷の消えた夜にも王の巡察だけは終わらない|Even on nights without thunder, the king's patrol never ends|即使在雷声消失的夜里，王的巡察也不会结束|천둥이 사라진 밤에도 왕의 순찰만은 끝나지 않는다
鏡のない部屋で自分ではない誰かを待っている|In a room without mirrors, it waits for someone who is not itself|在没有镜子的房间里，等待着不是自己的某人|거울 없는 방에서 자신이 아닌 누군가를 기다리고 있다
落ちた星にも墓はある|Even fallen stars have graves|坠落的星辰也有坟墓|떨어진 별에게도 무덤은 있다
その名を読む者はもういない|No one is left to read their names|已无人再读出它们的名字|그 이름을 읽을 자는 이제 없다
王の言葉が届かなくなっても鐘の律だけは守られる|Even after the king's words stopped reaching anyone, the rhythm of the bell is kept|即便王的话语已无法传达，钟声的节律依然被守护|왕의 말이 닿지 않게 되어도 종의 율만은 지켜진다
暁と蝕の境で果たせなかった約束を見張っている|At the border between dawn and eclipse, it keeps watch over an unkept promise|在黎明与日蚀的交界，看守着未能兑现的约定|새벽과 일식의 경계에서 지키지 못한 약속을 지켜보고 있다
王冠に瞬くものは星ではない|What twinkles in the crown is not a star|王冠上闪烁的并非星辰|왕관에서 반짝이는 것은 별이 아니다
ここまで辿りつけなかった灯だ|It is the flame that could not make it this far|而是未能抵达此处的灯火|여기까지 닿지 못한 등불이다
巡り続ける世界を誰よりも長く見送ってきた|It has watched the turning world longer than anyone|它比任何人都更久地目送着轮转的世界|돌고 도는 세상을 누구보다 오래 배웅해 왔다
今夜も扉の前に立つ|Tonight too, it stands before the door|今夜也伫立在门前|오늘 밤도 문 앞에 선다
最後の灯が消えるそのときを最初の夜から待ち続けている|Since the first night, it has waited for the moment the last flame goes out|自第一个夜晚起，便一直等待最后的灯火熄灭的那一刻|마지막 등불이 꺼지는 그때를 첫 밤부터 기다려 왔다
凍てつく玉座に座る少女|A girl seated on a frozen throne|坐在冰封王座上的少女|얼어붙은 옥좌에 앉은 소녀
その翼には夜を終わらせるはずだった約束が眠る|Within her wings sleeps a promise that should have ended the night|她的羽翼中，沉睡着本应终结长夜的约定|그 날개에는 밤을 끝냈어야 할 약속이 잠들어 있다
1回ごとのダメージを軽減|Reduces damage from each hit|减少每次受到的伤害|타격마다 피해 감소
攻撃1回ごとに数値分ダメージが減ります（最低1）|Each hit deals that much less damage (minimum 1)|每次攻击伤害减少相应数值（最低1）|공격 1회마다 수치만큼 피해가 줄어듭니다 (최소 1)
連撃より1発の大きい攻撃や毒が有効です|Single big hits and poison work better than multi-hits|比起连击，单次重击或中毒更有效|연타보다 한 방이 큰 공격이나 독이 효과적입니다
1回に受けるダメージに上限|Damage per hit is capped|每次受到的伤害有上限|1회에 받는 피해에 상한
どれだけ強い攻撃でも上限までしか通りません|No matter how strong the attack, only damage up to the cap gets through|无论攻击多强，最多只能造成上限伤害|아무리 강한 공격도 상한까지만 통합니다
連撃や毒で削りましょう|Wear it down with multi-hits and poison|用连击或中毒慢慢削减吧|연타나 독으로 깎아 냅시다
全体攻撃のダメージ半減|Halves damage from area attacks|全体攻击伤害减半|전체 공격 피해 절반
単体攻撃は通常どおり通ります|Single-target attacks work normally|单体攻击照常有效|단일 공격은 평소대로 통합니다
受ける毒が半分|Takes half poison|受到的中毒减半|받는 독 절반
付与する毒の数値が半分（切り上げ）になります|Poison applied is halved (rounded up)|施加的中毒数值减半（向上取整）|부여하는 독 수치가 절반이 됩니다 (올림)
足止めを受けない|Cannot be stunned|不会被定身|발묶임을 받지 않음
足止めの効果は発動しません|Stun effects do nothing|定身效果不会生效|발묶임 효과가 발동하지 않습니다
盾や攻撃力ダウンで備えましょう|Prepare with Shield and attack reduction instead|请用护盾或降低攻击力来应对|방패나 공격력 감소로 대비합시다
弱点を受けない|Cannot be Exposed|不会被施加弱点|약점을 받지 않음
弱点を付与できず弱点ボーナスも得られません|Exposed cannot be applied and its bonus does not trigger|无法施加弱点，也无法获得弱点加成|약점을 부여할 수 없고 약점 보너스도 얻을 수 없습니다
攻撃した旅人がダメージを受ける|Travelers who attack it take damage|攻击它的旅人会受到伤害|공격한 여행자가 피해를 받음
この敵をカードで攻撃するたびに使い手が数値分のダメージを受けます（盾で防げます）|Each time you attack it with a card, the user takes that much damage (Shield can block it)|每次用卡牌攻击此敌人，使用者都会受到相应伤害（可被护盾抵挡）|이 적을 카드로 공격할 때마다 사용자가 수치만큼 피해를 받습니다 (방패로 막을 수 있음)
全体攻撃も対象です|Area attacks count too|全体攻击同样适用|전체 공격도 해당됩니다
毎ターン盾やHPが増える|Gains Shield or HP every turn|每回合获得护盾或HP|매 턴 방패나 HP가 늘어남
鉄壁は毎ターン盾を得て再生は毎ターンHPを回復します|Bulwark grants Shield each turn and Regeneration restores HP each turn|铁壁每回合获得护盾，再生每回合恢复HP|철벽은 매 턴 방패를 얻고 재생은 매 턴 HP를 회복합니다
長期戦ほど不利になります|The longer the fight, the worse it gets for you|战斗拖得越久越不利|장기전일수록 불리해집니다
1ターンに何度も攻撃・行動する|Attacks or acts several times per turn|一回合内多次攻击或行动|1턴에 여러 번 공격·행동함
連撃は1回の攻撃が複数回ヒット、連続行動は1ターンに複数の行動を行います|Multi-strike hits several times per attack; Multi-action takes several actions per turn|连击会让一次攻击命中多次，连续行动会在一回合内进行多次行动|연타는 한 번의 공격이 여러 번 맞고 연속 행동은 1턴에 여러 행동을 합니다
頭上の予告で回数を確認できます|Check the intent above it to see how many|可在头顶的预告中确认次数|머리 위 예고에서 횟수를 확인할 수 있습니다
数ターン後に逃げる珍しい敵|A rare enemy that flees after a few turns|数回合后就会逃跑的稀有敌人|몇 턴 뒤 도망치는 희귀한 적
攻撃はしてきませんが硬く1回に受けるダメージにも上限があります|It never attacks, but it is tough and damage per hit is capped|它不会攻击，但很坚硬，每次受到的伤害也有上限|공격하지 않지만 단단하고 1회에 받는 피해에도 상한이 있습니다
毒や連撃が有効です|Poison and multi-hits work well|中毒和连击很有效|독과 연타가 효과적입니다
希少なレリックほど出にくく強い恩恵を持ちます|Rarer relics appear less often and grant stronger boons|越稀有的遗物越难出现，恩惠也越强|희귀한 유물일수록 잘 나오지 않고 강한 은혜를 지닙니다
レアリティが高いほど希少なレリックです|The higher the rarity, the rarer the relic|稀有度越高，遗物越稀有|희귀도가 높을수록 귀한 유물입니다
恩恵と代償を確認し仲間やデッキに合うものを選びましょう|Check the boon and the cost, then pick what suits your party and deck|确认恩惠与代价，选择适合同伴与卡组的遗物吧|은혜와 대가를 확인하고 동료와 덱에 맞는 것을 고릅시다
全員が戦闘不能になるとこの旅は終了します|If everyone falls, this journey ends|全员倒下时，这段旅程就会结束|모두가 쓰러지면 이 여정은 끝납니다
最後の物語のあと旅の結果を表示します|After the final story, the results of your journey are shown|最后的故事之后，会显示旅程结果|마지막 이야기 뒤에 여정의 결과가 표시됩니다
タイトルに「続きから」は表示されません|"Continue" will not appear on the title screen|标题画面不会显示“继续”|타이틀에 "이어하기"는 표시되지 않습니다
新しい旅を始めるか、記録管理から保存済みの旅を選べます|Start a new journey, or choose a saved one from Records|你可以开始新旅程，或从记录管理中选择已保存的旅程|새 여정을 시작하거나 기록 관리에서 저장된 여정을 고를 수 있습니다
新しい旅を始めるか記録管理から保存済みの旅を選べます|Start a new journey, or choose a saved one from Records|你可以开始新旅程，或从记录管理中选择已保存的旅程|새 여정을 시작하거나 기록 관리에서 저장된 여정을 고를 수 있습니다
魔王を討伐する|Defeat the Demon King|讨伐魔王|마왕 토벌
`));
// 旅人の出会い実績
for(const h of COMPANIONS)registerTranslations([[`${h.name}を仲間に迎える`,`Recruit ${translateText(h.name,'en')}`,`招募${translateText(h.name,'zh-CN')}`,`${translateText(h.name,'en')} 영입`]]);

// 韓国語：主要な画面のUI（未訳は英語で表示）
registerTranslations(rows(`
灯火のキャラバン|Lantern Caravan|灯火商队|등불 캐러밴
新しい旅|New Journey|新的旅程|새 여정
続きから|Continue|继续|이어하기
旅の記録を選ぶ|Choose a Record|选择旅程记录|여정 기록 선택
戦い方を練習する|Practice Combat|练习战斗|전투 연습
図鑑|Compendium|图鉴|도감
パスワード|Password|密码|비밀번호
練習する|Practice|练习|연습
旅の記録|Records|旅程记录|여정 기록
設定・セーブ|Settings & Saves|设置与存档|설정·저장
遊び方|How to Play|玩法|플레이 방법
共有リンク|Share Link|分享链接|공유 링크
実績|Achievements|成就|업적
灰暁の巡礼|The Last Pilgrimage|灰晓巡礼|잿빛 새벽의 순례
夜に沈んだ世界へ　最後の灯を|Carry the last light into a world sunk in night|向沉入黑夜的世界　送去最后的灯火|밤에 잠긴 세계로 마지막 등불을
通常4ステージ／高難度16ステージ・自動保存|Normal: 4 stages / Hard: 16 stages · Autosave|普通4关／高难度16关・自动保存|일반 4스테이지 / 고난도 16스테이지 · 자동 저장
設定・音量・セーブ|Settings / Audio / Save|设置 / 音量 / 存档|설정 · 음량 · 저장
共有リンク|Share Link|分享链接|공유 링크
遊び方|How to Play|玩法|플레이 방법
音量|Volume|音量|음량
メニュー|Menu|菜单|메뉴
設定とセーブ|Settings & Save|设置与存档|설정과 저장
表示|Display|显示|표시
音と操作|Audio & Controls|声音与操作|소리와 조작
記録とデータ|Records & Data|记录与数据|기록과 데이터
言語 / Language|Language|语言 / Language|언어 / Language
カードの効果|Card Effects|卡牌效果|카드 효과
文字の大きさ|Text Size|文字大小|글자 크기
アニメーション|Animation|动画|애니메이션
スマホのレイアウト|Phone Layout|手机布局|휴대폰 레이아웃
全画面表示|Full Screen|全屏|전체 화면
操作|Controls|操作|조작
記録|Records|记录|기록
今の旅を保存|Save This Journey|保存当前旅程|지금 여정 저장
データの引き継ぎ|Transfer Data|数据转移|데이터 이전
ゲームに戻る|Back to Game|返回游戏|게임으로 돌아가기
戻る|Back|返回|뒤로
閉じる|Close|关闭|닫기
決定|OK|确定|확인
保存|Save|保存|저장
開く|Open|打开|열기
書き出す|Export|导出|내보내기
読み込む|Import|导入|불러오기
調整する|Adjust|调整|조정
設定する|Configure|设置|설정
標準|Normal|标准|보통
大|Large|大|크게
文章|Text|文字|문장
アイコン|Icons|图标|아이콘
1画面版|Single Screen|单屏版|한 화면
従来版|Classic|经典版|클래식
全画面|Full Screen|全屏|전체 화면
ターンを終える|End Turn|结束回合|턴 종료
あなたの行動|Your Move|你的行动|당신의 행동
気力|Energy|能量|기력
手札|Hand|手牌|손패
山札|Draw Pile|抽牌堆|뽑을 더미
捨札|Discard|弃牌堆|버린 더미
デッキ|Deck|卡组|덱
地図|Map|地图|지도
レリック|Relics|遗物|유물
仲間・固有能力|Party & Abilities|同伴与固有能力|동료 · 고유 능력
用語集|Glossary|术语表|용어집
回復薬|Potions|回复药|회복약
灯油|Fuel|灯油|등유
銀貨|Silver|银币|은화
攻撃|Attack|攻击|공격
守備|Guard|防御|수비
回復|Heal|治疗|회복
策略|Skill|策略|책략
敵を選ぶ|Choose an Enemy|选择敌人|적 선택
仲間を選ぶ|Choose an Ally|选择同伴|동료 선택
選択後に発動|Plays on Select|选择后发动|선택 후 발동
戦闘|Battle|战斗|전투
強敵|Elite|强敌|강적
逃走|Flee|逃跑|도주
第1ステージ|Stage 1|第1关|1스테이지
戦いに勝利|Victory|战斗胜利|전투 승리
先制殲滅！|First-Turn Victory!|首回合全歼！|선제 섬멸!
敵のターン|Enemy Turn|敌方回合|적의 턴
最初の旅人を選ぶ|Choose Your First Traveler|选择第一位旅人|첫 여행자 선택
旅の図鑑|Journey Compendium|旅途图鉴|여정 도감
発見済みのみ|Discovered Only|仅已发现|발견한 것만
並び順|Sort|排序|정렬
キャラごとに分ける|Group by Character|按角色分组|캐릭터별로 나누기
名前順|By Name|按名称|이름순
コスト順|By Cost|按费用|비용순
種類順|By Type|按类型|종류순
キャラ|Characters|角色|캐릭터
カード|Cards|卡牌|카드
敵|Enemies|敌人|적
ボス|Bosses|首领|보스
まおう|Maou|魔王酱|마오
`));

// レリック説明を文ごとに訳し直して上書き（古い部分訳より優先）
import {RELICS} from './catalog.js?v=52';
const hasKana=x=>/[ぁ-んァ-ヶ]/.test(x);
for(const r of RELICS)for(const key of ['desc','drawback']){const text=r[key];if(!text)continue;const parts=String(text).split('。').map(x=>x.trim()).filter(Boolean);const en=parts.map(x=>templateFirst(x,'en')),zh=parts.map(x=>templateFirst(x,'zh-CN')),okEn=!en.some(hasKana),okZh=!zh.some(hasKana),bare=String(text).replace(/。$/,'');if(okEn||okZh)registerTranslations([[text,okEn?en.join('. ')+'.':undefined,okZh?zh.join('。')+'。':undefined],[bare,okEn?en.join('. '):undefined,okZh?zh.join('。'):undefined]])}
