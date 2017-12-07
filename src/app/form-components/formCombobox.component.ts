import { Component, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Variable } from '../models';
import { BaseComponent } from './base.component';
import ServiceHelper from '../services/serviceHelper';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'form-combobox',    
    templateUrl: './formCombobox.component.html'
})
export class FormComboboxComponent extends BaseComponent {
   
    lookupValues:Array<{name:string}>
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
            this.lookupValues = this.command.commandParser[this.data.dataParserName](null, data.responses[0].response, this.data);
            this.ref.detectChanges();            
        });        
    }

    formatter = (val: {name:string}) => val.name;
    
    search = (text$: Observable<string>) =>
        text$
        .debounceTime(200)        
        .switchMap(term => term.length < 3 ? []
            : this.lookupValues.filter(x=>x.name.toLowerCase() == term.toLowerCase())
            );
}
