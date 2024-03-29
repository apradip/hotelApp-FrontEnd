import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { tableSchema } from "../../schemas";
import useFetchWithAuth from "../common/useFetchWithAuth";

// Start:: form
const Form = ({onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doInsert} = useFetchWithAuth({
        url: `${contextValues.tableAPI}/${hotelId}`
    });

    // Start:: Form validate and save data
    const {values, errors, touched, setFieldValue, handleChange, handleSubmit, resetForm} = useFormik({        
        initialValues: {keyInputNo: "",
                        keyInputAccommodation: 1,
                        keyInputDescription: ""},
        validationSchema: tableSchema,
        validateOnChange,
        onSubmit: async (values, action) => {
            try {
                const payload = { no: values.keyInputNo.toUpperCase(),
                                accommodation: values.keyInputAccommodation,
                                description: values.keyInputDescription};

                await doInsert(payload);
        
                if (error === null) {
                    action.resetForm();
                    onSubmited();
                } else {
                    toast.error(error);
                }
            } catch (err) {
                console.log(err);
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
        <form>

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div className="row">
                    
                    {/* Start:: Column no */}
                    <div className="col-xs-12 col-md-6 mb-3">
                        {/* Label element */}
                        <label className="form-label" 
                             htmlFor={"keyInputNo"}><b>No.</b></label>
                        
                        {/* Input element text*/}
                        <input 
                             type="text" 
                             name={"keyInputNo"}
                             placeholder="Table no."
                             className="form-control"
                             autoComplete="off"
                             autoFocus
                             maxLength={10}
                             disabled={loading} 
                             value={values.keyInputNo} 
                             onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputNo && 
                             touched.keyInputNo ? 
                                 (<small className="text-danger">{errors.keyInputNo}</small>) : 
                                     null}
                    </div>
                    {/* End:: Column no */}

                    {/* Start:: Column accommodation */}
                    <div className="col-xs-12 col-md-6 mb-3">
                        {/* Label element */}
                        <label className="form-label" 
                             htmlFor={"keyInputAccommodation"}><b>Seat</b></label>
                        
                        {/* Input element text*/}
                        <input 
                             type="text" 
                             name={"keyInputAccommodation"}
                             placeholder="Accommodation"
                             className="form-control"
                             autoComplete="off"
                             maxLength={2}
                             disabled={loading} 
                             value={values.keyInputAccommodation} 
                             onChange={handleChange} />

                        {/* Validation message */}
                        {errors.keyInputAccommodation && 
                             touched.keyInputAccommodation ? 
                                 (<small className="text-danger">{errors.keyInputAccommodation}</small>) : 
                                     null}
                    </div>
                    {/* End:: accommodation */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column description */}
                    <div className="col-12 mb-3">
                        
                        {/* Label element */}
                        <label className="form-label" 
                                htmlFor = {"keyInputDescription"}><b>Description</b></label>
                        
                        {/* Input element text*/}
                        <textarea
                            name={"keyInputDescription"}
                            rows={"5"}
                            placeholder="Description"
                            className="form-control"
                            autoComplete="off"
                            maxLength={1000}
                            disabled={loading}
                            value={values.keyInputAddress} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputDescription && 
                            touched.keyInputDescription ? 
                                (<small className="text-danger">{ errors.keyInputDescription }</small>) : 
                                    null}
                    </div>
                    {/* End:: Column description */}

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
// onAdded()
// onClosed()

// useImperativeHandle
// handleShowModal
const TableAdd = forwardRef((props, ref) => {
    const [showModal, setShowModal] = useState(false);

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") handleCloseModal();
        });

        return () => {document.removeEventListener("keydown", handleCloseModal);}
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
            props.onClosed();
        } catch (err) {
            console.log(err);
        }            
    };
    // End:: Close modal
    
    // Start:: Save
    const handleSave = () => {
        try {
            setShowModal(false);
            props.onAdded();
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
            {/* Start:: Add modal */}
            <Modal
                size="sm"
                show={showModal}>

                {/* Start:: Modal header */}
                <Modal.Header>
                    {/* Header text */}
                    <Modal.Title>New</Modal.Title>

                    {/* Close button */}
                    <NavLink className="nav-icon" 
                        href="#" 
                        onClick={handleCloseModal}>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>
                {/* End:: Modal header */}

                {/* Start:: Form component */}
                <Form
                    onSubmited={handleSave} 
                    onClosed={handleCloseModal}/>
                {/* End:: Form component */}

            </Modal>
            {/* End:: Add modal */}
        </>            
    );
    // End:: Html

});
// End:: Component


export default TableAdd;