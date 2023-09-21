import { track_interactions } from "./basic-fun/attentionCheck";
import { setCSS } from "./task-fun/setCSS";
import { varGlobal } from "./settings";

setCSS();

// Initialize JsPsych
import { initJsPsych } from "jspsych";

export const jsPsych = initJsPsych({
  // check whether participants leave the window or not during the experiment
  on_interaction_data_update: function () {
    track_interactions(varGlobal, "FailedAttention", true); // For some weird reason, this function does not work if you write out the name of each variable.
  },
});
