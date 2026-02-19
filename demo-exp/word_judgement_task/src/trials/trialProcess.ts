// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";

// Third party plugins
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { jsPsych } from "../jsp";



/**
 * A function used to create a single trial.
 * @param XY The number of items in a trial.
 * @param targetStim The stimulus of a trial.
 * @param isPractice A boolean value indicating whether the trial is a practice trial or not.
 *
 * @returns An array containing all the slides of a trial.
 */
export function createNewTrial(XY: number, isPractice: boolean, animacy: number, targetStim: string) {  
  let trial_line: any[] = [];

  // Fixation Screen
  const fixation_screen = {
    type: htmlKeyboardResponse,
    stimulus: "<div style='font-size:60px;'>+</div>",
    choices: "NO-KEYS",
    trial_duration:
      expInfo.TIMING.FIXATION_MIN +
      Math.floor(Math.random() * (expInfo.TIMING.FIXATION_MAX - expInfo.TIMING.FIXATION_MIN + 1)),
  };

  // Target and Response Screen
  const target_response_screen = {
    type: htmlKeyboardResponse,
    stimulus: `<div style='font-size:50px;'> ${targetStim} </div>`,
    choices: expInfo.DESIGN.CHOICES, 
    mapping: {
      animate: expInfo.DESIGN.CHOICES[expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.indexOf("animate")]], 
      inanimate: expInfo.DESIGN.CHOICES[expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.indexOf("inanimate")]],
    },
    trial_duration: expInfo.TIMING.STIMULUS,
    response_ends_trial: true,
    data: {
      trial_number: XY,
      animacy: animacy,
      procedure: isPractice ? "practice" : "test",
      stimulus: targetStim,
    },
    on_finish: function (data) {
      let correct = // did the participant respond correctly? does the response match the right key? 
        data.response ==
        (data.animacy == 1 ? this.mapping.animate : this.mapping.inanimate);  
      let correctKey = // which key was correct?
        data.animacy == 1 ? this.mapping.animate : this.mapping.inanimate; 
      jsPsych.data
        .get()
        .addToLast({ correct: correct, correct_key: correctKey }); // let's add this information to the data
    },
  };

  // Feedback Stimuls for Practice Trials
  const feedback = {
    type: htmlKeyboardResponse,
    stimulus: function () {
      let lastTrialCorrect = jsPsych.data.get().last(1).values()[0].correct;
      if (lastTrialCorrect) {
        return "<div style='font-size:60px; color:green;'>correct :)</div>";
      } else {
        return "<div style='font-size:60px; color:red'>wrong :(</div>";
      }
    },
    trial_duration: expInfo.TIMING.FEEDBACK,
  };

  // Inter Trial Interval Screen
  const inter_trial_interval = {
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO-KEYS",
    trial_duration:
      expInfo.TIMING.ITI_MIN +
      Math.floor(Math.random() * (expInfo.TIMING.ITI_MAX - expInfo.TIMING.ITI_MIN + 1)),
  };


  // Push screens into trial_line
  if (isPractice) {
    trial_line.push(
      fixation_screen,
      target_response_screen,
      feedback,
      inter_trial_interval
    );
  } else {
    trial_line.push(
      fixation_screen,
      target_response_screen,
      inter_trial_interval
    );
  }

  // return
  return trial_line;
}
