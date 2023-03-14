import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink } from "react-bootstrap";
import { X } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import ExpensePaymentGrid from "./ExpensePaymentGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({ pName, pAddress, pMobile, pTransactionData, onPrint, onClosed }) => {
    const [defaultRowData, setDefaultRowData] = useState([]);

    useEffect(() => {
        pTransactionData.forEach(element => {
            const rowData = {
                            rowId: defaultRowData.length + 1, 
                            transactionDate: element.transactionDate,
                            expenseAmount: element.expenseAmount, 
                            paymentAmount: element.paymentAmount, 
                            narration: element.narration, 
                        };
    
            defaultRowData.push(rowData);
        });

        setDefaultRowData(defaultRowData);
    }, [pTransactionData]);        // eslint-disable-line react-hooks/exhaustive-deps

    // Start:: Html
    return (
        <form>

            {/* Start:: Modal body */}
            <Modal.Body>
                <div>
                    {/* Start:: Row */}
                    <div className="row mb-3">

                        {/* Start:: Column address */}
                        <div className="col-8">
                            <label className="form-label mr-2">Address :</label>
                            <label className="form-label">{pAddress}</label>
                        </div>
                        {/* End:: Column address */}

                        {/* Start:: Column mobile no. */}
                        <div className="col-4">
                            <label className="form-label mr-2">Mobile :</label>
                            <label className="form-label">{pMobile}</label>
                        </div>
                        {/* End:: Column mobile no. */}

                    </div>
                    {/* End:: Row */}
                </div>

                {/* Start:: Row */}
                <div className="row mb-3">

                    {/* Start:: Column expense/payment detail */}
                    <div className="col-12 ag-theme-alpine grid">
                        <ExpensePaymentGrid
                            pDefaultRowData={defaultRowData} />
                    </div>                
                    {/* End:: Column expense/payment detail */}

                </div>
                {/* End:: Row */}
            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>
                {/* <div class="container"> */}
                    {/* Start:: Print button */}
                    <button
                        type="button"
                        // className="btn btn-primary pull-left"
                        className="btn btn-primary"
                        autoFocus
                        onClick={onPrint} >
                        Print
                    </button>
                    {/* End:: Print button */}

                    {/* Start:: Close button */}
                    <button
                        type="button"
                        // className="btn btn-danger pull-right"
                        className="btn btn-danger"
                        autoFocus
                        onClick={onClosed} >
                        Close
                    </button>
                    {/* End:: Close button */}
                {/* </div>                     */}
            </Modal.Footer>
            {/* End:: Modal footer */}

        </form> 
    );
    // End:: Html

};
// End:: form


// Start:: Component
// props parameters
// pId
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestPaymentView = forwardRef(( props, ref ) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestPaymentAPI}/${hotelId}/${props.pGuestId}/A`
    });

    // Start :: Show modal 
    const handleShowModal = () => {
        setShowModal(true);
    };
    // End :: Show modal 

    // Start :: print modal
    const handlePrint = () => {

    }
    // End :: print modal

    // Start :: Close modal 
    const handleCloseModal = () => {
        setShowModal(false);
    };
    // End :: Close modal 

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {
            handleShowModal
        }
    });
    // End:: forward reff show modal function

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") handleCloseModal();
        });

        return () => {
            document.removeEventListener("keydown", handleCloseModal);
        }
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    

    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            try {
                showModal && await doFetch();
            } catch (err) {
              console.log('Error occured when fetching data');
            }
          })();
    }, [showModal]);         // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    // Start:: Html
    return (
        <>
            {/* Start:: View modal */}
            {data &&
                <Modal size="lg"
                    show={showModal}>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Expense / Payment list of [{props.pName}]</Modal.Title>
                        
                        {/* Close button */}
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick={handleCloseModal}>
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    {/* End:: Modal header */}

                    {/* Start:: Form component */}
                    <Form 
                        pName={props.pName}
                        pAddress={props.pAddress}
                        pMobile={props.pMobile}
                        pTransactionData={data}
                        onPrint={handlePrint}
                        onClosed={handleCloseModal} />
                    {/* End:: Form component */}
                    
                </Modal> }
            {/* End:: View modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestPaymentView;