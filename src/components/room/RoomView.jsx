import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink } from "react-bootstrap";
import { toast } from "react-toastify";
import { X } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetchWithAuth from "../common/useFetchWithAuth";

// Start:: form
const Form = ({ pNo, pCategoryId, pTariff, pDiscount, pBed, pPerson, onClosed }) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [categoryName, setCategoryName] = useState("");
    const buttonRef = useRef(null);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `${contextValues.roomCategoryAPI}/${hotelId}/${pCategoryId}`
    });

    useEffect(() => {
        (async () => {
            try {
                await doFetch();
            } catch (err) {
                console.log("Error occured when fetching data");
            }
            })();
    }, [pCategoryId]);      // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        data && setCategoryName(data.name);
    }, [data, error, loading]);

    // Start:: Html
    return (
        <form>
            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div className="row mb-2">

                    {/* Start:: Column no */}
                    <div className="col-xs-12 col-md-6">
                        
                        {/* Label element */}
                        <label className="form-label mr-2">Room No. :</label>
                        <label className="form-label">{ pNo }</label>
                    </div>
                    {/* End:: Column no */}

                    {/* Start:: Column room category */}
                    <div className="col-xs-12 col-md-6">

                        {/* Label element */}
                        <label className="form-label mr-2">Category :</label>
                        <label className="form-label">{ categoryName }</label>

                    </div>
                    {/* End:: Column room category */}

                 </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                 <div className="row mb-2">

                    {/* Start:: Column tariff */}
                    <div className="col-xs-12 col-md-6">

                        {/* Label element */}
                        <label className="form-label mr-2">Tariff :</label>
                        <label className="form-label">{ `₹ ${pTariff}` }</label>
                    </div>
                    {/* End:: Column tariff */}

                    {/* Start:: Column max. discount */}
                    <div className="col-xs-12 col-md-6">
                        
                        {/* Label element */}
                        <label className="form-label mr-2">Maximum discount :</label>
                        <label className="form-label">{ `₹ ${pDiscount}` }</label>
                    </div>
                    {/* End:: Column max. discount */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row mb-2">

                    {/* Start:: Column ext. bed tariff */}
                    <div className="col-xs-12 col-md-6">

                        {/* Label element */}
                        <label className="form-label mr-2">Extra bed tariff :</label>
                        <label className="form-label">{ `₹ ${pBed}` }</label>
                    </div>
                    {/* End:: Column ext. bed tariff */}

                    {/* Start:: Column ext. person tariff */}
                    <div className="col-xs-12 col-md-6">

                        {/* Label element */}
                        <label className="form-label mr-2">Extra person tariff :</label>
                        <label className="form-label">{ `₹ ${pPerson}` }</label>
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
                    ref = { buttonRef }
                    type = "button"
                    className = "btn btn-danger"
                    onClick = { onClosed } >
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
const RoomView = forwardRef(( props, ref ) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `${contextValues.roomAPI}/${hotelId}/${props.pId}`
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
              console.log("Error occured when fetching data");
            }
          })();
    }, [props.pId, showModal]);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);

    // Start:: Html
    return (
        <>
            {/* Start:: View modal */}
            { data &&
                <Modal 
                    show = { showModal }>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>View room</Modal.Title>
                        
                        {/* Close button */}
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick = { handleCloseModal } >
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    {/* End:: Modal header */}

                    {/* Start:: Form component */}
                    <Form 
                        pNo={data.no}
                        pCategoryId={data.categoryId}
                        pTariff={parseFloat(data.tariff, 10).toFixed(2)}
                        pDiscount={parseFloat(data.maxDiscount, 10).toFixed(2)}
                        pBed={parseFloat(data.extraBedTariff, 10).toFixed(2)}
                        pPerson={parseFloat(data.extraPersonTariff, 10).toFixed(2)}
                        onClosed={handleCloseModal}/>
                    {/* End:: Form component */}
                    
                </Modal> }
            {/* End:: View modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default RoomView;