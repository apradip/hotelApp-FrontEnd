import React, { useContext, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { guestSmallSchema } from "../../schemas";
import useFetchWithAuth from "./useFetchWithAuth";


// Start:: form
const Form = ({pOption, pShow,
                onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doInsert} = useFetchWithAuth({
        url: `${contextValues.guestAPI}/${hotelId}`
    });

    // Start:: Form validate and save data
    const {values, errors, touched, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputName: "",
            keyInputMobile: "",
            keyInputGuestCount: 1,
            keyInputCorporateName: "",
            keyInputCorporateAddress: "",
            keyInputGST: ""
        },
        validationSchema: guestSmallSchema,
        validateOnChange,
        onSubmit: async (values) => {
            try {
                const payload = {   
                    option: pOption,
                    name: values.keyInputName.toUpperCase(), 
                    mobile: parseInt(values.keyInputMobile),
                    guestCount: parseInt(values.keyInputGuestCount),
                    corporateName: values.keyInputCorporateName ? values.keyInputCorporateName.toUpperCase() : "",
                    corporateAddress: values.keyInputCorporateAddress ? values.keyInputCorporateAddress.toUpperCase() : "",
                    gstNo: values.keyInputGST ? values.keyInputGST.toUpperCase() : ""
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
        <Modal size="lg"
            show = {pShow}>

            {/* Start:: Modal header */}
            <Modal.Header>
                {/* Header text */}
                <Modal.Title>New</Modal.Title>

                {/* Close button */}
                <NavLink className = "nav-icon" 
                    href = "#" 
                    onClick = {handleClose}>
                    <i className="align-middle"><X/></i>
                </NavLink>
            </Modal.Header>
            {/* End:: Modal header */}

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column name */}
                    <Col sx={12} md={4} className="mb-3">
                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputName"}><b>Name</b></label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text"
                                name="keyInputName"
                                placeholder="Name"
                                className="form-control"
                                autoComplete="off"
                                maxLength={100}
                                disabled={loading} 
                                value={values.keyInputName} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputName && 
                                touched.keyInputName ? 
                                    (<small className="text-danger">{errors.keyInputName}</small>) : 
                                        null}
                        </div>
                    </Col>
                    {/* End:: Column name */}

                    {/* Start:: Column mobile */}
                    <Col sx={12} md={4} className="mb-3">
                        {/* Label element */}
                        <label className="col-12 form-label"
                            htmlFor={"keyInputMobile"}><b>Mobile no.</b></label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text"
                                name="keyInputMobile"
                                placeholder="Mobile no."
                                className="form-control"
                                autoComplete="off"
                                maxLength={100}
                                disabled={loading} 
                                value={values.keyInputMobile} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputMobile && 
                                touched.keyInputMobile ? 
                                    (<small className="text-danger">{errors.keyInputMobile}</small>) : 
                                        null}
                        </div>                    
                    </Col>
                    {/* End:: Column mobile */}

                    {/* Start:: Column no of guest */}
                    <Col sx={12} md={4} className="mb-3">
                        {/* Label element */}
                        <label className="col-12 form-label"
                            htmlFor={"keyInputGuestCount"}><b>Guest count</b></label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text"
                                name="keyInputGuestCount"
                                placeholder="Guest count"
                                className="form-control"
                                autoComplete="off"
                                maxLength={2}
                                disabled={loading} 
                                value={values.keyInputGuestCount} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputGuestCount && 
                                touched.keyInputGuestCount ? 
                                    (<small className="text-danger">{errors.keyInputGuestCount}</small>) : 
                                        null}
                        </div>                                                        
                    </Col>
                    {/* End:: Column no of guest */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column corporate name */}
                    <Col sx={12} md={4} className="mb-3">
                        {/* Label element */}
                        <label className="col-12 form-label"
                            htmlFor={"keyInputCorporateName"}><b>Corporate name</b></label>

                        <div className="col-12">

                            {/* Input element text*/}
                            <input 
                                type="text"
                                name="keyInputCorporateName"
                                placeholder="Corporate name"
                                className="form-control"
                                autoComplete="off"
                                maxLength={100}
                                disabled={loading} 
                                value={values.keyInputCorporateName} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputCorporateName && 
                                touched.keyInputCorporateName ? 
                                    (<small className="text-danger">{errors.keyInputCorporateName}</small>) : 
                                        null}
                        </div>    
                    </Col>
                    {/* End:: Column corporate name */}

                    {/* Start:: Column coroprate address */}
                    <Col sx={12} md={4} className="mb-3">
                        {/* Label element */}
                        <label className="col-12 form-label"
                            htmlFor={"keyInputCorporateAddress"}><b>Corporate address</b></label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text"
                                name="keyInputCorporateAddress"
                                placeholder="Corporate address"
                                className="form-control"
                                autoComplete="off"
                                maxLength={100}
                                disabled={loading} 
                                value={values.keyInputCorporateAddress} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputCorporateAddress && 
                                touched.keyInputCorporateAddress ? 
                                    (<small className="text-danger">{errors.keyInputCorporateAddress}</small>) : 
                                        null}
                        </div>
                    </Col>
                    {/* End:: Column coroprate address */}

                    {/* Start:: Column gst no */}
                    <Col sx={12} md={4} className="mb-3">
                        {/* Label element */}
                        <label className="col-12 form-label"
                            htmlFor={"keyInputGST"}><b>GST no.</b></label>

                        <div className="col-12">
                            {/* Input element select*/}
                            <input 
                                type="text"
                                name="keyInputGST"
                                placeholder="GST no."
                                className="form-control"
                                autoComplete="off"
                                maxLength={100}
                                disabled={loading} 
                                value={values.keyInputGST} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputGST && 
                                touched.keyInputGST ? 
                                    (<small className="text-danger">{errors.keyInputGST}</small>) : 
                                        null}
                        </div> 
                    </Col>
                    {/* End:: Column gst no */}

                </Row>
                {/* End:: Row */}

            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>
                
                {/* Start:: Close button */}
                <button 
                    type = "button"
                    className = "btn btn-danger"
                    disabled = {loading}
                    onClick = {handleClose}>
                    Close
                </button>
                {/* End:: Close button */}

                {/* Start:: Save button */}
                <button 
                    type = "button"
                    className = "btn btn-success"
                    disabled = {loading} 
                    onClick = {handleSubmit}>

                    {!loading && "Confirm"}
                    {loading && 
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Working
                        </>}
                </button>
                {/* End:: Save button */}

            </Modal.Footer>
            {/* End:: Modal footer */}

        </Modal>
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
const GuestAddSmall = forwardRef((props, ref) => {
    const [showModal, setShowModal] = useState(false);

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {if (event.key === "Escape") handleCloseModal();});
        return () => {document.removeEventListener("keydown", handleCloseModal);};
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    

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
            props.onAdded();
            setShowModal(false);
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

    // Start:: Html
    return (
        <>
            {/* Start:: Form component */}
            <Form
                pOption = {props.pOption}
                pShow = {showModal}
                onSubmited = {handleSave} 
                onClosed = {handleCloseModal}/>
            {/* End:: Form component */}
        </>            
    );
    // End:: Html

});
// End:: Component


export default GuestAddSmall;