import { track_interactions } from "./basic-fun/attentionCheck";
import { setCSS } from "./task-fun/setCSS";
import { varGlobal } from "./settings";
import { v4 as uuidv4 } from "uuid";

setCSS();

// Initialize JsPsych
import { initJsPsych } from "jspsych";

export const jsPsych = initJsPsych({
  // check whether participants leave the window or not during the experiment
  on_interaction_data_update: function () {
    track_interactions(varGlobal, "FailedAttention", true); // For some weird reason, this function does not work if you write out the name of each variable.
  },

  on_finish: function (data) {
    varGlobal.TRACK = false;

    jsPsych.data.addProperties({ participant_id: uuidv4() });
    console.log(JSON.stringify(jsPsych.data.get().json()));

    // Submit results to JATOS
    var resultJson = jsPsych.data.get().json();

    console.log(varGlobal.RUN_JATOS);
    if (varGlobal.RUN_JATOS) {
      //@ts-ignore
      jatos.submitResultData(resultJson); // submit results to JATOS
      //prolific integration
      if (!varGlobal.FailedAttentionCheck) {
        // if participants did not fail the attention check redirect them to prolific with a success token
        document.body.innerHTML =
          "<p> Please wait. You are redirected to Prolific to book your credit.</p>";
        setTimeout(function () {
          //@ts-ignore
          jatos.endStudyAndRedirect("https://app.prolific.co");
        }, 10000);
      } else if (varGlobal.FailedAttentionCheck) {
        //if participants failed the attention check redirect them to prolific with a failure token
        document.body.innerHTML =
          "<p> Customized text: oh, no you failed an attention check! </p>";
        setTimeout(function () {
          //@ts-ignore
          jatos.endStudyAndRedirect("https://app.prolific.co");
        }, 10000);
      } else {
        setTimeout(function () {
          //@ts-ignore
          jatos.endStudyAndRedirect("https://google.com");
        }, 10000);
      }
    } else {
      //when not running on JATOS, download the data as a csv or json file
      //jsPsych.data.displayData();

      document.body.innerHTML =
        "<p> Goodbye. You can close the window now. </p>";
      // the format can be either 'csv' or 'json'.
      jsPsych.data.get().localSave("csv", "mydata.csv");
    }
  },
});
