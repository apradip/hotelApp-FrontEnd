import React, { useState, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; 

import { formatINR, formatDDMMYYYY } from "../common/Common";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const RoomBillGrid = ({pData}) => {    
    const gridRef = useRef();
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
        {rowId: "Total", tariff: 0}
    ];

    // Start:: load empty data to grid
    const handleGridReady = (params) => {
        let totalPrice = 0;
        let totalGst = 0;
        let rows = [];

        try {
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

            pinnedRowData[0].tariff = totalPrice;
            pinnedRowData[1].tariff = totalGst;
            pinnedRowData[2].tariff = totalPrice + totalGst;

            gridRef.current.api.setRowData(rows);
            gridRef.current.api.refreshCells();
            gridRef.current.api.redrawRows();

            params.api.sizeColumnsToFit();
            gridRef.current.api.sizeColumnsToFit();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: load empty data to grid
    
    // Start:: load empty data to grid
    const handleFirstDataRendered = () => {
        try {
            gridRef.current.api && gridRef.current.api.setPinnedBottomRowData(pinnedRowData);
        } catch (err) {
            console.log(err);
        }
    };
    // End:: load empty data to grid


	return (
        <div className="col-12 ag-theme-alpine grid-height-400">
            <AgGridReact	
                ref = {gridRef}
                columnDefs = {columnDefs}
                defaultColDef = {defaultColDef}
                rowData = {null}
                rowSelection = {"single"}
                rowClassRules = {rowClassRules}
                onGridReady = {handleGridReady}
                onFirstDataRendered = {handleFirstDataRendered} />
        </div>
    );
}
 
export default RoomBillGrid;