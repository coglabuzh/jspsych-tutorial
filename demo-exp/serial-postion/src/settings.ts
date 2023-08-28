
import { track_interactions } from "./basic-fun/attentionCheck";
import { setCSS } from "./task-fun/setCSS";

setCSS();

// Initialize JsPsych
import { initJsPsych } from "jspsych";


export const jsPsych = initJsPsych({

    // check whether participants leave the window or not during the experiment
    on_interaction_data_update: function () {
        
        track_interactions(varGlobal, "FailedAttention", true); // For some weird reason, this function does not work if you write out the name of each variable.
      
    }
});


export const expInfo = {
    nExpTrials: 1, // number of experiment trials for each condition
    nBlock: 1, // number of blocks
    nBoxes: 8, // number of boxes
    conditionList: [4, 5, 6, 7, 8],
    presentationTime: 1000, // presentation time of each stimulus
    ISI: 500, // inter-stimulus interval
    wordPlusISI: 1000+500, // time between two stimuli = ISI + presentation time

    startDuration: 10 * 1000, // time for the countdown before a new trial starts
    ITI: 1000, // inter-trial interval
    breakDuration: 30, // break duration
    retrievalTime: 20 * 1000, // time for retrieval
    debriefTime: 2000 // time for feedback


}

export const varGlobal = {
    TRACK: true, // 
    N_BLUR: 0, // use to count how many times participants left the browser
    MAX_BLUR: 3,
    QUIT: false,
    LOOP: true,
    RUN_JATOS: false,
    RUN_TIMER: false
}
