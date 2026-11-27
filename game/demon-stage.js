export const DEMON_CHAPTER={name:'黒氷の魔王城',en:'THRONE OF THE FROZEN ABYSS',beats:['闇の氷獄の奥で最後の王が待っている。','黒い氷が灯火を映し王座への道を照らす。','遠い鐘が響く。ここにいるのは旅人と魔王だけだ。','十の刻限が尽きる前に終焉を打ち破れ。']};
export const DEMON_SKILLS=[
 {id:'demon-verdict',name:'黒冠の断罪',kind:'heavy',factor:1.6},
 {id:'demon-chain',name:'氷獄の鎖',kind:'hex',factor:0},
 {id:'demon-soul',name:'魂蝕の刃',kind:'venom',factor:.8,poison:4},
 {id:'demon-barrier',name:'冥王の障壁',kind:'guard',factor:2},
 {id:'demon-zero',name:'絶対零度',kind:'sweep',factor:.85},
 {id:'demon-moon',name:'血月の再臨',kind:'healAll',factor:1.8},
 {id:'demon-curse',name:'魔眼の呪印',kind:'curse',value:3},
 {id:'demon-burial',name:'黒炎の葬送',kind:'flurry',factor:.65,hits:3},
 {id:'demon-tax',name:'奈落の徴税',kind:'drain',value:50},
 {id:'demon-command',name:'堕天の号令',kind:'rally',factor:.2}
];
export const DEMON_BOSS={id:'demon_king',kind:'demon_king',boss:true,demon:true,name:'氷獄の魔王',chapter:17,hp:2000,atk:60,pattern:['attack','heavy','flurry','sweep','venom','guard','guardAlly','mend','healAll','hex','curse','disrupt','rally','drain','wither','summon'],enrage:12,phaseShield:60,multiStrike:1,ability:'毎ターン2〜4回行動。全ボスの技と魔王専用の10種の技を使う。10ターン目以降は足止めを無効化し「終焉・アポカリプス」で全員に99999ダメージ。'};
