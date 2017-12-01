import { Component, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {CommandComponent} from './command.component';

import {Variable, Command} from './form-components/models';

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

    constructor(private http: HttpClient, private modalService: NgbModal) {

    }
    ngOnInit() {
        this.http.get<Array<Command>>('assets/data.json').subscribe(x => {
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
//            this.categoryChanged();
        });        
    }

    openDialog(){
        const modalRef = this.modalService.open(CommandComponent,{size:"lg"});
        modalRef.componentInstance.command = this.selectedCommand;
      }

    editCommand(){

    }

    commandChanged(){      
        this.openDialog();
    }

    
    categoryChanged(){
        this.filteredCommands = this.commands.filter(x=>x.category == this.selectedCategory.name);
    }
}
