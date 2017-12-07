import { Variable } from "./variable";
import { Script } from "./script";

export interface DeviceCommand{
    intrusiveness:string;
    name:string;
    snippets:Array<{text:string}>;
    variables:Array<Variable>;
    category:string;
    resource_hog:boolean;
    device?:string;
    approved?:boolean
    access:any;
    scripts?:Array<Script>;
}