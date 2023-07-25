import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X } from "react-feather";
import { subStr } from "../common/Common";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { guestPaymentSchema } from "../../schemas";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pExpenseId, pBillId, pGuestId, pName, pMobile, 
               pCorporateName, pCorporateAddress, pBalance, 
               pShow,
               onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doInsert} = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${pGuestId}/${pExpenseId}/${pBillId}`
    });         //insert payment

    // Start:: Form validate and save data
    const {values, errors, touched, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputPaymentAmount: pBalance,
            keyInputNarration: ""
        },
        validationSchema: guestPaymentSchema,
        validateOnChange,
        onSubmit: async (values) => {
            try {
                const payload = {   
                    amount: values.keyInputPaymentAmount, 
                    narration: values.keyInputNarration
                };

                await doInsert(payload);
            
                if (error === null) {
                    resetForm();
                    onSubmited();
                } else {
                    toast.error(error);
                }
            } catch (err) {
                console.log(err);
                toast.error(err);
            }
        }
    });
    // End:: Form validate and save data

    // Strat:: close form    
    const handleClose = () => {
        try {
            setValidateOnChange(false);
            resetForm();
            onClosed();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: close form    
    
    // Start:: Html
    return (
        <Modal size = "md"
            show = {pShow} >

            {/* Start:: Modal header */}
            <Modal.Header>
                {/* Header text */}
                <Modal.Title>Payment</Modal.Title>

                {/* Close button */}
                <NavLink className = "nav-icon" href = "#" 
                    onClick = {handleClose}>
                    <i className = "align-middle"><X/></i>
                </NavLink>
            </Modal.Header>
            {/* End:: Modal header */}

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <Row>

                    {/* End:: Column name / corporate name */}
                    {pCorporateName ?
                        <Col sx={12} md={6} className="mb-3">
                            <label className="col-12 form-label"><b>Company</b></label>
                            <label className="col-12 text-muted">{subStr(pCorporateName, 20)}</label>
                        </Col>
                    :
                        <Col sx={12} md={6} className="mb-3">
                            <label className="col-12 form-label"><b>Name</b></label>
                            <label className="col-12 text-muted">{subStr(pName, 20)}</label>
                        </Col>
                    }
                    {/* End:: Column name / corporate name */}

                    {/* Start:: Column mobile no. / corporate address */}
                    {pCorporateName ?
                        <Col sx={12} md={6} className="mb-3">
                            <label className="col-12 form-label"><b>Address</b></label>
                            <label className="col-12 text-muted">{subStr(pCorporateAddress, 20)}</label>
                        </Col>
                        :
                        <Col sx={12} md={6} className="mb-3">
                            <label className="col-12 form-label"><b>Mobile no.</b></label>
                            <label className="col-12 text-muted">{pMobile}</label>
                        </Col>
                    }
                    {/* End:: Column mobile no. / corporate address */}
                    
                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column payment amount */}
                    <Col sx={12} md={12} className="mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputPaymentAmount"}><b>Amount</b></label>

                        <div className="col-12">

                            {/* Input element select*/}
                            <input 
                                type="text" 
                                name="keyInputPaymentAmount"
                                placeholder="Payment amount"
                                className="col-12 form-control"
                                autoComplete="off"
                                disabled="disabled"
                                value={values.keyInputPaymentAmount} />
                        
                            {/* Validation message */}
                            {errors.keyInputPaymentAmount && 
                                touched.keyInputPaymentAmount ? 
                                    (<small className="text-danger">{errors.keyInputPaymentAmount}</small>) : 
                                        null}
                        </div>
                    </Col>
                    {/* End:: Column payment amount */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column narration */}
                    <Col sx={12} md={12} className="mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputGST"}><b>Narration</b></label>

                        <div className="col-12">

                            {/* Input element select*/}
                            <textarea
                                name={"keyInputNarration"}
                                rows={"5"}
                                placeholder="Narration"
                                className="form-control"
                                autoComplete="off"
                                autoFocus
                                maxLength={1000}
                                disabled={loading}
                                value={values.keyInputNarration} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputNarration && 
                                touched.keyInputNarration ? 
                                    (<small className="text-danger">{errors.keyInputNarration}</small>) : 
                                        null}
                        </div>
                    </Col>
                    {/* End:: Column narration */}

                </Row>
                {/* End:: Row */}

            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>
                {/* <div class="container"> */}

                    {/* Start:: Close button */}
                    <button 
                        type="button"
                        // className="btn btn-danger pull-right"
                        className="btn btn-danger"
                        disabled={loading}
                        onClick={handleClose} >
                        Close
                    </button>
                    {/* End:: Close button */}

                    {/* Start:: Save button */}
                    <button 
                        type="button"
                        className="btn btn-success"
                        disabled={loading} 
                        onClick={handleSubmit} >

                        {!loading && "Confirm"}
                        {loading && 
                            <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Working
                            </> }
                    </button>
                    {/* End:: Save button */}
                {/* </div>             */}
            </Modal.Footer>
            {/* End:: Modal footer */}

        </Modal>                            
    );
    // End:: Html

};
// End:: form


// Start:: Component
// props parameters
// onSaved()
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestMiscellaneousPaymentAdd = forwardRef((props, ref) => {
    const [showModal, setShowModal] = useState(false);

    // Start:: Show modal
    const handleShowModal = () => {
        try {
            setShowModal(true);
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show modal

    // Start:: Close modal
    const handleCloseModal = () => {
        try {
            setShowModal(false);
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Close modal
    
    // Start:: Save
    const handleSave = () => {
        try {
            setShowModal(false);
            props.onSaved();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Save

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal};
    });
    // End:: forward reff show modal function

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {if (event.key === "Escape") handleCloseModal();});
        return () => {document.removeEventListener("keydown", handleCloseModal);};
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    

    // Start:: Html
    return (
        <>
            {/* Start:: Form component */}
            <Form
                pExpenseId = {props.pExpenseId}
                pBillId = {props.pBillId}
                pGuestId = {props.pGuestId}
                pName = {props.pName}
                pMobile = {props.pMobile}
                pCorporateName = {props.pCorporateName}
                pCorporateAddress = {props.pCorporateAddress}
                pBalance = {props.pBalance}
                pShow = {showModal}
                onSubmited = {handleSave} 
                onClosed = {handleCloseModal} />
            {/* End:: Form component */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestMiscellaneousPaymentAdd;