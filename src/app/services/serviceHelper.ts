import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Promise } from "q";
import { Device, CommandResponse } from '../models';


export enum HttpOperation{
    GET = 0,
    POST,
    PUT
}
const urls = {
    run_QOSScript: 'https://plancactst01.pla.dc.xo.com:8000/dcm/script/nit/eln/QosConfig',
    update_device: 'https://plancactst01.pla.dc.xo.com:8000/dcm/admin/devices/',
    update_device_xdcm: 'https://plancactst01.pla.dc.xo.com:8000/dcm/admin/devices/', // rlaskew, 10/23/14, leave trailing slash for UPDATE
    delete_device: 'https://plancactst01.pla.dc.xo.com:8000/dcm/admin/devices/',
    delete_device_xdcm: 'https://plancactst01.pla.dc.xo.com:8000/dcm/admin/devices/', // rlaskew, 10/29/14, leave trailing slash for DELETE
    add_device: 'https://plancactst01.pla.dc.xo.com:8000/dcm/admin/devices',
    add_device_xdcm: 'https://plancactst01.pla.dc.xo.com:8000/dcm/admin/devices', // rlaskew, 10/29/14, NO trailing slash for ADD
    os_listDcm: 'https://plancactst01.pla.dc.xo.com:8000/dcm/admin/operatingsystems',
    deviceListDcm: 'https://plancactst01.pla.dc.xo.com:8000/dcm/admin/devicetypes',
    neListDcm: 'https://plancactst01.pla.dc.xo.com:8000/dcm/admin/netypes',
    deviceDcm: 'https://plancactst01.pla.dc.xo.com:8000/dcm/admin/devices/',
    get_devices: 'https://plancactst01.pla.dc.xo.com:8000/dcm/devices',
    get_devices_xdcm: 'https://plancactst01.pla.dc.xo.com:8000/dcm/devices/aes',
    get_connection: 'https://plancactst01.pla.dc.xo.com:8000/dcm/connect',
    get_disconnected: 'https://plancactst01.pla.dc.xo.com:8000/dcm/disconnect',
    send_command: 'https://plancactst01.pla.dc.xo.com:8000/dcm/command',
    is_connected: 'https://plancactst01.pla.dc.xo.com:8000/dcm/isconnected',
    get_interfaces: 'https://plancactst01.pla.dc.xo.com:8000/dcm/',
    get_version: 'https://plancactst01.pla.dc.xo.com:8000/dcm/',
    get_devicetypes: 'https://plancactst01.pla.dc.xo.com:8000/dcm/admin/devicetypes',
    get_deviceNameFromTbsId: 'https://plancactst01.pla.dc.xo.com:8000/dcm/admin/devices/tbs',
    disconnectUrl: "https://plancactst01.pla.dc.xo.com:8000/dcm/disconnect",
    connectUrl: "https://plancactst01.pla.dc.xo.com:8000/dcm/connect"
}

@Injectable()
export default class ServiceHelper {
    baseUrl: string = "http://localhost:65427";
    constructor(private http: HttpClient) {

    }

    getConnection(request): Promise<CommandResponse> {
        request.osusername = 'ldarbha';
        request.connectUrl = urls.connectUrl;

        return Promise((resolve) => {
            this.http.post<CommandResponse>(`${this.baseUrl}/api/connectRequest`, request).subscribe(data => resolve(data)
            )
        });
    }

    disconnect(data): Promise<any>{       
        var jsonStringfiedVersion = {
                        json: encodeURIComponent(JSON.stringify(data)),
                        backendUrl: urls.disconnectUrl,
                        opMethod: "POST"
                    };
                     var backendUrl = "/api/dcmService";
        return Promise((resolve)=>{
            this.http.post(`${this.baseUrl}/api/dcmService`, jsonStringfiedVersion).subscribe(data=>resolve(data)
        )});
        
    }

    performAsyncInvocation(aMethod: HttpOperation, aUrl: string, aParams): Promise<any> {
        return Promise((resolve)=>{
            this.http.get(`${this.baseUrl + aUrl}`,{params: aParams}).subscribe(data=>{
                console.log(JSON.parse(data["content"]));
                resolve(data);
            },
            data=>{
                console.log("error");
                resolve(data);
            })            
        });       
    }

    getFilteredDevices(criteria:string) {       
        return this.http.get(`${this.baseUrl}/api/devices/${criteria}`).map(data => data);
    }

    login(request):Observable<{session_key:string}>{
        return this.execute<{session_key:string}>(urls.get_connection,HttpOperation.POST,"", request);                      
    }
    sendCommand(request):Observable<CommandResponse>{
        return this.execute(urls.send_command,HttpOperation.POST,"", request)
    }

    getDevicesByNames(criteria) {
        return this.http.get(`${this.baseUrl}/api/devices/names/${criteria}`)          
    }

    isConnected(request:{session_key: string}){
        return this.execute<{session_key:string, connected:string, error:string}>(urls.is_connected, HttpOperation.POST,"",request)
    }
    execute<T>(url: string, operation: HttpOperation, params, data) {

        let user_pwd = "cmdctl:svend71)";
        let backendUrl = "http://localhost:65427/api/dcmService";
        let jsonStringfiedVersion = {
            "json": encodeURIComponent(JSON.stringify(data)),
            "backendUrl": url,
            "opMethod": "GET"
        };

        switch (operation) {
            case 0: // GET
                jsonStringfiedVersion.opMethod = "GET";
                return this.http.post<T>(backendUrl, jsonStringfiedVersion);
            case 1: // POST
                jsonStringfiedVersion.opMethod = "POST";
                return this.http.post<T>(backendUrl, jsonStringfiedVersion);
            case 2: // PUT
                jsonStringfiedVersion.opMethod = "PUT";
                return this.http.post<T>(backendUrl, jsonStringfiedVersion);
        }

    }

}
