import React from "react";
import PropTypes from "prop-types";

const PageContainer = props => {
    if (props.topbarPresent) return <div className="container-fluid topbar-present">{props.children}</div>;
    else return <div className="container-fluid">{props.children}</div>;
};

export { PageContainer };

PageContainer.propTypes = {
    children: PropTypes.any,
    topbarPresent: PropTypes.bool
};
