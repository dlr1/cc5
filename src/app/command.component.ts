import { Component, OnInit, Input, OnChanges, SimpleChange, ViewChild, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {Variable} from './form-components/models';
import { HostDirective } from './form-components/host.directive';
import { FormTextComponent } from './form-components/formText.component';



@Component({
  selector: 'command-component',
  template: `
  <div class="modal-header">
    <h4 class="modal-title">Hi there!</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <ng-template component-host></ng-template>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
  </div>
`
})
export class CommandComponent implements OnInit, OnChanges {
  @Input() variables: Array<Variable>;
  @ViewChild(HostDirective) componentHost: HostDirective;

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } 
    }
    
  }
  
  constructor(public activeModal: NgbActiveModal, private componentFactoryResolver: ComponentFactoryResolver, private cdref:ChangeDetectorRef) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdref.detach();
    let viewContainerRef = this.componentHost.viewContainerRef;
    this.variables.forEach(element => {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormTextComponent);      
          let componentRef = viewContainerRef.createComponent(componentFactory);
          (<FormTextComponent>componentRef.instance).data = element;
    });
    this.cdref.detectChanges();
  }
}
