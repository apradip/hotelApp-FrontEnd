import React, { useState, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import { formatINR, formatDDMMYYYY, formatTime12Hour } from "../common/Common";
import ItemSelector from "../common/ServiceEditor";
import QuantityEditor from "../common/QuantityEditor";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const ServiceViewGrid = ({pDefaultRowData}) => {    
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
        }
    }, []);
    const [columnDefs] = useState([
        {
            headerName: "#", 
            field: "rowId", 
            width: 20,
            hide: false,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${params.value}.` : "Total"}
        },
        {
            headerName: "Delivery", 
            field: "despatchDate",
            hide: false,
            width: 100,
        },
        {
            headerName: "Item", 
            field: "name", 
            hide: false,
            cellEditor: ItemSelector, 
            editable: () => {return false},
            cellRenderer: (params) => {return params.value},
            valueGetter: (params) => {return params.data.name}
        },
        {
            headerName: "Rate",
            field: "unitPrice",
            type: "rightAligned",
            width: 50,
            hide: true,
            valueFormatter: (params) => {return !params.node.rowPinned ? `${formatINR(params.value)}` : ""},
            valueGetter: (params) => {return params.data.unitPrice}
        },
        {
            headerName: "Quantity",
            field: "quantity", 
            type: "rightAligned",
            width: 50,
            hide: false,
            cellEditor: QuantityEditor,
            editable: () => {return false},
            valueFormatter: (params) => {return !params.node.rowPinned ? `${Number(params.value)}` : ""},
            valueGetter: (params) => {return params.data.quantity}
        },
        {
            headerName: "Price",
            field: "totalPrice",
            type: "rightAligned",
            width: 50,
            hide: false,
            valueFormatter: (params) => {return `${formatINR(params.value)}`},
            valueGetter: (params) => {return params.data.totalPrice}
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
        {rowId: "Total", totalPrice: 0}
    ];
    const [style] = useState({
        height: "100%",
        width: "100%"
    });


        // useEffect(() => {
    //     pData.forEach(element => {
    //         const rowData = {
    //             rowId: defaultRowData.length + 1, 
    //             id: element.id,
    //             name: element.name, 
    //             unitPrice: element.unitPrice,
    //             quantity: element.quantity, 
    //             serviceChargePercentage: element.serviceChargePercentage, 
    //             serviceCharge: element.serviceCharge, 
    //             gstPercentage: element.gstPercentage, 
    //             gstCharge: element.gstCharge, 
    //             totalPrice: element.unitPrice * element.quantity,
    //             despatchDate: element.despatchDate ? element.despatchDate : "",
    //             despatchTime: element.despatchTime ? element.despatchTime : ""
    //         };
    
    //         defaultRowData.push(rowData);
    //     });

    //     setDefaultRowData(defaultRowData);
    // }, [pData]);        // eslint-disable-line react-hooks/exhaustive-deps

    // Start:: load empty data to grid
    const handleGridReady = (params) => {
        let row = [];
        let sum = 0;
        
        try {
            pDefaultRowData.forEach(element => {
                const data = {
                    rowId: row.length + 1, 
                    id: element.id,
                    name: element.name, 
                    unitPrice: element.unitPrice,
                    quantity: element.quantity, 
                    serviceChargePercentage: element.serviceChargePercentage, 
                    serviceCharge: element.serviceCharge, 
                    gstPercentage: element.gstPercentage, 
                    gstCharge: element.gstCharge, 
                    totalPrice: element.unitPrice * element.quantity,
                    despatchDate: formatDDMMYYYY(element.despatchDate) + " - " + formatTime12Hour(element.despatchTime)
                };
                
                sum += data.totalPrice;                       
                row.push(data);
            });

            pinnedRowData[0].totalPrice = sum;

            gridRef.current.api.setRowData(row);
            gridRef.current.api.setPinnedBottomRowData(pinnedRowData);
            gridRef.current.api.refreshCells();
            gridRef.current.api.redrawRows();

            // params.api.sizeColumnsToFit();

            // window.addEventListener("resize", function () {
            //     setTimeout(function () {params.api.sizeColumnsToFit()});
            // });

            gridRef.current.api.sizeColumnsToFit();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: load empty data to grid
  
    
	return (
        <div className = "col-12 ag-theme-alpine grid-height-400">
            <div style = {style}>
                <AgGridReact	
                    ref = {gridRef}
                    columnDefs = {columnDefs}
                    defaultColDef = {defaultColDef}
                    // rowClassRules = {rowClassRules}
                    rowData = {null}
                    rowSelection = {"single"}
                    onGridReady = {handleGridReady} />
            </div>
        </div>
    );
};
 
export default ServiceViewGrid;