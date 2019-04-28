import { generate } from "randomstring";
import { ADD_FLASH, REMOVE_FLASH, REMOVE_ALL_FLASH } from "../config/action-types";

export function removeFlash(id) {
    return {
        type: REMOVE_FLASH,
        flashId: id
    };
}

export function removeAllFlash() {
    return {
        type: REMOVE_ALL_FLASH
    };
}

export function addFlash(flash) {
    return {
        type: ADD_FLASH,
        flash: flash
    };
}

export function addAndRemoveFlash(level, message) {
    const flashId = generate(8);
    return function(dispatch) {
        dispatch(addFlash({ level: level, message: message, id: flashId }));
        setTimeout(() => {
            dispatch(removeFlash(flashId));
        }, 8500);
    };
}
