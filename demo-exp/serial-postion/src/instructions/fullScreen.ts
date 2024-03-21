// jsPsych official plugin
import fullscreen from "@jspsych/plugin-fullscreen";

// Global variables
import { expInfo, varSystem } from "../settings";
import { TEXT } from "../task-fun/text";

// Switch to fullscreen
export const fullMode_screen = {
  type: fullscreen,
  fullscreen_mode: true,
  message: function () {
    return `<div class="main">
      <p class = 'fb-text'>${TEXT.fullScreen[expInfo.LANG]}</p>
    </div>`;
  },
  button_label: function () {
    return TEXT.continueButton[expInfo.LANG];
  },
  on_finish: function () {
    // start to count that how many times participants has left the browser.
    varSystem.TRACK = true;
    varSystem.nBLUR = 0;
  },
};
