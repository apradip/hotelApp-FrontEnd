import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { serviceSchema } from "../../schemas";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({ pId, pName, pPrice, pDescription, onSubmited, onClosed }) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const { loading, error, doUpdate } = useFetchWithAuth({
        url: `${contextValues.serviceAPI}/${hotelId}/${pId}`
    });

    // Start:: Form validate and save data
    const { values, errors, touched, setFieldValue, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            keyInputName: pName,
            keyInputPrice: pPrice,
            keyInputDescription: pDescription
        },
        validationSchema: serviceSchema,
        validateOnChange,
        onSubmit: async (values, action) => {
            const payload = {   
                                'name': values.keyInputName.toUpperCase(), 
                                'price': parseFloat(Number.isNaN(values.keyInputPrice) ? 0 : values.keyInputPrice, 10),
                                'description': values.keyInputDescription.trim()
                            };

            await doUpdate(payload);
        
            if (error === null) {
                action.resetForm();
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
                <div className="row mb-2">

                    {/* Start:: Column name */}
                    <div className="col-12">
                        
                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputName">Name</label>

                        {/* Input element text*/}
                        <input 
                            type='text' 
                            id='keyInputName'
                            placeholder='Name' 
                            className='form-control'
                            disabled={true}
                            value={values.keyInputName} />
                    </div>
                    {/* End:: Column name */}

                 </div>
                {/* End:: Row */}

                <div className="row mb-3">

                    {/* Start:: Column price */}
                    <div className="col-12">

                        {/* Label element */}
                        <label className="form-label" 
                                htmlFor={"keyInputPrice"}>Price</label>
                        
                        {/* Input element text*/} 
                        <input 
                            type="number" 
                            name={"keyInputPrice"}
                            placeholder="Price"
                            className="form-control"
                            autoComplete="off"
                            maxLength={8}
                            disabled={loading}
                            value={values.keyInputPrice} 
                            onChange={handleChange} />

                        {/* Validation message */}
                        { errors.keyInputPrice && 
                             touched.keyInputPrice ? 
                                 (<small className="text-danger">{errors.keyInputPrice}</small>) : 
                                     null }
                    </div>
                    {/* End:: Column price */}

                </div>

                {/* Start:: Row */}
                 <div className="row mb-2">

                    {/* Start:: Column tariff */}
                    <div className="col-12">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputDescription">Description</label>
                        
                        {/* Input element text*/}
                        <textarea 
                            id="keyInputDescription"
                            placeholder="Description"
                            className="form-control"
                            autoFocus
                            rows={"5"}
                            maxLength={"256"}
                            disabled={loading || error !== null}
                            value={values.keyInputDescription} 
                            onChange={handleChange} />

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
const ServiceEdit = forwardRef(( props, ref ) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.serviceAPI}/${hotelId}/${props.pId}`
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
            { data &&
                <Modal
                    size="sm" 
                    show={showModal} >

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Edit service</Modal.Title>
                        
                        {/* Close button */}
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick={handleCloseModal} >
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    {/* End:: Modal header */}

                    {/* Start:: Form component */}
                    <Form 
                        pId={data._id}
                        pName={data.name}
                        pPrice={data.price}
                        pDescription={data.description}
                        onSubmited={handleSave} 
                        onClosed={handleCloseModal} />
                        {/* End:: Form component */}
                    
                </Modal>}
            {/* End:: Edit modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default ServiceEdit;