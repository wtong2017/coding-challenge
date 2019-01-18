import React, { Component } from "react";
import { connect } from "react-redux";
import { selectStock, getDetail } from "../actions/index";
function mapDispatchToProps(dispatch) {
  return {
    selectStock: stock => dispatch(selectStock(stock)),
    getDetail: stock => dispatch(getDetail(stock))
  };
}
class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      stock: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { stock } = this.state;
    this.props.selectStock(stock);
    this.props.getDetail(stock);
    this.setState({ stock: '' });
  }
  render() {
    const { stock } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
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