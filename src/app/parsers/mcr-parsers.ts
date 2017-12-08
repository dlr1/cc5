import { Injectable } from "@angular/core";
import { Device, Variable } from "../models";


@Injectable()
export class MCRParsers {
    MCR_NeighborIP(device: Device, data: string, variable: Variable) {
        var result = [];

        if (!variable || !data)
            return;
        var parsedOutput = data.split("\n");
        var x = 0;
        while (x < parsedOutput.length) {
            var parsedASNx = parsedOutput[x++];
            var parsedASN = parsedASNx.match(/Neighbor: \d+.\d+.\d+.\d+/g);

            if (parsedASN!= null && parsedASN.length > 0) {
                var parsedIP = parsedASN[0].slice(10, parsedASN[0].length).trim();
                //result.push({ name: parsedASN[0] });
                result.push({ name: parsedIP });
            }
        }
        variable.values = result;
        if (result.length == 1)
            variable.value = result[0].name;
        else
            variable.values.sort();

        return result;
    }

    DataParserForCSRVRF(device: Device, data: string, variable: Variable) {
        var result = [];

        if (!variable || !data)
            return;
        var parsedOutput = data.split("\n");
        var x = 0;
        while (x < parsedOutput.length) {
            var line = parsedOutput[x++].match(/(MS|HI|HO|SP|VSI)-\d{1,6}-[A-Z0-9-]+/gi);
            if (line!= null && line.length > 0) {
                    result.push({ name: line[0] });                    
            }
        }
        variable.values = result;
        if (result.length == 1)
            variable.value = result[0].name;
        else
            variable.values.sort();

        return result;
    }
    
    IC_Specific_LSP(device: Device, data: string, variable: Variable) {
        var result = [];

        if (!variable || !data)
            return;
        var parsedOutput = data.split("\n");
        var x = 0;
        while (x < parsedOutput.length) {
            var line = parsedOutput[x++].replace(/(\r\n|\n|\r)/gm, "").trim();
            var parsedLine = line.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}/g);
            if (parsedLine) {
                var fourthToken = line.slice(64, line.length).trim();
                result.push({ name: fourthToken });
            }
        }
        variable.values = result;
        if (result.length == 1)
            variable.value = result[0].name;
        else
            variable.values.sort();

        return result;
    }
    dataParserForVPLSFloodFilter(device, data, variable) {
        var result = [];
        
                if (!variable || !data)
                    return;
                var parsedOutput = data.split("\n");
                for (var x in parsedOutput) {
                    var line = parsedOutput[x].trim();
                    if (line.indexOf('filter') > -1)
                        result.push({ name: line.split(' ')[5] });
                }
                variable.values = result;
                if (result.length == 1)
                    variable.value = result[0].name;
                else
                    variable.values.sort();
        
                return result;      
    }
    
    dataParserForPEName(device, data, variable) {
        return device.device_name;;
    }

    dataParserForSiteId(device, data, variable) {
            
        var result = "";
        if (!variable || !data)
            return;

        var parsedOutput = data.split("\n");
        for (var x in parsedOutput) {
            var lineArray = parsedOutput[x].split(' ');
            var nameToCheck = lineArray[lineArray.length - 1];
            
            // if nameToCheck is repeated 5 or more times then pick this a value 
            var timesRepeated = parsedOutput.filter(function (val) { return val.indexOf('site-identifier ' + nameToCheck) > -1; });
            if (timesRepeated.length >= 5)
            {
                result = nameToCheck;
                break;
            }
        }  
        
        return result;
    }
}