// jsPsych official plugin
import instructions from "@jspsych/plugin-instructions";
import htmlButtonResponse from "@jspsych/plugin-html-button-response";

// Global variables
import { TEXT } from "../task-fun/text";

// Functions for creating new trials
import { createNewTrial } from "../trials/trialProcess";

// Global variables
import { expInfo } from "../settings";
import { jsPsych } from "../jsp";




const loop_trial: any[] = createNewTrial(5, expInfo.DESIGN.nBOXES, "practice", 0, 0);

const slide_line = {
  type: instructions,
  pages: function () {
    const instr1 = `<div class="main">
    <img src="assets/images/instruction-${expInfo.LANG}/MemoryPhase.gif" class="image"></img>
    </div>`;

    const instr2 = `<div class="main">
    <img src="assets/images/instruction-${expInfo.LANG}/RetrievalPhase.gif" class="image"></img>
    </div>`;

    return [instr1, instr2];
  },
  show_clickable_nav: true,
  button_label_previous: function () {
    return TEXT.prevButton[expInfo.LANG];
  },
  button_label_next: function () {
    return TEXT.nextButton[expInfo.LANG];
  },
  data: { screenID: "instruction" },
};

export function createInstr(
  nCorrect: number = NaN,
  duration: number[] | typeof NaN = NaN
) {
  const instr_line = {
    timeline: [slide_line].concat(loop_trial),
    loop_function: function () {
      var accuracy = jsPsych.data
        .get()
        .last(7)
        .filter({ screenID: "retrieval", acc: true })
        .count();
      var mean_RT = jsPsych.data
        .get()
        .last(10)
        .filter({ screenID: "retrieval" })
        .select("rt")
        .mean();

      let acc_return = false;
      let RT_return = false;

      if (accuracy >= nCorrect || Number.isNaN(nCorrect)) acc_return = true;
      if (
        (mean_RT > duration[0] && mean_RT < duration[1]) ||
        Number.isNaN(duration)
      )
        RT_return = true;

      if (acc_return && RT_return) {
        // stop loop
        return false;
      } else {
        return true;
      }
    },
  };

  return instr_line;
}

export const exp_start_screen = {
  type: htmlButtonResponse,
  stimulus: function () {
    return TEXT.startExperiment[expInfo.LANG];
  },
  choices: function () {
    return TEXT.continueButton[expInfo.LANG];
  },
};

export const pra_instr_screen = {
  type: htmlButtonResponse,
  stimulus: function () {
    return TEXT.startPractice[expInfo.LANG];
  },
  choices: function () {
    return TEXT.continueButton[expInfo.LANG];
  },
};
