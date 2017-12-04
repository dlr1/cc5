import { Component, Input} from '@angular/core';
import { Variable } from './models';
import { BaseComponent } from './base.component';



@Component({
    selector: 'form-intrusive',    
    template: `
    <div class="alert alert-danger" style="margin-top:10px" >
    <h4>
        Alert!
    </h4> <strong>Warning!</strong> This command may cause a service interruption! Check the box to acknowledge you understand
    this could impact a customer!&nbsp;
    <input [checked]="isValid" type="checkbox">
</div>
    `
})
export class IntrusivenessComponent extends BaseComponent {
   
    validate(value) {     
        this.valueChanged.emit(this.data);
    }
}
