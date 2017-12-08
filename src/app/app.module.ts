import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';


import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';

import {FormComponentsModule} from './form-components/form-components.module';
import { AppComponent } from './app.component';

import { CommandsComponent } from './commands.component';
import { CommandModalComponent } from './command-modal.component';
import ServiceHelper from './services/serviceHelper';
import {MCRParsers, ELNParsers} from './parsers';
import { LoginModalComponent } from './login-modal.component';
import { MyDevicesComponent } from './my-devices.component';

import { OrderByPipe } from './orderByPipe';

import DeviceService from './services/device.service';
import { DashboardComponent } from './dashboard.component';
import { CCHomeComponent } from './ccHome.component';

enableProdMode();

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },  
  { path: '**', component: CCHomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CommandModalComponent,
    CommandsComponent,
    LoginModalComponent, 
    MyDevicesComponent, 
    DashboardComponent,
    CCHomeComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents:[CommandModalComponent, LoginModalComponent],
  providers: [ServiceHelper, ELNParsers, MCRParsers, DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
