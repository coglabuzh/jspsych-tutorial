// jsPsych official plugin
import { initJsPsych } from "jspsych";

// Third party plugins
import { v4 as uuidv4 } from "uuid";

// Basic Functions
import { trackInteractions } from "./basic-fun/attentionCheck";

// Global variables
import { varSystem, expInfo } from "./settings";


// Initialize JsPsych
export const jsPsych = initJsPsych({
  // check whether participants leave the window or not during the experiment
  on_interaction_data_update: function () {
    trackInteractions(varSystem, true); // For some weird reason, this function does not work if you write out the name of each variable.
  },

  // Assign a participant ID to the participant at the beginning of the experiment
  on_start: function () {
    jsPsych.data.addProperties({ participant_id: uuidv4() }); // add a unique participant id to the data
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

    // console.log(JSON.stringify(jsPsych.data.get().json()));

    // Submit results to JATOS
    var resultJson = jsPsych.data.get().json();

    if (expInfo.RUN_JATOS) {
      //@ts-ignore
      jatos.submitResultData(resultJson); // submit results to JATOS
      //prolific integration
      if (!varSystem.FAILED_ATTENTION_CHECK) {
        // if participants did not fail the attention check redirect them to prolific with a success token
        document.body.innerHTML =
          "<p> Please wait. You are redirected to Prolific to book your credit.</p>";
        setTimeout(function () {
          //@ts-ignore
          jatos.endStudyAndRedirect(
            `https://app.prolific.co/submissions/complete?cc=${expInfo.CODES.SUCCESS}`,
            true,
            "Completed"
          );
        }, 10000);
      } else if (varSystem.FAILED_ATTENTION_CHECK) {
        //if participants failed the attention check redirect them to prolific with a failure token
        document.body.innerHTML =
          "<p> Customized text: oh, no you failed an attention check! </p>";
        setTimeout(function () {
          //@ts-ignore
          jatos.endStudyAndRedirect(
            `https://app.prolific.co/submissions/complete?cc=${expInfo.CODES.FAIL}`,
            false,
            "Failed"
          );
        }, 10000);
      }
    } else {
      //when not running on JATOS, download the data as a csv or json file
      //jsPsych.data.displayData();

      const participant_id = jsPsych.data
        .getLastTrialData()
        .values()[0].participant;
      var file_name = expInfo.TITLE + "_" + participant_id + ".json";
      jsPsych.data.get().localSave("json", file_name);

      document.body.innerHTML = `<div class="main">
      <h1 class="title">Good job!</h1>
      <p class='body-center'>
        You have successfully completed this experiment.
        The data is automatically downloaded and can be found in your download folder.
        You can close this window now.
      </p>
      </div>`;
    }
  },
});
