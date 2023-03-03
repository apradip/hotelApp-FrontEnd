import React, { Component } from "react";
import { Scissors } from "react-feather";

export default class DeleteButtonRender extends Component {
  constructor(props) {
    super(props);

    this.invokeDeleteMethod = this.invokeDeleteMethod.bind(this);
  }

  invokeDeleteMethod() {
    this.props.context.componentParent.methodFromParent(
      `Row: ${this.props.node.rowIndex}, Col: ${this.props.colDef.headerName}`
    );
  }

  render() {
    return (
      <span>
        {/* <button
          style={{ height: 20, lineHeight: 0.5 }}
          onClick={this.invokeDeleteMethod}
          className="btn btn-info"> */}
          <i className="align-middle" style={{color: "red", fontSize: "4px"}}><Scissors/></i>
        {/* </button> */}
      </span>
    );
  }
}