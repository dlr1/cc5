export interface Device{
    device_name: string;
    device_type: string;
    ip_address: string;
    market: string;
    ne_type: string;
    isLoggedOn?: boolean;
    connection:{prompt:string};
    session_key: string;
    context: string;   
    isExecuting?:boolean;
    terminal?:string;
}