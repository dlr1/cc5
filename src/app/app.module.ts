import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import {FormComponentsModule} from './form-components/form-components.module';
import { CommandComponent } from './command.component';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CommandComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormComponentsModule,
    HttpClientModule
  ],
  entryComponents:[CommandComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
