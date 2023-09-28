// jsPsych official plugin
import instructions from "@jspsych/plugin-instructions";

// Functions for creating new trials
import { createNewTrial } from "../trials/trialProcess";

// Global variables
import { expInfo } from "../settings";
import { jsPsych } from "../jsp";


const instr1 = `<div class="main">
<img src="assets/Images/MemoryPhase.gif" class="image"></img>
</div>`;

const instr2 = `<div class="main">
<img src="assets/Images/RetrievalPhase.gif" class="image"></img>
</div>`;

const loop_trial: any[] = createNewTrial(5, expInfo.nBOXES, "practice", 0, 0);

const slide_line = {
  type: instructions,
  pages: [instr1, instr2],
  show_clickable_nav: true,
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
