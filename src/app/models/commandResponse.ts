export interface CommandResponse{
    error: string;
    responses: Array<{response: string, prompt: string}>;
    time_processed: any;
    session_key: string
}