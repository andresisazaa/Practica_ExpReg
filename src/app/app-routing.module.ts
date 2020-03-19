import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutomatasComponent } from './components/automatas/automatas.component';
import { FormComponent } from './components/form/form.component';
import { AutomataComponent } from './components/automata/automata.component';

const routes: Routes = [
  { path: 'ingresar-expresion', component: FormComponent },
  { path: 'expresiones', component: AutomatasComponent },
  { path: 'automata/:index', component: AutomataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
