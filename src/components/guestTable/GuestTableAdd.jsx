import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X } from "react-feather";
import DatePicker from "react-datepicker";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { guestTableSchema } from "../../schemas";
import { formatYYYYMMDD, formatHHMM } from "../common/Common";
// import TableBookingGrid from "./TableBookingGrid";
import TableSelect from "../common/TableSelect";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({ onSubmited, onClosed }) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    
    const [tableData, setTableData] = useState(null);
    const [validateOnChange, setValidateOnChange] = useState(false);
    // const [defaultRowData, setDefaultRowData] = useState([
    //     {rowId: 1, table: "Select table", tableId: ""},
    //     {rowId: 2, table: "Select table", tableId: ""}
    // ]);

    const {loading, error, doInsert} = useFetchWithAuth({
        url: `${contextValues.guestTableAPI}/${hotelId}`
    });

    // const handelChangeTableData = (tableData) => {
    //     setTableData(tableData);
    // } 

    // Start:: Form validate and save data
    const {values, errors, touched, setFieldValue, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputName: "",
            keyInputMobile: "",
            keyInputGuestCount: 1,
            keyInputCorporateName: "",
            keyInputCorporateAddress: "",
            keyInputGST: "",
            keyInputTables: "",
            keyInputCheckInDate: new Date(),
            keyInputCheckInTime: new Date()
        },
        validationSchema: guestTableSchema,
        validateOnChange,
        onSubmit: async (values) => {
            const payload = {   
                "name": values.keyInputName.toUpperCase(), 
                "mobile": parseInt(values.keyInputMobile),
                "guestCount": parseInt(values.keyInputGuestCount),
                "corporateName": values.keyInputCorporateName,
                "corporateAddress": values.keyInputCorporateAddress,
                "gstNo": values.keyInputGST,
                "tables": values.keyInputTables,
                "checkInDate": formatYYYYMMDD(values.keyInputCheckInDate),
                "checkInTime": formatHHMM(values.keyInputCheckInTime),
            }

            await doInsert(payload);
        
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
                <div className="row mb-3">

                    {/* Start:: Column name */}
                    <div className="col-4">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputName"}>Name</label>

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
                    {/* End:: Column name */}

                    {/* Start:: Column mobile */}
                    <div className="col-4">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputMobile"}>Mobile</label>

                        {/* Input element text*/}
                        <input 
                            type="text" 
                            name="keyInputMobile"
                            placeholder="Mobile"
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
                    {/* End:: Column mobile */}

                    {/* Start:: Column no of guest */}
                    <div className="col-4">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputGuestCount"}>Guest count</label>

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
                    {/* End:: Column no of guest */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row mb-3">

                    {/* Start:: Column corporate name */}
                    <div className="col-4">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputCorporateName"}>Corporate name</label>

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
                    {/* End:: Column corporate name */}

                    {/* Start:: Column coroprate address */}
                    <div className="col-4">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputCorporateAddress"}>Corporate address</label>

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
                    {/* End:: Column coroprate address */}

                    {/* Start:: Column gst no */}
                    <div className="col-4">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputGST"}>GST No.</label>

                        {/* Input element select*/}
                        <input 
                            type="text" 
                            name="keyInputGST"
                            placeholder="GST No."
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
                    {/* End:: Column gst no */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row mb-3">

                    {/* Start:: Column table */}
                    <div className="col-4">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputTables"}>Tables</label>

                        {/* Input element select*/}
                        <TableSelect 
                            name={"keyInputTables"}
                            onChange={(value) => {setFieldValue("keyInputTables", value)}}/>

                        {/* Validation message */}
                        {errors.keyInputTables && 
                            touched.keyInputTables ? 
                                (<small className="text-danger">{errors.keyInputTables}</small>) : 
                                    null}
                    
                    </div>
                    {/* End:: Column table */}

                    {/* Start:: Column check in date */}
                    <div className="col-4">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputCheckInDate"}>Check in date</label>

                        {/* Input element text*/}
                        <DatePicker
                            name="keyInputCheckInDate"
                            placeholder="Check in date"
                            className="form-control"
                            disabled={loading} 
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            showDisabledMonthNavigation
                            selected={values.keyInputCheckInDate}
                            onChange={(value) => {setFieldValue("keyInputCheckInDate", value)}} />

                        {/* Validation message */}
                        {errors.keyInputCheckInDate && 
                            touched.keyInputCheckInDate ? 
                                (<small className="text-danger">{errors.keyInputCheckInDate}</small>) : 
                                    null}
                    
                    </div>
                    {/* End:: Column check in date */}

                    {/* Start:: Column check in time */}
                    <div className="col-4">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputCheckInTime"}>Check in time</label>

                        {/* Input element text*/}
                        <DatePicker
                            name="keyInputCheckInTime"
                            placeholder="Check in time"
                            className="form-control"
                            disabled={loading} 
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            selected={values.keyInputCheckInTime}
                            onChange={(value) => {setFieldValue("keyInputCheckInTime", value)}} />

                        {/* Validation message */}
                        {errors.keyInputCheckInTime && 
                            touched.keyInputCheckInTime ? 
                                (<small className="text-danger">{errors.keyInputCheckInTime}</small>) : 
                                    null}
                    
                    </div>
                    {/* End:: Column check in time */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column food detail */}
                    <div className="col-12">
                        
                        {/* Label element */}
                        <label className="form-label">Food detail</label>

                        {/* <TableBookingGrid
                            pState="ADD"
                            pDefaultRowData={defaultRowData}
                            onChange={handelChangeTableData}/> */}
                    </div>                
                    {/* End:: Column food detail */}

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
// onAdded()
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestTableAdd = forwardRef(( props, ref ) => {
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
            <Modal size="lg"
                show={showModal}>

                {/* Start:: Modal header */}
                <Modal.Header>
                    {/* Header text */}
                    <Modal.Title>Add guest table</Modal.Title>

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


export default GuestTableAdd;