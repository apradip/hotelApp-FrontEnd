import React, { useState, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import { formatINR } from "../common/Common";
import FoodItemSelector from "../common/FoodEditor";
import QuantityEditor from "../common/QuantityEditor";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const TableOrderGrid = ({pDefaultRowData}) => {    
    const gridRef = useRef()

    const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          resizable: true,
          editable: false,
          sortable: false,
          filter: false,
          hide: true,
          suppressSizeToFit: true,
        }
    }, [])
    const rowClassRules = useMemo(() => {
        return {
          "ag-row-order": "data.despatchDate === undefined",
        };
    }, [])
    const [columnDefs] = useState([
        {
            headerName: "#", 
            field: "rowId", 
            width: 20,
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}.` : "Total"},
        },
        {
            headerName: "Item", 
            field: "name", 
            hide: false,
            cellEditor: FoodItemSelector, 
            editable: () => {return false},
            cellRenderer: (params) => {return params.value},
            valueGetter: (params) => {return params.data.name},
        },
        {
            headerName: "Rate",
            field: "unitPrice",
            type: "rightAligned",
            width: 50,
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatINR(params.value)}` : ""},
            valueGetter: (params) => {return params.data.unitPrice}
        },
        {
            headerName: "Quantity",
            field: "quantity", 
            type: "rightAligned",
            width: 50,
            hide: false,
            cellEditor: QuantityEditor,
            editable: () => {return false},
            valueFormatter: (params) => {return !params.node.rowPinned ? `${Number(params.value)}` : ""},
            valueGetter: (params) => {return params.data.quantity}
        },
        {
            headerName: "Price",
            field: "totalPrice",
            type: "rightAligned",
            width: 50,
            hide: false,
            valueFormatter: (params) => {return `${formatINR(params.value)}`},
            valueGetter: (params) => {return params.data.totalPrice}
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
    ])
    const pinnedRowData = [
        {rowId: "Total", totalPrice: 0}
    ]

    // Start:: load empty data to grid
    const handleGridReady = (params) => {
        let row = []
        let sum = 0

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
    
            sum += object.totalPrice                       
            row.push(object)
        })

        pinnedRowData[0].totalPrice = sum

        gridRef.current.api.setRowData(row)
        gridRef.current.api.setPinnedBottomRowData(pinnedRowData)
        gridRef.current.api.refreshCells()
        gridRef.current.api.redrawRows()

        params.api.sizeColumnsToFit()

        window.addEventListener("resize", function () {
            setTimeout(function () {params.api.sizeColumnsToFit()})
          })

        gridRef.current.api.sizeColumnsToFit()
    }
    // End:: load empty data to grid
    
	return (
        <div className="col-12 ag-theme-alpine grid-height-400">
            <AgGridReact	
                ref={gridRef}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowClassRules={rowClassRules}
                rowData={null}
                rowSelection={"single"}
                onGridReady={handleGridReady}/>
        </div>
    )
};
 
export default TableOrderGrid;