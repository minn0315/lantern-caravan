// 合成効果音：既存の効果音に「重さ・質感」を重ねる。WebAudioだけで鳴らすので素材ファイルは不要。
// 攻撃方法（斬撃・打撃・射撃・魔法・炎・氷・雷・毒など）と強さ（normal/major/ultimate）で鳴らし分ける。
let mixer=null,noise=null;
export function bindSynth(m){mixer=m}
const ready=()=>mixer&&mixer.context&&mixer.unlocked&&!mixer.hidden&&!mixer.settings.muted&&mixer.settings.sfx>0&&mixer.settings.master>0;
function noiseBuffer(ctx){if(noise)return noise;const len=ctx.sampleRate*1.2,buf=ctx.createBuffer(1,len,ctx.sampleRate),d=buf.getChannelData(0);let b=0;for(let i=0;i<len;i++){const w=Math.random()*2-1;b=.985*b+.015*w;d[i]=w*.65+b*3.2}noise=buf;return buf}
function out(ctx,level){const g=ctx.createGain();g.gain.value=level;g.connect(mixer.effects);return g}
function env(g,t,a,peak,d,end=.0001){g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,peak),t+a);g.gain.exponentialRampToValueAtTime(end,t+a+d)}
// 低い衝撃（サブの落ち込み）
function thump(ctx,t,{from=140,to=42,dur=.32,gain=.9}={}){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(from,t);o.frequency.exponentialRampToValueAtTime(to,t+dur);env(g,t,.004,gain,dur);o.connect(g).connect(out(ctx,1));o.start(t);o.stop(t+dur+.05)}
// フィルターを通したノイズ（風切り・打撃の芯・爆発）
function hiss(ctx,t,{type='bandpass',freq=1800,to=null,q=1.2,dur=.18,gain=.5,attack=.004}={}){const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noiseBuffer(ctx);f.type=type;f.frequency.setValueAtTime(freq,t);if(to)f.frequency.exponentialRampToValueAtTime(to,t+dur);f.Q.value=q;env(g,t,attack,gain,dur);s.connect(f).connect(g).connect(out(ctx,1));s.start(t,Math.random()*.4);s.stop(t+attack+dur+.05)}
// 音程のある音（チャイム・光・呪文）
function tone(ctx,t,{freq=880,to=null,type='sine',dur=.4,gain=.25,attack=.005,detune=0}={}){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);if(to)o.frequency.exponentialRampToValueAtTime(to,t+dur);o.detune.value=detune;env(g,t,attack,gain,dur);o.connect(g).connect(out(ctx,1));o.start(t);o.stop(t+attack+dur+.05)}
// 金属の響き（剣・盾・鎖）：非整数倍音
function metal(ctx,t,{base=620,dur=.5,gain=.18}={}){for(const [r,a] of [[1,1],[2.76,.6],[5.4,.38],[8.93,.22]])tone(ctx,t,{freq:base*r,type:'sine',dur:dur*(1.1-a*.3),gain:gain*a,attack:.002})}
// 歪んだ重低音（ボス・大技）
function crush(ctx,t,{from=90,to=30,dur=.7,gain=.55}={}){const o=ctx.createOscillator(),ws=ctx.createWaveShaper(),g=ctx.createGain(),curve=new Float32Array(256);for(let i=0;i<256;i++){const x=i/128-1;curve[i]=Math.tanh(x*4)}ws.curve=curve;o.type='sawtooth';o.frequency.setValueAtTime(from,t);o.frequency.exponentialRampToValueAtTime(to,t+dur);const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=420;env(g,t,.01,gain,dur);o.connect(ws).connect(lp).connect(g).connect(out(ctx,1));o.start(t);o.stop(t+dur+.05)}
const R=(a,b)=>a+Math.random()*(b-a);
const RECIPES={
 slash(c,t,k){hiss(c,t,{freq:2600,to:900,q:.9,dur:.16*k,gain:.42});metal(c,t+.03,{base:R(560,720),dur:.38,gain:.12*k});thump(c,t+.04,{from:180,to:55,dur:.22,gain:.55*k})},
 blunt(c,t,k){thump(c,t,{from:120,to:38,dur:.36,gain:1*k});hiss(c,t,{type:'lowpass',freq:900,q:.7,dur:.12,gain:.6*k});hiss(c,t+.02,{freq:2400,q:3,dur:.06,gain:.25})},
 arrow(c,t,k){hiss(c,t,{freq:4200,to:1600,q:2.2,dur:.14,gain:.32,attack:.03});hiss(c,t+.16,{freq:1400,q:1.5,dur:.07,gain:.4*k});thump(c,t+.16,{from:200,to:80,dur:.14,gain:.45*k})},
 magic(c,t,k){for(let i=0;i<3;i++)tone(c,t+i*.05,{freq:R(660,1320)*(i+1)*.5,type:'triangle',dur:.6,gain:.1*k,attack:.01});hiss(c,t,{type:'highpass',freq:5200,q:.5,dur:.4,gain:.12,attack:.08});thump(c,t+.1,{from:160,to:60,dur:.3,gain:.5*k})},
 fire(c,t,k){hiss(c,t,{type:'lowpass',freq:1600,to:400,q:.6,dur:.55*k,gain:.55,attack:.03});for(let i=0;i<8*k;i++)hiss(c,t+R(0,.45),{freq:R(2500,6000),q:6,dur:.02,gain:.18});thump(c,t,{from:110,to:40,dur:.4,gain:.6*k})},
 ice(c,t,k){for(let i=0;i<6;i++)tone(c,t+i*.025,{freq:R(2200,4200),type:'square',dur:.05,gain:.05});tone(c,t+.08,{freq:1760,to:2640,type:'sine',dur:.5,gain:.12*k});hiss(c,t,{freq:6000,q:4,dur:.25,gain:.18})},
 thunder(c,t,k){hiss(c,t,{type:'highpass',freq:1500,q:.4,dur:.09,gain:.7*k,attack:.001});hiss(c,t+.05,{type:'lowpass',freq:500,to:120,q:.5,dur:.9*k,gain:.6});thump(c,t+.02,{from:90,to:30,dur:.6,gain:.8*k})},
 poison(c,t,k){for(let i=0;i<7;i++)tone(c,t+i*.06+R(0,.03),{freq:R(260,520),to:R(700,1100),type:'sine',dur:.08,gain:.12,attack:.01});hiss(c,t,{type:'lowpass',freq:700,q:2,dur:.4,gain:.2,attack:.05})},
 heal(c,t,k){[523,659,784,1046].forEach((f,i)=>tone(c,t+i*.07,{freq:f*(k>1?1.5:1),type:'triangle',dur:.55,gain:.09,attack:.01}));hiss(c,t,{type:'highpass',freq:7000,q:.3,dur:.5,gain:.06,attack:.1})},
 shield(c,t,k){metal(c,t,{base:R(300,380),dur:.7,gain:.16*k});thump(c,t,{from:150,to:70,dur:.25,gain:.6});hiss(c,t,{freq:3200,q:2,dur:.05,gain:.3})},
 buff(c,t,k){tone(c,t,{freq:220,to:660,type:'sawtooth',dur:.35,gain:.06*k,attack:.05});tone(c,t+.05,{freq:440,to:1320,type:'triangle',dur:.4,gain:.08});thump(c,t+.3,{from:120,to:60,dur:.2,gain:.4})},
 coin(c,t,k){for(let i=0;i<4+2*k;i++){const f=R(2300,3400);tone(c,t+i*.045,{freq:f,type:'square',dur:.09,gain:.04});tone(c,t+i*.045,{freq:f*1.5,type:'sine',dur:.15,gain:.05})}thump(c,t,{from:140,to:60,dur:.2,gain:.4*k})},
 paper(c,t,k){for(let i=0;i<5;i++)hiss(c,t+i*.04,{freq:R(2500,5000),q:1.2,dur:.05,gain:.22});hiss(c,t+.15,{type:'lowpass',freq:1200,to:300,dur:.4,gain:.3*k})},
 dice(c,t,k){for(let i=0;i<6;i++)hiss(c,t+i*R(.05,.09),{freq:R(1800,3200),q:8,dur:.025,gain:.35});thump(c,t+.4,{from:200,to:90,dur:.12,gain:.35})},
 claw(c,t,k){for(let i=0;i<3;i++)hiss(c,t+i*.05,{freq:R(1200,2200),to:500,q:1,dur:.09,gain:.45});thump(c,t+.06,{from:110,to:45,dur:.3,gain:.75*k})},
 sweep(c,t,k){hiss(c,t,{type:'lowpass',freq:3000,to:250,q:.7,dur:.6,gain:.55,attack:.05});thump(c,t+.15,{from:100,to:35,dur:.5,gain:.8*k})},
 boss(c,t,k){crush(c,t,{gain:.5*k});thump(c,t,{from:80,to:24,dur:.9,gain:1});hiss(c,t,{type:'lowpass',freq:800,to:150,dur:.9,gain:.5})},
 dark(c,t,k){tone(c,t,{freq:110,to:55,type:'sawtooth',dur:.9,gain:.12*k,attack:.08});tone(c,t,{freq:116.5,to:58,type:'sawtooth',dur:.9,gain:.1,attack:.08});hiss(c,t,{type:'bandpass',freq:400,q:4,dur:.8,gain:.25,attack:.2})},
 summon(c,t,k){tone(c,t,{freq:70,to:220,type:'sawtooth',dur:.8,gain:.1,attack:.3});hiss(c,t+.2,{freq:600,to:2400,q:2,dur:.6,gain:.25,attack:.2})},
 crit(c,t,k){metal(c,t,{base:900,dur:.3,gain:.12});hiss(c,t,{type:'highpass',freq:3000,q:.4,dur:.05,gain:.6,attack:.001})},
 shatter(c,t,k){for(let i=0;i<9;i++)tone(c,t+R(0,.12),{freq:R(1800,5200),type:'triangle',dur:R(.05,.2),gain:.06});thump(c,t,{from:220,to:80,dur:.18,gain:.5})}
};
const K={normal:1,major:1.35,ultimate:1.75};
let last=new Map();
export function synth(kind,intensity='normal',delay=0){
 if(!ready()||!RECIPES[kind])return;const ctx=mixer.context,now=performance.now();if(now-(last.get(kind)||0)<45)return;last.set(kind,now);
 const k=K[intensity]||1;try{RECIPES[kind](ctx,ctx.currentTime+.005+delay,k);if(intensity==='ultimate'&&kind!=='boss')RECIPES.crit(ctx,ctx.currentTime+.01+delay,k)}catch{}
}
export const SYNTH_KINDS=Object.keys(RECIPES);
