import React, { useContext, useEffect, useState, useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; 

import { HotelId } from "../../App";
import { formatINR } from "../common/Common";
import { useStateContext } from "../../contexts/ContextProvider";
import MiscellaneousEditor from "../common/MiscellaneousEditor";
import QuantityEditor from "../common/QuantityEditor";
import useFetchWithAuth from "../common/useFetchWithAuth";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const MiscellaneousOrderGrid = ({ pState, pDefaultRowData, onChange }) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const gridRef = useRef();
	const [selectedRowNode, setSelectedRowNode] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [rowData, setRowData] = useState(pDefaultRowData);
    const [emptyRowCount, setEmptyRowCount] = useState(-1);
    const [itemData, setItemData] = useState(null);
    
    const { data, doFetch } = useFetchWithAuth({
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
        };
    }, []);
    const [columnDefs] = useState([
        {
            headerName: "#", 
            field: "rowId", 
            width: 100,
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}.` : "Total"},
        },
        {
            headerName: "Item", 
            field: "name", 
            width: 210,
            hide: false,
            cellEditor: MiscellaneousEditor, 
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
            headerName: "Unit price",
            field: "unitPrice",
            hide: false,
            type: "rightAligned",
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatINR(params.value)}` : ""},
            valueGetter: (params) => {return params.data.unitPrice}
        },
        {
            headerName: "Quantity",
            field: "quantity", 
            hide: false,
            type: "rightAligned",
            cellEditor: QuantityEditor,
            editable: (params) => {return params.data.id !== "" ? params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true : false},
            valueFormatter: (params) => {return !params.node.rowPinned ? `${Number(params.value)}` : ""},
            valueGetter: (params) => {return params.data.quantity},
            valueSetter: (params) => {
                params.data.quantity = params.newValue;

                // calculate price with gst and service charge
                // const totalPrice = (params.newValue * params.data.unitPrice) + 
                //                ((params.newValue * params.data.unitPrice) * (params.data.serviceChargePercentage / 100)) + 
                //                ((params.newValue * params.data.unitPrice) * (params.data.gstPercentage / 100));

                params.data.serviceCharge = ((params.newValue * params.data.unitPrice) * (params.data.serviceChargePercentage / 100));
                params.data.gstCharge = ((params.newValue * params.data.unitPrice) * (params.data.gstPercentage / 100));
                const totalPrice = (params.newValue * params.data.unitPrice);
                params.data.totalPrice = totalPrice;                                    

                // set tariff to get the gst percentage
                setTotalPrice(totalPrice);

                return true;
            }
        },
        {
            headerName: "Price",
            field: "totalPrice",
            hide: false,
            type: "rightAligned",
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
        }
    ]);
    const pinnedRowData = [
        {rowId: 'Total', totalPrice: 0}
    ];

    // Start:: load empty data to grid
    const handleGridReady = (params) => {
        gridRef.current.api.setRowData(rowData);
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();
        gridRef.current.api.sizeColumnsToFit();
    };
    // End:: load empty data to grid
    
    // Start:: load empty data to grid
    const handleFirstDataRendered = (params) => {
        gridRef.current.api.setPinnedBottomRowData(pinnedRowData);
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();
        gridRef.current.api.sizeColumnsToFit();

        calculateSum();
    };
    // End:: load empty data to grid

    // Start:: on row selection change set selected 
    const handleSelectionChanged = (event) => {
		setSelectedRowNode(event.api.getSelectedNodes()[0]);		
    };
    // End:: on row selection change set selected 

    // set grid data to a parent component
    const handleCellValueChanged = (event) => {
        let dataRows = [];    

        gridRef.current.api.forEachNode((gridRow, index) => {
            if ((gridRow.data.name !== "Select item") && ((gridRow.data.quantity !== 0))){
                dataRows.push({
                            id: gridRow.data.id, 
                            name: gridRow.data.name,
                            unitPrice: gridRow.data.unitPrice,
                            quantity: gridRow.data.quantity,
                            serviceChargePercentage: gridRow.data.serviceChargePercentage,
                            serviceCharge: gridRow.data.serviceCharge,
                            gstPercentage: gridRow.data.gstPercentage,
                            gstCharge: gridRow.data.gstCharge,
                            totalPrice: gridRow.data.totalPrice
                        });
            }
        });
              
        //setItemData(dataRows);
        onChange(dataRows);
        calculateSum();
    };

    // Start:: fetch hotel detail from api
    useEffect(() => {
        (async () => {
            try {
                await doFetch();
            } catch (err) {
                console.log("Error occured when fetching data");
            }
          })();
    }, []);        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch hotel detail from api

    useEffect(() => {
        data && calculateSum();
    }, [data]);

    // Start:: set add empty row grid
    useEffect(() => {
        data && addRow(); 
    }, [emptyRowCount]);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: set add empty row grid

    // Start:: calculate sum on change tariff
    const calculateSum = useCallback (() => {
        let totalPrice = 0;
        let emptyCount = 0;

        // calculate total expance
        gridRef.current.api && gridRef.current.api.forEachNode((rowNode, index) => {
            totalPrice += rowNode.data.totalPrice;
        })
    
        pinnedRowData[0].totalPrice = totalPrice;
        
        gridRef.current.api && gridRef.current.api.setPinnedBottomRowData(pinnedRowData);

        //calculate empty row
        gridRef.current.api.forEachNode((rowNode, index) => {
            if (rowNode.data.name === "Select item") {
                emptyCount ++;
            }
        });

        setEmptyRowCount(emptyCount);
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: calculate sum on change tariff
    
    const addRow = useCallback (() => {
        // if (rowData.length > 0) {
            if (emptyRowCount < 1) {
                let emptyRow = rowData;

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
                        });

                setRowData(emptyRow);
                gridRef.current.api.setRowData(rowData);
                gridRef.current.api.sizeColumnsToFit();

                setEmptyRowCount(-1);
            }

        // }
    }, [emptyRowCount]);        // eslint-disable-line react-hooks/exhaustive-deps

    
	return (
        <div className="ag-theme-alpine grid">
            <AgGridReact	
                ref={gridRef}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={null}
                rowSelection={"single"}
                onGridReady={handleGridReady}
                onFirstDataRendered={handleFirstDataRendered}
                onSelectionChanged={handleSelectionChanged}
                onCellValueChanged={handleCellValueChanged} />
        </div>
    )
}
 
export default MiscellaneousOrderGrid;