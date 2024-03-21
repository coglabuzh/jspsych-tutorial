// jsPsych official plugin
import { initJsPsych } from "jspsych";

// Basic Functions
import { trackInteractions } from "@coglabuzh/webpsy.js";
// Global variables
import { varSystem, expInfo } from "./settings";
let { RUN_JATOS } = expInfo;
import { TEXT } from "./task-fun/text";

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

    // check the status of participants
    let internet = RUN_JATOS && navigator.onLine ? "online" : "offline";
    let results = varSystem.FAILED_ATTENTION_CHECK ? "fail" : "success";
    let finalStatus = `${internet}_${results}`;

    // return varied completion codes and screen based on the final status
    switch (finalStatus) {
      // when the participants run the experiment online and pass the attention check
      case "online_success":
        //@ts-ignore submit results to JATOS
        jatos
          .submitResultData(resultJson)
          //@ts-ignore end the study
          .then(jatos.endStudyAjax(true, "FINISHED"))
          .then(() => {
            // window.location.href = `assets/external-html/completed-${expInfo.LANG}.html`;
            document.body.innerHTML = TEXT.completedOffline[expInfo.LANG];
          })
          .catch((error) => {
            console.error("Failed to submit the results to JATOS", error);
          });
        break;

      // when the participants fail the attention check reagardless of the internet status
      case "online_fail":
        //@ts-ignore submit results to JATOS
        jatos
          .submitResultData(resultJson)
          //@ts-ignore end the study
          .then(jatos.endStudyAjax(false, "FAILED_ATTENTION_CHECK"))
          .then(() => {
            // window.location.href = `assets/external-html/failed-${expInfo.LANG}.html`;
            document.body.innerHTML = TEXT.failedOnline[expInfo.LANG];
          })
          .catch((error) => {
            console.error("Failed to submit the results to JATOS", error);
          });
        break;

      case "offline_fail":
        document.body.innerHTML = TEXT.failedOffline[expInfo.LANG];

        break;
      case "offline_success":
        // download the data as a json file
        const participant_id = jsPsych.data
          .getLastTrialData()
          .values()[0].participant;
        var file_name = expInfo.TITLE + "_" + participant_id + ".json";
        jsPsych.data.get().localSave("json", file_name);

        document.body.innerHTML = TEXT.completedOffline[expInfo.LANG];

        break;
    }
  },
});
