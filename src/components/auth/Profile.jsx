import React, { useContext, useEffect, useState } from "react";
import { Modal, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X, User } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { employeeSchema } from "../../schemas";
import AccessLevelSelect from "../common/AccessLevelSelect";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({ pId, pAccessLevels, pName, pAddress, pMobile, pEmail, onSubmited, onClosed }) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doUpdate} = useFetchWithAuth({
        url: `${contextValues.employeeAPI}/${hotelId}/${pId}`
    });
    
    const { values, errors, touched, setFieldValue, handleChange, handleSubmit, resetForm } = useFormik({
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
                "accessLevels": values.keyInputAccessLevels,
                "name": values.keyInputName.toUpperCase(), 
                "address": values.keyInputAddress.toUpperCase(), 
                "mobile": values.keyInputMobile.toString(), 
                "email": values.keyInputEmail.toLowerCase()
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
                <div className="row mb-2">

                    {/* Start:: Column name */}
                    <div className="col-12">
                        
                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputName">Name</label>
                        
                        {/* Input element text*/}
                        <input 
                            type="text" 
                            id="keyInputName"
                            placeholder="Name" 
                            className="form-control"
                            autoFocus
                            value ={ values.keyInputName } 
                            onChange = { handleChange } />

                        {/* Validation message */}
                        {errors.keyInputName && 
                            touched.keyInputName ? 
                                (<small className="text-danger">{errors.keyInputName}</small>) : 
                                    null}
                    </div>
                    {/* End:: Column name */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row mb-2">

                    {/* Start:: Column role */}
                    <div className="col-12">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputAccessLevelName">Role</label>

                        {/* Input element multi select */}
                        <AccessLevelSelect
                            name = { 'keyInputAccessLevels' }
                            value = { values.keyInputAccessLevels } 
                            disabled = { true } 
                            onChange={ (value) => { setFieldValue('keyInputAccessLevels', value) } }/>

                        {/* Validation message */}
                        {errors.keyInputAccessLevelId && 
                            touched.keyInputAccessLevelId ? 
                                (<small className="text-danger">{errors.keyInputAccessLevelId}</small>) : 
                                    null}
                    </div>
                    {/* End:: Column role */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row mb-2">

                    {/* Start:: Column address */}
                    <div className="col-12">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputAddress">Address</label>

                        {/* Input element text*/}
                        <textarea 
                            id="keyInputAddress"
                            placeholder="Address"
                            className="form-control"
                            rows = { "5" }
                            disabled = { loading || error !== null }
                            value = { values.keyInputAddress } 
                            onChange = { handleChange } />

                        {/* Validation message */}
                        {errors.keyInputAddress && 
                            touched.keyInputAddress ? 
                                (<small className="text-danger">{errors.keyInputAddress}</small>) : 
                                    null}

                    </div>
                    {/* End:: Column address */}

                </div>
                {/* End:: Row */}

                {/* End:: Row */}
                <div className="row mb-2">
                    
                    {/* Start:: Column mobile no. */}
                    <div className="col-xs-12 col-md-6">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputBed">Mobile no.</label>

                        {/* Input element text*/}
                        <input 
                            type="number"
                            id="keyInputMobile"
                            placeholder="Mobile no." 
                            className="form-control"
                            disabled = { loading || error !== null }
                            value = { values.keyInputMobile } 
                            onChange = { handleChange } />

                        {/* Validation message */}
                        {errors.keyInputMobile && 
                            touched.keyInputMobile ? 
                                (<small className="text-danger">{ errors.keyInputMobile }</small>) : 
                                    null}
                    </div>
                    {/* End:: Column mobile no. */}

                    {/* Start:: Column email */}
                    <div className="col-xs-12 col-md-6">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputEmail">Email</label>

                        {/* Input element text*/}
                        <input 
                            type="text"
                            id="keyInputEmail"
                            placeholder="Email" 
                            className="form-control"
                            disabled = { loading || error !== null }
                            value = { values.keyInputEmail } 
                            onChange = { handleChange } />

                        {/* Validation message */}
                        {errors.keyInputEmail && 
                            touched.keyInputEmail ? 
                                (<small className="text-danger">{ errors.keyInputEmail }</small>) : 
                                    null}
                    </div>
                    {/* End:: Column email */}

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
                    disabled = { loading }
                    onClick = { handleClose } >
                    Close
                </button>
                {/* End:: Close button */}

                {/* Start:: Save button */}
                <button 
                    className="btn btn-success"
                    type="button"
                    disabled = { loading } 
                    onClick = { handleSubmit } >

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
const Profile = ({ pEmployeeId, onEdited, onClosed }) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.employeeAPI}/${hotelId}/${pEmployeeId}`
    });

    // Start:: Show modal
    const handleShowModal = () => {
        setShowModal(true);
    };
    // End:: Show modal

    // Start:: Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        onClosed();
    };
    // End:: Close modal

    // Start:: Save
    const handleSave = () => {
        setShowModal(false);
        onEdited();
    };
    // End:: Save

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
                pEmployeeId && showModal && await doFetch();
            } catch (err) {
              console.log("Error occured when fetching data");
            }
          })();
    }, [pEmployeeId, showModal, doFetch]);
    // End:: fetch id wise detail from api

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading, pEmployeeId, showModal]);

    // Start:: Html
    return (
        <div className="text-left">

            {/* Start:: Profile link */}
            <Link className="dropdown-item" 
                href="window.location" 
                onClick = { handleShowModal }>
			    <User className="mr-2" size={16} />Profile
            </Link>
            {/* End:: Profile link */}

            {/* Start:: modal */}
            <Modal 
                show = { showModal }>

                {/* Start:: Modal header */}
                <Modal.Header>
                    {/* Header text */}
                    <Modal.Title>Profile</Modal.Title>

                    {/* Close button */}
                    <NavLink 
                        className="nav-icon" href="#" 
                        onClick = { handleCloseModal }>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>
                {/* End:: Modal header */}

                {/* Start:: Form component */}
                { data && 
                    <Form 
                        pId = { pEmployeeId }    
                        pAccessLevels = { data.accessLevels }
                        pName = { data.name }
                        pAddress = { data.address }
                        pMobile = { data.mobile }
                        pEmail = { data.email }
                        onSubmited = { handleSave } 
                        onClosed = { handleCloseModal } /> }
                        {/* End:: Form component */}                        

            </Modal>
            {/* End:: Edit modal */}

        </div>  
    );
    // End:: Html
};
// End:: Component


export default Profile;