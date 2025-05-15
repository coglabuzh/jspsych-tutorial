/**
 * This file contains the settings for the experiment.
 */



// Task functions
import { setCSS } from "./task-fun/setCSS";


setCSS();

export const expInfo = {
  // settings for the experiment
  TITLE: "Word Processing Speed Task",
  LANG: "en", // the default language of the experiment

  // design of the experiment
  DESIGN: {
    nTRIALS: 20, // number of experiment trials for each condition
    nPRACTICE: 5, // number of practice trials
    nBLOCKS: 1, // number of blocks
    CONDITIONS: ["animate", "inanimate"], // the conditions of the experiment
    ANIMACY_VALUE: [0, 1], // how we code the animacy of the words
    CHOICES: ["d", "j"], // the keys for the responses 
    MAPPING: [0, 1]
  },

  // settings for each trial
  TIMING: {
    START: 10 * 1000, // time for the countdown before a new trial starts
    BREAK: 30, // break duration in seconds
    FIXATION_MIN: 600, // duration of the fixation cross
    FIXATION_MAX: 1000, // duration of the fixation cross
    STIMULUS: 5000, // duration of the stimulus
    ITI_MIN: 800, // duration of the inter-trial interval
    ITI_MAX: 1400, // duration of the inter-trial interval
    FEEDBACK: 1000, // duration of the feedback

  },

  // when using Prolific, you can set customized completion codes for different situations
  // e.g., when participants complete the experiment, or when they fail the attention check
  // you can set them here and use them in the end of the experiment (jsp.ts)
  CODES: {
    SUCCESS: "success", // the code for a successfully completion of the experiment
    OFFLINE: "offline", // the code for the offline situation
    FAILED_ATTENTION: "failedAttention", // the code for the failed experiment
    FAILED_OTHERS: "failedOthers", // the code for other failed situations (e.g., failed to resize the window)
    // You can specify the codes for different situations here.
  },

  /** The key is case-sensitive and position-sensitive.
   * It is recommended to allow both upper and lower case keys.
   * You can use the `convertCase` function to prevent the issue.
   * Be cautious, the names of the number keys on the top of the keyboard
   * are different from those on the right side of the keyboard.
   */
  KEYS: {
    CONTINUE: ["enter"],
    START_TRIAL: [" "],
  },

  // If you want to use the keyCode rather than key name,
  // you can go to the following link to get the key code:
  // https://www.toptal.com/developers/keycode/

  // Running environment variables
  RUN_JATOS: false, // a switch to run the experiment on JATOS
};

// Global variables for the system. Normally, you don't need to change them.
export const varSystem = {
  TRACK: false, // a switch to track participants' interactions with the browser
  nBLUR: 0, // use to count how many times participants left the browser
  MAX_BLUR: 3, // the maximum number of times participants can leave the browser
  LOOP: true, // a switch to control whether participants need to read the instruction and practice again
  RUN_TIMER: false, // a switch to control the countdown timer
  STATUS: "success", // the status of the experiment
};
