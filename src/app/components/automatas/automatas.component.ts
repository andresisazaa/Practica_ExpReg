import { Component, OnInit } from '@angular/core';
import { RegExpService } from 'src/app/services/reg-exp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-automatas',
  templateUrl: './automatas.component.html'
})
export class AutomatasComponent implements OnInit {
  regExps: string[] = [];

  constructor(private RegExpService: RegExpService, private router: Router) { }

  ngOnInit(): void {
    this.regExps = this.RegExpService.regExps;
  }

  selectRegExp(index: number): void {
    this.router.navigate(['/automata', index]);
  }
}
