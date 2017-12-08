import { Component, Input, ChangeDetectorRef, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Variable } from '../models';
import { BaseComponent } from './base.component';
import ServiceHelper from '../services/serviceHelper';


@Component({
    selector: 'form-checkbox',
    templateUrl: './formCheckbox.component.html'
})
export class FormCheckboxComponent extends BaseComponent {

    @ViewChild('box') input: ElementRef;    
    constructor(private ref: ChangeDetectorRef, private serviceHelper: ServiceHelper) {
        super(ref);
    }

    ngAfterViewInit(){
        this.input.nativeElement.checked = this.data.value = this.data.checked
    }
    changed(event){
        console.log(event.target.value)
    }
    ngOnInit() {
        this.isValid = true;
        if (this.data.dataCommand && this.data.dataCommand != "")
            this.serviceHelper.sendCommand({
                session_key: this.command.session_key,
                context: "",
                commands: [{ command_string: this.data.dataCommand, command_args: null }]
            }).subscribe(data => {
                this.command.commandParser[this.data.dataParserName](this.device, data.responses[0].response, this.data);
                this.ref.detectChanges();
            });

    }
}
