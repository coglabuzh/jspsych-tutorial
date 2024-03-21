// jsPsych official plugin
import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";

// Basic Functions
import { countDownTimer, convertTime } from "@coglabuzh/webpsy.js";

// Global variables
import { varSystem, expInfo } from "../settings";
let { TIMING } = expInfo;
import { TEXT } from "../task-fun/text";
import { jsPsych } from "../jsp";


// display a cue screen with a countdown timer.
export const trial_start_screen = {
  type: htmlKeyboardResponse,
  stimulus: function(){
    return `<div class="fb-text">
    ${TEXT.startTrial[expInfo.LANG]}
    <br>
    <br>
  </div>`;
  },
  choices: [" "], // The only valid key response is the space bar.
  trial_duration: TIMING.START, // Time to wait before automatically proceeding with the next trial.
  post_trial_gap: 1000, // forced inter-trial interval after participant's response.
  on_load: function () {
    let time = convertTime(TIMING.START, "ms", "s");
    //@ts-ignore
    countDownTimer(time, "clock", jsPsych);
  },
  on_finish: function () {},
};


/**  create a block break screen
 * @param {number} block - the current block
 * @param {number} nBlock - the total number of blocks
 * @param {number} duration - the duration of the break in seconds
 * @returns {Object} block_break_screen
 */
export function createBlockBreak(
  block: number,
  nBlock: number,
  duration: number
) {
  var minutes = parseInt(String(duration), 10) / 60;
  var seconds = (parseInt(String(duration), 10) % 60) - 1;
  const displayText = duration < 100 ? seconds : minutes + ":" + seconds;

  const block_break_screen = {
    type: htmlButtonResponse,
    stimulus: `<div class='main'>
        <p class='fb-text'>
          You have done ${block + 1}/${nBlock} blocks.
          The next block will launch in <span id="blockClock" style="color:red">${displayText}</span> seconds.<br>
          You can press the "Continue" button to go to the next block directly<br>
        </p>
      </div>`,
    choices: ["Continue"],
    trial_duration: convertTime(duration, "s", "ms"),
    post_trial_gap: 1000,
    on_load: function () {
      // @ts-ignore
      countDownTimer(convertTime(duration, "s", "ms"), "blockClock");
    },
    on_finish: function () {
      varSystem.RUN_TIMER = false;
    },
  };

  return block_break_screen;
}
