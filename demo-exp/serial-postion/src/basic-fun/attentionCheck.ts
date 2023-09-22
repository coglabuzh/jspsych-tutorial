import { jsPsych } from "../jsp";
import Swal from "sweetalert2";

interface blurObject {
  TRACK: boolean;
  MAX_BLUR: number;
  nBlur: number;
}

/** Contro the browser interactions
 *
 * This function is used to control the number of blurs and to end the experiment if the user has left the tab too often.
 *
 * If you want to use this function, you have to defined a global variable with the name blur.nBlur and varSystem.MAX_BLUR.
 *
 * @param {blurObject} blur An object that has to include variables of `START_COUNT`, `MAX_BLUR` and `nBlur`.
 * @param {string} code A string that is used to redirect the participant to the Prolific website.
 * @param alert A boolean value.
 */
export function track_interactions(blur: blurObject, alert = true) {

  let get_interactions = jsPsych.data.getInteractionData();
  let interaction_data = JSON.parse(get_interactions.json());
  let last_event = interaction_data[interaction_data.length - 1];

  if (blur.TRACK) {
    if (last_event["event"] === "blur") {
      // plus one
      blur.nBlur++;

      if (blur.nBlur < blur.MAX_BLUR && blur.nBlur > 0) {
        jsPsych.pauseExperiment();

        // show warning information
        if (alert)
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: `You have left the window tab ${blur.nBlur} time(s).
                     When you leave it two more times, you will be kicked out of the study.`,
            showConfirmButton: true,
          }).then(() => {
            jsPsych.resumeExperiment();
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "End",
          text: `
                Unfortunately, you have left the tab/ browser windows more than two times.
                As we told you in the beginning of the experiment,
                we therefore have to end this experiment prematurely and we cannot grant you any credit.
                `,
          showConfirmButton: true,
        });

        jsPsych.endExperiment();

      }
    }
  }
}
