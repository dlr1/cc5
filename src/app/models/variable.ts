
export interface Variable{
    type:string;
    name:string;
    label:string;
    regex_name?:string;
    required:boolean;
    placeholder:string;
    value:string,
    pattern?:RegExp;
    dataCommandRefreshFlag?:string;
    dataCommand?:string;
    dataParserName?:string;
    values:Array<{value:string}>;
    variable:string;    
    dataPivotVariable?:string;
    allow_blocked?:boolean;
    options?:Array<{label:string, value:string}>;
    checked?:string;
    unchecked?:string;
    field?: string;

}