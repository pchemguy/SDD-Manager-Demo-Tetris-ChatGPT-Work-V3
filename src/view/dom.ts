/** Semantic HTML presentation; gameplay event ownership stays in the input adapter. */
import type {Game} from '../core/types';
/** Update minimal lifecycle presentation for the first playable milestone. */
export function domView(root:Document):(s:Game)=>void{return s=>{root.getElementById('status')!.textContent=s.status==='gameover'?'Game over':s.status[0].toUpperCase()+s.status.slice(1);(root.getElementById('start') as HTMLButtonElement).disabled=s.status!=='ready';(root.getElementById('restart') as HTMLButtonElement).disabled=s.status==='ready';};}
