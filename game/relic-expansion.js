import {designRelic} from './relic-design.js?v=47';
// Additional relic content. All effects are implemented in engine.js.
// Keep special-stage rewards outside the normal and boss offer pools.
export const ADDITIONAL_RELICS = [
  {
    "id": "expansion_n_01_01",
    "name": "赤銅の縫い針",
    "enName": "Copper Needle",
    "zhName": "赤铜缝针",
    "desc": "カードの攻撃威力+1。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "sword",
    "effects": {
      "attack": 1,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "小さな刃にも、帰路を切り開く意志が宿る。"
  },
  {
    "id": "expansion_n_01_02",
    "name": "赤銅の護り帯",
    "enName": "Copper Sash",
    "zhName": "赤铜护带",
    "desc": "カードの攻撃威力+1。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "sword",
    "effects": {
      "attack": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "小さな刃にも、帰路を切り開く意志が宿る。"
  },
  {
    "id": "expansion_n_01_03",
    "name": "赤銅の薬包",
    "enName": "Copper Herb Packet",
    "zhName": "赤铜药包",
    "desc": "カードの攻撃威力+1。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "sword",
    "effects": {
      "attack": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "小さな刃にも、帰路を切り開く意志が宿る。"
  },
  {
    "id": "expansion_n_01_04",
    "name": "赤銅の折り札",
    "enName": "Copper Folded Charm",
    "zhName": "赤铜折符",
    "desc": "カードの攻撃威力+1。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "sword",
    "effects": {
      "attack": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "小さな刃にも、帰路を切り開く意志が宿る。"
  },
  {
    "id": "expansion_n_01_05",
    "name": "赤銅の旅帳",
    "enName": "Copper Travel Ledger",
    "zhName": "赤铜旅簿",
    "desc": "カードの攻撃威力+1。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "sword",
    "effects": {
      "attack": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "小さな刃にも、帰路を切り開く意志が宿る。"
  },
  {
    "id": "expansion_n_01_06",
    "name": "赤銅の火口箱",
    "enName": "Copper Tinderbox",
    "zhName": "赤铜火种盒",
    "desc": "カードの攻撃威力+1。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "sword",
    "effects": {
      "attack": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "小さな刃にも、帰路を切り開く意志が宿る。"
  },
  {
    "id": "expansion_n_01_07",
    "name": "赤銅の結び玉",
    "enName": "Copper Knot Bead",
    "zhName": "赤铜结珠",
    "desc": "カードの攻撃威力+1。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "sword",
    "effects": {
      "attack": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "小さな刃にも、帰路を切り開く意志が宿る。"
  },
  {
    "id": "expansion_n_01_08",
    "name": "赤銅の星片",
    "enName": "Copper Star Shard",
    "zhName": "赤铜星片",
    "desc": "カードの攻撃威力+1。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "sword",
    "effects": {
      "attack": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "小さな刃にも、帰路を切り開く意志が宿る。"
  },
  {
    "id": "expansion_n_01_09",
    "name": "赤銅の木杯",
    "enName": "Copper Wooden Cup",
    "zhName": "赤铜木杯",
    "desc": "カードの攻撃威力+1。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "sword",
    "effects": {
      "attack": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "小さな刃にも、帰路を切り開く意志が宿る。"
  },
  {
    "id": "expansion_n_02_01",
    "name": "早燕の縫い針",
    "enName": "Swift Swallow Needle",
    "zhName": "迅燕缝针",
    "desc": "消費気力1のカードの攻撃威力+2。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "sword",
    "effects": {
      "cheapAttack": 2,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "軽い一撃を重ねる旅人の守り札。"
  },
  {
    "id": "expansion_n_02_02",
    "name": "早燕の護り帯",
    "enName": "Swift Swallow Sash",
    "zhName": "迅燕护带",
    "desc": "消費気力1のカードの攻撃威力+2。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "sword",
    "effects": {
      "cheapAttack": 2,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "軽い一撃を重ねる旅人の守り札。"
  },
  {
    "id": "expansion_n_02_03",
    "name": "早燕の薬包",
    "enName": "Swift Swallow Herb Packet",
    "zhName": "迅燕药包",
    "desc": "消費気力1のカードの攻撃威力+2。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "sword",
    "effects": {
      "cheapAttack": 2,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "軽い一撃を重ねる旅人の守り札。"
  },
  {
    "id": "expansion_n_02_04",
    "name": "早燕の折り札",
    "enName": "Swift Swallow Folded Charm",
    "zhName": "迅燕折符",
    "desc": "消費気力1のカードの攻撃威力+3。戦闘開始時、敵全員に弱点1。",
    "icon": "sword",
    "effects": {
      "cheapAttack": 3,
      "firstWeak": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "軽い一撃を重ねる旅人の守り札。"
  },
  {
    "id": "expansion_n_02_05",
    "name": "早燕の旅帳",
    "enName": "Swift Swallow Travel Ledger",
    "zhName": "迅燕旅簿",
    "desc": "消費気力1のカードの攻撃威力+2。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "sword",
    "effects": {
      "cheapAttack": 2,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "軽い一撃を重ねる旅人の守り札。"
  },
  {
    "id": "expansion_n_02_06",
    "name": "早燕の火口箱",
    "enName": "Swift Swallow Tinderbox",
    "zhName": "迅燕火种盒",
    "desc": "消費気力1のカードの攻撃威力+2。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "sword",
    "effects": {
      "cheapAttack": 2,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "軽い一撃を重ねる旅人の守り札。"
  },
  {
    "id": "expansion_n_02_07",
    "name": "早燕の結び玉",
    "enName": "Swift Swallow Knot Bead",
    "zhName": "迅燕结珠",
    "desc": "消費気力1のカードの攻撃威力+2。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "sword",
    "effects": {
      "cheapAttack": 2,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "軽い一撃を重ねる旅人の守り札。"
  },
  {
    "id": "expansion_n_02_08",
    "name": "早燕の星片",
    "enName": "Swift Swallow Star Shard",
    "zhName": "迅燕星片",
    "desc": "消費気力1のカードの攻撃威力+2。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "sword",
    "effects": {
      "cheapAttack": 2,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "軽い一撃を重ねる旅人の守り札。"
  },
  {
    "id": "expansion_n_02_09",
    "name": "早燕の木杯",
    "enName": "Swift Swallow Wooden Cup",
    "zhName": "迅燕木杯",
    "desc": "消費気力1のカードの攻撃威力+2。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "sword",
    "effects": {
      "cheapAttack": 2,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "軽い一撃を重ねる旅人の守り札。"
  },
  {
    "id": "expansion_n_03_01",
    "name": "宵鼓の縫い針",
    "enName": "Dusk Drum Needle",
    "zhName": "暮鼓缝针",
    "desc": "ターン中3枚目以降に使うカードの攻撃威力+2。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "bell",
    "effects": {
      "lateAttack": 2,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つ目の足音から古い鼓が応える。"
  },
  {
    "id": "expansion_n_03_02",
    "name": "宵鼓の護り帯",
    "enName": "Dusk Drum Sash",
    "zhName": "暮鼓护带",
    "desc": "ターン中3枚目以降に使うカードの攻撃威力+2。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "bell",
    "effects": {
      "lateAttack": 2,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つ目の足音から古い鼓が応える。"
  },
  {
    "id": "expansion_n_03_03",
    "name": "宵鼓の薬包",
    "enName": "Dusk Drum Herb Packet",
    "zhName": "暮鼓药包",
    "desc": "ターン中3枚目以降に使うカードの攻撃威力+2。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "bell",
    "effects": {
      "lateAttack": 2,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つ目の足音から古い鼓が応える。"
  },
  {
    "id": "expansion_n_03_04",
    "name": "宵鼓の折り札",
    "enName": "Dusk Drum Folded Charm",
    "zhName": "暮鼓折符",
    "desc": "ターン中3枚目以降に使うカードの攻撃威力+2。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "bell",
    "effects": {
      "lateAttack": 2,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つ目の足音から古い鼓が応える。"
  },
  {
    "id": "expansion_n_03_05",
    "name": "宵鼓の旅帳",
    "enName": "Dusk Drum Travel Ledger",
    "zhName": "暮鼓旅簿",
    "desc": "ターン中3枚目以降に使うカードの攻撃威力+2。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "bell",
    "effects": {
      "lateAttack": 2,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つ目の足音から古い鼓が応える。"
  },
  {
    "id": "expansion_n_03_06",
    "name": "宵鼓の火口箱",
    "enName": "Dusk Drum Tinderbox",
    "zhName": "暮鼓火种盒",
    "desc": "ターン中3枚目以降に使うカードの攻撃威力+2。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "bell",
    "effects": {
      "lateAttack": 2,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つ目の足音から古い鼓が応える。"
  },
  {
    "id": "expansion_n_03_07",
    "name": "宵鼓の結び玉",
    "enName": "Dusk Drum Knot Bead",
    "zhName": "暮鼓结珠",
    "desc": "ターン中3枚目以降に使うカードの攻撃威力+2。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "bell",
    "effects": {
      "lateAttack": 2,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つ目の足音から古い鼓が応える。"
  },
  {
    "id": "expansion_n_03_08",
    "name": "宵鼓の星片",
    "enName": "Dusk Drum Star Shard",
    "zhName": "暮鼓星片",
    "desc": "ターン中3枚目以降に使うカードの攻撃威力+2。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "bell",
    "effects": {
      "lateAttack": 2,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つ目の足音から古い鼓が応える。"
  },
  {
    "id": "expansion_n_03_09",
    "name": "宵鼓の木杯",
    "enName": "Dusk Drum Wooden Cup",
    "zhName": "暮鼓木杯",
    "desc": "ターン中3枚目以降に使うカードの攻撃威力+2。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "bell",
    "effects": {
      "lateAttack": 2,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つ目の足音から古い鼓が応える。"
  },
  {
    "id": "expansion_n_04_01",
    "name": "火花市の縫い針",
    "enName": "Spark Market Needle",
    "zhName": "火花集缝针",
    "desc": "カードの全体攻撃威力+2。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "flame",
    "effects": {
      "aoe": 2,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "人の集まる場所に、火は広がる。"
  },
  {
    "id": "expansion_n_04_02",
    "name": "火花市の護り帯",
    "enName": "Spark Market Sash",
    "zhName": "火花集护带",
    "desc": "カードの全体攻撃威力+2。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "flame",
    "effects": {
      "aoe": 2,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "人の集まる場所に、火は広がる。"
  },
  {
    "id": "expansion_n_04_03",
    "name": "火花市の薬包",
    "enName": "Spark Market Herb Packet",
    "zhName": "火花集药包",
    "desc": "カードの全体攻撃威力+2。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "flame",
    "effects": {
      "aoe": 2,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "人の集まる場所に、火は広がる。"
  },
  {
    "id": "expansion_n_04_04",
    "name": "火花市の折り札",
    "enName": "Spark Market Folded Charm",
    "zhName": "火花集折符",
    "desc": "カードの全体攻撃威力+2。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "flame",
    "effects": {
      "aoe": 2,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "人の集まる場所に、火は広がる。"
  },
  {
    "id": "expansion_n_04_05",
    "name": "火花市の旅帳",
    "enName": "Spark Market Travel Ledger",
    "zhName": "火花集旅簿",
    "desc": "カードの全体攻撃威力+2。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "flame",
    "effects": {
      "aoe": 2,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "人の集まる場所に、火は広がる。"
  },
  {
    "id": "expansion_n_04_06",
    "name": "火花市の火口箱",
    "enName": "Spark Market Tinderbox",
    "zhName": "火花集火种盒",
    "desc": "カードの全体攻撃威力+2。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "flame",
    "effects": {
      "aoe": 2,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "人の集まる場所に、火は広がる。"
  },
  {
    "id": "expansion_n_04_07",
    "name": "火花市の結び玉",
    "enName": "Spark Market Knot Bead",
    "zhName": "火花集结珠",
    "desc": "カードの全体攻撃威力+2。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "flame",
    "effects": {
      "aoe": 2,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "人の集まる場所に、火は広がる。"
  },
  {
    "id": "expansion_n_04_08",
    "name": "火花市の星片",
    "enName": "Spark Market Star Shard",
    "zhName": "火花集星片",
    "desc": "カードの全体攻撃威力+2。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "flame",
    "effects": {
      "aoe": 2,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "人の集まる場所に、火は広がる。"
  },
  {
    "id": "expansion_n_04_09",
    "name": "火花市の木杯",
    "enName": "Spark Market Wooden Cup",
    "zhName": "火花集木杯",
    "desc": "カードの全体攻撃威力+2。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "flame",
    "effects": {
      "aoe": 2,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "人の集まる場所に、火は広がる。"
  },
  {
    "id": "expansion_n_05_01",
    "name": "苔沼の縫い針",
    "enName": "Moss Marsh Needle",
    "zhName": "苔沼缝针",
    "desc": "カードで付与する毒+1。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "flask",
    "effects": {
      "poison": 1,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "苦い緑の記憶を閉じ込めた品。"
  },
  {
    "id": "expansion_n_05_02",
    "name": "苔沼の護り帯",
    "enName": "Moss Marsh Sash",
    "zhName": "苔沼护带",
    "desc": "カードで付与する毒+1。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "flask",
    "effects": {
      "poison": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "苦い緑の記憶を閉じ込めた品。"
  },
  {
    "id": "expansion_n_05_03",
    "name": "苔沼の薬包",
    "enName": "Moss Marsh Herb Packet",
    "zhName": "苔沼药包",
    "desc": "カードで付与する毒+1。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "flask",
    "effects": {
      "poison": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "苦い緑の記憶を閉じ込めた品。"
  },
  {
    "id": "expansion_n_05_04",
    "name": "苔沼の折り札",
    "enName": "Moss Marsh Folded Charm",
    "zhName": "苔沼折符",
    "desc": "カードで付与する毒+1。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "flask",
    "effects": {
      "poison": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "苦い緑の記憶を閉じ込めた品。"
  },
  {
    "id": "expansion_n_05_05",
    "name": "苔沼の旅帳",
    "enName": "Moss Marsh Travel Ledger",
    "zhName": "苔沼旅簿",
    "desc": "カードで付与する毒+1。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "flask",
    "effects": {
      "poison": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "苦い緑の記憶を閉じ込めた品。"
  },
  {
    "id": "expansion_n_05_06",
    "name": "苔沼の火口箱",
    "enName": "Moss Marsh Tinderbox",
    "zhName": "苔沼火种盒",
    "desc": "カードで付与する毒+1。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "flask",
    "effects": {
      "poison": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "苦い緑の記憶を閉じ込めた品。"
  },
  {
    "id": "expansion_n_05_07",
    "name": "苔沼の結び玉",
    "enName": "Moss Marsh Knot Bead",
    "zhName": "苔沼结珠",
    "desc": "カードで付与する毒+1。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "flask",
    "effects": {
      "poison": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "苦い緑の記憶を閉じ込めた品。"
  },
  {
    "id": "expansion_n_05_08",
    "name": "苔沼の星片",
    "enName": "Moss Marsh Star Shard",
    "zhName": "苔沼星片",
    "desc": "カードで付与する毒+1。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "flask",
    "effects": {
      "poison": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "苦い緑の記憶を閉じ込めた品。"
  },
  {
    "id": "expansion_n_05_09",
    "name": "苔沼の木杯",
    "enName": "Moss Marsh Wooden Cup",
    "zhName": "苔沼木杯",
    "desc": "カードで付与する毒+1。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "flask",
    "effects": {
      "poison": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "苦い緑の記憶を閉じ込めた品。"
  },
  {
    "id": "expansion_n_06_01",
    "name": "鷹眼の縫い針",
    "enName": "Hawkeye Needle",
    "zhName": "鹰眼缝针",
    "desc": "弱点を消費して与えるダメージが追加で+2。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "eye",
    "effects": {
      "weakBonus": 2,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ほころびを見つける狩人の目印。"
  },
  {
    "id": "expansion_n_06_02",
    "name": "鷹眼の護り帯",
    "enName": "Hawkeye Sash",
    "zhName": "鹰眼护带",
    "desc": "弱点を消費して与えるダメージが追加で+2。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "eye",
    "effects": {
      "weakBonus": 2,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ほころびを見つける狩人の目印。"
  },
  {
    "id": "expansion_n_06_03",
    "name": "鷹眼の薬包",
    "enName": "Hawkeye Herb Packet",
    "zhName": "鹰眼药包",
    "desc": "弱点を消費して与えるダメージが追加で+2。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "eye",
    "effects": {
      "weakBonus": 2,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ほころびを見つける狩人の目印。"
  },
  {
    "id": "expansion_n_06_04",
    "name": "鷹眼の折り札",
    "enName": "Hawkeye Folded Charm",
    "zhName": "鹰眼折符",
    "desc": "弱点を消費して与えるダメージが追加で+2。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "eye",
    "effects": {
      "weakBonus": 2,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ほころびを見つける狩人の目印。"
  },
  {
    "id": "expansion_n_06_05",
    "name": "鷹眼の旅帳",
    "enName": "Hawkeye Travel Ledger",
    "zhName": "鹰眼旅簿",
    "desc": "弱点を消費して与えるダメージが追加で+2。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "eye",
    "effects": {
      "weakBonus": 2,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ほころびを見つける狩人の目印。"
  },
  {
    "id": "expansion_n_06_06",
    "name": "鷹眼の火口箱",
    "enName": "Hawkeye Tinderbox",
    "zhName": "鹰眼火种盒",
    "desc": "弱点を消費して与えるダメージが追加で+2。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "eye",
    "effects": {
      "weakBonus": 2,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ほころびを見つける狩人の目印。"
  },
  {
    "id": "expansion_n_06_07",
    "name": "鷹眼の結び玉",
    "enName": "Hawkeye Knot Bead",
    "zhName": "鹰眼结珠",
    "desc": "弱点を消費して与えるダメージが追加で+2。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "eye",
    "effects": {
      "weakBonus": 2,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ほころびを見つける狩人の目印。"
  },
  {
    "id": "expansion_n_06_08",
    "name": "鷹眼の星片",
    "enName": "Hawkeye Star Shard",
    "zhName": "鹰眼星片",
    "desc": "弱点を消費して与えるダメージが追加で+2。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "eye",
    "effects": {
      "weakBonus": 2,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ほころびを見つける狩人の目印。"
  },
  {
    "id": "expansion_n_06_09",
    "name": "鷹眼の木杯",
    "enName": "Hawkeye Wooden Cup",
    "zhName": "鹰眼木杯",
    "desc": "弱点を消費して与えるダメージが追加で+2。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "eye",
    "effects": {
      "weakBonus": 2,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ほころびを見つける狩人の目印。"
  },
  {
    "id": "expansion_n_07_01",
    "name": "薄明の縫い針",
    "enName": "Twilight Needle",
    "zhName": "薄明缝针",
    "desc": "戦闘開始時、敵全員に弱点1。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "star",
    "effects": {
      "firstWeak": 1,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "まだ眠る敵の隙を照らし出す。"
  },
  {
    "id": "expansion_n_07_02",
    "name": "薄明の護り帯",
    "enName": "Twilight Sash",
    "zhName": "薄明护带",
    "desc": "戦闘開始時、敵全員に弱点1。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "star",
    "effects": {
      "firstWeak": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "まだ眠る敵の隙を照らし出す。"
  },
  {
    "id": "expansion_n_07_03",
    "name": "薄明の薬包",
    "enName": "Twilight Herb Packet",
    "zhName": "薄明药包",
    "desc": "戦闘開始時、敵全員に弱点1。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "star",
    "effects": {
      "firstWeak": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "まだ眠る敵の隙を照らし出す。"
  },
  {
    "id": "expansion_n_07_04",
    "name": "薄明の折り札",
    "enName": "Twilight Folded Charm",
    "zhName": "薄明折符",
    "desc": "戦闘開始時、敵全員に弱点2。消費気力1のカードの攻撃威力+1。",
    "icon": "star",
    "effects": {
      "firstWeak": 2,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "まだ眠る敵の隙を照らし出す。"
  },
  {
    "id": "expansion_n_07_05",
    "name": "薄明の旅帳",
    "enName": "Twilight Travel Ledger",
    "zhName": "薄明旅簿",
    "desc": "戦闘開始時、敵全員に弱点1。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "star",
    "effects": {
      "firstWeak": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "まだ眠る敵の隙を照らし出す。"
  },
  {
    "id": "expansion_n_07_06",
    "name": "薄明の火口箱",
    "enName": "Twilight Tinderbox",
    "zhName": "薄明火种盒",
    "desc": "戦闘開始時、敵全員に弱点1。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "star",
    "effects": {
      "firstWeak": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "まだ眠る敵の隙を照らし出す。"
  },
  {
    "id": "expansion_n_07_07",
    "name": "薄明の結び玉",
    "enName": "Twilight Knot Bead",
    "zhName": "薄明结珠",
    "desc": "戦闘開始時、敵全員に弱点1。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "star",
    "effects": {
      "firstWeak": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "まだ眠る敵の隙を照らし出す。"
  },
  {
    "id": "expansion_n_07_08",
    "name": "薄明の星片",
    "enName": "Twilight Star Shard",
    "zhName": "薄明星片",
    "desc": "戦闘開始時、敵全員に弱点1。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "star",
    "effects": {
      "firstWeak": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "まだ眠る敵の隙を照らし出す。"
  },
  {
    "id": "expansion_n_07_09",
    "name": "薄明の木杯",
    "enName": "Twilight Wooden Cup",
    "zhName": "薄明木杯",
    "desc": "戦闘開始時、敵全員に弱点1。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "star",
    "effects": {
      "firstWeak": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "まだ眠る敵の隙を照らし出す。"
  },
  {
    "id": "expansion_n_08_01",
    "name": "無音の縫い針",
    "enName": "Soundless Needle",
    "zhName": "无声缝针",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで2ダメージ。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "star",
    "effects": {
      "zeroPing": 2,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "力を使わぬ所作にも反響は残る。"
  },
  {
    "id": "expansion_n_08_02",
    "name": "無音の護り帯",
    "enName": "Soundless Sash",
    "zhName": "无声护带",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで2ダメージ。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "star",
    "effects": {
      "zeroPing": 2,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "力を使わぬ所作にも反響は残る。"
  },
  {
    "id": "expansion_n_08_03",
    "name": "無音の薬包",
    "enName": "Soundless Herb Packet",
    "zhName": "无声药包",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで2ダメージ。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "star",
    "effects": {
      "zeroPing": 2,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "力を使わぬ所作にも反響は残る。"
  },
  {
    "id": "expansion_n_08_04",
    "name": "無音の折り札",
    "enName": "Soundless Folded Charm",
    "zhName": "无声折符",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで2ダメージ。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "star",
    "effects": {
      "zeroPing": 2,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "力を使わぬ所作にも反響は残る。"
  },
  {
    "id": "expansion_n_08_05",
    "name": "無音の旅帳",
    "enName": "Soundless Travel Ledger",
    "zhName": "无声旅簿",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで2ダメージ。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "star",
    "effects": {
      "zeroPing": 2,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "力を使わぬ所作にも反響は残る。"
  },
  {
    "id": "expansion_n_08_06",
    "name": "無音の火口箱",
    "enName": "Soundless Tinderbox",
    "zhName": "无声火种盒",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで2ダメージ。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "star",
    "effects": {
      "zeroPing": 2,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "力を使わぬ所作にも反響は残る。"
  },
  {
    "id": "expansion_n_08_07",
    "name": "無音の結び玉",
    "enName": "Soundless Knot Bead",
    "zhName": "无声结珠",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで2ダメージ。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "star",
    "effects": {
      "zeroPing": 2,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "力を使わぬ所作にも反響は残る。"
  },
  {
    "id": "expansion_n_08_08",
    "name": "無音の星片",
    "enName": "Soundless Star Shard",
    "zhName": "无声星片",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで2ダメージ。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "star",
    "effects": {
      "zeroPing": 2,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "力を使わぬ所作にも反響は残る。"
  },
  {
    "id": "expansion_n_08_09",
    "name": "無音の木杯",
    "enName": "Soundless Wooden Cup",
    "zhName": "无声木杯",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで2ダメージ。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "star",
    "effects": {
      "zeroPing": 2,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "力を使わぬ所作にも反響は残る。"
  },
  {
    "id": "expansion_n_09_01",
    "name": "青鉄の縫い針",
    "enName": "Blue Iron Needle",
    "zhName": "青铁缝针",
    "desc": "カードで得る盾+2。各戦闘の最初のターン、手札+1。",
    "icon": "shield",
    "effects": {
      "block": 2,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "薄い鉄片が旅人の手に馴染む。"
  },
  {
    "id": "expansion_n_09_02",
    "name": "青鉄の護り帯",
    "enName": "Blue Iron Sash",
    "zhName": "青铁护带",
    "desc": "カードで得る盾+1。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "shield",
    "effects": {
      "block": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "薄い鉄片が旅人の手に馴染む。"
  },
  {
    "id": "expansion_n_09_03",
    "name": "青鉄の薬包",
    "enName": "Blue Iron Herb Packet",
    "zhName": "青铁药包",
    "desc": "カードで得る盾+1。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "shield",
    "effects": {
      "block": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "薄い鉄片が旅人の手に馴染む。"
  },
  {
    "id": "expansion_n_09_04",
    "name": "青鉄の折り札",
    "enName": "Blue Iron Folded Charm",
    "zhName": "青铁折符",
    "desc": "カードで得る盾+1。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "shield",
    "effects": {
      "block": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "薄い鉄片が旅人の手に馴染む。"
  },
  {
    "id": "expansion_n_09_05",
    "name": "青鉄の旅帳",
    "enName": "Blue Iron Travel Ledger",
    "zhName": "青铁旅簿",
    "desc": "カードで得る盾+1。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "shield",
    "effects": {
      "block": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "薄い鉄片が旅人の手に馴染む。"
  },
  {
    "id": "expansion_n_09_06",
    "name": "青鉄の火口箱",
    "enName": "Blue Iron Tinderbox",
    "zhName": "青铁火种盒",
    "desc": "カードで得る盾+1。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "shield",
    "effects": {
      "block": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "薄い鉄片が旅人の手に馴染む。"
  },
  {
    "id": "expansion_n_09_07",
    "name": "青鉄の結び玉",
    "enName": "Blue Iron Knot Bead",
    "zhName": "青铁结珠",
    "desc": "カードで得る盾+1。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "shield",
    "effects": {
      "block": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "薄い鉄片が旅人の手に馴染む。"
  },
  {
    "id": "expansion_n_09_08",
    "name": "青鉄の星片",
    "enName": "Blue Iron Star Shard",
    "zhName": "青铁星片",
    "desc": "カードで得る盾+1。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "shield",
    "effects": {
      "block": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "薄い鉄片が旅人の手に馴染む。"
  },
  {
    "id": "expansion_n_09_09",
    "name": "青鉄の木杯",
    "enName": "Blue Iron Wooden Cup",
    "zhName": "青铁木杯",
    "desc": "カードで得る盾+1。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "shield",
    "effects": {
      "block": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "薄い鉄片が旅人の手に馴染む。"
  },
  {
    "id": "expansion_n_10_01",
    "name": "潮守の縫い針",
    "enName": "Tideguard Needle",
    "zhName": "潮卫缝针",
    "desc": "毎ターン、生存者全員に盾1。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "shield",
    "effects": {
      "shieldTurn": 1,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "波のように何度も守りが返る。"
  },
  {
    "id": "expansion_n_10_02",
    "name": "潮守の護り帯",
    "enName": "Tideguard Sash",
    "zhName": "潮卫护带",
    "desc": "毎ターン、生存者全員に盾1。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "shield",
    "effects": {
      "shieldTurn": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "波のように何度も守りが返る。"
  },
  {
    "id": "expansion_n_10_03",
    "name": "潮守の薬包",
    "enName": "Tideguard Herb Packet",
    "zhName": "潮卫药包",
    "desc": "毎ターン、生存者全員に盾1。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "shield",
    "effects": {
      "shieldTurn": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "波のように何度も守りが返る。"
  },
  {
    "id": "expansion_n_10_04",
    "name": "潮守の折り札",
    "enName": "Tideguard Folded Charm",
    "zhName": "潮卫折符",
    "desc": "毎ターン、生存者全員に盾1。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "shield",
    "effects": {
      "shieldTurn": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "波のように何度も守りが返る。"
  },
  {
    "id": "expansion_n_10_05",
    "name": "潮守の旅帳",
    "enName": "Tideguard Travel Ledger",
    "zhName": "潮卫旅簿",
    "desc": "毎ターン、生存者全員に盾1。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "shield",
    "effects": {
      "shieldTurn": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "波のように何度も守りが返る。"
  },
  {
    "id": "expansion_n_10_06",
    "name": "潮守の火口箱",
    "enName": "Tideguard Tinderbox",
    "zhName": "潮卫火种盒",
    "desc": "毎ターン、生存者全員に盾1。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "shield",
    "effects": {
      "shieldTurn": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "波のように何度も守りが返る。"
  },
  {
    "id": "expansion_n_10_07",
    "name": "潮守の結び玉",
    "enName": "Tideguard Knot Bead",
    "zhName": "潮卫结珠",
    "desc": "毎ターン、生存者全員に盾1。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "shield",
    "effects": {
      "shieldTurn": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "波のように何度も守りが返る。"
  },
  {
    "id": "expansion_n_10_08",
    "name": "潮守の星片",
    "enName": "Tideguard Star Shard",
    "zhName": "潮卫星片",
    "desc": "毎ターン、生存者全員に盾1。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "shield",
    "effects": {
      "shieldTurn": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "波のように何度も守りが返る。"
  },
  {
    "id": "expansion_n_10_09",
    "name": "潮守の木杯",
    "enName": "Tideguard Wooden Cup",
    "zhName": "潮卫木杯",
    "desc": "毎ターン、生存者全員に盾1。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "shield",
    "effects": {
      "shieldTurn": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "波のように何度も守りが返る。"
  },
  {
    "id": "expansion_n_11_01",
    "name": "門灯の縫い針",
    "enName": "Gate Lantern Needle",
    "zhName": "门灯缝针",
    "desc": "各戦闘の最初のターン、生存者全員に盾4。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "flame",
    "effects": {
      "firstShield": 4,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "最初の一歩だけは震えなくてよい。"
  },
  {
    "id": "expansion_n_11_02",
    "name": "門灯の護り帯",
    "enName": "Gate Lantern Sash",
    "zhName": "门灯护带",
    "desc": "各戦闘の最初のターン、生存者全員に盾7。野営の休息による生存者のHP回復量+2。",
    "icon": "flame",
    "effects": {
      "firstShield": 7,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "最初の一歩だけは震えなくてよい。"
  },
  {
    "id": "expansion_n_11_03",
    "name": "門灯の薬包",
    "enName": "Gate Lantern Herb Packet",
    "zhName": "门灯药包",
    "desc": "各戦闘の最初のターン、生存者全員に盾4。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "flame",
    "effects": {
      "firstShield": 4,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "最初の一歩だけは震えなくてよい。"
  },
  {
    "id": "expansion_n_11_04",
    "name": "門灯の折り札",
    "enName": "Gate Lantern Folded Charm",
    "zhName": "门灯折符",
    "desc": "各戦闘の最初のターン、生存者全員に盾4。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "flame",
    "effects": {
      "firstShield": 4,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "最初の一歩だけは震えなくてよい。"
  },
  {
    "id": "expansion_n_11_05",
    "name": "門灯の旅帳",
    "enName": "Gate Lantern Travel Ledger",
    "zhName": "门灯旅簿",
    "desc": "各戦闘の最初のターン、生存者全員に盾4。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "flame",
    "effects": {
      "firstShield": 4,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "最初の一歩だけは震えなくてよい。"
  },
  {
    "id": "expansion_n_11_06",
    "name": "門灯の火口箱",
    "enName": "Gate Lantern Tinderbox",
    "zhName": "门灯火种盒",
    "desc": "各戦闘の最初のターン、生存者全員に盾4。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "flame",
    "effects": {
      "firstShield": 4,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "最初の一歩だけは震えなくてよい。"
  },
  {
    "id": "expansion_n_11_07",
    "name": "門灯の結び玉",
    "enName": "Gate Lantern Knot Bead",
    "zhName": "门灯结珠",
    "desc": "各戦闘の最初のターン、生存者全員に盾4。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "flame",
    "effects": {
      "firstShield": 4,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "最初の一歩だけは震えなくてよい。"
  },
  {
    "id": "expansion_n_11_08",
    "name": "門灯の星片",
    "enName": "Gate Lantern Star Shard",
    "zhName": "门灯星片",
    "desc": "各戦闘の最初のターン、生存者全員に盾4。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "flame",
    "effects": {
      "firstShield": 4,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "最初の一歩だけは震えなくてよい。"
  },
  {
    "id": "expansion_n_11_09",
    "name": "門灯の木杯",
    "enName": "Gate Lantern Wooden Cup",
    "zhName": "门灯木杯",
    "desc": "各戦闘の最初のターン、生存者全員に盾4。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "flame",
    "effects": {
      "firstShield": 4,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "最初の一歩だけは震えなくてよい。"
  },
  {
    "id": "expansion_n_12_01",
    "name": "冬籠の縫い針",
    "enName": "Winter Nest Needle",
    "zhName": "冬巢缝针",
    "desc": "盾を最大3、次ターンへ持ち越す。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "shield",
    "effects": {
      "carryShield": 3,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "昨日の温もりを明日へ渡す。"
  },
  {
    "id": "expansion_n_12_02",
    "name": "冬籠の護り帯",
    "enName": "Winter Nest Sash",
    "zhName": "冬巢护带",
    "desc": "盾を最大3、次ターンへ持ち越す。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "shield",
    "effects": {
      "carryShield": 3,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "昨日の温もりを明日へ渡す。"
  },
  {
    "id": "expansion_n_12_03",
    "name": "冬籠の薬包",
    "enName": "Winter Nest Herb Packet",
    "zhName": "冬巢药包",
    "desc": "盾を最大3、次ターンへ持ち越す。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "shield",
    "effects": {
      "carryShield": 3,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "昨日の温もりを明日へ渡す。"
  },
  {
    "id": "expansion_n_12_04",
    "name": "冬籠の折り札",
    "enName": "Winter Nest Folded Charm",
    "zhName": "冬巢折符",
    "desc": "盾を最大3、次ターンへ持ち越す。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "shield",
    "effects": {
      "carryShield": 3,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "昨日の温もりを明日へ渡す。"
  },
  {
    "id": "expansion_n_12_05",
    "name": "冬籠の旅帳",
    "enName": "Winter Nest Travel Ledger",
    "zhName": "冬巢旅簿",
    "desc": "盾を最大3、次ターンへ持ち越す。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "shield",
    "effects": {
      "carryShield": 3,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "昨日の温もりを明日へ渡す。"
  },
  {
    "id": "expansion_n_12_06",
    "name": "冬籠の火口箱",
    "enName": "Winter Nest Tinderbox",
    "zhName": "冬巢火种盒",
    "desc": "盾を最大3、次ターンへ持ち越す。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "shield",
    "effects": {
      "carryShield": 3,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "昨日の温もりを明日へ渡す。"
  },
  {
    "id": "expansion_n_12_07",
    "name": "冬籠の結び玉",
    "enName": "Winter Nest Knot Bead",
    "zhName": "冬巢结珠",
    "desc": "盾を最大3、次ターンへ持ち越す。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "shield",
    "effects": {
      "carryShield": 3,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "昨日の温もりを明日へ渡す。"
  },
  {
    "id": "expansion_n_12_08",
    "name": "冬籠の星片",
    "enName": "Winter Nest Star Shard",
    "zhName": "冬巢星片",
    "desc": "盾を最大5、次ターンへ持ち越す。各戦闘の3の倍数ターン、手札+1。",
    "icon": "shield",
    "effects": {
      "carryShield": 5,
      "thirdDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "昨日の温もりを明日へ渡す。"
  },
  {
    "id": "expansion_n_12_09",
    "name": "冬籠の木杯",
    "enName": "Winter Nest Wooden Cup",
    "zhName": "冬巢木杯",
    "desc": "盾を最大3、次ターンへ持ち越す。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "shield",
    "effects": {
      "carryShield": 3,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "昨日の温もりを明日へ渡す。"
  },
  {
    "id": "expansion_n_13_01",
    "name": "若草の縫い針",
    "enName": "Young Grass Needle",
    "zhName": "嫩草缝针",
    "desc": "カードによるHP回復量+1。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "leaf",
    "effects": {
      "heal": 1,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "手当ての指先に春の匂いが残る。"
  },
  {
    "id": "expansion_n_13_02",
    "name": "若草の護り帯",
    "enName": "Young Grass Sash",
    "zhName": "嫩草护带",
    "desc": "カードによるHP回復量+1。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "leaf",
    "effects": {
      "heal": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "手当ての指先に春の匂いが残る。"
  },
  {
    "id": "expansion_n_13_03",
    "name": "若草の薬包",
    "enName": "Young Grass Herb Packet",
    "zhName": "嫩草药包",
    "desc": "カードによるHP回復量+1。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "leaf",
    "effects": {
      "heal": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "手当ての指先に春の匂いが残る。"
  },
  {
    "id": "expansion_n_13_04",
    "name": "若草の折り札",
    "enName": "Young Grass Folded Charm",
    "zhName": "嫩草折符",
    "desc": "カードによるHP回復量+1。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "leaf",
    "effects": {
      "heal": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "手当ての指先に春の匂いが残る。"
  },
  {
    "id": "expansion_n_13_05",
    "name": "若草の旅帳",
    "enName": "Young Grass Travel Ledger",
    "zhName": "嫩草旅簿",
    "desc": "カードによるHP回復量+1。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "leaf",
    "effects": {
      "heal": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "手当ての指先に春の匂いが残る。"
  },
  {
    "id": "expansion_n_13_06",
    "name": "若草の火口箱",
    "enName": "Young Grass Tinderbox",
    "zhName": "嫩草火种盒",
    "desc": "カードによるHP回復量+1。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "leaf",
    "effects": {
      "heal": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "手当ての指先に春の匂いが残る。"
  },
  {
    "id": "expansion_n_13_07",
    "name": "若草の結び玉",
    "enName": "Young Grass Knot Bead",
    "zhName": "嫩草结珠",
    "desc": "カードによるHP回復量+1。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "leaf",
    "effects": {
      "heal": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "手当ての指先に春の匂いが残る。"
  },
  {
    "id": "expansion_n_13_08",
    "name": "若草の星片",
    "enName": "Young Grass Star Shard",
    "zhName": "嫩草星片",
    "desc": "カードによるHP回復量+1。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "leaf",
    "effects": {
      "heal": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "手当ての指先に春の匂いが残る。"
  },
  {
    "id": "expansion_n_13_09",
    "name": "若草の木杯",
    "enName": "Young Grass Wooden Cup",
    "zhName": "嫩草木杯",
    "desc": "カードによるHP回復量+1。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "leaf",
    "effects": {
      "heal": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "手当ての指先に春の匂いが残る。"
  },
  {
    "id": "expansion_n_14_01",
    "name": "慈雨の縫い針",
    "enName": "Gentle Rain Needle",
    "zhName": "慈雨缝针",
    "desc": "カードの全体HP回復量+2。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "leaf",
    "effects": {
      "allHeal": 2,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "誰か一人だけを濡らさぬ雨。"
  },
  {
    "id": "expansion_n_14_02",
    "name": "慈雨の護り帯",
    "enName": "Gentle Rain Sash",
    "zhName": "慈雨护带",
    "desc": "カードの全体HP回復量+2。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "leaf",
    "effects": {
      "allHeal": 2,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "誰か一人だけを濡らさぬ雨。"
  },
  {
    "id": "expansion_n_14_03",
    "name": "慈雨の薬包",
    "enName": "Gentle Rain Herb Packet",
    "zhName": "慈雨药包",
    "desc": "カードの全体HP回復量+2。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "leaf",
    "effects": {
      "allHeal": 2,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "誰か一人だけを濡らさぬ雨。"
  },
  {
    "id": "expansion_n_14_04",
    "name": "慈雨の折り札",
    "enName": "Gentle Rain Folded Charm",
    "zhName": "慈雨折符",
    "desc": "カードの全体HP回復量+2。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "leaf",
    "effects": {
      "allHeal": 2,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "誰か一人だけを濡らさぬ雨。"
  },
  {
    "id": "expansion_n_14_05",
    "name": "慈雨の旅帳",
    "enName": "Gentle Rain Travel Ledger",
    "zhName": "慈雨旅簿",
    "desc": "カードの全体HP回復量+2。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "leaf",
    "effects": {
      "allHeal": 2,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "誰か一人だけを濡らさぬ雨。"
  },
  {
    "id": "expansion_n_14_06",
    "name": "慈雨の火口箱",
    "enName": "Gentle Rain Tinderbox",
    "zhName": "慈雨火种盒",
    "desc": "カードの全体HP回復量+2。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "leaf",
    "effects": {
      "allHeal": 2,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "誰か一人だけを濡らさぬ雨。"
  },
  {
    "id": "expansion_n_14_07",
    "name": "慈雨の結び玉",
    "enName": "Gentle Rain Knot Bead",
    "zhName": "慈雨结珠",
    "desc": "カードの全体HP回復量+2。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "leaf",
    "effects": {
      "allHeal": 2,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "誰か一人だけを濡らさぬ雨。"
  },
  {
    "id": "expansion_n_14_08",
    "name": "慈雨の星片",
    "enName": "Gentle Rain Star Shard",
    "zhName": "慈雨星片",
    "desc": "カードの全体HP回復量+2。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "leaf",
    "effects": {
      "allHeal": 2,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "誰か一人だけを濡らさぬ雨。"
  },
  {
    "id": "expansion_n_14_09",
    "name": "慈雨の木杯",
    "enName": "Gentle Rain Wooden Cup",
    "zhName": "慈雨木杯",
    "desc": "カードの全体HP回復量+3。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "leaf",
    "effects": {
      "allHeal": 3,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "誰か一人だけを濡らさぬ雨。"
  },
  {
    "id": "expansion_n_15_01",
    "name": "結歌の縫い針",
    "enName": "Bond Song Needle",
    "zhName": "结歌缝针",
    "desc": "三人連携時、生存者全員のHPを2回復。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "bell",
    "effects": {
      "linkHeal": 2,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つの声が揃うと傷がほどける。"
  },
  {
    "id": "expansion_n_15_02",
    "name": "結歌の護り帯",
    "enName": "Bond Song Sash",
    "zhName": "结歌护带",
    "desc": "三人連携時、生存者全員のHPを2回復。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "bell",
    "effects": {
      "linkHeal": 2,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つの声が揃うと傷がほどける。"
  },
  {
    "id": "expansion_n_15_03",
    "name": "結歌の薬包",
    "enName": "Bond Song Herb Packet",
    "zhName": "结歌药包",
    "desc": "三人連携時、生存者全員のHPを2回復。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "bell",
    "effects": {
      "linkHeal": 2,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つの声が揃うと傷がほどける。"
  },
  {
    "id": "expansion_n_15_04",
    "name": "結歌の折り札",
    "enName": "Bond Song Folded Charm",
    "zhName": "结歌折符",
    "desc": "三人連携時、生存者全員のHPを2回復。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "bell",
    "effects": {
      "linkHeal": 2,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つの声が揃うと傷がほどける。"
  },
  {
    "id": "expansion_n_15_05",
    "name": "結歌の旅帳",
    "enName": "Bond Song Travel Ledger",
    "zhName": "结歌旅簿",
    "desc": "三人連携時、生存者全員のHPを2回復。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "bell",
    "effects": {
      "linkHeal": 2,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つの声が揃うと傷がほどける。"
  },
  {
    "id": "expansion_n_15_06",
    "name": "結歌の火口箱",
    "enName": "Bond Song Tinderbox",
    "zhName": "结歌火种盒",
    "desc": "三人連携時、生存者全員のHPを2回復。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "bell",
    "effects": {
      "linkHeal": 2,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つの声が揃うと傷がほどける。"
  },
  {
    "id": "expansion_n_15_07",
    "name": "結歌の結び玉",
    "enName": "Bond Song Knot Bead",
    "zhName": "结歌结珠",
    "desc": "三人連携時、生存者全員のHPを3回復。三人連携時に得る盾+2。",
    "icon": "bell",
    "effects": {
      "linkHeal": 3,
      "linkShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つの声が揃うと傷がほどける。"
  },
  {
    "id": "expansion_n_15_08",
    "name": "結歌の星片",
    "enName": "Bond Song Star Shard",
    "zhName": "结歌星片",
    "desc": "三人連携時、生存者全員のHPを2回復。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "bell",
    "effects": {
      "linkHeal": 2,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つの声が揃うと傷がほどける。"
  },
  {
    "id": "expansion_n_15_09",
    "name": "結歌の木杯",
    "enName": "Bond Song Wooden Cup",
    "zhName": "结歌木杯",
    "desc": "三人連携時、生存者全員のHPを2回復。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "bell",
    "effects": {
      "linkHeal": 2,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三つの声が揃うと傷がほどける。"
  },
  {
    "id": "expansion_n_16_01",
    "name": "帰燕の縫い針",
    "enName": "Homecoming Needle",
    "zhName": "归燕缝针",
    "desc": "戦闘勝利時、生存者全員のHPを2回復。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "heart",
    "effects": {
      "winHeal": 2,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "生き延びた者へ帰還の息吹を。"
  },
  {
    "id": "expansion_n_16_02",
    "name": "帰燕の護り帯",
    "enName": "Homecoming Sash",
    "zhName": "归燕护带",
    "desc": "戦闘勝利時、生存者全員のHPを2回復。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "heart",
    "effects": {
      "winHeal": 2,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "生き延びた者へ帰還の息吹を。"
  },
  {
    "id": "expansion_n_16_03",
    "name": "帰燕の薬包",
    "enName": "Homecoming Herb Packet",
    "zhName": "归燕药包",
    "desc": "戦闘勝利時、生存者全員のHPを4回復。生存者への回復薬のHP回復量+3。",
    "icon": "heart",
    "effects": {
      "winHeal": 4,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "生き延びた者へ帰還の息吹を。"
  },
  {
    "id": "expansion_n_16_04",
    "name": "帰燕の折り札",
    "enName": "Homecoming Folded Charm",
    "zhName": "归燕折符",
    "desc": "戦闘勝利時、生存者全員のHPを2回復。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "heart",
    "effects": {
      "winHeal": 2,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "生き延びた者へ帰還の息吹を。"
  },
  {
    "id": "expansion_n_16_05",
    "name": "帰燕の旅帳",
    "enName": "Homecoming Travel Ledger",
    "zhName": "归燕旅簿",
    "desc": "戦闘勝利時、生存者全員のHPを2回復。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "heart",
    "effects": {
      "winHeal": 2,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "生き延びた者へ帰還の息吹を。"
  },
  {
    "id": "expansion_n_16_06",
    "name": "帰燕の火口箱",
    "enName": "Homecoming Tinderbox",
    "zhName": "归燕火种盒",
    "desc": "戦闘勝利時、生存者全員のHPを2回復。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "heart",
    "effects": {
      "winHeal": 2,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "生き延びた者へ帰還の息吹を。"
  },
  {
    "id": "expansion_n_16_07",
    "name": "帰燕の結び玉",
    "enName": "Homecoming Knot Bead",
    "zhName": "归燕结珠",
    "desc": "戦闘勝利時、生存者全員のHPを2回復。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "heart",
    "effects": {
      "winHeal": 2,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "生き延びた者へ帰還の息吹を。"
  },
  {
    "id": "expansion_n_16_08",
    "name": "帰燕の星片",
    "enName": "Homecoming Star Shard",
    "zhName": "归燕星片",
    "desc": "戦闘勝利時、生存者全員のHPを2回復。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "heart",
    "effects": {
      "winHeal": 2,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "生き延びた者へ帰還の息吹を。"
  },
  {
    "id": "expansion_n_16_09",
    "name": "帰燕の木杯",
    "enName": "Homecoming Wooden Cup",
    "zhName": "归燕木杯",
    "desc": "戦闘勝利時、生存者全員のHPを2回復。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "heart",
    "effects": {
      "winHeal": 2,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "生き延びた者へ帰還の息吹を。"
  },
  {
    "id": "expansion_n_17_01",
    "name": "焚火坂の縫い針",
    "enName": "Hearth Hill Needle",
    "zhName": "篝火坡缝针",
    "desc": "野営の休息による生存者のHP回復量+4。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "heart",
    "effects": {
      "campHeal": 4,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "休める坂道の名を刻んだ道具。"
  },
  {
    "id": "expansion_n_17_02",
    "name": "焚火坂の護り帯",
    "enName": "Hearth Hill Sash",
    "zhName": "篝火坡护带",
    "desc": "野営の休息による生存者のHP回復量+6。各戦闘の最初のターン、生存者全員に盾3。",
    "icon": "heart",
    "effects": {
      "campHeal": 6,
      "firstShield": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "休める坂道の名を刻んだ道具。"
  },
  {
    "id": "expansion_n_17_03",
    "name": "焚火坂の薬包",
    "enName": "Hearth Hill Herb Packet",
    "zhName": "篝火坡药包",
    "desc": "野営の休息による生存者のHP回復量+4。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "heart",
    "effects": {
      "campHeal": 4,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "休める坂道の名を刻んだ道具。"
  },
  {
    "id": "expansion_n_17_04",
    "name": "焚火坂の折り札",
    "enName": "Hearth Hill Folded Charm",
    "zhName": "篝火坡折符",
    "desc": "野営の休息による生存者のHP回復量+4。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "heart",
    "effects": {
      "campHeal": 4,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "休める坂道の名を刻んだ道具。"
  },
  {
    "id": "expansion_n_17_05",
    "name": "焚火坂の旅帳",
    "enName": "Hearth Hill Travel Ledger",
    "zhName": "篝火坡旅簿",
    "desc": "野営の休息による生存者のHP回復量+4。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "heart",
    "effects": {
      "campHeal": 4,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "休める坂道の名を刻んだ道具。"
  },
  {
    "id": "expansion_n_17_06",
    "name": "焚火坂の火口箱",
    "enName": "Hearth Hill Tinderbox",
    "zhName": "篝火坡火种盒",
    "desc": "野営の休息による生存者のHP回復量+4。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "heart",
    "effects": {
      "campHeal": 4,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "休める坂道の名を刻んだ道具。"
  },
  {
    "id": "expansion_n_17_07",
    "name": "焚火坂の結び玉",
    "enName": "Hearth Hill Knot Bead",
    "zhName": "篝火坡结珠",
    "desc": "野営の休息による生存者のHP回復量+4。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "heart",
    "effects": {
      "campHeal": 4,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "休める坂道の名を刻んだ道具。"
  },
  {
    "id": "expansion_n_17_08",
    "name": "焚火坂の星片",
    "enName": "Hearth Hill Star Shard",
    "zhName": "篝火坡星片",
    "desc": "野営の休息による生存者のHP回復量+4。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "heart",
    "effects": {
      "campHeal": 4,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "休める坂道の名を刻んだ道具。"
  },
  {
    "id": "expansion_n_17_09",
    "name": "焚火坂の木杯",
    "enName": "Hearth Hill Wooden Cup",
    "zhName": "篝火坡木杯",
    "desc": "野営の休息による生存者のHP回復量+4。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "heart",
    "effects": {
      "campHeal": 4,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "休める坂道の名を刻んだ道具。"
  },
  {
    "id": "expansion_n_18_01",
    "name": "薬師谷の縫い針",
    "enName": "Herbalist Vale Needle",
    "zhName": "药师谷缝针",
    "desc": "生存者への回復薬のHP回復量+4。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "flask",
    "effects": {
      "potionHeal": 4,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "谷の薬師が最後に残した調合。"
  },
  {
    "id": "expansion_n_18_02",
    "name": "薬師谷の護り帯",
    "enName": "Herbalist Vale Sash",
    "zhName": "药师谷护带",
    "desc": "生存者への回復薬のHP回復量+4。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "flask",
    "effects": {
      "potionHeal": 4,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "谷の薬師が最後に残した調合。"
  },
  {
    "id": "expansion_n_18_03",
    "name": "薬師谷の薬包",
    "enName": "Herbalist Vale Herb Packet",
    "zhName": "药师谷药包",
    "desc": "生存者への回復薬のHP回復量+7。戦闘勝利時、生存者全員のHPを2回復。",
    "icon": "flask",
    "effects": {
      "potionHeal": 7,
      "winHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "谷の薬師が最後に残した調合。"
  },
  {
    "id": "expansion_n_18_04",
    "name": "薬師谷の折り札",
    "enName": "Herbalist Vale Folded Charm",
    "zhName": "药师谷折符",
    "desc": "生存者への回復薬のHP回復量+4。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "flask",
    "effects": {
      "potionHeal": 4,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "谷の薬師が最後に残した調合。"
  },
  {
    "id": "expansion_n_18_05",
    "name": "薬師谷の旅帳",
    "enName": "Herbalist Vale Travel Ledger",
    "zhName": "药师谷旅簿",
    "desc": "生存者への回復薬のHP回復量+4。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "flask",
    "effects": {
      "potionHeal": 4,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "谷の薬師が最後に残した調合。"
  },
  {
    "id": "expansion_n_18_06",
    "name": "薬師谷の火口箱",
    "enName": "Herbalist Vale Tinderbox",
    "zhName": "药师谷火种盒",
    "desc": "生存者への回復薬のHP回復量+4。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "flask",
    "effects": {
      "potionHeal": 4,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "谷の薬師が最後に残した調合。"
  },
  {
    "id": "expansion_n_18_07",
    "name": "薬師谷の結び玉",
    "enName": "Herbalist Vale Knot Bead",
    "zhName": "药师谷结珠",
    "desc": "生存者への回復薬のHP回復量+4。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "flask",
    "effects": {
      "potionHeal": 4,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "谷の薬師が最後に残した調合。"
  },
  {
    "id": "expansion_n_18_08",
    "name": "薬師谷の星片",
    "enName": "Herbalist Vale Star Shard",
    "zhName": "药师谷星片",
    "desc": "生存者への回復薬のHP回復量+4。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "flask",
    "effects": {
      "potionHeal": 4,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "谷の薬師が最後に残した調合。"
  },
  {
    "id": "expansion_n_18_09",
    "name": "薬師谷の木杯",
    "enName": "Herbalist Vale Wooden Cup",
    "zhName": "药师谷木杯",
    "desc": "生存者への回復薬のHP回復量+4。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "flask",
    "effects": {
      "potionHeal": 4,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "谷の薬師が最後に残した調合。"
  },
  {
    "id": "expansion_n_19_01",
    "name": "芽吹きの縫い針",
    "enName": "New Sprout Needle",
    "zhName": "萌芽缝针",
    "desc": "毎ターン、生存者全員のHPを1回復。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "leaf",
    "effects": {
      "turnRegen": 1,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "争いのただ中でも芽は伸びる。"
  },
  {
    "id": "expansion_n_19_02",
    "name": "芽吹きの護り帯",
    "enName": "New Sprout Sash",
    "zhName": "萌芽护带",
    "desc": "毎ターン、生存者全員のHPを1回復。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "leaf",
    "effects": {
      "turnRegen": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "争いのただ中でも芽は伸びる。"
  },
  {
    "id": "expansion_n_19_03",
    "name": "芽吹きの薬包",
    "enName": "New Sprout Herb Packet",
    "zhName": "萌芽药包",
    "desc": "毎ターン、生存者全員のHPを1回復。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "leaf",
    "effects": {
      "turnRegen": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "争いのただ中でも芽は伸びる。"
  },
  {
    "id": "expansion_n_19_04",
    "name": "芽吹きの折り札",
    "enName": "New Sprout Folded Charm",
    "zhName": "萌芽折符",
    "desc": "毎ターン、生存者全員のHPを1回復。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "leaf",
    "effects": {
      "turnRegen": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "争いのただ中でも芽は伸びる。"
  },
  {
    "id": "expansion_n_19_05",
    "name": "芽吹きの旅帳",
    "enName": "New Sprout Travel Ledger",
    "zhName": "萌芽旅簿",
    "desc": "毎ターン、生存者全員のHPを1回復。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "leaf",
    "effects": {
      "turnRegen": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "争いのただ中でも芽は伸びる。"
  },
  {
    "id": "expansion_n_19_06",
    "name": "芽吹きの火口箱",
    "enName": "New Sprout Tinderbox",
    "zhName": "萌芽火种盒",
    "desc": "毎ターン、生存者全員のHPを1回復。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "leaf",
    "effects": {
      "turnRegen": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "争いのただ中でも芽は伸びる。"
  },
  {
    "id": "expansion_n_19_07",
    "name": "芽吹きの結び玉",
    "enName": "New Sprout Knot Bead",
    "zhName": "萌芽结珠",
    "desc": "毎ターン、生存者全員のHPを1回復。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "leaf",
    "effects": {
      "turnRegen": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "争いのただ中でも芽は伸びる。"
  },
  {
    "id": "expansion_n_19_08",
    "name": "芽吹きの星片",
    "enName": "New Sprout Star Shard",
    "zhName": "萌芽星片",
    "desc": "毎ターン、生存者全員のHPを1回復。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "leaf",
    "effects": {
      "turnRegen": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "争いのただ中でも芽は伸びる。"
  },
  {
    "id": "expansion_n_19_09",
    "name": "芽吹きの木杯",
    "enName": "New Sprout Wooden Cup",
    "zhName": "萌芽木杯",
    "desc": "毎ターン、生存者全員のHPを1回復。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "leaf",
    "effects": {
      "turnRegen": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "争いのただ中でも芽は伸びる。"
  },
  {
    "id": "expansion_n_20_01",
    "name": "三枝の縫い針",
    "enName": "Three Branches Needle",
    "zhName": "三枝缝针",
    "desc": "三人連携時に得る盾+2。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "shield",
    "effects": {
      "linkShield": 2,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "枝は三本束ねれば折れにくい。"
  },
  {
    "id": "expansion_n_20_02",
    "name": "三枝の護り帯",
    "enName": "Three Branches Sash",
    "zhName": "三枝护带",
    "desc": "三人連携時に得る盾+2。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "shield",
    "effects": {
      "linkShield": 2,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "枝は三本束ねれば折れにくい。"
  },
  {
    "id": "expansion_n_20_03",
    "name": "三枝の薬包",
    "enName": "Three Branches Herb Packet",
    "zhName": "三枝药包",
    "desc": "三人連携時に得る盾+2。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "shield",
    "effects": {
      "linkShield": 2,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "枝は三本束ねれば折れにくい。"
  },
  {
    "id": "expansion_n_20_04",
    "name": "三枝の折り札",
    "enName": "Three Branches Folded Charm",
    "zhName": "三枝折符",
    "desc": "三人連携時に得る盾+2。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "shield",
    "effects": {
      "linkShield": 2,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "枝は三本束ねれば折れにくい。"
  },
  {
    "id": "expansion_n_20_05",
    "name": "三枝の旅帳",
    "enName": "Three Branches Travel Ledger",
    "zhName": "三枝旅簿",
    "desc": "三人連携時に得る盾+2。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "shield",
    "effects": {
      "linkShield": 2,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "枝は三本束ねれば折れにくい。"
  },
  {
    "id": "expansion_n_20_06",
    "name": "三枝の火口箱",
    "enName": "Three Branches Tinderbox",
    "zhName": "三枝火种盒",
    "desc": "三人連携時に得る盾+2。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "shield",
    "effects": {
      "linkShield": 2,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "枝は三本束ねれば折れにくい。"
  },
  {
    "id": "expansion_n_20_07",
    "name": "三枝の結び玉",
    "enName": "Three Branches Knot Bead",
    "zhName": "三枝结珠",
    "desc": "三人連携時に得る盾+4。三人連携時、生存者全員のHPを1回復。",
    "icon": "shield",
    "effects": {
      "linkShield": 4,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "枝は三本束ねれば折れにくい。"
  },
  {
    "id": "expansion_n_20_08",
    "name": "三枝の星片",
    "enName": "Three Branches Star Shard",
    "zhName": "三枝星片",
    "desc": "三人連携時に得る盾+2。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "shield",
    "effects": {
      "linkShield": 2,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "枝は三本束ねれば折れにくい。"
  },
  {
    "id": "expansion_n_20_09",
    "name": "三枝の木杯",
    "enName": "Three Branches Wooden Cup",
    "zhName": "三枝木杯",
    "desc": "三人連携時に得る盾+2。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "shield",
    "effects": {
      "linkShield": 2,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "枝は三本束ねれば折れにくい。"
  },
  {
    "id": "expansion_n_21_01",
    "name": "朝駆けの縫い針",
    "enName": "Dawn Runner Needle",
    "zhName": "晨行缝针",
    "desc": "各戦闘の最初のターン、気力+1。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "sun",
    "effects": {
      "firstEnergy": 1,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "夜明けの一歩に力を残しておく。"
  },
  {
    "id": "expansion_n_21_02",
    "name": "朝駆けの護り帯",
    "enName": "Dawn Runner Sash",
    "zhName": "晨行护带",
    "desc": "各戦闘の最初のターン、気力+1。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "sun",
    "effects": {
      "firstEnergy": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "夜明けの一歩に力を残しておく。"
  },
  {
    "id": "expansion_n_21_03",
    "name": "朝駆けの薬包",
    "enName": "Dawn Runner Herb Packet",
    "zhName": "晨行药包",
    "desc": "各戦闘の最初のターン、気力+1。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "sun",
    "effects": {
      "firstEnergy": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "夜明けの一歩に力を残しておく。"
  },
  {
    "id": "expansion_n_21_04",
    "name": "朝駆けの折り札",
    "enName": "Dawn Runner Folded Charm",
    "zhName": "晨行折符",
    "desc": "各戦闘の最初のターン、気力+1。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "sun",
    "effects": {
      "firstEnergy": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "夜明けの一歩に力を残しておく。"
  },
  {
    "id": "expansion_n_21_05",
    "name": "朝駆けの旅帳",
    "enName": "Dawn Runner Travel Ledger",
    "zhName": "晨行旅簿",
    "desc": "各戦闘の最初のターン、気力+1。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "sun",
    "effects": {
      "firstEnergy": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "夜明けの一歩に力を残しておく。"
  },
  {
    "id": "expansion_n_21_06",
    "name": "朝駆けの火口箱",
    "enName": "Dawn Runner Tinderbox",
    "zhName": "晨行火种盒",
    "desc": "各戦闘の最初のターン、気力+1。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "sun",
    "effects": {
      "firstEnergy": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "夜明けの一歩に力を残しておく。"
  },
  {
    "id": "expansion_n_21_07",
    "name": "朝駆けの結び玉",
    "enName": "Dawn Runner Knot Bead",
    "zhName": "晨行结珠",
    "desc": "各戦闘の最初のターン、気力+1。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "sun",
    "effects": {
      "firstEnergy": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "夜明けの一歩に力を残しておく。"
  },
  {
    "id": "expansion_n_21_08",
    "name": "朝駆けの星片",
    "enName": "Dawn Runner Star Shard",
    "zhName": "晨行星片",
    "desc": "各戦闘の最初のターン、気力+1。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "sun",
    "effects": {
      "firstEnergy": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "夜明けの一歩に力を残しておく。"
  },
  {
    "id": "expansion_n_21_09",
    "name": "朝駆けの木杯",
    "enName": "Dawn Runner Wooden Cup",
    "zhName": "晨行木杯",
    "desc": "各戦闘の最初のターン、気力+1。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "sun",
    "effects": {
      "firstEnergy": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "夜明けの一歩に力を残しておく。"
  },
  {
    "id": "expansion_n_22_01",
    "name": "旅書庫の縫い針",
    "enName": "Road Library Needle",
    "zhName": "旅途书库缝针",
    "desc": "各戦闘の最初のターン、手札+2。カードで得る盾+1。",
    "icon": "book",
    "effects": {
      "firstDraw": 2,
      "block": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の始まりに読むべき一頁。"
  },
  {
    "id": "expansion_n_22_02",
    "name": "旅書庫の護り帯",
    "enName": "Road Library Sash",
    "zhName": "旅途书库护带",
    "desc": "各戦闘の最初のターン、手札+1。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "book",
    "effects": {
      "firstDraw": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の始まりに読むべき一頁。"
  },
  {
    "id": "expansion_n_22_03",
    "name": "旅書庫の薬包",
    "enName": "Road Library Herb Packet",
    "zhName": "旅途书库药包",
    "desc": "各戦闘の最初のターン、手札+1。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "book",
    "effects": {
      "firstDraw": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の始まりに読むべき一頁。"
  },
  {
    "id": "expansion_n_22_04",
    "name": "旅書庫の折り札",
    "enName": "Road Library Folded Charm",
    "zhName": "旅途书库折符",
    "desc": "各戦闘の最初のターン、手札+1。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "book",
    "effects": {
      "firstDraw": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の始まりに読むべき一頁。"
  },
  {
    "id": "expansion_n_22_05",
    "name": "旅書庫の旅帳",
    "enName": "Road Library Travel Ledger",
    "zhName": "旅途书库旅簿",
    "desc": "各戦闘の最初のターン、手札+1。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "book",
    "effects": {
      "firstDraw": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の始まりに読むべき一頁。"
  },
  {
    "id": "expansion_n_22_06",
    "name": "旅書庫の火口箱",
    "enName": "Road Library Tinderbox",
    "zhName": "旅途书库火种盒",
    "desc": "各戦闘の最初のターン、手札+1。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "book",
    "effects": {
      "firstDraw": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の始まりに読むべき一頁。"
  },
  {
    "id": "expansion_n_22_07",
    "name": "旅書庫の結び玉",
    "enName": "Road Library Knot Bead",
    "zhName": "旅途书库结珠",
    "desc": "各戦闘の最初のターン、手札+1。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "book",
    "effects": {
      "firstDraw": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の始まりに読むべき一頁。"
  },
  {
    "id": "expansion_n_22_08",
    "name": "旅書庫の星片",
    "enName": "Road Library Star Shard",
    "zhName": "旅途书库星片",
    "desc": "各戦闘の最初のターン、手札+1。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "book",
    "effects": {
      "firstDraw": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の始まりに読むべき一頁。"
  },
  {
    "id": "expansion_n_22_09",
    "name": "旅書庫の木杯",
    "enName": "Road Library Wooden Cup",
    "zhName": "旅途书库木杯",
    "desc": "各戦闘の最初のターン、手札+1。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "book",
    "effects": {
      "firstDraw": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の始まりに読むべき一頁。"
  },
  {
    "id": "expansion_n_23_01",
    "name": "三日月の縫い針",
    "enName": "Crescent Needle",
    "zhName": "新月缝针",
    "desc": "各戦闘の3の倍数ターン、手札+1。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "star",
    "effects": {
      "thirdDraw": 1,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三度目の巡りに道を示す。"
  },
  {
    "id": "expansion_n_23_02",
    "name": "三日月の護り帯",
    "enName": "Crescent Sash",
    "zhName": "新月护带",
    "desc": "各戦闘の3の倍数ターン、手札+1。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "star",
    "effects": {
      "thirdDraw": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三度目の巡りに道を示す。"
  },
  {
    "id": "expansion_n_23_03",
    "name": "三日月の薬包",
    "enName": "Crescent Herb Packet",
    "zhName": "新月药包",
    "desc": "各戦闘の3の倍数ターン、手札+1。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "star",
    "effects": {
      "thirdDraw": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三度目の巡りに道を示す。"
  },
  {
    "id": "expansion_n_23_04",
    "name": "三日月の折り札",
    "enName": "Crescent Folded Charm",
    "zhName": "新月折符",
    "desc": "各戦闘の3の倍数ターン、手札+1。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "star",
    "effects": {
      "thirdDraw": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三度目の巡りに道を示す。"
  },
  {
    "id": "expansion_n_23_05",
    "name": "三日月の旅帳",
    "enName": "Crescent Travel Ledger",
    "zhName": "新月旅簿",
    "desc": "各戦闘の3の倍数ターン、手札+1。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "star",
    "effects": {
      "thirdDraw": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三度目の巡りに道を示す。"
  },
  {
    "id": "expansion_n_23_06",
    "name": "三日月の火口箱",
    "enName": "Crescent Tinderbox",
    "zhName": "新月火种盒",
    "desc": "各戦闘の3の倍数ターン、手札+1。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "star",
    "effects": {
      "thirdDraw": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三度目の巡りに道を示す。"
  },
  {
    "id": "expansion_n_23_07",
    "name": "三日月の結び玉",
    "enName": "Crescent Knot Bead",
    "zhName": "新月结珠",
    "desc": "各戦闘の3の倍数ターン、手札+1。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "star",
    "effects": {
      "thirdDraw": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三度目の巡りに道を示す。"
  },
  {
    "id": "expansion_n_23_08",
    "name": "三日月の星片",
    "enName": "Crescent Star Shard",
    "zhName": "新月星片",
    "desc": "各戦闘の3の倍数ターン、手札+2。盾を最大2、次ターンへ持ち越す。",
    "icon": "star",
    "effects": {
      "thirdDraw": 2,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三度目の巡りに道を示す。"
  },
  {
    "id": "expansion_n_23_09",
    "name": "三日月の木杯",
    "enName": "Crescent Wooden Cup",
    "zhName": "新月木杯",
    "desc": "各戦闘の3の倍数ターン、手札+1。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "star",
    "effects": {
      "thirdDraw": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "三度目の巡りに道を示す。"
  },
  {
    "id": "expansion_n_24_01",
    "name": "策士町の縫い針",
    "enName": "Tactician Town Needle",
    "zhName": "谋士镇缝针",
    "desc": "毎ターン最初の策略カード使用時、1枚引く。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "eye",
    "effects": {
      "firstSkillDraw": 1,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ひとつの工夫が次の工夫を呼ぶ。"
  },
  {
    "id": "expansion_n_24_02",
    "name": "策士町の護り帯",
    "enName": "Tactician Town Sash",
    "zhName": "谋士镇护带",
    "desc": "毎ターン最初の策略カード使用時、1枚引く。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "eye",
    "effects": {
      "firstSkillDraw": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ひとつの工夫が次の工夫を呼ぶ。"
  },
  {
    "id": "expansion_n_24_03",
    "name": "策士町の薬包",
    "enName": "Tactician Town Herb Packet",
    "zhName": "谋士镇药包",
    "desc": "毎ターン最初の策略カード使用時、1枚引く。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "eye",
    "effects": {
      "firstSkillDraw": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ひとつの工夫が次の工夫を呼ぶ。"
  },
  {
    "id": "expansion_n_24_04",
    "name": "策士町の折り札",
    "enName": "Tactician Town Folded Charm",
    "zhName": "谋士镇折符",
    "desc": "毎ターン最初の策略カード使用時、1枚引く。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "eye",
    "effects": {
      "firstSkillDraw": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ひとつの工夫が次の工夫を呼ぶ。"
  },
  {
    "id": "expansion_n_24_05",
    "name": "策士町の旅帳",
    "enName": "Tactician Town Travel Ledger",
    "zhName": "谋士镇旅簿",
    "desc": "毎ターン最初の策略カード使用時、1枚引く。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "eye",
    "effects": {
      "firstSkillDraw": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ひとつの工夫が次の工夫を呼ぶ。"
  },
  {
    "id": "expansion_n_24_06",
    "name": "策士町の火口箱",
    "enName": "Tactician Town Tinderbox",
    "zhName": "谋士镇火种盒",
    "desc": "毎ターン最初の策略カード使用時、1枚引く。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "eye",
    "effects": {
      "firstSkillDraw": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ひとつの工夫が次の工夫を呼ぶ。"
  },
  {
    "id": "expansion_n_24_07",
    "name": "策士町の結び玉",
    "enName": "Tactician Town Knot Bead",
    "zhName": "谋士镇结珠",
    "desc": "毎ターン最初の策略カード使用時、1枚引く。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "eye",
    "effects": {
      "firstSkillDraw": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ひとつの工夫が次の工夫を呼ぶ。"
  },
  {
    "id": "expansion_n_24_08",
    "name": "策士町の星片",
    "enName": "Tactician Town Star Shard",
    "zhName": "谋士镇星片",
    "desc": "毎ターン最初の策略カード使用時、1枚引く。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "eye",
    "effects": {
      "firstSkillDraw": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ひとつの工夫が次の工夫を呼ぶ。"
  },
  {
    "id": "expansion_n_24_09",
    "name": "策士町の木杯",
    "enName": "Tactician Town Wooden Cup",
    "zhName": "谋士镇木杯",
    "desc": "毎ターン最初の策略カード使用時、1枚引く。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "eye",
    "effects": {
      "firstSkillDraw": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "ひとつの工夫が次の工夫を呼ぶ。"
  },
  {
    "id": "expansion_n_25_01",
    "name": "毒文の縫い針",
    "enName": "Venom Script Needle",
    "zhName": "毒文缝针",
    "desc": "毎ターン最初の毒付与・毒増幅カード使用時、1枚引く。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "flask",
    "effects": {
      "poisonDraw": 1,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "危険な文字ほどよく読んでおけ。"
  },
  {
    "id": "expansion_n_25_02",
    "name": "毒文の護り帯",
    "enName": "Venom Script Sash",
    "zhName": "毒文护带",
    "desc": "毎ターン最初の毒付与・毒増幅カード使用時、1枚引く。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "flask",
    "effects": {
      "poisonDraw": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "危険な文字ほどよく読んでおけ。"
  },
  {
    "id": "expansion_n_25_03",
    "name": "毒文の薬包",
    "enName": "Venom Script Herb Packet",
    "zhName": "毒文药包",
    "desc": "毎ターン最初の毒付与・毒増幅カード使用時、1枚引く。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "flask",
    "effects": {
      "poisonDraw": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "危険な文字ほどよく読んでおけ。"
  },
  {
    "id": "expansion_n_25_04",
    "name": "毒文の折り札",
    "enName": "Venom Script Folded Charm",
    "zhName": "毒文折符",
    "desc": "毎ターン最初の毒付与・毒増幅カード使用時、1枚引く。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "flask",
    "effects": {
      "poisonDraw": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "危険な文字ほどよく読んでおけ。"
  },
  {
    "id": "expansion_n_25_05",
    "name": "毒文の旅帳",
    "enName": "Venom Script Travel Ledger",
    "zhName": "毒文旅簿",
    "desc": "毎ターン最初の毒付与・毒増幅カード使用時、1枚引く。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "flask",
    "effects": {
      "poisonDraw": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "危険な文字ほどよく読んでおけ。"
  },
  {
    "id": "expansion_n_25_06",
    "name": "毒文の火口箱",
    "enName": "Venom Script Tinderbox",
    "zhName": "毒文火种盒",
    "desc": "毎ターン最初の毒付与・毒増幅カード使用時、1枚引く。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "flask",
    "effects": {
      "poisonDraw": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "危険な文字ほどよく読んでおけ。"
  },
  {
    "id": "expansion_n_25_07",
    "name": "毒文の結び玉",
    "enName": "Venom Script Knot Bead",
    "zhName": "毒文结珠",
    "desc": "毎ターン最初の毒付与・毒増幅カード使用時、1枚引く。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "flask",
    "effects": {
      "poisonDraw": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "危険な文字ほどよく読んでおけ。"
  },
  {
    "id": "expansion_n_25_08",
    "name": "毒文の星片",
    "enName": "Venom Script Star Shard",
    "zhName": "毒文星片",
    "desc": "毎ターン最初の毒付与・毒増幅カード使用時、1枚引く。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "flask",
    "effects": {
      "poisonDraw": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "危険な文字ほどよく読んでおけ。"
  },
  {
    "id": "expansion_n_25_09",
    "name": "毒文の木杯",
    "enName": "Venom Script Wooden Cup",
    "zhName": "毒文木杯",
    "desc": "毎ターン最初の毒付与・毒増幅カード使用時、1枚引く。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "flask",
    "effects": {
      "poisonDraw": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "危険な文字ほどよく読んでおけ。"
  },
  {
    "id": "expansion_n_26_01",
    "name": "灰送りの縫い針",
    "enName": "Ash Farewell Needle",
    "zhName": "送灰缝针",
    "desc": "毎ターン最初の消滅カード使用時、気力+1。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "flame",
    "effects": {
      "exhaustEnergy": 1,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "失った一枚を次の力に変える。"
  },
  {
    "id": "expansion_n_26_02",
    "name": "灰送りの護り帯",
    "enName": "Ash Farewell Sash",
    "zhName": "送灰护带",
    "desc": "毎ターン最初の消滅カード使用時、気力+1。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "flame",
    "effects": {
      "exhaustEnergy": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "失った一枚を次の力に変える。"
  },
  {
    "id": "expansion_n_26_03",
    "name": "灰送りの薬包",
    "enName": "Ash Farewell Herb Packet",
    "zhName": "送灰药包",
    "desc": "毎ターン最初の消滅カード使用時、気力+1。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "flame",
    "effects": {
      "exhaustEnergy": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "失った一枚を次の力に変える。"
  },
  {
    "id": "expansion_n_26_04",
    "name": "灰送りの折り札",
    "enName": "Ash Farewell Folded Charm",
    "zhName": "送灰折符",
    "desc": "毎ターン最初の消滅カード使用時、気力+1。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "flame",
    "effects": {
      "exhaustEnergy": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "失った一枚を次の力に変える。"
  },
  {
    "id": "expansion_n_26_05",
    "name": "灰送りの旅帳",
    "enName": "Ash Farewell Travel Ledger",
    "zhName": "送灰旅簿",
    "desc": "毎ターン最初の消滅カード使用時、気力+1。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "flame",
    "effects": {
      "exhaustEnergy": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "失った一枚を次の力に変える。"
  },
  {
    "id": "expansion_n_26_06",
    "name": "灰送りの火口箱",
    "enName": "Ash Farewell Tinderbox",
    "zhName": "送灰火种盒",
    "desc": "毎ターン最初の消滅カード使用時、気力+1。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "flame",
    "effects": {
      "exhaustEnergy": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "失った一枚を次の力に変える。"
  },
  {
    "id": "expansion_n_26_07",
    "name": "灰送りの結び玉",
    "enName": "Ash Farewell Knot Bead",
    "zhName": "送灰结珠",
    "desc": "毎ターン最初の消滅カード使用時、気力+1。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "flame",
    "effects": {
      "exhaustEnergy": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "失った一枚を次の力に変える。"
  },
  {
    "id": "expansion_n_26_08",
    "name": "灰送りの星片",
    "enName": "Ash Farewell Star Shard",
    "zhName": "送灰星片",
    "desc": "毎ターン最初の消滅カード使用時、気力+1。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "flame",
    "effects": {
      "exhaustEnergy": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "失った一枚を次の力に変える。"
  },
  {
    "id": "expansion_n_26_09",
    "name": "灰送りの木杯",
    "enName": "Ash Farewell Wooden Cup",
    "zhName": "送灰木杯",
    "desc": "毎ターン最初の消滅カード使用時、気力+1。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "flame",
    "effects": {
      "exhaustEnergy": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "失った一枚を次の力に変える。"
  },
  {
    "id": "expansion_n_27_01",
    "name": "余燈の縫い針",
    "enName": "Saved Light Needle",
    "zhName": "余灯缝针",
    "desc": "未使用の気力を最大1、次ターンへ持ち越す。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "flame",
    "effects": {
      "carryEnergy": 1,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "使わなかった灯は明日も燃える。"
  },
  {
    "id": "expansion_n_27_02",
    "name": "余燈の護り帯",
    "enName": "Saved Light Sash",
    "zhName": "余灯护带",
    "desc": "未使用の気力を最大1、次ターンへ持ち越す。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "flame",
    "effects": {
      "carryEnergy": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "使わなかった灯は明日も燃える。"
  },
  {
    "id": "expansion_n_27_03",
    "name": "余燈の薬包",
    "enName": "Saved Light Herb Packet",
    "zhName": "余灯药包",
    "desc": "未使用の気力を最大1、次ターンへ持ち越す。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "flame",
    "effects": {
      "carryEnergy": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "使わなかった灯は明日も燃える。"
  },
  {
    "id": "expansion_n_27_04",
    "name": "余燈の折り札",
    "enName": "Saved Light Folded Charm",
    "zhName": "余灯折符",
    "desc": "未使用の気力を最大1、次ターンへ持ち越す。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "flame",
    "effects": {
      "carryEnergy": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "使わなかった灯は明日も燃える。"
  },
  {
    "id": "expansion_n_27_05",
    "name": "余燈の旅帳",
    "enName": "Saved Light Travel Ledger",
    "zhName": "余灯旅簿",
    "desc": "未使用の気力を最大1、次ターンへ持ち越す。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "flame",
    "effects": {
      "carryEnergy": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "使わなかった灯は明日も燃える。"
  },
  {
    "id": "expansion_n_27_06",
    "name": "余燈の火口箱",
    "enName": "Saved Light Tinderbox",
    "zhName": "余灯火种盒",
    "desc": "未使用の気力を最大1、次ターンへ持ち越す。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "flame",
    "effects": {
      "carryEnergy": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "使わなかった灯は明日も燃える。"
  },
  {
    "id": "expansion_n_27_07",
    "name": "余燈の結び玉",
    "enName": "Saved Light Knot Bead",
    "zhName": "余灯结珠",
    "desc": "未使用の気力を最大1、次ターンへ持ち越す。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "flame",
    "effects": {
      "carryEnergy": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "使わなかった灯は明日も燃える。"
  },
  {
    "id": "expansion_n_27_08",
    "name": "余燈の星片",
    "enName": "Saved Light Star Shard",
    "zhName": "余灯星片",
    "desc": "未使用の気力を最大1、次ターンへ持ち越す。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "flame",
    "effects": {
      "carryEnergy": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "使わなかった灯は明日も燃える。"
  },
  {
    "id": "expansion_n_27_09",
    "name": "余燈の木杯",
    "enName": "Saved Light Wooden Cup",
    "zhName": "余灯木杯",
    "desc": "未使用の気力を最大1、次ターンへ持ち越す。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "flame",
    "effects": {
      "carryEnergy": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "使わなかった灯は明日も燃える。"
  },
  {
    "id": "expansion_n_28_01",
    "name": "空椀の縫い針",
    "enName": "Empty Bowl Needle",
    "zhName": "空碗缝针",
    "desc": "気力0でターンを終えると、次ターンの気力+1。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "star",
    "effects": {
      "emptyEnergy": 1,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "空になった器に新たな力が満ちる。"
  },
  {
    "id": "expansion_n_28_02",
    "name": "空椀の護り帯",
    "enName": "Empty Bowl Sash",
    "zhName": "空碗护带",
    "desc": "気力0でターンを終えると、次ターンの気力+1。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "star",
    "effects": {
      "emptyEnergy": 1,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "空になった器に新たな力が満ちる。"
  },
  {
    "id": "expansion_n_28_03",
    "name": "空椀の薬包",
    "enName": "Empty Bowl Herb Packet",
    "zhName": "空碗药包",
    "desc": "気力0でターンを終えると、次ターンの気力+1。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "star",
    "effects": {
      "emptyEnergy": 1,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "空になった器に新たな力が満ちる。"
  },
  {
    "id": "expansion_n_28_04",
    "name": "空椀の折り札",
    "enName": "Empty Bowl Folded Charm",
    "zhName": "空碗折符",
    "desc": "気力0でターンを終えると、次ターンの気力+1。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "star",
    "effects": {
      "emptyEnergy": 1,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "空になった器に新たな力が満ちる。"
  },
  {
    "id": "expansion_n_28_05",
    "name": "空椀の旅帳",
    "enName": "Empty Bowl Travel Ledger",
    "zhName": "空碗旅簿",
    "desc": "気力0でターンを終えると、次ターンの気力+1。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "star",
    "effects": {
      "emptyEnergy": 1,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "空になった器に新たな力が満ちる。"
  },
  {
    "id": "expansion_n_28_06",
    "name": "空椀の火口箱",
    "enName": "Empty Bowl Tinderbox",
    "zhName": "空碗火种盒",
    "desc": "気力0でターンを終えると、次ターンの気力+1。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "star",
    "effects": {
      "emptyEnergy": 1,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "空になった器に新たな力が満ちる。"
  },
  {
    "id": "expansion_n_28_07",
    "name": "空椀の結び玉",
    "enName": "Empty Bowl Knot Bead",
    "zhName": "空碗结珠",
    "desc": "気力0でターンを終えると、次ターンの気力+1。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "star",
    "effects": {
      "emptyEnergy": 1,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "空になった器に新たな力が満ちる。"
  },
  {
    "id": "expansion_n_28_08",
    "name": "空椀の星片",
    "enName": "Empty Bowl Star Shard",
    "zhName": "空碗星片",
    "desc": "気力0でターンを終えると、次ターンの気力+1。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "star",
    "effects": {
      "emptyEnergy": 1,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "空になった器に新たな力が満ちる。"
  },
  {
    "id": "expansion_n_28_09",
    "name": "空椀の木杯",
    "enName": "Empty Bowl Wooden Cup",
    "zhName": "空碗木杯",
    "desc": "気力0でターンを終えると、次ターンの気力+1。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "star",
    "effects": {
      "emptyEnergy": 1,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "空になった器に新たな力が満ちる。"
  },
  {
    "id": "expansion_n_29_01",
    "name": "銀砂の縫い針",
    "enName": "Silver Sand Needle",
    "zhName": "银砂缝针",
    "desc": "戦闘の基礎銀貨報酬+5。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "coin",
    "effects": {
      "goldFlat": 5,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の成果を少しずつ数える品。"
  },
  {
    "id": "expansion_n_29_02",
    "name": "銀砂の護り帯",
    "enName": "Silver Sand Sash",
    "zhName": "银砂护带",
    "desc": "戦闘の基礎銀貨報酬+5。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "coin",
    "effects": {
      "goldFlat": 5,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の成果を少しずつ数える品。"
  },
  {
    "id": "expansion_n_29_03",
    "name": "銀砂の薬包",
    "enName": "Silver Sand Herb Packet",
    "zhName": "银砂药包",
    "desc": "戦闘の基礎銀貨報酬+5。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "coin",
    "effects": {
      "goldFlat": 5,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の成果を少しずつ数える品。"
  },
  {
    "id": "expansion_n_29_04",
    "name": "銀砂の折り札",
    "enName": "Silver Sand Folded Charm",
    "zhName": "银砂折符",
    "desc": "戦闘の基礎銀貨報酬+5。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "coin",
    "effects": {
      "goldFlat": 5,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の成果を少しずつ数える品。"
  },
  {
    "id": "expansion_n_29_05",
    "name": "銀砂の旅帳",
    "enName": "Silver Sand Travel Ledger",
    "zhName": "银砂旅簿",
    "desc": "戦闘の基礎銀貨報酬+9。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "coin",
    "effects": {
      "goldFlat": 9,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の成果を少しずつ数える品。"
  },
  {
    "id": "expansion_n_29_06",
    "name": "銀砂の火口箱",
    "enName": "Silver Sand Tinderbox",
    "zhName": "银砂火种盒",
    "desc": "戦闘の基礎銀貨報酬+5。野営での灯油回復量+4。カード強化時、生存者全員のHPを2回復。",
    "icon": "coin",
    "effects": {
      "goldFlat": 5,
      "campFuel": 4,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の成果を少しずつ数える品。"
  },
  {
    "id": "expansion_n_29_07",
    "name": "銀砂の結び玉",
    "enName": "Silver Sand Knot Bead",
    "zhName": "银砂结珠",
    "desc": "戦闘の基礎銀貨報酬+5。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "coin",
    "effects": {
      "goldFlat": 5,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の成果を少しずつ数える品。"
  },
  {
    "id": "expansion_n_29_08",
    "name": "銀砂の星片",
    "enName": "Silver Sand Star Shard",
    "zhName": "银砂星片",
    "desc": "戦闘の基礎銀貨報酬+5。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "coin",
    "effects": {
      "goldFlat": 5,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の成果を少しずつ数える品。"
  },
  {
    "id": "expansion_n_29_09",
    "name": "銀砂の木杯",
    "enName": "Silver Sand Wooden Cup",
    "zhName": "银砂木杯",
    "desc": "戦闘の基礎銀貨報酬+5。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "coin",
    "effects": {
      "goldFlat": 5,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "旅の成果を少しずつ数える品。"
  },
  {
    "id": "expansion_n_30_01",
    "name": "油街道の縫い針",
    "enName": "Oil Road Needle",
    "zhName": "油路缝针",
    "desc": "野営での灯油回復量+5。カードで得る盾+1。各戦闘の最初のターン、手札+1。",
    "icon": "bag",
    "effects": {
      "campFuel": 5,
      "block": 1,
      "firstDraw": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "次の宿まで灯を絶やさぬ工夫。"
  },
  {
    "id": "expansion_n_30_02",
    "name": "油街道の護り帯",
    "enName": "Oil Road Sash",
    "zhName": "油路护带",
    "desc": "野営での灯油回復量+5。各戦闘の最初のターン、生存者全員に盾3。野営の休息による生存者のHP回復量+2。",
    "icon": "bag",
    "effects": {
      "campFuel": 5,
      "firstShield": 3,
      "campHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "次の宿まで灯を絶やさぬ工夫。"
  },
  {
    "id": "expansion_n_30_03",
    "name": "油街道の薬包",
    "enName": "Oil Road Herb Packet",
    "zhName": "油路药包",
    "desc": "野営での灯油回復量+5。戦闘勝利時、生存者全員のHPを2回復。生存者への回復薬のHP回復量+3。",
    "icon": "bag",
    "effects": {
      "campFuel": 5,
      "winHeal": 2,
      "potionHeal": 3
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "次の宿まで灯を絶やさぬ工夫。"
  },
  {
    "id": "expansion_n_30_04",
    "name": "油街道の折り札",
    "enName": "Oil Road Folded Charm",
    "zhName": "油路折符",
    "desc": "野営での灯油回復量+5。戦闘開始時、敵全員に弱点1。消費気力1のカードの攻撃威力+1。",
    "icon": "bag",
    "effects": {
      "campFuel": 5,
      "firstWeak": 1,
      "cheapAttack": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "次の宿まで灯を絶やさぬ工夫。"
  },
  {
    "id": "expansion_n_30_05",
    "name": "油街道の旅帳",
    "enName": "Oil Road Travel Ledger",
    "zhName": "油路旅簿",
    "desc": "野営での灯油回復量+5。戦闘の基礎銀貨報酬+4。ショップ価格の割引率+5ポイント（合計上限50%）。",
    "icon": "bag",
    "effects": {
      "campFuel": 5,
      "goldFlat": 4,
      "shopDiscount": 0.05
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "次の宿まで灯を絶やさぬ工夫。"
  },
  {
    "id": "expansion_n_30_06",
    "name": "油街道の火口箱",
    "enName": "Oil Road Tinderbox",
    "zhName": "油路火种盒",
    "desc": "野営での灯油回復量+9。カード強化時、生存者全員のHPを2回復。",
    "icon": "bag",
    "effects": {
      "campFuel": 9,
      "upgradeHeal": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "次の宿まで灯を絶やさぬ工夫。"
  },
  {
    "id": "expansion_n_30_07",
    "name": "油街道の結び玉",
    "enName": "Oil Road Knot Bead",
    "zhName": "油路结珠",
    "desc": "野営での灯油回復量+5。三人連携時に得る盾+2。三人連携時、生存者全員のHPを1回復。",
    "icon": "bag",
    "effects": {
      "campFuel": 5,
      "linkShield": 2,
      "linkHeal": 1
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "次の宿まで灯を絶やさぬ工夫。"
  },
  {
    "id": "expansion_n_30_08",
    "name": "油街道の星片",
    "enName": "Oil Road Star Shard",
    "zhName": "油路星片",
    "desc": "野営での灯油回復量+5。各戦闘の3の倍数ターン、手札+1。盾を最大2、次ターンへ持ち越す。",
    "icon": "bag",
    "effects": {
      "campFuel": 5,
      "thirdDraw": 1,
      "carryShield": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "次の宿まで灯を絶やさぬ工夫。"
  },
  {
    "id": "expansion_n_30_09",
    "name": "油街道の木杯",
    "enName": "Oil Road Wooden Cup",
    "zhName": "油路木杯",
    "desc": "野営での灯油回復量+5。カードの全体HP回復量+1。取得時、在籍者全員の最大HP+2、生存者のHP+2。今後の加入者にも最大HP加算。",
    "icon": "bag",
    "effects": {
      "campFuel": 5,
      "allHeal": 1,
      "maxHP": 2
    },
    "drawback": "",
    "tier": "normal",
    "flavor": "次の宿まで灯を絶やさぬ工夫。"
  },
  {
    "id": "expansion_b_01_01",
    "name": "血燈王の裂き印",
    "enName": "Blood Lantern King Scar Seal",
    "zhName": "血灯王裂印",
    "desc": "毎ターンの気力+1（最低1）。各戦闘の最初のターン、気力+2。",
    "icon": "flame",
    "effects": {
      "energy": 1,
      "firstEnergy": 2,
      "attackSelfDamage": 1
    },
    "drawback": "攻撃カード使用時、使用者のHP-1（盾を無視）。",
    "tier": "boss",
    "flavor": "王は明日の灯まで前借りした。"
  },
  {
    "id": "expansion_b_01_02",
    "name": "血燈王の煤冠",
    "enName": "Blood Lantern King Soot Crown",
    "zhName": "血灯王煤冠",
    "desc": "毎ターンの気力+1（最低1）。各戦闘の最初のターン、気力+2。",
    "icon": "flame",
    "effects": {
      "energy": 1,
      "firstEnergy": 2,
      "fuelCost": 1
    },
    "drawback": "マス移動時の灯油消費+1（最低1）。",
    "tier": "boss",
    "flavor": "王は明日の灯まで前借りした。"
  },
  {
    "id": "expansion_b_01_03",
    "name": "血燈王の空眼",
    "enName": "Blood Lantern King Hollow Eye",
    "zhName": "血灯王空眼",
    "desc": "毎ターンの気力+1（最低1）。各戦闘の最初のターン、気力+2。",
    "icon": "flame",
    "effects": {
      "energy": 1,
      "firstEnergy": 2,
      "draw": -1
    },
    "drawback": "毎ターンの手札-1（最低1枚）。",
    "tier": "boss",
    "flavor": "王は明日の灯まで前借りした。"
  },
  {
    "id": "expansion_b_02_01",
    "name": "鏡冠の枷",
    "enName": "Mirror Crown Shackle",
    "zhName": "镜冠枷",
    "desc": "毎ターンの手札+2（最低1枚）。各戦闘の最初のターン、手札+2。",
    "icon": "eye",
    "effects": {
      "draw": 2,
      "firstDraw": 2,
      "enemyHP": 0.2
    },
    "drawback": "敵の最大HP+20%。",
    "tier": "boss",
    "flavor": "千の選択肢を映す鏡にも背面はある。"
  },
  {
    "id": "expansion_b_02_02",
    "name": "鏡冠の刺環",
    "enName": "Mirror Crown Thorn Ring",
    "zhName": "镜冠刺环",
    "desc": "毎ターンの手札+2（最低1枚）。各戦闘の最初のターン、手札+2。",
    "icon": "eye",
    "effects": {
      "draw": 2,
      "firstDraw": 2,
      "firstCardCostHP": 2
    },
    "drawback": "毎ターン最初のカード使用時、使用者のHP-2（盾を無視）。",
    "tier": "boss",
    "flavor": "千の選択肢を映す鏡にも背面はある。"
  },
  {
    "id": "expansion_b_02_03",
    "name": "鏡冠の重鎖",
    "enName": "Mirror Crown Heavy Chain",
    "zhName": "镜冠重链",
    "desc": "毎ターンの手札+2（最低1枚）。各戦闘の最初のターン、手札+2。",
    "icon": "eye",
    "effects": {
      "draw": 2,
      "firstDraw": 2,
      "enemyAtk": 3
    },
    "drawback": "敵全員の攻撃力+3。",
    "tier": "boss",
    "flavor": "千の選択肢を映す鏡にも背面はある。"
  },
  {
    "id": "expansion_b_03_01",
    "name": "鉄城の夜契",
    "enName": "Iron Citadel Night Pact",
    "zhName": "铁城夜契",
    "desc": "毎ターン、生存者全員に盾5。盾を最大8、次ターンへ持ち越す。",
    "icon": "shield",
    "effects": {
      "shieldTurn": 5,
      "carryShield": 8,
      "nodeDamage": 1
    },
    "drawback": "マス移動時、全員のHP-1。",
    "tier": "boss",
    "flavor": "城を運ぶ者は重さも引き受ける。"
  },
  {
    "id": "expansion_b_03_02",
    "name": "鉄城の断食印",
    "enName": "Iron Citadel Fasting Seal",
    "zhName": "铁城斋戒印",
    "desc": "毎ターン、生存者全員に盾5。盾を最大8、次ターンへ持ち越す。",
    "icon": "shield",
    "effects": {
      "shieldTurn": 5,
      "carryShield": 8,
      "healMult": -0.25
    },
    "drawback": "カード・生存者への回復薬のHP回復量-25%（端数切捨て）。",
    "tier": "boss",
    "flavor": "城を運ぶ者は重さも引き受ける。"
  },
  {
    "id": "expansion_b_03_03",
    "name": "鉄城の無宿証",
    "enName": "Iron Citadel Homeless Writ",
    "zhName": "铁城无宿证",
    "desc": "毎ターン、生存者全員に盾5。盾を最大8、次ターンへ持ち越す。",
    "icon": "shield",
    "effects": {
      "shieldTurn": 5,
      "carryShield": 8,
      "campHealDisabled": 1
    },
    "drawback": "野営の休息で生存者のHPが回復しない（倒れた仲間の復帰は可能）。",
    "tier": "boss",
    "flavor": "城を運ぶ者は重さも引き受ける。"
  },
  {
    "id": "expansion_b_04_01",
    "name": "裂天の裂き印",
    "enName": "Skybreaker Scar Seal",
    "zhName": "裂天裂印",
    "desc": "カードの攻撃威力+5。カードの全体攻撃威力+4。",
    "icon": "sword",
    "effects": {
      "attack": 5,
      "aoe": 4,
      "attackSelfDamage": 1
    },
    "drawback": "攻撃カード使用時、使用者のHP-1（盾を無視）。",
    "tier": "boss",
    "flavor": "空を裂く刃は持ち主にも問いを刻む。"
  },
  {
    "id": "expansion_b_04_02",
    "name": "裂天の煤冠",
    "enName": "Skybreaker Soot Crown",
    "zhName": "裂天煤冠",
    "desc": "カードの攻撃威力+5。カードの全体攻撃威力+4。",
    "icon": "sword",
    "effects": {
      "attack": 5,
      "aoe": 4,
      "fuelCost": 1
    },
    "drawback": "マス移動時の灯油消費+1（最低1）。",
    "tier": "boss",
    "flavor": "空を裂く刃は持ち主にも問いを刻む。"
  },
  {
    "id": "expansion_b_04_03",
    "name": "裂天の空眼",
    "enName": "Skybreaker Hollow Eye",
    "zhName": "裂天空眼",
    "desc": "カードの攻撃威力+5。カードの全体攻撃威力+4。",
    "icon": "sword",
    "effects": {
      "attack": 5,
      "aoe": 4,
      "draw": -1
    },
    "drawback": "毎ターンの手札-1（最低1枚）。",
    "tier": "boss",
    "flavor": "空を裂く刃は持ち主にも問いを刻む。"
  },
  {
    "id": "expansion_b_05_01",
    "name": "毒后の枷",
    "enName": "Venom Queen Shackle",
    "zhName": "毒后枷",
    "desc": "カードで付与する毒+3。毎ターン最初の毒付与・毒増幅カード使用時、2枚引く。",
    "icon": "flask",
    "effects": {
      "poison": 3,
      "poisonDraw": 2,
      "enemyHP": 0.2
    },
    "drawback": "敵の最大HP+20%。",
    "tier": "boss",
    "flavor": "女王の秘薬は甘い香りを放つ。"
  },
  {
    "id": "expansion_b_05_02",
    "name": "毒后の刺環",
    "enName": "Venom Queen Thorn Ring",
    "zhName": "毒后刺环",
    "desc": "カードで付与する毒+3。毎ターン最初の毒付与・毒増幅カード使用時、2枚引く。",
    "icon": "flask",
    "effects": {
      "poison": 3,
      "poisonDraw": 2,
      "firstCardCostHP": 2
    },
    "drawback": "毎ターン最初のカード使用時、使用者のHP-2（盾を無視）。",
    "tier": "boss",
    "flavor": "女王の秘薬は甘い香りを放つ。"
  },
  {
    "id": "expansion_b_05_03",
    "name": "毒后の重鎖",
    "enName": "Venom Queen Heavy Chain",
    "zhName": "毒后重链",
    "desc": "カードで付与する毒+3。毎ターン最初の毒付与・毒増幅カード使用時、2枚引く。",
    "icon": "flask",
    "effects": {
      "poison": 3,
      "poisonDraw": 2,
      "enemyAtk": 3
    },
    "drawback": "敵全員の攻撃力+3。",
    "tier": "boss",
    "flavor": "女王の秘薬は甘い香りを放つ。"
  },
  {
    "id": "expansion_b_06_01",
    "name": "断章の夜契",
    "enName": "Lost Chapter Night Pact",
    "zhName": "断章夜契",
    "desc": "毎ターン最初の策略カード使用時、2枚引く。各戦闘の3の倍数ターン、手札+3。",
    "icon": "book",
    "effects": {
      "firstSkillDraw": 2,
      "thirdDraw": 3,
      "nodeDamage": 1
    },
    "drawback": "マス移動時、全員のHP-1。",
    "tier": "boss",
    "flavor": "読み切れぬ書に答えだけが増えてゆく。"
  },
  {
    "id": "expansion_b_06_02",
    "name": "断章の断食印",
    "enName": "Lost Chapter Fasting Seal",
    "zhName": "断章斋戒印",
    "desc": "毎ターン最初の策略カード使用時、2枚引く。各戦闘の3の倍数ターン、手札+3。",
    "icon": "book",
    "effects": {
      "firstSkillDraw": 2,
      "thirdDraw": 3,
      "healMult": -0.25
    },
    "drawback": "カード・生存者への回復薬のHP回復量-25%（端数切捨て）。",
    "tier": "boss",
    "flavor": "読み切れぬ書に答えだけが増えてゆく。"
  },
  {
    "id": "expansion_b_06_03",
    "name": "断章の無宿証",
    "enName": "Lost Chapter Homeless Writ",
    "zhName": "断章无宿证",
    "desc": "毎ターン最初の策略カード使用時、2枚引く。各戦闘の3の倍数ターン、手札+3。",
    "icon": "book",
    "effects": {
      "firstSkillDraw": 2,
      "thirdDraw": 3,
      "campHealDisabled": 1
    },
    "drawback": "野営の休息で生存者のHPが回復しない（倒れた仲間の復帰は可能）。",
    "tier": "boss",
    "flavor": "読み切れぬ書に答えだけが増えてゆく。"
  },
  {
    "id": "expansion_b_07_01",
    "name": "灰鳳の裂き印",
    "enName": "Ash Phoenix Scar Seal",
    "zhName": "灰凤裂印",
    "desc": "毎ターン最初の消滅カード使用時、気力+2。消費気力0のカード使用時、生存中の敵1体にランダムで6ダメージ。",
    "icon": "flame",
    "effects": {
      "exhaustEnergy": 2,
      "zeroPing": 6,
      "attackSelfDamage": 1
    },
    "drawback": "攻撃カード使用時、使用者のHP-1（盾を無視）。",
    "tier": "boss",
    "flavor": "消えゆく羽根ほど激しく燃える。"
  },
  {
    "id": "expansion_b_07_02",
    "name": "灰鳳の煤冠",
    "enName": "Ash Phoenix Soot Crown",
    "zhName": "灰凤煤冠",
    "desc": "毎ターン最初の消滅カード使用時、気力+2。消費気力0のカード使用時、生存中の敵1体にランダムで6ダメージ。",
    "icon": "flame",
    "effects": {
      "exhaustEnergy": 2,
      "zeroPing": 6,
      "fuelCost": 1
    },
    "drawback": "マス移動時の灯油消費+1（最低1）。",
    "tier": "boss",
    "flavor": "消えゆく羽根ほど激しく燃える。"
  },
  {
    "id": "expansion_b_07_03",
    "name": "灰鳳の空眼",
    "enName": "Ash Phoenix Hollow Eye",
    "zhName": "灰凤空眼",
    "desc": "毎ターン最初の消滅カード使用時、気力+2。消費気力0のカード使用時、生存中の敵1体にランダムで6ダメージ。",
    "icon": "flame",
    "effects": {
      "exhaustEnergy": 2,
      "zeroPing": 6,
      "draw": -1
    },
    "drawback": "毎ターンの手札-1（最低1枚）。",
    "tier": "boss",
    "flavor": "消えゆく羽根ほど激しく燃える。"
  },
  {
    "id": "expansion_b_08_01",
    "name": "三盟王の枷",
    "enName": "Triple Oath King Shackle",
    "zhName": "三盟王枷",
    "desc": "三人連携時に得る気力+2。三人連携時に得る盾+8。",
    "icon": "bell",
    "effects": {
      "linkEnergy": 2,
      "linkShield": 8,
      "enemyHP": 0.2
    },
    "drawback": "敵の最大HP+20%。",
    "tier": "boss",
    "flavor": "三人の誓いを王の契約に変える。"
  },
  {
    "id": "expansion_b_08_02",
    "name": "三盟王の刺環",
    "enName": "Triple Oath King Thorn Ring",
    "zhName": "三盟王刺环",
    "desc": "三人連携時に得る気力+2。三人連携時に得る盾+8。",
    "icon": "bell",
    "effects": {
      "linkEnergy": 2,
      "linkShield": 8,
      "firstCardCostHP": 2
    },
    "drawback": "毎ターン最初のカード使用時、使用者のHP-2（盾を無視）。",
    "tier": "boss",
    "flavor": "三人の誓いを王の契約に変える。"
  },
  {
    "id": "expansion_b_08_03",
    "name": "三盟王の重鎖",
    "enName": "Triple Oath King Heavy Chain",
    "zhName": "三盟王重链",
    "desc": "三人連携時に得る気力+2。三人連携時に得る盾+8。",
    "icon": "bell",
    "effects": {
      "linkEnergy": 2,
      "linkShield": 8,
      "enemyAtk": 3
    },
    "drawback": "敵全員の攻撃力+3。",
    "tier": "boss",
    "flavor": "三人の誓いを王の契約に変える。"
  },
  {
    "id": "expansion_b_09_01",
    "name": "慈悲塔の夜契",
    "enName": "Mercy Tower Night Pact",
    "zhName": "慈悲塔夜契",
    "desc": "戦闘勝利時、生存者全員のHPを10回復。各戦闘で一度、被ダメージで倒れる仲間1人をHP18で復帰（最大HPまで）。",
    "icon": "heart",
    "effects": {
      "winHeal": 10,
      "revive": 18,
      "nodeDamage": 1
    },
    "drawback": "マス移動時、全員のHP-1。",
    "tier": "boss",
    "flavor": "塔の鐘は戻れぬ者の名も覚えている。"
  },
  {
    "id": "expansion_b_09_02",
    "name": "慈悲塔の断食印",
    "enName": "Mercy Tower Fasting Seal",
    "zhName": "慈悲塔斋戒印",
    "desc": "戦闘勝利時、生存者全員のHPを10回復。各戦闘で一度、被ダメージで倒れる仲間1人をHP18で復帰（最大HPまで）。",
    "icon": "heart",
    "effects": {
      "winHeal": 10,
      "revive": 18,
      "healMult": -0.25
    },
    "drawback": "カード・生存者への回復薬のHP回復量-25%（端数切捨て）。",
    "tier": "boss",
    "flavor": "塔の鐘は戻れぬ者の名も覚えている。"
  },
  {
    "id": "expansion_b_09_03",
    "name": "慈悲塔の無宿証",
    "enName": "Mercy Tower Homeless Writ",
    "zhName": "慈悲塔无宿证",
    "desc": "戦闘勝利時、生存者全員のHPを10回復。各戦闘で一度、被ダメージで倒れる仲間1人をHP18で復帰（最大HPまで）。",
    "icon": "heart",
    "effects": {
      "winHeal": 10,
      "revive": 18,
      "campHealDisabled": 1
    },
    "drawback": "野営の休息で生存者のHPが回復しない（倒れた仲間の復帰は可能）。",
    "tier": "boss",
    "flavor": "塔の鐘は戻れぬ者の名も覚えている。"
  },
  {
    "id": "expansion_b_10_01",
    "name": "鋼花の裂き印",
    "enName": "Steel Blossom Scar Seal",
    "zhName": "钢花裂印",
    "desc": "カードで得る盾+5。各戦闘の最初のターン、生存者全員に盾10。",
    "icon": "shield",
    "effects": {
      "block": 5,
      "firstShield": 10,
      "attackSelfDamage": 1
    },
    "drawback": "攻撃カード使用時、使用者のHP-1（盾を無視）。",
    "tier": "boss",
    "flavor": "鋼の花びらにも季節は巡る。"
  },
  {
    "id": "expansion_b_10_02",
    "name": "鋼花の煤冠",
    "enName": "Steel Blossom Soot Crown",
    "zhName": "钢花煤冠",
    "desc": "カードで得る盾+5。各戦闘の最初のターン、生存者全員に盾10。",
    "icon": "shield",
    "effects": {
      "block": 5,
      "firstShield": 10,
      "fuelCost": 1
    },
    "drawback": "マス移動時の灯油消費+1（最低1）。",
    "tier": "boss",
    "flavor": "鋼の花びらにも季節は巡る。"
  },
  {
    "id": "expansion_b_10_03",
    "name": "鋼花の空眼",
    "enName": "Steel Blossom Hollow Eye",
    "zhName": "钢花空眼",
    "desc": "カードで得る盾+5。各戦闘の最初のターン、生存者全員に盾10。",
    "icon": "shield",
    "effects": {
      "block": 5,
      "firstShield": 10,
      "draw": -1
    },
    "drawback": "毎ターンの手札-1（最低1枚）。",
    "tier": "boss",
    "flavor": "鋼の花びらにも季節は巡る。"
  },
  {
    "id": "expansion_b_11_01",
    "name": "飢星の枷",
    "enName": "Hungry Star Shackle",
    "zhName": "饥星枷",
    "desc": "気力0でターンを終えると、次ターンの気力+2。未使用の気力を最大2、次ターンへ持ち越す。",
    "icon": "star",
    "effects": {
      "emptyEnergy": 2,
      "carryEnergy": 2,
      "enemyHP": 0.2
    },
    "drawback": "敵の最大HP+20%。",
    "tier": "boss",
    "flavor": "満ち欠けを食べる遠い星の欠片。"
  },
  {
    "id": "expansion_b_11_02",
    "name": "飢星の刺環",
    "enName": "Hungry Star Thorn Ring",
    "zhName": "饥星刺环",
    "desc": "気力0でターンを終えると、次ターンの気力+2。未使用の気力を最大2、次ターンへ持ち越す。",
    "icon": "star",
    "effects": {
      "emptyEnergy": 2,
      "carryEnergy": 2,
      "firstCardCostHP": 2
    },
    "drawback": "毎ターン最初のカード使用時、使用者のHP-2（盾を無視）。",
    "tier": "boss",
    "flavor": "満ち欠けを食べる遠い星の欠片。"
  },
  {
    "id": "expansion_b_11_03",
    "name": "飢星の重鎖",
    "enName": "Hungry Star Heavy Chain",
    "zhName": "饥星重链",
    "desc": "気力0でターンを終えると、次ターンの気力+2。未使用の気力を最大2、次ターンへ持ち越す。",
    "icon": "star",
    "effects": {
      "emptyEnergy": 2,
      "carryEnergy": 2,
      "enemyAtk": 3
    },
    "drawback": "敵全員の攻撃力+3。",
    "tier": "boss",
    "flavor": "満ち欠けを食べる遠い星の欠片。"
  },
  {
    "id": "expansion_b_12_01",
    "name": "銀獣の夜契",
    "enName": "Silver Beast Night Pact",
    "zhName": "银兽夜契",
    "desc": "戦闘の銀貨報酬+75%。強敵戦の基礎銀貨報酬+25。",
    "icon": "coin",
    "effects": {
      "goldMult": 0.75,
      "eliteGold": 25,
      "nodeDamage": 1
    },
    "drawback": "マス移動時、全員のHP-1。",
    "tier": "boss",
    "flavor": "銀を嗅ぎ分ける獣は休むことを知らない。"
  },
  {
    "id": "expansion_b_12_02",
    "name": "銀獣の断食印",
    "enName": "Silver Beast Fasting Seal",
    "zhName": "银兽斋戒印",
    "desc": "戦闘の銀貨報酬+75%。強敵戦の基礎銀貨報酬+25。",
    "icon": "coin",
    "effects": {
      "goldMult": 0.75,
      "eliteGold": 25,
      "healMult": -0.25
    },
    "drawback": "カード・生存者への回復薬のHP回復量-25%（端数切捨て）。",
    "tier": "boss",
    "flavor": "銀を嗅ぎ分ける獣は休むことを知らない。"
  },
  {
    "id": "expansion_b_12_03",
    "name": "銀獣の無宿証",
    "enName": "Silver Beast Homeless Writ",
    "zhName": "银兽无宿证",
    "desc": "戦闘の銀貨報酬+75%。強敵戦の基礎銀貨報酬+25。",
    "icon": "coin",
    "effects": {
      "goldMult": 0.75,
      "eliteGold": 25,
      "campHealDisabled": 1
    },
    "drawback": "野営の休息で生存者のHPが回復しない（倒れた仲間の復帰は可能）。",
    "tier": "boss",
    "flavor": "銀を嗅ぎ分ける獣は休むことを知らない。"
  },
  {
    "id": "expansion_b_13_01",
    "name": "回廊聖者の裂き印",
    "enName": "Corridor Saint Scar Seal",
    "zhName": "回廊圣者裂印",
    "desc": "毎ターン、生存者全員のHPを3回復。取得時、在籍者全員の最大HP+12、生存者のHP+12。今後の加入者にも最大HP加算。",
    "icon": "leaf",
    "effects": {
      "turnRegen": 3,
      "maxHP": 12,
      "attackSelfDamage": 1
    },
    "drawback": "攻撃カード使用時、使用者のHP-1（盾を無視）。",
    "tier": "boss",
    "flavor": "果てのない回廊で祈りが肉体を支える。"
  },
  {
    "id": "expansion_b_13_02",
    "name": "回廊聖者の煤冠",
    "enName": "Corridor Saint Soot Crown",
    "zhName": "回廊圣者煤冠",
    "desc": "毎ターン、生存者全員のHPを3回復。取得時、在籍者全員の最大HP+12、生存者のHP+12。今後の加入者にも最大HP加算。",
    "icon": "leaf",
    "effects": {
      "turnRegen": 3,
      "maxHP": 12,
      "fuelCost": 1
    },
    "drawback": "マス移動時の灯油消費+1（最低1）。",
    "tier": "boss",
    "flavor": "果てのない回廊で祈りが肉体を支える。"
  },
  {
    "id": "expansion_b_13_03",
    "name": "回廊聖者の空眼",
    "enName": "Corridor Saint Hollow Eye",
    "zhName": "回廊圣者空眼",
    "desc": "毎ターン、生存者全員のHPを3回復。取得時、在籍者全員の最大HP+12、生存者のHP+12。今後の加入者にも最大HP加算。",
    "icon": "leaf",
    "effects": {
      "turnRegen": 3,
      "maxHP": 12,
      "draw": -1
    },
    "drawback": "毎ターンの手札-1（最低1枚）。",
    "tier": "boss",
    "flavor": "果てのない回廊で祈りが肉体を支える。"
  },
  {
    "id": "expansion_b_14_01",
    "name": "軽刃公の枷",
    "enName": "Lightblade Duke Shackle",
    "zhName": "轻刃公枷",
    "desc": "消費気力1のカードの攻撃威力+6。ターン中3枚目以降に使うカードの攻撃威力+5。",
    "icon": "sword",
    "effects": {
      "cheapAttack": 6,
      "lateAttack": 5,
      "enemyHP": 0.2
    },
    "drawback": "敵の最大HP+20%。",
    "tier": "boss",
    "flavor": "無数の軽刃が公の影を作る。"
  },
  {
    "id": "expansion_b_14_02",
    "name": "軽刃公の刺環",
    "enName": "Lightblade Duke Thorn Ring",
    "zhName": "轻刃公刺环",
    "desc": "消費気力1のカードの攻撃威力+6。ターン中3枚目以降に使うカードの攻撃威力+5。",
    "icon": "sword",
    "effects": {
      "cheapAttack": 6,
      "lateAttack": 5,
      "firstCardCostHP": 2
    },
    "drawback": "毎ターン最初のカード使用時、使用者のHP-2（盾を無視）。",
    "tier": "boss",
    "flavor": "無数の軽刃が公の影を作る。"
  },
  {
    "id": "expansion_b_14_03",
    "name": "軽刃公の重鎖",
    "enName": "Lightblade Duke Heavy Chain",
    "zhName": "轻刃公重链",
    "desc": "消費気力1のカードの攻撃威力+6。ターン中3枚目以降に使うカードの攻撃威力+5。",
    "icon": "sword",
    "effects": {
      "cheapAttack": 6,
      "lateAttack": 5,
      "enemyAtk": 3
    },
    "drawback": "敵全員の攻撃力+3。",
    "tier": "boss",
    "flavor": "無数の軽刃が公の影を作る。"
  },
  {
    "id": "expansion_b_15_01",
    "name": "盲鷹の夜契",
    "enName": "Blind Hawk Night Pact",
    "zhName": "盲鹰夜契",
    "desc": "戦闘開始時、敵全員に弱点3。弱点を消費して与えるダメージが追加で+5。",
    "icon": "eye",
    "effects": {
      "firstWeak": 3,
      "weakBonus": 5,
      "nodeDamage": 1
    },
    "drawback": "マス移動時、全員のHP-1。",
    "tier": "boss",
    "flavor": "目を閉じてなお急所を知る鷹。"
  },
  {
    "id": "expansion_b_15_02",
    "name": "盲鷹の断食印",
    "enName": "Blind Hawk Fasting Seal",
    "zhName": "盲鹰斋戒印",
    "desc": "戦闘開始時、敵全員に弱点3。弱点を消費して与えるダメージが追加で+5。",
    "icon": "eye",
    "effects": {
      "firstWeak": 3,
      "weakBonus": 5,
      "healMult": -0.25
    },
    "drawback": "カード・生存者への回復薬のHP回復量-25%（端数切捨て）。",
    "tier": "boss",
    "flavor": "目を閉じてなお急所を知る鷹。"
  },
  {
    "id": "expansion_b_15_03",
    "name": "盲鷹の無宿証",
    "enName": "Blind Hawk Homeless Writ",
    "zhName": "盲鹰无宿证",
    "desc": "戦闘開始時、敵全員に弱点3。弱点を消費して与えるダメージが追加で+5。",
    "icon": "eye",
    "effects": {
      "firstWeak": 3,
      "weakBonus": 5,
      "campHealDisabled": 1
    },
    "drawback": "野営の休息で生存者のHPが回復しない（倒れた仲間の復帰は可能）。",
    "tier": "boss",
    "flavor": "目を閉じてなお急所を知る鷹。"
  },
  {
    "id": "expansion_b_16_01",
    "name": "雨葬の裂き印",
    "enName": "Rain Funeral Scar Seal",
    "zhName": "雨葬裂印",
    "desc": "カードによるHP回復量+4。カードの全体HP回復量+5。",
    "icon": "leaf",
    "effects": {
      "heal": 4,
      "allHeal": 5,
      "attackSelfDamage": 1
    },
    "drawback": "攻撃カード使用時、使用者のHP-1（盾を無視）。",
    "tier": "boss",
    "flavor": "見送る雨が生者の傷も洗い流す。"
  },
  {
    "id": "expansion_b_16_02",
    "name": "雨葬の煤冠",
    "enName": "Rain Funeral Soot Crown",
    "zhName": "雨葬煤冠",
    "desc": "カードによるHP回復量+4。カードの全体HP回復量+5。",
    "icon": "leaf",
    "effects": {
      "heal": 4,
      "allHeal": 5,
      "fuelCost": 1
    },
    "drawback": "マス移動時の灯油消費+1（最低1）。",
    "tier": "boss",
    "flavor": "見送る雨が生者の傷も洗い流す。"
  },
  {
    "id": "expansion_b_16_03",
    "name": "雨葬の空眼",
    "enName": "Rain Funeral Hollow Eye",
    "zhName": "雨葬空眼",
    "desc": "カードによるHP回復量+4。カードの全体HP回復量+5。",
    "icon": "leaf",
    "effects": {
      "heal": 4,
      "allHeal": 5,
      "draw": -1
    },
    "drawback": "毎ターンの手札-1（最低1枚）。",
    "tier": "boss",
    "flavor": "見送る雨が生者の傷も洗い流す。"
  },
  {
    "id": "expansion_b_17_01",
    "name": "灯油侯の枷",
    "enName": "Oil Marquis Shackle",
    "zhName": "灯油侯枷",
    "desc": "マス移動時の灯油消費-1（最低1）。野営での灯油回復量+18。野営の休息による生存者のHP回復量+8。",
    "icon": "bag",
    "effects": {
      "fuelCost": -1,
      "campFuel": 18,
      "campHeal": 8,
      "enemyHP": 0.2
    },
    "drawback": "敵の最大HP+20%。",
    "tier": "boss",
    "flavor": "侯爵の道には必ず次の焚火がある。"
  },
  {
    "id": "expansion_b_17_02",
    "name": "灯油侯の刺環",
    "enName": "Oil Marquis Thorn Ring",
    "zhName": "灯油侯刺环",
    "desc": "マス移動時の灯油消費-1（最低1）。野営での灯油回復量+18。野営の休息による生存者のHP回復量+8。",
    "icon": "bag",
    "effects": {
      "fuelCost": -1,
      "campFuel": 18,
      "campHeal": 8,
      "firstCardCostHP": 2
    },
    "drawback": "毎ターン最初のカード使用時、使用者のHP-2（盾を無視）。",
    "tier": "boss",
    "flavor": "侯爵の道には必ず次の焚火がある。"
  },
  {
    "id": "expansion_b_17_03",
    "name": "灯油侯の重鎖",
    "enName": "Oil Marquis Heavy Chain",
    "zhName": "灯油侯重链",
    "desc": "マス移動時の灯油消費-1（最低1）。野営での灯油回復量+18。野営の休息による生存者のHP回復量+8。",
    "icon": "bag",
    "effects": {
      "fuelCost": -1,
      "campFuel": 18,
      "campHeal": 8,
      "enemyAtk": 3
    },
    "drawback": "敵全員の攻撃力+3。",
    "tier": "boss",
    "flavor": "侯爵の道には必ず次の焚火がある。"
  },
  {
    "id": "expansion_b_18_01",
    "name": "刻印師の夜契",
    "enName": "Runesmith Night Pact",
    "zhName": "铭印师夜契",
    "desc": "強化済みカードの消費気力-1（最低0）。カード強化時、生存者全員のHPを8回復。",
    "icon": "shield",
    "effects": {
      "upgradeCostOffset": -1,
      "upgradeHeal": 8,
      "nodeDamage": 1
    },
    "drawback": "マス移動時、全員のHP-1。",
    "tier": "boss",
    "flavor": "刻印は洗っても落ちず、道具を選ぶ。"
  },
  {
    "id": "expansion_b_18_02",
    "name": "刻印師の断食印",
    "enName": "Runesmith Fasting Seal",
    "zhName": "铭印师斋戒印",
    "desc": "強化済みカードの消費気力-1（最低0）。カード強化時、生存者全員のHPを8回復。",
    "icon": "shield",
    "effects": {
      "upgradeCostOffset": -1,
      "upgradeHeal": 8,
      "healMult": -0.25
    },
    "drawback": "カード・生存者への回復薬のHP回復量-25%（端数切捨て）。",
    "tier": "boss",
    "flavor": "刻印は洗っても落ちず、道具を選ぶ。"
  },
  {
    "id": "expansion_b_18_03",
    "name": "刻印師の無宿証",
    "enName": "Runesmith Homeless Writ",
    "zhName": "铭印师无宿证",
    "desc": "強化済みカードの消費気力-1（最低0）。カード強化時、生存者全員のHPを8回復。",
    "icon": "shield",
    "effects": {
      "upgradeCostOffset": -1,
      "upgradeHeal": 8,
      "campHealDisabled": 1
    },
    "drawback": "野営の休息で生存者のHPが回復しない（倒れた仲間の復帰は可能）。",
    "tier": "boss",
    "flavor": "刻印は洗っても落ちず、道具を選ぶ。"
  },
  {
    "id": "expansion_b_19_01",
    "name": "薬壺巨人の裂き印",
    "enName": "Flask Giant Scar Seal",
    "zhName": "药壶巨人裂印",
    "desc": "生存者への回復薬のHP回復量+20。取得時、回復薬+3（所持上限3個）。章クリア時、生存者のHP回復量+15。",
    "icon": "flask",
    "effects": {
      "potionHeal": 20,
      "pickupPotion": 3,
      "bossHeal": 15,
      "attackSelfDamage": 1
    },
    "drawback": "攻撃カード使用時、使用者のHP-1（盾を無視）。",
    "tier": "boss",
    "flavor": "巨人が分けた一滴は小瓶を満たす。"
  },
  {
    "id": "expansion_b_19_02",
    "name": "薬壺巨人の煤冠",
    "enName": "Flask Giant Soot Crown",
    "zhName": "药壶巨人煤冠",
    "desc": "生存者への回復薬のHP回復量+20。取得時、回復薬+3（所持上限3個）。章クリア時、生存者のHP回復量+15。",
    "icon": "flask",
    "effects": {
      "potionHeal": 20,
      "pickupPotion": 3,
      "bossHeal": 15,
      "fuelCost": 1
    },
    "drawback": "マス移動時の灯油消費+1（最低1）。",
    "tier": "boss",
    "flavor": "巨人が分けた一滴は小瓶を満たす。"
  },
  {
    "id": "expansion_b_19_03",
    "name": "薬壺巨人の空眼",
    "enName": "Flask Giant Hollow Eye",
    "zhName": "药壶巨人空眼",
    "desc": "生存者への回復薬のHP回復量+20。取得時、回復薬+3（所持上限3個）。章クリア時、生存者のHP回復量+15。",
    "icon": "flask",
    "effects": {
      "potionHeal": 20,
      "pickupPotion": 3,
      "bossHeal": 15,
      "draw": -1
    },
    "drawback": "毎ターンの手札-1（最低1枚）。",
    "tier": "boss",
    "flavor": "巨人が分けた一滴は小瓶を満たす。"
  },
  {
    "id": "expansion_b_20_01",
    "name": "無銭騎士の枷",
    "enName": "Penniless Knight Shackle",
    "zhName": "无钱骑士枷",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで8ダメージ。カードの攻撃威力+30%。",
    "icon": "star",
    "effects": {
      "zeroPing": 8,
      "attackMult": 0.3,
      "enemyHP": 0.2
    },
    "drawback": "敵の最大HP+20%。",
    "tier": "boss",
    "flavor": "手放した富の重さだけ剣が軽くなる。"
  },
  {
    "id": "expansion_b_20_02",
    "name": "無銭騎士の刺環",
    "enName": "Penniless Knight Thorn Ring",
    "zhName": "无钱骑士刺环",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで8ダメージ。カードの攻撃威力+30%。",
    "icon": "star",
    "effects": {
      "zeroPing": 8,
      "attackMult": 0.3,
      "firstCardCostHP": 2
    },
    "drawback": "毎ターン最初のカード使用時、使用者のHP-2（盾を無視）。",
    "tier": "boss",
    "flavor": "手放した富の重さだけ剣が軽くなる。"
  },
  {
    "id": "expansion_b_20_03",
    "name": "無銭騎士の重鎖",
    "enName": "Penniless Knight Heavy Chain",
    "zhName": "无钱骑士重链",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで8ダメージ。カードの攻撃威力+30%。",
    "icon": "star",
    "effects": {
      "zeroPing": 8,
      "attackMult": 0.3,
      "enemyAtk": 3
    },
    "drawback": "敵全員の攻撃力+3。",
    "tier": "boss",
    "flavor": "手放した富の重さだけ剣が軽くなる。"
  }
].map(designRelic);

export const SPECIAL_RELICS = [
  {
    "id": "abyss_relic_01",
    "name": "深淵の太陽",
    "enName": "Abyssal Sun",
    "zhName": "深渊太阳",
    "desc": "毎ターンの気力+3（最低1）。カードの攻撃威力+10。各戦闘の最初のターン、生存者全員に盾24。取得時、在籍者全員の最大HP+25、生存者のHP+25。今後の加入者にも最大HP加算。",
    "icon": "sun",
    "effects": {
      "energy": 3,
      "attack": 10,
      "firstShield": 24,
      "maxHP": 25
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_02",
    "name": "終夜の星冠",
    "enName": "Crown of Endless Night",
    "zhName": "永夜星冠",
    "desc": "毎ターンの手札+4（最低1枚）。各戦闘の最初のターン、気力+4。各戦闘の3の倍数ターン、手札+3。毎ターン、生存者全員に盾8。",
    "icon": "star",
    "effects": {
      "draw": 4,
      "firstEnergy": 4,
      "thirdDraw": 3,
      "shieldTurn": 8
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_03",
    "name": "万灯の心臓",
    "enName": "Heart of Ten Thousand Lights",
    "zhName": "万灯之心",
    "desc": "毎ターン、生存者全員のHPを6回復。取得時、在籍者全員の最大HP+40、生存者のHP+40。今後の加入者にも最大HP加算。各戦闘で一度、被ダメージで倒れる仲間1人をHP50で復帰（最大HPまで）。戦闘勝利時、生存者全員のHPを20回復。",
    "icon": "heart",
    "effects": {
      "turnRegen": 6,
      "maxHP": 40,
      "revive": 50,
      "winHeal": 20
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_04",
    "name": "無窮の剣環",
    "enName": "Ring of Infinite Blades",
    "zhName": "无穷剑环",
    "desc": "カードの攻撃威力+12。カードの攻撃威力+50%。ターン中3枚目以降に使うカードの攻撃威力+10。消費気力1のカードの攻撃威力+8。",
    "icon": "sword",
    "effects": {
      "attack": 12,
      "attackMult": 0.5,
      "lateAttack": 10,
      "cheapAttack": 8
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_05",
    "name": "星海の大盾",
    "enName": "Shield of the Star Sea",
    "zhName": "星海大盾",
    "desc": "毎ターン、生存者全員に盾15。盾を最大35、次ターンへ持ち越す。カードで得る盾+10。各戦闘の最初のターン、生存者全員に盾30。",
    "icon": "shield",
    "effects": {
      "shieldTurn": 15,
      "carryShield": 35,
      "block": 10,
      "firstShield": 30
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_06",
    "name": "三魂の天秤",
    "enName": "Scales of Three Souls",
    "zhName": "三魂天平",
    "desc": "三人連携時に得る気力+4。三人連携時に得る盾+25。三人連携時、生存者全員のHPを15回復。毎ターンの気力+2（最低1）。",
    "icon": "bell",
    "effects": {
      "linkEnergy": 4,
      "linkShield": 25,
      "linkHeal": 15,
      "energy": 2
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_07",
    "name": "無音界の雷珠",
    "enName": "Thunder of the Silent Realm",
    "zhName": "无声界雷珠",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで20ダメージ。毎ターンの気力+2（最低1）。毎ターンの手札+3（最低1枚）。戦闘開始時、敵全員に弱点4。",
    "icon": "star",
    "effects": {
      "zeroPing": 20,
      "energy": 2,
      "draw": 3,
      "firstWeak": 4
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_08",
    "name": "毒銀河の盃",
    "enName": "Venom Galaxy Chalice",
    "zhName": "毒银河之杯",
    "desc": "カードで付与する毒+9。毎ターン最初の毒付与・毒増幅カード使用時、3枚引く。戦闘開始時、敵全員に弱点5。毎ターン、生存者全員に盾8。",
    "icon": "flask",
    "effects": {
      "poison": 9,
      "poisonDraw": 3,
      "firstWeak": 5,
      "shieldTurn": 8
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_09",
    "name": "灰王の不死羽",
    "enName": "Ash King Immortal Feather",
    "zhName": "灰王不死羽",
    "desc": "毎ターン最初の消滅カード使用時、気力+4。毎ターン最初の策略カード使用時、3枚引く。毎ターンの手札+3（最低1枚）。各戦闘で一度、被ダメージで倒れる仲間1人をHP40で復帰（最大HPまで）。",
    "icon": "flame",
    "effects": {
      "exhaustEnergy": 4,
      "firstSkillDraw": 3,
      "draw": 3,
      "revive": 40
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_10",
    "name": "世界樹の種核",
    "enName": "World Tree Seedheart",
    "zhName": "世界树种核",
    "desc": "毎ターン、生存者全員のHPを7回復。カードによるHP回復量+10。カードの全体HP回復量+12。取得時、在籍者全員の最大HP+30、生存者のHP+30。今後の加入者にも最大HP加算。",
    "icon": "leaf",
    "effects": {
      "turnRegen": 7,
      "heal": 10,
      "allHeal": 12,
      "maxHP": 30
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_11",
    "name": "黎明を紡ぐ針",
    "enName": "Needle that Weaves Dawn",
    "zhName": "织晓之针",
    "desc": "各戦闘の最初のターン、気力+7。各戦闘の最初のターン、手札+5。各戦闘の最初のターン、生存者全員に盾40。カードの攻撃威力+9。",
    "icon": "sun",
    "effects": {
      "firstEnergy": 7,
      "firstDraw": 5,
      "firstShield": 40,
      "attack": 9
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_12",
    "name": "永遠の巡礼時計",
    "enName": "Eternal Pilgrim Clock",
    "zhName": "永恒巡礼钟",
    "desc": "未使用の気力を最大6、次ターンへ持ち越す。気力0でターンを終えると、次ターンの気力+4。毎ターンの気力+2（最低1）。各戦闘の3の倍数ターン、手札+4。",
    "icon": "eye",
    "effects": {
      "carryEnergy": 6,
      "emptyEnergy": 4,
      "energy": 2,
      "thirdDraw": 4
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_13",
    "name": "金月の宝庫",
    "enName": "Treasury of the Golden Moon",
    "zhName": "金月宝库",
    "desc": "戦闘の銀貨報酬+200%。戦闘の基礎銀貨報酬+40。ショップ価格の割引率+50ポイント（合計上限50%）。ショップのカード陳列数+5。",
    "icon": "coin",
    "effects": {
      "goldMult": 2,
      "goldFlat": 40,
      "shopDiscount": 0.5,
      "shopStock": 5
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_14",
    "name": "群星の狩猟眼",
    "enName": "Hunting Eye of the Stars",
    "zhName": "群星猎眼",
    "desc": "弱点を消費して与えるダメージが追加で+15。戦闘開始時、敵全員に弱点8。カードの攻撃威力+9。毎ターンの手札+2（最低1枚）。",
    "icon": "eye",
    "effects": {
      "weakBonus": 15,
      "firstWeak": 8,
      "attack": 9,
      "draw": 2
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_15",
    "name": "灯海の航路図",
    "enName": "Chart of the Lantern Sea",
    "zhName": "灯海航图",
    "desc": "野営での灯油回復量+50。野営の休息による生存者のHP回復量+30。未知のマスの良い出来事の確率+50ポイント（上限95%）。取得時、在籍者全員の最大HP+35、生存者のHP+35。今後の加入者にも最大HP加算。",
    "icon": "map",
    "effects": {
      "campFuel": 50,
      "campHeal": 30,
      "mysteryLuck": 0.5,
      "maxHP": 35
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_16",
    "name": "慈悲の雨雲壺",
    "enName": "Merciful Raincloud Vessel",
    "zhName": "慈悲雨云壶",
    "desc": "カードの全体HP回復量+15。カードによるHP回復量+12。生存者への回復薬のHP回復量+35。毎ターン、生存者全員のHPを4回復。",
    "icon": "leaf",
    "effects": {
      "allHeal": 15,
      "heal": 12,
      "potionHeal": 35,
      "turnRegen": 4
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_17",
    "name": "天地の鍛冶印",
    "enName": "Heaven and Earth Forge Seal",
    "zhName": "天地锻印",
    "desc": "強化済みカードの消費気力-2（最低0）。カード強化時、生存者全員のHPを25回復。カードで得る盾+10。カードの攻撃威力+10。",
    "icon": "shield",
    "effects": {
      "upgradeCostOffset": -2,
      "upgradeHeal": 25,
      "block": 10,
      "attack": 10
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_18",
    "name": "凍れる星城",
    "enName": "Frozen Star Citadel",
    "zhName": "冰封星城",
    "desc": "盾を最大50、次ターンへ持ち越す。各戦闘の最初のターン、生存者全員に盾45。毎ターン、生存者全員に盾10。敵から受ける毒・脆弱の付与量-5（最低0）。",
    "icon": "shield",
    "effects": {
      "carryShield": 50,
      "firstShield": 45,
      "shieldTurn": 10,
      "debuffWard": 5
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_19",
    "name": "千翼の早鐘",
    "enName": "Early Bell of a Thousand Wings",
    "zhName": "千翼早钟",
    "desc": "毎ターン最初の策略カード使用時、4枚引く。消費気力1のカードの攻撃威力+12。毎ターンの気力+3（最低1）。三人連携時に得る気力+3。",
    "icon": "bell",
    "effects": {
      "firstSkillDraw": 4,
      "cheapAttack": 12,
      "energy": 3,
      "linkEnergy": 3
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_20",
    "name": "空白の神譜",
    "enName": "Divine Score of Silence",
    "zhName": "空白神谱",
    "desc": "消費気力0のカード使用時、生存中の敵1体にランダムで24ダメージ。毎ターンの手札+4（最低1枚）。各戦闘の最初のターン、手札+4。未使用の気力を最大4、次ターンへ持ち越す。",
    "icon": "book",
    "effects": {
      "zeroPing": 24,
      "draw": 4,
      "firstDraw": 4,
      "carryEnergy": 4
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_21",
    "name": "三界の守護枝",
    "enName": "Guardian Branch of Three Realms",
    "zhName": "三界守护枝",
    "desc": "三人連携時に得る盾+35。三人連携時、生存者全員のHPを20回復。敵から受ける毒・脆弱の付与量-6（最低0）。毎ターン、生存者全員に盾10。",
    "icon": "leaf",
    "effects": {
      "linkShield": 35,
      "linkHeal": 20,
      "debuffWard": 6,
      "shieldTurn": 10
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_22",
    "name": "熾天の火輪",
    "enName": "Wheel of the Seraph",
    "zhName": "炽天火轮",
    "desc": "カードの全体攻撃威力+16。カードの攻撃威力+60%。毎ターンの気力+2（最低1）。戦闘開始時、敵全員に弱点5。",
    "icon": "flame",
    "effects": {
      "aoe": 16,
      "attackMult": 0.6,
      "energy": 2,
      "firstWeak": 5
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_23",
    "name": "命織りの大繭",
    "enName": "Great Cocoon of Life",
    "zhName": "织命大茧",
    "desc": "各戦闘で一度、被ダメージで倒れる仲間1人をHP70で復帰（最大HPまで）。取得時、在籍者全員の最大HP+50、生存者のHP+50。今後の加入者にも最大HP加算。戦闘勝利時、生存者全員のHPを30回復。章クリア時、生存者のHP回復量+40。",
    "icon": "heart",
    "effects": {
      "revive": 70,
      "maxHP": 50,
      "winHeal": 30,
      "bossHeal": 40
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_24",
    "name": "無底の薬泉",
    "enName": "Bottomless Medicine Spring",
    "zhName": "无底药泉",
    "desc": "生存者への回復薬のHP回復量+50。取得時、回復薬+3（所持上限3個）。毎ターン、生存者全員のHPを6回復。カードによるHP回復量+12。",
    "icon": "flask",
    "effects": {
      "potionHeal": 50,
      "pickupPotion": 3,
      "turnRegen": 6,
      "heal": 12
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_25",
    "name": "零時の王笏",
    "enName": "Scepter of the Zero Hour",
    "zhName": "零时王杖",
    "desc": "気力0でターンを終えると、次ターンの気力+5。消費気力0のカード使用時、生存中の敵1体にランダムで18ダメージ。未使用の気力を最大5、次ターンへ持ち越す。毎ターン、生存者全員に盾12。",
    "icon": "star",
    "effects": {
      "emptyEnergy": 5,
      "zeroPing": 18,
      "carryEnergy": 5,
      "shieldTurn": 12
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_26",
    "name": "蒼穹の戦旗",
    "enName": "Battle Standard of the Firmament",
    "zhName": "苍穹战旗",
    "desc": "ターン中3枚目以降に使うカードの攻撃威力+18。カードの攻撃威力+10。三人連携時に得る気力+4。各戦闘の最初のターン、気力+4。",
    "icon": "sword",
    "effects": {
      "lateAttack": 18,
      "attack": 10,
      "linkEnergy": 4,
      "firstEnergy": 4
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_27",
    "name": "記憶星の万巻書",
    "enName": "Library of the Memory Star",
    "zhName": "记忆星万卷书",
    "desc": "毎ターンの手札+5（最低1枚）。毎ターン最初の策略カード使用時、3枚引く。毎ターン最初の毒付与・毒増幅カード使用時、3枚引く。各戦闘の3の倍数ターン、手札+5。",
    "icon": "book",
    "effects": {
      "draw": 5,
      "firstSkillDraw": 3,
      "poisonDraw": 3,
      "thirdDraw": 5
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_28",
    "name": "安息界の炉心",
    "enName": "Core of the Restful Realm",
    "zhName": "安息界炉心",
    "desc": "野営の休息による生存者のHP回復量+50。野営での灯油回復量+60。戦闘勝利時、生存者全員のHPを25回復。毎ターン、生存者全員に盾12。",
    "icon": "flame",
    "effects": {
      "campHeal": 50,
      "campFuel": 60,
      "winHeal": 25,
      "shieldTurn": 12
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_29",
    "name": "征服なき王印",
    "enName": "Seal of the Unconquering King",
    "zhName": "无征服王印",
    "desc": "強敵戦の基礎銀貨報酬+100。強敵勝利時、生存者全員のHPを追加で30回復。カードの攻撃威力+12。毎ターンの気力+3（最低1）。",
    "icon": "boss",
    "effects": {
      "eliteGold": 100,
      "eliteHeal": 30,
      "attack": 12,
      "energy": 3
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  },
  {
    "id": "abyss_relic_30",
    "name": "始まりの帰路灯",
    "enName": "Homeward Light of Beginnings",
    "zhName": "起始归途灯",
    "desc": "毎ターンの気力+4（最低1）。取得時、在籍者全員の最大HP+45、生存者のHP+45。今後の加入者にも最大HP加算。毎ターン、生存者全員のHPを5回復。毎ターンの手札+3（最低1枚）。",
    "icon": "sun",
    "effects": {
      "energy": 4,
      "maxHP": 45,
      "turnRegen": 5,
      "draw": 3
    },
    "drawback": "",
    "tier": "special",
    "flavor": "深淵を越えた隊商だけが、この灯の真名を知る。"
  }
].map(designRelic);
