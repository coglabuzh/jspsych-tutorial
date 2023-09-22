import { track_interactions } from "./basic-fun/attentionCheck";
import { varSystem, expInfo } from "./settings";
import { v4 as uuidv4 } from "uuid";

// Initialize JsPsych
import { initJsPsych } from "jspsych";

export const jsPsych = initJsPsych({
  
  // check whether participants leave the window or not during the experiment
  on_interaction_data_update: function () {
    track_interactions(varSystem, true); // For some weird reason, this function does not work if you write out the name of each variable.
  },

  // append results to JATOS after each trial if the experiment is running on JATOS.
  on_trial_finish: function () {

    if (expInfo.RUN_JATOS) {
      var resultJson = jsPsych.data.getLastTrialData().json();
      //@ts-ignore
      jatos.appendResultData(resultJson);
    }
    
  },

  // after the whole experiment, do the following things
  on_finish: function (data) {
    varSystem.TRACK = false;

    jsPsych.data.addProperties({ participant_id: uuidv4() });
    // console.log(JSON.stringify(jsPsych.data.get().json()));

    // Submit results to JATOS
    var resultJson = jsPsych.data.get().json();

    if (expInfo.RUN_JATOS) {
      //@ts-ignore
      jatos.submitResultData(resultJson); // submit results to JATOS
      //prolific integration
      if (!varSystem.FailedAttentionCheck) {
        // if participants did not fail the attention check redirect them to prolific with a success token
        document.body.innerHTML =
          "<p> Please wait. You are redirected to Prolific to book your credit.</p>";
        setTimeout(function () {
          //@ts-ignore
          jatos.endStudyAndRedirect(`https://app.prolific.co/submissions/complete?cc=${expInfo.completedCode}`,true, "Completed");
        }, 10000);
      } else {
        //if participants failed the attention check redirect them to prolific with a failure token
        document.body.innerHTML =
          "<p> Customized text: oh, no you failed an attention check! </p>";
        setTimeout(function () {
          //@ts-ignore
          jatos.endStudyAndRedirect(`https://app.prolific.co/submissions/complete?cc=${expInfo.failedCode}`,false, "Failed");
        }, 10000);
      }
    } else {
      //when not running on JATOS, download the data as a csv or json file
      //jsPsych.data.displayData();

      const participant_id = jsPsych.data.getLastTrialData().values()[0].participant;
      var file_name = expInfo.expName + "_" + participant_id + ".json";
      jsPsych.data.get().localSave("json", file_name);

      document.body.innerHTML =
      `<div class="main">
      <h1 class="title">Congratulations!</h1>
      <p class='body-center'>
        You have successfully completed this round of experiments.
        Make sure that you have downloaded the data before you close the browser.
      </p>
      </div>`;

    }
  },
});
