// 敵・ボスの耐性と固有能力　定義（catalog）に数値として持たせ、戦闘処理（engine）と表示（app）が共通で参照する。
const hash=s=>{let h=2166136261;for(const ch of String(s)){h^=ch.codePointAt(0);h=Math.imul(h,16777619)}return h>>>0};

// 表示用：敵が持つ能力の一覧（名前・説明）
export function enemyTraits(e){
 if(!e)return[];const t=[];
 if(e.fleeing)t.push({id:'flee',name:'逃走',desc:`${Math.max(0,(e.fleeTurns||3)-(e.turnSeen||0))}ターン後に逃げる　倒すと報酬が大きい`});
 if(e.hitCap)t.push({id:'hitCap',name:'すばしこい',desc:`1回に受けるダメージは最大${e.hitCap}`});
 if(e.armor)t.push({id:'armor',name:'硬い皮膚',desc:`受けるダメージを1回ごとに${e.armor}軽減（最低1）`});
 if(e.aoeResist)t.push({id:'aoeResist',name:'群れの守り',desc:'全体攻撃のダメージを半減'});
 if(e.poisonResist)t.push({id:'poisonResist',name:'毒耐性',desc:'受ける毒が半分（切り上げ）'});
 if(e.stunImmune)t.push({id:'stunImmune',name:'不動',desc:'足止めを受けない'});
 if(e.weakImmune)t.push({id:'weakImmune',name:'見切り',desc:'弱点を受けない'});
 if(e.spikes)t.push({id:'spikes',name:'棘',desc:`攻撃してきたカードの使い手に${e.spikes}ダメージ`});
 if(e.shieldTurn)t.push({id:'shieldTurn',name:'鉄壁',desc:`毎ターン盾${e.shieldTurn}`});
 if(e.regen)t.push({id:'regen',name:'再生',desc:`毎ターンHP${e.regen}回復`});
 if((e.multiStrike||1)>1)t.push({id:'multiStrike',name:'連撃',desc:`攻撃が${e.multiStrike}回連続`});
 const min=e.actionsMin||1,max=Math.max(min,e.actionsMax||1);if(max>1&&!e.demon)t.push({id:'multiAction',name:'連続行動',desc:min===max?`1ターンに${max}回行動`:`1ターンに${min}〜${max}回行動`});
 if(e.phaseActions&&max<e.phaseActions)t.push({id:'multiAction',name:'本気',desc:`HP半分以下で1ターンに最大${e.phaseActions}回行動`});
 if(e.enrage&&e.boss)t.push({id:'enrage',name:'逆上',desc:`HP半分で攻撃力+${e.enrage}${e.phaseShield?`・盾${e.phaseShield}`:''}`});
 return t;
}

// 定義への割り当て（同じ敵は毎回同じ能力　章が進むほど能力が増える）
const RESISTS=['armor','aoeResist','poisonResist','stunImmune','weakImmune','spikes'];
export function assignEnemyTraits(def,{boss=false}={}){
 if(def.demon||def.fleeing)return def;
 const h=hash(def.id),ch=Math.max(0,Math.min(15,def.chapter|0)),special=!!def.specialEnemy;
 const count=boss?(ch>=8?3:ch>=2?2:1):special?2:ch>=10?2:ch>=4?1+(h%3===0?1:0):(h%4===0?0:1);
 const picks=[];for(let k=0;picks.length<count&&k<12;k++){const t=RESISTS[(h>>>(k*3))%RESISTS.length];if(!picks.includes(t))picks.push(t)}
 // ボスへの足止め・弱点は重要な攻略手段なので無効化は一部のボスに限る
 for(const t of picks){
  if(boss&&(t==='stunImmune'||t==='weakImmune')&&h%3!==0)continue;
  if(t==='armor')def.armor??=1+Math.floor(ch/4)+(boss&&ch>=4?1:0);
  else if(t==='spikes')def.spikes??=2+Math.floor(ch/3)+(boss&&ch>=4?1:0);
  else def[t]??=true;
 }
 // 複数回行動：第3・4ステージのボスはHP半分以下で2回行動、第5ステージ以降は1〜2回（第9以降は常に2回）、通常敵は後半ほど2回行動を持ちやすい
 if(boss){if(ch<4){if(ch>=2)def.phaseActions??=2}else{def.actionsMin??=ch>=8?2:1;def.actionsMax??=2}}
 else if(special||ch>=5&&h%5<(ch>=9?3:2)){def.actionsMin??=1;def.actionsMax??=2}
 // 毎ターン盾・再生がない通常敵にも章が進むと固有能力を付ける
 if(!boss&&ch>=2&&!def.shieldTurn&&!def.regen){if(h%7===1)def.shieldTurn=2+Math.floor(ch/2);else if(h%7===4)def.regen=1+Math.floor(ch/3)}
 return def;
}

// 逃げる敵（宝を抱えた精）
export const TREASURE_ENEMY={id:'treasure_sprite',kind:'treasure_sprite',artId:'eclipseorb',name:'宝抱えの灯精',chapter:-1,hp:24,atk:0,pattern:['guard'],ability:'旅人の落とした宝を抱えて夜を漂う　見つかるとすぐに逃げ出す',fleeing:true,treasure:true,specialEnemy:true};
export function treasureStats(chapter,loop=0){const c=Math.max(0,chapter);return{max:Math.round((26+c*9)*Math.pow(1.2,loop)),armor:2+Math.floor(c/3),hitCap:6+c,fleeTurns:3}}
export function treasureReward(chapter){return{gold:70+chapter*25,potions:1}}
export function treasureChance(s){return Math.min(.2,.1+Math.max(0,s.chapter)*.01)}
