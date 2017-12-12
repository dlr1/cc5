import { Component } from '@angular/core';
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
    constructor(private nitService: NitService) {
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
        if (device.type.startsWith("CSS"))
            (<CSSDevice>device).getMetadata();
    }

    getRing() {
        this.nitService.getRing(this.ring.name).subscribe(data => {
            this.devices = this.nitService.getUniqueNodes(data[0].spans);
            this.devices.forEach(x=>x.ring = this.ring.name);
        });
    }
    ngOnInit() {
        this.nitService.getRings().subscribe(data => {
            this.rings = data;
        })
    }
}
