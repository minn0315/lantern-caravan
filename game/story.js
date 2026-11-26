import {endingInfo} from './endings.js?v=44';
import {CHAPTERS,COMPANIONS,SPECIAL_CHAPTER} from './catalog.js?v=44';
export const STORY_KINDS=['intro','chapter','ending','defeat'];
export const STORY_LENGTH=3;
export function storyFrames(s,cutscene=s.cutscene){
 if(!cutscene)return [];
 const chapter=cutscene.chapter,special=!!s.endless&&s.legacySpecialChapter!==chapter&&(chapter+1)%50===0,region=n=>s.endless&&s.legacySpecialChapter!==n&&(n+1)%50===0?SPECIAL_CHAPTER:CHAPTERS[((n-(s.endless?Math.floor((n+1)/50):0)+(s.skippedAbyss||0))%16+16)%16],h=COMPANIONS.find(h=>h.id===(s.starterId||s.party[0])),name=h?.name||'旅人';
 if(cutscene.kind==='intro')return [
  {image:'village',tag:'序幕 / 消えた朝',title:'世界が、朝を忘れた。',text:'鐘が最後に鳴った夜、太陽は戻らなかった。村の門に残されたのは、消えない小さな灯がひとつ。'},
  {image:'pilgrimage',tag:'旅立ち / 最初の旅人',title:`${name}は、灯を受け取った。`,text:name==='エダ'?'「道が閉ざされているなら、切り拓くまでさ。」灰刃を携え、一人の傭兵が夜へ踏み出す。':name==='セナ'?'「星が隠れていても、進む道は読める。」弓を背に、射手は静かな夜へ踏み出す。':name==='ニコ'?'「まだ灯がある。それなら、できることもある。」薬の鞄を抱え、錬金術師は夜へ踏み出す。':'「この灯を、朝まで運ぼう。」旅人は支度を整え、長い夜へ踏み出す。',traveler:true},
  {image:'chapter',chapter:0,tag:'第一章 / ささやきの森',title:'君の足跡が、道になる。',text:'古い灯台へ続く巡礼路。その先に朝を取り戻す手がかりがある。道を選び、出会う仲間と灯をつないでいこう。'}
 ];
 if(cutscene.kind==='defeat')return [
  {image:'chapter',chapter:s.chapter%16,special,tag:'落幕 / 消える灯',title:'灯が、夜にほどける。',enTitle:'The light gives way to night.',zhTitle:'灯火消散于长夜。',enText:`At stage ${s.chapter+1}, the caravan’s footsteps fall silent. The last flame flickers and sinks into the dark.`,zhText:`第${s.chapter+1}关，旅人的脚步停了下来。最后的火焰轻轻摇曳，沉入夜色。`,text:`第${s.chapter+1}ステージ。${name}の足音が止まり、最後の火が静かに揺れた。ここまで運んだ灯は、夜の底へと沈んでいく。`,company:true,loss:true,collapse:true},
  {image:'pilgrimage',tag:'旅の記憶 / 残された足跡',title:'歩いた道は、消えない。',enTitle:'The road you walked remains.',zhTitle:'走过的路，不会消失。',enText:`You overcame ${s.wins} battles. The roads chosen together, the warmth of the campfire—this journey mattered, even without reaching dawn.`,zhText:`你们越过了${s.wins}场战斗。共同选择的道路、篝火的温暖，即使未能迎来黎明，这段旅程也不会被抹去。`,text:`越えた戦いは${s.wins}。仲間と選んだ道、焚き火のぬくもり。朝には届かなくても、その旅がなかったことにはならない。`,loss:true},
  {image:'village',tag:'次の灯へ / JOURNEY ENDED',title:'いつか、もう一度。',enTitle:'Someday, once more.',zhTitle:'终有一天，再次出发。',enText:'A small ember remains at the village gate. Another road, another company. Carry a new light, with the memory of this journey in your heart.',zhText:'村门旁还留着一粒火种。下一次，选择另一条路，与新的伙伴同行。怀着这段旅程的记忆，再次运送灯火。',text:'村の門に、小さな火種がひとつ残った。今度は別の道を、別の仲間と。この旅の記憶を胸に、新しい灯を運ぼう。',loss:true}
 ];
 if(cutscene.kind==='chapter')return [
  {image:'pilgrimage',tag:`第${chapter}ステージ 踏破 / CHAPTER CLEAR`,title:'ひとつ、夜を越えた。',text:`${region(chapter-1)?.name||'前の土地'}を覆っていた気配が、背後へ遠ざかる。キャラバンの灯はまだ燃えている。`,clear:true},
  {image:'chapter',chapter:special?16:((chapter-(s.endless?Math.floor((chapter+1)/50):0)+(s.skippedAbyss||0))%16),special,tag:`第${chapter+1}ステージ / ${region(chapter).en}`,title:region(chapter).name,text:region(chapter).beats[0]},
  {image:'chapter',chapter:special?16:((chapter-(s.endless?Math.floor((chapter+1)/50):0)+(s.skippedAbyss||0))%16),special,tag:'新たな道 / 次の章の主',title:'灯の行く先に、待つもの。',text:'古い道の先には、その土地の夜を守る主がいるという。まだ見ぬ影を越えて、灯を次の土地へ運ぼう。',boss:true}
 ];
 return endingInfo(s).frames;
}
