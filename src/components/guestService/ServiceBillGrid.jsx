import React, {useEffect, useState, useRef, useMemo} from "react";
import {AgGridReact} from "ag-grid-react"; 

import {formatINR} from "../common/Common";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const ServiceBillGrid = ({pData}) => {    
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [totalItemPrice, setTotalItemPrice] = useState(0);
    const [totalServiceCharge, setTotalServiceCharge] = useState(0);
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
            editable: (params) => {return false},
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}.` : null},
        },
        {
            headerName: "Item", 
            field: "name", 
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}` : null}
        },
        {
            headerName: "UnitPrice", 
            field: "unitPrice", 
            type: "rightAligned",
            width: 50,
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatINR(params.value)}` : ''}
        },
        {
            headerName: "Quantity", 
            field: "quantity", 
            type: "rightAligned",
            width: 50,
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${Number(params.value)}` : ''}
        },
        {
            headerName: "Price", 
            field: "price", 
            type: "rightAligned",
            width: 50,
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatINR(params.value)}` : `${formatINR(params.value)}`}
        },
        {
            field: "id"
        },
        {
            field: "serviceCharge"
        },
        {
            field: "gstCharge"
        }
    ]);

    const pinnedRowData = [
        {rowId: "Sum", price: 0},
        {rowId: "Service tax", price: 0},
        {rowId: "GST", price: 0},
        {rowId: "Total", price: 0}
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
        // set pinned data
        pinnedRowData[0].price = totalItemPrice;
        pinnedRowData[1].price = totalServiceCharge;
        pinnedRowData[2].price = totalGstCharge;
        pinnedRowData[3].price = total;

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
        let totalService = 0;
        let rows = [];

        pData.forEach(element => {
            const elm = element.servicesDetail.services; 

            const row = {
                            rowId: rows.length + 1, 
                            id: elm.id,
                            name: elm.name, 
                            unitPrice: elm.unitPrice,
                            quantity: elm.quantity,
                            price: elm.unitPrice * elm.quantity,
                            serviceCharge: elm.serviceCharge,
                            gstCharge: elm.gstCharge
                        };
    
            rows.push(row);

            totalPrice += elm.unitPrice * elm.quantity;
            totalService += elm.serviceCharge;
            totalGst += elm.gstCharge;
        });
        
        setTotalItemPrice(totalPrice);
        setTotalGstCharge(totalGst);
        setTotalServiceCharge(totalService);
        setTotal(totalPrice + totalGst + totalService);

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
 
export default ServiceBillGrid;