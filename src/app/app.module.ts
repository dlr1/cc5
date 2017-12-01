import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import {FormComponentsModule} from './form-components/form-components.module';
import { CommandComponent } from './command.component';

import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CommandsComponent } from './commands.component';

@NgModule({
  declarations: [
    AppComponent,
    CommandComponent,
    CommandsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormComponentsModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents:[CommandComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
