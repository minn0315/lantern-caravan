import {endingInfo} from './endings.js?v=52';
import {CHAPTERS,COMPANIONS,SPECIAL_CHAPTER} from './catalog.js?v=52';
export const STORY_KINDS=['intro','chapter','ending','defeat'];
export const STORY_LENGTH=3;
export function storyFrames(s,cutscene=s.cutscene){
 if(!cutscene)return [];
 const chapter=cutscene.chapter,special=!!s.endless&&s.legacySpecialChapter!==chapter&&(chapter+1)%50===0,region=n=>s.endless&&s.legacySpecialChapter!==n&&(n+1)%50===0?SPECIAL_CHAPTER:CHAPTERS[((n-(s.endless?Math.floor((n+1)/50):0)+(s.skippedAbyss||0))%16+16)%16],h=COMPANIONS.find(h=>h.id===(s.starterId||s.party[0])),name=h?.name||'旅人';
 const lines=(...x)=>x.join('\n');
 const vows={
  エダ:['「道が塞がってるなら　斬り拓けばいい」','灰の刃を肩に　傭兵は夜へ踏み出した',"\"If the road is blocked, I'll cut a new one.\" Ashblade on her shoulder, the mercenary steps into the night.",'“路被堵住了，那就劈开一条。”灰刃在肩，佣兵踏入长夜。'],
  セナ:['「星が見えなくても　行く先は読める」','弓を背に　射手は静かに歩き出した','"Even without stars, I can read the way." Bow on her back, the archer walks quietly on.','“即使看不见星星，我也读得懂前路。”背负长弓，射手静静前行。'],
  ニコ:['「灯がある限り　打つ手はあるさ」','薬瓶を鳴らして　錬金術師は門をくぐった',"\"As long as there's a flame, there's something we can do.\" Bottles clinking, the alchemist passes the gate.",'“只要灯火还在，就还有办法。”药瓶叮当作响，炼金术师走出了村门。'],
  まおう:['「からっぽの王様に　借りられないものはないの」','誰のものでもない灯を手に　まおうは笑った',"\"There's nothing a hollow king can't borrow.\" Holding a flame that belongs to no one, Maou smiles.",'“空空的国王，没有借不到的东西。”握着不属于任何人的灯火，魔王酱笑了。']
 };
 const vow=vows[name]||['「この灯を　朝まで運ぼう」','支度を終えた旅人は　長い夜へ踏み出した',"\"Let's carry this flame until morning.\" Ready at last, the traveler steps into the long night.",'“把这盏灯带到黎明吧。”整装完毕的旅人踏入漫长的夜。'];
 if(cutscene.kind==='intro')return [
  {image:'village',tag:'序幕 / 消えた朝',title:'世界は朝を忘れた',text:lines('最後の鐘が鳴った夜','太陽は二度と昇らなかった','','村の門に残されたのは','消えない小さな灯がひとつ'),enTitle:'The world forgot the morning',enText:'On the night the last bell rang, the sun never rose again.\nAll that remained at the village gate was one small flame that would not die.',zhTitle:'世界忘记了清晨',zhText:'最后的钟声响起的那一夜，太阳再也没有升起。\n村门前只留下一盏不会熄灭的小小灯火。'},
  {image:'pilgrimage',tag:'旅立ち / 最初の旅人',title:`${name}は灯を受け取った`,text:lines(vow[0],vow[1]),enTitle:`${name} took up the flame`,enText:vow[2],zhTitle:`${name}接过了灯火`,zhText:vow[3],traveler:true},
  {image:'chapter',chapter:0,tag:'第一章 / ささやきの森',title:'足跡が道になる',text:lines('古い灯台へ続く巡礼路','その先に　朝を取り戻す手がかりが眠っている','','道を選び　仲間と出会い','灯を次へつないでいこう'),enTitle:'Your footsteps become the road',enText:'The pilgrim road leads to an old lighthouse, where a clue to the lost morning still sleeps.\nChoose your path, meet companions, and keep the flame alive.',zhTitle:'足迹会成为道路',zhText:'巡礼之路通往古老的灯塔，那里沉睡着夺回清晨的线索。\n选择道路，结识同伴，把灯火传递下去。'}
 ];
 if(cutscene.kind==='defeat')return [
  {image:'chapter',chapter:s.chapter%16,special,tag:'落幕 / 消える灯',title:'灯が夜にほどける',text:lines(`第${s.chapter+1}ステージ`,`${name}の足音が止まり　最後の火が小さく揺れた`,'運んできた灯は　夜の底へ沈んでいく'),enTitle:'The light gives way to night',enText:`Stage ${s.chapter+1}. The footsteps stop and the last flame trembles.\nThe light you carried sinks into the depths of the night.`,zhTitle:'灯火消散于长夜',zhText:`第${s.chapter+1}关。脚步停下，最后的火焰轻轻摇曳。\n一路运来的灯火，沉入了夜的深处。`,company:true,loss:true,collapse:true},
  {image:'pilgrimage',tag:'旅の記憶 / 残された足跡',title:'歩いた道は消えない',text:lines(`越えた戦いは${s.wins}`,'仲間と選んだ道も　焚き火のぬくもりも','朝に届かなかったとしても　なかったことにはならない'),enTitle:'The road you walked remains',enText:`${s.wins} battles overcome. The roads you chose together and the warmth of the campfire stay with you, even without reaching dawn.`,zhTitle:'走过的路不会消失',zhText:`越过的战斗共${s.wins}场。与同伴选择的道路、篝火的温暖，即使未能抵达黎明，也不会就此消失。`,loss:true},
  {image:'village',tag:'次の灯へ / JOURNEY ENDED',title:'いつかもう一度',text:lines('村の門に　小さな火種がひとつ残っていた','次は別の道を　別の仲間と','この旅の記憶を胸に　また灯を運ぼう'),enTitle:'Someday, once more',enText:'A small ember still glows at the village gate.\nNext time, another road and other companions. Carry the light again, with this journey in your heart.',zhTitle:'总有一天，再出发',zhText:'村门前还留着一粒小小的火种。\n下一次，走另一条路，与另一群同伴同行。带着这段旅程的记忆，再次运送灯火。',loss:true}
 ];
 if(cutscene.kind==='chapter'){const prev=region(chapter-1)?.name||'前の土地',next=region(chapter),art=special?16:((chapter-(s.endless?Math.floor((chapter+1)/50):0)+(s.skippedAbyss||0))%16);return [
  {image:'pilgrimage',tag:`第${chapter}ステージ 踏破 / CHAPTER CLEAR`,title:'ひとつ夜を越えた',text:lines(`${prev}を覆っていた気配が　背後へ遠ざかる`,'キャラバンの灯は　まだ燃えている'),enTitle:'One more night behind you',enText:`The shadow over ${prev} fades behind you.\nThe caravan's flame is still burning.`,zhTitle:'又越过了一夜',zhText:`笼罩${prev}的气息渐渐远去。\n商队的灯火仍在燃烧。`,clear:true},
  {image:'chapter',chapter:art,special,tag:`第${chapter+1}ステージ / ${next.en}`,title:next.name,text:next.beats[0]},
  {image:'chapter',chapter:art,special,tag:'新たな道 / 次の章の主',title:'灯の行く先に待つもの',text:lines('この土地の夜を守る主が　道の先で待っている','まだ見ぬ影を越えて　灯を次の土地へ'),enTitle:'What waits where the flame is going',enText:'A sovereign guards the night of this land at the end of the road.\nPass beyond the unseen shadow and carry the flame onward.',zhTitle:'灯火前方等待之物',zhText:'守护这片土地长夜的主宰，正在道路尽头等待。\n越过未知的阴影，把灯火带往下一片土地。',boss:true}
 ]}
 return endingInfo(s).frames;
}
