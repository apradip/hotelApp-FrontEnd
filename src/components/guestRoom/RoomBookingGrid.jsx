import React, {useEffect, useState, useRef, useMemo, useCallback, forwardRef, useImperativeHandle} from "react";
import {AgGridReact} from "ag-grid-react"; 

import {Modal, NavLink} from "react-bootstrap";
import {useStateContext} from "../../contexts/ContextProvider";
import {formatDDMMYYYY} from "../common/Common";
import NumericEditor from "../common/NumericEditor";
import DateEditor from "../common/DateEditor";
import RoomEditor from "../common/RoomEditor";
import ExtraPersonEditor from "../common/ExtraPersonEditor";
import ExtraBedEditor from "../common/ExtraBedEditor";

import useFetchWithAuth from "../common/useFetchWithAuth";
import {X} from "react-feather";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

// Start:: form
const DeleteConfirmationForm = forwardRef((props, ref) => {
    const [showModal, setShowModal] = useState(false);

    // Start :: Show modal 
    const handleShowModal = () => {
        setShowModal(true);
    };
    // End :: Show modal 

    // Start :: Close modal 
    const handleCloseModal = () => {
        setShowModal(false);
    };
    // End :: Close modal 

    // Start :: Save 
    const handleSave = () => {
        setShowModal(false);
        props.onSubmited(); 
    };
    // End :: Save 


    // // Start:: Call delete api
    // const handleSave = async () => {
    //     //await doDelete();
    //     //error === null ? onSubmited() : toast.error(error);
    //     onSubmited();
    // };
    // // End:: Call delete api

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal}
    });
    // End:: forward reff show modal function
    
    // Start:: Html
    return (
        <Modal 
            size="sm"
            show={showModal}>

            {/* Start:: Modal header */}
            <Modal.Header>
                {/* Header text */}
                <Modal.Title>Delete guest room</Modal.Title>

                {/* Close button */}
                <NavLink 
                    className="nav-icon" href="#" 
                    onClick={handleCloseModal}>
                    <i className="align-middle"><X/></i>
                </NavLink>
            </Modal.Header>
            {/* End:: Modal header */}

            {/* Start:: Modal body */}
            <Modal.Body>
                <label className="form-label">Are you really want to delete room no. <mark><code>{props.pRoom} on {props.pOccupancyDate}</code></mark> ?</label>
            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>

                {/* Start:: Close button */}
                <button 
                    type="button"   
                    className="btn btn-danger"
                    autoFocus
                    onClick={handleCloseModal}>
                    Close
                </button>
                {/* End:: Close button */}

                {/* Start:: Save button */}
                <button 
                    type="button"
                    className="btn btn-success"
                    onClick={handleSave}>
                    Confirm
                </button>
                {/* End:: Save button */}

            </Modal.Footer>
            {/* End:: Modal footer */}

        </Modal>
    );
    // End:: Html

});
// End:: form

const RoomBookingGrid = ({pState, pData, onChange}) => {    
	const contextValues = useStateContext();
    const gridRef = useRef(null);
	const deleteRef = useRef(null);
    const [selectedRowNode, setSelectedRowNode] = useState(null);
    const [finalTariff, setFinalTariff] = useState(0);
    
    const suppressNavigation = (params) => {
        var KEY_DELETE = 'Delete';
        var event = params.event;
        var key = event.key;
        var keysToSuppress = [
            KEY_DELETE
        ];
        
        var suppress = keysToSuppress.some(function (suppressedKey) {
          return suppressedKey === key || key.toUpperCase() === suppressedKey;
        });

        return suppress;
    };
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
            suppressKeyboardEvent: function (params) {
                return suppressNavigation(params);
            },
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}.` : `Total`},
        },
        {
            headerName: "Date", 
            field: "occupancyDate", 
            width: 190,
            hide: operationWiseHideState(pState, "occupancyDate"),
            suppressKeyboardEvent: function (params) {
                return suppressNavigation(params);
            },
            cellEditor: DateEditor, 
            editable: (params) => {return params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true},            
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatDDMMYYYY(params.value)}` : ""},
        },
        {
            headerName: "Room No.", 
            field: "room", 
            width: 210,
            hide: false,
            suppressKeyboardEvent: function (params) {
                return suppressNavigation(params);
            },
            cellEditor: RoomEditor, 
            editable: (params) => {return params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true},
            cellRenderer: (params) => {return params.value},
            valueGetter: (params) => {return params.data.room},
            valueSetter: (params) => {
                params.data.room = "Select room";
                params.data.extraPerson = 0;
                params.data.extraPersonTariff = 0;
                params.data.extraBed = 0;
                params.data.extraBedTariff = 0;
                params.data.maxDiscount = 0;
                params.data.discount = 0;
                params.data.tariff = 0;
                params.data.id = "";
                params.data.gstPercentage = 0;    
                params.data.gstCharge = 0;
                params.data.finalTariff = 0;

                if (!params.newValue) return true;

                const selectedRoom = params.newValue[0];

                // find selected room details
                params.data.room = selectedRoom.no;
                params.data.extraPerson = 0;
                params.data.extraPersonTariff = selectedRoom.extraPersonTariff;
                params.data.extraBed = 0;
                params.data.extraBedTariff = selectedRoom.extraBedTariff;
                params.data.maxDiscount = selectedRoom.maxDiscount;
                params.data.discount = selectedRoom.maxDiscount;
                params.data.tariff = selectedRoom.tariff;
                params.data.id = selectedRoom._id;
                params.data.gstPercentage = 0;    
                params.data.gstCharge = 0;
                params.data.finalTariff = 0;

                // calculate room tariff
                const tariff = (params.data.extraPerson * params.data.extraPersonTariff) + 
                                (params.data.extraBed * params.data.extraBedTariff) + 
                                (params.data.tariff - params.data.discount) +
                                params.data.gstCharge;
                                
                params.data.finalTariff = tariff;
                    
                // set tariff to get the gst percentage
                setFinalTariff(tariff);

                return true;
            }
        },
        {
            headerName: "Ext. Person",
            field: "extraPerson", 
            width: 180,
            hide: false,
            type: "rightAligned",
            suppressKeyboardEvent: function (params) {
                return suppressNavigation(params);
            },
            cellEditor: ExtraPersonEditor,
            editable: (params) => {return params.data.id !== "" ? params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true : false},
            valueFormatter: (params) => {return !params.node.rowPinned ? `${Number(params.value)}` : ""},
            valueGetter: (params) => {return params.data.extraPerson},
            valueSetter: (params) => {
                params.data.extraPerson = params.newValue;

                // calculate room tariff
                const tariff = (params.newValue * params.data.extraPersonTariff) + 
                                    (params.data.extraBed * params.data.extraBedTariff) + 
                                    (params.data.tariff - params.data.discount);

                params.data.finalTariff = tariff;                                    

                // set tariff to get the gst percentage
				setFinalTariff(tariff);

                return true;
            }
        },
        {
            headerName: "Ext. Bed", 
            field: "extraBed", 
            width: 150,
            hide: false,
            type: "rightAligned",
            suppressKeyboardEvent: function (params) {
                return suppressNavigation(params);
            },
            cellEditor: ExtraBedEditor,
            editable: (params) => {return params.data.id !== "" ? params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true : false},
            valueFormatter: (params) => {return !params.node.rowPinned ? `${Number(params.value)}` : ""},
            valueGetter: (params) => {return params.data.extraBed},
            valueSetter: (params) => {
                params.data.extraBed = params.newValue;

                // calculate room tariff
                const tariff = (params.data.extraPerson * params.data.extraPersonTariff) + 
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
            suppressKeyboardEvent: function (params) {
                return suppressNavigation(params);
            },
            cellEditor: NumericEditor, 
            editable: (params) => {return params.data.id !== "" ? params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true : false},
            valueFormatter: (params) => {return !params.node.rowPinned ? `₹ ${Number(params.value).toFixed(2)}` : ""},
            valueGetter: (params) => {return params.data.discount},
            valueSetter: (params) => {
                if (params.newValue <= params.data.maxDiscount) {
                    params.data.discount = params.newValue;

                    // calculate room tariff
                    const tariff = (params.data.extraPerson * params.data.extraPersonTariff) + 
								   (params.data.extraBed * params.data.extraBedTariff) + 
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
            field: "gstCharge", 
            hide: operationWiseHideState(pState, "gstCharge"),
            type: "rightAligned",
            valueFormatter: (params) => {return !params.node.rowPinned ? `₹ ${Number(params.value).toFixed(2)}` : ""},
            valueGetter: (params) => {return params.data.gstCharge},
            valueSetter: (params) => {
                params.data.gstCharge = params.newValue;
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
            field: "id"
        },
        {
            field: "itemTransactionId"
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
                const finalTariff = (params.data.extraPerson * params.data.extraPersonTariff) + 
                                    (params.data.extraBed * params.data.extraBedTariff) + 
                                    (params.data.tariff - params.data.discount);

                params.data.gstCharge = (finalTariff * (params.newValue / 100));                                    
                params.data.finalTariff = finalTariff + params.data.gstCharge;                                    

                // set tariff to get the gst percentage
    			setFinalTariff(params.data.finalTariff);

                return true;
            }
        }
    ]);
    const pinnedRowData = [
        {rowId: "Total", finalTariff: 0}
    ];
	const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.gstAPI}`,
        params: {
			search: finalTariff
        }
    });

    // Start:: load empty data to grid
    const handleGridReady = useCallback(() => {
        let rows = [];

        pData.forEach(element => {
            rows.push({
                        rowId: rows.length + 1, 
                        occupancyDate: element.occupancyDate,
                        room: element.no, 
                        extraPerson: element.extraPerson,
                        extraBed: element.extraBed,
                        discount: element.discount,
                        gstCharge: element.gstCharge, 
                        finalTariff: element.finalTariff,
                        id: element.id,
                        itemTransactionId: element.itemTransactionId,
                        tariff: element.tariff,
                        extraPersonTariff: element.extraPersonTariff, 
                        extraBedTariff: element.extraBedTariff, 
                        maxDiscount: element.maxDiscount,
                        gstPercentage: element.gstPercentage
                    });
        });

        gridRef.current.api.setRowData(rows);
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();
        gridRef.current.api.sizeColumnsToFit();
    }, [pData]);
    // End:: load empty data to grid
    
    // Start:: load empty data to grid
    const handleFirstDataRendered = useCallback(() => {
        gridRef.current.api.setPinnedBottomRowData(pinnedRowData);
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();
        gridRef.current.api.sizeColumnsToFit();

        // claculate sum
        calculateSum();
    },[]);
    // End:: load empty data to grid
    
    // Start:: on row selection change set selected 
    const handleSelectionChanged = useCallback((event) => {
		setSelectedRowNode(event.api.getSelectedNodes()[0]);		
        // setFinalTariff(0);
    }, []);
    // End:: on row selection change set selected 

    // set grid data to a parent component
    const handleCellValueChanged = useCallback(() => {
        let rows = [];    

        gridRef.current.api.forEachNode((rowNode) => {
            if (rowNode.data.room !== "Select room") {
                rows.push({
                        rowId: rowNode.data.rowId, 
                        room: rowNode.data.room, 
                        occupancyDate: rowNode.data.occupancyDate, 
                        extraBed: rowNode.data.extraBed, 
                        extraPerson: rowNode.data.extraPerson, 
                        discount: rowNode.data.discount, 
                        gstCharge: rowNode.data.gstCharge,
                        finalTariff: rowNode.data.finalTariff, 
                        id: rowNode.data.id, 
                        itemTransactionId: rowNode.data.itemTransactionId,
                        tariff: rowNode.data.tariff,
                        extraBedTariff: rowNode.data.extraBedTariff, 
                        extraPersonTariff: rowNode.data.extraPersonTariff, 
                        maxDiscount: rowNode.data.maxDiscount, 
                        gstPercentage: rowNode.data.gstPercentage
                    });
            }
        });

        // calculate sum
        calculateSum();

        // raise on change event for parent component 
        onChange(rows);
    }, []);

    const handleCellKeyDown = useCallback((e) => {
        if ((pState !== "ADD") && (pState !== "MOD")) return;
        if (e.event.key === "Delete") deleteRef && deleteRef.current.handleShowModal();
    }, []);
    
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
                        selectedRowNode.setDataValue("gstPercentage", data.gstPercentage);
    }, [data, error, loading]);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: set gst% to grid
    
    const handleAddRow = useCallback (() => {
        let rows = [];
        let emptyCount = 0;

        if ((pState !== "ADD") && (pState !== "MOD")) return;

        //calculate empty row
        gridRef.current.api && gridRef.current.api.forEachNode((rowNode) => {
            if (rowNode.data.room === "Select room") emptyCount ++;

            rows.push({
                rowId: rowNode.data.rowId, 
                room: rowNode.data.room, 
                occupancyDate: rowNode.data.occupancyDate, 
                extraBed: rowNode.data.extraBed, 
                extraPerson: rowNode.data.extraPerson, 
                discount: rowNode.data.discount, 
                gstCharge: rowNode.data.gstCharge,
                finalTariff: rowNode.data.finalTariff, 
                id: rowNode.data.id, 
                itemTransactionId: rowNode.data.itemTransactionId,
                tariff: rowNode.data.tariff,
                extraBedTariff: rowNode.data.extraBedTariff, 
                extraPersonTariff: rowNode.data.extraPersonTariff, 
                maxDiscount: rowNode.data.maxDiscount, 
                gstPercentage: rowNode.data.gstPercentage
            });
        });

        if (emptyCount >= 1) return;

        rows.push({
            rowId: rows.length + 1, 
            occupancyDate: new Date(),
            room: "Select room", 
            extraPerson: 0, 
            extraBed: 0, 
            discount: 0, 
            gstCharge: 0, 
            finalTariff: 0, 
            id: "", 
            itemTransactionId: "",
            tariff: 0,
            extraPersonTariff: 0, 
            extraBedTariff: 0, 
            maxDiscount: 0, 
            gstPercentage: 0
        });

        gridRef.current.api.setRowData(rows);
    }, []);        // eslint-disable-line react-hooks/exhaustive-deps

    // Start :: Save 
    const handleDeleteRow = useCallback(() => {
        let rows = [];

        if ((pState !== "ADD") && (pState !== "MOD")) return;

        gridRef.current.api && gridRef.current.api.forEachNode((rowNode) => {
            if (rowNode.data.rowId !== selectedRowNode.data.rowId) {
                rows.push({
                    rowId: rows.length + 1, 
                    room: rowNode.data.room, 
                    occupancyDate: rowNode.data.occupancyDate, 
                    extraBed: rowNode.data.extraBed, 
                    extraPerson: rowNode.data.extraPerson, 
                    discount: rowNode.data.discount, 
                    gstCharge: rowNode.data.gstCharge,
                    finalTariff: rowNode.data.finalTariff, 
                    id: rowNode.data.id, 
                    itemTransactionId: rowNode.data.itemTransactionId,
                    tariff: rowNode.data.tariff,
                    extraBedTariff: rowNode.data.extraBedTariff, 
                    extraPersonTariff: rowNode.data.extraPersonTariff, 
                    maxDiscount: rowNode.data.maxDiscount, 
                    gstPercentage: rowNode.data.gstPercentage
                });
            }
        });
        
        gridRef.current.api.setRowData(rows);

        // calculate sum
        calculateSum();

        // raise on change event for parent component 
        onChange(rows);
    }, [selectedRowNode]);
    // End :: Save 

    // Start:: calculate sum on change tariff
    const calculateSum = useCallback (() => {
        let total = 0;

        // calculate total expance
        gridRef.current.api && gridRef.current.api.forEachNode((rowNode) => {
            total += rowNode.data.finalTariff;
        });

        pinnedRowData[0].finalTariff = total;
        gridRef.current.api && gridRef.current.api.setPinnedBottomRowData(pinnedRowData);

        // add empty row
        handleAddRow();
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: calculate sum on change tariff

    function operationWiseHideState (state, colName) {
        switch(state){
            case "ADD": 
                switch(colName) {
                    case "occupancyDate": 
                        return true;

                    case "room": 
                        return false;

                    case "discount": 
                        return false;

                    case "gstCharge": 
                        return false;

                    default: 
                        return false;
                }

            case "MOD": 
                switch(colName) {
                    case "occupancyDate": 
                        return false;

                    case "room": 
                        return false;

                    case "discount": 
                        return false;

                    case "gstCharge": 
                        return false;

                    default: 
                        return false;
                }

            case "VIEW": 
                switch(colName) {
                    case "occupancyDate": 
                        return false;

                    case "room": 
                        return false;

                    case "discount": 
                        return true;

                    case "gstCharge": 
                        return true;

                    default: 
                        return false;
                }

            default: 
                return false;
        }
    };
        
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
                onCellValueChanged={handleCellValueChanged}
                onCellKeyDown={handleCellKeyDown}/>

            {/* Start:: Form component */}
            {selectedRowNode &&
                <DeleteConfirmationForm 
                    ref={deleteRef}
                    pRoom={selectedRowNode.data.room}
                    pOccupancyDate={selectedRowNode.data.occupancyDate}
                    onSubmited={handleDeleteRow}/>}
                {/* End:: Form component */}

        </div>
    )
}
 
export default RoomBookingGrid;