import { Component, OnInit, Input, OnChanges, SimpleChange, ViewChild, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Variable, Command, controlMappings } from './form-components/models';
import { HostDirective } from './form-components/host.directive';
import { FormTextComponent } from './form-components/formText.component';
import { BaseComponent } from './form-components/base.component';
import { FormDropdownComponent } from './form-components/formDropdown.component';



@Component({
  selector: 'command-modal-component',
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
export class CommandModalComponent implements OnInit, OnChanges {
  _command: Command;


  @Input()
  set command(val: Command) {
    this._command = val;

    this.cdref.detach();
    let viewContainerRef = this.componentHost.viewContainerRef;
    this.ctrls = [];
    this._command.variables.forEach(element => {
      
      let componentFactory;
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(controlMappings[element.type]);

      let componentRef = viewContainerRef.createComponent(componentFactory);
      let inst = (<BaseComponent>componentRef.instance);
      inst.data = element;
      inst.valueChanged.subscribe(data => { this.raiseDependantEvents(data); this.checkValid() });
      this.ctrls.push(inst);

    });
    this.cdref.detectChanges();
  }


  get command(): Command { return this._command; }


  @ViewChild(HostDirective) componentHost: HostDirective;

  ctrls: Array<BaseComponent>;

  isValid: boolean = false;

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

  }

  constructor(public activeModal: NgbActiveModal, private componentFactoryResolver: ComponentFactoryResolver,
    private cdref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  checkValid() {
    let controlsNotValid = this.ctrls.filter(x => !x.isValid);
    this.isValid = controlsNotValid.length == 0;
    this.cdref.detectChanges();
  }

  raiseDependantEvents(data: Variable) {
    console.log("raise events");
    this.checkValid();
  }

  save() {

  }

}
