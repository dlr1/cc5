export class NitDevice {
    name: string;
    type: string;
    address: string;
    circuits: Array<string>;
    ringName:string;

    sessionKey: string;
    
    view: string;
    
    icon:string;
    isRunning: boolean;
    error: string;

    metadata: {values:Array<any>} = {values:[]};
}

export class ELNDevice extends NitDevice{
    
}
