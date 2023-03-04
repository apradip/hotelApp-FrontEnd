import React, { useContext, useEffect, useState, useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; 

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { formatMMDDYYYY } from "../common/Common";
import NumericEditor from "../common/NumericEditor";
import useFetchWithAuth from "../common/useFetchWithAuth";

const RoomBookingGrid = ({ pState, pRoomList, pDefaultRowData, pNoOfDay, onChange }) => {    
    const hotelId = useContext(HotelId);
	const contextValues = useStateContext();
    const gridRef = useRef();
	const [selectedRowNode, setSelectedRowNode] = useState();
    const [finalTariff, setFinalTariff] = useState(0);
        
    const [rowData, setRowData] = useState(pDefaultRowData);
    const [emptyRowCount, setEmptyRowCount] = useState(pDefaultRowData.length);
    const [roomData, setRoomData] = useState(null);
    pRoomList = [...[{_id:"", hotelId:hotelId, categoryId:"", no:"Select room", extraBedTariff:0, extraPersonTariff:0, maxDiscount:0, tariff:0}], ...pRoomList];

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
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}.` : `${params.value}`},
        },
        {
            headerName: "Date", 
            field: "occupancyDate", 
            width: 150,
            hide: operationWiseHideState(pState, "occupancyDate"),
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatMMDDYYYY(params.value)}` : ""},
        },
        {
            headerName: "Room No.", 
            field: "room", 
            width: 200,
            hide: false,
            cellEditor: "agSelectCellEditor", 
            cellEditorParams: {values: pRoomList.map((item) => {return item.no})},
            editable: (params) => {return params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true},
            cellRenderer: (params) => {return params.value},
            valueGetter: (params) => {return params.data.room},
            valueSetter: (params) => {
                params.data.room = params.newValue;

                // find selected room details
                const room = pRoomList.filter(item => item.no === params.newValue);
                if (room) {
                    params.data.extPerson = 0;
                    params.data.extraPersonTariff = room[0].extraPersonTariff;
                    params.data.extBed = 0;
                    params.data.extraBedTariff = room[0].extraBedTariff;
                    params.data.maxDiscount = room[0].maxDiscount;
                    params.data.discount = room[0].maxDiscount;
                    params.data.tariff = room[0].tariff;
                    params.data.roomId = room[0]._id;
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
                    calculateSum();
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            headerName: "Ext. Person",
            field: "extPerson", 
            hide: false,
            type: "rightAligned",
            cellEditor: NumericEditor, 
            // editable: (params) => {return params.data.roomId !== "" ? params.node.rowPinned ? false : true : false},
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
                calculateSum();
                return true;
            }
        },
        {
            headerName: "Ext. Bed", 
            field: "extBed", 
            hide: false,
            type: "rightAligned",
            cellEditor: NumericEditor, 
            // editable: (params) => {return params.data.roomId !== "" ? params.node.rowPinned ? false : true : false;},
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
                calculateSum();
                return true;
            }
        },
        {
            headerName: "Discount", 
            field: "discount", 
            hide: operationWiseHideState(pState, "discount"),
            type: "rightAligned",
            cellEditor: NumericEditor, 
            // editable: (params) => {return params.data.roomId !== "" ? params.node.rowPinned ? false : true : false},
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
                    calculateSum();
                    return true;
                } else {
                   return false;
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
                calculateSum();
                return true;
            }
        }
    ]);
    const pinnedRowData = [
        {rowId: `Total for ${pNoOfDay} no of day(s)`, finalTariff: 0}
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
    };
    // End:: load empty data to grid
    
    // Start:: load empty data to grid
    const handleFirstDataRendered = (params) => {
        gridRef.current.api.setPinnedBottomRowData(pinnedRowData);
        gridRef.current.api.sizeColumnsToFit();

        calculateSum();
    };
    // End:: load empty data to grid

    // Start:: on row selection change set selected 
    const handleSelectionChanged = (event) => {
		setSelectedRowNode(event.api.getSelectedNodes()[0]);		
        setFinalTariff(0);
        calculateSum();
    };
    // End:: on row selection change set selected 

    // set grid data to a parent component
    const handleCellValueChanged = (event) => {
        let empty = 0;
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
            } else {
                empty ++;
            }
        });

        setEmptyRowCount(empty);
        addRow();
        setRoomData(row);
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
    }, [data, error, loading]);
    // End:: set gst% to grid

    const addRow = useCallback (() => {
        if (emptyRowCount < 1) {
            let currentRow = rowData;

            currentRow.push({
                        rowId: currentRow.length + 1, 
                        occupancyDate: "", 
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

            setRowData(currentRow);

            gridRef.current.api.setRowData(rowData);
            gridRef.current.api.sizeColumnsToFit();
        }
    }, [emptyRowCount]);

    // Start:: calculate sum on change tariff
    const calculateSum = useCallback (() => {
        let subTotalTariff = 0;
        
        gridRef.current.api && gridRef.current.api.forEachNode((rowNode, index) => {
            subTotalTariff = subTotalTariff + rowNode.data.finalTariff;
        })

        pinnedRowData[0].rowId = `Total for ${pNoOfDay} no of day(s)`;
        pinnedRowData[0].finalTariff = subTotalTariff * pNoOfDay;

        gridRef.current.api && gridRef.current.api.setPinnedBottomRowData(pinnedRowData);
    }, []);
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
                return false;

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
		<AgGridReact	
			ref={gridRef}
			columnDefs={columnDefs}
			defaultColDef={defaultColDef}
            rowData={null}
			rowSelection={"single"}
			// editType={"fullRow"}
			onGridReady={handleGridReady}
            onFirstDataRendered={handleFirstDataRendered}
			onSelectionChanged={handleSelectionChanged}
            onCellValueChanged={handleCellValueChanged} />
    )
}
 
export default RoomBookingGrid;