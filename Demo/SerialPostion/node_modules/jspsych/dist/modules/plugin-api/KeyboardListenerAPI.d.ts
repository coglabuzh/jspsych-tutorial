export declare type KeyboardListener = (e: KeyboardEvent) => void;
export declare type ValidResponses = string[] | "ALL_KEYS" | "NO_KEYS";
export interface GetKeyboardResponseOptions {
    callback_function: any;
    valid_responses?: ValidResponses;
    rt_method?: "performance" | "audio";
    persist?: boolean;
    audio_context?: AudioContext;
    audio_context_start_time?: number;
    allow_held_key?: boolean;
    minimum_valid_rt?: number;
}
export declare class KeyboardListenerAPI {
    private getRootElement;
    private areResponsesCaseSensitive;
    private minimumValidRt;
    constructor(getRootElement: () => Element | undefined, areResponsesCaseSensitive?: boolean, minimumValidRt?: number);
    private listeners;
    private heldKeys;
    private areRootListenersRegistered;
    /**
     * If not previously done and `this.getRootElement()` returns an element, adds the root key
     * listeners to that element.
     */
    private registerRootListeners;
    private rootKeydownListener;
    private toLowerCaseIfInsensitive;
    private rootKeyupListener;
    private isResponseValid;
    getKeyboardResponse({ callback_function, valid_responses, rt_method, persist, audio_context, audio_context_start_time, allow_held_key, minimum_valid_rt, }: GetKeyboardResponseOptions): KeyboardListener;
    cancelKeyboardResponse(listener: KeyboardListener): void;
    cancelAllKeyboardResponses(): void;
    compareKeys(key1: string | null, key2: string | null): boolean;
}
