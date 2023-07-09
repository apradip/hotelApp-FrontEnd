import React, {useContext, useEffect, useState, forwardRef, useImperativeHandle} from "react";
import {Modal, NavLink} from "react-bootstrap";
import {X} from "react-feather";
import {subStr} from "../common/Common";

import {HotelId} from "../../App";
import {useStateContext} from "../../contexts/ContextProvider";
import BillGrid from "./RoomBillGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";
import {formatDDMMYYYY, formatTime12Hour, formatBillNo} from "../common/Common";


// Start:: form
const Form = ({pTransactionNo, pTransactionDate, pTransactionTime, 
                pName, pMobile, pGuestCount, 
                pCorporateName, pCorporateAddress, pData, 
                onClosed}) => {

    // Strat:: close form    
    const handleClose = () => {
        onClosed();
    };
    // End:: close form    

    // Strat:: print form    
    const handlePrint = () => {
        // onPrinted()
    };
    // End:: print form    

    // Start:: Html
    return (
        <form>

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column bill no */}
                    <div className="col-sx-12 col-md-5 mb-3">
                        <label className="col-12 form-label"><b>Bill No.</b></label>
                        <label className="col-12 form-label">{formatBillNo(pTransactionNo)}</label>
                    </div>
                    {/* End:: Column bill no */}

                    {/* Start:: Column transaction date */}
                    <div className="col-sx-12 col-md-5 mb-3">
                        <label className="col-12 form-label"><b>Date</b></label>
                        <label className="col-12 text-muted">{formatDDMMYYYY(pTransactionDate)}</label>
                    </div>
                    {/* End:: Column transaction date */}

                    {/* Start:: Column transaction time */}
                    <div className="col-sx-12 col-md-2 mb-3">
                        <label className="col-12 form-label"><b>Time</b></label>
                        <label className="col-12 text-muted">{formatTime12Hour(pTransactionTime)}</label>
                    </div>
                    {/* End:: Column transaction time */}
                    
                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column name / company */}
                    {pCorporateName ? 
                        <div className="col-sx-12 col-md-5 mb-3">
                            <label className="col-12 form-label"><b>Company</b></label>
                            <label className="col-12 text-muted">{subStr(pCorporateName, 30)}</label>
                        </div>
                    :
                        <div className="col-sx-12 col-md-5 mb-3">
                            <label className="col-12 form-label"><b>Name</b></label>
                            <label className="col-12 text-muted">{subStr(pName, 30)}</label>
                        </div>
                    }
                    {/* End:: Column name / company */}

                    {/* Start:: Column mobile no / company address */}
                    {pCorporateName ? 
                        <div className="col-sx-12 col-md-5 mb-3">
                            <label className="col-12 form-label"><b>Address</b></label>
                            <label className="col-12 text-muted">{subStr(pCorporateAddress, 30)}</label>
                        </div>
                    :
                        <div className="col-sx-12 col-md-5 mb-3">
                            <label className="col-12 form-label"><b>Mobile</b></label>
                            <label className="col-12 text-muted">{pMobile}</label>
                        </div>
                    }
                    {/* End:: Column mobile no / company address */}

                    {/* Start:: Column mobile no / company address */}
                    <div className="col-sx-12 col-md-2 mb-3">
                        <label className="col-12 form-label"><b>Guest count</b></label>
                        <label className="col-12 text-muted">{pGuestCount} No.</label>
                    </div>
                    {/* End:: Column mobile no / company address */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column service detail */}
                    <div className="col-12">
                        <label className="col-12 form-label"><b>Items</b></label>
                        {/* Start:: Column service detail */}
                        <BillGrid
                            pData={pData}/>
                        {/* End:: Column service detail */}

                    </div>                
                    {/* End:: Column service detail */}

                </div>
                {/* End:: Row */}

            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>

                {/* Start:: Close button */}
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleClose}>
                    Close
                </button>
                {/* End:: Close button */}

                {/* Start:: Print button */}
                <button 
                    type="button"
                    className="btn btn-success"
                    onClick={handlePrint} >
                    Print    
                </button>
                {/* End:: Print button */}

            </Modal.Footer>
            {/* End:: Modal footer */}

        </form> 
    );
    // End:: Html

};

// End:: form


// Start:: form error
const FormError = ({onClosed}) => {
    // Strat:: close form    
    const handleClose = () => {
        onClosed();
    }
    // End:: close form    

    // Start:: Html
    return (
        <form>

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div>
                    <label className="form-label mr-2">There is no transaction to generate bill.</label>
                </div>
                {/* End:: Row */}

            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>

                {/* Start:: Close button */}
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleClose}>
                    Close
                </button>
                {/* End:: Close button */}

            </Modal.Footer>
            {/* End:: Modal footer */}

        </form> 
    )
    // End:: Html
}
// End:: form error


// Start:: Component
// props parameters
// pGuestId
// pName
// pMobile
// pGuestCount
// pCorporateName
// pCorporateAddress
// pGstNo
// onSaved()
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestRoomGenerateBill = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestRoomAPI}/${hotelId}/${props.pGuestId}/${props.pTransactionId}`
    });

    // Start:: Show modal
    const handleShowModal = () => {
        setShowModal(true);
    };
    // End:: Show modal

    // Start:: Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        data && props.onSaved();
    };
    // End:: Close modal

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal};
    });
    // End:: forward reff show modal function

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") handleCloseModal();
        })

        return () => {document.removeEventListener("keydown", handleCloseModal)};
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    
    
    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            showModal && await doFetch();
            data && props.onSaved();
          })()
    }, [showModal]);      // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    // Start:: Html
    return (
        <>
            {/* Start:: Edit modal */}
            {data && data.length > 0 ? 
                <Modal size="lg"
                    show={showModal}>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Bill detail</Modal.Title>
                        
                        {/* Close button */}
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick={handleCloseModal} >
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    {/* End:: Modal header */}

                    {/* Start:: Form component */}
                    <Form
                        pTransactionNo={data[0].expensesPaymentsDetail[0].billNo} 
                        pTransactionDate={data[0].expensesPaymentsDetail[0].transactionDate}
                        pTransactionTime={data[0].expensesPaymentsDetail[0].transactionTime}
                        pName={props.pName}
                        pMobile={props.pMobile}
                        pGuestCount={props.pGuestCount}
                        pCorporateName={props.pCorporateName}
                        pCorporateAddress={props.pCorporateAddress}
                        pData={data[0].rooms}
                        onClosed={handleCloseModal}/>                        
                        {/* End:: Form component */}
                    
                </Modal>
            :
                <Modal 
                    size="sm"
                    show={showModal}>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Error</Modal.Title>

                        {/* Close button */}
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick={handleCloseModal}>
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    {/* End:: Modal header */}

                    {/* Start:: Form component */}
                    <FormError 
                        onClosed={handleCloseModal}/>
                        {/* End:: Form component */}
                </Modal>
            }
            {/* End:: Edit modal */}
        </>
    )
    // End:: Html

})
// End:: Component


export default GuestRoomGenerateBill;