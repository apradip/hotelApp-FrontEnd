import React, {useContext, useEffect, useState, forwardRef, useImperativeHandle} from "react";
import {Modal, NavLink} from "react-bootstrap";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {X} from "react-feather";

import {HotelId} from "../../App";
import {useStateContext} from "../../contexts/ContextProvider";
import RoomCategorySelect from '../common/RoomCategorySelect';
import {roomSchema} from "../../schemas";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pId, pCategoryId, pNo, pTariff, pDiscount, pBed, pPerson, onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doUpdate} = useFetchWithAuth({
        url: `${contextValues.roomAPI}/${hotelId}/${pId}`
    });

    // Start:: Form validate and save data
    const { values, errors, touched, setFieldValue, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            keyInputNo: pNo,
            keyInputCategoryId: pCategoryId,
            keyInputTariff: pTariff,
            keyInputDiscount: pDiscount,
            keyInputBed: pBed,   
            keyInputPerson: pPerson
        },
        validationSchema: roomSchema,
        validateOnChange,
        onSubmit: async (values, action) => {
            const payload = {   
                                no: values.keyInputNo.toUpperCase(), 
                                categoryId: values.keyInputCategoryId,
                                tariff: parseFloat(Number.isNaN(values.keyInputTariff) ? 0 : values.keyInputTariff, 10), 
                                maxDiscount: parseFloat(Number.isNaN(values.keyInputDiscount) ? 0 : values.keyInputDiscount, 10), 
                                extraBedTariff: parseFloat(Number.isNaN(values.keyInputBed) ? 0 : values.keyInputBed, 10), 
                                extraPersonTariff: parseFloat(Number.isNaN(values.keyInputPerson) ? 0 : values.keyInputPerson, 10)
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
                <div className="row">

                    {/* Start:: Column no */}
                    <div className="col-xs-12 col-md-6 mb-3">
                        
                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputNo"><b>Room No.</b></label>

                        {/* Input element text*/}
                        <input 
                            type='text' 
                            id='keyInputNo'
                            placeholder='Room no.' 
                            className='form-control'
                            disabled={true}
                            value={values.keyInputNo}/>
                    </div>
                    {/* End:: Column no */}

                    {/* Start:: Column room category */}
                    <div className="col-xs-12 col-md-6 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputCategoryName"><b>Category</b></label>
                        
                        {/* Input element select */}
                        <RoomCategorySelect
                            name={"keyInputCategoryName"}
                            value={values.keyInputCategoryId} 
                            disabled={true} 
                            onChange={(value) => {setFieldValue('keyInputCategoryId', value)}}/>
                    </div>
                    {/* End:: Column room category */}

                 </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                 <div className="row">

                    {/* Start:: Column tariff */}
                    <div className="col-xs-12 col-md-6 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputTariff"><b>Tariff</b></label>
                        
                        {/* Input element text*/}
                        <input 
                            type="number" 
                            id="keyInputTariff"
                            placeholder="tariff"
                            className="form-control"
                            disabled={loading || error !== null}
                            value={values.keyInputTariff} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputTariff && 
                             touched.keyInputTariff ? 
                                 (<small className="text-danger">{errors.keyInputTariff}</small>) : 
                                     null}
                    </div>
                    {/* End:: Column tariff */}

                    {/* Start:: Column max. discount */}
                    <div className="col-xs-12 col-md-6 mb-3">
                        
                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputDiscount"><b>Maximum discount</b></label>

                        {/* Input element text*/}
                        <input 
                            type="number" 
                            id="keyInputDiscount"
                            placeholder="discount" 
                            className="form-control"
                            disabled={loading || error !== null}
                            value={values.keyInputDiscount} 
                            onChange={handleChange}/>
                        
                        {/* Validation message */}
                        {errors.keyInputDiscount && 
                             touched.keyInputDiscount ? 
                                (<small className="text-danger">{errors.keyInputDiscount}</small>) : 
                                    null}
                    </div>
                    {/* End:: Column max. discount */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column ext. bed tariff */}
                    <div className="col-xs-12 col-md-6 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputBed"><b>Extra bed tariff</b></label>
                        
                        {/* Input element text*/}
                        <input 
                            type="number"
                            id="keyInputBed"
                            placeholder="extra bed tariff" 
                            className="form-control"
                            disabled={loading || error !== null}
                            value={values.keyInputBed} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputBed && 
                            touched.keyInputBed ? 
                                (<small className="text-danger">{ errors.keyInputBed }</small>) : 
                                    null}
                    </div>
                    {/* End:: Column ext. bed tariff */}

                    {/* Start:: Column ext. person tariff */}
                    <div className="col-xs-12 col-md-6 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputPerson"><b>Extra person tariff</b></label>
                        
                        {/* Input element text*/}
                        <input 
                            type="number"
                            id="keyInputPerson"
                            placeholder="ext. person tariff" 
                            className="form-control"
                            disabled={loading || error !== null}
                            value={values.keyInputPerson} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputPerson && 
                            touched.keyInputPerson ? 
                                (<small className="text-danger">{ errors.keyInputPerson }</small>) : 
                                    null}
                    </div>
                    {/* End:: Column ext. person tariff */}

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
const RoomEdit = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.roomAPI}/${hotelId}/${props.pId}`
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
                        pNo={data.no}
                        pCategoryId={data.categoryId}
                        pTariff={parseFloat(data.tariff, 10).toFixed(2)}
                        pDiscount={parseFloat(data.maxDiscount, 10).toFixed(2)}
                        pBed={parseFloat(data.extraBedTariff, 10).toFixed(2)}
                        pPerson={parseFloat(data.extraPersonTariff, 10).toFixed(2)}
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


export default RoomEdit;