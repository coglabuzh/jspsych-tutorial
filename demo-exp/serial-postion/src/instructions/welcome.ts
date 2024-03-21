// jsPsych official plugin
import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import { TEXT } from "../task-fun/text";
import { expInfo } from "../settings";

export const welcome_screen = {
  type: htmlButtonResponse,
  stimulus: function () {
    return TEXT.welcome[expInfo.LANG];
  },
  choices: function () {
    return TEXT.continueButton[expInfo.LANG];
  },
  data: { screen_id: "welcome" },
};
