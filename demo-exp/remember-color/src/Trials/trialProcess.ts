import psychophysics from "../BasicFun/Psychophysics"
import { colorFrames } from "./elements";
import { random } from "../BasicFun/random";
import { jsPsych } from "../setting";
import { sequence } from "../BasicFun/sequence";
import { trial_start_screen } from "../Instruction/InstrTrial";
import {filterNumbersAround} from "../BasicFun/gridOperation"
import { hslToHex } from "../BasicFun/convertColor";
import { drawColorWheel } from "../BasicFun/colorWheel";
import { calAngle } from "../BasicFun/calculateAngle";


/**
 * This function creates a main object that will be displayed on the screen.
 * @param {number} num The number of item boxes to generate.
 * @param {string} procedure The name of the current procedure
 * @param {number} blockID The number of the current block
 * @param {number} trialID The number of the current trial
 * @param {logical} special A logical object. If true, a fixed alphabet-array would be used.
 */
class trialStim {

  nBox: number; // Number of boxes
  setsize: number; // Number of stimulus
  procedure: string; // Procedure type
  block: number; // Block ID
  trial: number; // Trial ID
  stim: any[]; // Array of stimulus objects
  canW: number; // Width of the canvas
  canH: number; // Height of the canvas
  center: number[]; // Center position of the stimuli object
  radius: number; // Radius of the stimuli object
  ncol: number; // Number of columns in the grid
  width: number; // Width of each stimulus
  pos_list: any[]; // List of positions of the stimuli
  color_list: any[]; // List of colors of the stimuli

  constructor(setsize: number, procedure: string = 'experiment', blockID: number = 0, trialID: number = 0) {
    // These variables define parameters of the stimuli object.
    this.setsize = setsize;
    this.procedure = procedure;
    this.block = blockID;
    this.trial = trialID;

    // These variables define the size and position of the stimuli object on the screen.
    this.canW = Math.min(screen.width, screen.height / 9 * 16) * 0.9;
    this.canH = this.canW * 0.5;
    this.center = [this.canW / 2, this.canH / 2];
    this.radius = this.canH * 0.45;
    this.ncol = 10;
    this.width = this.canH * 0.8 * 0.65 / this.ncol;

    // choose positions and colors for the stimuli
    let numSeries = sequence.number(1, this.ncol * this.ncol);
    let angleSeries = sequence.number(0, 360);
    const pos_list:any[] = [];
    const color_list:any[] = [];

    for (let i = 0; i < this.setsize; i++) {

      var targetPos = random.sample(numSeries, 1)[0];
      var targetColor = random.sample(angleSeries, 1)[0];

      pos_list.push(targetPos);
      color_list.push(targetColor);

      // remove the selected number from the array
      numSeries = filterNumbersAround(numSeries, targetPos, this.ncol, 1);
      angleSeries = filterNumbersAround(angleSeries, targetColor, 360, 24);
    
    }

    // convert the number in the grid to a coordinate
    this.pos_list = pos_list.map(x => {

      let button_row = Math.floor( x / this.ncol);
      let button_col = x % this.ncol;

      let button_x = this.canW/2 + this.width * (button_row - (this.ncol + 1)/2);
      let button_y = this.canH/2 + this.width * (button_col - (this.ncol + 1)/2);

      return [button_x, button_y];
      });

      // convert the angle to a color (HEX)
      this.color_list = color_list.map(x => hslToHex(x, 85, 50));

  }

  // A function used to display items in sequence.
  memoryPhase() {}

  // Ask participants to recall the items.
  retrievalPhase() {}

  // return a feedback screen to participants.
  debriefPhase() {}
  
}

/** A function used to display items in sequence.
 * 
 * @returns {Object} An object containing the screens to be presented.
 */
trialStim.prototype.memoryPhase = function () {

  // draw the color blocks
  const color_block = colorFrames(this.pos_list, this.color_list, this.width);

  // Define a new object called "stim_screen" with various properties
  let stim_screen = {
    type: psychophysics,
    background_color: 'grey',
    canvas_width: this.canW,
    canvas_height: this.canH,
    stimuli: color_block,
    response_type: 'key',
    choices: 'NO_KEYS',
    trial_duration: 1000,
    data: {
      screenID: 'memory',
      procedure: this.procedure,
      blockID: this.block,
      trialID: this.trial,
      setsize: this.setsize,
    }
  };

  // Return the array of screens.
  return [stim_screen];
};

/** Ask participants to recall the items.
 * 
 * @returns {Object} An object containing the screens to be presented.
 */
trialStim.prototype.retrievalPhase = function () {

  // draw the color wheel
  const color_wheel = drawColorWheel(this.radius, 0.85, this.center);

  // draw the color blocks
  const color_block = colorFrames([this.pos_list[0]], ["grey"], this.width);

  //@ts-ignore presented stim 
  const presented_stim = [color_wheel].concat(color_block);

  var win_center = this.center;
  var change_color = false;
  
  // Define a new object called "stim_screen" with various properties
  let stim_screen = {
    type: psychophysics,
    background_color: 'grey',
    canvas_width: this.canW,
    canvas_height: this.canH,
    stimuli: presented_stim,
    response_type: 'key',
    choices: ' ',
    trial_duration: 20*1000,
    data: {
      screenID: 'retrieval',
      procedure: this.procedure,
      blockID: this.block,
      trialID: this.trial,
      setsize: this.setsize,
    },
    mouse_down_func: function (e) {

      change_color = true;

      let current_angle = calAngle(e.offsetX, e.offsetY, win_center);
      let current_color = hslToHex(current_angle, 85, 50);

      // change the color of the block
      jsPsych.getCurrentTrial().stim_array[1].fill_color = current_color;

      // save the response
      jsPsych.getCurrentTrial().data.response = current_color

    },
    mouse_move_func: function (e) {

      let current_angle = calAngle(e.offsetX, e.offsetY, win_center);
      let current_color = hslToHex(current_angle, 85, 50);

      if (change_color) {
        // change the color of the block
        jsPsych.getCurrentTrial().stim_array[1].fill_color = current_color;

        // save the response
        jsPsych.getCurrentTrial().data.response = current_color
      };

    },
    mouse_up_func: function (e) {
      if(change_color) change_color = false;
    }
  
  };

  return [stim_screen];

};


/* debrief */
// trialStim.prototype.debriefPhase = function () {

//   var ret_list = getIndex(this.stim, "#", false);
//   var nTest = ret_list.length;

//   var display_screen = {
//     type: htmlKeyboardResponse,
//     trial_duration: 2000,
//     stimulus: function () {
//       var accuracy = jsPsych.data.get().last(nTest + 1).filter({ screenID: "retrieval", acc: true }).count();
//       return `<div class='fb-text'>You correctly recalled ${accuracy} out of ${nTest} letters.</div>`;
//     },
//     choices: 'NO_KEYS',
//     data: {
//       screenID: "debrief",
//       procedure: this.procedure,
//       blockID: this.block,
//       trialID: this.trial,
//       setsize: this.setsize
//     }
//   };
//   return display_screen;
// };


/**
 * A function used to create a single trial.
 * @param setsize the size of the stimulus
 * @param nBox the number of the boxes that will be displayed on the screen
 * @param procedure the name of the procedure
 * @param blockID the number of the block ID
 * @param trialID the number of the trial ID
 * @returns 
 */
export function createNewTrial(setsize: number, procedure: string = 'Experiment', blockID: number = 0, trialID: number = 0): string[] {

  var trial_line: any[] = [];
  // create a trial object
  var trial_body = new trialStim(setsize, procedure, blockID, trialID);
  // preparation screen
  trial_line.push(trial_start_screen);
  // first memory phase
  var memory_phase = trial_body.memoryPhase();
  trial_line = trial_line.concat(memory_phase);
  // retrieval phase
  var retrieval_phase = trial_body.retrievalPhase();
  trial_line = trial_line.concat(retrieval_phase);
  // debrief phase
  // var debrief_phase = trial_body.debriefPhase();
  // trial_line.push(debrief_phase);
  // return
  return trial_line;
}