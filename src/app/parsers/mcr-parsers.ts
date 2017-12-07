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
            var parsedASN = parsedOutput[x++].match(/(MS|HI|HO|SP|VSI)-\d{1,6}-[A-Z0-9-]+/gi);
            if (parsedASN!= null && parsedASN.length > 0) {
                    result.push({ name: parsedASN[0] });                    
            }
        }
        variable.values = result;
        if (result.length == 1)
            variable.value = result[0].name;
        else
            variable.values.sort();

        return result;
    }
}