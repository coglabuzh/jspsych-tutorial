import { JsPsychData } from "./modules/data";
import { PluginAPI } from "./modules/plugin-api";
import * as randomization from "./modules/randomization";
import * as turk from "./modules/turk";
import * as utils from "./modules/utils";
export declare class JsPsych {
    extensions: any;
    turk: typeof turk;
    randomization: typeof randomization;
    utils: typeof utils;
    data: JsPsychData;
    pluginAPI: PluginAPI;
    version(): any;
    /**
     * options
     */
    private opts;
    /**
     * experiment timeline
     */
    private timeline;
    private timelineDescription;
    private global_trial_index;
    private current_trial;
    private current_trial_finished;
    private DOM_container;
    private DOM_target;
    /**
     * time that the experiment began
     */
    private exp_start_time;
    /**
     * is the experiment paused?
     */
    private paused;
    private waiting;
    /**
     * is the page retrieved directly via file:// protocol (true) or hosted on a server (false)?
     */
    private file_protocol;
    /**
     * Promise that is resolved when `finishExperiment()` is called
     */
    private finished;
    private resolveFinishedPromise;
    /**
     * is the experiment running in `simulate()` mode
     */
    private simulation_mode;
    /**
     * simulation options passed in via `simulate()`
     */
    private simulation_options;
    webaudio_context: AudioContext;
    internal: {
        /**
         * this flag is used to determine whether we are in a scope where
         * jsPsych.timelineVariable() should be executed immediately or
         * whether it should return a function to access the variable later.
         *
         **/
        call_immediate: boolean;
    };
    constructor(options?: any);
    /**
     * Starts an experiment using the provided timeline and returns a promise that is resolved when
     * the experiment is finished.
     *
     * @param timeline The timeline to be run
     */
    run(timeline: any[]): Promise<void>;
    simulate(timeline: any[], simulation_mode?: "data-only" | "visual", simulation_options?: {}): Promise<void>;
    getProgress(): {
        total_trials: number;
        current_trial_global: number;
        percent_complete: number;
    };
    getStartTime(): any;
    getTotalTime(): number;
    getDisplayElement(): HTMLElement;
    getDisplayContainerElement(): HTMLElement;
    finishTrial(data?: {}): void;
    endExperiment(end_message?: string, data?: {}): void;
    endCurrentTimeline(): void;
    getCurrentTrial(): any;
    getInitSettings(): any;
    getCurrentTimelineNodeID(): any;
    timelineVariable(varname: string, immediate?: boolean): any;
    getAllTimelineVariables(): any;
    addNodeToEndOfTimeline(new_timeline: any, preload_callback?: any): void;
    pauseExperiment(): void;
    resumeExperiment(): void;
    loadFail(message: any): void;
    getSafeModeStatus(): boolean;
    getTimeline(): any[];
    private prepareDom;
    private loadExtensions;
    private startExperiment;
    private finishExperiment;
    private nextTrial;
    private doTrial;
    private evaluateTimelineVariables;
    private evaluateFunctionParameters;
    private replaceFunctionsWithValues;
    private setDefaultValues;
    private checkExclusions;
    private drawProgressBar;
    private updateProgressBar;
    private progress_bar_amount;
    setProgressBar(proportion_complete: any): void;
    getProgressBarCompleted(): number;
}
