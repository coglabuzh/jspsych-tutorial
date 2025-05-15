// jsPsych official plugin
import { initJsPsych } from "jspsych";

// Basic Functions
import { trackInteractions } from "./task-fun/attentionCheck";

// Global variables
import { varSystem, expInfo } from "./settings";
let { RUN_JATOS, CODES } = expInfo;
import { END_INFO } from "./task-fun/text";

// Task functions
import { setCSS } from "./task-fun/setCSS";

// Do something in the beginning of the experiment
setCSS(); // set the CSS style of the experiment

// Set for the condition in which the data fails to be uploaded to JATOS
if (RUN_JATOS) {
  //@ts-ignore
  jatos.httpRetry = 10; // attempts 10 retries of failed requests
  //@ts-ignore
  jatos.httpRetryWait = 5000; // sets retry waiting time to 5 seconds
}

export const jsPsych = initJsPsych({
  // check whether participants leave the window or not during the experiment
  on_interaction_data_update: function () {
    trackInteractions(varSystem, true, jsPsych);
  },

  // after the whole experiment, do the following things
  on_finish: function (data) {
    // stop tracking interactions
    varSystem.TRACK = false;

    // get the data
    var resultJson = jsPsych.data.get().json();

    // set the end screen, end information, and the redirect link
    let endScreen: string = "";
    let endInfo: string;
    let endStatus: boolean;
    let redirectLink: string;

    // return varied completion codes and screen based on the final status
    switch (varSystem.STATUS) {
      // when the participants fail resizing the window
      case "failed_resize":
        endScreen = END_INFO.failedResize[expInfo.LANG];
        endInfo = "FAILED_RESIZE";
        endStatus = false;
        redirectLink = `https://app.prolific.co/submissions/complete?cc=${CODES.FAILED_OTHERS}`;
        break;
      // when the participants run the experiment online and pass the attention check
      case "success":
        endInfo = "FINISHED";
        endStatus = true;
        if (RUN_JATOS && navigator.onLine === true) {
          endScreen = END_INFO.completedOnline[expInfo.LANG];
          redirectLink = `https://app.prolific.co/submissions/complete?cc=${CODES.SUCCESS}`;
        } else {
          endScreen = END_INFO.completedOffline[expInfo.LANG];
          redirectLink = `https://app.prolific.co/submissions/complete?cc=${CODES.OFFLINE}`;
        }
        break;
      // when the participants fail the attention check reagardless of the internet status
      case "failed_attention_check":
        endScreen = END_INFO.failed[expInfo.LANG];
        endInfo = "FAILED_ATTENTION_CHECK";
        endStatus = false;
        redirectLink = `https://app.prolific.co/submissions/complete?cc=${CODES.FAILED_ATTENTION}`;
        break;
    }

    // show the end screen
    document.body.innerHTML = endScreen;

    // upload the data to JATOS and redirect to the Prolific page
    if (RUN_JATOS && navigator.onLine === true) {
      //@ts-ignore upload the data to JATOS
      jatos.submitResultData(resultJson);
      // redirect to the Prolific page after 10 seconds
      setTimeout(function () {
        //@ts-ignore
        jatos.endStudyAndRedirect(redirectLink, endStatus, endInfo);
      }, 10000);
    } else {
      // if the participants are offline, download the data as a json file
      if (varSystem.STATUS === "success") {
        // get the participant ID
        const participant_id = jsPsych.data
          .getLastTrialData()
          .values()[0].participant;
        // set the file name
        var file_name = expInfo.TITLE + "_" + participant_id + ".json";
        // download the data as a json file
        jsPsych.data.get().localSave("json", file_name);
      }
    }
  },
});
