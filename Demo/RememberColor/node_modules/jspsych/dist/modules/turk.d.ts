interface turkInformation {
    /**
     * Is the experiment being loaded in preview mode on Mechanical Turk?
     */
    previewMode: boolean;
    /**
     * Is the experiment being loaded outside of the Mechanical Turk environment?
     */
    outsideTurk: boolean;
    /**
     * The HIT ID.
     */
    hitId: string;
    /**
     * The Assignment ID.
     */
    assignmentId: string;
    /**
     * The worker ID.
     */
    workerId: string;
    /**
     * URL for submission of the HIT.
     */
    turkSubmitTo: string;
}
/**
 * Gets information about the Mechanical Turk Environment, HIT, Assignment, and Worker
 * by parsing the URL variables that Mechanical Turk generates.
 * @returns An object containing information about the Mechanical Turk Environment, HIT, Assignment, and Worker.
 */
export declare function turkInfo(): turkInformation;
/**
 * Send data to Mechnical Turk for storage.
 * @param data An object containing `key:value` pairs to send to Mechanical Turk. Values
 * cannot contain nested objects, arrays, or functions.
 * @returns Nothing
 */
export declare function submitToTurk(data: any): void;
export {};
