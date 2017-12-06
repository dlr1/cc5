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

import { CookieService } from 'ngx-cookie';

@Component({
    selector: 'my-devices',
    templateUrl: './my-devices.component.html'
})
export class MyDevicesComponent {

    mydevices: Array<Device>=[];
    @Output() onVoted = new EventEmitter<Device>();

    getDeviceIcon(device: Device){
        return 'assets/router.png';
    }

    deviceSelected(device: Device){
        if (this.mydevices.length > 0 && this.mydevices.filter(x=>x.device_name == device.device_name).length > 0)
            return;        
        this.mydevices.push(device);
    }
    setDevice(device: Device){
        this.onVoted.next(device);
    }

    removeDevice(device: Device){
        this.mydevices.splice(this.mydevices.indexOf(device), 1);
        this.cookie.remove(device.device_name);
        let cookies = this.cookie.get("devices");
        this.cookie.put("devices", cookies.replace(device.device_name,'').replace(',,',','));
    }

    toggleConnection(device: Device){
        if (device.isLoggedOn){

        }
        else{
            let modalRef = this.modalService.open(LoginModalComponent,{size:"sm"});
            modalRef.componentInstance.device = device;
            modalRef.result.then((result) => {
                this.serviceHelper.login({ "username": "nettest1", "password": "!N34RoxE", "device_name": "MCR1-LAB", "context": "" })
                //this.serviceHelper.login({ "username": "su", "password": "wwp", "device_name": "ELS1-LAB", "context": "" })
                .subscribe(data=>{
                    device.session_key = data.session_key;
                    device.isLoggedOn = true;
                    let cookies = this.cookie.get("devices");                   
                    if (cookies.indexOf(device.device_name) < 0)
                        this.cookie.put("devices", cookies + ',' + device.device_name);

                    this.cookie.put(device.device_name, JSON.stringify({ 
                            sessionKey: device.session_key, 
                            context: device.connection ? device.context : result.context }));
                    
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
  
   
  constructor(private serviceHelper: ServiceHelper, private modalService: NgbModal, private cookie:CookieService) {
    
    let cookies = cookie.get("devices");
    if (cookies == undefined){
        cookies = "";
        this.cookie.put("devices", cookies);
    }
    else{
        this.serviceHelper.getDevicesByNames(cookies).subscribe
        (data=>{
            this.mydevices = <Array<Device>>data;
            this.checkConnections();
        });
    }
    
  }
  
  checkConnections(){
    this.mydevices.forEach(
        x=>{
            let deviceCookie = this.cookie.get(x.device_name);
            if (!deviceCookie)
                return;
            let sessionKey = JSON.parse(deviceCookie)["sessionKey"];
            this.serviceHelper.isConnected({session_key:sessionKey}).subscribe(result=>{
                if(result["connected"] == "true"){
                    x.isLoggedOn = true;
                    x.connection = result;                            
                }
            })
        }
    )
  }
    formatter = (device: Device) => device.device_name;

    search = (text$: Observable<string>) =>
      text$
        .debounceTime(300)        
        .switchMap(term => term.length < 3 ? []
          : this.serviceHelper.getFilteredDevices(term)
           );
        
}