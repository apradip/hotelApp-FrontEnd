import React, { useState, useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const ItemDespatchGrid = ({pDefaultRowData, onChange}) => {    
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
            headerName: "", 
            field: "rowId", 
            width: 20,
            hide: false,
            headerCheckboxSelection: isFirstColumn,
            checkboxSelection: isFirstColumn,
            valueFormatter: (params) => {return ""}
        },
        {
            headerName: "Item", 
            field: "name", 
            hide: false,
            cellRenderer: (params) => {return params.value},
            valueGetter: (params) => {return params.data.name},
        },
        {
            headerName: "Quantity",
            field: "quantity", 
            type: "rightAligned",
            width: 60,
            hide: false,
            valueFormatter: (params) => {return `${Number(params.value)}`},
            valueGetter: (params) => {return params.data.quantity},
        },
        {
            field: "id"
        },
        {
            field: "itemTransactionId"
        }
    ]);

    function isFirstColumn(params) {
        try {
            var displayedColumns = params.columnApi.getAllDisplayedColumns();
            var thisIsFirstColumn = displayedColumns[0] === params.column;
            return thisIsFirstColumn;
        } catch (err) {
            console.log(err);
        }
    };    

    // Start:: load empty data to grid
    const handleGridReady = () => {
        let row = [];
        
        try {
            pDefaultRowData.forEach(element => {
                const object = {
                    rowId: row.length + 1, 
                    id: element.id,
                    name: element.name, 
                    quantity: element.quantity, 
                    itemTransactionId: element.itemTransactionId
                };
        
                row.push(object);
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

    // Start:: on row selection change set selected 
    const onSelectionChanged = useCallback(() => {
        try {
            onChange(gridRef.current.api.getSelectedRows());
        } catch (err) {
            console.log(err);
        }
    }, []);
    // End:: on row selection change set selected 
    
	return (
        <AgGridReact	
            ref = {gridRef}
            columnDefs = {columnDefs}
            defaultColDef = {defaultColDef}
            rowData = {null}
            rowSelection = {"multiple"}
            onGridReady = {handleGridReady}
            onSelectionChanged = {onSelectionChanged}/>
    );
};
 
export default ItemDespatchGrid;