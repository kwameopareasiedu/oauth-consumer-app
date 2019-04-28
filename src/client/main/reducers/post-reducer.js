import { FETCH_POSTS_SUCCESS } from "../config/action-types";

const INITIAL_STATE = {
	collection: []
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_POSTS_SUCCESS:
			return { ...state, collection: action.posts };
		default:
			return state;
	}
}
