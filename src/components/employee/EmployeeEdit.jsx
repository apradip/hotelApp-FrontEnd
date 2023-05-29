import React, {useContext, useEffect, useState, forwardRef, useImperativeHandle} from "react";
import {Modal, NavLink} from "react-bootstrap";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {X} from "react-feather";

import {HotelId} from "../../App";
import {useStateContext} from "../../contexts/ContextProvider";
import {employeeSchema} from "../../schemas";
import AccessLevelSelect from "../common/AccessLevelSelect";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pAccessLevels, pId, pName, pAddress, pMobile, pEmail, onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doUpdate} = useFetchWithAuth({
        url: `${contextValues.employeeAPI}/${hotelId}/${pId}`
    });

    // Start:: Form validate and save data
    const {values, errors, touched, setFieldValue, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputAccessLevels: pAccessLevels,
            keyInputName: pName,
            keyInputAddress: pAddress,
            keyInputMobile: pMobile,
            keyInputEmail: pEmail
        },
        validationSchema: employeeSchema,
        validateOnChange,
        onSubmit: async (values) => {
            const payload = {   
                accessLevels: values.keyInputAccessLevels,
                name: values.keyInputName.toUpperCase(), 
                address: values.keyInputAddress.toUpperCase(), 
                mobile: values.keyInputMobile.toString(), 
                email: values.keyInputEmail.toLowerCase()
            }

            await doUpdate(payload);
        
            if (error === null) {
                resetForm();
                onSubmited();
            } else {
                toast.error(error);
            }
        }
    });
    // End:: Form validate and save data

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
                <div className="row">

                    {/* Start:: Column role */}
                    <div className="col-12 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputAccessLevels"><b>Role</b></label>

                        {/* Input element multi select */}
                        <AccessLevelSelect
                            name={"keyInputAccessLevels"}
                            value={values.keyInputAccessLevels} 
                            disabled={true} 
                            onChange={(value) => {setFieldValue('keyInputAccessLevels', value)}}/>

                        {/* Validation message */}
                        {errors.keyInputAccessLevels && 
                            touched.keyInputAccessLevels ? 
                                (<small className="text-danger">{errors.keyInputAccessLevels}</small>) : 
                                    null}
                    </div>
                    {/* End:: Column role */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">
                    
                    {/* Start:: Column role */}
                    <div className="col-12 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputName"><b>Name</b></label>

                        {/* Input element text*/}
                        <input 
                            type="text" 
                            id="keyInputName"
                            className="form-control"
                            placeholder="Name" 
                            autoComplete="off"
                            autoFocus
                            maxLength={100}
                            value={values.keyInputName} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputName && 
                            touched.keyInputName ? 
                                (<small className="text-danger">{errors.keyInputName}</small>) : 
                                    null}
                    </div>
                    {/* End:: Column role */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column role */}
                    <div className="col-xs-12 col-md-6 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputBed"><b>Mobile no.</b></label>

                        {/* Input element text*/}
                        <input 
                            type="number"
                            id="keyInputMobile"
                            className="form-control"
                            placeholder="Mobile no." 
                            autoComplete="off"
                            maxLength={256}
                            disabled={loading || error !== null}
                            value={values.keyInputMobile} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputMobile && 
                            touched.keyInputMobile ? 
                                (<small className="text-danger">{errors.keyInputMobile}</small>) : 
                                    null}
                    </div>
                    {/* End:: Column role */}

                    {/* Start:: Column role */}
                    <div className="col-xs-12 col-md-6 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputEmail"><b>Email</b></label>

                        {/* Input element text*/}
                        <input 
                            type="text"
                            id="keyInputEmail"
                            className="form-control"
                            placeholder="Email" 
                            maxLength={100}
                            disabled={loading || error !== null}
                            value={values.keyInputEmail} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputEmail && 
                            touched.keyInputEmail ? 
                                (<small className="text-danger">{errors.keyInputEmail}</small>) : 
                                    null}
                    </div>
                    {/* End:: Column role */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column role */}
                    <div className="col-12 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputAddress"><b>Address</b></label>

                        {/* Input element text*/}
                        <textarea 
                            id="keyInputAddress"
                            placeholder="Address"
                            className="form-control"
                            rows={"5"}
                            maxLength={"256"}
                            disabled={loading || error !== null}
                            value={values.keyInputAddress} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputAddress && 
                            touched.keyInputAddress ? 
                                (<small className="text-danger">{errors.keyInputAddress}</small>) : 
                                    null}
                    </div>
                    {/* End:: Column role */}

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
                    disabled={loading}
                    onClick={handleClose}>
                    Close
                </button>
                {/* End:: Close button */}
                
                {/* Start:: Save button */}
                <button 
                    type="button"
                    className="btn btn-success"
                    disabled={loading} 
                    onClick={handleSubmit}>

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

        </form> 
    );
    // End:: Html

};
// End:: form


// Start:: Component
// props parameters
// pId
// onEdited()
// onClosed()

// useImperativeHandle
// handleShowModal
const EmployeeEdit = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.employeeAPI}/${hotelId}/${props.pId}`
    });

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
        setShowModal(false);
        props.onEdited();
    };
    // End:: Save

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal}
    });
    // End:: forward reff show modal function

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") handleCloseModal();
        });

        return () => {document.removeEventListener("keydown", handleCloseModal);}
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    
    
    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            try {
                showModal && await doFetch();
            } catch (err) {
              console.log("Error occured when fetching data");
            }
          })();
    }, [showModal]);        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);

    // Start:: Html
    return (
        <>
            {/* Start:: Edit modal */}
            {data &&
                <Modal 
                    show={showModal}>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Edit</Modal.Title>
                        
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
                        pId={data._id}    
                        pAccessLevels={data.accessLevels}
                        pName={data.name}
                        pAddress={data.address}
                        pMobile={data.mobile}
                        pEmail={data.email}
                        onSubmited={handleSave} 
                        onClosed={handleCloseModal}/>
                        {/* End:: Form component */}
                    
                </Modal>}
            {/* End:: Edit modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default EmployeeEdit;