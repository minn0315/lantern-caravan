import {illustratedCard} from './card-art-scenes.js?v=51';
import {NEW_ATLASES} from './traveler-art.js?v=51';
import {EXPANSION_ATLASES} from './atlas-expansion.js?v=51';
import {COMPANIONS,ENEMIES,BOSSES} from './catalog.js?v=51';
const paths={chest:'M3 11V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v4M3 11h18v10H3V11Zm7-2h4v6h-4V9M6 3v8m12-8v8',anvil:'M3 8h18l-5 5h-5v3l5 3v2H5v-2l3-3v-3L3 11V8Zm4-5h10v5H7V3',flame:'M12 3c2 5-3 5-1 9 1-2 3-3 4-5 4 5 6 8 3 12-3 4-10 3-12-1-2-4 0-8 3-11-1 4 1 5 2 6 2-3 3-6 1-10Z',sun:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2',shield:'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6L12 3Z M9 12l2 2 4-4',sword:'m5 20 3-3m-4-4 7 7m-3-7L18 3l3 0 0 3L11 16',bow:'M5 3c16 2 16 16 0 18L11 12 5 3Zm0 9h16m-4-4 4 4-4 4',flask:'M9 3h6m-5 0v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 14h8',leaf:'M20 3C8 2 2 8 5 15s16 6 15-12ZM4 21 16 9',moon:'M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z',star:'m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z',eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm10-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6',bell:'M5 17h14l-2-4V9a5 5 0 0 0-10 0v4l-2 4Zm5 3h4',coin:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5v8m-3-6 3-2 3 2m-6 4 3 2 3-2',map:'m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16',book:'M12 5v16M3 4c4-1 6-1 9 1 3-2 5-2 9-1v15c-4-1-6-1-9 1-3-2-5-2-9-1V4Z',bag:'M6 7h12l3 14H3L6 7Zm3 0V5a3 3 0 0 1 6 0v2',settings:'M9 3h6l1 4 4 1 1 6-4 2-1 4h-6l-1-4-4-2 1-6 4-1 1-4ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',save:'M4 3h13l4 4v14H3V3Zm3 0v7h10V3M7 21v-7h10v7',check:'m5 12 4 4L19 6',arrow:'M4 12h16m-6-6 6 6-6 6',camp:'m3 20 9-17 9 17H3Zm9-17v17m-4 0 4-7 4 7',event:'M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 4m0 3v1M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20',elite:'m12 2 8 5-2 11-6 4-6-4L4 7l8-5ZM8 9l3 4m5-4-3 4m-4 4h6',boss:'M3 6 7 9l5-6 5 6 4-3-2 13H5L3 6Zm5 9h8',shop:'M3 10h18L19 3H5l-2 7Zm2 0v11h14V10m-9 11v-6h4v6',close:'m6 6 12 12M6 18 18 6',volume:'m3 9 5 0 5-5v16l-5-5H3V9Zm13-2c4 3 4 7 0 10m3-13c6 4 6 12 0 16',download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',heart:'M12 21S2 15 2 8a5 5 0 0 1 10-1A5 5 0 0 1 22 8c0 7-10 13-10 13Z'};
export function icon(name,size=20){return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${(paths[name]||paths.star).split(' M').map((p,i)=>`<path d="${i?'M':''}${p}"/>`).join('')}</svg>`}
Object.assign(NEW_ATLASES,{'abyss-enemies':{width:1086,height:1448,cols:3,rows:4},'abyss-bosses':{width:1254,height:1254,cols:3,rows:3}});
const ATLAS='assets/characters.webp';
function atlasSprite(file,cell,cols,rows,width,height,cls=''){
 const w=width/cols,h=height/rows,x=(cell%cols)*w,y=Math.floor(cell/cols)*h;
 return `<svg class="ink-sprite ${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMax meet" style="overflow:hidden" aria-hidden="true"><svg x="0" y="0" width="${w}" height="${h}" viewBox="${x} ${y} ${w} ${h}" preserveAspectRatio="none" overflow="hidden"><image href="assets/${file}.webp" width="${width}" height="${height}"/></svg></svg>`;
}
const travelerByArt=new Map(COMPANIONS.map(c=>[c.art,c.id]));
function travelerImage(i,face=false){
 const traveler=travelerByArt.get(Number(i))||'eda',id=traveler==='mio'?'mio-cutout':traveler;
 return `<img class="${face?'ink-portrait traveler-portrait':'ink-sprite character-art individual-unit'}${traveler==='aurora'?' traveler-aurora':''}" src="assets/travelers/${id}${face?'-portrait':''}.png${traveler==='aurora'?'?v=51':''}" alt="" draggable="false" decoding="async">`;
}
export function characterArt(i){return travelerImage(i)}
export function enemyArt(kind){
 const boss=BOSSES.find(e=>e.id===kind),normal=ENEMIES.find(e=>e.id===kind),id=(boss||normal)?.artId||(boss||normal)?.id;
 return id?`<img class="ink-sprite monster-art ${boss?'boss-art ':''}${kind==='demon_king'?'demon-king-art ':''}individual-unit" src="assets/monsters/${id}.png" alt="" draggable="false" decoding="async">`:characterArt(4);
}
export function portrait(i){return travelerImage(i,true)}
export function scene(chapter=0,special=false){if(chapter===17)return `<img class="world-art demon-world" src="assets/demon-hell.webp" alt="" draggable="false">`;if(special)return `<img class="world-art abyss-world" src="assets/abyss-world.webp" alt="" draggable="false">`;chapter=((chapter%16)+16)%16;if(chapter>=4){let file='world-extra-'+Math.floor((chapter-4)/6),m=EXPANSION_ATLASES[file];return atlasSprite(file,(chapter-4)%6,m.cols,m.rows,m.width,m.height,'world-art chapter-art-'+chapter).replace('xMidYMax meet','xMidYMid slice')}return atlasSprite('chapters',chapter,2,2,1672,941,`world-art chapter-art-${chapter}`).replace('xMidYMax meet','xMidYMid slice')}
export function atmosphere(){return ''}
export function cardIllustration(name,actor,id=name){return illustratedCard(id,name)}
