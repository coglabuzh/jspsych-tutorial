// jsPsych official plugin
import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";

// Basic Functions
import { countDownTimer } from "../basic-fun/countdownTimer";
import { convertTime } from "../basic-fun/convertTime";

// Global variables
import { varSystem, expInfo } from "../settings";
let { KEYS, TIMING } = expInfo;


export const exp_start_screen = {
  type: htmlButtonResponse,
  stimulus: `<div class='main'>
        <h1 class='title'>Experiment</h1>
        <p class='fb-text'>Good job! Now we will start running the experiment. </p>
      </div>`,
  choices: ["Continue"],
};

export const pra_instr_screen = {
  type: htmlButtonResponse,
  stimulus: `<div class='main'>
        <h1 class='title'>Practice</h1>
        <p class='fb-text'>We will do some practice to get familiar with the experiment</p>
      </div>`,
  choices: ["Continue"],
};

// display a cue screen with a countdown timer.
export const trial_start_screen = {
  type: htmlKeyboardResponse,
  stimulus: `<div class="fb-text">
    <p>The next trial will start in <span id="clock" style="color:red">10</span> seconds.</p>
    <p>Press the "Space bar" to start directly.</p>
    <br>
    <br>
  </div>`,
  choices: KEYS.START_TRIAL, // The only valid key response is the space bar.
  trial_duration: TIMING.START, // Time to wait before automatically proceeding with the next trial.
  post_trial_gap: TIMING.ITI, // forced inter-trial interval after participant's response.
  on_load: function () {
    let time = convertTime(TIMING.START, "ms", "s");
    //@ts-ignore
    countDownTimer(varSystem, time, "clock");
  },
  on_finish: function () {
    varSystem.RUN_TIMER = false;
  },
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
