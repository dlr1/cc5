import { Component, OnInit, Input, OnChanges, SimpleChange, ViewChild, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Variable, Command, Device } from './models';
import { controlMappings } from './form-components/controlMappings';
import { HostDirective } from './form-components/host.directive';
import { FormTextComponent } from './form-components/formText.component';
import { BaseComponent } from './form-components/base.component';
import { FormDropdownComponent } from './form-components/formDropdown.component';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';

import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'login-modal-component',
  template: `
  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
  <div class="modal-header">
  <h4 class="modal-title">Login</h4>
  <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('cancel')">
      <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
  
      <div class="form-group">
          <label>Username</label>
          <br />
          <input type="text" formControlName="username"  autofocus class="form-control" id="exampleInputEmail1" [(ngModel)]="username" />
      </div>
      <div class="form-group">
          <label>Password</label>
          <br />
          <input type="password" formControlName="password" class="form-control" id="exampleInputPassword1" [(ngModel)]="password" />
      </div>


      <div class="form-group" style="margin-bottom: inherit">
          <div class="form-group">
              <label>Context</label>
              <br />
              <input type="text" formControlName="context" class="form-control" id="deviceContext" [(ngModel)]="deviceContext" placeholder="Enter a Context (Not Required)"
              />
          </div>
      </div>      
  
</div>
<div class="modal-footer">
  <button type="submit" class="btn btn-primary" >Login</button>
  <button type="button" class="btn" (click)="activeModal.close('Close click')">Cancel</button>
</div>
</form>
`
})
export class LoginModalComponent {
 
loginForm: FormGroup;
 @Input() device: Device;
  constructor(public activeModal: NgbActiveModal ) { 
    this.loginForm = new FormGroup ({
      username: new FormControl(),
      password:new FormControl(),
      context:new FormControl()
    });
  }

  onSubmit(){
    this.activeModal.close(this.loginForm.value);
  }
}
