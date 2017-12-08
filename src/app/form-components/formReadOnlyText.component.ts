import { Component, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Variable } from '../models';
import { BaseComponent } from './base.component';
import ServiceHelper from '../services/serviceHelper';


@Component({
    selector: 'form-ro-text',    
    templateUrl: './formReadOnlyText.component.html'
})
export class formReadOnlyTextComponent extends BaseComponent {
    
    constructor(private ref: ChangeDetectorRef, private serviceHelper: ServiceHelper) {
        super(ref);
    }
   
    ngOnInit(){
        if (this.data.dataCommand != "")
            this.serviceHelper.sendCommand({
                session_key: this.command.session_key,
                context: "",
                commands: [{ command_string: this.data.dataCommand, command_args: null }]
            }).subscribe(data=>{
                this.data.value =  this.command.commandParser[this.data.dataParserName](this.device, data.responses[0].response, this.data);
                this.ref.detectChanges();            
            });
        else if (this.data.dataParserName != "")
            this.data.value =  this.command.commandParser[this.data.dataParserName](this.device, null, this.data);
            this.ref.detectChanges();      
            
    }
}
