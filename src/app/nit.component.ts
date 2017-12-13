import { Component, Injector } from '@angular/core';
import  NitService  from "./services/nitService";
import { NitDevice } from './models/nitDevice';
import { CSSDevice } from './services/cssdevice.service';



@Component({
    selector: 'nit',
    templateUrl: './nit.component.html'
})
export class NITComponent {
    rings: any;
    ring: any;
    ringName: string;
    selectedRing;
    devices: Array<NitDevice>;
    nodePdfUrl = null;
    constructor(private nitService: NitService, private injector: Injector) {
        this.selectedRing = {
            health: {
                state: 'No Data',
                errors: [],
                warnings: [],
                infos: []
            },
            services: {
                state: 'No Data',
                errors: [],
                warnings: [],
                infos: [],
                view: null
            },
            state: {
                view: null
            }
        }
    }

    getDeviceMetaData(device: NitDevice){
       (<CSSDevice>device).getMetadata();
    }

   

    getRing() {
        this.nitService.getRing(this.ring.name).subscribe(data => {
            this.devices = this.nitService.getUniqueNodes(data[0].spans);
            this.devices.forEach(x=>x.ringName = this.ring.name);
        });
    }
    ngOnInit() {
        this.nitService.getRings().subscribe(data => {
            this.rings = data;
        })
    }
}
