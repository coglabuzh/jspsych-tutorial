// jsPsych official plugin
import fullscreen from "@jspsych/plugin-fullscreen";

// Global variables
import { varSystem } from "../settings";


// Switch to fullscreen
export const fullMode_screen = {
  type: fullscreen,
  fullscreen_mode: true,
  message: `<div class="main">
      <p class = 'fb-text'>The experiment will switch to full screen</p>
    </div>`,
  on_finish: function () {
    // start to count that how many times participants has left the browser.
    varSystem.TRACK = true;
    varSystem.nBLUR = 0;
  },
};
