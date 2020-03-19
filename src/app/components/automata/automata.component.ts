import { Component, OnInit } from '@angular/core';
import { Automaton } from 'src/app/models/automata.model';
import { Transition } from 'src/app/models/transicion.model';
import { ActivatedRoute } from '@angular/router';
import { RegExpService } from 'src/app/services/reg-exp.service';

@Component({
  selector: 'app-automata',
  templateUrl: './automata.component.html'
})
export class AutomataComponent implements OnInit {
  regExp: string;
  automaton: Automaton;
  recognizedSequence: boolean;
  validSequence: boolean;
  sequenceMessage: string = 'Aquí verá la respuesta del Autómata';
  nullSequenceSymbol = '@';
  endSequenceSymbol = '/';
  constructor(private activatedRoute: ActivatedRoute, private regExpService: RegExpService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const index = Number(params['index']);
      this.regExp = this.regExpService.regExps[index];
      this.automaton = this.regExpService.automatas[index];
    });
  }

  recognizeSequence(sequence: string): void {
    this.validSequence = this.isValid(sequence);
    if (this.validSequence) {
      this.recognizedSequence = this.automaton.recognizeSequence(sequence);
      this.sequenceMessage = this.recognizedSequence ? 'Secuencia reconocida' : 'Secuencia no reconocida';
    } else {
      this.sequenceMessage = 'Secuencia no válida';
    }
  }

  showNextState(actualState: string, symbol: string): string {
    const transition: Transition = this.automaton.transitions
      .find(t => t.actualState.name === actualState && t.inputSymbol === symbol);
    return transition.nextState.name;
  }

  isValid(sequence: string): boolean {
    let pattern = new RegExp(`^([${this.automaton.inputSymbols.join('')}]+\/?|${this.nullSequenceSymbol})$`);
    return pattern.test(sequence);
  }
}
