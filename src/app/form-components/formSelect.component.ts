import { Component, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Variable } from '../models';
import { BaseComponent } from './base.component';
import ServiceHelper from '../services/serviceHelper';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'form-select',
    templateUrl: './formSelect.component.html'
})
export class FormSelectComponent extends BaseComponent {

    lookupValues: Array<{ name: string }>
    constructor(private ref: ChangeDetectorRef, private serviceHelper: ServiceHelper) {
        super(ref);
    }

    ngOnInit() {
        if (this.data.dataCommand != undefined && this.data.dataCommand != "")
            this.serviceHelper.sendCommand({
                session_key: this.command.session_key,
                context: "",
                commands: [{ command_string: this.data.dataCommand, command_args: null }]
            }).subscribe(data => {
                this.data.options = this.command.commandParser[this.data.dataParserName](this.device, data.responses[0].response, this.data);
                this.ref.detectChanges();
            });
    }

   
}
