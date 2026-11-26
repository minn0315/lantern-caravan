export function viewportSize(host=globalThis){const view=host.visualViewport||host.window?.visualViewport;return{width:Math.round(view?.width||host.innerWidth||host.window?.innerWidth||1200),height:Math.round(view?.height||host.innerHeight||host.window?.innerHeight||900)}}
export function compactViewport(host=globalThis){const {width,height}=viewportSize(host);return width<=700||width<=1100&&height<=500}
export function syncViewport(doc=globalThis.document,host=globalThis){const {height}=viewportSize(host);doc?.documentElement?.style?.setProperty('--game-height',height+'px')}
