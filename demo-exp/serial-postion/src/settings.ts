/**
 * This file contains the settings for the experiment.
 */

// Basic Functions
import { convertCase } from "./basic-fun/convertCase";
import { generateArray } from "./basic-fun/sequence";

// Task functions
import { setCSS } from "./task-fun/setCSS";


setCSS();

export const expInfo = {
  // settings for the experiment
  TITLE: "serial_position",
  nTRIALS: 1, // number of experiment trials for each condition
  nBLOCKS: 1, // number of blocks
  nBOXES: 8, // number of boxes
  CONDITIONS: [5, 6, 7, 8],

  // settings for each trial
  TIMING: {
    STIMULUS: 1000, // presentation time of each stimulus in milliseconds
    ISI: 500, // inter-stimulus interval in milliseconds
    START: 10 * 1000, // time for the countdown before a new trial starts
    ITI: 1000, // inter-trial interval
    BREAK: 30, // break duration in seconds
    RETRIEVAL: 20 * 1000, // time for retrieval
    DEBRIEF: 2000, // time for feedback
  },

  // when using Prolific, you can set customized completion codes for different situations
  // e.g., when participants complete the experiment, or when they fail the attention check
  // you can set them here and use them in the end of the experiment (jsp.ts)
  CODES: {
    SUCCESS: "success", // the code for a successfully completion of the experiment
    FAIL: "fail", // the code for the failed experiment
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
    ALLOW_KEYS: convertCase(generateArray.alphabet(false)), // Both lower case letters and upper case letters are allowed.
    START_TRIAL: [" "],
  },

  // If you want to use the keyCode rather than key name,
  // you can go to the following link to get the key code:
  // https://www.toptal.com/developers/keycode/

  // The size of the elements in canvas
  SIZE: {
    WIDTH_ADJUSTMENT: 0.9, // Set the width of the canvas as 90% of the window's width.
    STIM_RADIUS: 0.33, // The radius of the box circle.
    BOX_WIDTH: 0.175, // The width of the box.
},

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
  FAILED_ATTENTION_CHECK: false,
};
