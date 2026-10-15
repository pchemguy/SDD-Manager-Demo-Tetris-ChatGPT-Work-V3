/** Narrow session collaborators; browser adapters depend on these contracts. */
import type {Game,Move} from '../core/types';
export type Command=Move|'start'|'restart';
export type View=(state:Game)=>void;
