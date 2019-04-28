import { ADD_FLASH, REMOVE_FLASH, REMOVE_ALL_FLASH } from "../config/action-types";

export default function(state = [], action) {
    switch (action.type) {
        case ADD_FLASH:
            return [...state, action.flash];
        case REMOVE_FLASH:
            return state.filter(flash => action.flashId != flash.id);
        case REMOVE_ALL_FLASH:
            return [];
        default:
            return state;
    }
}
