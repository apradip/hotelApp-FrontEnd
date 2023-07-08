import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X } from "react-feather";
import DatePicker from "react-datepicker";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { guestRoomSchema } from "../../schemas";
import { formatYYYYMMDD, formatHHMM } from "../common/Common";
import IDDocumentSelect from "../common/IDDocumentSelect";
import BookingAgentSelect from "../common/BookingAgentSelect";
import PlanSelect from "../common/PlanSelect";
import RoomBookingGrid from "./RoomBookingGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({ onSubmited, onClosed }) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    
    const [noOfDay, setNoOfDay] = useState(1);
    const [validateOnChange, setValidateOnChange] = useState(false);

    const {loading, error, doInsert} = useFetchWithAuth({
        url: `${contextValues.guestAPI}/${hotelId}`
    });

    // const handelChangeRoomData = (roomData) => {
    //     setRoomData(roomData);
    // } 

    // Start:: Form validate and save data
    const {values, errors, touched, setFieldValue, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputIDDocumentId: "",
            keyInputIDNo: "",
            keyInputName: "",
            keyInputAge: "",
            keyInputFatherName: "",
            keyInputAddress: "",
            keyInputCity: "",
            keyInputPS: "",
            keyInputState: "",
            keyInputPIN: "",
            keyInputMobile: "",
            keyInputEmail: "",
            keyInputGuestCount: 1,
            keyInputGuestCountMale: 0,
            keyInputGuestCountFemale: 0,
            keyInputDayCount: 1,
            keyInputBookingAgentId: "",
            keyInputPlanId: "",
            keyInputCorporateName: "",
            keyInputCorporateAddress: "",
            keyInputGST: ""
        },
        validationSchema: guestRoomSchema,
        validateOnChange,
        onSubmit: async (values) => {
            const payload = {   
                option: "R",
                idDocumentId: values.keyInputIDDocumentId, 
                idNo: values.keyInputIDNo, 
                name: values.keyInputName, 
                age: parseInt(values.keyInputAge),
                fatherName: values.keyInputFatherName, 
                address: values.keyInputAddress, 
                city: values.keyInputCity, 
                policeStation: values.keyInputPS, 
                state: values.keyInputState,
                pin: values.keyInputPIN,
                mobile: parseInt(values.keyInputMobile),
                email: values.keyInputEmail,
                guestCount: parseInt(values.keyInputGuestCount),
                guestMaleCount: parseInt(values.keyInputGuestCountMale),
                guestFemaleCount: parseInt(values.keyInputGuestCountFemale),
                dayCount: parseInt(values.keyInputDayCount),
                bookingAgentId: values.keyInputBookingAgentId,
                planId: values.keyInputPlanId,
                corporateName: values.keyInputCorporateName,
                corporateAddress: values.keyInputCorporateAddress,
                gstNo: values.keyInputGST,
                // checkInDate: formatYYYYMMDD(values.keyInputCheckInDate),
                // checkInTime: formatHHMM(values.keyInputCheckInTime),
                // roomDetails: roomData
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
                <div className="row">

                    {/* Start:: Column document type */}
                    <div className="col-sx-12 col-md-4 mb-3">
                        
                        {/* Label element */}
                        <label className="col-12 form-label" 
                                htmlFor={"keyInputIDDocumentId"}>Photo ID</label>

                        <div className="col-12">
                            {/* Input select */}
                            <IDDocumentSelect 
                                name={"keyInputIDDocumentId"}
                                autoFocus
                                value={values.keyInputIDDocumentId} 
                                onChange={(value) => {setFieldValue("keyInputIDDocumentId", value)}}/>

                            {/* Validation message */}
                            {errors.keyInputIDDocumentId && 
                                touched.keyInputIDDocumentId ? 
                                    (<small className="text-danger">{errors.keyInputIDDocumentId}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column document type */}

                    {/* Start:: Column id no. */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputIDNo"}>ID No.</label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text" 
                                name="keyInputIDNo"
                                placeholder="ID No."
                                className="form-control"
                                autoComplete="off"
                                maxLength={30}
                                disabled={loading} 
                                value={values.keyInputIDNo} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputIDNo && 
                                touched.keyInputIDNo ? 
                                    (<small className="text-danger">{errors.keyInputIDNo}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column id no. */}

                    {/* Start:: Column name */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputName"}>Name</label>

                        <div className="col-12">
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
                    </div>
                    {/* End:: Column name */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column age */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputAge"}>Age</label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text" 
                                name="keyInputAge"
                                placeholder="Age"
                                className="form-control"
                                autoComplete="off"
                                maxLength={3}
                                disabled={loading} 
                                value={values.keyInputAge} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputAge && 
                                touched.keyInputAge ? 
                                    (<small className="text-danger">{errors.keyInputAge}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column age */}

                    {/* Start:: Column fathe'sname */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputFatherName"}>Father's name</label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text" 
                                name="keyInputFatherName"
                                placeholder="Father's name"
                                className="form-control"
                                autoComplete="off"
                                maxLength={100}
                                disabled={loading} 
                                value={values.keyInputFatherName} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputFatherName && 
                                touched.keyInputFatherName ? 
                                    (<small className="text-danger">{errors.keyInputFatherName}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column father'sname */}

                    {/* Start:: Column address */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputAddress"}>Address</label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text" 
                                name="keyInputAddress"
                                placeholder="Address"
                                className="form-control"
                                autoComplete="off"
                                maxLength={100}
                                disabled={loading} 
                                value={values.keyInputAddress} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputAddress && 
                                touched.keyInputAddress ? 
                                    (<small className="text-danger">{errors.keyInputAddress}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column address */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column city */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputCity"}>City</label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text" 
                                name="keyInputCity"
                                placeholder="City"
                                className="form-control"
                                autoComplete="off"
                                maxLength={30}
                                disabled={loading} 
                                value={values.keyInputCity} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputCity && 
                                touched.keyInputCity ? 
                                    (<small className="text-danger">{errors.keyInputCity}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column city */}

                    {/* Start:: Column police station */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputPS"}>P.S</label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text" 
                                name="keyInputPS"
                                placeholder="P.S"
                                className="form-control"
                                autoComplete="off"
                                maxLength={100}
                                disabled={loading} 
                                value={values.keyInputPS} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputPS && 
                                touched.keyInputPS ? 
                                    (<small className="text-danger">{errors.keyInputPS}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column police station */}

                    {/* Start:: Column state */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputState"}>State</label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text" 
                                name="keyInputState"
                                placeholder="State"
                                className="form-control"
                                autoComplete="off"
                                maxLength={100}
                                disabled={loading} 
                                value={values.keyInputState} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputState && 
                                touched.keyInputState ? 
                                    (<small className="text-danger">{errors.keyInputState}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column state */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column pin */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputPIN"}>PIN</label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text" 
                                name="keyInputPIN"
                                placeholder="PIN"
                                className="form-control"
                                autoComplete="off"
                                maxLength={10}
                                disabled={loading} 
                                value={values.keyInputPIN} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputPIN && 
                                touched.keyInputPIN ? 
                                    (<small className="text-danger">{errors.keyInputPIN}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column pin */}

                    {/* Start:: Column mobile */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputMobile"}>Mobile</label>

                        <div className="col-12">
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
                    </div>
                    {/* End:: Column mobile */}

                    {/* Start:: Column email */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputEmail"}>Email</label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text" 
                                name="keyInputEmail"
                                placeholder="Email"
                                className="form-control"
                                autoComplete="off"
                                maxLength={100}
                                disabled={loading} 
                                value={values.keyInputEmail} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputEmail && 
                                touched.keyInputEmail ? 
                                    (<small className="text-danger">{errors.keyInputEmail}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column email */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column no of guest */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputGuestCount"}>Guest count</label>

                        <div className="col-12">
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
                    </div>
                    {/* End:: Column no of guest */}

                    {/* Start:: Column no of male guest */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputGuestCountMale"}>Guest count (Male)</label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text" 
                                name="keyInputGuestCountMale"
                                placeholder="Guest count (Male)"
                                className="form-control"
                                autoComplete="off"
                                maxLength={2}
                                disabled={loading} 
                                value={values.keyInputGuestCountMale} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputGuestCountMale && 
                                touched.keyInputGuestCountMale ? 
                                    (<small className="text-danger">{errors.keyInputGuestCountMale}</small>) : 
                                        null}
                        </div>                                
                    </div>
                    {/* End:: Column no of male guest */}

                    {/* Start:: Column no of female guest */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputGuestCountFemale"}>Guest count (Female)</label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text" 
                                name="keyInputGuestCountFemale"
                                placeholder="Guest count (Female)"
                                className="form-control"
                                autoComplete="off"
                                maxLength={2}
                                disabled={loading} 
                                value={values.keyInputGuestCountFemale} 
                                onChange={handleChange}/>

                            {/* Validation message */}
                            {errors.keyInputGuestCountFemale && 
                                touched.keyInputGuestCountFemale ? 
                                    (<small className="text-danger">{errors.keyInputGuestCountFemale}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column no of female guest */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column no of day */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputDayCount"}>Day count</label>

                        <div className="col-12">
                            {/* Input element text*/}
                            <input 
                                type="text" 
                                name="keyInputDayCount"
                                placeholder="Day count"
                                className="form-control"
                                autoComplete="off"
                                maxLength={2}
                                disabled={loading} 
                                value={values.keyInputDayCount} 
                                onChange={e => {handleChange(e); setNoOfDay(e.target.value)}} />

                            {/* Validation message */}
                            {errors.keyInputDayCount && 
                                touched.keyInputDayCount ? 
                                    (<small className="text-danger">{errors.keyInputDayCount}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column no of day */}

                    {/* Start:: Column booking agent */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputBookingAgentId"}>Agent</label>

                        <div className="col-12">
                            {/* Label element */}
                            <BookingAgentSelect 
                                name={"keyInputBookingAgentId"}
                                value={values.keyInputBookingAgentId} 
                                onChange={(value) => {setFieldValue("keyInputBookingAgentId", value)}}/>

                            {/* Validation message */}
                            {errors.keyInputBookingAgentId && 
                                touched.keyInputBookingAgentId ? 
                                    (<small className="text-danger">{errors.keyInputBookingAgentId}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column no of male guest */}

                    {/* Start:: Column plan */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputPlanId"}>Plan</label>

                        <div className="col-12">
                            {/* Input element select*/}
                            <PlanSelect 
                                name={"keyInputPlanId"}
                                value={values.keyInputPlanId} 
                                onChange={(value) => {setFieldValue("keyInputPlanId", value)}}/>


                            {/* Validation message */}
                            {errors.keyInputPlanId && 
                                touched.keyInputPlanId ? 
                                    (<small className="text-danger">{errors.keyInputPlanId}</small>) : 
                                        null}
                        </div>
                    </div>
                    {/* End:: Column plan */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column corporate name */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputCorporateName"}>Corporate name</label>

                        <div className="col-12">
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
                    </div>
                    {/* End:: Column corporate name */}

                    {/* Start:: Column coroprate address */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputCorporateAddress"}>Corporate address</label>

                        <div className="col-12">
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
                    </div>
                    {/* End:: Column coroprate address */}

                    {/* Start:: Column gst no */}
                    <div className="col-sx-12 col-md-4 mb-3">

                        {/* Label element */}
                        <label className="col-12 form-label" 
                            htmlFor={"keyInputGST"}>GST No.</label>

                        <div className="col-12">
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
                    </div>
                    {/* End:: Column gst no */}

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
const GuestRoomAdd = forwardRef(( props, ref ) => {
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
        return {handleShowModal}
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


export default GuestRoomAdd;