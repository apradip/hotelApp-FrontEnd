import React, {useContext, useEffect, useState, forwardRef, useImperativeHandle} from "react";
import {Modal, NavLink} from "react-bootstrap";
import {toast} from "react-toastify";
import {X} from "react-feather";
import {formatINR} from "../common/Common";

import {HotelId} from "../../App";
import {useStateContext} from "../../contexts/ContextProvider";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pName, pTariff, pDiscount, pBed, pPerson, onClosed}) => {
    // Start:: Html
    return (
        <form>
            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column name */}
                    <div className="col-12 mb-3">
                        <label className="col-12 text-left form-label"><b>Name</b></label>
                        <label className="col-12 text-left text-muted">{pName}</label>
                    </div>
                    {/* Start:: Column name */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column tariff */}
                    <div className="col-sx-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-3">
                        <label className="col-12 text-left form-label"><b>Tariff</b></label>
                        <label className="col-12 text-left text-muted">{formatINR(pTariff)}</label>
                    </div>
                    {/* End:: Column tariff */}

                    {/* Start:: Column max. discount */}
                    <div className="col-sx-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-3">
                        <label className="col-12 text-right form-label"><b>Maximum discount</b></label>
                        <label className="col-12 text-right text-muted">{formatINR(pDiscount)}</label>
                    </div>
                    {/* End:: Column max. discount */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column ext. bed tariff */}
                    <div className="col-sx-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-3">
                        <label className="col-12 text-left form-label"><b>Extra bed tariff</b></label>
                        <label className="col-12 text-muted">{formatINR(pBed)}</label>
                    </div>
                    {/* End:: Column ext. bed tariff */}

                    {/* Start:: Column ext. person tariff */}
                    <div className="col-sx-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-3">
                        <label className="col-12 text-right form-label"><b>Extra person tariff</b></label>
                        <label className="col-12 text-right text-muted">{formatINR(pPerson)}</label>
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
                    autoFocus
                    onClick={onClosed}>
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
const RoomCategoryView = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.roomCategoryAPI}/${hotelId}/${props.pId}`
    });

    // Start :: Show modal 
    const handleShowModal = () => {
        setShowModal(true);
    };
    // End :: Show modal 

    // Start :: Close modal 
    const handleCloseModal = () => {
        setShowModal(false);
        props.onClosed();
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
    }, [showModal, props.pId]);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);
    
    // Start:: Html
    return (
        <>
            {/* Start:: View modal */}
            {data &&
                <Modal 
                    size="sm"
                    show={showModal}>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Detail</Modal.Title>
                        
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
                        pName={data.name}
                        pTariff={parseFloat(data.tariff, 10).toFixed(2)}
                        pDiscount={parseFloat(data.maxDiscount, 10).toFixed(2)}
                        pBed={parseFloat(data.extraBedTariff, 10).toFixed(2)}
                        pPerson={parseFloat(data.extraPersonTariff, 10).toFixed(2)}
                        onClosed={handleCloseModal}/>
                    {/* End:: Form component */}
                    
                </Modal>}
            {/* End:: View modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default RoomCategoryView;