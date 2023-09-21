import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import { varGlobal } from "../settings";
import { jsPsych } from "../jsp";

export const end_screen = {
  type: htmlButtonResponse,
  stimulus: `<div class="main">
    <h1 class="title">Congratulations!</h1>
    <p class='body-center'>
      You have successfully completed this round of experiments. Click on "end" to exit the experiment.
    </p>
    </div>`,
  choices: ["End"],
  //trial_duration: 10 * 1000,
  data: { screen_id: "end" },
};
