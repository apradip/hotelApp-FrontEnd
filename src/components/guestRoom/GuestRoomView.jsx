import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink } from "react-bootstrap";
import { X } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { formatMMDDYYYY } from "../common/Common";
import GetPhotoIDName from "../common/GetPhotoIDName";
import GetPlanName from "../common/GetPlanName";
import GetBookingAgentName from "../common/GetBookingAgentName";
import RoomBookingGrid from "./RoomBookingGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({ pData, onClosed }) => {
    const [defaultRowData, setDefaultRowData] = useState([]);

    useEffect(() => {
        pData.roomDetails.forEach(element => {
            const rowData = {
                            rowId: defaultRowData.length + 1, 
                            occupancyDate: element.occupancyDate,
                            room: element.roomNo, 
                            extPerson: element.extraPersonCount, 
                            extBed: element.extraBedCount, 
                            discount: element.discount, 
                            gst: element.gstAmount, 
                            finalTariff: element.tariff, 
                            roomId: element.roomId, 
                            extraBedTariff: element.extraBedTariff, 
                            extraPersonTariff: element.extraPersonTariff, 
                            maxDiscount: element.maxDiscount, 
                            tariff: element.price, 
                            gstPercentage: element.gstPercentage
                        };
    
            defaultRowData.push(rowData);
        });

        setDefaultRowData(defaultRowData);
    }, [pData]);

    // Start:: Html
    return (
        <form>

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">   
                        <Accordion.Header>Guest detail</Accordion.Header>
                        <Accordion.Body> */}

                            <div>
                                {/* Start:: Row */}
                                <div className="row mb-3">

                                    {/* Start:: Column document type */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Photo ID :</label>
                                        <GetPhotoIDName pId={pData.idDocumentId} />
                                    </div>
                                    {/* End:: Column document type */}

                                    {/* Start:: Column id no. */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">ID No. :</label>
                                        <label className="form-label">{pData.idNo}</label>
                                    </div>
                                    {/* End:: Column id no. */}

                                    {/* Start:: Column name */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Name :</label>
                                        <label className="form-label">{pData.name}</label>
                                    </div>
                                    {/* End:: Column name */}

                                </div>
                                {/* End:: Row */}

                                {/* Start:: Row */}
                                <div className="row mb-3">

                                    {/* Start:: Column age */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Age :</label>
                                        <label className="form-label">{pData.age}</label>
                                    </div>
                                    {/* End:: Column age */}

                                    {/* Start:: Column fathe'sname */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Father's name :</label>
                                        <label className="form-label">{pData.fatherName}</label>
                                    </div>
                                    {/* End:: Column father'sname */}

                                    {/* Start:: Column address */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Address :</label>
                                        <label className="form-label">{pData.address}</label>
                                    </div>
                                    {/* End:: Column address */}

                                </div>
                                {/* End:: Row */}

                                {/* Start:: Row */}
                                <div className="row mb-3">

                                    {/* Start:: Column city */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">City :</label>
                                        <label className="form-label">{pData.city}</label>
                                    </div>
                                    {/* End:: Column city */}

                                    {/* Start:: Column police station */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">P.S :</label>
                                        <label className="form-label">{pData.policeStation}</label>
                                    </div>
                                    {/* End:: Column police station */}

                                    {/* Start:: Column state */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">State :</label>
                                        <label className="form-label">{pData.state}</label>
                                    </div>
                                    {/* End:: Column state */}

                                </div>
                                {/* End:: Row */}

                                {/* Start:: Row */}
                                <div className="row mb-3">

                                    {/* Start:: Column pin */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">PIN :</label>
                                        <label className="form-label">{pData.pin}</label>
                                    </div>
                                    {/* End:: Column pin */}

                                    {/* Start:: Column phone */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Phone :</label>
                                        <label className="form-label">{pData.phone}</label>
                                    </div>
                                    {/* End:: Column phone */}

                                    {/* Start:: Column mobile */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Mobile :</label>
                                        <label className="form-label">{pData.mobile}</label>
                                    </div>
                                    {/* End:: Column mobile */}

                                </div>
                                {/* End:: Row */}

                                {/* Start:: Row */}
                                <div className="row mb-3">

                                    {/* Start:: Column email */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Email :</label>
                                        <label className="form-label">{pData.email}</label>
                                    </div>
                                    {/* End:: Column email */}

                                    {/* Start:: Column no of guest */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Guest count :</label>
                                        <label className="form-label">{pData.guestCount}</label>
                                    </div>
                                    {/* End:: Column no of guest */}

                                    {/* Start:: Column no of male guest */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Guest count (Male) :</label>
                                        <label className="form-label">{pData.guestMaleCount}</label>
                                    </div>
                                    {/* End:: Column no of male guest */}

                                </div>
                                {/* End:: Row */}

                                {/* Start:: Row */}
                                <div className="row mb-3">

                                    {/* Start:: Column no of female guest */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Guest count (Female) :</label>
                                        <label className="form-label">{pData.guestFemaleCount}</label>
                                    </div>
                                    {/* End:: Column no of female guest */}

                                    {/* Start:: Column no of day */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Day count :</label>
                                        <label className="form-label">{pData.dayCount}</label>
                                    </div>
                                    {/* End:: Column no of day */}

                                    {/* Start:: Column booking agent */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Agent :</label>
                                        <GetBookingAgentName pId={pData.bookingAgentId} />
                                    </div>
                                    {/* End:: Column no of male guest */}

                                </div>
                                {/* End:: Row */}

                                {/* Start:: Row */}
                                <div className="row mb-3">

                                    {/* Start:: Column plan */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Plan :</label>
                                        <GetPlanName pId={pData.planId} />
                                    </div>
                                    {/* End:: Column plan */}

                                    {/* Start:: Column corporate name */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Corporate name :</label>
                                        <label className="form-label">{pData.corporateName}</label>
                                    </div>
                                    {/* End:: Column corporate name */}

                                    {/* Start:: Column coroprate address */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Corporate address :</label>
                                        <label className="form-label">{pData.corporateAddress}</label>
                                    </div>
                                    {/* End:: Column coroprate address */}

                                </div>
                                {/* End:: Row */}

                                {/* Start:: Row */}
                                <div className="row mb-3">

                                    {/* Start:: Column gst no */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">GST No. :</label>
                                        <label className="form-label">{pData.gstNo}</label>
                                    </div>
                                    {/* End:: Column gst no */}

                                    {/* Start:: Column check in date */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Check in date :</label>
                                        <label className="form-label">{formatMMDDYYYY(pData.checkInDate)}</label>
                                    </div>
                                    {/* End:: Column check in date */}

                                    {/* Start:: Column check in time */}
                                    <div className="col-4">
                                        <label className="form-label mr-2">Check in time :</label>
                                        <label className="form-label">{pData.checkInTime}</label>
                                    </div>
                                    {/* End:: Column check in time */}

                                </div>
                                {/* End:: Row */}
                            </div>

                        {/* </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Room detail</Accordion.Header>
                        <Accordion.Body> */}

                            {/* Start:: Row */}
                            <div className="row mb-3">

                                <div className="col-12">
                                    {/* Label element */}
                                    <label className="form-label">Room details :</label>
                                </div>                

                                {/* Start:: Column room detail */}
                                <div className="col-12 ag-theme-alpine grid">
                                    <RoomBookingGrid
                                        pState="VIEW"
                                        pDefaultRowData={defaultRowData}
                                        pNoOfDay={pData.dayCount}
                                        onChange={null} />
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
                    autoFocus
                    onClick={onClosed} >
                    Close
                </button>
                {/* End:: Close button */}

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
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestRoomView = forwardRef(( props, ref ) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.roomBookingAPI}/${hotelId}/${props.pId}`
    });

    // Start :: Show modal 
    const handleShowModal = () => {
        setShowModal(true);
    };
    // End :: Show modal 

    // Start :: Close modal 
    const handleCloseModal = () => {
        setShowModal(false);
    };
    // End :: Close modal 

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
              console.log('Error occured when fetching data');
            }
          })();
    }, [showModal]);         // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    // Start:: Html
    return (
        <>
            {/* Start:: View modal */}
            {data &&
                <Modal size="lg"
                    show={showModal}>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>View guest room</Modal.Title>
                        
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
                        pData={data}
                        onClosed={handleCloseModal} />
                    {/* End:: Form component */}
                    
                </Modal> }
            {/* End:: View modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestRoomView;