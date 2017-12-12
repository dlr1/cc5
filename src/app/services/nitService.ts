import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { NitDevice } from "../models/nitDevice";

@Injectable()
export default class NitService {
   
    baseUrl: string = "http://localhost:65427";
    constructor(private http: HttpClient) {

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
                        devices.push(<NitDevice>{
                            name: node.nodeA,
                            type: node.nodeAType,
                            address: node.nodeAAddress
                        });
                }

                if (found.indexOf(node.nodeB) == -1) {
                    found += node.nodeB;
                    if (!node.excludeNodeB)
                        devices.push(<NitDevice>{
                            name: node.nodeB,
                            type: node.nodeBType,
                            address: node.nodeBAddress
                        });
                }
            }

            for (var i = 0; i < devices.length; ++i) {
                var device = devices[i];
                device.circuits = [];
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