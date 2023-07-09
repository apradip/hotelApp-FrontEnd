import React, {useEffect, useState, useRef, useMemo} from "react";
import {AgGridReact} from "ag-grid-react"; 

import {formatINR, formatDDMMYYYY} from "../common/Common";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const RoomBillGrid = ({pData}) => {    
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [totalItemPrice, setTotalItemPrice] = useState(0);
    const [totalGstCharge, setTotalGstCharge] = useState(0);
    const [total, setTotal] = useState(0);

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

    const rowClassRules = useMemo(() => {
        return {
            "ag-row-pinned_other": (params) => {return params.node.rowPinned === "bottom" && params.data.rowId !== "Total"; },
        
            "ag-row-pinned_total": (params) => {return params.node.rowPinned === "bottom" && params.data.rowId === "Total"; },
        };
    }, []);  

    const [columnDefs] = useState([
        {
            headerName: "#", 
            field: "rowId", 
            width: 50,
            hide: false,
            editable: () => {return false},
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}.` : null},
        },
        {
            headerName: "Occupancy date", 
            field: "occupancyDate", 
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatDDMMYYYY(params.value)}` : ''}
        },
        {
            headerName: "Room no.", 
            field: "no", 
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}` : null}
        },
        {
            headerName: "Tariff", 
            field: "tariff", 
            type: "rightAligned",
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatINR(params.value)}` : `${formatINR(params.value)}`}
        },
        {
            field: "id"
        },
        {
            field: "gstCharge"
        }
    ]);

    const pinnedRowData = [
        {rowId: "Sum", tariff: 0},
        {rowId: "GST", tariff: 0},
        {rowId: "Total", triaff: 0}
    ];

    // Start:: load empty data to grid
    const handleGridReady = () => {
        gridRef.current.api.setRowData(rowData);
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();
        gridRef.current.api.sizeColumnsToFit();
    };
    // End:: load empty data to grid
    
    // Start:: load empty data to grid
    const handleFirstDataRendered = () => {
        // set pinned data
        pinnedRowData[0].tariff = totalItemPrice;
        pinnedRowData[1].tariff = totalGstCharge;
        pinnedRowData[2].tariff = total;

        gridRef.current.api && gridRef.current.api.setPinnedBottomRowData(pinnedRowData);
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();
        gridRef.current.api.sizeColumnsToFit();
    };
    // End:: load empty data to grid

    // Start:: format data as grid
    useEffect(() => {
        let totalPrice = 0;
        let totalGst = 0;
        let rows = [];

        pData.forEach(element => {
            const row = {
                            rowId: rows.length + 1, 
                            no: element.no, 
                            occupancyDate: element.occupancyDate,
                            tariff: element.tariff + (element.extraPersonCount * element.extraPersonTariff) + (element.extraBedCount * element.extraBedTariff) - element.discount,
                            id: element.id,
                            gstCharge: element.gstCharge
                        };
    
            rows.push(row);

            totalPrice += element.tariff;
            totalGst += element.gstCharge;
        });
        
        setTotalItemPrice(totalPrice);
        setTotalGstCharge(totalGst);
        setTotal(totalPrice + totalGst);

        setRowData(rows);
    }, [pData]);        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: format data as grid

	return (
        <div className="col-12 ag-theme-alpine grid-height-400">
            <AgGridReact	
                ref={gridRef}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={rowData}
                rowSelection={"single"}
                rowClassRules={rowClassRules}
                onGridReady={handleGridReady}
                onFirstDataRendered={handleFirstDataRendered}/>
        </div>
    );
}
 
export default RoomBillGrid;