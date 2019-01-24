import React, { Component } from "react";
import { connect } from "react-redux";
import { selectStock, getDetail, selectFunc } from "../actions/index";
import { API_FUNC_MAP, API_FUNC_LIST } from "../constants/index";

function mapDispatchToProps(dispatch) {
    return {
        selectStock: stock => dispatch(selectStock(stock)),
        selectFunc: index => dispatch(selectFunc(index)),
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
        this.handleFuncChange = this.handleFuncChange.bind(this);
    }
    handleFuncChange(key) {
        this.setState({ func: key });
        this.props.selectFunc(key);
        if (this.props.stock) {
            this.props.getDetail({ stock: this.props.stock, func: key });
        }
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { stock, func } = this.state;
        this.props.selectStock(stock);
        this.props.getDetail({ stock: stock, func: func });
        this.setState({ stock: '' });
    }
    render() {
        const { stock, func } = this.state;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">Stock Market Chart</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {
                            API_FUNC_LIST.map(d => {
                                return (
                                    <a className={"nav-link nav-item " + (func === d ? "active" : "")} href="#" onClick={this.handleFuncChange.bind(this, d)} key={d}>{API_FUNC_MAP[d].name}</a>
                                )
                            })
                        }
                    </ul>
                    <form className="form-inline" onSubmit={this.handleSubmit}>
                        <input
                            type="search"
                            className="form-control mr-sm-2"
                            id="stock"
                            value={stock}
                            onChange={this.handleChange}
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button type="submit" className="btn btn-success my-2 my-sm-0">
                            Search
                        </button>
                    </form>
                </div>
            </nav>
        );
    }
}
function mapStateToProps(state) {
    return {
      stock: state.stock
    };
}
const Nav = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);
export default Nav;