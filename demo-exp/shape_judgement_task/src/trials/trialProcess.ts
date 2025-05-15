// Purpose: Functions for generating stimuli and creating elements

// Global variables
import { expInfo } from "../settings";

// Third party plugins
import psychophysics from "@kurokida/jspsych-psychophysics";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { jsPsych } from "../jsp";


/**
 * A function used to create a single trial.
 * @param XY The number of items in a trial.
 *
 * @returns An array containing all the slides of a trial.
 */
export function createNewTrial(XY: number, isPractice: boolean, form: string, posX: number, posY: number, targetStim: any): string[] {
  var trial_line: any[] = [];

  // Fixation Screen
  const fixation_screen = {
    type: htmlKeyboardResponse,
    stimulus: "<div style='font-size:60px;'>+</div>",
    choices: "NO-KEYS",
    trial_duration:
      expInfo.TIMING.FIXATION_MIN + Math.random() * (expInfo.TIMING.FIXATION_MAX - expInfo.TIMING.FIXATION_MIN),
  };

  // Target Screen
  const target_screen = {
    type: psychophysics,
    stimuli: targetStim,
    choices: expInfo.DESIGN.CHOICES,
    mapping: {
      circle: expInfo.DESIGN.CHOICES[expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.indexOf("circle")]],
      square: expInfo.DESIGN.CHOICES[expInfo.DESIGN.MAPPING[expInfo.DESIGN.CONDITIONS.indexOf("square")]],
    },
    background_color: expInfo.DESIGN.backgroundCOLOR, // white background
    response_ends_trial: true,
    trial_duration: expInfo.TIMING.TARGET,
    data: {
      trial_number: XY,
      condition: form,
      procedure: function () {
        if (isPractice) {
          return "practice";
        } else {
          return "experiment";
        }
      },
    },
    on_finish: function (data) {
      let correct =
        data.response ==
        (data.condition == "circle" ? this.mapping.circle : this.mapping.square);
        console.log("Correct: ", correct);
      let correctKey = 
      data.condition == "circle" ? this.mapping.circle : this.mapping.square;
      jsPsych.data
        .get()
        .addToLast({ correct: correct, correct_key: correctKey });
    },
  };

  // Feedback Screen
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

  /// Inter Trial Interval Screen
  const inter_trial_interval = {
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO-KEYS",
    trial_duration: expInfo.TIMING.ITI_MIN + Math.random() * (expInfo.TIMING.ITI_MAX - expInfo.TIMING.ITI_MIN),
  };

  // Push screens into trial_line

  if (isPractice) {
    trial_line.push(
      fixation_screen,
      target_screen,
      feedback,
      inter_trial_interval
    );
  } else {
    trial_line.push(
      fixation_screen, 
      target_screen, 
      inter_trial_interval);
  }

  // return
  return trial_line;
}
