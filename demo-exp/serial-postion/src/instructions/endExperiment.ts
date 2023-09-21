
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { jsPsych, varGlobal } from "../settings";

export const end_screen = {
    type: htmlKeyboardResponse,
    stimulus: `<div class="main">
    <h1 class="title">Congratulations!</h1>
    <p class='body-center'>
      You have successfully completed this round of experiments. Now you can close the experiment window directly.
    </p>
    </div>`,
    choices: [" "],
    trial_duration: 10*1000,
    data: { screen_id: "end" },
    on_finish: function () {

        varGlobal.TRACK = false;

      jsPsych.endExperiment("The experiment is over! Please close the window.");

    },
  };