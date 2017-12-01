import { Component } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CommandComponent} from './command.component';

import {Variable} from './form-components/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  variables: Array<Variable> = [{
    "type": "form-text",
    "name": "VRF",
    "label": "VRF",
    "regex": "string_no_spaces",
    "required": true,
    "placeholder": "VRF",
    "value":""
  },
  {
    "type": "form-text",
    "name": "NetworkIP",
    "label": "Network IP",
    "regex": "ip_v4",
    "required": true,
    "placeholder": "ex. 255.255.255.255",
    "value":""
  },
  {
    "type": "form-text",
    "name": "NetworkIPCIDR",
    "label": "Network IP CIDR",
    "regex": "any_value",
    "required": false,
    "placeholder": "CIDR",
    "value":""
  },
  {
    "type": "form-text",
    "name": "NextHopIP",
    "label": "Next Hop IP",
    "regex": "ip_v4",
    "required": true,
    "placeholder": "ex. 255.255.255.255",
    "value":""
  }]
  constructor(private modalService: NgbModal) {

  }

  openDialog(){
    const modalRef = this.modalService.open(CommandComponent);
    modalRef.componentInstance.variables = this.variables;
  }
}
