/**
 * @title Serial position recall task
 * @description This is a demo experiment based on the position recall task. 
 * @version 0.1.1
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

// import setting
import { expInfo, jsPsych } from "./setting";

// import screens and lines
import { welcome_screen } from "./Instruction/welcome";
import psychophysics from "./BasicFun/Psychophysics"
import { drawColorWheel } from "./BasicFun/colorWheel"

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {

  var timeline:any[] = [];

  const colorWheel = drawColorWheel(300, 0.5, [1000, 500])

  console.log(colorWheel)

  const test_screen = {
    type: psychophysics,
    background_color: 'white',
    stimuli: [colorWheel],
    response_type: 'button',
    button_choices: ['&nbsp;Continue&nbsp;']
  };

  timeline.push(welcome_screen);
  timeline.push(test_screen);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
