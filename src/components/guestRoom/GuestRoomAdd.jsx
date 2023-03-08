import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink, Accordion } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X } from "react-feather";
import DatePicker from "react-datepicker";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { guestRoomSchema } from "../../schemas";
import { formatMMDDYYYY, formatHHMM } from "../common/Common";
import IDDocumentSelect from "../common/IDDocumentSelect";
import BookingAgentSelect from "../common/BookingAgentSelect";
import PlanSelect from "../common/PlanSelect";
import RoomBookingGrid from "./RoomBookingGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
var colors = ['#000000', '#000066', '#006600', '#660000'];

const Form = ({ onSubmited, onClosed }) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    
    const [noOfDay, setNoOfDay] = useState(1);
    const [roomData, setRoomData] = useState(null);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const [defaultRowData, setDefaultRowData] = useState([
        {rowId: 1, occupancyDate: new Date(), room: "Select room", extPerson: 0, extBed: 0, discount: 0, gst: 0, finalTariff: 0, roomId: "", extraBedTariff: 0, extraPersonTariff: 0, maxDiscount: 0, tariff: 0, gstPercentage: 0},
        {rowId: 2, occupancyDate: new Date(), room: "Select room", extPerson: 0, extBed: 0, discount: 0, gst: 0, finalTariff: 0, roomId: "", extraBedTariff: 0, extraPersonTariff: 0, maxDiscount: 0, tariff: 0, gstPercentage: 0},
        {rowId: 3, occupancyDate: new Date(), room: "Select room", extPerson: 0, extBed: 0, discount: 0, gst: 0, finalTariff: 0, roomId: "", extraBedTariff: 0, extraPersonTariff: 0, maxDiscount: 0, tariff: 0, gstPercentage: 0},
        {rowId: 4, occupancyDate: new Date(), room: "Select room", extPerson: 0, extBed: 0, discount: 0, gst: 0, finalTariff: 0, roomId: "", extraBedTariff: 0, extraPersonTariff: 0, maxDiscount: 0, tariff: 0, gstPercentage: 0},
        // {rowId: 5, occupancyDate: new Date(), room: "Select room", extPerson: 0, extBed: 0, discount: 0, gst: 0, finalTariff: 0, roomId: "", extraBedTariff: 0, extraPersonTariff: 0, maxDiscount: 0, tariff: 0, gstPercentage: 0, days: 0},
        // {rowId: 6, occupancyDate: new Date(), room: "Select room", extPerson: 0, extBed: 0, discount: 0, gst: 0, finalTariff: 0, roomId: "", extraBedTariff: 0, extraPersonTariff: 0, maxDiscount: 0, tariff: 0, gstPercentage: 0, days: 0},
        // {rowId: 7, occupancyDate: new Date(), room: "Select room", extPerson: 0, extBed: 0, discount: 0, gst: 0, finalTariff: 0, roomId: "", extraBedTariff: 0, extraPersonTariff: 0, maxDiscount: 0, tariff: 0, gstPercentage: 0, days: 0},
        // {rowId: 8, occupancyDate: new Date(), room: "Select room", extPerson: 0, extBed: 0, discount: 0, gst: 0, finalTariff: 0, roomId: "", extraBedTariff: 0, extraPersonTariff: 0, maxDiscount: 0, tariff: 0, gstPercentage: 0, days: 0},
        // {rowId: 9, occupancyDate: new Date(), room: "Select room", extPerson: 0, extBed: 0, discount: 0, gst: 0, finalTariff: 0, roomId: "", extraBedTariff: 0, extraPersonTariff: 0, maxDiscount: 0, tariff: 0, gstPercentage: 0, days: 0},
        // {rowId: 10, occupancyDate: new Date(), room: "Select room", extPerson: 0, extBed: 0, discount: 0, gst: 0, finalTariff: 0, roomId: "", extraBedTariff: 0, extraPersonTariff: 0, maxDiscount: 0, tariff: 0, gstPercentage: 0, days: 0}
    ]);

    const {data, loading, error, doInsert} = useFetchWithAuth({
        url: `${contextValues.roomBookingAPI}/${hotelId}`
    });

    const handelChangeRoomData = (roomData) => {
        setRoomData(roomData);
    } 

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
            keyInputPhone: "",
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
            keyInputGST: "",
            keyInputCheckInDate: new Date(),
            keyInputCheckInTime: new Date()
        },
        validationSchema: guestRoomSchema,
        validateOnChange,
        onSubmit: async (values) => {
            const payload = {   
                "idDocumentId": values.keyInputIDDocumentId, 
                "idNo": values.keyInputIDNo.toUpperCase(), 
                "name": values.keyInputName.toUpperCase(), 
                "age": parseInt(values.keyInputAge),
                "fatherName": values.keyInputFatherName.toUpperCase(), 
                "address": values.keyInputAddress.toUpperCase(), 
                "city": values.keyInputCity.toUpperCase(), 
                "policeStation": values.keyInputPS.toUpperCase(), 
                "state": values.keyInputState.toUpperCase(),
                "pin": values.keyInputPIN,
                "phone": values.keyInputPhone,
                "mobile": parseInt(values.keyInputMobile),
                "email": values.keyInputEmail.toLowerCase(),
                "guestCount": parseInt(values.keyInputGuestCount),
                "guestMaleCount": parseInt(values.keyInputGuestCountMale),
                "guestFemaleCount": parseInt(values.keyInputGuestCountFemale),
                "dayCount": parseInt(values.keyInputDayCount),
                "bookingAgentId": values.keyInputBookingAgentId,
                "planId": values.keyInputPlanId,
                "corporateName": values.keyInputCorporateName,
                "corporateAddress": values.keyInputCorporateAddress,
                "gstNo": values.keyInputGST,
                "checkInDate": formatMMDDYYYY(values.keyInputCheckInDate),
                "checkInTime": formatHHMM(values.keyInputCheckInTime),
                "roomDetails": roomData
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
                {/* <Accordion defaultActiveKey={['0']} alwaysOpen style={{width: "100%"}}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Guest detail</Accordion.Header>
                        <Accordion.Body> */}

                            {/* Start:: Row */}
                            <div className="row mb-3">

                                {/* Start:: Column document type */}
                                <div className="col-4">
                                    
                                    {/* Label element */}
                                    <label className="form-label" 
                                            htmlFor={"keyInputIDDocumentId"}>Photo ID</label>

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
                                {/* End:: Column document type */}

                                {/* Start:: Column id no. */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputIDNo"}>ID No.</label>

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
                                {/* End:: Column id no. */}

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

                            </div>
                            {/* End:: Row */}

                            {/* Start:: Row */}
                            <div className="row mb-3">

                                {/* Start:: Column age */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputAge"}>Age</label>

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
                                {/* End:: Column age */}

                                {/* Start:: Column fathe'sname */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputFatherName"}>Father's name</label>

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
                                {/* End:: Column father'sname */}

                                {/* Start:: Column address */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputAddress"}>Address</label>

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
                                {/* End:: Column address */}

                            </div>
                            {/* End:: Row */}

                            {/* Start:: Row */}
                            <div className="row mb-3">

                                {/* Start:: Column city */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputCity"}>City</label>

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
                                {/* End:: Column city */}

                                {/* Start:: Column police station */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputPS"}>P.S</label>

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
                                {/* End:: Column police station */}

                                {/* Start:: Column state */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputState"}>State</label>

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
                                {/* End:: Column state */}

                            </div>
                            {/* End:: Row */}

                            {/* Start:: Row */}
                            <div className="row mb-3">

                                {/* Start:: Column pin */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputPIN"}>PIN</label>

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
                                {/* End:: Column pin */}

                                {/* Start:: Column phone */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputPhone"}>Phone</label>

                                    {/* Input element text*/}
                                    <input 
                                        type="text" 
                                        name="keyInputPhone"
                                        placeholder="Phone"
                                        className="form-control"
                                        autoComplete="off"
                                        maxLength={10}
                                        disabled={loading} 
                                        value={values.keyInputPhone} 
                                        onChange={handleChange}/>

                                    {/* Validation message */}
                                    {errors.keyInputPhone && 
                                        touched.keyInputPhone ? 
                                            (<small className="text-danger">{errors.keyInputPhone}</small>) : 
                                                null}
                                
                                </div>
                                {/* End:: Column phone */}

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

                            </div>
                            {/* End:: Row */}

                            {/* Start:: Row */}
                            <div className="row mb-3">

                                {/* Start:: Column email */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputEmail"}>Email</label>

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
                                {/* End:: Column email */}

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

                                {/* Start:: Column no of male guest */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputGuestCountMale"}>Guest count (Male)</label>

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
                                {/* End:: Column no of male guest */}

                            </div>
                            {/* End:: Row */}

                            {/* Start:: Row */}
                            <div className="row mb-3">

                                {/* Start:: Column no of female guest */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputGuestCountFemale"}>Guest count (Female)</label>

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
                                {/* End:: Column no of female guest */}

                                {/* Start:: Column no of day */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputDayCount"}>Day count</label>

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
                                {/* End:: Column no of day */}

                                {/* Start:: Column booking agent */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputBookingAgentId"}>Agent</label>

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
                                {/* End:: Column no of male guest */}

                            </div>
                            {/* End:: Row */}

                            {/* Start:: Row */}
                            <div className="row mb-3">

                                {/* Start:: Column plan */}
                                <div className="col-4">

                                    {/* Label element */}
                                    <label className="form-label" 
                                        htmlFor={"keyInputPlanId"}>Plan</label>

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
                                {/* End:: Column plan */}

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

                            </div>
                            {/* End:: Row */}

                            {/* Start:: Row */}
                            <div className="row mb-3">

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

                        {/* </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Room detail</Accordion.Header>
                        <Accordion.Body> */}

                            {/* Start:: Row */}
                            <div className="row">

                                {/* Start:: Column room detail */}
                                <div className="col-12">
                                    
                                    {/* Label element */}
                                    <label className="form-label">Room detail</label>

                                    <RoomBookingGrid
                                        pState="ADD"
                                        pDefaultRowData={defaultRowData}
                                        pNoOfDay={noOfDay}
                                        onChange={handelChangeRoomData}/>
                                </div>                
                                {/* End:: Column room detail */}

                            </div>
                            {/* End:: Row */}

                        {/* </Accordion.Body>
                    </Accordion.Item>
                </Accordion> */}

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
                    <Modal.Title>Add guest room</Modal.Title>

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