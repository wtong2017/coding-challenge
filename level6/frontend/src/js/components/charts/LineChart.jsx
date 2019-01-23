import React, { Component } from 'react';
import { connect } from "react-redux";
import * as d3 from "d3";
import { API_FUNC_LIST } from "../../constants/index"

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.node = React.createRef();
        this.drawChart = this.drawChart.bind(this);
        this.update = this.update.bind(this);
        this.chart = null;
    }

    componentDidMount() {
        this.chart = this.drawChart();
    }

    componentDidUpdate() {
        console.log("Update line chart")
        this.update();
    }

    drawChart() {
        var margin = { top: 50, right: 50, bottom: 50, left: 50 },
            width = this.props.width - margin.left - margin.right,
            height = this.props.height - margin.top - margin.bottom;

        // 1. Add the SVG to the page and employ #2
        var svg = d3.select(this.node.current).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        // Scale
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        // Axis
        var xAxis = svg.append("g")
            .attr("transform", "translate(0," + height + ")")
        var yAxis = svg.append("g")

        var line = d3.line()
            .x(function (d) { return x(d.key); })
            .y(function (d) { return y(d.value.close); });

        var path = svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "#ffab00")
            .attr("stroke-width", "1px");
        
            return [x, y, xAxis, yAxis, line, path]
        }
        
    update() {
        var [x, y, xAxis, yAxis, line, path, parseTime] = this.chart;
        var { detail, func } = this.props;

        var parseTime = d3.timeParse("%Y-%m-%d");
        if (func === API_FUNC_LIST[0]) {
            parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");
        }

        // Process data
        var dataset = detail ? d3.entries(detail.data) : [];
        dataset.forEach(d => {
            d.key = parseTime(d.key) // Str to Date
            for (var type in d.value) {
                if (!d.value.hasOwnProperty(type)) continue;
                d.value[type] = Number(d.value[type]) // Str to Number
            }
        });
        dataset.sort((a, b) => d3.ascending(a.key, b.key))
        
        // Udpate domain
        x.domain(d3.extent(dataset, d => d.key))
        y.domain(d3.extent(dataset, d => d.value.close))

        // Update axis
        xAxis.call(d3.axisBottom(x));
        yAxis.call(d3.axisLeft(y));

        path
            .datum(dataset)
            .attr("d", line);
    }

    render() {
        return <div ref={this.node}></div>
    }
}
const mapStateToProps = state => {
    return { detail: state.detail, func: state.func };
};

export default connect(mapStateToProps)(LineChart);