/** Snapshot-only Canvas drawing; cell size follows intrinsic canvas dimensions. */
import {cells} from '../core/geometry';import type {Game,Piece} from '../core/types';
export const COLORS:Record<Piece,string>={I:'#63d9df',O:'#f1ce67',T:'#bd9bf4',S:'#8cc994',Z:'#ec8b85',J:'#7fa9ee',L:'#e9ae75'};
/** Allocate drawing resources once and paint each complete state without mutations. */
export function canvasView(canvas:HTMLCanvasElement):(s:Game)=>void{
 const ctx=canvas.getContext('2d');if(!ctx)throw Error('Canvas 2D unavailable');
 return s=>{const w=canvas.width/10,h=canvas.height/20;ctx.fillStyle='#09191d';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.strokeStyle='#173136';ctx.lineWidth=1;
 const block=(x:number,y:number,kind:Piece)=>{ctx.fillStyle=COLORS[kind];ctx.fillRect(x*w+1,y*h+1,w-2,h-2);};
 for(let y=0;y<20;y++)for(let x=0;x<10;x++){ctx.strokeRect(x*w+0.5,y*h+0.5,w,h);const kind=s.board[y][x];if(kind)block(x,y,kind);}
 if(s.active)for(const [x,y] of cells(s.active))block(x,y,s.active.kind);
 };
}
