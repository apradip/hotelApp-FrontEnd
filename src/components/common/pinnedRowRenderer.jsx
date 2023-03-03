import React, { Component } from "react";

export default class pinnedRowRenderer extends Component {
  render() {
    if (this.props.colDef.field === "rowId" || this.props.colDef.field === "room") {
      return <span className="ag-row-pinned">{this.props.value}</span>;
    } else if (this.props.colDef.field === "finalTariff") {
      return <span className="ag-row-pinned right">₹ {this.props.value.toFixed(2)}</span>;
    }
  }
}