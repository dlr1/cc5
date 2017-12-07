import { Component, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Variable } from '../models';
import { BaseComponent } from './base.component';
import ServiceHelper from '../services/serviceHelper';


@Component({
    selector: 'form-dropdown',    
    templateUrl: './formDropdown.component.html'
})
export class FormDropdownComponent extends BaseComponent {
   
    constructor(private ref:ChangeDetectorRef, private serviceHelper: ServiceHelper){
        super(ref);
    }    

    ngOnInit(){
        if (this.data.dataCommand != "")
        this.serviceHelper.sendCommand({
            session_key: this.command.session_key,
            context: "",
            commands: [{ command_string: this.data.dataCommand, command_args: null }]
        }).subscribe(data=>{
            this.command.commandParser[this.data.dataParserName](null, data.responses[0].response, this.data);
            this.ref.detectChanges();
            console.log(data.responses[0].response);
        });
        
    }
}
