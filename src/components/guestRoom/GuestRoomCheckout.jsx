import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react"
import { Modal, NavLink } from "react-bootstrap";
import { toast } from "react-toastify";
import { X } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetchWithAuth from "../common/useFetchWithAuth";

// Start:: form
const Form = ({pGuestId, pName, pCorporateName, 
                pShow,
                onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const inputRef = useRef(null);
    const {loading, error, doDelete} = useFetchWithAuth({
        url: `${contextValues.guestRoomAPI}/${hotelId}/${pGuestId}`
    });

    // Start:: Call delete api
    const handleSave = async () => {
        try {
            await doDelete();
            error === null ? onSubmited() : toast.error(error);
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Call delete api

    // Start:: Html
    return (
        <Modal 
            size = "sm"
            show = {pShow} >

            {/* Start:: Modal header */}
            <Modal.Header>
                {/* Header text */}
                <Modal.Title>Checkout</Modal.Title>

                {/* Close button */}
                <NavLink 
                    className = "nav-icon" 
                    href = "#" 
                    onClick = {onClosed}>
                    <i className = "align-middle"><X/></i>
                </NavLink>
            </Modal.Header>
            {/* End:: Modal header */}

            {/* Start:: Modal body */}
            <Modal.Body>
                <label className = "form-label">Are you really want to check out guest <mark><code>{ pName ? pName : pCorporateName }</code></mark> ?</label>
            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>

                {/* Start:: Close button */}
                <button 
                    autoFocus
                    type = "button"   
                    className = "btn btn-danger"
                    disabled = {loading}
                    ref = {inputRef} 
                    onClick = {onClosed} >
                    Close
                </button>
                {/* End:: Close button */}

                {/* Start:: Save button */}
                <button 
                    type = "button"
                    className = "btn btn-success"
                    disabled = {loading || error}
                    onClick = {handleSave} >

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
// onDeleted()
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestRoomCheckout = forwardRef((props, ref) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestAPI}/${hotelId}/${props.pGuestId}`
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

    // Start :: Save 
    const handleSave = () => {
        try {
            setShowModal(false);
            props.onSaved();
        } catch (err) {
            console.log(err);
        }
    };
    // End :: Save 

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal}
    });
    // End:: forward reff show modal function

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

    useEffect(() => {
        try {
            error && toast.error(error);

            // data && 
            //         (data.balance !== 0 || 
            //         data.roomsDetail.length !== 0 ||
            //         data.tablesDetail.length !== 0 ||
            //         data.miscellaneaDetail.length !== 0 ||
            //         data.servicesDetail.length !== 0 ||
            //         data.expensesPaymentsDetail.length !== 0) && 

            data && 
                data.balance !== 0 && 
                    toast.error("Guest can't be checked out, because there is some due.");
        } catch (err) {
            console.log(err);
        }
    }, [data, error, loading]);

    // Start:: Html
    return (
        <>
            {/* Start:: Delete modal */}
            {data && 
                data.balance === 0 && 
                    <Form 
                        pGuestId = {props.pGuestId} 
                        pName = {props.pName}
                        pCorporateName = {props.pCorporateName}
                        pShow = {showModal}
                        onSubmited = {handleSave} 
                        onClosed = {handleCloseModal}/>
            }
            {/* End:: Delete modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestRoomCheckout;