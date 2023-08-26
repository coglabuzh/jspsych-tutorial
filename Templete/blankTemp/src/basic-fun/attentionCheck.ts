
import { jsPsych, varGlobal } from "../settings";
import Swal from 'sweetalert2';

/**
 * Function to control whether participants leave the browser or not
 * @param code: the code for the attention check
 * @param alert: whether to show the warning information or not
 */
export function control_browser_interactions(code: string = "FailedAttention", alert = true) {


    let get_interactions = jsPsych.data.getInteractionData();
    let interaction_data = JSON.parse(get_interactions.json());
    let last_event = interaction_data[interaction_data.length - 1];
    if (varGlobal.TRACK) {
        if (last_event["event"] === "blur") {

            // plus one
            varGlobal.N_BLUR++;

            if (varGlobal.N_BLUR < varGlobal.MAX_BLUR && varGlobal.N_BLUR > 0) {

                jsPsych.pauseExperiment();
                
                // show warning information
                if (alert) Swal.fire({
                    icon: "warning",
                    title: "Warning",
                    text: `You have left the window tab ${varGlobal.N_BLUR} time(s).
                     When you leave it two more times, you will be kicked out of the study.`,
                    showConfirmButton: true,
                }).then(() => {
                    jsPsych.resumeExperiment();
                });
    
            } else {
    
                Swal.fire({
                    icon: 'error',
                    title: 'End',
                    text: `
                Unfortunately, you have left the tab/ browser windows more than two times.
                As we told you in the beginning of the experiment,
                we therefore have to end this experiment prematurely and we cannot grant you any credit.
                `,
                    showConfirmButton: true,
    
                })
    
                jsPsych.endExperiment();
                //@ts-ignore
                if (varGlobal.run_jatos) jatos.endStudyAndRedirect(`https://app.prolific.co/submissions/complete?cc=${code}`,false, "Failed");
    
            };
        }
    }
}