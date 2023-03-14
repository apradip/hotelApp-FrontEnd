import React, { useContext, useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X } from "react-feather";
import DatePicker from "react-datepicker";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { guestPaymentSchema } from "../../schemas";
import { formatYYYYMMDD, formatHHMM } from "../common/Common";
import View from "./GuestPaymentView";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({ pGuestId, pName, pAddress, pMobile, pBalance, onSubmited, onClosed, onShowView }) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doInsert} = useFetchWithAuth({
        url: `${contextValues.guestPaymentAPI}/${hotelId}`
    });

    // Start:: Form validate and save data
    const {values, errors, touched, setFieldValue, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputPaymentAmount: pBalance,
            keyInputNarration: "",
            keyInputTransactionDate: new Date(),
            keyInputTransactionTime: new Date()
        },
        validationSchema: guestPaymentSchema,
        validateOnChange,
        onSubmit: async (values) => {
            const payload = {   
                "guestId": pGuestId,
                "type": "P",
                "amount": parseInt(values.keyInputPaymentAmount), 
                "narration": values.keyInputNarration,
                "transactionDate": formatYYYYMMDD(values.keyInputTransactionDate),
                "transactionTime": formatHHMM(values.keyInputTransactionTime),
            }

            await doInsert(payload);
        
            if (error === null) {
                resetForm();
                onSubmited();
            } else {
                toast.error(error);
            }
        }
    });
    // End:: Form validate and save data

    const handleOpenView = () => {
        onShowView();
    }

    // Strat:: close form    
    const handleClose = () => {
        setValidateOnChange(false);
        resetForm();
        onClosed();
    };
    // End:: close form    
    
    // Start:: Html
    return (
        <form>

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div className="row mb-3">
                    {/* Start:: Column address */}
                    <div className="col-8">

                        {/* Label element */}
                        <label className="form-label mr-2">Address :</label>
                        <label className="form-label">{pAddress}</label>
                    </div>
                    {/* End:: Column address */}

                    {/* Start:: Column mobile no. */}
                    <div className="col-4">

                        {/* Label element */}
                        <label className="form-label mr-2">Mobile :</label>
                        <label className="form-label">{pMobile}</label>
                    </div>
                    {/* End:: Column mobile no. */}
                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row mb-3">

                    {/* Start:: Column payment amount */}
                    <div className="col-4">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputPaymentAmount"}>Payment amount</label>

                        {/* Input element text*/}
                        <input 
                            type="text" 
                            name="keyInputPaymentAmount"
                            placeholder="Payment amount"
                            className="form-control"
                            autoComplete="off"
                            autoFocus
                            maxLength={10}
                            disabled={loading} 
                            value={values.keyInputPaymentAmount} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputPaymentAmount && 
                            touched.keyInputPaymentAmount ? 
                                (<small className="text-danger">{errors.keyInputPaymentAmount}</small>) : 
                                    null}
                    
                    </div>
                    {/* End:: Column payment amount */}

                    {/* Start:: Column payment date */}
                    <div className="col-4">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputTransactionDate"}>Payment date</label>

                        {/* Input element text*/}
                        <DatePicker
                            name="keyInputTransactionDate"
                            placeholder="Payment date"
                            className="form-control"
                            disabled={loading} 
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            showDisabledMonthNavigation
                            selected={values.keyInputTransactionDate}
                            onChange={(value) => {setFieldValue("keyInputTransactionDate", value)}} />

                        {/* Validation message */}
                        {errors.keyInputTransactionDate && 
                            touched.keyInputTransactionDate ? 
                                (<small className="text-danger">{errors.keyInputTransactionDate}</small>) : 
                                    null}
                    
                    </div>
                    {/* End:: Column payment date */}

                    {/* Start:: Column payment time */}
                    <div className="col-4">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputTransactionTime"}>Payment time</label>

                        {/* Input element text*/}
                        <DatePicker
                            name="keyInputTransactionTime"
                            placeholder="Payment time"
                            className="form-control"
                            disabled={loading} 
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            selected={values.keyInputTransactionTime}
                            onChange={(value) => {setFieldValue("keyInputTransactionTime", value)}} />

                        {/* Validation message */}
                        {errors.keyInputTransactionTime && 
                            touched.keyInputTransactionTime ? 
                                (<small className="text-danger">{errors.keyInputTransactionTime}</small>) : 
                                    null}
                    
                    </div>
                    {/* End:: Column payment time */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row mb-3">

                    {/* Start:: Column narration */}
                    <div className="col-12">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputGST"}>Narration</label>

                        {/* Input element select*/}
                        <textarea
                            name={"keyInputNarration"}
                            rows={"5"}
                            placeholder="Narration"
                            className="form-control"
                            autoComplete="off"
                            maxLength={1000}
                            disabled={loading}
                            value={values.keyInputNarration} 
                            onChange={handleChange} />

                        {/* Validation message */}
                        {errors.keyInputNarration && 
                            touched.keyInputNarration ? 
                                (<small className="text-danger">{errors.keyInputNarration}</small>) : 
                                    null}
                    
                    </div>
                    {/* End:: Column narration */}

                </div>
                {/* End:: Row */}

            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>
                {/* <div class="container"> */}

                    {/* Start:: Detail button */}
                    <button 
                        type="button"
                        // className="btn btn-primary pull-left"
                        className="btn btn-primary"
                        disabled={loading} 
                        onClick={handleOpenView} >
                        Detail
                    </button>
                    {/* End:: Detail button */}

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
                        // className="btn btn-success pull-right"
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

        </form>
    );
    // End:: Html

};
// End:: form


// Start:: Component
// props parameters
// onAdded()
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestPaymentAdd = forwardRef(( props, ref ) => {
    const viewRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    // Start:: Show modal
    const handleShowModal = () => {
        setShowModal(true);
    };
    // End:: Show modal

    // Start:: Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        props.onClosed();
    };
    // End:: Close modal
    
    // Start:: Save
    const handleSave = () => {
        props.onAdded();
        setShowModal(false);
    };
    // End:: Save

    const handleOpenView = () => {
        viewRef && viewRef.current.handleShowModal();
    }

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

    // Start:: Html
    return (
        <>
            {/* Start:: Add modal */}
            <Modal size="md"
                show={showModal}>

                {/* Start:: Modal header */}
                <Modal.Header>
                    {/* Header text */}
                    <Modal.Title>Add payment of [{props.pName}]</Modal.Title>

                    {/* Close button */}
                    <NavLink className="nav-icon" href="#" onClick={handleCloseModal}>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>
                {/* End:: Modal header */}

                {/* Start:: Form component */}
                <Form
                    pGuestId={props.pGuestId}
                    pName={props.pName}
                    pAddress={props.pAddress}
                    pMobile={props.pMobile}
                    pBalance={props.pBalance}
                    onSubmited={handleSave} 
                    onClosed={handleCloseModal}
                    onShowView={handleOpenView} />
                {/* End:: Form component */}

            </Modal>
            {/* End:: Add modal */}

            {/* Start :: add employee component */}
            <View 
                pGuestId={props.pGuestId}
                pName={props.pName}
                pAddress={props.pAddress}
                pMobile={props.pMobile}
                ref={viewRef} />
            {/* End :: add employee component */}
        </>            
    );
    // End:: Html

});
// End:: Component


export default GuestPaymentAdd;