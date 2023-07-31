/**
 * @title Serial position recall task
 * @description This is a demo experiment based on the position recall task. 
 * @version 0.1.1
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// import plugins from jspsych
import preload from '@jspsych/plugin-preload';

// import setting
import { expInfo, jsPsych } from "./settings";

// import custom functions and screens
import { welcome_screen } from "./instructions/welcome";
import { consent_screen, notice_screen } from "./instructions/consent";
import { fullMode_screen } from "./instructions/funScreen";
import { exp_start_screen, pra_instr_screen, createBlockBreak} from "./instructions/InstrTrial";
import { random } from "./basic-fun/random";
import { chunkTrials } from "./basic-fun/chunkTrials";
import { createNewTrial } from "./trials/trialProcess";
import { createInstr } from "./instructions/InstrStart";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {

  // Initialize a timeline to hold the trials
  var timeline: any[] = [];

  // Preload assets
  const preload_screen = {
    type: preload,
    images: assetPaths.images,
    // audio: assetPaths.audio,
    // video: assetPaths.video,
  };

  // Instruction
  const instr_line = createInstr(4)

  /************************************** Experiment **************************************/

  // create a list of trials for each condition
  // nExpTrials: number of experiment trials for each condition
  // conditionList: list of setsizes 
  let exp_trials = Array(expInfo.nExpTrials).fill(expInfo.conditionList).flat();
  
  // randomize the order of trials (shuffle the list - Fisher-Yates algorithm)
  random.shuffle(exp_trials);

  // chunk trials into blocks: divide the experimental list into nBlock chunks
  const exp_chunks = chunkTrials(exp_trials, expInfo.nBlock);

  //declare the list that will hold the instructions and trials
  let exp_line:any[] = [];

  // push alter to begin the main phase of the experiment into the list
  exp_line.push(exp_start_screen);

  // Block
  for (var [block, block_trials] of exp_chunks.entries()) {

    // Trial
    for (let [index, setsize] of block_trials.entries()) {

      var trial_line = createNewTrial(setsize, 8, "experiment", block, index)

      exp_line = exp_line.concat(trial_line);

    };

    // break
    if (block + 1 < expInfo.nBlock) {

      var break_screen = createBlockBreak(block, expInfo.nBlock, 30);

      exp_line.push(break_screen);

    };
  };


  /************************************** Procedure **************************************/
 
  // TODO HANNAH: alters participant if they try to resize the window
  // addEventListener("resize", (event) => { alert("don't resize")});

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  timeline.push(consent_screen);
  timeline.push(notice_screen);

  
  timeline = timeline.concat(instr_line);
  timeline.push(fullMode_screen);
  timeline = timeline.concat(exp_line);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
