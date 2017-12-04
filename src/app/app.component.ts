import { Component } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import ServiceHelper from './services/serviceHelper';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private serviceHelper: ServiceHelper) {
    //serviceHelper.login({ "username": "nettest1", "password": "!N34RoxE", "device_name": "MCR1-LAB", "context": "" }).subscribe(x=>console.log(x));
    
  }

  ngOnInit(){
   
  }

 
}
