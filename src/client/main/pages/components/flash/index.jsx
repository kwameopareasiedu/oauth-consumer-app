import "./index.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { removeFlash } from "../../../actions/flash-actions";

class FlashComponent extends Component {
    render() {
        return (
            <div id="flash-container">
                {this.props.items.map(item => {
                    return (
                        <div key={item.id} className={`alert alert-${item.level}`}>
                            {item.message}
                            <button
                                className="close"
                                onClick={() => {
                                    this.props.removeFlash(item.id);
                                }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    }
}

const Flash = connect(
    state => ({ items: state.flash }),
    { removeFlash }
)(FlashComponent);

export { Flash };

FlashComponent.propTypes = {
    items: PropTypes.array,
    removeFlash: PropTypes.func
};
