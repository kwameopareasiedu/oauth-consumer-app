import axios from "axios";
import { utils } from "enscript-reusables";
import { addAndRemoveFlash } from "./flash-actions";
import { addLoadingEntry, removeLoadingEntry } from "./loading-actions";
import { AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILED, UNAUTHENTICATING_SUCCESS } from "../config/action-types";
import { UNAUTHENTICATING, GETTING_OAUTH_REQUEST_TOKEN, GETTING_OAUTH_ACCESS_TOKEN } from "../config/loading-entries";
import { API_URL } from "../config/url";

const { createUrl, errorMessage } = utils;
const resolveUrl = createUrl.bind(null, API_URL);

export const getOAuthRequestToken = successCallback => dispatch => {
	dispatch(addLoadingEntry(GETTING_OAUTH_REQUEST_TOKEN));

	axios
		.get(resolveUrl("get-oauth-request-token"))
		.then(response => {
			dispatch(removeLoadingEntry(GETTING_OAUTH_REQUEST_TOKEN));
			if (successCallback) successCallback(response.data.token);
		})
		.catch(err => {
			console.error(err);
			dispatch(removeLoadingEntry(GETTING_OAUTH_REQUEST_TOKEN));
			dispatch(addAndRemoveFlash("danger", errorMessage(err, "Authentication failed!")));
		});
};

export const getOAuthAccessToken = (token, successCallback) => dispatch => {
	dispatch(addLoadingEntry(GETTING_OAUTH_ACCESS_TOKEN));

	axios
		.post(resolveUrl("get-oauth-access-token"), { token })
		.then(() => {
			dispatch(removeLoadingEntry(GETTING_OAUTH_ACCESS_TOKEN));
			dispatch({ type: AUTHENTICATION_SUCCESS });
			if (successCallback) successCallback();
		})
		.catch(err => {
			console.error(err);
			dispatch(removeLoadingEntry(GETTING_OAUTH_ACCESS_TOKEN));
			dispatch(addAndRemoveFlash("danger", errorMessage(err, "Unable to acquire access token!")));
		});
};

export const logout = () => dispatch => {
	dispatch(addLoadingEntry(UNAUTHENTICATING));

	axios
		.get(resolveUrl("logout"))
		.then(() => {
			dispatch(removeLoadingEntry(UNAUTHENTICATING));
			dispatch({ type: UNAUTHENTICATING_SUCCESS });
		})
		.catch(err => {
			console.error(err);
			dispatch(removeLoadingEntry(UNAUTHENTICATING));
			dispatch(addAndRemoveFlash("danger", errorMessage(err, "Unable to logout. Please try again")));
			dispatch(handleAuthFailed(err));
		});
};

export const handleAuthFailed = err => {
	if (err && err.response && err.response.status == 401) {
		return { type: AUTHENTICATION_FAILED };
	}

	return { type: null };
};
