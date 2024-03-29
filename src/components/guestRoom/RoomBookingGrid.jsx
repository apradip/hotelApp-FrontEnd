import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; 

import { NavLink } from "react-bootstrap";
import { useStateContext } from "../../contexts/ContextProvider";
import { formatDDMMYYYY, OperationState } from "../common/Common";
import NumericEditor from "../common/NumericEditor";
import DateEditor from "../common/DateEditor";
// import DateComponent from "../common/DateComponent.jsx";

import RoomEditor from "../common/RoomEditor";
import ExtraPersonEditor from "../common/ExtraPersonEditor";
import ExtraBedEditor from "../common/ExtraBedEditor";

import useFetchWithAuth from "../common/useFetchWithAuth";
import { Scissors } from "react-feather";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

// // Start:: form
// const DeleteConfirmationForm = forwardRef((props, ref) => {
//     const [showModal, setShowModal] = useState(false);

//     // Start :: Show modal 
//     const handleShowModal = () => {
//         setShowModal(true);
//     };
//     // End :: Show modal 

//     // Start :: Close modal 
//     const handleCloseModal = () => {
//         setShowModal(false);
//     };
//     // End :: Close modal 

//     // Start :: Save 
//     const handleSave = () => {
//         setShowModal(false);
//         props.onSubmited(); 
//     };
//     // End :: Save 


//     // // Start:: Call delete api
//     // const handleSave = async () => {
//     //     //await doDelete();
//     //     //error === null ? onSubmited() : toast.error(error);
//     //     onSubmited();
//     // };
//     // // End:: Call delete api

//     // Start:: forward reff show modal function
//     useImperativeHandle(ref, () => {
//         return {handleShowModal}
//     });
//     // End:: forward reff show modal function
    
//     // Start:: Html
//     return (
//         <Modal 
//             size="sm"
//             show={showModal}>

//             {/* Start:: Modal header */}
//             <Modal.Header>
//                 {/* Header text */}
//                 <Modal.Title>Delete guest room</Modal.Title>

//                 {/* Close button */}
//                 <NavLink 
//                     className="nav-icon" href="#" 
//                     onClick={handleCloseModal}>
//                     <i className="align-middle"><X/></i>
//                 </NavLink>
//             </Modal.Header>
//             {/* End:: Modal header */}

//             {/* Start:: Modal body */}
//             <Modal.Body>
//                 <label className="form-label">Are you really want to delete room no. <mark><code>{props.pRoom} on {props.pOccupancyDate}</code></mark> ?</label>
//             </Modal.Body>
//             {/* End:: Modal body */}

//             {/* Start:: Modal footer */}
//             <Modal.Footer>

//                 {/* Start:: Close button */}
//                 <button 
//                     type="button"   
//                     className="btn btn-danger"
//                     autoFocus
//                     onClick={handleCloseModal}>
//                     Close
//                 </button>
//                 {/* End:: Close button */}

//                 {/* Start:: Save button */}
//                 <button 
//                     type="button"
//                     className="btn btn-success"
//                     onClick={handleSave}>
//                     Confirm
//                 </button>
//                 {/* End:: Save button */}

//             </Modal.Footer>
//             {/* End:: Modal footer */}

//         </Modal>
//     );
//     // End:: Html

// });
// // End:: form

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

    // const filterParams = {
    //     comparator: (filterLocalDateAtMidnight, cellValue) => {
    //       const dateAsString = cellValue;
    //       const dateParts = dateAsString.split('/');
    //       const cellDate = new Date(
    //         Number(dateParts[2]),
    //         Number(dateParts[1]) - 1,
    //         Number(dateParts[0])
    //       );
    //       if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //         return 0;
    //       }
    //       if (cellDate < filterLocalDateAtMidnight) {
    //         return -1;
    //       }
    //       if (cellDate > filterLocalDateAtMidnight) {
    //         return 1;
    //       }
    //     },
    //   };

    const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          resizable: true,
          editable: false,
          sortable: false,
          filter: false,
          hide: true,
          suppressSizeToFit: false
        };
    }, []);
    const [columnDefs] = useState([
        {
            headerName: "#", 
            field: "rowId", 
            width: 100,
            hide: false,
            suppressKeyboardEvent: (params) => {return suppressNavigation(params)},
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}.` : `Total`},
        },
        {
            headerName: "Date", 
            field: "occupancyDate", 
            width: 190,
            cellEditor: DateEditor, 
            // cellEditor: DateComponent,
            hide: operationWiseHideState(pState, "occupancyDate"),
            // suppressKeyboardEvent: (params) => {return suppressNavigation(params)},
            editable: (params) => {return params.node.rowPinned ? false : pState === "ADD" ? true : pState === "MOD" ? true : pState === "VIEW" ? false : true},            
            // valueFormatter: (params) => {return !params.node.rowPinned ? `${formatDDMMYYYY(params.value)}` : ""}
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}` : ""}
        },
        {
            headerName: "Room No.", 
            field: "room", 
            width: 210,
            hide: false,
            cellEditor: RoomEditor, 
            suppressKeyboardEvent: (params) => {return suppressNavigation(params)},
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
            type: "rightAligned",
            width: 180,
            hide: false,
            cellEditor: ExtraPersonEditor,
            suppressKeyboardEvent: (params) => {return suppressNavigation(params)},
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
            type: "rightAligned",
            width: 150,
            hide: false,
            cellEditor: ExtraBedEditor,
            suppressKeyboardEvent: (params) => {return suppressNavigation(params)},
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
            type: "rightAligned",
            hide: operationWiseHideState(pState, "discount"),
            cellEditor: NumericEditor, 
            suppressKeyboardEvent: (params) => {return suppressNavigation(params)},
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
            type: "rightAligned",
            // hide: operationWiseHideState(pState, "gstCharge"),
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
            type: "rightAligned",
            hide: false,
            valueFormatter: (params) => {return `₹ ${Number(params.value).toFixed(2)}`},
            valueGetter: (params) => {return params.data.finalTariff},
            valueSetter: (params) => {
                params.data.finalTariff = params.newValue;
                return true;
            }
        },
        {
            headerName: "",
            field: "rowIdx",
            width: 6,
            hide: false,
            type: "rightAligned",
            cellRenderer: (params) => {
                if ((params.data.name !== "Select item") && (!params.node.rowPinned)) {
                return (
                    <NavLink to="#"
                        onClick={(e) => {e.preventDefault(); deleteRow(params.data.rowId);}}>
                        <Scissors 
                            className="feather-16 text-danger" />
                    </NavLink>
                );
                } else {
                    return null;
                }
            },
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

    // const components = useMemo(() => {
    //     return {
    //       agDateInput: DateComponent
    //     };
    //   }, []);

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

        if (pData) { 
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
        }

        gridRef.current.api.setRowData(rows);
        gridRef.current.api.setPinnedBottomRowData(pinnedRowData);
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();

        // params.api.sizeColumnsToFit();

        // window.addEventListener('resize', function () {
        //     setTimeout(function () {
        //       params.api.sizeColumnsToFit();
        //     });
        //   });

        // gridRef.current.api.sizeColumnsToFit();

        if (pData) handleAddRow();
    
        // raise on change event for parent component 
        // onChange(rows);

    }, [pData]);
    // End:: load empty data to grid
    
    // Start:: load empty data to grid
    const handleFirstDataRendered = useCallback(() => {
        // claculate sum
        calculateSum();
    },[]);
    // End:: load empty data to grid
    
    // // Start:: on row selection change set selected 
    // const handleSelectionChanged = useCallback((event) => {
	// 	setSelectedRowNode(event.api.getSelectedNodes()[0]);		
    //     // setFinalTariff(0);
    // }, []);
    // // End:: on row selection change set selected 

    // Start:: on grid data change calculate final tariff
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
    // End:: on grid data change calculate final tariff

    // const handleCellKeyDown = useCallback((e) => {
    //     if ((pState !== "ADD") && (pState !== "MOD")) return;
    //     if (e.event.key === "Delete") deleteRef && deleteRef.current.handleShowModal();
    // }, []);
    
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


    const deleteRow = useCallback ((rowIndex) => {
        try {
            if (pState !== OperationState.View) {
                let rows = [];

                gridRef.current.api && gridRef.current.api.forEachNode((rowNode) => {
                    if (rowNode.data.rowId !== rowIndex) {
                        const object = {
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
                            gstPercentage: rowNode.data.gstPercentage}

                        rows.push(object);
                    }
                });
    
                gridRef.current.api.setRowData(rows);
                onChange(rows);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);        // eslint-disable-line react-hooks/exhaustive-deps


    // Start :: Delete row 
    // const handleDeleteRow = useCallback(() => {
    //     let rows = [];

    //     if ((pState !== "ADD") && (pState !== "MOD")) return;

    //     gridRef.current.api && gridRef.current.api.forEachNode((rowNode) => {
    //         if (rowNode.data.rowId !== selectedRowNode.data.rowId) {
    //             rows.push({
    //                 rowId: rows.length + 1, 
    //                 room: rowNode.data.room, 
    //                 occupancyDate: rowNode.data.occupancyDate, 
    //                 extraBed: rowNode.data.extraBed, 
    //                 extraPerson: rowNode.data.extraPerson, 
    //                 discount: rowNode.data.discount, 
    //                 gstCharge: rowNode.data.gstCharge,
    //                 finalTariff: rowNode.data.finalTariff, 
    //                 id: rowNode.data.id, 
    //                 itemTransactionId: rowNode.data.itemTransactionId,
    //                 tariff: rowNode.data.tariff,
    //                 extraBedTariff: rowNode.data.extraBedTariff, 
    //                 extraPersonTariff: rowNode.data.extraPersonTariff, 
    //                 maxDiscount: rowNode.data.maxDiscount, 
    //                 gstPercentage: rowNode.data.gstPercentage
    //             });
    //         }
    //     });
        
    //     gridRef.current.api.setRowData(rows);

    //     // calculate sum
    //     calculateSum();

    //     // raise on change event for parent component 
    //     onChange(rows);
    // }, [selectedRowNode]);
    // End :: Delete row 

    // Start:: calculate sum on change tariff
    const calculateSum = useCallback (() => {
        let total = 0;

        // calculate total expance
        gridRef.current.api && gridRef.current.api.forEachNode((rowNode) => {
            total += rowNode.data.finalTariff;
        });

        pinnedRowData[0].finalTariff = total;
        gridRef.current.api.setPinnedBottomRowData(pinnedRowData);

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
                ref = {gridRef}
                columnDefs = {columnDefs}
                // components = {components}
                defaultColDef = {defaultColDef}
                rowData = {null}
                rowSelection = {"single"}
                onGridReady = {handleGridReady}
                onFirstDataRendered={handleFirstDataRendered}
                // onSelectionChanged={handleSelectionChanged}
                onCellValueChanged={handleCellValueChanged}
                // onCellKeyDown={handleCellKeyDown}
                />

            {/* Start:: Form component */}
            {/* {selectedRowNode &&
                <DeleteConfirmationForm 
                    ref={deleteRef}
                    pRoom={selectedRowNode.data.room}
                    pOccupancyDate={selectedRowNode.data.occupancyDate}
                    onSubmited={handleDeleteRow}/>} */}
                {/* End:: Form component */}

        </div>
    )
}
 
export default RoomBookingGrid;