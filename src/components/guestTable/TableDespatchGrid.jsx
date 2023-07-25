import React, { useState, useCallback, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const TableDespatchGrid = ({pDefaultRowData, onChange}) => {    
    const gridRef = useRef();

    const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          resizable: true,
          editable: false,
          sortable: false,
          filter: false,
          hide: true,
          suppressSizeToFit: true,
        };
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
            width: 100, 
            hide: false,
            cellRenderer: (params) => {return params.value},
            valueGetter: (params) => {return params.data.name},
        },
        {
            headerName: "Quantity",
            field: "quantity", 
            type: "rightAligned",
            width: 40, 
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

    // Start:: load empty data to grid
    const handleGridReady = (params) => {
        let row = [];
        
        pDefaultRowData.forEach(element => {
            const object = {
                            rowId: row.length + 1, 
                            id: element.id,
                            name: element.name, 
                            quantity: element.quantity,
                            itemTransactionId: element.itemTransactionId
                        }
    
            row.push(object);
        });

        gridRef.current.api.setRowData(row);
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();

        params.api.sizeColumnsToFit();

        window.addEventListener("resize", function () {
            setTimeout(function () {params.api.sizeColumnsToFit();});
        });

        gridRef.current.api.sizeColumnsToFit();
    };
    // End:: load empty data to grid
    
    // Start:: load empty data to grid
    const handleFirstDataRendered = () => {
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();
        gridRef.current.api.sizeColumnsToFit();
    };
    // End:: load empty data to grid

    function isFirstColumn(params) {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
    };   

    const onSelectionChanged = useCallback(() => {
        const dataRows = gridRef.current.api.getSelectedRows();
        onChange(dataRows);
    }, []);

    
	return (
        <div className="col-12 ag-theme-alpine grid-height-400">
            <AgGridReact	
                ref={gridRef}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={null}
                rowSelection={"multiple"}
                onGridReady={handleGridReady}
                onFirstDataRendered={handleFirstDataRendered}
                onSelectionChanged={onSelectionChanged}/>
        </div>
    );
};
 
export default TableDespatchGrid;