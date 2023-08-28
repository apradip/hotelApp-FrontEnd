import React, { useState, useRef, useMemo, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { Scissors } from "react-feather";

import { properCase, formatINR, OperationState } from "../common/Common";
import ItemSelector from "../common/MiscellaneousEditor";
import QuantityEditor from "../common/QuantityEditor";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const MiscellaneousOrderGrid = ({pState, pDefaultRowData, onChange}) => {    
    const gridRef = useRef();
    const [emptyRowCount, setEmptyRowCount] = useState();
    let rowData = [];

    const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          resizable: true,
          editable: false,
          sortable: false,
          filter: false,
          hide: true,
          suppressSizeToFit: false
        }
    }, []);
    const [columnDefs] = useState([
        {
            headerName: "#", 
            field: "rowId", 
            width: 20,
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}.` : "Total"}
        },
        {
            headerName: "Item", 
            field: "name", 
            hide: false,
            cellEditor: ItemSelector, 
            editable: (params) => {return params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true},
            valueFormatter: (params) => {return !params.node.rowPinned ? `${properCase(params.value)}` : ""},
            valueGetter: (params) => {return params.data.name},
            valueSetter: (params) => {
                params.data.name = "Select item";
                params.data.id = "";
                params.data.unitPrice = 0;

                if (params.newValue) {
                    const selectedItem = params.newValue[0];

                    // find selected table details
                    params.data.id = selectedItem._id;
                    params.data.name = selectedItem.name;
                    params.data.unitPrice = selectedItem.price;
                    params.data.quantity = 0;
                }

                return true;
            }
        },
        {
            headerName: "Rate",
            field: "unitPrice",
            type: "rightAligned",
            width: 50,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatINR(params.value)}` : ""},
            valueGetter: (params) => {return params.data.unitPrice},
            valueSetter: (params) => {
                params.data.totalPrice = params.newValue;
                
                return true;
            }
        },
        {
            headerName: "Quantity",
            field: "quantity", 
            type: "rightAligned",
            width: 50,
            hide: false,
            cellEditor: QuantityEditor,
            editable: (params) => {return params.data.id !== "" ? params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true : false},
            valueFormatter: (params) => {return !params.node.rowPinned ? `${Number(params.value)}` : ""},
            valueGetter: (params) => {return params.data.quantity},
            valueSetter: (params) => {
                params.data.quantity = params.newValue;
                params.data.serviceCharge = ((params.newValue * params.data.unitPrice) * (params.data.serviceChargePercentage / 100));
                params.data.gstCharge = ((params.newValue * params.data.unitPrice) * (params.data.gstPercentage / 100));
                params.data.totalPrice = params.newValue * params.data.unitPrice;                                    

                return true;
            }
        },
        {
            headerName: "Price",
            field: "totalPrice",
            type: "rightAligned",
            width: 50,
            hide: false,
            valueFormatter: (params) => {return `${formatINR(params.value)}`},
            valueGetter: (params) => {return params.data.totalPrice},
            valueSetter: (params) => {
                params.data.totalPrice = params.newValue;
                
                return true;
            }
        },
        {
            headerName: "",
            field: "rowIdx",
            width: 6,
            hide: false,
            type: "rightAligned",
            cellRenderer: (params) => {
                if ((params.data.name !== "Select item") && (!params.node.rowPinned)) {
                return (
                    <NavLink to="#"
                        onClick={(e) => {e.preventDefault(); deleteRow(params.data.rowId);}}>
                        <Scissors 
                            className="feather-16 text-danger" />
                    </NavLink>
                );
                } else {
                    return null;
                }
            },
        },        
        {
            field: "id"
        },
        {
            field: "serviceChargePercentage"
        },
        {
            field: "serviceCharge"
        },
        {
            field: "gstPercentage"
        },
        {
            field: "gstCharge"
        },
        {
            field: "despatchDate"
        }
    ]);
    const pinnedRowData = [
        {rowId: "Total", totalPrice: 0}
    ];
    const [style] = useState({
        height: "100%",
        width: "100%"
    });

    // Start:: load empty data to grid
    const handleGridReady = (params) => {
        let row = [];
        
        try {
            if (pDefaultRowData) {
                pDefaultRowData.forEach(element => {
                    const object = {
                        rowId: row.length + 1, 
                        id: element.id,
                        name: element.name, 
                        unitPrice: element.unitPrice,
                        quantity: element.quantity, 
                        serviceChargePercentage: element.serviceChargePercentage, 
                        serviceCharge: element.serviceCharge, 
                        gstPercentage: element.gstPercentage, 
                        gstCharge: element.gstCharge, 
                        totalPrice: element.unitPrice * element.quantity,
                        despatchDate: element.despatchDate
                    }
            
                    row.push(object);
                });
            }

            gridRef.current.api.setRowData(row);
            gridRef.current.api.setPinnedBottomRowData(pinnedRowData);
            gridRef.current.api.refreshCells();
            gridRef.current.api.redrawRows();
            gridRef.current.api.sizeColumnsToFit();

            rowData = row;
            calculateSum();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: load empty data to grid

    // set grid data to a parent component
    const handleCellValueChanged = () => {
        let row = [];    

        try {
            gridRef.current.api.forEachNode((gridRow) => {
                if ((gridRow.data.name !== "Select item") && ((gridRow.data.quantity !== 0))) {
                    row.push({
                        id: gridRow.data.id, 
                        name: gridRow.data.name,
                        unitPrice: gridRow.data.unitPrice,
                        quantity: gridRow.data.quantity,
                        serviceChargePercentage: gridRow.data.serviceChargePercentage,
                        serviceCharge: gridRow.data.serviceCharge,
                        gstPercentage: gridRow.data.gstPercentage,
                        gstCharge: gridRow.data.gstCharge,
                        totalPrice: gridRow.data.totalPrice,
                        despatchDate: gridRow.data.despatchDate
                    });
                }
            });
              
            onChange(row);
            calculateSum();
        } catch (err) {
            console.log(err);
        }
    };

    // Start:: calculate sum on change tariff
    const calculateSum = useCallback (() => {
        let total = 0;
        let emptyCount = 0;

        try {
            // calculate total expance
            gridRef.current.api && gridRef.current.api.forEachNode((rowNode) => {
                total += rowNode.data.totalPrice;
            });

            //calculate empty row
            gridRef.current.api.forEachNode((rowNode) => {
                if (rowNode.data.name === "Select item") 
                    emptyCount ++;
            });

            pinnedRowData[0].totalPrice = total;
            gridRef.current.api.setPinnedBottomRowData(pinnedRowData);
            setEmptyRowCount(emptyCount);

            if (emptyCount <= 0) addRow();
        } catch (err) {
            console.log(err);
        }
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: calculate sum on change tariff

    const addRow = useCallback (() => {
        let emptyRow = rowData;

        try {
            if (pState !== "VIEW") {
                emptyRow.push({
                    rowId: emptyRow.length + 1, 
                    id: "", 
                    name: "Select item", 
                    unitPrice: 0,
                    quantity: 0,
                    serviceChargePercentage: 0,
                    serviceCharge: 0,
                    gstPercentage: 0,
                    gstCharge: 0,
                    totalPrice: 0,
                    despatchDate: undefined
                });

                gridRef.current.api.setRowData(emptyRow);
                gridRef.current.api.sizeColumnsToFit();

                rowData = emptyRow;
                setEmptyRowCount(0);
            }
        } catch (err) {
            console.log(err);
        }
    }, [emptyRowCount]);        // eslint-disable-line react-hooks/exhaustive-deps

    
    const deleteRow = useCallback ((rowIndex) => {
        try {
            if (pState !== OperationState.View) {
                let row = [];

                gridRef.current.api && gridRef.current.api.forEachNode((rowNode) => {
                    if (rowNode.data.rowId !== rowIndex) {
                        const object = {
                            rowId: row.length + 1, 
                            id: rowNode.data.id, 
                            name: rowNode.data.name, 
                            unitPrice: rowNode.data.unitPrice,
                            quantity: rowNode.data.quantity,
                            serviceChargePercentage: rowNode.data.serviceChargePercentage,
                            serviceCharge: rowNode.data.serviceCharge,
                            gstPercentage: rowNode.data.gstPercentage,
                            gstCharge: rowNode.data.gstCharge,
                            totalPrice: rowNode.data.totalPrice,
                            despatchDate: rowNode.data.despatchDate};

                        row.push(object);
                    }
                });
    
                gridRef.current.api.setRowData(row);

                rowData = row;
                onChange(row);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);        // eslint-disable-line react-hooks/exhaustive-deps


	return (
        <div className = "col-12 ag-theme-alpine grid-height-400">
            <div style = {style}>
                <AgGridReact	
                    ref = {gridRef}
                    columnDefs = {columnDefs}
                    defaultColDef = {defaultColDef}
                    rowData = {null}
                    rowSelection = {"single"}
                    onGridReady = {handleGridReady}
                    onCellValueChanged = {handleCellValueChanged}/>
            </div>
        </div>
    );
};
 
export default MiscellaneousOrderGrid;