import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink, Row, Col } from "react-bootstrap";
import { X } from "react-feather";
import { subStr, properCase } from "../common/Common";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import BookingGrid from "./RoomBookingGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pName, pMobile, pGuestCount, 
                pCorporateName, pCorporateAddress, pGstNo, 
                pDayCount, pBookingAgent, pPlan, 
                pData, 
                pShow, 
                onClosed}) => {

    // Start:: Html
    return (
        <Modal size="lg"
            show={pShow}>

            {/* Start:: Modal header */}
            <Modal.Header>
                {/* Header text */}
                <Modal.Title>All rooms</Modal.Title>
                
                {/* Close button */}
                <NavLink 
                    className="nav-icon" href="#" 
                    onClick={onClosed}>
                    <i className="align-middle"><X/></i>
                </NavLink>
            </Modal.Header>
            {/* End:: Modal header */}

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column name / company */}
                    {pCorporateName ? 
                        <Col sx = {12} md = {5} className = "mb-3">
                            <label className="col-12 form-label"><b>Company</b></label>
                            <label className="col-12 text-mutedl">{properCase(subStr(pCorporateName, 30))}</label>
                        </Col>
                    :
                        <Col sx = {12} md = {5} className = "mb-3">
                            <label className="col-12 form-label"><b>Name</b></label>
                            <label className="col-12 text-muted">{properCase(subStr(pName, 30))}</label>
                        </Col>
                    }
                    {/* End:: Column name / company */}


                    {/* Start:: Column mobile no / company address */}
                    {pCorporateName ? 
                        <Col sx = {12} md = {5} className = "mb-3">
                            <label className="col-12 form-label"><b>Address</b></label>
                            <label className="col-12 text-muted">{properCase(subStr(pCorporateAddress, 30))}</label>
                        </Col>
                    :
                        <Col sx = {12} md = {5} className = "mb-3">
                            <label className="col-12 form-label"><b>Mobile no.</b></label>
                            <label className="col-12 text-muted">{pMobile}</label>
                        </Col>
                    }
                    {/* End:: Column mobile no / company address */}

                    {/* Start:: Column guest count */}
                    <Col sx = {12} md = {2} className = "mb-3">
                        <label className="col-12 form-label"><b>Guest count</b></label>
                        <label className="col-12 text-muted">{pGuestCount} No.</label>
                    </Col>
                    {/* End:: Column guest count */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column no of day */}
                    <Col sx = {12} md = {5} className = "mb-3">
                        <label className="col-12 form-label"><b>Day count</b></label>
                        <label className="col-12 text-muted">{pDayCount}</label>
                    </Col>
                    {/* End:: Column no of day */}

                    {/* Start:: Column plan */}
                    <Col sx = {12} md = {5} className = "mb-3">
                        <label className="col-12 form-label"><b>Plan</b></label>
                        <label className="col-12 text-muted">{pPlan}</label>
                    </Col>
                    {/* End:: Column plan */}

                    {/* Start:: Column address */}
                    <Col sx = {12} md = {2} className = "mb-3">
                        <label className="col-12 form-label"><b>Agent</b></label>
                        <label className="col-12 text-muted">{pBookingAgent}</label>
                    </Col>
                    {/* End:: Column address */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    <Col sx = {12} md = {12}>
                        {/* Label element */}
                        <label className="col-12 form-label"><b>Rooms</b></label>

                        {/* Start:: Column room detail */}
                        <BookingGrid
                            pState = "VIEW"
                            pData = {pData}
                            onChange = {null}/>
                        {/* End:: Column room detail */}
                    </Col>                

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
                    autoFocus
                    onClick={onClosed} >
                    Close
                </button>
                {/* End:: Close button */}

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
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestRoomView = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestRoomAPI}/${hotelId}/${props.pGuestId}`,
        params: {option: "A"}
    });

    // Start :: Show modal 
    const handleShowModal = async () => {
        try {
            setShowModal(true);
            await doFetch();
        } catch (err) {
            console.log(err);
        }
    };
    // End :: Show modal 

    // Start :: Close modal 
    const handleCloseModal = () => {
        try {
            setShowModal(false);
        } catch (err) {
            console.log(err);
        }
    };
    // End :: Close modal 

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal};
    });
    // End:: forward reff show modal function

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {if (event.key === "Escape") handleCloseModal();});
        return () => {document.removeEventListener("keydown", handleCloseModal);}
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    

    // Start:: Html
    return (
        <>
            {/* Start:: View modal */}
            {data &&
                <Form 
                    pName = {data.name}
                    pMobile = {data.mobile}
                    pGuestCount = {data.guestCount}
                    pCorporateName = {data.corporateName}
                    pCorporateAddress = {data.corporateAddress}
                    pGstNo = {data.gstNo}
                    pDayCount = {data.dayCount}
                    pBookingAgent = {data.bookingAgent}
                    pPlan = {data.plan}
                    pData = {data.rooms}
                    pShow = {showModal}
                    onClosed = {handleCloseModal} />}
            {/* End:: View modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestRoomView;