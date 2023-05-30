/**
Flatten the type output to improve type hints shown in editors.
Borrowed from type-fest
*/
declare type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/**
Create a type that makes the given keys required. The remaining keys are kept as is.
Borrowed from type-fest
*/
declare type SetRequired<BaseType, Keys extends keyof BaseType> = Simplify<Omit<BaseType, Keys> & Required<Pick<BaseType, Keys>>>;
/**
 * Parameter types for plugins
 */
export declare enum ParameterType {
    BOOL = 0,
    STRING = 1,
    INT = 2,
    FLOAT = 3,
    FUNCTION = 4,
    KEY = 5,
    KEYS = 6,
    SELECT = 7,
    HTML_STRING = 8,
    IMAGE = 9,
    AUDIO = 10,
    VIDEO = 11,
    OBJECT = 12,
    COMPLEX = 13,
    TIMELINE = 14
}
declare type ParameterTypeMap = {
    [ParameterType.BOOL]: boolean;
    [ParameterType.STRING]: string;
    [ParameterType.INT]: number;
    [ParameterType.FLOAT]: number;
    [ParameterType.FUNCTION]: (...args: any[]) => any;
    [ParameterType.KEY]: string;
    [ParameterType.KEYS]: string[] | "ALL_KEYS" | "NO_KEYS";
    [ParameterType.SELECT]: any;
    [ParameterType.HTML_STRING]: string;
    [ParameterType.IMAGE]: string;
    [ParameterType.AUDIO]: string;
    [ParameterType.VIDEO]: string;
    [ParameterType.OBJECT]: object;
    [ParameterType.COMPLEX]: any;
    [ParameterType.TIMELINE]: any;
};
export interface ParameterInfo {
    type: ParameterType;
    array?: boolean;
    pretty_name?: string;
    default?: any;
    preload?: boolean;
}
export interface ParameterInfos {
    [key: string]: ParameterInfo;
}
declare type InferredParameter<I extends ParameterInfo> = I["array"] extends true ? Array<ParameterTypeMap[I["type"]]> : ParameterTypeMap[I["type"]];
declare type RequiredParameterNames<I extends ParameterInfos> = {
    [K in keyof I]: I[K]["default"] extends undefined ? K : never;
}[keyof I];
declare type InferredParameters<I extends ParameterInfos> = SetRequired<{
    [Property in keyof I]?: InferredParameter<I[Property]>;
}, RequiredParameterNames<I>>;
export declare const universalPluginParameters: {
    /**
     * Data to add to this trial (key-value pairs)
     */
    readonly data: {
        readonly type: ParameterType.OBJECT;
        readonly pretty_name: "Data";
        readonly default: {};
    };
    /**
     * Function to execute when trial begins
     */
    readonly on_start: {
        readonly type: ParameterType.FUNCTION;
        readonly pretty_name: "On start";
        readonly default: () => void;
    };
    /**
     * Function to execute when trial is finished
     */
    readonly on_finish: {
        readonly type: ParameterType.FUNCTION;
        readonly pretty_name: "On finish";
        readonly default: () => void;
    };
    /**
     * Function to execute after the trial has loaded
     */
    readonly on_load: {
        readonly type: ParameterType.FUNCTION;
        readonly pretty_name: "On load";
        readonly default: () => void;
    };
    /**
     * Length of gap between the end of this trial and the start of the next trial
     */
    readonly post_trial_gap: {
        readonly type: ParameterType.INT;
        readonly pretty_name: "Post trial gap";
        readonly default: any;
    };
    /**
     * A list of CSS classes to add to the jsPsych display element for the duration of this trial
     */
    readonly css_classes: {
        readonly type: ParameterType.STRING;
        readonly pretty_name: "Custom CSS classes";
        readonly default: any;
    };
    /**
     * Options to control simulation mode for the trial.
     */
    readonly simulation_options: {
        readonly type: ParameterType.COMPLEX;
        readonly default: any;
    };
};
export declare type UniversalPluginParameters = InferredParameters<typeof universalPluginParameters>;
export interface PluginInfo {
    name: string;
    parameters: {
        [key: string]: ParameterInfo;
    };
}
export interface JsPsychPlugin<I extends PluginInfo> {
    trial(display_element: HTMLElement, trial: TrialType<I>, on_load?: () => void): void | Promise<any>;
}
export declare type TrialType<I extends PluginInfo> = InferredParameters<I["parameters"]> & UniversalPluginParameters;
export declare type PluginParameters<I extends PluginInfo> = InferredParameters<I["parameters"]>;
export {};
