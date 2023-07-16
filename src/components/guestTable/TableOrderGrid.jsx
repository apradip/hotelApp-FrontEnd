import React, {useContext, useEffect, useState, useRef, useMemo, useCallback} from "react"
import {AgGridReact} from "ag-grid-react"

import {HotelId} from "../../App"
import {formatINR} from "../common/Common"
import {useStateContext} from "../../contexts/ContextProvider"
import FoodItemSelector from "../common/FoodEditor"
import QuantityEditor from "../common/QuantityEditor"
import useFetchWithAuth from "../common/useFetchWithAuth"

import "ag-grid-community/styles/ag-grid.css" // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css" // Optional theme CSS

const TableOrderGrid = ({pState, pDefaultRowData, onChange}) => {    
    const hotelId = useContext(HotelId)
    const contextValues = useStateContext()
    const gridRef = useRef()
    const [rowData, setRowData] = useState()
    const [emptyRowCount, setEmptyRowCount] = useState()
    const {data, doFetch} = useFetchWithAuth({
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
            editable: (params) => {return params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true},
            cellRenderer: (params) => {return params.value},
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
            editable: (params) => {return params.data.id !== "" ? params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true : false},
            valueFormatter: (params) => {return !params.node.rowPinned ? `${Number(params.value)}` : ""},
            valueGetter: (params) => {return params.data.quantity},
            valueSetter: (params) => {
                params.data.quantity = params.newValue;
                params.data.serviceCharge = ((params.newValue * params.data.unitPrice) * (params.data.serviceChargePercentage / 100));
                params.data.gstCharge = ((params.newValue * params.data.unitPrice) * (params.data.gstPercentage / 100));
                params.data.totalPrice = (params.newValue * params.data.unitPrice);

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
    
            row.push(object)
        });

        setRowData(row)

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
    
    // Start:: load empty data to grid
    const handleFirstDataRendered = () => {
        calculateSum()
    }
    // End:: load empty data to grid

    // set grid data to a parent component
    const handleCellValueChanged = () => {
        let dataRows = []    

        gridRef.current.api.forEachNode((gridRow) => {
            if ((gridRow.data.name !== "Select item") && ((gridRow.data.quantity !== 0))) {
                dataRows.push({
                            id: gridRow.data.id, 
                            name: gridRow.data.name,
                            unitPrice: gridRow.data.unitPrice,
                            quantity: gridRow.data.quantity,
                            serviceChargePercentage: gridRow.data.serviceChargePercentage,
                            serviceCharge: gridRow.data.serviceCharge,
                            gstPercentage: gridRow.data.gstPercentage,
                            gstCharge: gridRow.data.gstCharge,
                            totalPrice: gridRow.data.totalPrice,
                            despatchDate: undefined
                        })
            }
        })
              
        onChange(dataRows)
        calculateSum()
    }

    // Start:: fetch hotel detail from api
    useEffect(() => {
        (async () => {
            await doFetch()
          })()
    }, [])        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch hotel detail from api

    useEffect(() => {
        data && calculateSum()
    }, [data])

    // Start:: set add empty row grid
    useEffect(() => {
        if (pState !== "VIEW") {
            data && addRow()
        } 
    }, [emptyRowCount])     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: set add empty row grid

    // Start:: calculate sum on change tariff
    const calculateSum = useCallback (() => {
        let total = 0
        let emptyCount = 0

        // calculate total expance
        gridRef.current.api && gridRef.current.api.forEachNode((rowNode) => {
            total += rowNode.data.totalPrice
        });

        //calculate empty row
        gridRef.current.api.forEachNode((rowNode) => {
            if (rowNode.data.name === "Select item") emptyCount ++
        });

        pinnedRowData[0].totalPrice = total
        gridRef.current.api.setPinnedBottomRowData(pinnedRowData)
        setEmptyRowCount(emptyCount)
    }, [])     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: calculate sum on change tariff
    
    const addRow = useCallback (() => {
        if (emptyRowCount <= 0) {
            let emptyRow = rowData

            emptyRow.push({
                        rowId: emptyRow.length + 1, 
                        id: "", 
                        name: "Select item", 
                        unitPrice: 0,
                        quantity: 0,
                        serviceChargePercentage: data.serviceChargePercentage,
                        serviceCharge: 0,
                        gstPercentage: data.foodGstPercentage,
                        gstCharge: 0,
                        totalPrice: 0,
                        despatchDate: undefined
                    })

            setRowData(emptyRow)
            gridRef.current.api.setRowData(rowData)
            gridRef.current.api.sizeColumnsToFit()

            setEmptyRowCount(0)
        }
    }, [emptyRowCount])        // eslint-disable-line react-hooks/exhaustive-deps

    
	return (
        <div className="col-12 ag-theme-alpine grid-height-400">
            <AgGridReact	
                ref={gridRef}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={null}
                rowSelection={"single"}
                onGridReady={handleGridReady}
                onFirstDataRendered={handleFirstDataRendered}
                onCellValueChanged={handleCellValueChanged}/>
        </div>
    )
}
 
export default TableOrderGrid