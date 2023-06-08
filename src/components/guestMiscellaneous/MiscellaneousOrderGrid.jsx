import React, {useContext, useEffect, useState, useRef, useMemo, useCallback} from "react";
import {AgGridReact} from "ag-grid-react";

import {HotelId} from "../../App";
import {formatINR} from "../common/Common";
import {useStateContext} from "../../contexts/ContextProvider";
import MiscellaneousItemSelector from "../common/MiscellaneousEditor";
import QuantityEditor from "../common/QuantityEditor";
import useFetchWithAuth from "../common/useFetchWithAuth";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const MiscellaneousOrderGrid = ({pState, pDefaultRowData, onChange}) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const gridRef = useRef();
	const [selectedRowNode, setSelectedRowNode] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [rowData, setRowData] = useState();
    const [emptyRowCount, setEmptyRowCount] = useState();
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
        }
    }, []);
    const [columnDefs] = useState([
        {
            headerName: '#', 
            field: 'rowId', 
            width: 20,
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}.` : 'Total'},
        },
        {
            headerName: 'Item', 
            field: 'name', 
            hide: false,
            cellEditor: MiscellaneousItemSelector, 
            editable: (params) => {return params.node.rowPinned ? false : pState === 'ADD' ? true : pState === 'MOD' ? true : pState === 'VIEW' ? false : true},
            cellRenderer: (params) => {return params.value},
            valueGetter: (params) => {return params.data.name},
            valueSetter: (params) => {
                params.data.name = 'Select item';
                params.data.miscellaneousId = '';
                params.data.unitPrice = 0;

                if (params.newValue) {
                    const selectedItem = params.newValue[0];

                    // find selected table details
                    params.data.miscellaneousId = selectedItem._id;
                    params.data.name = selectedItem.name;
                    params.data.unitPrice = selectedItem.price;
                    params.data.quantity = 0;
                }

                return true;
            }
        },
        {
            headerName: 'Unit price',
            field: 'unitPrice',
            type: 'rightAligned',
            width: 50,
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatINR(params.value)}` : ''},
            valueGetter: (params) => {return params.data.unitPrice}
        },
        {
            headerName: 'Quantity',
            field: 'quantity', 
            type: 'rightAligned',
            width: 50,
            hide: false,
            cellEditor: QuantityEditor,
            editable: (params) => {return params.data.id !== "" ? params.node.rowPinned ? false : pState === 'ADD' ? true : pState === 'MOD' ? true : pState === 'VIEW' ? false : true : false},
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
            headerName: 'Price',
            field: 'totalPrice',
            type: 'rightAligned',
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
            field: 'miscellaneousId'
        },
        {
            field: 'serviceChargePercentage'
        },
        {
            field: 'serviceCharge'
        },
        {
            field: 'gstPercentage'
        },
        {
            field: 'gstCharge'
        }
    ]);
    const pinnedRowData = [
        {rowId: 'Total', totalPrice: 0}
    ];

    // Start:: load empty data to grid
    const handleGridReady = (params) => {
        let row = [];
        
        pDefaultRowData.forEach(element => {
            const data = {
                            rowId: row.length + 1, 
                            miscellaneousId: element.miscellaneousId,
                            name: element.name, 
                            unitPrice: element.unitPrice,
                            quantity: element.quantity, 
                            serviceChargePercentage: element.serviceChargePercentage, 
                            serviceCharge: element.serviceCharge, 
                            gstPercentage: element.gstPercentage, 
                            gstCharge: element.gstCharge, 
                            totalPrice: element.unitPrice * element.quantity
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

        gridRef.current.api.forEachNode((gridRow) => {
            if ((gridRow.data.name !== 'Select item') && ((gridRow.data.quantity !== 0))) {
                dataRows.push({
                            miscellaneousId: gridRow.data.miscellaneousId, 
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
              
        onChange(dataRows);
        calculateSum();
    };

    // Start:: fetch hotel detail from api
    useEffect(() => {
        (async () => {
            try {
                await doFetch();
            } catch (err) {
                console.log('Error occured when fetching data');
            }
          })();
    }, []);        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch hotel detail from api

    useEffect(() => {
        data && calculateSum();
    }, [data]);

    // Start:: set add empty row grid
    useEffect(() => {
        if (pState !== 'VIEW') {
            data && addRow();
        } 
    }, [emptyRowCount]);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: set add empty row grid

    // Start:: calculate sum on change tariff
    const calculateSum = useCallback (() => {
        let totalPrice = 0;
        let emptyCount = 0;

        // calculate total expance
        gridRef.current.api && gridRef.current.api.forEachNode((rowNode) => {
            totalPrice += rowNode.data.totalPrice;
        });
    
        pinnedRowData[0].totalPrice = totalPrice;
        
        gridRef.current.api && gridRef.current.api.setPinnedBottomRowData(pinnedRowData);

        //calculate empty row
        gridRef.current.api.forEachNode((rowNode) => {
            if (rowNode.data.name === 'Select item') {
                emptyCount ++;
            }
        });

        setEmptyRowCount(emptyCount);
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: calculate sum on change tariff
    
    const addRow = useCallback (() => {
        if (emptyRowCount <= 0) {
            let emptyRow = rowData;

            emptyRow.push({
                        rowId: emptyRow.length + 1, 
                        miscellaneousId: '', 
                        name: 'Select item', 
                        unitPrice: 0,
                        quantity: 0,
                        serviceChargePercentage: data.serviceChargePercentage,
                        serviceCharge: 0,
                        gstPercentage: data.foodGstPercentage,
                        gstCharge: 0,
                        totalPrice: 0
                    });

            setRowData(emptyRow);
            gridRef.current.api.setRowData(rowData);
            gridRef.current.api.sizeColumnsToFit();

            setEmptyRowCount(0);
        }
    }, [emptyRowCount]);        // eslint-disable-line react-hooks/exhaustive-deps

    
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
                onSelectionChanged={handleSelectionChanged}
                onCellValueChanged={handleCellValueChanged}/>
        </div>
    );
}
 
export default MiscellaneousOrderGrid;