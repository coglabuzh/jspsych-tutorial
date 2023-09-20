// Import plugins to this file
import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import { jsPsych, expInfo } from "../settings";

const download_screen = {
  type: htmlButtonResponse,
  stimulus: `<p class="title">Error: 404</p>
      <div class="main">
        <p class="fb-text">
          For some internet issue, we are able to upload your data to the server.
          Please click on the "Download" button below to download your data.
          And send the data to the following email address: YOUR E-MAIL address<br>
        </p>
      </div>`,
  choices: ["&nbsp;Continue&nbsp;"],
  data: { screen_id: "end" },
  on_finish: function () {
    const participant_id = jsPsych.data
      .getLastTrialData()
      .values()[0].participant;
    var file_name = expInfo.expName + "_" + participant_id + ".json";
    jsPsych.data.get().localSave("json", file_name);

    jsPsych.endExperiment("The experiment is over! Please close the window.");
  },
};

export const download_line = {
  timeline: [download_screen],
  conditional_function: function () {
    try {
      // @ts-ignore
      jatos.endStudyAjax(true, "Completed");

      // Submit results to JATOS
      document.body.innerHTML = `<div class="main">
            <h1 class="title">实验结束</h1>
            <p class='body-center'>
              恭喜您！您已经顺利完成本轮实验。现在您可以直接关闭实验窗口。
            </p>
            </div>`;
    } catch (error) {
      return true;
    }
  },
};
