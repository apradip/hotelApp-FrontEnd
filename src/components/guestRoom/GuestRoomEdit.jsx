import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { guestRoomSchema } from "../../schemas";
import IDDocumentSelect from "../common/IDDocumentSelect";
import BookingAgentSelect from "../common/BookingAgentSelect";
import PlanSelect from "../common/PlanSelect";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pGuestId, pIDDocumentId, pIDNo, pName, 
                pAge, pFatherName, pAddress, 
                pCity, pPoliceStation, pState, 
                pPin, pMobile, pEmail, 
                pGuestCount, pGuestMaleCount, pGuestFemaleCount, 
                pDayCount, pBookingAgentId, pPlanId, 
                pCorporateName, pCorporateAddress, pGST,
                pShow, 
                onSubmited, onClosed }) => {

    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doUpdate} = useFetchWithAuth({
        url: `${contextValues.guestAPI}/${hotelId}/${pGuestId}`
    });

    // Start:: Form validate and save data
    const {values, errors, touched, setFieldValue, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputIDDocumentId: pIDDocumentId,
            keyInputIDNo: pIDNo,
            keyInputName: pName,
            keyInputAge: pAge,
            keyInputFatherName: pFatherName,
            keyInputAddress: pAddress,
            keyInputCity: pCity,
            keyInputPS: pPoliceStation,
            keyInputState: pState,
            keyInputPIN: pPin,
            keyInputMobile: pMobile,
            keyInputEmail: pEmail,
            keyInputGuestCount: pGuestCount,
            keyInputGuestCountMale: pGuestMaleCount,
            keyInputGuestCountFemale: pGuestFemaleCount,
            keyInputDayCount: pDayCount,
            keyInputBookingAgentId: pBookingAgentId,
            keyInputPlanId: pPlanId,
            keyInputCorporateName: pCorporateName,
            keyInputCorporateAddress: pCorporateAddress,
            keyInputGST: pGST
        },
        validationSchema: guestRoomSchema,
        validateOnChange,
        onSubmit: async (values) => {
            try {
                const payload = {   
                    option: "R",
                    idDocumentId: values.keyInputIDDocumentId, 
                    idNo: values.keyInputIDNo.toUpperCase(), 
                    name: values.keyInputName.toUpperCase(), 
                    age: parseInt(values.keyInputAge),
                    fatherName: values.keyInputFatherName.toUpperCase(), 
                    address: values.keyInputAddress.toUpperCase(), 
                    city: values.keyInputCity.toUpperCase(), 
                    policeStation: values.keyInputPS.toUpperCase(), 
                    state: values.keyInputState.toUpperCase(),
                    pin: values.keyInputPIN,
                    mobile: parseInt(values.keyInputMobile),
                    email: values.keyInputEmail.toLowerCase(),
                    guestCount: parseInt(values.keyInputGuestCount),
                    guestMaleCount: parseInt(values.keyInputGuestCountMale),
                    guestFemaleCount: parseInt(values.keyInputGuestCountFemale),
                    dayCount: parseInt(values.keyInputDayCount),
                    bookingAgentId: values.keyInputBookingAgentId,
                    planId: values.keyInputPlanId,
                    corporateName: values.keyInputCorporateName,
                    corporateAddress: values.keyInputCorporateAddress,
                    gstNo: values.keyInputGST
                };

                await doUpdate(payload);
        
                if (error === null) {
                    resetForm();
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
        <Modal size="lg"
            show={pShow}>

            {/* Start:: Modal header */}
            <Modal.Header>
                {/* Header text */}
                <Modal.Title>Edit</Modal.Title>
                
                {/* Close button */}
                <NavLink 
                    className = "nav-icon" href = "#" 
                    onClick = {handleClose} >
                    <i className = "align-middle"><X/></i>
                </NavLink>
            </Modal.Header>
            {/* End:: Modal header */}

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column document type */}
                    <Col sx={12} md={4} className="mb-3">
                        
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
                    </Col>
                    {/* End:: Column document type */}

                    {/* Start:: Column id no. */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column id no. */}

                    {/* Start:: Column name */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column name */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column age */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column age */}

                    {/* Start:: Column fathe'sname */}
                    <Col sx={12} md={4} className="mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor={"keyInputFatherName"}>Guardian's name</label>

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
                    
                    </Col>
                    {/* End:: Column father'sname */}

                    {/* Start:: Column address */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column address */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column city */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column city */}

                    {/* Start:: Column police station */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column police station */}

                    {/* Start:: Column state */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column state */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column pin */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column pin */}

                    {/* Start:: Column mobile */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column mobile */}

                    {/* Start:: Column email */}
                    <Col sx = {12} md = {4} className = "mb-3">

                        {/* Label element */}
                        <label className = "col-12 form-label" 
                            htmlFor = {"keyInputEmail"}>Email</label>

                        <div className = "col-12">
                            {/* Input element text*/}
                            <input 
                                type = "text" 
                                name = "keyInputEmail"
                                placeholder = "Email"
                                className = "form-control"
                                autoComplete = "off"
                                maxLength = {100}
                                disabled = {loading} 
                                value = {values.keyInputEmail} 
                                onChange = {handleChange} />

                            {/* Validation message */}
                            {errors.keyInputEmail && 
                                touched.keyInputEmail ? 
                                    (<small className = "text-danger">{errors.keyInputEmail}</small>) : 
                                        null}
                        </div>
                    </Col>
                    {/* End:: Column email */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column no of guest */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column no of guest */}

                    {/* Start:: Column no of male guest */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column no of male guest */}

                    {/* Start:: Column no of female guest */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column no of female guest */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column no of day */}
                    <Col sx={12} md={4} className="mb-3">

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
                            onChange={handleChange} />

                        {/* Validation message */}
                        {errors.keyInputDayCount && 
                            touched.keyInputDayCount ? 
                                (<small className="text-danger">{errors.keyInputDayCount}</small>) : 
                                    null}
                    
                    </Col>
                    {/* End:: Column no of day */}

                    {/* Start:: Column booking agent */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column no of male guest */}

                    {/* Start:: Column plan */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column plan */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column corporate name */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column corporate name */}

                    {/* Start:: Column coroprate address */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column coroprate address */}

                    {/* Start:: Column gst no */}
                    <Col sx={12} md={4} className="mb-3">

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
                    
                    </Col>
                    {/* End:: Column gst no */}

                </Row>
                {/* End:: Row */}

            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>

                {/* Start:: Close button */}
                <button
                    type="button"
                    className="btn btn-danger"
                    disabled = {loading}
                    onClick = {handleClose}>
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

        </Modal>
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
const GuestRoomEdit = forwardRef(( props, ref ) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestAPI}/${hotelId}/${props.pGuestId}`
    });

    // Start:: Show modal
    const handleShowModal = async () => {
        try {
            setShowModal(true);
            await doFetch();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show modal

    // Start:: Close modal
    const handleCloseModal = () => {
        try {
            setShowModal(false);
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Close modal

    // Start:: Save
    const handleSave = () => { 
        try {
            setShowModal(false);
            props.onSaved();
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

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {if (event.key === "Escape") handleCloseModal()});
        return () => {document.removeEventListener("keydown", handleCloseModal)};
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);

    // Start:: Html
    return (
        <>
            {/* Start:: Edit modal */}
            { data &&
                <Form 
                    pGuestId = {data._id}
                    pIDDocumentId = {data.idDocumentId}
                    pIDNo = {data.idNo}
                    pName = {data.name}
                    pAge = {data.age}
                    pFatherName = {data.fatherName}
                    pAddress = {data.address}
                    pCity = {data.city}
                    pPoliceStation = {data.policeStation}
                    pState = {data.state}
                    pPin = {data.pin}
                    pMobile = {data.mobile}
                    pEmail = {data.email}
                    pGuestCount = {data.guestCount}
                    pGuestMaleCount = {data.guestMaleCount}
                    pGuestFemaleCount = {data.guestFemaleCount}
                    pDayCount = {data.dayCount}
                    pBookingAgentId = {data.bookingAgentId}
                    pPlanId = {data.planId}
                    pCorporateName = {data.corporateName}
                    pCorporateAddress = {data.corporateAddress}
                    pGST = {data.gstNo}
                    pShow = {showModal}
                    onSubmited = {handleSave} 
                    onClosed = {handleCloseModal} />
                }
            {/* End:: Edit modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestRoomEdit;