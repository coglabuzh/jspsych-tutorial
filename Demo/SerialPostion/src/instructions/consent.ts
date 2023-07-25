
// Import plugins to this file
import externalHtml from '@jspsych/plugin-external-html';

// Import functions
import { check_consent, check_notice } from '../task-fun/checkFun';

/* informed consent */
export const consent_screen = {
type: externalHtml,
url: "assets/ExternalHtml/Information.html",
cont_btn: "agree",
check_fn: check_consent
};


/**
 *  A notice screen, including several items that participants need to be noticed if they do the experiment online.
 */
export const notice_screen = {
type: externalHtml,
url: "assets/ExternalHtml/Notice.html",
cont_btn: "ready",
check_fn: check_notice
};
 
