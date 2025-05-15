// jsPsych official plugin
import externalHtml from "@jspsych/plugin-external-html";

// Task Functions
import { checkConsent, checkNotice } from "../task-fun/checkFun";

// Global variables
import { expInfo } from "../settings";

/* informed consent */
export const consent_screen = {
  type: externalHtml,
  url: function () {
    return `assets/external-html/consent-${expInfo.LANG}.html`;
  },
  cont_btn: "agree",
  check_fn: checkConsent,
};

/**
 *  A notice screen, including several items that participants need to be noticed if they do the experiment online.
 */
export const notice_screen = {
  type: externalHtml,
  url: function () {
    return `assets/external-html/notice-${expInfo.LANG}.html`;
  },
  cont_btn: "ready",
  check_fn: checkNotice,
};
