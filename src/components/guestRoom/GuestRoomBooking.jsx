import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X } from "react-feather";
import { subStr, properCase } from "../common/Common";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import BookingGrid from "./RoomBookingGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pGuestId, pName, pMobile, pGuestCount, 
                pDayCount, pPlan, pBookingAgent, 
                pCorporateName, pCorporateAddress, pTransactionId, 
                pData, 
                pShow, 
                onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [bookingData, setBookingData] = useState(null);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doInsert} = useFetchWithAuth({
        url: `${contextValues.guestRoomAPI}/${hotelId}/${pGuestId}/${pTransactionId}`
    });

    const handelChangeData = (gridData) => {
        let dataList = [];

        try {
            for(const g of gridData) {
                let found = false;
                let operation = "A";

                if (g.id !== "") {
                    for(const d of pData) {
                        if (g.id === d.id) {
                            found = true;
                            operation = "M";

                            dataList.push({
                                id: g.id, 
                                extraPerson: g.extraPerson, 
                                extraBed: g.extraBed, 
                                discount: g.discount,
                                occupancyDate: g.occupancyDate,
                                operation: operation});
                        }
                    }

                    if (!found) {
                        dataList.push({
                            id: g.id, 
                            extraPerson: g.extraPerson, 
                            extraBed: g.extraBed, 
                            discount: g.discount,
                            occupancyDate: g.occupancyDate,
                            operation: operation});
                    }
                }
            }

            for(const d of pData) {
                let found = false;

                if (d.id !== "") {
                    for (const g of gridData) {
                        if (d.id === g.id) {
                            found = true;
                        }
                    }

                    if (!found) {
                        dataList.push({
                            id: d.id, 
                            extraPerson: d.extraPerson, 
                            extraBed: d.extraBed, 
                            discount: d.discount,
                            occupancyDate: d.occupancyDate,
                            operation: "R"});
                    }
                }
            }

            setBookingData(dataList);
        } catch (err) {
            console.log(err);
        }
    }; 

    // Start:: Form validate and save data
    const {handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputRooms: bookingData
        },
        // validationSchema: guestRoomTransactionSchema,
        validateOnChange,
        onSubmit: async () => {
            try {
                bookingData && await doInsert({bookings: bookingData});
        
                if (error === null) {
                    resetForm();
                    onSubmited();
                } else {
                    toast.error(error);
                }
            } catch (err) {
                console.log(err);
                toast.error(err);
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
            show = {pShow}>

            {/* Start:: Modal header */}
            <Modal.Header>
                {/* Header text */}
                <Modal.Title>Booking</Modal.Title>
                
                {/* Close button */}
                <NavLink 
                    className="nav-icon" href="#" 
                    onClick={onClosed}>
                    <i className = "align-middle"><X/></i>
                </NavLink>
            </Modal.Header>
            {/* End:: Modal header */}

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column name / company */}
                    {pCorporateName ? 
                        <Col sx = {12} md = {5} className="mb-3">
                            <label className="col-12 form-label"><b>Company</b></label>
                            <label className="col-12 text-mutedl">{properCase(subStr(pCorporateName, 30))}</label>
                        </Col>
                    :
                        <Col sx = {12} md = {5} className="mb-3">
                            <label className="col-12 form-label"><b>Name</b></label>
                            <label className="col-12 text-muted">{properCase(subStr(pName, 30))}</label>
                        </Col>
                    }
                    {/* End:: Column name / company */}

                    {/* Start:: Column mobile no / company address */}
                    {pCorporateName ? 
                        <Col sx = {12} md = {5} className="mb-3">
                            <label className="col-12 form-label"><b>Address</b></label>
                            <label className="col-12 text-muted">{properCase(subStr(pCorporateAddress, 30))}</label>
                        </Col>
                    :
                        <Col sx = {12} md = {5} className="mb-3">
                            <label className="col-12 form-label"><b>Mobile no.</b></label>
                            <label className="col-12 text-muted">{pMobile}</label>
                        </Col>
                    }
                    {/* End:: Column mobile no / company address */}

                    {/* Start:: Column guest count */}
                    <Col sx = {12} md = {2} className="mb-3">
                        <label className="col-12 form-label"><b>Guest count</b></label>
                        <label className="col-12 text-muted">{pGuestCount} No.</label>
                    </Col>
                    {/* End:: Column guest count */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column plan */}
                    <Col sx = {12} md = {5} className="mb-3">
                        <label className="col-12 form-label"><b>Plan</b></label>
                        <label className="col-12 text-muted">{pPlan}</label>
                    </Col>
                    {/* End:: Column plan */}

                    {/* Start:: Column agent */}
                    <Col sx = {12} md = {5} className="mb-3">
                        <label className="col-12 form-label"><b>Agent</b></label>
                        <label className="col-12 text-muted">{pBookingAgent}</label>
                    </Col>
                    {/* End:: Column agent */}

                    {/* Start:: Column day count */}
                    <Col sx = {12} md = {2} className="mb-3">
                        <label className="col-12 form-label"><b>Day count</b></label>
                        <label className="col-12 text-muted">{pDayCount} day(s)</label>
                    </Col>
                    {/* End:: Column day count */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column service detail */}
                    <Col sx = {12} md = {12}>

                        {/* Label element */}
                        <label className="col-12 form-label"><b>Rooms</b></label>

                        {/* Start:: Column service detail */}
                        <BookingGrid
                            pState = "MOD"
                            pData = {pData}
                            onChange = {handelChangeData} />
                        {/* End:: Column service detail */}

                    </Col>                
                    {/* End:: Column service detail */}

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
        </Modal>
    );
    // End:: Html

}
// End:: form


// Start:: Component
// props parameters
// pGuestId
// pName
// pMobile
// pGuestCount
// pCorporateName
// pCorporateAddress
// pGstNo
// onSaved()
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestRoomBooking = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestRoomAPI}/${hotelId}/${props.pGuestId}`,
        params: {option: "N"}
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
        document.addEventListener("keydown", (event) => {if (event.key === "Escape") handleCloseModal();});
        return () => {document.removeEventListener("keydown", handleCloseModal);};
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    

    // Start:: Html
    return (
        <>
            {/* Start:: Edit modal */}
            {data &&
                <Form 
                    pGuestId = {props.pGuestId}
                    pName = {data.name}
                    pMobile = {data.mobile}
                    pGuestCount = {data.guestCount}
                    pCorporateName = {data.corporateName}
                    pCorporateAddress = {data.corporateAddress}
                    pDayCount = {data.dayCount}
                    pPlan = {data.plan}
                    pBookingAgent = {data.bookingAgent}
                    pTransactionId = {data.transactionId}
                    pData = {data.rooms}
                    pShow = {showModal}
                    onSubmited = {handleSave} 
                    onClosed = {handleCloseModal} />}
            {/* End:: Edit modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestRoomBooking;