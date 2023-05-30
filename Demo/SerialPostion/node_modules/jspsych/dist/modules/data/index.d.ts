import { JsPsych } from "../../JsPsych";
import { DataCollection } from "./DataCollection";
export declare class JsPsychData {
    private jsPsych;
    private allData;
    private interactionData;
    private dataProperties;
    private query_string;
    constructor(jsPsych: JsPsych);
    reset(): void;
    get(): DataCollection;
    getInteractionData(): DataCollection;
    write(data_object: any): void;
    addProperties(properties: any): void;
    addDataToLastTrial(data: any): void;
    getDataByTimelineNode(node_id: any): DataCollection;
    getLastTrialData(): DataCollection;
    getLastTimelineData(): DataCollection;
    displayData(format?: string): void;
    urlVariables(): any;
    getURLVariable(whichvar: any): any;
    createInteractionListeners(): void;
    _customInsert(data: any): void;
    _fullreset(): void;
}
