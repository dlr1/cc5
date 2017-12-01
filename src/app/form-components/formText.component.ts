import { Component, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Variable } from './models';
import { BaseComponent } from './base.component';


@Component({
    selector: 'form-text',    
    templateUrl: './formText.component.html'
})
export class FormTextComponent extends BaseComponent {
    private _data: Variable;
    isValid:boolean = false;

    @Input()
    set data(val: Variable) {
      this._data = val;
      this.isValid = !val.required;
    }

    get data(): Variable { return this._data; }

    @Output() valueChanged = new EventEmitter<Variable>();
    
    constructor(private cdref:ChangeDetectorRef){
        super();
    }
    validate(value) { // without type info
        if (this.data.required)
            this.isValid = value != "";
        else
            this.isValid = true;

        this.cdref.detectChanges(); 
        this.valueChanged.emit(this.data);
      }
}
