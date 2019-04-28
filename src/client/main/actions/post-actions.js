import axios from "axios";
import { utils } from "enscript-reusables";
import { addAndRemoveFlash } from "./flash-actions";
import { addLoadingEntry, removeLoadingEntry } from "./loading-actions";
import { FETCHING_POSTS } from "../config/loading-entries";
import { FETCH_POSTS_SUCCESS } from "../config/action-types";
import { API_URL } from "../config/url";

const { createUrl, errorMessage } = utils;
const resolveUrl = createUrl.bind(null, API_URL);

export const fetchPosts = () => dispatch => {
	dispatch(addLoadingEntry(FETCHING_POSTS));

	axios
		.get(resolveUrl("fetch-posts"))
		.then(response => {
			dispatch(removeLoadingEntry(FETCHING_POSTS));
			dispatch({
				type: FETCH_POSTS_SUCCESS,
				posts: response.data
			});
		})
		.catch(err => {
			console.error(err);
			dispatch(removeLoadingEntry(FETCHING_POSTS));
			dispatch(addAndRemoveFlash("danger", errorMessage(err, "Unable to fetch posts")));
		});
};
