// jsPsych official plugin
import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import { SCREEN_INFO, BUTTON_INFO } from "../task-fun/text";
import { expInfo } from "../settings";

export const welcome_screen = {
  type: htmlButtonResponse,
  stimulus: function () {
    return SCREEN_INFO.welcome[expInfo.LANG];
  },
  choices: function () {
    return BUTTON_INFO.continueButton[expInfo.LANG];
  },
  data: { screenID: "welcome" },
};
