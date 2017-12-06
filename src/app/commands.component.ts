import { Component, Input, ChangeDetectorRef, EventEmitter, Output, Injector } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Variable, Command, Device, Script } from './form-components/models';
import { CommandModalComponent } from './command-modal.component';
import { MCRParsers, ELNParsers } from './parsers';
import ServiceHelper from './services/serviceHelper';

@Component({
    selector: 'commands-component',
    templateUrl: './commands.component.html'
})
export class CommandsComponent {
    commands: Array<Command>;
    filteredCommands: Array<Command>;
    groupedCategories: Array<{ name: string, count: number }> = [];
    selectedCategory: { name: string, count: number };
    selectedCommand: Command;

    private _device: Device;
    @Input()
    set device(device: Device) {
        this._device = device;
        this.populateCommands();
    }

    get device() {
        return this._device;
    }


    populateCommands() {
        let url: string;

        switch (this.device.device_type) {
            case "ELN":
                url = 'assets/eln_commands.json';
                break;
            case "AES":
                url = 'assets/aes_commands.json';
                break;
            case "MCR":
                url = 'assets/mcr_commands.json';
                break;
            case "CIR":
                url = 'assets/cir_commands.json';
                break;
            case "CSS":
                url = 'assets/css_commands.json';
                break;
            case "CSS-ALU":
                url = 'assets/css2_commands.json';
                break;
            case "EXA":
                url = 'assets/exa_commands.json';
                break;
            case "ELS":
                url = 'assets/311V_commands.json';
                break;
            case "CSR":
                url = 'assets/csr_commands.json';
                break;
            case "CTR":
                url = 'assets/ctr_commands.json';
                break;
        }
        // let q = this.injector.get(MCRParsers);
        // q.test();

        this.http.get<Array<Command>>(url).subscribe(x => {
            this.commands = x["commands"];
            let categories = {};
            this.commands.forEach((c, i) => {
                if (!categories.hasOwnProperty(c.category))
                    categories[c.category] = [];

                categories[c.category].push(c);
            });

            this.groupedCategories = [];
            for (var key in categories) {
                if (!categories.hasOwnProperty(key)) continue;
                this.groupedCategories.push({ name: key, count: categories[key].length });
            }
            this.selectedCategory = this.groupedCategories[0];
            this.categoryChanged();
        });
    }


    constructor(private serviceHelper: ServiceHelper, private injector: Injector, private http: HttpClient, private modalService: NgbModal) {

    }
    ngOnInit() {

    }

    openDialog() {
        
        const modalRef = this.modalService.open(CommandModalComponent, { size: "lg" });        
        modalRef.componentInstance.command = this.selectedCommand;
        let snips: Array<Script> = [];
        var l_buff = '';
        
        // roll the all the entire snippets into one big string
        for (var i = 0; i < this.selectedCommand.snippets.length; ++i)
            l_buff += this.selectedCommand.snippets[i].text;

        // this.selectedCommand.snippets.forEach(x =>
        //     snips.push({"icon":"fa fa-angle-right", "command": x.text.replace("{{","").replace("}}",""),"response":"","error":""})
        // );
        
        modalRef.result.then((command: Command) => {
            command.variables.forEach(variable=>{
                var rx = new RegExp(`<<${variable.variable}>>`,"g");
                l_buff = l_buff.replace(rx,`<b>${variable.value}</b>`).replace(/{{/g,"").replace(/}}/g,"");
                // snips.forEach((x,i)=>{
                //     snips[i].command = x.command.replace(`<<${variable.variable}>>`,`<b>${variable.value}</b>`).replace("{{","").replace("}}";
                // })
            })
            l_buff.split("\n").forEach(x=>
                snips.push({"icon":"fa fa-angle-right", "command": x,"response":"","error":""});

            this.selectedCommand.scripts = snips;
          });
        
    }

    setTerminalCommand = function (commandText) {
        this.device.terminal += '<div class="command">' + commandText + '</div>';        
    }

    htmlEscape(str) {
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    setTerminalText(responseCssClass, textResponse) {
        var formatted = "";
        if (textResponse != undefined) {
            formatted = this.htmlEscape(textResponse);
        }

        this.device.terminal += "<pre class='" + responseCssClass + "'>" + formatted + "</pre>";
        this.device.terminal += '<div class="prompt">' + this.device.connection.prompt + '</div>';
    }

    sendAllCommands(line: number){
        this.selectedCommand.scripts.forEach((item, index) => {            
                            if (index == line ) {                                           
                                this.device.isExecuting = true;
                               
                                item.icon = 'fa fa-cog fa-spin';
            
                                var temp_line = item.command.replace(new RegExp("<b>", "g"), '');
                                temp_line = temp_line.replace(new RegExp("</b>", "g"), '');
            
                                //send command to terminal
                                this.setTerminalCommand(temp_line);
                            
                                this.serviceHelper.sendCommand({
                                    session_key: this.device.session_key,
                                    context: this.device.context,
                                    commands: [{ command_string: temp_line, command_args: null }]
                                }).subscribe(data => {
                                    this.device.isExecuting = false;
                                    if (data.error == null) {
                                        this.device.connection = {prompt: data.responses[0].prompt};
                                        this.selectedCommand.scripts[index].icon = 'fa fa-check';
                                        this.selectedCommand.scripts[index].error = 'Success!';
                                        this.setTerminalText("response_good", data.responses[0].response);
                                        this.sendAllCommands(index + 1);
                                    }
                                    else {
                                        this.selectedCommand.scripts[index].icon = 'fa fa-warning';
                                        this.selectedCommand.scripts[index].error = data.error;
                                        this.setTerminalText("response_bad", data.error);
                                    }
                                })
                                    
                                    }
                                });
    } 

    getCommandIconColor(){
        return "black";
    }
    editCommand() {
        this.openDialog();
    }

    commandChanged() {
        this.openDialog();
    }


    categoryChanged() {
        this.filteredCommands = this.commands.filter(x => x.category == this.selectedCategory.name);
    }
}
