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
const Form = ({ onSubmited, onClosed }) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const { loading, error, doInsert } = useFetchWithAuth({
        url: `${contextValues.roomAPI}/${hotelId}`
    });

    // Start:: Form validate and save data
    const { values, errors, touched, setFieldValue, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            keyInputNo: "",
            keyInputCategoryId: "",
            keyInputTariff: 0 ,
            keyInputDiscount: 0,
            keyInputBed: 0,
            keyInputPerson: 0
        },
        validationSchema: roomSchema,
        validateOnChange,
        onSubmit: async (values, action) => {
            const payload = {   
                            "no": values.keyInputNo.toUpperCase(), 
                            "categoryId": values.keyInputCategoryId, 
                            "tariff": parseFloat(Number.isNaN(values.keyInputTariff) ? 0 : values.keyInputTariff, 10), 
                            "maxDiscount": parseFloat(Number.isNaN(values.keyInputDiscount) ? 0 : values.keyInputDiscount, 10), 
                            "extraBedTariff": parseFloat(Number.isNaN(values.keyInputBed) ? 0 : values.keyInputBed, 10), 
                            "extraPersonTariff": parseFloat(Number.isNaN(values.keyInputPerson) ? 0 : values.keyInputPerson, 10),
                        };

            await doInsert(payload);
        
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
                <div className="row mb-3">
                    
                    {/* Start:: Column no */}
                    <div className="col-xs-12 col-md-6">
                        {/* Label element */}
                        <label className="form-label" 
                             htmlFor={"keyInputNo"}>Room No.</label>
                        
                        {/* Input element text*/}
                        <input 
                             type="text" 
                             name={"keyInputNo"}
                             placeholder="Room no."
                             className="form-control"
                             autoComplete="off"
                             autoFocus
                             maxLength={10}
                             disabled={loading} 
                             value={values.keyInputNo} 
                             onChange={handleChange} />

                        {/* Validation message */}
                        { errors.keyInputNo && 
                             touched.keyInputNo ? 
                                 (<small className="text-danger">{errors.keyInputNo}</small>) : 
                                     null }
                    </div>
                    {/* End:: Column no */}

                    {/* Start:: Column category */}
                    <div className="col-xs-12 col-md-6">
                        
                        {/* Label element */}
                        <label className="form-label" 
                                 htmlFor={"keyInputCategoryId"}>Category</label>

                        {/* Input element text*/}
                        <RoomCategorySelect 
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

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row mb-3">

                    {/* Start:: Column tariff */}
                    <div className="col-xs-12 col-md-6">

                        {/* Label element */}
                        <label className="form-label" 
                                htmlFor={ "keyInputTariff" }>Tariff</label>
                        
                        {/* Input element text*/} 
                        <input 
                            type="number" 
                            name={ "keyInputTariff" }
                            placeholder="Tariff"
                            className="form-control"
                            autoComplete="off"
                            maxLength={ 8 }
                            disabled={ loading }
                            value={ values.keyInputTariff } 
                            onChange={ handleChange } />

                        {/* Validation message */}
                        { errors.keyInputTariff && 
                             touched.keyInputTariff ? 
                                 (<small className="text-danger">{ errors.keyInputTariff }</small>) : 
                                     null }
                    </div>
                    {/* End:: Column tariff */}

                    {/* Start:: Column max. discount */}
                    <div className="col-xs-12 col-md-6">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={ "keyInputDiscount" }>Maximum discount</label>

                        {/* Input element text*/} 
                        <input 
                            type="number" 
                            name={ "keyInputDiscount" }
                            placeholder="Maximum discount"
                            className="form-control"
                            autoComplete="off"
                            maxLength={ 8 }
                            disabled={ loading } 
                            value={ values.keyInputDiscount } 
                            onChange={ handleChange } />

                        {/* Validation message */}
                        { errors.keyInputDiscount && 
                            touched.keyInputDiscount ? 
                                (<small className="text-danger">{ errors.keyInputDiscount }</small>) : 
                                    null }
                    </div>
                    {/* End:: Column max. discount */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row mb-3">

                    {/* Start:: Column ext. bed teriff */}
                    <div className="col-xs-12 col-md-6">
                         
                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={ "keyInputBed" }>Extra bed tariff</label>
                            
                        {/* Input element text*/} 
                        <input
                            type="number"
                            name={ "keyInputBed" }
                            placeholder="Extra bed tariff" 
                            className="form-control"
                            autoComplete="off"
                            maxLength={ 8 }
                            disabled={ loading }
                            value={ values.keyInputBed } 
                            onChange={ handleChange } />

                        {/* Validation message */}
                        { errors.keyInputBed && 
                            touched.keyInputBed ? 
                                (<small className="text-danger">{ errors.keyInputBed }</small>) : 
                                    null }
                    </div>
                    {/* End:: Column ext. bed teriff */}

                    {/* Start:: Column ext. person teriff */}
                    <div className="col-xs-12 col-md-6">
                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={ "keyInputPerson" }>Extra person tariff</label>
                         
                        {/* Input element text*/} 
                        <input 
                            type="number"
                            name={"keyInputPerson"}
                            placeholder="Extra person tariff" 
                            className="form-control"
                            autoComplete="off"
                            maxLength={ 8 }
                            disabled={ loading }
                            value={ values.keyInputPerson } 
                            onChange={ handleChange } />

                        {/* Validation message */}
                        { errors.addPerson && 
                            touched.addPerson ? 
                                (<small className="text-danger">{ errors.addPerson }</small>) : 
                                    null }    
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
                    disabled = { loading }
                    onClick = { handleClose } >
                    Close
                </button>
                {/* End:: Close button */}

                {/* Start:: Save button */}
                <button 
                    type="button"
                    className="btn btn-success"
                    disabled = { loading } 
                    onClick = { handleSubmit } >

                    { !loading && "Confirm" }
                    { loading && 
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
// onAdded()
// onClosed()

// useImperativeHandle
// handleShowModal
const RoomAdd = forwardRef(( props, ref ) => {
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
            <Modal 
                show = { showModal } >

                {/* Start:: Modal header */}
                <Modal.Header>
                    {/* Header text */}
                    <Modal.Title>Add room</Modal.Title>

                    {/* Close button */}
                    <NavLink className="nav-icon" href="#" onClick = { handleCloseModal } >
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>
                {/* End:: Modal header */}

                {/* Start:: Form component */}
                <Form
                    onSubmited = { handleSave } 
                    onClosed = { handleCloseModal } />
                {/* End:: Form component */}

            </Modal>
            {/* End:: Add modal */}
        </>            
    );
    // End:: Html

});
// End:: Component


export default RoomAdd;