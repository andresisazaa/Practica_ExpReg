import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegExpService } from 'src/app/services/reg-exp.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  RegExpForm: FormGroup;
  constructor(private regExpService: RegExpService, private router: Router) { }
  errorMessage: string;
  badPattern = '|*';
  ngOnInit(): void {
    this.RegExpForm = new FormGroup({
      RegExp: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    const regExp: string = this.RegExpForm.value['RegExp'];
    if (this.RegExpForm.invalid || regExp.includes(this.badPattern)) {
      if (this.RegExpForm.invalid) {
        this.errorMessage = 'Ingrese una expresión!';
      } else if (regExp.includes(this.badPattern)) {
        this.errorMessage = `¡Subsecuencia ${this.badPattern} no permitida!`;
      }
      return;
    }
    this.regExpService.convertRegExpToAutomaton(regExp)
      .subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: '¡Expresión regular transformada en autómata correctamente!',
          onClose: () => { this.router.navigate(['expresiones']); }
        });
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${error.message}`
        });
      });
  }
}
