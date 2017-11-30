export interface Variable{
    type:string;
    name:string;
    label:string;
    regex:string;
    required:boolean;
    placeholder:string;
    values:Array<any>;
}
