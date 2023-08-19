import React, { useState, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import { subStr, properCase, formatINR, formatDDMMYYYY, formatTime12Hour } from "./Common";
import ItemSelector from "./MiscellaneousEditor";
import QuantityEditor from "./QuantityEditor";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const ItemViewGrid = ({pDefaultRowData}) => {    
    const gridRef = useRef();
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
            headerName: "Delivery", 
            field: "despatchDate",
            hide: false,
            width: 100,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatDDMMYYYY(params.value)} - ${formatTime12Hour(params.value)}` : ""},
        },
        {
            headerName: "Item", 
            field: "name", 
            hide: false,
            cellEditor: ItemSelector, 
            valueFormatter: (params) => {return !params.node.rowPinned ? `${properCase(subStr(params.value, 20))}` : ""},
        },
        {
            headerName: "Rate",
            field: "unitPrice",
            type: "rightAligned",
            width: 50,
            hide: true,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatINR(params.value)}` : ""},
        },
        {
            headerName: "Quantity",
            field: "quantity", 
            type: "rightAligned",
            width: 50,
            hide: false,
            cellEditor: QuantityEditor,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${Number(params.value)}` : ""},
        },
        {
            headerName: "Price",
            field: "totalPrice",
            type: "rightAligned",
            width: 50,
            hide: false,
            valueFormatter: (params) => {return `${formatINR(params.value)}`},
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
    ]);
    const [style] = useState({
        height: "100%",
        width: "100%"
    });

    // Start:: load empty data to grid
    const handleGridReady = () => {
        let row = [];
        let sum = 0;
        
        try {
            pDefaultRowData.forEach(element => {
                const data = {
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
                };
                
                sum += data.totalPrice;                       
                row.push(data);
            });

            gridRef.current.api.setRowData(row);
            gridRef.current.api.refreshCells();
            gridRef.current.api.redrawRows();
            gridRef.current.api.sizeColumnsToFit();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: load empty data to grid
    
	return (
        <div className = "col-12 ag-theme-alpine grid-height-400">
            <div style = {style}>
                <AgGridReact	
                    ref = {gridRef}
                    columnDefs = {columnDefs}
                    defaultColDef = {defaultColDef}
                    rowData = {null}
                    rowSelection = {"single"}
                    onGridReady = {handleGridReady}/>
            </div>
        </div>
    );
};
 
export default ItemViewGrid;