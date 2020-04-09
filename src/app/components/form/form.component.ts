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

  ngOnInit(): void {
    this.RegExpForm = new FormGroup({
      RegExp: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.RegExpForm.invalid) return;
    const regExp = this.RegExpForm.value['RegExp'];
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
