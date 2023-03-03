import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Modal, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { X, Key } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { changePasswordSchema } from "../../schemas";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({ pId, onSubmited, onClosed }) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const { loading, error, doUpdate } = useFetchWithAuth({
        url: `${contextValues.changePasswordAPI}/${hotelId}/${pId}`
    });

    const { values, errors, touched, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            keyInputOldPassword: "",
            keyInputNewPassword: "",
            keyInputReEnterNewPassword: "",
        },
        validationSchema: changePasswordSchema,
        validateOnChange,
        onSubmit: async (values, action) => {
            const payload = {   
                            "oldPassword": values.keyInputOldPassword, 
                            "newPassword": values.keyInputNewPassword 
                        };

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
                <div className="row mb-3">

                    {/* Start:: Column old password */}
                    <div className="col-12">
                        
                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputOldPassword">Old password</label>
                        
                        {/* Input element text*/}
                        <input
                            type="password" 
                            name="keyInputOldPassword"
                            placeholder="old password"
                            className="form-control"
                            autoComplete="off"
                            autoFocus
                            maxLength = { 100 }
                            disabled = { loading }
                            value = { values.keyInputOldPassword }
                            onChange = { handleChange } />

                        {/* Validation message */}
                        {errors.keyInputOldPassword && 
                            touched.keyInputOldPassword ? 
                                (<small className="text-danger">{ errors.keyInputOldPassword }</small>) : 
                                    null}
                    </div>
                    {/* End:: Column old password */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row mb-3">

                    {/* Start:: Column new password */}
                    <div className="col-12">

                        {/* Label element */}
                        <label className="form-label" 
                                htmlFor={"keyInputNewPassword"}>New password</label>
                        
                        {/* Input element text*/}
                        <input 
                            type="password" 
                            name={"keyInputNewPassword"}
                            placeholder="new password"
                            className="form-control"
                            autoComplete="off"
                            maxLength = { 100 }
                            disabled = { loading }
                            value = { values.keyInputNewPassword } 
                            onChange = { handleChange } />

                        {/* Validation message */}
                        {errors.keyInputNewPassword && 
                            touched.keyInputNewPassword ? 
                                (<small className="text-danger">{errors.keyInputNewPassword}</small>) : 
                                    null}

                    </div>
                    {/* End:: Column new password */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row mb-3">

                    {/* Start:: Column re-enter new password */}
                    <div className="col-12">

                        {/* Label element */}
                        <label className="form-label" 
                                htmlFor={"keyInputReEnterNewPassword"}>Re enter new password</label>
                        
                        {/* Input element text*/}
                        <input 
                            type="password" 
                            name={"keyInputReEnterNewPassword"}
                            placeholder="re enter new password"
                            className="form-control"
                            autoComplete="off"
                            maxLength={100}
                            disabled={loading}
                            value={values.keyInputReEnterNewPassword} 
                            onChange={handleChange} />

                        {/* Validation message */}
                        {errors.keyInputReEnterNewPassword && 
                            touched.keyInputNewPassword ? 
                                (<small className="text-danger">{errors.keyInputReEnterNewPassword}</small>) : 
                                    null}
                    
                    </div>
                    {/* End:: Column re-enter new password */}

                </div>
                {/* End:: Row */}

            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>

                {/* Start:: Close button */}
                <button 
                    type="reset"
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
const ChangePassword = ({ pEmployeeId, onEdited, onClosed }) => {
    const [showModal, setShowModal] = useState(false);

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
    
    // Start:: Html
    return (
        <div className="text-left">
            {/* Start:: Change password link */}
            <Link className="dropdown-item" 
                href="window.location" 
                onClick = { handleShowModal }>
			    <Key className="mr-2" size={16} />Change password
            </Link>
            {/* End:: Change password link */}

            {/* Start:: Mod modal */}
            <Modal 
                show={showModal}>

                {/* Start:: Modal header */}
                <Modal.Header>
                    {/* Header text */}
                    <Modal.Title>Change password</Modal.Title>

                    {/* Close button */}
                    <NavLink className="nav-icon" href="#" onClick={handleCloseModal}>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>
                {/* End:: Modal header */}

                {/* Start:: Form component */}
                <Form
                    pId = { pEmployeeId }
                    onSubmited = { handleSave } 
                    onClosed = { handleCloseModal } />
                {/* End:: Form component */}                                            

            </Modal>
            {/* End:: Mod modal */}

        </div>  
    );
    // End:: Html

};
// End:: Component


export default ChangePassword;