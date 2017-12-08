import { Component } from '@angular/core';

import { Device } from './models';


@Component({  
  templateUrl: './ccHome.component.html'
})
export class CCHomeComponent {
  selectedDevice: Device;
  constructor() {}

  deviceSelected(device){
    this.selectedDevice = device;
  }
 
}
