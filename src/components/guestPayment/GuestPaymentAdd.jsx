import React, {useContext, useEffect, useState, forwardRef, useImperativeHandle} from "react";
import {Modal, NavLink} from "react-bootstrap";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {X} from "react-feather";
import {subStr} from "../common/Common";

import {HotelId} from "../../App";
import {useStateContext} from "../../contexts/ContextProvider";
import {guestPaymentSchema} from "../../schemas";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pGuestId, pName, pMobile, 
               pCorporateName, pCorporateAddress, 
               pBalance, onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doInsert} = useFetchWithAuth({
        url: `${contextValues.guestPaymentAPI}/${hotelId}/${pGuestId}`
    });

    // Start:: Form validate and save data
    const {values, errors, touched, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputPaymentAmount: pBalance,
            keyInputNarration: ""
        },
        validationSchema: guestPaymentSchema,
        validateOnChange,
        onSubmit: async (values) => {
            const payload = {   
                amount: values.keyInputPaymentAmount, 
                narration: values.keyInputNarration
            }

            await doInsert(payload)
        
            if (error === null) {
                resetForm()
                onSubmited()
            } else {
                toast.error(error)
            }
        }
    })
    // End:: Form validate and save data

    // Strat:: close form    
    const handleClose = () => {
        setValidateOnChange(false);
        resetForm();
        onClosed();
    }
    // End:: close form    
    
    // Start:: Html
    return (
        <form>

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div className="row">

                    {/* End:: Column name / corporate name */}
                    {pCorporateName ?
                        <div className="col-xs-12 col-md-6 mb-3">
                            <label className="col-12 form-label"><b>Company</b></label>
                            <label className="col-12 text-muted">{subStr(pCorporateName, 20)}</label>
                        </div>
                    :
                        <div className="col-sx-12 col-md-6 mb-3">
                            <label className="col-12 form-label"><b>Name</b></label>
                            <label className="col-12 text-muted">{subStr(pName, 20)}</label>
                        </div>
                    }
                    {/* End:: Column name / corporate name */}

                    {/* Start:: Column mobile no. / corporate address */}
                    {pCorporateName ?
                        <div className="col-sx-12 col-md-6 mb-3">
                            <label className="col-12 form-label"><b>Address</b></label>
                            <label className="col-12 text-muted">{subStr(pCorporateAddress, 20)}</label>
                        </div>
                        :
                        <div className="col-sx-12 col-md-6 mb-3">
                            <label className="col-12 form-label"><b>Mobile no.</b></label>
                            <label className="col-12 text-muted">{pMobile}</label>
                        </div>
                    }
                    {/* End:: Column mobile no. / corporate address */}
                    
                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column payment amount */}
                    <div className="col-12 mb-3">

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
                    </div>
                    {/* End:: Column payment amount */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column narration */}
                    <div className="col-12 mb-3">

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
                    </div>
                    {/* End:: Column narration */}

                </div>
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

        </form>
    )
    // End:: Html

}
// End:: form


// Start:: Component
// props parameters
// onSaved()
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestPaymentAdd = forwardRef((props, ref) => {
    const [showModal, setShowModal] = useState(false)

    // Start:: Show modal
    const handleShowModal = () => {
        setShowModal(true)
    }
    // End:: Show modal

    // Start:: Close modal
    const handleCloseModal = () => {
        setShowModal(false)
        props.onClosed()
    }
    // End:: Close modal
    
    // Start:: Save
    const handleSave = () => {
        setShowModal(false)
        props.onSaved()
    }
    // End:: Save

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal}
    })
    // End:: forward reff show modal function

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") handleCloseModal()
        })

        return () => {document.removeEventListener("keydown", handleCloseModal)}
    }, [])     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    

    // Start:: Html
    return (
        <Modal size="md"
            show={showModal}>

            {/* Start:: Modal header */}
            <Modal.Header>
                {/* Header text */}
                <Modal.Title>Payment</Modal.Title>

                {/* Close button */}
                <NavLink className="nav-icon" href="#" onClick={handleCloseModal}>
                    <i className="align-middle"><X/></i>
                </NavLink>
            </Modal.Header>
            {/* End:: Modal header */}

            {/* Start:: Form component */}
            <Form
                pGuestId = {props.pGuestId}
                pName = {props.pName}
                pMobile = {props.pMobile}
                pCorporateName = {props.pCorporateName}
                pCorporateAddress = {props.pCorporateAddress}
                pBalance = {props.pBalance}
                onSubmited = {handleSave} 
                onClosed = {handleCloseModal} />
            {/* End:: Form component */}

        </Modal>
    )
    // End:: Html

})
// End:: Component


export default GuestPaymentAdd