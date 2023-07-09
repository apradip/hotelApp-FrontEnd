import React, {useContext, useEffect, useState, forwardRef, useImperativeHandle} from "react";
import {Modal, NavLink} from "react-bootstrap";

import {HotelId} from "../../App";
import {useStateContext} from "../../contexts/ContextProvider";
import BookingGrid from "./RoomBookingGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";

import {subStr} from "../common/Common";
import {X} from "react-feather";


// Start:: form
const Form = ({pName, pMobile, pGuestCount, 
                pCorporateName, pCorporateAddress, pGstNo, 
                pDayCount, pBookingAgent, pPlan, 
                pData, onClosed}) => {

    // Start:: Html
    return (
        <form>

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div>

                    {/* Start:: Row */}
                    <div className="row">

                        {/* Start:: Column name / company */}
                        {pCorporateName ? 
                            <div className="col-sx-12 col-md-5 mb-3">
                                <label className="col-12 form-label"><b>Company</b></label>
                                <label className="col-12 text-mutedl">{subStr(pCorporateName, 30)}</label>
                            </div>
                        :
                            <div className="col-sx-12 col-md-5 mb-3">
                                <label className="col-12 form-label"><b>Name</b></label>
                                <label className="col-12 text-muted">{subStr(pName, 30)}</label>
                            </div>
                        }
                        {/* End:: Column name / company */}


                        {/* Start:: Column mobile no / company address */}
                        {pCorporateName ? 
                            <div className="col-sx-12 col-md-5 mb-3">
                                <label className="col-12 form-label"><b>Address</b></label>
                                <label className="col-12 text-muted">{subStr(pCorporateAddress, 30)}</label>
                            </div>
                        :
                            <div className="col-sx-12 col-md-5 mb-3">
                                <label className="col-12 form-label"><b>Mobile no.</b></label>
                                <label className="col-12 text-muted">{pMobile}</label>
                            </div>
                        }
                        {/* End:: Column mobile no / company address */}

                        {/* Start:: Column guest count */}
                        <div className="col-sx-12 col-md-2 mb-3">
                            <label className="col-12 form-label"><b>Guest count</b></label>
                            <label className="col-12 text-muted">{pGuestCount} No.</label>
                        </div>
                        {/* End:: Column guest count */}

                    </div>
                    {/* End:: Row */}

                    {/* Start:: Row */}
                    <div className="row">

                        {/* Start:: Column no of day */}
                        <div className="col-sx-12 col-md-5 mb-3">
                            <label className="col-12 form-label"><b>Day count</b></label>
                            <label className="col-12 text-muted">{pDayCount}</label>
                        </div>
                        {/* End:: Column no of day */}

                        {/* Start:: Column plan */}
                        <div className="col-sx-12 col-md-5 mb-3">
                            <label className="col-12 form-label"><b>Plan</b></label>
                            <label className="col-12 text-muted">{pPlan}</label>
                        </div>
                        {/* End:: Column plan */}

                        {/* Start:: Column address */}
                        <div className="col-sx-12 col-md-2 mb-3">
                            <label className="col-12 form-label"><b>Agent</b></label>
                            <label className="col-12 text-muted">{pBookingAgent}</label>
                        </div>
                        {/* End:: Column address */}

                    </div>
                    {/* End:: Row */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    <div className="col-12">
                        {/* Label element */}
                        <label className="col-12 form-label"><b>Rooms</b></label>

                        {/* Start:: Column room detail */}
                        <BookingGrid
                            pState="VIEW"
                            pData={pData}
                            onChange={null}/>
                        {/* End:: Column room detail */}
                    </div>                

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
const GuestRoomView = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestRoomAPI}/${hotelId}/${props.pGuestId}`,
        params: {
            option: "A"
        }
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
                        <Modal.Title>Room list</Modal.Title>
                        
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
                        pName={props.pName}
                        pMobile={props.pMobile}
                        pGuestCount={props.pGuestCount}
                        pCorporateName={props.pCorporateName}
                        pCorporateAddress={props.pCorporateAddress}
                        pGstNo={props.pGstNo}
                        pDayCount={props.pDayCount}
                        pBookingAgent={props.pBookingAgent}
                        pPlan={props.pPlan}
                        pData={data}
                        onClosed={handleCloseModal}/>
                    {/* End:: Form component */}
                    
                </Modal>}
            {/* End:: View modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestRoomView;