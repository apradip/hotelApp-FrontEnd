import React, {useContext, useEffect, useState, forwardRef, useImperativeHandle} from "react";
import {Modal, NavLink} from "react-bootstrap";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {X} from "react-feather";
import {subStr} from "../common/Common";

import {HotelId} from "../../App";
import {useStateContext} from "../../contexts/ContextProvider";
import BookingGrid from "./RoomBookingGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pGuestId, pTransactionId, pName, pMobile, pGuestCount, 
                pDayCount, pPlan, pBookingAgent, 
                pCorporateName, pCorporateAddress, pData, 
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
    }; 

    // Start:: Form validate and save data
    const {handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputRooms: bookingData
        },
        // validationSchema: guestRoomTransactionSchema,
        validateOnChange,
        onSubmit: async () => {
            bookingData && await doInsert({bookings: bookingData});
        
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

                    {/* Start:: Column day count */}
                    <div className="col-sx-12 col-md-5 mb-3">
                        <label className="col-12 form-label"><b>Day count</b></label>
                        <label className="col-12 text-muted">{pDayCount} day(s)</label>
                    </div>
                    {/* End:: Column day count */}

                    {/* Start:: Column plan */}
                    <div className="col-sx-12 col-md-5 mb-3">
                        <label className="col-12 form-label"><b>Plan</b></label>
                        <label className="col-12 text-muted">{pPlan}</label>
                    </div>
                    {/* End:: Column plan */}

                    {/* Start:: Column agent */}
                    <div className="col-sx-12 col-md-2 mb-3">
                        <label className="col-12 form-label"><b>Agent</b></label>
                        <label className="col-12 text-muted">{pBookingAgent}</label>
                    </div>
                    {/* End:: Column agent */}


                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column service detail */}
                    <div className="col-12">

                        {/* Label element */}
                        <label className="col-12 form-label"><b>Rooms</b></label>

                        {/* Start:: Column service detail */}
                        <BookingGrid
                            pState="MOD"
                            pData={pData}
                            onChange={handelChangeData}/>
                        {/* End:: Column service detail */}

                    </div>                
                    {/* End:: Column service detail */}

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
        params: {
            option: "N"
        }
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
        props.onSaved();
    };
    // End:: Save

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal};
    });
    // End:: forward reff show modal function

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") handleCloseModal();
        })

        return () => {document.removeEventListener("keydown", handleCloseModal);}
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    
    
    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            showModal && await doFetch();
          })();
    }, [showModal]);        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    // Start:: Html
    return (
        <>
            {/* Start:: Edit modal */}
            {data &&
                <Modal size="lg"
                    show={showModal}>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Booking</Modal.Title>
                        
                        {/* Close button */}
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick={handleCloseModal}>
                            <i className = "align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    {/* End:: Modal header */}

                    {/* Start:: Form component */}
                    <Form 
                        pGuestId={props.pGuestId}
                        pTransactionId={props.pTransactionId}
                        pName={props.pName}
                        pMobile={props.pMobile}
                        pGuestCount={props.pGuestCount}
                        pCorporateName={props.pCorporateName}
                        pCorporateAddress={props.pCorporateAddress}
                        pDayCount={props.pDayCount}
                        pPlan={props.pPlan}
                        pBookingAgent={props.pBookingAgent}
                        pData={data}
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


export default GuestRoomBooking;