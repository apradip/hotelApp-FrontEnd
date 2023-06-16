import React, {useContext, useEffect, useState, useRef, useMemo, useCallback} from "react";
import {AgGridReact} from "ag-grid-react";

import {HotelId} from "../../App";
import {useStateContext} from "../../contexts/ContextProvider";
import useFetchWithAuth from "../common/useFetchWithAuth";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const ServiceDespatchGrid = ({pState, pDefaultRowData, onChange}) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.hotelAPI}/${hotelId}`
    });

    const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          resizable: false,
          editable: false,
          sortable: false,
          filter: false,
          hide: true,
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
            width: 40,
            hide: false,
            valueFormatter: (params) => {return `${Number(params.value)}`},
            valueGetter: (params) => {return params.data.quantity},
        },
        {
            field: "serviceId"
        },
        {
            field: "serviceTransactionId"
        }
    ]);

    function isFirstColumn(params) {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
    }    

    // Start:: load empty data to grid
    const handleGridReady = (params) => {
        let row = [];
        
        pDefaultRowData.forEach(element => {
            const data = {
                            rowId: row.length + 1, 
                            serviceId: element.serviceId,
                            name: element.name, 
                            quantity: element.quantity,
                            serviceTransactionId: element.serviceTransactionId
                        };
    
            row.push(data);
        });

        setRowData(row);

        gridRef.current.api.setRowData(row);
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();
        gridRef.current.api.sizeColumnsToFit();
    };
    // End:: load empty data to grid
    
    // Start:: load empty data to grid
    const handleFirstDataRendered = (params) => {
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();
        gridRef.current.api.sizeColumnsToFit();
    };
    // End:: load empty data to grid

    const onSelectionChanged = useCallback(() => {
        const dataRows = gridRef.current.api.getSelectedRows();
        onChange(dataRows);
    }, []);

    // Start:: fetch hotel detail from api
    useEffect(() => {
        (async () => {
            try {
                await doFetch();
            } catch (err) {
                // console.log('Error occured when fetching data');
            }
          })();
    }, []);        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch hotel detail from api

    
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
}
 
export default ServiceDespatchGrid;