import { track_interactions } from "./basic-fun/attentionCheck";
import { setCSS } from "./task-fun/setCSS";

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

export const expInfo = {
  nExpTrials: 1, // number of experiment trials for each condition
  nBlock: 1, // number of blocks
  nBoxes: 8, // number of boxes
  conditionList: [4, 5, 6, 7, 8],
  presentationTime: 1000, // presentation time of each stimulus
  ISI: 500, // inter-stimulus interval

  startDuration: 10 * 1000, // time for the countdown before a new trial starts
  ITI: 1000, // inter-trial interval
  breakDuration: 30 * 1000, // break duration
  retrievalTime: 20 * 1000, // time for retrieval
  debriefTime: 2000, // time for feedback
};

export const varGlobal = {
  TRACK: false, //
  N_BLUR: 0, // use to count how many times participants left the browser
  MAX_BLUR: 3,
  QUIT: false,
  LOOP: true,
  RUN_JATOS: false,
  RUN_TIMER: false,

  KEYS: {
    CONTINUE: "enter",
    LEFT: "s",
    RIGHT: "l",
  },
  KEYS_JS: {
    CONTINUE: 13,
    BACK: 90,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    LEFT: 83,
    RIGHT: 76,
  },
};
