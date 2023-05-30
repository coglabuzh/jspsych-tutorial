
import { control_browser_interactions } from "./BasicFun/attentionCheck";
import { setCSS } from "./TaskFun/setCSS";

setCSS();

// Initialize JsPsych
import { initJsPsych } from "jspsych";

export const jsPsych = initJsPsych({
    // checking the size of window
    exclusions: {
        min_width: Math.max(screen.width * 0.9, 1200), // minimum width of the window
        min_height: Math.max(screen.height * 0.75, 550) // minimum height of the window
    },

    // check whether participants leave the window or not during the experiment
    on_interaction_data_update: function () {
        control_browser_interactions();
      },
});


export const expInfo = {
    nExpTrials: 12, // number of experiment trials for each condition
    nBlock: 4, // number of blocks
    conditionList: [4, 5, 6, 7, 8]
}

export const varGlobal = {
    start_count: true, // 
    pause: false,
    n_blur: 0, // use to count how many times participants left the browser
    max_blur: 3,
    quit: false,
    loop: true,
    run_jatos: false,
    run_timer: false
}
