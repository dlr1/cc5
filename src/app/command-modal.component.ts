import { Component, OnInit, Input, OnChanges, SimpleChange, ViewChild, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import fields from './services/fields';

import { Variable, Command } from './models';
import { controlMappings } from './form-components/controlMappings';
import { HostDirective } from './form-components/host.directive';
import { FormTextComponent } from './form-components/formText.component';
import { BaseComponent } from './form-components/base.component';
import { FormDropdownComponent } from './form-components/formDropdown.component';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';


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

  ctrls: Array<BaseComponent> = [];
  
  constructor(public activeModal: NgbActiveModal, private componentFactoryResolver: ComponentFactoryResolver,
    private cdref: ChangeDetectorRef) { }

  @Input()
  set command(val: Command) {
    this._command = val;

    this.cdref.detach();
    let viewContainerRef = this.componentHost.viewContainerRef;
    this.ctrls = [];
    this._command.variables.forEach((element, index) => {
      if (element.field)
      this._command.variables[index] = fields[element.field];
    });

    this._command.variables.forEach(element => {
      this.createComponent(viewContainerRef, element);      
    });

    if (this.command.intrusiveness == "Y")
    {
      let componentFactory;
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(controlMappings["form-intrusive"]);
  
      let componentRef = viewContainerRef.createComponent(componentFactory);
      let inst = (<BaseComponent>componentRef.instance);
      
      inst.valueChanged.subscribe(data => { this.raiseDependantEvents(data); this.checkValid() });
      this.ctrls.push(inst);
    }   

    this.cdref.detectChanges();
  }


  get command(): Command { return this._command; }

  createComponent(viewContainerRef: ViewContainerRef, element: Variable){
    let componentFactory;
    componentFactory = this.componentFactoryResolver.resolveComponentFactory(controlMappings[element.type]);

    let componentRef = viewContainerRef.createComponent(componentFactory);
    let inst = (<BaseComponent>componentRef.instance);
    inst.data = element;
    inst.valueChanged.subscribe(data => { this.raiseDependantEvents(data); this.checkValid() });
    this.ctrls.push(inst);
  }

  @ViewChild(HostDirective) componentHost: HostDirective;

  

  isValid: boolean = false;

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

  }

  

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
    let variables: Array<Variable> = [];
    this.ctrls.forEach(x=>{
      variables.push(x.data);
    })

    this.command.variables = variables;
    this.activeModal.close(this.command);
    
  }

}
