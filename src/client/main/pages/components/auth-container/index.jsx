import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

/**
 * An HOC that wraps the component in a function which checks for authentication.
 * If authenticated the component is renderd, else it redirects to the login page
 *
 * @param {*} Element The component to rendered if auth check is passed
 */
export const AuthContainer = function(Element) {
    return connect(state => ({ isAuthenticated: state.auth.isAuthenticated }))(
        // eslint-disable-next-line
        class extends Component {
            static get propTypes() {
                return { isAuthenticated: PropTypes.bool };
            }

            render() {
                if (!this.props.isAuthenticated) return <Redirect to="/main/login" />;
                return <Element {...this.props} />;
            }
        }
    );
};
