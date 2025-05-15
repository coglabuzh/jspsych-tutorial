/**
 * @title Circle or Square
 * @description Participants are asked to identify the shape of a target (circle or square) and respond with the corresponding key.
 * @author Elena Venturi 
 * @version psychophysics_workshop
 *
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";

// Global variables
import { jsPsych } from "./jsp";

// screens
import { welcome_screen } from "./instructions/welcome";
import { consent_screen, notice_screen } from "./instructions/consent";
import { browser_screen } from "./instructions/browserCheck";
import { create_trialList } from "./trials/trialStim";
import { createNewTrial } from "./trials/trialProcess";
import { expInfo } from "./settings";
import { instructions_screen, pra_instr_screen, exp_start_screen } from "./instructions/InstrStart";

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

  /************************************** Instruction **************************************/


  /************************************** Practice **************************************/
  const prac_list = create_trialList();

  let practice_line: any[] = [];
  for (let j = 0; j < expInfo.DESIGN.nPRACTICE; j++) {
    let practice_trial = createNewTrial(
      j,
      true,
      prac_list[j].form,
      prac_list[j].X,
      prac_list[j].Y,
      prac_list[j].stimulus
    );
    practice_line = practice_line.concat(practice_trial);
  }

  /************************************** Experiment **************************************/
const exp_list = create_trialList();

let experiment_line: any[] = [];
for (let j = 0; j < expInfo.DESIGN.nTRIALS; j++) {
  let experiment_trial = createNewTrial(
    j,
    false,
    exp_list[j].form,
    exp_list[j].X,
    exp_list[j].Y,
    exp_list[j].stimulus
  );
  experiment_line = experiment_line.concat(experiment_trial);
}
  /************************************** Procedure **************************************/


  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  timeline.push(browser_screen);
  timeline.push(instructions_screen);
  timeline.push(pra_instr_screen);
  timeline = timeline.concat(practice_line);
  timeline.push(exp_start_screen);
  timeline = timeline.concat(experiment_line);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
