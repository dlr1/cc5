import { Component, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {Variable, Command, Device} from './form-components/models';
import { CommandModalComponent } from './command-modal.component';

@Component({
    selector: 'commands-component',
    templateUrl: './commands.component.html'
})
export class CommandsComponent {
    commands: Array<Command>;
    filteredCommands:Array<Command>;
    groupedCategories: Array<{name:string, count:number}>=[];
    selectedCategory:{name:string, count:number};
    selectedCommand: Command;
    @Input() device: Device;
    constructor(private http: HttpClient, private modalService: NgbModal) {

    }
    ngOnInit() {
        this.http.get<Array<Command>>('assets/mcr-data.json').subscribe(x => {
            this.commands = x["commands"];
            let categories = {};
            this.commands.forEach((c, i) => {
                if (!categories.hasOwnProperty(c.category))
                    categories[c.category] = [];

                categories[c.category].push(c);
            });

            for(var key in categories){
                if (!categories.hasOwnProperty(key)) continue;
                this.groupedCategories.push({name:key, count:categories[key].length});                
            }
            this.selectedCategory = this.groupedCategories[0];
        });        
    }

    openDialog(){
        const modalRef = this.modalService.open(CommandModalComponent,{size:"lg"});
        modalRef.componentInstance.command = this.selectedCommand;
      }

      editCommand(){
        this.openDialog();
    }

    commandChanged(){      
        this.openDialog();
    }

    
    categoryChanged(){
        this.filteredCommands = this.commands.filter(x=>x.category == this.selectedCategory.name);
    }
}
