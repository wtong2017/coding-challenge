import React from "react";
import { connect } from "react-redux";
import LineChart from "./charts/LineChart.jsx";
import { API_FUNC_MAP } from "../constants/index"

const ConnectedList = ({ stock, detail, func }) => {
    console.log(detail)
    var dateList = detail ? Object.keys(detail.data) : []
    dateList.sort()
    return (
        <div>
            <h4>Using function {API_FUNC_MAP[func].name},</h4>
            <h4>Selected stock is {stock}</h4>
            <LineChart width={600} height={600} />
        </div>
    )
};
const mapStateToProps = state => {
    return { stock: state.stock, detail: state.detail, func: state.func };
};
const Post = connect(mapStateToProps)(ConnectedList);
export default Post;