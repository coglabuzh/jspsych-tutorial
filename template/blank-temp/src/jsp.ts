import { track_interactions } from "./basic-fun/attentionCheck";
import { setCSS } from "./task-fun/setCSS";
import { varGlobal } from "./settings";
setCSS();

// Initialize JsPsych
import { initJsPsych } from "jspsych";

export const jsPsych = initJsPsych({
  /*
    // checking the size of window
    exclusions: {
        min_width: Math.max(screen.width * 0.9, 1200), // minimum width of the window
        min_height: Math.max(screen.height * 0.75, 550) // minimum height of the window
    },
    */

  // check whether participants leave the window or not during the experiment
  on_interaction_data_update: function () {
    track_interactions(varGlobal, "FailedAttention", true); // For some weird reason, this function does not work if you write out the name of each variable.
  },
});
