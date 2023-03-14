import React, { useState, useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; 

import { formatDDMMYYYY } from "../common/Common";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const ExpensePaymentGrid = ({ pDefaultRowData }) => {    
    const gridRef = useRef();

    const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          resizable: false,
          editable: false,
          sortable: false,
          filter: false,
          hide: false,
        };
    }, []);
    const [columnDefs] = useState([
        {
            headerName: "#", 
            field: "rowId", 
            width: 100,
        },
        {
            headerName: "Date", 
            field: "transactionDate", 
            width: 100,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatDDMMYYYY(params.value)}` : ""},
        },
        {
            headerName: "Expense", 
            field: "expenseAmount", 
            type: "rightAligned",
            width: 120,
            cellStyle: function(params) {
                return {color: 'red'};
            },
            valueFormatter: (params) => {return Number(params.value) > 0 ? `₹ ${Number(params.value).toFixed(2)}` : ""},
        },
        {
            headerName: "Payment", 
            field: "paymentAmount", 
            type: "rightAligned",
            width: 120,
            cellStyle: function(params) {
                return {color: 'green'};
            },
            valueFormatter: (params) => {return Number(params.value) > 0 ? `₹ ${Number(params.value).toFixed(2)}` : ""},
        },
        {
            headerName: "Narration", 
            field: "narration", 
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}` : `₹ ${Number(params.value).toFixed(2)}`},
        }
    ]);
    const pinnedRowData = [
        {rowId: "Total", expenseAmount: 0, paymentAmount: 0, narration: 0}
    ];

    // Start:: load empty data to grid
    const handleGridReady = (params) => {
        gridRef.current.api.setRowData(pDefaultRowData);
        gridRef.current.api.setPinnedBottomRowData(pinnedRowData);

        calculateSum();

        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();
        gridRef.current.api.sizeColumnsToFit();
    };
    // End:: load empty data to grid

    // Start:: calculate sum on change tariff
    const calculateSum = useCallback (() => {
        let expense = 0;
        let payment = 0;
        let balance = 0;

        // calculate total expance
        gridRef.current.api && gridRef.current.api.forEachNode((rowNode, index) => {
            expense += rowNode.data.expenseAmount;
            payment += rowNode.data.paymentAmount;
        })

        balance = expense - payment;

        // set value to pinned row
        pinnedRowData[0].expenseAmount = expense;
        pinnedRowData[0].paymentAmount = payment;
        pinnedRowData[0].narration = balance;
        
        gridRef.current.api.setPinnedBottomRowData(pinnedRowData);
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: calculate sum on change tariff


	return (
            <div className="ag-theme-alpine grid">
                <AgGridReact	
                    ref={gridRef}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowData={null}
                    rowSelection={"single"}
                    onGridReady={handleGridReady} />
            </div>
    )
}
 
export default ExpensePaymentGrid;