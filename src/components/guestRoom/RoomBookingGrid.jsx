import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; 

// import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { formatDDMMYYYY } from "../common/Common";
import NumericEditor from "../common/NumericEditor";
import DateEditor from "../common/DateEditor";
import RoomEditor from "../common/RoomEditor";
import ExtraPersonEditor from "../common/ExtraPersonEditor";
import ExtraBedEditor from "../common/ExtraBedEditor";

import useFetchWithAuth from "../common/useFetchWithAuth";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const RoomBookingGrid = ({ pState, pDefaultRowData, pNoOfDay, onChange }) => {    
	const contextValues = useStateContext();
    const gridRef = useRef();
	const [selectedRowNode, setSelectedRowNode] = useState();
    const [finalTariff, setFinalTariff] = useState(0);
        
    const [rowData, setRowData] = useState(pDefaultRowData);
    const [emptyRowCount, setEmptyRowCount] = useState(pDefaultRowData.length);
    const [roomData, setRoomData] = useState(null);

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
            headerName: "Date", 
            field: "occupancyDate", 
            width: 190,
            hide: operationWiseHideState(pState, "occupancyDate"),
            cellEditor: DateEditor, 
            editable: (params) => {return params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true},            
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatDDMMYYYY(params.value)}` : ""},
        },
        {
            headerName: "Room No.", 
            field: "room", 
            width: 210,
            hide: false,
            cellEditor: RoomEditor, 
            editable: (params) => {return params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true},
            cellRenderer: (params) => {return params.value},
            valueGetter: (params) => {return params.data.room},
            valueSetter: (params) => {
                params.data.room = "Select room";
                params.data.extPerson = 0;
                params.data.extraPersonTariff = 0;
                params.data.extBed = 0;
                params.data.extraBedTariff = 0;
                params.data.maxDiscount = 0;
                params.data.discount = 0;
                params.data.tariff = 0;
                params.data.roomId = "";
                params.data.gstPercentage = 0;    
                params.data.gst = 0;

                if (params.newValue) {
                    const selectedRoom = params.newValue[0];

                    // find selected room details
                    params.data.room = selectedRoom.no;
                    params.data.extPerson = 0;
                    params.data.extraPersonTariff = selectedRoom.extraPersonTariff;
                    params.data.extBed = 0;
                    params.data.extraBedTariff = selectedRoom.extraBedTariff;
                    params.data.maxDiscount = selectedRoom.maxDiscount;
                    params.data.discount = selectedRoom.maxDiscount;
                    params.data.tariff = selectedRoom.tariff;
                    params.data.roomId = selectedRoom._id;
                    params.data.gstPercentage = 0;    
                    params.data.gst = 0;

                    // calculate room tariff
                    const tariff = (params.data.extPerson * params.data.extraPersonTariff) + 
                                    (params.data.extBed * params.data.extraBedTariff) + 
                                    (params.data.tariff - params.data.discount) +
                                    params.data.gst;
                                    
                    params.data.finalTariff = tariff;
                        
                    // set tariff to get the gst percentage
                    setFinalTariff(tariff);
                }

                return true;
            }
        },
        {
            headerName: "Ext. Person",
            field: "extPerson", 
            width: 180,
            hide: false,
            type: "rightAligned",
            cellEditor: ExtraPersonEditor,
            editable: (params) => {return params.data.roomId !== "" ? params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true : false},
            valueFormatter: (params) => {return !params.node.rowPinned ? `${Number(params.value)}` : ""},
            valueGetter: (params) => {return params.data.extPerson},
            valueSetter: (params) => {
                params.data.extPerson = params.newValue;

                // calculate room tariff
                const tariff = (params.newValue * params.data.extraPersonTariff) + 
                                    (params.data.extBed * params.data.extraBedTariff) + 
                                    (params.data.tariff - params.data.discount);

                params.data.finalTariff = tariff;                                    

                // set tariff to get the gst percentage
				setFinalTariff(tariff);

                return true;
            }
        },
        {
            headerName: "Ext. Bed", 
            field: "extBed", 
            width: 150,
            hide: false,
            type: "rightAligned",
            cellEditor: ExtraBedEditor,
            editable: (params) => {return params.data.roomId !== "" ? params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true : false},
            valueFormatter: (params) => {return !params.node.rowPinned ? `${Number(params.value)}` : ""},
            valueGetter: (params) => {return params.data.extBed},
            valueSetter: (params) => {
                params.data.extBed = params.newValue;

                // calculate room tariff
                const tariff = (params.data.extPerson * params.data.extraPersonTariff) + 
                                    (params.newValue * params.data.extraBedTariff) + 
                                    (params.data.tariff - params.data.discount);

                params.data.finalTariff = tariff;                                    

                // set tariff to get the gst percentage
				setFinalTariff(tariff);

                return true;
            }
        },
        {
            headerName: "Discount", 
            field: "discount", 
            hide: operationWiseHideState(pState, "discount"),
            type: "rightAligned",
            cellEditor: NumericEditor, 
            editable: (params) => {return params.data.roomId !== "" ? params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true : false},
            valueFormatter: (params) => {return !params.node.rowPinned ? `₹ ${Number(params.value).toFixed(2)}` : ""},
            valueGetter: (params) => {return params.data.discount},
            valueSetter: (params) => {
                if (params.newValue <= params.data.maxDiscount) {
                    params.data.discount = params.newValue;

                    // calculate room tariff
                    const tariff = (params.data.extPerson * params.data.extraPersonTariff) + 
								   (params.data.extBed * params.data.extraBedTariff) + 
                                   (params.data.tariff - params.newValue);

                    params.data.finalTariff = tariff;                                        

                    // set tariff to get the gst percentage
					setFinalTariff(tariff);

                    return true;
                }
            }
        },
        {
            headerName: "GST", 
            field: "gst", 
            hide: operationWiseHideState(pState, "gst"),
            type: "rightAligned",
            valueFormatter: (params) => {return !params.node.rowPinned ? `₹ ${Number(params.value).toFixed(2)}` : ""},
            valueGetter: (params) => {return params.data.gst},
            valueSetter: (params) => {
                params.data.gst = params.newValue;
                return true;
            }
        },
        {
            headerName: "Tariff", 
            field: "finalTariff", 
            hide: false,
            type: "rightAligned",
            cellClass: "ag-lock-pinned right",
            valueFormatter: (params) => {return `₹ ${Number(params.value).toFixed(2)}`},
            valueGetter: (params) => {return params.data.finalTariff},
            valueSetter: (params) => {
                params.data.finalTariff = params.newValue;
                return true;
            }
        },
        {
            field: "roomId"
        },
        {
            field: "tariff"
        },
        {
            field: "extraBedTariff"
        },
        {
            field: "extraPersonTariff"
        },
        {
            field: "maxDiscount"
        },
        {
            field: "gstPercentage", 
            valueGetter: (params) => {
                return params.data.gstPercentage;
            },
            valueSetter: (params) => {
                params.data.gstPercentage = params.newValue;

                // calculate room tariff
                const finalTariff = (params.data.extPerson * params.data.extraPersonTariff) + 
                                    (params.data.extBed * params.data.extraBedTariff) + 
                                    (params.data.tariff - params.data.discount);

                params.data.gst = (finalTariff * (params.newValue / 100));                                    
                params.data.finalTariff = finalTariff + params.data.gst;                                    

                // set tariff to get the gst percentage
    			setFinalTariff(params.data.finalTariff);

                return true;
            }
        }
    ]);
    const pinnedRowData = [
        {room: `Total ${pNoOfDay} day(s)`, finalTariff: 0}
    ];
	const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.gstAPI}`,
        params: {
			search: finalTariff
        }
    });

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
        setFinalTariff(0);
    };
    // End:: on row selection change set selected 

    // set grid data to a parent component
    const handleCellValueChanged = (event) => {
        let row = [];    

        gridRef.current.api.forEachNode((rowNode, index) => {
            if (rowNode.data.room !== "Select room") {
                row.push({
                            roomId : rowNode.data.roomId, 
                            occupancyDate : "", 
                            roomNo: rowNode.data.room, 
                            isAC : true, 
                            tariff : rowNode.data.finalTariff, 
                            extraBedCount : rowNode.data.extBed, 
                            extraBedTariff : rowNode.data.extraBedTariff, 
                            extraPersonCount : rowNode.data.extPerson, 
                            extraPersonTariff : rowNode.data.extraPersonTariff, 
                            discount : rowNode.data.discount, 
                            maxDiscount : rowNode.data.maxDiscount, 
                            gstPercentage : rowNode.data.gstPercentage, 
                            gstAmount : rowNode.data.gst, 
                            price : rowNode.data.tariff
                        });
            }
        });
              
        setRoomData(row);
        calculateSum();
        onChange(roomData);
    };

    // Start:: find gst% from api
    useEffect(() => {
        (async () => {
            try {
                if (finalTariff > 0) {
                    await doFetch();
                }
            } catch (err) {
                console.log("Error occured when fetching data");
            }
        })();
    }, [finalTariff]);   // eslint-disable-line react-hooks/exhaustive-deps
    // End:: find gst% from api

    // Start:: set gst% to grid
    useEffect(() => {
        !error && 
            !loading && 
                data && 
                    selectedRowNode && 
                        selectedRowNode.setDataValue('gstPercentage', data.gstPercentage);
    }, [data, error, loading]);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: set gst% to grid

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
                            occupancyDate: new Date(), 
                            room: "Select room", 
                            extPerson: 0, 
                            extBed: 0, 
                            discount: 0, 
                            gst: 0, 
                            finalTariff: 0, 
                            roomId: "", 
                            extraBedTariff: 0, 
                            extraPersonTariff: 0, 
                            maxDiscount: 0, 
                            tariff: 0, 
                            gstPercentage: 0
                        });

                setRowData(emptyRow);

                gridRef.current.api.setRowData(rowData);
                gridRef.current.api.sizeColumnsToFit();
            }
        }
    }, [emptyRowCount]);        // eslint-disable-line react-hooks/exhaustive-deps

    // Start:: calculate sum on change tariff
    const calculateSum = useCallback (() => {
        let subTotalTariff = 0;
        let emptyCount = 0;

        // calculate total expance
        gridRef.current.api && gridRef.current.api.forEachNode((rowNode, index) => {
            subTotalTariff = subTotalTariff + rowNode.data.finalTariff;
        })

        pinnedRowData[0].room = `Total ${pNoOfDay} day(s)`;
        pinnedRowData[0].finalTariff = subTotalTariff * pNoOfDay;
        
        gridRef.current.api && gridRef.current.api.setPinnedBottomRowData(pinnedRowData);


        //calculate empty row
        gridRef.current.api.forEachNode((rowNode, index) => {
            if (rowNode.data.room === "Select room") {
                emptyCount ++;
            }
        });

        setEmptyRowCount(emptyCount);
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: calculate sum on change tariff

    function operationWiseHideState (state, colName) {
        switch(state){
            case 'ADD': 
                switch(colName) {
                    case 'occupancyDate': 
                        return true;

                    case 'room': 
                        return false;

                    case 'discount': 
                        return false;

                    case 'gst': 
                        return false;

                    default: 
                        return false;
                }

            case 'MOD': 
                switch(colName) {
                    case 'occupancyDate': 
                        return false;

                    case 'room': 
                        return false;

                    case 'discount': 
                        return false;

                    case 'gst': 
                        return false;

                    default: 
                        return false;
                }

            case 'VIEW': 
                switch(colName) {
                    case 'occupancyDate': 
                        return false;

                    case 'room': 
                        return false;

                    case 'discount': 
                        return true;

                    case 'gst': 
                        return true;

                    default: 
                        return false;
                }

            default: 
                return false;
        }
    };

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
 
export default RoomBookingGrid;