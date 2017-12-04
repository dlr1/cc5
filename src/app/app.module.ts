import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import {FormComponentsModule} from './form-components/form-components.module';

import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CommandsComponent } from './commands.component';
import { CommandModalComponent } from './command-modal.component';
import ServiceHelper from './services/serviceHelper';
import { LoginModalComponent } from './login-modal.component';
import { MyDevicesComponent } from './my-devices.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    CommandModalComponent,
    CommandsComponent,
    LoginModalComponent, MyDevicesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormComponentsModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents:[CommandModalComponent],
  providers: [ServiceHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
