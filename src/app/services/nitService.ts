import { HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { NitDevice } from "../models/nitDevice";

import  {CSSDevice}  from './cssdevice.service';

@Injectable()
export default class NitService {
   
    baseUrl: string = "http://localhost:65427";
    constructor(private http: HttpClient, private injector: Injector){
        
    }
   
    extend<T, U>(first: T, second: U): T & U {
        let result = <T & U>{};
        for (let id in first) {
            (<any>result)[id] = (<any>first)[id];
        }
        for (let id in second) {
            if (!result.hasOwnProperty(id)) {
                (<any>result)[id] = (<any>second)[id];
            }
        }
        return result;
    }

    getRings(): Observable<Object>{        
        return this.http.get(`${this.baseUrl}/api/rings`);
    }    

    getRing(ringName: string){
        return this.http.get(`${this.baseUrl}/api/rings?Name=${ringName}&DeviceNameUrl=https://plancactst01.pla.dc.xo.com:8000/dcm/admin/devices/tbs`);       
    }
    getUniqueNodes(nodes): Array<NitDevice> {
            var found = '';
            let devices:Array<NitDevice> = [];

            for (var i = 0; i < nodes.length; ++i) {
                var node = nodes[i];

                if (found.indexOf(node.nodeA) == -1) {
                    found += node.nodeA;
                    if (!node.excludeNodeA)
                        if (node.nodeA.startsWith("CSS"))
                        devices.push(this.extend(this.injector.get(CSSDevice), {
                                name: node.nodeA,
                                type: node.nodeAType,
                                address: node.nodeAAddress,
                                circuits:[]   
                            }));
                        else
                            devices.push(<NitDevice>{
                                name: node.nodeA,
                                type: node.nodeAType,
                                address: node.nodeAAddress,     
                                circuits:[]                           
                            });
                }

                if (found.indexOf(node.nodeB) == -1) {
                    found += node.nodeB;
                    if (!node.excludeNodeB)
                        if (node.nodeA.startsWith("CSS"))
                            devices.push(this.extend(this.injector.get(CSSDevice), {
                                name: node.nodeB,
                                type: node.nodeBType,
                                address: node.nodeBAddress,
                                circuits:[]   
                            }));
                        else
                            devices.push(<NitDevice>{
                                name: node.nodeB,
                                type: node.nodeBType,
                                address: node.nodeBAddress,
                                circuits:[]
                            });
                }
            }

            for (var i = 0; i < devices.length; ++i) {
                var device = devices[i];                
                found = '';

                for (var j = 0; j < nodes.length; ++j) {
                    var node = nodes[j];
                    var circuits = node.circuitId.split('--');

                    if (node.nodeA == device.name || node.nodeB == device.name) {

                        for (var k = 0; k < circuits.length; ++k) {
                            if (found.indexOf(circuits[k]) == -1) {
                                device.circuits.push(circuits[k]);
                                found += circuits[k];
                            }
                        }
                    }
                }
            }

            return devices;
        }
        
}