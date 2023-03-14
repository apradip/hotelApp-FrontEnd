import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; 

// import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import NumericEditor from "../common/NumericEditor";
import TableEditor from "../common/TableEditor";

import useFetchWithAuth from "../common/useFetchWithAuth";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const TableBookingGrid = ({ pState, pDefaultRowData, onChange }) => {    
	const contextValues = useStateContext();
    const gridRef = useRef();
	const [selectedRowNode, setSelectedRowNode] = useState();
        
    const [rowData, setRowData] = useState(pDefaultRowData);
    const [emptyRowCount, setEmptyRowCount] = useState(pDefaultRowData.length);
    const [tableData, setTableData] = useState(null);

    const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          resizable: false,
          editable: false,
          sortable: false,
          filter: false,
          hide: true,
        };
    }, []);
    const [columnDefs] = useState([
        {
            headerName: "#", 
            field: "rowId", 
            width: 100,
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}.` : ``},
        },
        {
            headerName: "Table No.", 
            field: "table", 
            width: 210,
            hide: false,
            cellEditor: TableEditor, 
            editable: (params) => {return params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true},
            cellRenderer: (params) => {return params.value},
            valueGetter: (params) => {return params.data.table},
            valueSetter: (params) => {
                params.data.room = "Select table";
                params.data.tableId = "";

                if (params.newValue) {
                    const selectedTable = params.newValue[0];

                    // find selected table details
                    params.data.table = selectedTable.no;
                    params.data.tableId = selectedTable._id;
                }

                return true;
            }
        },
        {
            field: "tableId"
        }
    ]);

    // Start:: load empty data to grid
    const handleGridReady = (params) => {
        gridRef.current.api.setRowData(rowData);
                
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();
        gridRef.current.api.sizeColumnsToFit();
    };
    // End:: load empty data to grid
    
    // Start:: on row selection change set selected 
    const handleSelectionChanged = (event) => {
		setSelectedRowNode(event.api.getSelectedNodes()[0]);		
    };
    // End:: on row selection change set selected 

    // set grid data to a parent component
    const handleCellValueChanged = (event) => {
        let row = [];    

        gridRef.current.api.forEachNode((rowNode, index) => {
            if (rowNode.data.room !== "Select table") {
                row.push({
                            tableId : rowNode.data.tableId, 
                            tableNo: rowNode.data.table
                        });
            }
        });
              
        setTableData(row);
        onChange(tableData);
    };


    // Start:: set add empty row grid
    useEffect(() => {
        addRow(); 
    }, [emptyRowCount]);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: set add empty row grid
    
    const addRow = useCallback (() => {
        if (rowData.length > 0) {
            if (emptyRowCount < 1) {
                
                let emptyRow = rowData;

                emptyRow.push({
                            rowId: emptyRow.length + 1, 
                            table: "Select table", 
                            tableId: "", 
                        });

                setRowData(emptyRow);

                gridRef.current.api.setRowData(rowData);
                gridRef.current.api.sizeColumnsToFit();
            }
        }
    }, [emptyRowCount]);        // eslint-disable-line react-hooks/exhaustive-deps


    // function operationWiseHideState (state, colName) {
    //     switch(state){
    //         case 'ADD': 
    //             switch(colName) {
    //                 case 'occupancyDate': 
    //                     return true;

    //                 case 'room': 
    //                     return false;

    //                 case 'discount': 
    //                     return false;

    //                 case 'gst': 
    //                     return false;

    //                 default: 
    //                     return false;
    //             }

    //         case 'MOD': 
    //             switch(colName) {
    //                 case 'occupancyDate': 
    //                     return false;

    //                 case 'room': 
    //                     return false;

    //                 case 'discount': 
    //                     return false;

    //                 case 'gst': 
    //                     return false;

    //                 default: 
    //                     return false;
    //             }

    //         case 'VIEW': 
    //             switch(colName) {
    //                 case 'occupancyDate': 
    //                     return false;

    //                 case 'room': 
    //                     return false;

    //                 case 'discount': 
    //                     return true;

    //                 case 'gst': 
    //                     return true;

    //                 default: 
    //                     return false;
    //             }

    //         default: 
    //             return false;
    //     }
    // };

	return (
            <div className="ag-theme-alpine grid">
                <AgGridReact	
                    ref={gridRef}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowData={null}
                    rowSelection={"single"}
                    onGridReady={handleGridReady}
                    onSelectionChanged={handleSelectionChanged}
                    onCellValueChanged={handleCellValueChanged} />
            </div>
    )
}
 
export default TableBookingGrid;