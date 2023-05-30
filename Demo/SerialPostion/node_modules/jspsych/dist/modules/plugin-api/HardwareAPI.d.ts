export declare class HardwareAPI {
    /**
     * Indicates whether this instance of jspsych has opened a hardware connection through our browser
     * extension
     **/
    hardwareConnected: boolean;
    constructor();
    /**
     * Allows communication with user hardware through our custom Google Chrome extension + native C++ program
     * @param		mess	The message to be passed to our extension, see its documentation for the expected members of this object.
     * @author	Daniel Rivas
     *
     */
    hardware(mess: any): void;
}
