export interface CommandResponse{
    error: string;
    commands: Array<{name:string}>;
    responses: Array<{response: string, prompt: string}>;
    time_processed: any;
    session_key: string
}