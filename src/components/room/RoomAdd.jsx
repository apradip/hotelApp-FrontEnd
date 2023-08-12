import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import RoomCategorySelect from '../common/RoomCategorySelect';
import { roomSchema } from "../../schemas";
import useFetchWithAuth from "../common/useFetchWithAuth";

// Start:: form
const Form = ({onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doInsert} = useFetchWithAuth({
        url: `${contextValues.roomAPI}/${hotelId}`
    });

    // Start:: Form validate and save data
    const {values, errors, touched, setFieldValue, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {keyInputCategoryId: "",
                        keyInputNo: "",
                        keyInputAccommodation: 0,
                        keyInputTariff: 0 ,
                        keyInputDiscount: 0,
                        keyInputExtraBedTariff: 0,
                        keyInputExtraPersonTariff: 0},
        validationSchema: roomSchema,
        validateOnChange,
        onSubmit: async (values, action) => {
            try {
                const payload = {categoryId: values.keyInputCategoryId, 
                                no: values.keyInputNo.toUpperCase(), 
                                accommodation: values.keyInputAccommodation,
                                tariff: parseFloat(Number.isNaN(values.keyInputTariff) ? 0 : values.keyInputTariff, 10), 
                                maxDiscount: parseFloat(Number.isNaN(values.keyInputDiscount) ? 0 : values.keyInputDiscount, 10), 
                                extraBedTariff: parseFloat(Number.isNaN(values.keyInputExtraBedTariff) ? 0 : values.keyInputExtraBedTariff, 10), 
                                extraPersonTariff: parseFloat(Number.isNaN(values.keyInputExtraPersonTariff) ? 0 : values.keyInputExtraPersonTariff, 10)};

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

                    {/* Start:: Column category */}
                    <div className="col-xs-12 col-md-6 mb-3">
                        
                        {/* Label element */}
                        <label className="form-label" 
                                 htmlFor={"keyInputCategoryId"}><b>Category</b></label>

                        {/* Input element text*/}
                        <RoomCategorySelect 
                            autoFocus
                             name={"keyInputCategoryId"}
                             value={values.keyInputCategoryId} 
                             onChange={(value) => {setFieldValue("keyInputCategoryId", value)}} />

                        {/* Validation message */}
                        {errors.keyInputCategoryId && 
                             touched.keyInputCategoryId ? 
                                 (<small className="text-danger">{errors.keyInputCategoryId}</small>) : 
                                     null}
                    </div>
                    {/* End:: Column category */}

                    {/* Start:: Column no */}
                    <div className="col-xs-12 col-md-3 mb-3">
                        
                        {/* Label element */}
                        <label className="form-label" 
                             htmlFor={"keyInputNo"}><b>Room No.</b></label>
                        
                        {/* Input element text*/}
                        <input 
                             type="text" 
                             name={"keyInputNo"}
                             placeholder="Room no."
                             className="form-control"
                             autoComplete="off"
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
                    <div className="col-xs-12 col-md-3 mb-3">
                        {/* Label element */}
                        <label className="form-label" 
                             htmlFor={"keyInputAccommodation"}><b>Bed</b></label>
                        
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

                    {/* Start:: Column tariff */}
                    <div className="col-xs-12 col-md-6 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                                htmlFor={"keyInputTariff"}><b>Tariff</b></label>
                        
                        {/* Input element text*/} 
                        <input 
                            type="number" 
                            name={"keyInputTariff"}
                            placeholder="Tariff"
                            className="form-control"
                            autoComplete="off"
                            maxLength={8}
                            disabled={loading}
                            value={values.keyInputTariff} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputTariff && 
                             touched.keyInputTariff ? 
                                 (<small className="text-danger">{ errors.keyInputTariff }</small>) : 
                                     null}
                    </div>
                    {/* End:: Column tariff */}

                    {/* Start:: Column max. discount */}
                    <div className="col-xs-12 col-md-6 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputDiscount"}><b>Maximum discount</b></label>

                        {/* Input element text*/} 
                        <input 
                            type="number" 
                            name={"keyInputDiscount"}
                            placeholder="Maximum discount"
                            className="form-control"
                            autoComplete="off"
                            maxLength={8}
                            disabled={loading} 
                            value={values.keyInputDiscount} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputDiscount && 
                            touched.keyInputDiscount ? 
                                (<small className="text-danger">{ errors.keyInputDiscount }</small>) : 
                                    null}
                    </div>
                    {/* End:: Column max. discount */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column ext. bed teriff */}
                    <div className="col-xs-12 col-md-6 mb-3">
                         
                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputExtraBedTariff"}><b>Extra bed tariff</b></label>
                            
                        {/* Input element text*/} 
                        <input
                            type="number"
                            name={"keyInputExtraBedTariff"}
                            placeholder="Extra bed tariff" 
                            className="form-control"
                            autoComplete="off"
                            maxLength={8}
                            disabled={loading}
                            value={values.keyInputExtraBedTariff} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputExtraBedTariff && 
                            touched.keyInputExtraBedTariff ? 
                                (<small className="text-danger">{errors.keyInputExtraBedTariff}</small>) : 
                                    null}
                    </div>
                    {/* End:: Column ext. bed teriff */}

                    {/* Start:: Column ext. person teriff */}
                    <div className="col-xs-12 col-md-6 mb-3">
                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputExtraPersonTariff"}><b>Extra person tariff</b></label>
                         
                        {/* Input element text*/} 
                        <input 
                            type="number"
                            name={"keyInputExtraPersonTariff"}
                            placeholder="Extra person tariff" 
                            className="form-control"
                            autoComplete="off"
                            maxLength={8}
                            disabled={loading}
                            value={values.keyInputExtraPersonTariff} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputExtraPersonTariff && 
                            touched.keyInputExtraPersonTariff ? 
                                (<small className="text-danger">{errors.keyInputExtraPersonTariff}</small>) : 
                                    null}
                    </div>
                    {/* End:: Column ext. person teriff */}

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
const RoomAdd = forwardRef((props, ref) => {
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
                show={showModal}>

                {/* Start:: Modal header */}
                <Modal.Header>
                    {/* Header text */}
                    <Modal.Title>New</Modal.Title>

                    {/* Close button */}
                    <NavLink className="nav-icon" href="#" onClick={handleCloseModal}>
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


export default RoomAdd;