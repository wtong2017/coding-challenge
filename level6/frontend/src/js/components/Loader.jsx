import React from "react";
import { connect } from "react-redux";

const Loader = ({ isLoading }) => {
    return (
        <div className="loader" style={{display: isLoading ? "block" : "none"}}>
            <div className="spinner"></div>
        </div>
    )
};
const mapStateToProps = state => {
    return { isLoading: state.isLoading };
};
export default connect(mapStateToProps)(Loader);