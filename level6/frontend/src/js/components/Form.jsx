import React, { Component } from "react";
import { connect } from "react-redux";
import { selectStock, getDetail, selectFunc } from "../actions/index";
import { API_FUNC_MAP, API_FUNC_LIST } from "../constants/index";

function mapDispatchToProps(dispatch) {
    return {
        selectStock: stock => dispatch(selectStock(stock)), // Redundent for now, maybe useful later if we want dynamic change
        selectFunc: index => dispatch(selectFunc(index)), // Redundent for now, maybe useful later if we want dynamic change
        getDetail: data => dispatch(getDetail(data))
    };
}
class ConnectedForm extends Component {
    constructor() {
        super();
        this.state = {
            stock: "",
            func: 'daily_adjusted'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }
    handleRadioChange(event) {
        this.setState({ func: event.target.value });
    }
    handleChange(event) {
        console.log(event.target.id)
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { stock, func } = this.state;
        this.props.selectStock(stock);
        this.props.selectFunc(func);
        this.props.getDetail({ stock: stock, func: func });
        this.setState({ stock: '' });
    }
    render() {
        const { stock, func } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    {
                        API_FUNC_LIST.map(d => {
                            return (
                                <div className="form-check form-check-inline" key={d}>
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id={d} value={d} checked={func === d} onChange={this.handleRadioChange} />
                                    <label className="form-check-label" htmlFor={d}>{API_FUNC_MAP[d].name}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input
                        type="text"
                        className="form-control"
                        id="stock"
                        value={stock}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success btn-lg">
                    Go
                </button>
            </form>
        );
    }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;