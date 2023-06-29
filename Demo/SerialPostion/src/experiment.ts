/**
 * @title Serial position recall task
 * @description This is a demo experiment based on the position recall task. 
 * @version 0.1.1
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

// import plugins from jspsych
import preload from '@jspsych/plugin-preload';

// import setting
import { expInfo, jsPsych } from "./setting";

// import screens and lines
import { welcome_screen } from "./Instruction/welcome";
import { consent_screen, notice_screen } from "./Instruction/consent";
import { fullMode_screen } from "./Instruction/funScreen";
import { exp_instr_screen, pra_instr_screen, createBlockBreak} from "./Instruction/InstrTrial";
import { random } from "./BasicFun/random";
import { chunkTrials } from "./BasicFun/chunkTrials";
import { createNewTrial } from "./Trials/trialProcess";
import { createInstr } from "./Instruction/InstrStart";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {

  var timeline:any[] = [];


  // Preload assets
  const preload_screen = {
    type: preload,
    images: assetPaths.Images,
    // audio: assetPaths.audio,
    // video: assetPaths.video,
  };


  // Instruction
  const instr_line = createInstr(4)


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


  /************************************** Procedure **************************************/

  // Push all the screen slides into timeline
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
