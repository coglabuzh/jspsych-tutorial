// jsPsych official plugin
import htmlButtonResponse from "@jspsych/plugin-html-button-response";

export const welcome_screen = {
  type: htmlButtonResponse,
  stimulus: `<p class="title">Welcome!</p>
      <div class="main">
        <p class="fb-text">
          Thank you very much for participating in this experiment.
        </p>
      </div>`,
  choices: ["&nbsp;Continue&nbsp;"],
  data: { screen_id: "welcome" },
};
