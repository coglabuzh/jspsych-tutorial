/**
 * @title Removal-23-2
 * @description This experiment aims to explore the benefits of removal.
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";



// import plugins from jspsych
import fullscreen from '@jspsych/plugin-fullscreen';
import PreloadPlugin from "@jspsych/plugin-preload";

// import setting
import { expInfo, jsPsych } from "./setting";

// import screens and lines
import { welcome_screen } from "./Instruction/welcome";
import { consent_screen, notice_screen } from "./Instruction/consent";
import { exp_instr_screen, pra_instr_screen, createBlockBreak} from "./Instruction/InstrTrial";
import { random } from "./BasicFun/random";
import { chunkTrials } from "./BasicFun/chunkTrials";
import { createNewTrial } from "./Trials/trialProcess";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {

  var timeline:any[] = [];

  // Preload assets
  const preload_screen = {
    type: PreloadPlugin,
    images: assetPaths.images,
    audio: assetPaths.audio,
    video: assetPaths.video,
  };

  // Switch to fullscreen
  const fullMode_screen = {
    type: fullscreen,
    fullscreen_mode: true,
  }


  /************************************** Experiment **************************************/

  // preparation
  let exp_trials = Array(expInfo.nExpTrials).fill(expInfo.conditionList).flat();
  exp_trials = random.shuffle(exp_trials);
  const exp_chunks = chunkTrials(exp_trials, expInfo.nBlock);

  let exp_line:any[] = [];

  // push instructions
  exp_line.push(exp_instr_screen);

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


  // Push all the screen slides into timeline
  // timeline.push(preload_screen);
  timeline.push(welcome_screen);
  timeline.push(consent_screen);
  // timeline.push(notice_screen);
  // timeline.push(fullMode_screen);
  timeline = timeline.concat(exp_line);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
