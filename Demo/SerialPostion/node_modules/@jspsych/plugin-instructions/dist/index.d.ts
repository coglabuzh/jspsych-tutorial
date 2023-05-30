import { JsPsych, JsPsychPlugin, ParameterType, TrialType } from "jspsych";
declare const info: {
    readonly name: "instructions";
    readonly parameters: {
        /** Each element of the array is the HTML-formatted content for a single page. */
        readonly pages: {
            readonly type: ParameterType.HTML_STRING;
            readonly pretty_name: "Pages";
            readonly default: any;
            readonly array: true;
        };
        /** The key the subject can press in order to advance to the next page. */
        readonly key_forward: {
            readonly type: ParameterType.KEY;
            readonly pretty_name: "Key forward";
            readonly default: "ArrowRight";
        };
        /** The key that the subject can press to return to the previous page. */
        readonly key_backward: {
            readonly type: ParameterType.KEY;
            readonly pretty_name: "Key backward";
            readonly default: "ArrowLeft";
        };
        /** If true, the subject can return to the previous page of the instructions. */
        readonly allow_backward: {
            readonly type: ParameterType.BOOL;
            readonly pretty_name: "Allow backward";
            readonly default: true;
        };
        /** If true, the subject can use keyboard keys to navigate the pages. */
        readonly allow_keys: {
            readonly type: ParameterType.BOOL;
            readonly pretty_name: "Allow keys";
            readonly default: true;
        };
        /** If true, then a "Previous" and "Next" button will be displayed beneath the instructions. */
        readonly show_clickable_nav: {
            readonly type: ParameterType.BOOL;
            readonly pretty_name: "Show clickable nav";
            readonly default: false;
        };
        /** If true, and clickable navigation is enabled, then Page x/y will be shown between the nav buttons. */
        readonly show_page_number: {
            readonly type: ParameterType.BOOL;
            readonly pretty_name: "Show page number";
            readonly default: false;
        };
        /** The text that appears before x/y (current/total) pages displayed with show_page_number. */
        readonly page_label: {
            readonly type: ParameterType.STRING;
            readonly pretty_name: "Page label";
            readonly default: "Page";
        };
        /** The text that appears on the button to go backwards. */
        readonly button_label_previous: {
            readonly type: ParameterType.STRING;
            readonly pretty_name: "Button label previous";
            readonly default: "Previous";
        };
        /** The text that appears on the button to go forwards. */
        readonly button_label_next: {
            readonly type: ParameterType.STRING;
            readonly pretty_name: "Button label next";
            readonly default: "Next";
        };
    };
};
declare type Info = typeof info;
/**
 * **instructions**
 *
 * jsPsych plugin to display text (including HTML-formatted strings) during the experiment.
 * Use it to show a set of pages that participants can move forward/backward through.
 * Page numbers can be displayed to help with navigation by setting show_page_number to true.
 *
 * @author Josh de Leeuw
 * @see {@link https://www.jspsych.org/plugins/jspsych-instructions/ instructions plugin documentation on jspsych.org}
 */
declare class InstructionsPlugin implements JsPsychPlugin<Info> {
    private jsPsych;
    static info: {
        readonly name: "instructions";
        readonly parameters: {
            /** Each element of the array is the HTML-formatted content for a single page. */
            readonly pages: {
                readonly type: ParameterType.HTML_STRING;
                readonly pretty_name: "Pages";
                readonly default: any;
                readonly array: true;
            };
            /** The key the subject can press in order to advance to the next page. */
            readonly key_forward: {
                readonly type: ParameterType.KEY;
                readonly pretty_name: "Key forward";
                readonly default: "ArrowRight";
            };
            /** The key that the subject can press to return to the previous page. */
            readonly key_backward: {
                readonly type: ParameterType.KEY;
                readonly pretty_name: "Key backward";
                readonly default: "ArrowLeft";
            };
            /** If true, the subject can return to the previous page of the instructions. */
            readonly allow_backward: {
                readonly type: ParameterType.BOOL;
                readonly pretty_name: "Allow backward";
                readonly default: true;
            };
            /** If true, the subject can use keyboard keys to navigate the pages. */
            readonly allow_keys: {
                readonly type: ParameterType.BOOL;
                readonly pretty_name: "Allow keys";
                readonly default: true;
            };
            /** If true, then a "Previous" and "Next" button will be displayed beneath the instructions. */
            readonly show_clickable_nav: {
                readonly type: ParameterType.BOOL;
                readonly pretty_name: "Show clickable nav";
                readonly default: false;
            };
            /** If true, and clickable navigation is enabled, then Page x/y will be shown between the nav buttons. */
            readonly show_page_number: {
                readonly type: ParameterType.BOOL;
                readonly pretty_name: "Show page number";
                readonly default: false;
            };
            /** The text that appears before x/y (current/total) pages displayed with show_page_number. */
            readonly page_label: {
                readonly type: ParameterType.STRING;
                readonly pretty_name: "Page label";
                readonly default: "Page";
            };
            /** The text that appears on the button to go backwards. */
            readonly button_label_previous: {
                readonly type: ParameterType.STRING;
                readonly pretty_name: "Button label previous";
                readonly default: "Previous";
            };
            /** The text that appears on the button to go forwards. */
            readonly button_label_next: {
                readonly type: ParameterType.STRING;
                readonly pretty_name: "Button label next";
                readonly default: "Next";
            };
        };
    };
    constructor(jsPsych: JsPsych);
    trial(display_element: HTMLElement, trial: TrialType<Info>): void;
    simulate(trial: TrialType<Info>, simulation_mode: any, simulation_options: any, load_callback: () => void): void;
    private create_simulation_data;
    private simulate_data_only;
    private simulate_visual;
}
export default InstructionsPlugin;
