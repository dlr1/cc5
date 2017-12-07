import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Device, DeviceCommand } from "../models";
import { Promise } from "q";

@Injectable()
export default class DeviceService {
    baseUrl: string = "http://localhost:65427";
    constructor(private http: HttpClient) {

    }

    getCommandsUrl(device: Device): string {
        let url: string;

        switch (device.device_type) {
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
        return url;
    }
    populateCommands(device: Device): Promise<boolean> {             
        return Promise((resolve)=>{
            let url = this.getCommandsUrl(device);
            // let q = this.injector.get(MCRParsers);
            // q.test();
    
            this.http.get<Array<DeviceCommand>>(url).subscribe(x => {
                device.commands = x["commands"];
                let categories = {};
                device.commands.forEach((c, i) => {
                    if (!categories.hasOwnProperty(c.category))
                        categories[c.category] = [];
    
                    categories[c.category].push(c);
                });
    
                device.commandCategories = [];
                for (var key in categories) {
                    if (!categories.hasOwnProperty(key)) continue;
                    device.commandCategories.push({ name: key, count: categories[key].length });
                }    
            
                resolve(true);
            });
        });
       
        
    }

}