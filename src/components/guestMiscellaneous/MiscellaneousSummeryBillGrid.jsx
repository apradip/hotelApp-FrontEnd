import React, { useState, useEffect, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; 

import { formatINR, formatDDMMYYYY } from "../common/Common";
import Bill from "./GuestMiscellaneousBill";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const MiscellaneousSummeryBillGrid = ({pGuestId, pName, pMobile, pGuestCount, 
                                       pCorporateName, pCorporateAddress, pGstNo, pData,
                                       onClosed}) => {    

    const gridRef = useRef()
    const billRef = useRef(null)
    const [rowData, setRowData] = useState([])
    const [transactionId, setTransactionId] = useState()
    const [transactionDate, setTransactionDate] = useState()
    const [transactionTime, setTransactionTime] = useState()

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
            editable: (params) => {return false},
            valueFormatter: (params) => {return `${params.value}.`}
        },
        {
            headerName: "Date", 
            field: "date", 
            hide: false,
            valueFormatter: (params) => {return `${formatDDMMYYYY(params.value)}`}
        },
        {
            headerName: "Time",
            field: "time",
            hide: false,
            type: "rightAligned",
            valueFormatter: (params) => {return `${params.value}`}
        },
        {
            headerName: "Amount",
            field: "amount", 
            hide: false,
            type: "rightAligned",
            valueFormatter: (params) => {return `${formatINR(params.value)}`}
        },
        {
            field: "id"
        }
    ]);

    // Start:: load empty data to grid
    const handleGridReady = (params) => {
        gridRef.current.api.setRowData(rowData)
        gridRef.current.api.refreshCells()
        gridRef.current.api.redrawRows()
        gridRef.current.api.sizeColumnsToFit()
    };
    // End:: load empty data to grid
    
    // Start:: load empty data to grid
    const handleFirstDataRendered = (params) => {
        gridRef.current.api.refreshCells()
        gridRef.current.api.redrawRows()
        gridRef.current.api.sizeColumnsToFit()
    };
    // End:: load empty data to grid
    
    // Start:: on row selection change set selected 
    const handleOpenBill = (event) => {
        setTransactionId(event.api.getSelectedNodes()[0].data.id)
        setTransactionDate(event.api.getSelectedNodes()[0].data.date)
        setTransactionTime(event.api.getSelectedNodes()[0].data.time)

        billRef && billRef.current.handleShowModal()
    };
    // End:: on row selection change set selected 

    useEffect(() => {
        let rows = []

        pData.forEach(element => {
            const row = {
                            rowId: rows.length + 1, 
                            id: element.expensesPaymentsDetail.expenseId,
                            date: element.expensesPaymentsDetail.transactionDate, 
                            time: element.expensesPaymentsDetail.transactionTime,
                            amount: element.expensesPaymentsDetail.expenseAmount
                        }
    
            rows.push(row)
        });

        setRowData(rows)
    }, [pData]);        // eslint-disable-line react-hooks/exhaustive-deps

    // const handleClose = () => {
    //     onClosed()
    // };

	return (
        <>
            <div className="ag-theme-alpine grid">
                <AgGridReact	
                    ref = {gridRef}
                    columnDefs = {columnDefs}
                    defaultColDef = {defaultColDef}
                    rowData = {null}
                    rowSelection = {"single"}
                    onGridReady = {handleGridReady}
                    onFirstDataRendered = {handleFirstDataRendered}
                    onRowDoubleClicked = {handleOpenBill} />
            </div>

            {/* Start :: bill component */}
            <Bill
                ref = {billRef}
                pGuestId = {pGuestId} 
                pName = {pName}
                pMobile = {pMobile}
                pGuestCount = {pGuestCount}
                pCorporateName = {pCorporateName}
                pCorporateAddress = {pCorporateAddress}
                pGstNo = {pGstNo}
                pTransactionId = {transactionId}
                pTransactionDate = {transactionDate}
                pTransactionTime = {transactionTime} />
            {/* End :: bill component */}

        </>
    )
}
 
export default MiscellaneousSummeryBillGrid;