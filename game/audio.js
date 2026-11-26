export const AUDIO_DEFAULTS=Object.freeze({master:0.75,bgm:0.42,sfx:0.7,muted:false,preserveExternal:true});
export function normalizeAudioSettings(input={}){let result={};for(let key of ['master','bgm','sfx'])result[key]=typeof input[key]==='number'&&Number.isFinite(input[key])?Math.min(1,Math.max(0,input[key])):AUDIO_DEFAULTS[key];result.muted=input.muted===true;result.preserveExternal=input.preserveExternal!==false;return result}
const CUES=['heavy-slash','heavy-impact','heavy-boss','heavy-summon','heavy-guard','heavy-dice','sword','sword2','sword3','arrow','arrow2','arrow3','enemy','enemy2','enemy3','shield','bottle','card','card2','card3','heal','link','turn','victory','coin','click','cancel','save','continue','page','footstep','event','chest','boss','ambush','upgrade','relic','equip','remove','poison','curse','buff','stun','mend','sweep','defeat','impact','spell','poisoncast','wardcast','flamecast','arrowcast'];
export const MUSIC_TRACKS=['demon-king',"boss-watcher_0","boss-watcher_1","boss-watcher_2","boss-watcher_3","boss-watcher_4","boss-watcher_5","boss-watcher_6","boss-watcher_7","boss-watcher_8","boss-watcher_9","boss-watcher_10","boss-watcher_11","boss-watcher_12","boss-watcher_13","boss-watcher_14","boss-watcher_15","abyss-map","abyss-battle","abyss-boss","title", "map-0", "map-1", "map-2", "map-3", "battle-0-a", "battle-0-b", "battle-1-a", "battle-1-b", "battle-2-a", "battle-2-b", "battle-3-a", "battle-3-b", "boss-rootking", "boss-huntmatriarch", "boss-bellkeeper", "boss-drownedsaint", "boss-ashqueen", "boss-executioner", "boss-nighteater", "boss-dawnwarden", "event-wonder", "event-omen", "event-traveler", "shop", "camp", "ending", "boss-seedoracle", "boss-tidemirror", "boss-furnacedrake", "boss-starserpent", "map-4", "battle-4-a", "boss-sovereign_4_0", "boss-sovereign_4_1", "map-5", "battle-5-a", "boss-sovereign_5_0", "boss-sovereign_5_1", "map-6", "battle-6-a", "boss-sovereign_6_0", "boss-sovereign_6_1", "map-7", "battle-7-a", "boss-sovereign_7_0", "boss-sovereign_7_1", "map-8", "battle-8-a", "boss-sovereign_8_0", "boss-sovereign_8_1", "map-9", "battle-9-a", "boss-sovereign_9_0", "boss-sovereign_9_1", "map-10", "battle-10-a", "boss-sovereign_10_0", "boss-sovereign_10_1", "map-11", "battle-11-a", "boss-sovereign_11_0", "boss-sovereign_11_1", "map-12", "battle-12-a", "boss-sovereign_12_0", "boss-sovereign_12_1", "map-13", "battle-13-a", "boss-sovereign_13_0", "boss-sovereign_13_1", "map-14", "battle-14-a", "boss-sovereign_14_0", "boss-sovereign_14_1", "map-15", "battle-15-a", "boss-sovereign_15_0", "boss-sovereign_15_1"];
export function musicScene(s,inTitle=false){if(inTitle)return 'title';if(s.phase==='lost')return 'event-omen';if(s.demon?.active||s.phase==='demon-gate')return 'demon-king';let region=(s.chapter-(s.endless?Math.floor((s.chapter+1)/50):0)+(s.skippedAbyss||0))%16;if(s.endless&&s.legacySpecialChapter!==s.chapter&&(s.chapter+1)%50===0)return s.phase==='battle'?s.battle.type==='boss'?'abyss-boss':'abyss-battle':'abyss-map';if(s.cutscene)return s.cutscene.kind==='ending'?'ending':s.cutscene.kind==='intro'?'title':'map-'+region;if(s.phase==='battle'){if(s.battle.type==='boss'){if(s.bossId.startsWith('watcher_'))return 'boss-'+s.bossId;return 'boss-'+s.bossId}return 'battle-'+region+'-'+(region<4&&(s.battle.type==='elite'||s.step%2)?'b':'a')}if(s.phase==='map')return 'map-'+region;if(s.phase==='shop')return 'shop';if(['camp','forge','blessing'].includes(s.phase))return 'camp';if(s.phase==='recruit')return 'event-traveler';if(['won','cycle'].includes(s.phase))return 'ending';if(['lost','shrine'].includes(s.phase)||s.phase==='mystery'&&s.chapter>=2)return 'event-omen';return s.phase==='event'&&s.event%2?'event-omen':'event-wonder'}
export class AudioMixer{
 constructor(settings,onStatus=()=>{}){this.settings=normalizeAudioSettings(settings);this.onStatus=onStatus;this.scene='journey';this.context=null;this.unlocked=false;this.hidden=false;this.buffers=new Map();this.loading=new Map();this.tracks=new Map();this.voices=new Set();this.lastCue=new Map();this.variantIndex={};this.status='画面を操作するとBGMが始まります';}
 report(text){this.status=text;this.onStatus(text)}
 applySessionPolicy(){try{const session=globalThis.navigator?.audioSession;if(session)session.type=this.settings.preserveExternal?'ambient':'playback'}catch{/* Unsupported browser policies must not silence game audio. */}}
 initialize(){
  this.applySessionPolicy();
  if(this.context)return true;
  const Context=globalThis.AudioContext||globalThis.webkitAudioContext;if(!Context){this.report('このブラウザでは音声を再生できません');return false}
  try{this.context=new Context();this.master=this.context.createGain();this.music=this.context.createGain();this.effects=this.context.createGain();this.compressor=this.context.createDynamicsCompressor();this.compressor.threshold.value=-8;this.compressor.ratio.value=4;this.music.connect(this.master);this.effects.connect(this.master);this.master.connect(this.compressor);this.compressor.connect(this.context.destination);this.applyLevels();return true}catch{this.report('音声の初期化に失敗しました');return false}
 }
 async unlock(){
  if(!this.initialize())return false;
  try{await this.context.resume();if(this.context.state!=='running'){this.report('「BGMを再生」を押して音声を有効にしてください');return false}this.unlocked=true;this.report(this.settings.muted?'消音中':'BGM・効果音を再生できます');this.syncMusic();for(let cue of CUES)this.loadCue(cue).catch(()=>{});return true}catch{this.report('「BGMを再生」を押すと再開できます');return false}
 }
 applyLevels(){if(!this.context)return;let t=this.context.currentTime;this.master.gain.setTargetAtTime(this.settings.muted?0:this.settings.master,t,.025);this.music.gain.setTargetAtTime(this.settings.bgm,t,.025);this.effects.gain.setTargetAtTime(this.settings.sfx,t,.015)}
 setVolume(channel,value){if(!['master','bgm','sfx'].includes(channel))return;this.settings=normalizeAudioSettings({...this.settings,[channel]:value});this.applyLevels()}
 setMuted(muted){this.settings.muted=!!muted;this.applyLevels();this.report(this.settings.muted?'消音中':this.unlocked?'BGM・効果音を再生できます':'画面を操作するとBGMが始まります')}
 setExternalPriority(enabled){this.settings.preserveExternal=!!enabled;this.applySessionPolicy();this.report(this.settings.muted?'消音中':this.unlocked?'BGM・効果音を再生できます':'画面を操作するとBGMが始まります')}
 setScene(scene){let next=[...MUSIC_TRACKS,'journey','battle'].includes(scene)?scene:'journey';if(this.scene===next)return;this.previousScene=this.scene;this.scene=next;this.syncMusic()}
 createTrack(name){
  if(this.tracks.has(name))return this.tracks.get(name);
  let element=new Audio(`assets/audio/${name}.mp3?v=45`);element.loop=true;element.preload='auto';
  let source=this.context.createMediaElementSource(element),gain=this.context.createGain();gain.gain.value=0;source.connect(gain);gain.connect(this.music);
  let track={element,gain,source,pauseTimer:null};element.addEventListener('error',()=>this.report('BGMを読み込めませんでした。通信を確認して「BGMを再生」を押してください'));
  this.tracks.set(name,track);return track;
 }
 syncMusic(){
  if(!this.unlocked||this.hidden||!this.context)return;
  let target=this.createTrack(this.scene),now=this.context.currentTime;
  for(let [name,track]of this.tracks){clearTimeout(track.pauseTimer);track.gain.gain.cancelScheduledValues(now);track.gain.gain.setTargetAtTime(name===this.scene?1:0,now,.25);if(name!==this.scene)track.pauseTimer=setTimeout(()=>{if(name!==this.scene)track.element.pause()},1000)}
  if(this.tracks.size>4){for(const [name,track] of this.tracks){if(name===this.scene||name===this.previousScene)continue;clearTimeout(track.pauseTimer);track.element.pause();track.source.disconnect?.();track.gain.disconnect?.();track.element.src='';this.tracks.delete(name);if(this.tracks.size<=4)break}}
  target.element.play().catch(()=>this.report('「BGMを再生」を押すと音楽を開始できます'));
 }
 async loadCue(name){
  if(this.buffers.has(name))return this.buffers.get(name);if(this.loading.has(name))return this.loading.get(name);
  let promise=(async()=>{let response=await fetch(`assets/audio/${name}.mp3?v=45`);if(!response.ok)throw Error('cue fetch');let buffer=await this.context.decodeAudioData(await response.arrayBuffer());this.buffers.set(name,buffer);return buffer})();
  this.loading.set(name,promise);try{return await promise}finally{this.loading.delete(name)}
 }
 async play(name='card'){
  if(!this.unlocked||this.hidden||this.settings.muted||this.settings.master===0||this.settings.sfx===0)return;
  if(!CUES.includes(name))name='card';let now=Date.now();if(now-(this.lastCue.get(name)||0)<60)return;this.lastCue.set(name,now);if(['sword','arrow','enemy','card'].includes(name)){let root=name,variant=(this.variantIndex[root]||0)%3;this.variantIndex[root]=variant+1;name=variant?root+(variant+1):root;}
  try{let buffer=await this.loadCue(name);if(this.hidden||this.settings.muted||!this.unlocked)return;
   if(this.voices.size>=8){let oldest=this.voices.values().next().value;oldest.stop();this.voices.delete(oldest)}
   let source=this.context.createBufferSource();source.buffer=buffer;source.connect(this.effects);this.voices.add(source);source.onended=()=>this.voices.delete(source);source.start();
  }catch{this.report('一部の効果音を読み込めませんでした')}
 }
 async setHidden(hidden){this.hidden=hidden;if(!this.context)return;if(hidden){for(let track of this.tracks.values())track.element.pause();try{await this.context.suspend()}catch{}}else if(this.unlocked){try{this.applySessionPolicy();await this.context.resume();this.syncMusic()}catch{this.report('「BGMを再生」を押すと再開できます')}}}
}
