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
            headerName: "Rate", 
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
            valueFormatter: (params) => {return `${formatINR(params.value)}`}
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
        pinnedRowData[0].price = totalItemPrice;
        pinnedRowData[1].price = totalServiceCharge;
        pinnedRowData[2].price = totalGstCharge;
        pinnedRowData[3].price = total;

        gridRef.current.api.setPinnedBottomRowData(pinnedRowData);
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
            const object = {
                            rowId: rows.length + 1, 
                            id: element.id,
                            name: element.name, 
                            unitPrice: element.unitPrice,
                            quantity: element.quantity,
                            price: element.unitPrice * element.quantity,
                            serviceCharge: element.serviceCharge,
                            gstCharge: element.gstCharge
                        };
    
            rows.push(object);

            totalPrice += element.unitPrice * element.quantity;
            totalService += element.serviceCharge;
            totalGst += element.gstCharge;
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