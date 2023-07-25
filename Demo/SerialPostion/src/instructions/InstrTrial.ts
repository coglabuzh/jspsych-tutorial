import htmlButtonResponse from '@jspsych/plugin-html-button-response';
import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import { countdownTimer } from '../basic-fun/countdownTimer';
import { varGlobal } from '../settings';

export const exp_instr_screen = {
    type: htmlButtonResponse,
    stimulus:
      `<div class='main'>
        <h1 class='title'>Experiment</h1>
        <p class='fb-text'>Good job! Now we will start running the experiment. </p>
      </div>`,
    choices: ["Continue"]
  };

export const pra_instr_screen = {
    type: htmlButtonResponse,
    stimulus:
      `<div class='main'>
        <h1 class='title'>Practice</h1>
        <p class='fb-text'>We will do some practice to get familiar with the experiment</p>
      </div>`,
    choices: ["Continue"]
  };

// display a cue screen with a countdown timer.
export const trial_start_screen = {
  type: htmlKeyboardResponse,
  stimulus: `<div class="fb-text">
    <p>The next trial will start in <span id="clock" style="color:red">10</span> seconds.</p>
    <p>You can press "Space bar" to start directly.</p>
    <br>
    <br>
  </div>`,
  choices: [' '], // The only valid key response is the space bar.
  trial_duration: 10 * 1000, // Display the cue screen for 9 seconds before automatically proceeding to the next screen.
  post_trial_gap: 1000, // Display the cue screen for 1 second after the participant responds.
  on_load: function () {
    countdownTimer(10, "clock")
  },
  on_finish: function () {
    varGlobal.run_timer = false;
  }
};


export function createBlockBreak(block: number, nBlock: number, duration: number) {

  
  var minutes = parseInt(String(duration), 10) / 60;
  var seconds = parseInt(String(duration), 10) % 60 - 1;
  const displayText = duration < 100 ? seconds : minutes + ":" + seconds;

  const block_break_screen = {
    type: htmlButtonResponse,
    stimulus:
      `<div class='main'>
        <p class='fb-text'>
          You have done ${block + 1}/${nBlock} blocks.
          The next block will launch in <span id="blockClock" style="color:red">${displayText}</span> seconds.<br>
          You can press the "Continue" button to go to the next block directly<br>
        </p>
      </div>`,
    choices: ["Continue"],
    trial_duration: duration * 1000,
    post_trial_gap: 1000,
    on_load: function () {
      countdownTimer(duration * 1000, "blockClock")
    },
    on_finish: function () {
      varGlobal.run_timer = false;
    }
  };

  return block_break_screen
}
