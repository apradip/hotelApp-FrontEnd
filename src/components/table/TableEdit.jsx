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
const Form = ({pId, pNo, pAccommodation, pDescription, onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doUpdate} = useFetchWithAuth({
        url: `${contextValues.tableAPI}/${hotelId}/${pId}`
    });

    // Start:: Form validate and save data
    const {values, errors, touched, setFieldValue, handleChange, handleSubmit, resetForm} = useFormik({                
        initialValues: {keyInputNo: pNo,
                        keyInputAccommodation: pAccommodation,
                        keyInputDescription: pDescription},
        validationSchema: tableSchema,
        validateOnChange,
        onSubmit: async (values, action) => {
            try {
                const payload = {no: values.keyInputNo.toUpperCase(), 
                                accommodation: values.keyInputAccommodation, 
                                description: values.keyInputDescription.trim()};

                await doUpdate(payload);
            
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
                            htmlFor="keyInputNo">No.</label>

                        {/* Input element text*/}
                        <input 
                            type="text"
                            id="keyInputNo"
                            placeholder="table no." 
                            className="form-control"
                            disabled={true}
                            defaultValue={values.keyInputNo}/>
                    </div>
                    {/* End:: Column no */}

                    {/* Start:: Column accommodation */}
                    <div className="col-xs-12 col-md-6 mb-3">
                        
                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputAccommodation">Seat</label>

                        {/* Input element text*/}
                        <input 
                            autoFocus
                            type="text"
                            id="keyInputAccommodation"
                            placeholder="Accommodation" 
                            className="form-control"
                            defaultValue={values.keyInputAccommodation}
                            onChange={handleChange}/>
                    </div>
                    {/* End:: Column accommodation */}

                 </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column tariff */}
                    <div className="col-12 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputDescription"><b>Description</b></label>
                        
                        {/* Input element text*/}
                        <textarea 
                            id="keyInputDescription"
                            placeholder="Description"
                            className="form-control"
                            rows={"5"}
                            maxLength={"256"}
                            disabled={loading || error !== null}
                            value={values.keyInputDescription} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputDescription && 
                             touched.keyInputDescription ? 
                                 (<small className="text-danger">{errors.keyInputDescription}</small>) : 
                                     null}
                    </div>
                    {/* End:: Column tariff */}

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
const TableEdit = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.tableAPI}/${hotelId}/${props.pId}`
    });

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
            props.onEdited();
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
            {/* Start:: Edit modal */}
            {data &&
                <Modal
                    size="sm" 
                    show={showModal}>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Edit</Modal.Title>
                        
                        {/* Close button */}
                        <NavLink 
                            className="nav-icon" 
                            href="#" 
                            onClick={handleCloseModal}>
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    {/* End:: Modal header */}

                    {/* Start:: Form component */}
                    <Form 
                        pId={data._id}
                        pNo={data.no}
                        pAccommodation={data.accommodation}
                        pDescription={data.description}
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


export default TableEdit;