import { Component, OnInit, Input, OnChanges, SimpleChange, ViewChild, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Variable, Command } from './form-components/models';
import { controlMappings } from './form-components/controlMappings';
import { HostDirective } from './form-components/host.directive';
import { FormTextComponent } from './form-components/formText.component';
import { BaseComponent } from './form-components/base.component';
import { FormDropdownComponent } from './form-components/formDropdown.component';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';


@Component({
  selector: 'login-modal-component',
  template: `
  <div class="modal-header">
    <h4 class="modal-title">{{command.name}}</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <ng-template component-host></ng-template>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary" [disabled]='!isValid' (click)="save()">Save</button>
    <button type="button" class="btn" (click)="activeModal.close('Close click')">Close</button>
  </div>
`
})
export class LoginModalComponent {
 
  constructor(public activeModal: NgbActiveModal ) { }

}
