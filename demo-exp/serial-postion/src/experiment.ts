/**
 * @title Serial position recall task
 * @description This is a demo experiment based on the position recall task.
 * @author Chenyu Li and Hannah (Dames) Tschannen
 * @version 0.2.0
 * 
 *
 * @assets assets/
 */


// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";

// Basic Functions
import { random } from "./basic-fun/random";
import { chunkTrials } from "./basic-fun/chunkTrials";

// Functions for creating new trials
import { createNewTrial } from "./trials/trialProcess";

// Global variables
import { expInfo } from "./settings";
import { jsPsych } from "./jsp";

// screens
import { welcome_screen } from "./instructions/welcome";
import { consent_screen, notice_screen } from "./instructions/consent";
import { fullMode_screen } from "./instructions/fullScreen";
import { browser_screen } from "./instructions/browserCheck";
import { exp_start_screen, createBlockBreak } from "./instructions/InstrTrial";
import { createInstr } from "./instructions/InstrStart";



/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({
  assetPaths,
  input = {},
  environment,
  title,
  version,
}) {
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
  const instr_line = createInstr(4);

  /************************************** Experiment **************************************/

  /** Step 1: Create trial list based on desired combination of conditions in experiment **/

  // create a list of trials for each condition
  // nExpTrials: number of experiment trials for each condition
  // conditionList: list of setsizes
  let exp_trials = Array(expInfo.nTRIALS).fill(expInfo.CONDITIONS).flat();

  // randomize the order of trials (shuffle the list - Fisher-Yates algorithm)
  random.shuffle(exp_trials);

  // chunk trials into blocks: divide the experimental list into nBlock chunks
  const exp_chunks = chunkTrials(exp_trials, expInfo.nBLOCKS);

  /** Step 2: Based on  trial list create the code for displaying the information **/

  //declare the list that will hold the instructions and trials
  let exp_line: any[] = [];

  // push alter to begin the main phase of the experiment into the list
  exp_line.push(exp_start_screen);

  // Following loops will create the experiment trials
  // loop through the blocks (outer loop)
  // block: index of the block
  // block_trials: list of trials in the block
  for (var [iBlock, block_trials] of exp_chunks.entries()) {
    // within each block, loop through the trials (inner loop)
    for (let [iTrial, setsize] of block_trials.entries()) {
      var trial_line = createNewTrial(
        setsize,
        expInfo.nBOXES,
        "experiment",
        iBlock,
        iTrial
      );

      exp_line = exp_line.concat(trial_line);
    }

    // Insert a break between the blocks
    if (iBlock + 1 < expInfo.nBLOCKS) {
      var break_screen = createBlockBreak(
        iBlock,
        expInfo.nBLOCKS,
        expInfo.TIMING.BREAK
      );

      exp_line.push(break_screen);
    }
  }

  /************************************** Procedure **************************************/

  // TODO HANNAH: alters participant if they try to resize the window
  // addEventListener("resize", (event) => { alert("don't resize")});

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want

  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  timeline.push(consent_screen);
  timeline.push(notice_screen);
  timeline.push(browser_screen);
  timeline = timeline.concat(instr_line);
  timeline.push(fullMode_screen);
  timeline = timeline.concat(exp_line);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
