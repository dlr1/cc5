import { Component, Input } from '@angular/core';
import { Variable } from './models';


@Component({
    selector: 'form-text',    
    templateUrl: './formText.component.html'
})
export class FormTextComponent {
    @Input() data: Variable;
    getValidationColor(){
        return 'green';
    }
}
