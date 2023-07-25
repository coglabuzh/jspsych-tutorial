import fullscreen from "@jspsych/plugin-fullscreen";
import { varGlobal } from "../settings";


  // Switch to fullscreen
 export const fullMode_screen = {
    type: fullscreen,
    fullscreen_mode: true,
    message: `<div class="main">
      <p class = 'fb-text'>The experiment will switch to full screen</p>
    </div>`,
    on_finish: function() {
      // start to count that how many times participants has left the browser.
      varGlobal.start_count = true;
      varGlobal.n_blur = 0;
    }
  }