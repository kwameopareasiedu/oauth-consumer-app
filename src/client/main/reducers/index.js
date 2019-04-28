import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import flash from "./flash-reducer";
import loading from "./loading-reducer";
import auth from "./auth-reducer";
import post from "./post-reducer";

export default combineReducers({ form, flash, loading, auth, post });
