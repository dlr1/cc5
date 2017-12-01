import { Component, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Variable } from './models';
import { BaseComponent } from './base.component';


@Component({
    selector: 'form-dropdown',    
    templateUrl: './formDropdown.component.html'
})
export class FormDropdownComponent extends BaseComponent {
   
    constructor(private ref:ChangeDetectorRef){
        super(ref);
    }
    
}
