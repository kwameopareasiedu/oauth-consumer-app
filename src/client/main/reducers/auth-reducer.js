import { AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILED, UNAUTHENTICATING_SUCCESS } from "../config/action-types";

const key = "app-is-authenticated";
const INITIAL_STATE = { isAuthenticated: localStorage.getItem(key) == "true" };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTHENTICATION_SUCCESS:
            localStorage.setItem(key, "true");
            return { ...state, isAuthenticated: true };
        case AUTHENTICATION_FAILED:
        case UNAUTHENTICATING_SUCCESS:
            localStorage.removeItem(key);
            return { ...state, isAuthenticated: false };
        default:
            return state;
    }
}
