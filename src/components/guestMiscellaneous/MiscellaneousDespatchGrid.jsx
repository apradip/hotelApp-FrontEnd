import React, {useContext, useEffect, useState, useRef, useMemo, useCallback} from "react"
import {AgGridReact} from "ag-grid-react"

import {HotelId} from "../../App"
import {useStateContext} from "../../contexts/ContextProvider"
import useFetchWithAuth from "../common/useFetchWithAuth"

import "ag-grid-community/styles/ag-grid.css" // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css" // Optional theme CSS

const MiscellaneousDespatchGrid = ({pDefaultRowData, onChange}) => {    
    const hotelId = useContext(HotelId)
    const contextValues = useStateContext()
    const gridRef = useRef()
    const {doFetch} = useFetchWithAuth({
        url: `${contextValues.hotelAPI}/${hotelId}`
    })

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
            field: "id"
        },
        {
            field: "itemTransactionId"
        }
    ])

    function isFirstColumn(params) {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
    }    

    // Start:: load empty data to grid
    const handleGridReady = () => {
        let row = []
        
        pDefaultRowData.forEach(element => {
            const object = {
                            rowId: row.length + 1, 
                            id: element.id,
                            name: element.name, 
                            quantity: element.quantity, 
                            itemTransactionId: element.itemTransactionId
                        }
    
            row.push(object)
        })

        gridRef.current.api.setRowData(row)
        gridRef.current.api.refreshCells()
        gridRef.current.api.redrawRows()
        gridRef.current.api.sizeColumnsToFit()
    }
    // End:: load empty data to grid
    
    // Start:: load empty data to grid
    const handleFirstDataRendered = () => {
        gridRef.current.api.refreshCells()
        gridRef.current.api.redrawRows()
        gridRef.current.api.sizeColumnsToFit()
    }
    // End:: load empty data to grid

    // Start:: on row selection change set selected 
    const onSelectionChanged = useCallback(() => {
        onChange(gridRef.current.api.getSelectedRows())
    }, [])
    // End:: on row selection change set selected 

    // Start:: fetch hotel detail from api
    useEffect(() => {
        (async () => {
            await doFetch()
          })()
    }, [])        // eslint-disable-line react-hooks/exhaustive-deps
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
    )
}
 
export default MiscellaneousDespatchGrid