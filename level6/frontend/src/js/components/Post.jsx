import React from "react";
import { connect } from "react-redux";
import LineChart from "./charts/LineChart.jsx";

const ConnectedList = ({ stock, detail }) => {
    var dateList = detail ? Object.keys(detail['daily_adjusted']['data']) : []
    dateList.sort()
    return (
        <div>
            <h4>Selected stock is {stock}</h4>
            <LineChart width={600} height={600} />
            <ul>
                {dateList.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
        </div>
    )
};
const mapStateToProps = state => {
    return { stock: state.stock, detail: state.detail };
};
const Post = connect(mapStateToProps)(ConnectedList);
export default Post;