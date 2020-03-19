import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { AutomataComponent } from './components/automata/automata.component';
import { AutomatasComponent } from './components/automatas/automatas.component';
import { AutomataItemComponent } from './components/automata-item/automata-item.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    AutomataComponent,
    AutomatasComponent,
    AutomataItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
