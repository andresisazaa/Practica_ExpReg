import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-automata-item',
  templateUrl: './automata-item.component.html'
})
export class AutomataItemComponent implements OnInit {
   @Input() regExp: string;
  constructor() { }

  ngOnInit(): void {
  }

}
