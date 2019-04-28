import "./index.scss";
import PT from "prop-types";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Loader, HOCs } from "enscript-reusables";
import { getOAuthAccessToken } from "../../../actions/auth-actions";
import { Flash } from "../../components";

const OAuthRedirect = ({ qp, history, getOAuthAccessToken }) => {
	useEffect(() => {
		getOAuthAccessToken(qp.oauth_request_token_key, () => {
			history.push("/main/posts");
		});
	}, []);

	return (
		<div id="oauth-redirect" className="main-page">
			<Flash />

			<div className="text-center">
				<Loader>Loading, please wait...</Loader>
			</div>
		</div>
	);
};

OAuthRedirect.propTypes = {
	qp: PT.object,
	history: PT.object,
	loading: PT.array,
	getOAuthAccessToken: PT.func
};

export default withRouter(
	HOCs.withQueryParams(
		connect(
			state => ({
				loading: state.loading
			}),
			{ getOAuthAccessToken }
		)(OAuthRedirect)
	)
);
