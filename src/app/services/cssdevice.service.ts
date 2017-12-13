import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

import { RingLib } from "./ringLib";
import NitService  from "./nitService";
import ServiceHelper from './serviceHelper';
import { NitDevice } from '../models/nitDevice';
import { CommandResponse } from '../models';

@Injectable()
export class CSSDevice extends NitDevice {

    constructor(private http: HttpClient, private serviceHelper: ServiceHelper, private ringLib: RingLib) {
        super();
    }

    private sortByIndex(a, b) {
        return a.index < b.index ? -1 : 1;
    }

    private move(array, from, to) {
        array.splice(to, 0, array.splice(from, 1)[0]);
    }

    private addErrorToDevice(error) {
        if (error.indexOf('No active connection found') > -1) {
            this.isRunning = false;
            return;
        }
        this.icon = 'fa fa-exclamation-triangle text-danger';
        this.error = error;
        //selectedRing.health.errors.push({ device_name: device.name, error_msg: error });
        this.isRunning = false;
    }

    private async getCSSCiscoPanelDetails(command, parser) {

        var promiseArray: Array<Promise<object>>

        for (var i = 0; i < 2; i++) {

            // replace port or ringname variable with the port or name of the ring this device belongs
            var cmd = command.text;
            if (cmd.indexOf('<<ringname>>') > 0)
                cmd = cmd.replace('<<ringname>>', this.ringName)

            if (cmd.indexOf('<<port>>') > 0)
                cmd = cmd.replace('<<port>>', this.metadata.values[i][0].value)


            var data = await this.serviceHelper.sendCommand({ session_key: this.sessionKey, commands: [{ command_string: cmd, name: i }] }).toPromise();
            if (data["error"] != null)
                this.addErrorToDevice(data["error"]);
            else {
                var portnumber = data.commands[0].name;
                var retValues = (parser as (k:any,j:any,l:any)=>any)(command.keys, data["responses"][0].response, this.name);
                this.metadata.values[portnumber] = this.metadata.values[portnumber].concat(retValues);
            }

        }
        Promise.all(promiseArray).then(x => { return 0; });
    }

    private setNodeStatus(device) {
        for (var i = 0; i < 2; i++) {
            // check if any of the values are not valid and add the status field for each port
            var valuesInError = device.metadata.values[i].filter(function (item) { return item.valid != undefined && !item.valid; });
            var status = {
                index: 9, name: 'Status', style: '', valid: '', value: ''
            };

            if (valuesInError.length == 0) {
                status.style = 'text-success bg-success';
                status.value = 'Ready';
            } else {
                status.style = 'text-danger bg-danger';
                status.value = 'Not Ready';
            }

            device.metadata.values[i].push(status);
            device.metadata.values[i].sort(this.sortByIndex);
        }
    }

    private setCSSAlcatelNodeStatus() {
        for (var i = 0; i < 2; i++) {
            // check if any of the values are not valid and add the status field for each port
            var valuesInError = this.metadata.values[i].filter(function (item) { return item.valid != undefined && !item.valid; });
            var status = {
                index: 9, name: 'Status', style: '', valid: '', value: ''
            };

            if (valuesInError.length == 0) {
                status.style = 'text-success bg-success';
                status.value = 'Ready';
            } else {
                status.style = 'text-danger bg-danger';
                status.value = 'Not Ready';
            }

            this.metadata.values[i].push(status);
            this.metadata.values[i].sort(this.sortByIndex);
        }
    }

    async getCSSAlcatelData() {
        this.metadata.values = [];

        var promiseArray = [];

        var data = this.ringLib.getRingIdsForAlcatel(this.ringName);

        // holds data for port1
        this.metadata.values[0] = [];
        // holds data for port2
        this.metadata.values[1] = [];

        // get erp_ring_id from device name
        var erp_ring_id = parseInt(this.name.split('.')[0].replace('CSS', ''));
        erp_ring_id = erp_ring_id % 2 == 0 ? data['ring_id_west'] : data['ring_id_east'];
        var alcatelData = this.ringLib.getCSSAlcatel();
        var panel = alcatelData[0];

        promiseArray.push(
            await this.serviceHelper.sendCommand({
                session_key: this.sessionKey,
                commands: [{ command_string: panel.commands[0].text.replace('<<ring_id>>', data['ring_id_west']), command_args: null }]
            })
        );

        promiseArray.push(
            await this.serviceHelper.sendCommand({
                session_key: this.sessionKey,
                commands: [{ command_string: panel.commands[0].text.replace('<<ring_id>>', data['ring_id_east']), command_args: null }]
            })
        );

        let allResponses = await Promise.all(promiseArray)
        data = allResponses[0].responses[0].response.indexOf('rplEnd') < 0 ? allResponses[1] : allResponses[0];
        if (data.error == null) {
            var parser = this.ringLib.getParser(panel.parser);
            try {
                var ports = (parser as (k:any,text:any)=>any).bind(this.ringLib, panel.commands[0].keys, data.responses[0].response);
                if (ports[0][0].value.indexOf('lag') > -1)
                    this.move(ports, 1, 0);

                for (var i = 0; i < 2; i++)
                this.metadata.values[i] = ports[i];


                //rplEnd   is    blocked 	 Ready 
                //rplEnd    is   unblocked  and Time to Revert   : not N/A ( 300 sec and more than 0 sec) eg. Time to Revert   :  215 seconds	Pending
                //rplEnd     is   unblocked  	 Protection


                //update the status column
                if (data.responses[0].response.indexOf('Time to Revert   : N/A') < 0 && data.responses[0].response.indexOf('rplEnd          unblocked') > -1) {
                    this.metadata.values[0][5].value = 'Pending';
                    this.metadata.values[0][5].style = 'text-warning bg-warning';
                }
                else if (data.responses[0].response.indexOf('Time to Revert   : N/A') > -1 && data.responses[0].response.indexOf('rplEnd          unblocked') > -1) {
                    this.metadata.values[0][5].value = 'Protection';
                    this.metadata.values[0][5].style = 'text-danger bg-danger';
                }
                else if (data.responses[0].response.indexOf('rplEnd          blocked') > -1) {
                    this.metadata.values[0][5].value = 'Ready';
                    this.metadata.values[0][5].style = 'text-success bg-success';
                }

                this.metadata.values[1][5].value = '';
                let responseData = await this.serviceHelper.sendCommand({
                    session_key: this.sessionKey,
                    commands: [{ command_string: panel.commands[1].text.replace('<<port>>', this.metadata.values[0][0].value), command_args: null }]
                });
                var parser = this.ringLib.getParser(panel.parser);
                var data = (parser as (k:any,j:any)=>any).bind(this.ringLib, panel.commands[1].keys, responseData["responses"][0].response);
                // merge this response with values[0] array
                data[0].forEach(function (item) { this.metadata.values[0].push(item); });

                // device.metadata.values[1] will have lag values, and no TX, RX power levels, add empty items 
                for (var i = 4; i <= 6; i++) {
                    this.metadata.values[1].push({ index: i });
                }

                this.metadata.values[0].sort(this.sortByIndex);
                this.metadata.values[1].sort(this.sortByIndex);
                return 0;
            }
            catch (e) {
                await this.serviceHelper.disconnect({ session_key: this.sessionKey || '' });
            }
        }
        else {
            await this.serviceHelper.disconnect({ session_key: this.sessionKey || '' });
            this.addErrorToDevice(data.error);
            return -1;
        }
    }

    async getCSSCiscoPhysicalLayerData() {

        this.metadata.values = [];

        // holds data for port1
        this.metadata.values[0] = [];
        // holds data for port2
        this.metadata.values[1] = [];

        var cssPorts = this.ringLib.getCSSCiscoPorts();
        var panel = cssPorts[0];

        // need to replace ringname variable with the name of the ring this device belongs to
        let data = await this.serviceHelper.sendCommand({
            session_key: this.sessionKey,
            commands: [{ command_string: panel.commands[0].text.replace('<<ringname>>', this.ringName), command_args: null }]
        }).toPromise();
        
        if (data.error == null) {
            var parser = this.ringLib.getParser(panel.parser);
            var ports = (parser as (k:any,j:any)=>any)(panel.commands[0].keys, data["responses"][0].response);
            for (var i = 0; i < 2; i++)
            this.metadata.values[i].push(ports[i]);

            var cssCiscoPanels = this.ringLib.getCSSCiscoPanels();
            var parser = this.ringLib.getParser(cssCiscoPanels[0].parser);

            var promiseArray = [];
            for (var i = 0; i < cssCiscoPanels[0].commands.length; i++)
                promiseArray.push(this.getCSSCiscoPanelDetails(cssCiscoPanels[0].commands[i], parser));

            // execute command to validate power levels               
            Promise.all(promiseArray).then(function (allResponses) {
                //this.setNodeStatus(device);
                return 0;
            });

        }
        else {
            await this.serviceHelper.disconnect({ session_key: this.sessionKey || '' });
            this.addErrorToDevice(data["error"]);
            return -1;
        }
    }

    async getMetadata() {
        let data1 = await this.serviceHelper.getConnection({ DeviceName: this.name, DeviceType: this.type, context: 'ring stuff' })
        this.sessionKey = data1.session_key;
        // check if the device is CSS Alcatel or CSS Cisco
        let data = await this.serviceHelper.sendCommand({
            session_key: this.sessionKey,
            commands: [{ command_string: 'show version', command_args: null }]
        }).toPromise();
        if (data.error != null) {
            this.addErrorToDevice(data.error);
            return 0;
        }
        else {
            var response = data.responses[0].response;
            var isCiscoCSS = response.indexOf('Cisco') > -1;

            if (isCiscoCSS) {
                let data = await this.getCSSCiscoPhysicalLayerData();
                await this.serviceHelper.disconnect({ session_key: this.sessionKey || '' });
                return 0;
            }
            else {
                // this is a alcatel device
                let data = await this.getCSSAlcatelData();
                await this.serviceHelper.disconnect({ session_key: this.sessionKey || '' });
                return 0;
            }
        }
    }
}