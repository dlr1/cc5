import { Component, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';


import {LoginModalComponent } from './login-modal.component';
import ServiceHelper from './services/serviceHelper';
import { Device } from './form-components/models';

@Component({
    selector: 'my-devices',
    templateUrl: './my-devices.component.html'
})
export class MyDevicesComponent {

    mydevices: Array<Device>=[];
  
    getDeviceIcon(device: Device){
        return 'router.png';
    }

    setDevice(device: Device){

    }

    removeDevice(device: Device){

    }
    model: any;
    searching = false;
    searchFailed = false;
    hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  
    constructor(private serviceHelper: ServiceHelper) {
        // this.serviceHelper.getFilteredDevices('mcr1').subscribe(x=>
        //     console.log(x)
        // );
    }
  
    formatter = (device: Device) => device.device_name;

    search = (text$: Observable<string>) =>
      text$
        .debounceTime(300)        
        .switchMap(term => term.length < 3 ? []
          : this.serviceHelper.getFilteredDevices(term)
           );
        
}