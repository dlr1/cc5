import { Component } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import ServiceHelper from './services/serviceHelper';
import { Device } from './form-components/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedDevice: Device;
  constructor(private serviceHelper: ServiceHelper) {
   
  }

  deviceSelected(device){
    this.selectedDevice = device;
  }
  ngOnInit(){
   
  }

 
}
