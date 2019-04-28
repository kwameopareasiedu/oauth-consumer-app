import "./index.scss";
import React from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import { LoaderButton } from "enscript-reusables";
import { getOAuthRequestToken } from "../../actions/auth-actions";
import { GETTING_OAUTH_REQUEST_TOKEN } from "../../config/loading-entries";
import { Flash } from "../components";

const Login = ({ loading, getOAuthRequestToken }) => {
	const interceptGetOAuthRequestToken = () => {
		getOAuthRequestToken(token => {
			window.location.href = `http://localhost:17000/main/login?oauth_request_token_key=${token}`;
		});
	};

	return (
		<div id="login" className="main-page">
			<Flash />

			<div className="text-center">
				<LoaderButton
					className="btn btn-primary"
					onClick={interceptGetOAuthRequestToken}
					isLoading={loading.includes(GETTING_OAUTH_REQUEST_TOKEN)}
				>
					Login with provider-app
				</LoaderButton>
			</div>
		</div>
	);
};

Login.propTypes = {
	loading: PT.array,
	getOAuthRequestToken: PT.func
};

export default connect(
	state => ({
		loading: state.loading
	}),
	{ getOAuthRequestToken }
)(Login);
