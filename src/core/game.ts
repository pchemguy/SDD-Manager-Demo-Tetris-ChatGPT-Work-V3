/** Canonical lifecycle and explicitly supplied random piece succession (SPEC B2). */
import {emptyBoard,legal} from './board';import {cells,size} from './geometry';import {PIECES,type Piece,type Game,type Draw,type Active} from './types';
/** Allocate the ready snapshot; no random collaborator is consulted. */
export function ready():Game{return {board:emptyBoard(),active:null,next:null,status:'ready',score:0,lines:0,level:1,fallMs:0};}
/** Map one finite uniform draw to a piece. Invalid sources fail explicitly. */
function choose(draw:Draw):Piece{const u=draw();if(!Number.isFinite(u)||u<0||u>=1)throw Error('Invalid random draw');return PIECES[Math.floor(u*7)];}
function spawn(kind:Piece):Active{return {kind,x:Math.floor((10-size(kind))/2),y:0,rotation:0};}
/** Start/restart with fresh state and exactly two draws. */
export function start(draw:Draw):Game{const active=spawn(choose(draw)),next=choose(draw);return {...ready(),active,next,status:'running'};}
/** Promote stored preview, replenish once, and detect blocked spawn without settlement. */
export function promote(s:Game,draw:Draw):Game{if(!s.next)throw Error('Missing preview');const active=spawn(s.next),next=choose(draw);const ok=legal(s.board,cells(active));return {...s,active:ok?active:null,next,status:ok?'running':'gameover',fallMs:0};}
