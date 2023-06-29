import { JsPsych } from "../../JsPsych";
import { HardwareAPI } from "./HardwareAPI";
import { KeyboardListenerAPI } from "./KeyboardListenerAPI";
import { MediaAPI } from "./MediaAPI";
import { SimulationAPI } from "./SimulationAPI";
import { TimeoutAPI } from "./TimeoutAPI";
export declare function createJointPluginAPIObject(jsPsych: JsPsych): KeyboardListenerAPI & TimeoutAPI & MediaAPI & HardwareAPI & SimulationAPI;
export declare type PluginAPI = ReturnType<typeof createJointPluginAPIObject>;
