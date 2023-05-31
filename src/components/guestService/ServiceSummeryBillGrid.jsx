import React, {useState, useEffect, useRef, useMemo} from "react";
import {AgGridReact} from "ag-grid-react"; 

import {formatBillNo, formatDDMMYYYY, formatTime12Hour, formatINR} from "../common/Common";
import Bill from "./GuestServiceBill";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const ServiceSummeryBillGrid = ({pGuestId, pName, pMobile, pGuestCount, 
                                       pCorporateName, pCorporateAddress, pGstNo, pData}) => {    

    const gridRef = useRef();
    const billRef = useRef(null);
    const [rowData, setRowData] = useState(undefined);
    const [transactionId, setTransactionId] = useState();
    const [transactionNo, setTransactionNo] = useState();
    const [transactionDate, setTransactionDate] = useState();
    const [transactionTime, setTransactionTime] = useState();

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
            width: 20,
            hide: false,
            editable: (params) => {return false},
            valueFormatter: (params) => {return `${params.value}.`}
        },
        {
            headerName: "Bill No.", 
            field: "no", 
            width: 50,
            hide: false,
            valueFormatter: (params) => {return `${formatBillNo(params.value)}`}
        },
        {
            headerName: "Date", 
            field: "date", 
            width: 50,
            hide: false,
            valueFormatter: (params) => {return `${formatDDMMYYYY(params.value)}`}
        },
        {
            headerName: "Time",
            field: "time",
            width: 45,
            hide: false,
            valueFormatter: (params) => {return `${formatTime12Hour(params.value)}`}
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
        gridRef.current.api.setRowData(rowData);
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();
        gridRef.current.api.sizeColumnsToFit();
    };
    // End:: load empty data to grid
    
    // Start:: load empty data to grid
    const handleFirstDataRendered = (params) => {
        gridRef.current.api.refreshCells();
        gridRef.current.api.redrawRows();
        gridRef.current.api.sizeColumnsToFit();
    };
    // End:: load empty data to grid
    
    // Start:: on row selection change set selected 
    const handleOpenBill = (event) => {
        setTransactionId(event.api.getSelectedNodes()[0].data.id);
        setTransactionNo(event.api.getSelectedNodes()[0].data.no);
        setTransactionDate(event.api.getSelectedNodes()[0].data.date);
        setTransactionTime(event.api.getSelectedNodes()[0].data.time);

        billRef && billRef.current.handleShowModal();
    };
    // End:: on row selection change set selected 

    useEffect(() => {
        let rows = [];

        pData.forEach(element => {
            const row = {
                            rowId: rows.length + 1, 
                            id: element.expensesPaymentsDetail.expenseId,
                            no: element.expensesPaymentsDetail.billNo,
                            date: element.expensesPaymentsDetail.transactionDate, 
                            time: element.expensesPaymentsDetail.transactionTime,
                            amount: element.expensesPaymentsDetail.expenseAmount
                        };
    
            rows.push(row);
        });

        setRowData(rows);
    }, [pData]);        // eslint-disable-line react-hooks/exhaustive-deps

	return (
        <>
            <div className="col-12 ag-theme-alpine grid-height-400">
                <AgGridReact	
                    ref={gridRef}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowData={rowData}
                    rowSelection={"single"}
                    onGridReady={handleGridReady}
                    onFirstDataRendered={handleFirstDataRendered}
                    onRowDoubleClicked={handleOpenBill}/>
            </div>

            {/* Start :: bill component */}
            <Bill
                ref={billRef}
                pGuestId={pGuestId} 
                pName={pName}
                pMobile={pMobile}
                pGuestCount={pGuestCount}
                pCorporateName={pCorporateName}
                pCorporateAddress={pCorporateAddress}
                pGstNo={pGstNo}
                pTransactionId={transactionId}
                pTransactionNo={transactionNo}
                pTransactionDate={transactionDate}
                pTransactionTime={transactionTime}/>
            {/* End :: bill component */}

        </>
    )
}
 
export default ServiceSummeryBillGrid;