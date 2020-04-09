import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Automaton } from '../models/automata.model';
import { State } from '../models/estado.model';
import { Transition } from '../models/transicion.model';

@Injectable({
  providedIn: 'root'
})
export class RegExpService {
  API_URL = 'https://endpoint-rex2fsm.herokuapp.com';
  MOCKY_URL = 'http://www.mocky.io/v2/5e7304573000005e002e61b9';
  regExps: string[] = [];
  automatas: Automaton[] = [];
  constructor(private http: HttpClient) {}
  convertRegExpToAutomaton(regExp: string): Observable<Automaton> {
    return this.http.post(`${this.API_URL}/rex`, { inputRex: regExp })
      // return this.http.get(this.MOCKY_URL)
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
        let transitions: Transition[] = response['transitions']
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
        const hasErrorState = states.find(state => state.name === 'Error');
        const errorTransitions: Transition[] = [];
        if (hasErrorState) {    
          for (let i = 0; i < inputSymbols.length; i++) {
            const symbol = inputSymbols[i];
            const errorState: State = {
              name: 'Error',
              acceptance: false,
              initial: false
            };
            const transicionError: Transition = {
              actualState: errorState,
              inputSymbol: symbol,
              nextState: errorState
            };
            errorTransitions.push(transicionError);
          }
          transitions = [...transitions, ...errorTransitions];
        }
        const automaton = new Automaton(inputSymbols, states, transitions);
        this.regExps.push(regExp);
        this.automatas.push(automaton);
        return automaton;
      }));
  }
}
