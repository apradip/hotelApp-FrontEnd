import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { X } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import BillGrid from "../common/ItemBillGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";
import AddPayment from "../common/GuestPaymentAdd";

import { subStr, formatDDMMYYYY, formatTime12Hour, formatBillNo } from "../common/Common";


// Start:: form
const Form = ({pGuestId, pName, pMobile, pGuestCount, 
               pCorporateName, pCorporateAddress, pTransactionId,
               pShow,
               onPaymentAdded, onClosed}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const addPaymentRef = useRef(null);
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${pGuestId}/${pTransactionId}`
    });     //generate and display bill

    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            try {
                await doFetch();
            } catch (err) {
                console.log(err);
            }
        })();
    }, [pTransactionId]);      // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api
    
    const handelOpenPayment = () => {
        try {
            addPaymentRef && 
                addPaymentRef.current && 
                    addPaymentRef.current.handleShowModal();
        } catch (err) {
            console.log(err);
        }
    };

    // Strat:: print form    
    const handlePrint = () => {
        // onPrinted()
    };
    // End:: print form    
    
    // Start:: Html
    return (
        <>
            {data &&
                <>
                    <Modal size="lg"
                        show={pShow}>

                        {/* Start:: Modal header */}
                        <Modal.Header>
                            {/* Header text */}
                            <Modal.Title>Bill</Modal.Title>
                            
                            {/* Close button */}
                            <NavLink 
                                className="nav-icon" 
                                href="#" 
                                onClick={() => {onClosed()}}>
                                <i className="align-middle"><X/></i>
                            </NavLink>
                        </Modal.Header>
                        {/* End:: Modal header */}

                        {/* Start:: Modal body */}
                        <Modal.Body className = {data.isPaid && "paid"}>

                            {/* Start:: Row */}
                            <Row>
                                {/* Start:: Column bill no */}
                                <Col sx = {12} md = {5} className = "mb-3">
                                    <label className = "col-12 form-label"><b>Bill No.</b></label>
                                    <label className = "col-12 form-label">{formatBillNo(data.expense.billNo)}</label>
                                </Col>
                                {/* End:: Column bill no */}

                                {/* Start:: Column transaction date */}
                                <Col sx = {12} md = {5} className = "mb-3">
                                    <label className = "col-12 form-label"><b>Date</b></label>
                                    <label className = "col-12 text-muted">{formatDDMMYYYY(data.expense.transactionDate)}</label>
                                </Col>
                                {/* End:: Column transaction date */}

                                {/* Start:: Column transaction time */}
                                <Col sx = {12} md = {2} className = "mb-3">
                                    <label className = "col-12 form-label"><b>Time</b></label>
                                    <label className = "col-12 text-muted">{formatTime12Hour(data.expense.transactionTime)}</label>
                                </Col>
                                {/* End:: Column transaction time */}

                            </Row>
                            {/* End:: Row */}

                            {/* Start:: Row */}
                            <Row>

                                {/* Start:: Column name / company */}
                                {pCorporateName ? 
                                    <Col sx = {12} md = {5} className = "mb-3">
                                        <label className = "col-12 form-label"><b>Company</b></label>
                                        <label className = "col-12 text-muted">{subStr(pCorporateName, 30)}</label>
                                    </Col>
                                :
                                    <Col sx = {12} md = {5} className = "mb-3">
                                        <label className = "col-12 form-label"><b>Name</b></label>
                                        <label className = "col-12 text-muted">{subStr(pName, 30)}</label>
                                    </Col>
                                }
                                {/* End:: Column name / company */}

                                {/* Start:: Column mobile no / company address */}
                                {pCorporateName ? 
                                    <Col sx = {12} md = {5} className = "mb-3">
                                        <label className = "col-12 form-label"><b>Address</b></label>
                                        <label className = "col-12 text-muted">{subStr(pCorporateAddress, 30)}</label>
                                    </Col>
                                :
                                    <Col sx = {12} md = {5} className = "mb-3">
                                        <label className = "col-12 form-label"><b>Mobile no.</b></label>
                                        <label className = "col-12 text-muted">{pMobile}</label>
                                    </Col>
                                }
                                {/* End:: Column mobile no / company address */}

                                {/* Start:: Column mobile no / company address */}
                                <Col sx = {12} md = {2} className = "mb-3">
                                    <label className = "col-12 form-label"><b>Guest count</b></label>
                                    <label className = "col-12 text-muted">{pGuestCount} No.</label>
                                </Col>
                                {/* End:: Column mobile no / company address */}

                            </Row>
                            {/* End:: Row */}

                            {/* Start:: Row */}
                            <Row>

                                {/* Start:: Column miscellaneous detail */}
                                <Col sx = {12} md = {12}>

                                    {/* Label element */}
                                    <label className = "col-12 form-label"><b>Miscellaneous items</b></label>
                                    
                                    {/* Start:: Column miscellaneous detail */}
                                    <BillGrid
                                        pData = {data.miscellanea} />
                                    {/* End:: Column miscellaneous detail */}

                                </Col>                
                                {/* End:: Column miscellaneous detail */}

                            </Row>
                            {/* End:: Row */}
                            
                        </Modal.Body>
                        {/* End:: Modal body */}

                        {/* Start:: Modal footer */}
                        <Modal.Footer>

                            {/* Start:: Close button */}
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {onClosed()}}>
                                Close
                            </button>
                            {/* End:: Close button */}

                            {/* Start:: Print button */}
                            <button 
                                type="button"
                                className="btn btn-info"
                                onClick={handlePrint}>
                                Print    
                            </button>
                            {/* End:: Print button */}

                            {!data.isPaid &&    
                                <>
                                    {/* Start:: Payment button */}
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handelOpenPayment}>
                                        Payment
                                    </button>
                                    {/* End:: Payment button */}
                                </>
                            }

                        </Modal.Footer>
                        {/* End:: Modal footer */}

                    </Modal>

                    {/* Start :: add payment component */}
                    <AddPayment 
                        ref = {addPaymentRef}
                        pExpenseId = {data.expenseId}
                        pBillId = {data.billId}
                        pGuestId = {pGuestId}    
                        pName = {pName}
                        pMobile = {pMobile}
                        pCorporateName = {pCorporateName}
                        pCorporateAddress = {pCorporateAddress}
                        pBalance = {data.expense.expenseAmount * -1}    
                        onSaved = {onPaymentAdded}/>
                    {/* End :: add payment component */}
                </>
            }
        </>
    );
    // End:: Html

};
// End:: form
 

// Start:: Component
// props parameters
// pGuestId
// pName
// pMobile
// pGuestCount
// pCorporateName
// pCorporateAddress
// pGstNo
// onPay()
// onSaved()
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestMiscellaneousGenerateBill = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${props.pGuestId}`,
        params: {option: "N"}
    });     // get all non delivered items

    // Start:: fetch id wise detail from api
    useEffect(() => {
        try {
            error && toast.error(error);
            data && 
                data.items.length > 0 &&
                    toast.error("All ordered items not delivered! Please despatch all ordered items them generate bill.");
        } catch (err) {
            console.log(err);
        }
    }, [data, error, loading]);      // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    // Start:: Show modal
    const handleShowModal = async () => {
        try {
            setShowModal(true);
            await doFetch();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show modal

    // Start:: Close modal
    const handleCloseModal = () => {
        try {
            setShowModal(false);
            data && props.onSaved();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Close modal

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal};
    });
    // End:: forward reff show modal function
    
    // Start:: Html
    return (
        <>
            {/* Start:: Bill modal */}
            {data &&  
                data.transactionId !== "undefined" && 
                    data.items.length === 0 &&
                        <Form
                            pGuestId = {data.id}
                            pName = {data.name}
                            pMobile = {data.mobile}
                            pGuestCount = {data.guestCount}
                            pCorporateName = {data.corporateName}
                            pCorporateAddress = {data.corporateAddress}
                            pTransactionId = {data.transactionId}
                            pShow = {showModal}
                            onPaymentAdded = {props.onPaymentAdded}
                            onClosed = {handleCloseModal}/>}
            {/* End:: Bill modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestMiscellaneousGenerateBill;