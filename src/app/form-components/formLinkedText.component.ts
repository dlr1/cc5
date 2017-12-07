import { Component, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Variable } from '../models';
import { BaseComponent } from './base.component';


@Component({
    selector: 'form-text',    
    templateUrl: './formLinkedText.component.html'
})
export class FormLinkedTextComponent extends BaseComponent {
   
    constructor(private ref:ChangeDetectorRef){
        super(ref);
    }
    
}
