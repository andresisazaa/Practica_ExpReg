import { State } from './estado.model';

export interface Transition {
    actualState: State;
    inputSymbol: string;
    nextState: State;
}