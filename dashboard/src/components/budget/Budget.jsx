import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    category: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};

export const Budget = ({category, count}) => {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card text-white bg-dark  shadow">
                <div className="card-body">
                    {category} - {count}
                </div>
            </div>
        </div>
    );
}

Budget.propTypes = propTypes;
Budget.defaultProps = {};
