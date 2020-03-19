import { State } from './estado.model';
import { Transition } from './transicion.model';

export class Automaton {
    inputSymbols: string[];
    states: State[];
    transitions: Transition[];

    constructor(inputSymbols: string[], states: State[], transitions: Transition[]) {
        this.inputSymbols = inputSymbols;
        this.states = states;
        this.transitions = transitions;
    }

    getInitialState(): State {
        return this.states.find(state => state.initial);
    }

    recognizeSequence(sequence: string): boolean {
        let actualState = this.getInitialState();
        if (sequence === '@') return actualState.acceptance;
        for (let i = 0; i < sequence.length; i++) {
            const symbol = sequence.charAt(i);
            actualState = this.doTransition(actualState, symbol);
        }
        return actualState.acceptance;
    }

    doTransition(actualState: State, symbol: string): State {
        const transition = this.transitions.find(t => {
            return (actualState.name === t.actualState.name) && (symbol === t.inputSymbol);
        });
        return transition.nextState;
    }
}