export declare class DataColumn {
    values: any[];
    constructor(values?: any[]);
    sum(): number;
    mean(): number;
    median(): any;
    min(): any;
    max(): any;
    count(): number;
    variance(): number;
    sd(): number;
    frequencies(): {};
    all(eval_fn: any): boolean;
    subset(eval_fn: any): DataColumn;
}
