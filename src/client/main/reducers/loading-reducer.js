import { ADD_LOADING_ENTRY, REMOVE_LOADING_ENTRY } from "../config/action-types";

export default function(state = [], action) {
    switch (action.type) {
        case ADD_LOADING_ENTRY:
            return [...state, action.entryName];
        case REMOVE_LOADING_ENTRY:
            return state.filter(entryName => entryName != action.entryName);
        default:
            return state;
    }
}
