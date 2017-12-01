import { Component, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Variable } from './models';

import {regexList} from './models';
@Component({        
})
export class BaseComponent {
    private _data: Variable;
    isValid:boolean = false;

    @Input()
    set data(val: Variable) {
     this.cdref.detach();
      this._data = Object.assign({pattern:regexList.filter(x=>x.name == val.regex_name)[0].pattern}, val);
      this.isValid = !val.required;
      this.cdref.detectChanges(); 
    }

    get data(): Variable { return this._data; }

    @Output() valueChanged = new EventEmitter<Variable>();
    
    constructor(private cdref:ChangeDetectorRef){        
    }

    validate(value) {       
        this.isValid = this.data.pattern.test(value)
        this.cdref.detectChanges(); 
        this.valueChanged.emit(this.data);
    }
   
}
