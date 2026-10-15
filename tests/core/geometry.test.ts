/** Independent SPEC coordinate and rotation examples. */
import {test,expect} from 'vitest';import {cells} from '../../src/core/geometry';import {PIECES, type Cell} from '../../src/core/types';
const expected:Cell[][]=[[[0,1],[1,1],[2,1],[3,1]],[[0,0],[1,0],[0,1],[1,1]],[[1,0],[0,1],[1,1],[2,1]],[[1,0],[2,0],[0,1],[1,1]],[[0,0],[1,0],[1,1],[2,1]],[[0,0],[0,1],[1,1],[2,1]],[[2,0],[0,1],[1,1],[2,1]]];
PIECES.forEach((kind,i)=>test(kind+' initial geometry and rotation cycle',()=>{expect(cells({kind,x:0,y:0,rotation:0})).toEqual(expected[i]);expect(cells({kind,x:0,y:0,rotation:4})).toEqual(expected[i]);expect(cells({kind,x:0,y:0,rotation:-4})).toEqual(expected[i]);}));
test('clockwise I rotates about fixed 4-square and offsets coordinates',()=>{expect(cells({kind:'I',x:2,y:3,rotation:1})).toEqual([[4,3],[4,4],[4,5],[4,6]]);expect(cells({kind:'O',x:0,y:0,rotation:1})).toEqual(expected[1]);expect(cells({kind:'T',x:0,y:0,rotation:-1})).toEqual([[0,1],[1,2],[1,1],[1,0]]);});
