import React, { Component } from "react";
import { PenTool } from "react-feather";

export default class EditButtonRender extends Component {
  constructor(props) {
    super(props);

    this.invokeEditMethod = this.invokeEditMethod.bind(this);
  }

  invokeEditMethod() {
    this.props.context.componentParent.methodFromParent(
      `Row: ${this.props.node.rowIndex}, Col: ${this.props.colDef.headerName}`
    );
  }

  render() {
    return (
      <span>
        {/* <button
          style={{ height: 20, lineHeight: 0.5 }}
          onClick={this.invokeEditMethod}
          className="btn btn-info"> */}
          <i className="align-middle" style={{color: "green", fontSize: "4px"}}><PenTool/></i>
        {/* </button> */}
      </span>
    );
  }
}