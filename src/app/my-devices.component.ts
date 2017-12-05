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
        return 'assets/router.png';
    }

    deviceSelected(device: Device){
        if (this.mydevices.length > 0 && this.mydevices.filter(x=>x.device_name == device.device_name))
            return;        
        this.mydevices.push(device);
    }
    setDevice(device: Device){

    }

    removeDevice(device: Device){

    }

    toggleConnection(device: Device){
        if (device.isLoggedOn){

        }
        else{
            let modalRef = this.modalService.open(LoginModalComponent,{size:"sm"});
            modalRef.componentInstance.device = device;
            modalRef.result.then((result) => {
                this.serviceHelper.login({ "username": "nettest1", "password": "!N34RoxE", "device_name": "MCR1-LAB", "context": "" })
                .subscribe(data=>{
                    device.connection = data;
                    device.isLoggedOn = true;
                });
              }, (reason) => {
                console.log(`Dismissed `);
              });
            
            
            
        }
    }

    model: any;
    searching = false;
    searchFailed = false;
    hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  
   
  constructor(private serviceHelper: ServiceHelper, private modalService: NgbModal) {
    
    
  }
  
    formatter = (device: Device) => device.device_name;

    search = (text$: Observable<string>) =>
      text$
        .debounceTime(300)        
        .switchMap(term => term.length < 3 ? []
          : this.serviceHelper.getFilteredDevices(term)
           );
        
}