import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Automaton } from '../models/automata.model';
import { State } from '../models/estado.model';
import { Transition } from '../models/transicion.model';

@Injectable({
  providedIn: 'root'
})
export class RegExpService {
  API_URL = 'API_URL';
  MOCKY_URL = 'http://www.mocky.io/v2/5e7304573000005e002e61b9';
  regExps: string[] = ['[00 + 11 + (01 + 10)(00 + 11)*(01 + 10)]*', '(1 + 01*0)*'];
  automatas: Automaton[] = []
  constructor(private http: HttpClient) {
    const symbols = ['0', '1'];
    const A: State = {
      name: "A",
      acceptance: true,
      initial: true
    }
    const B: State = {
      name: "B",
      acceptance: false,
      initial: false
    }
    const C: State = {
      name: "C",
      acceptance: false,
      initial: false
    }
    const D: State = {
      name: "D",
      acceptance: false,
      initial: false
    }
    const states1: State[] = [A, B, C, D];
    const transitions1: Transition[] = [
      {
        actualState: A,
        inputSymbol: "0",
        nextState: C
      },
      {
        actualState: A,
        inputSymbol: "1",
        nextState: B
      },
      {
        actualState: B,
        inputSymbol: "0",
        nextState: D
      },
      {
        actualState: B,
        inputSymbol: "1",
        nextState: A
      },
      {
        actualState: C,
        inputSymbol: "0",
        nextState: A
      },
      {
        actualState: C,
        inputSymbol: "1",
        nextState: D
      },
      {
        actualState: D,
        inputSymbol: "0",
        nextState: B
      },
      {
        actualState: D,
        inputSymbol: "1",
        nextState: C
      }
    ];
    const automata1 = new Automaton(symbols, states1, transitions1);

    const A2: State = {
      name: 'A',
      acceptance: true,
      initial: true
    };
    const B2: State = {
      name: 'B',
      acceptance: false,
      initial: false
    };

    const states2 = [A2, B2];
    const transitions2: Transition[] = [
      {
        actualState: A2,
        inputSymbol: "0",
        nextState: B2
      },
      {
        actualState: A2,
        inputSymbol: "1",
        nextState: A2
      },
      {
        actualState: B2,
        inputSymbol: "0",
        nextState: A2
      },
      {
        actualState: B2,
        inputSymbol: "1",
        nextState: B2
      }
    ];
    const automata2 = new Automaton(symbols, states2, transitions2);
    this.automatas = [automata1, automata2];
  }
  convertRegExpToAutomaton(RegExp: string): Observable<Automaton> {
    // return this.http.post(`${this.API_URL}/endpoint`, { RegExp })
    return this.http.get(this.MOCKY_URL)
      .pipe(map(response => {
        const inputSymbols: string[] = response['inputSymbols'];
        const states: State[] = response['states']
          .map(state => {
            return {
              name: state['name'],
              acceptance: state['acceptance'],
              initial: state['initial']
            };
          });
        const transitions: Transition[] = response['transitions']
          .map(transition => {
            const actualState = states
              .find(state => state.name === transition['actualState']);
            const nextState = states
              .find(state => state.name === transition['nextState']);
            return {
              actualState: actualState,
              inputSymbol: transition['inputSymbol'],
              nextState: nextState
            };
          });
        const automaton = new Automaton(inputSymbols, states, transitions);
        this.regExps.push(RegExp);
        this.automatas.push(automaton);
        return automaton;
      }));
  }
}
