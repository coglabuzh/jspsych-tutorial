
// jsPsych official plugin
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";

// Third party plugins
import psychophysics from "@kurokida/jspsych-psychophysics";

// Basic Functions
import { random } from "../basic-fun/random";
import { getIndex } from "../basic-fun/getIndex";
import { createButtonMatrix } from "../task-fun/setCSS";
import { generateArray } from "../basic-fun/sequence";

// Functions for generating stimuli and creating elements
import { generateStims } from "./trialStim";
import { stimBoxes } from "./elements";

// Global variables
import { jsPsych } from "../jsp";
import { expInfo } from "../settings";
let { KEYS,SIZE } = expInfo;

// screens
import { trial_start_screen } from "../instructions/InstrTrial";


/**
 * This function creates a main object that will be displayed on the screen.
 * @param {number} setsize The set-size.
 * @param {number} nBox The number of item boxes to generate.
 * @param {string} expPart The name of the experiment part (e.g. "practice" or "experiment").
 * @param {number} blockID The number of the current block
 * @param {number} trialID The number of the current trial
 * @param {logical} special A logical object. If true, a fixed alphabet-array would be used.
 */
class trialStim {
  nBox: number; // Number of boxes
  setsize: number; // Number of stimulus
  expPart: string; // Experiment part (e.g. "practice" or "experiment")
  block: number; // Block ID
  trial: number; // Trial ID
  stim: any[]; // Array of stimulus objects
  canW: number; // Width of the canvas
  canH: number; // Height of the canvas
  center: number[]; // Center position of the stimuli object
  radius: number; // Radius of the stimuli object
  width: number; // Width of each stimulus

  constructor(
    setsize: number,
    nBox: number = 8,
    expPart: string = "experiment",
    blockID: number = 0,
    trialID: number = 0
  ) {
    // These variables define parameters of the stimuli object.
    this.nBox = nBox;
    this.setsize = setsize;
    this.expPart = expPart;
    this.block = blockID;
    this.trial = trialID;

    // This creates an array with the correct answers. "#" represents a removed stimulus.
    this.stim = generateStims(setsize, nBox);

    // These variables define the size and position of the stimuli object on the screen.
    this.canW =
      Math.min(screen.width, (screen.height / 9) * 16) * SIZE.WIDTH_ADJUSTMENT;
    this.canH = this.canW * 0.5;
    this.center = [this.canW / 2, this.canH / 2];
    this.radius = this.canH * SIZE.STIM_RADIUS;
    this.width = this.canH * SIZE.BOX_WIDTH;
  }

  // A function used to display items in sequence.
  displayMemoryPhase() {}

  // Ask participants to recall the items.
  displayRetrievalPhase() {}

  // Ask participants to select correct option from the alternative matrix.
  displayRetrievalPhase2() {}

  // return a feedback screen to participants.
  displayDebriefPhase() {}
}

/** A function used to display items in sequence.
 *
 * @returns {Object} An object containing the screens to be presented.
 */
trialStim.prototype.displayMemoryPhase = function () {
  // Create an empty array called "phase_screens" to store the screens that will be presented.
  var phase_line: any[] = [];

  // Loop through each position in the "pos_list" array.
  for (let pos of Array(this.nBox).keys()) {
    // Create an empty array called "content".
    var content: any[] = [];

    // Set the value of the "pos" index in the "content" array to be the corresponding stimulus at that position in the "stim" array.
    content[pos] = this.stim[pos];

    // Create a new instance of the "stimBoxes" class
    var letter_boxes = stimBoxes(
      this.nBox,
      content,
      [],
      this.center,
      this.width,
      this.radius
    );

    // Set the start time and end time for the presentation of the letter at the current position in the "letter_boxes" array.
    letter_boxes[pos + 1].show_start_time = 0;
    letter_boxes[pos + 1].show_end_time = expInfo.TIMING.STIMULUS;

    // Define a new object called "stim_screen" with various properties
    let stim_screen = {
      type: psychophysics,
      background_color: "white",
      canvas_width: this.canW,
      canvas_height: this.canH,
      stimuli: letter_boxes,
      response_type: "key",
      choices: "NO_KEYS",
      trial_duration: expInfo.TIMING.ISI + expInfo.TIMING.STIMULUS,
      data: {
        screenID: "memory",
        expPart: this.expPart,
        blockID: this.block,
        trialID: this.trial,
        stepID: pos + 1,
        setsize: this.setsize,
        position: pos,
        initial_item: this.stim[pos],
      },
    };

    // Add the "stim_screen" object to the "phase_screens" array.
    phase_line.push(stim_screen);
  }

  // Return the array of screens.
  return phase_line;
};

/** Ask participants to recall the items.
 *
 * @returns {Object} An object containing the screens to be presented.
 */
trialStim.prototype.displayRetrievalPhase = function () {
  // updated these positions
  var phase_line: any[] = [];

  var asking_order = getIndex(this.stim, "#", false);
  random.shuffle(asking_order);

  for (let [index, pos] of asking_order.entries()) {
    let box_items: any[] = [];
    box_items[pos] = "?";

    var boxes = stimBoxes(
      this.nBox,
      box_items,
      [pos],
      this.center,
      this.width,
      this.radius
    );

    let stim_screen = {
      type: psychophysics,
      background_color: "white",
      canvas_width: this.canW,
      canvas_height: this.canH,
      stimuli: boxes,
      response_type: "key",
      trial_duration: expInfo.TIMING.RETRIEVAL,
      choices: KEYS.CONTINUE,
      key_down_func: function (event) {
        // get the value of the key that the participant pressed
        let key = event.key;
        //@ts-ignore if the key that participant pressed is allowed, display the key and save the result
        if (KEYS.ALLOW_KEYS.includes(key)) {
          jsPsych.getCurrentTrial().stim_array[
            pos + 1
          ].content = `${key.toUpperCase()}`;
          jsPsych.getCurrentTrial().data.response = key.toUpperCase();
          // if the key that participant pressed is "backspace", remove the answer from the screen and save the result
        } else if (key === "Backspace") {
          jsPsych.getCurrentTrial().stim_array[pos + 1].content = `?`;
          jsPsych.getCurrentTrial().data.response = "#";
          // if the key that participant pressed is a continue key, go to the next step
        } else if (KEYS.CONTINUE.includes(key)) {
          if (!jsPsych.getCurrentTrial().data.response) {
            jsPsych.getCurrentTrial().data.response = "#";
          }
        }
      },
      data: {
        screenID: "retrieval",
        expPart: this.expPart,
        blockID: this.block,
        trialID: this.trial,
        stepID: index + 1,
        setsize: this.setsize,
        position: pos,
        correct: this.stim[pos],
      },
      on_finish: function (data) {
        if (data.response) data.response = data.response.replace("enter", "#");
        data.acc = data.response === data.correct;
      },
    };

    phase_line.push(stim_screen);
  }
  return phase_line;
};

/** This function will display a retrieval screen and prompt participants
 * to choose the correct response from a matrix of alternatives.
 * In general, `data.response` refers to the index of the response in the `alter_array`.
 * We utilized the `on_finish` function to convert it into an item.
 *
 */
trialStim.prototype.displayRetrievalPhase2 = function () {
  // prepare for the alternative matrix
  const alpha_array = generateArray.alphabet(true);
  const NPL_pool = alpha_array.filter(
    (element) => !this.stim.includes(element)
  );
  const NPL_array = random.sample(NPL_pool, 16 - this.setsize);
  const Correct_array = this.stim.filter(function (element) {
    return element !== "#";
  });
  let alter_array = NPL_array.concat(Correct_array);
  random.shuffle(alter_array);

  // updated these positions
  var phase_line: any[] = [];

  var asking_order = getIndex(this.stim, "#", false);
  random.shuffle(asking_order);

  for (let [index, pos] of asking_order.entries()) {
    let box_items: any[] = [];
    box_items[pos] = "?";

    const newX = this.center[0] / 2;
    const newY = this.center[1];

    var boxes = stimBoxes(
      this.nBox,
      box_items,
      [pos],
      [newX, newY],
      this.width,
      this.radius
    );

    const buttonCSS = createButtonMatrix(4, 4);

    let stim_screen = {
      type: psychophysics,
      background_color: "white",
      canvas_width: this.canW,
      canvas_height: this.canH,
      stimuli: boxes,
      response_type: "button",
      trial_duration: expInfo.TIMING.RETRIEVAL,
      button_choices: alter_array,
      button_html: buttonCSS,
      data: {
        screenID: "retrieval",
        expPart: this.expPart,
        blockID: this.block,
        trialID: this.trial,
        stepID: index + 1,
        setsize: this.setsize,
        position: pos,
        correct: this.stim[pos],
      },
      on_finish: function (data) {
        // transform index to item
        if (data.response) data.response = alter_array[data.response];
        // compare the response to the correct item.
        data.acc = data.response === data.correct;
      },
    };

    phase_line.push(stim_screen);
  }
  return phase_line;
};

/* debrief */
trialStim.prototype.displayDebriefPhase = function () {
  var ret_list = getIndex(this.stim, "#", false);
  var nTest = ret_list.length;

  var display_screen = {
    type: htmlKeyboardResponse,
    trial_duration: expInfo.TIMING.DEBRIEF,
    stimulus: function () {
      var accuracy = jsPsych.data
        .get()
        .last(nTest + 1)
        .filter({ screenID: "retrieval", acc: true })
        .count();
      return `<div class='fb-text'>You correctly recalled ${accuracy} out of ${nTest} letters.</div>`;
    },
    choices: "NO_KEYS",
    data: {
      screenID: "debrief",
      expPart: this.expPart,
      blockID: this.block,
      trialID: this.trial,
      setsize: this.setsize,
    },
  };
  return display_screen;
};

/**
 * A function used to create a single trial.
 * @param setsize the set-size for a trial (how many words are displayed on the screen)
 * @param nBox the number of the boxes that will be displayed on the screen
 * @param expPart the name of the experimental part (e.g., 'experiment', 'practice')
 * @param blockID the number of the block ID
 * @param trialID the number of the trial ID
 *
 * @returns An array containing all the slides of a trial.
 */
export function createNewTrial(
  setsize: number,
  nBox: number = 8,
  expPart: string = "experiment",
  blockID: number = 0,
  trialID: number = 0
): string[] {
  var trial_line: any[] = [];
  // create a trial object
  var trial_body = new trialStim(setsize, nBox, expPart, blockID, trialID);
  // preparation screen
  trial_line.push(trial_start_screen);
  // first memory phase
  var memory_phase = trial_body.displayMemoryPhase();
  trial_line = trial_line.concat(memory_phase);
  // retrieval phase
  var retrieval_phase = trial_body.displayRetrievalPhase();
  trial_line = trial_line.concat(retrieval_phase);
  // debrief phase
  var debrief_phase = trial_body.displayDebriefPhase();

  trial_line.push(debrief_phase);
  // return
  return trial_line;
}
