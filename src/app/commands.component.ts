import { Component, Input, ChangeDetectorRef, EventEmitter, Output, Injector } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Variable, Command, Device, Script } from './form-components/models';
import { CommandModalComponent } from './command-modal.component';
import { MCRParsers, ELNParsers } from './parsers';

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


    constructor(private injector: Injector, private http: HttpClient, private modalService: NgbModal) {

    }
    ngOnInit() {

    }

    openDialog() {
        
        const modalRef = this.modalService.open(CommandModalComponent, { size: "lg" });        
        modalRef.componentInstance.command = this.selectedCommand;
        let snips: Array<Script> = [];
        this.selectedCommand.snippets.forEach(x =>
            snips.push({"icon":"fa fa-angle-right", "command": x.text.replace("{{","").replace("}}",""),response:""})
        );
        
        modalRef.result.then((command: Command) => {
            command.variables.forEach(variable=>{
                snips.forEach((x,i)=>{
                    snips[i].command = x.command.replace(`<<${variable.variable}>>`,`<b>${variable.value}</b>`).replace("{{","").replace("}}";
                })
            })
            this.selectedCommand.scripts = snips;
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
