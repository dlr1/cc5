export interface Variable{
    type:string;
    name:string;
    label:string;
    regex:string;
    required:boolean;
    placeholder:string;
    value:string
}

export interface Command{
    intrusiveness:string;
    name:string;
    snippets:Array<{text:string}>
    variables:Array<Variable>
}