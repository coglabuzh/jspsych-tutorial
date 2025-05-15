import instructions from "@jspsych/plugin-instructions";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import { BUTTON_INFO } from "../task-fun/text";
import { expInfo } from "../settings";

export const instructions_screen = {
    type: instructions,
    pages:[
        '<img style="width: 100%; height: 80vh" src="./assets/images/instructions1.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="./assets/images/instructions2.jpg"></img>',
        '<img style="width: 100%; height: 80vh" src="./assets/images/instructions3.jpg"></img>'
    ],
    button_label_next: BUTTON_INFO.continueButton[expInfo.LANG],
    button_label_previous: BUTTON_INFO.prevButton[expInfo.LANG],
    allow_backward: true,
    allow_keys: true,
    key_forward: "ArrowRight",
    key_backward: "ArrowLeft",
    show_clickable_nav: true,
};

export const pra_instr_screen = {
    type: htmlButtonResponse,
    stimulus: function () {
      return `<div class='main'>
      <h1 class='title'>Practice</h1>
      <p class='fb-text'>We will do some practice to get familiar with the experiment.</p>
    </div>`;
    },
    choices: function () {
      return BUTTON_INFO.continueButton[expInfo.LANG];
    },
  };

export const exp_start_screen = {
    type: htmlButtonResponse,
    stimulus: function () {
      return `<div class='main'>
      <h1 class='title'>Experiment</h1>
      <p class='fb-text'>Good job! Now we will start running the experiment.</p>
    </div>`;
    },
    choices: function () {
      return BUTTON_INFO.continueButton[expInfo.LANG];
    },
  };