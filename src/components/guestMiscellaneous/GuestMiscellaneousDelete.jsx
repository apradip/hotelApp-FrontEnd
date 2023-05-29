import React, {useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";
import {Modal, NavLink} from "react-bootstrap";
import {toast} from "react-toastify";
import {X} from "react-feather";

import {HotelId} from "../../App";
import {useStateContext} from "../../contexts/ContextProvider";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pId, pName, onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const inputRef = useRef(null);
    const { loading, error, doDelete } = useFetchWithAuth({
        url: `${contextValues.guestAPI}/${hotelId}/${pId}`
    });

    // Start:: Call delete api
    const handleSave = async () => {
        await doDelete();
        error === null ? onSubmited() : toast.error(error);
    };
    // End:: Call delete api

    // Start:: Html
    return (
        <form>

            {/* Start:: Modal body */}
            <Modal.Body>
                <label className="form-label">Are you really want to remove <mark><code>{ pName }</code></mark> ?</label>
            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>

                {/* Start:: Close button */}
                <button 
                    type="button"   
                    className="btn btn-danger"
                    autoFocus
                    disabled={loading}
                    ref={inputRef} 
                    onClick={onClosed} >
                    Close
                </button>
                {/* End:: Close button */}

                {/* Start:: Save button */}
                <button 
                    type="button"
                    className="btn btn-success"
                    disabled = { loading || error }
                    onClick = { handleSave } >

                    { !loading && "Confirm" }
                    { loading && 
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

// Start:: form
const FormError = ({pName, onClosed}) => {
    // Start:: Html
    return (
        <form>

            {/* Start:: Modal body */}
            <Modal.Body>
                <label className="form-label">Guest <mark><code>{pName}</code></mark>can't be deleted, because there is some activity.</label>
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
// onDeleted()
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestMiscellaneousDelete = forwardRef(( props, ref ) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `${contextValues.guestAPI}/${hotelId}/${props.pId}`
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

    // Start :: Save 
    const handleSave = () => {
        setShowModal(false);
        props.onDeleted(); 
    };
    // End :: Save 

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
    }, [showModal]);        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);

    // Start:: Html
    return (
        <>
            {/* Start:: Delete modal */}
            { data && 
                (data.balance === 0 && 
                data.roomsDetail.length === 0 && 
                data.tablesDetail.length === 0 && 
                data.miscellaneousesDetail.length === 0 && 
                data.servicesDetail.length === 0 && 
                data.expensesPaymentsDetail.length === 0) && 
                <Modal 
                    size="sm"
                    show={showModal} >

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Delete guest</Modal.Title>

                        {/* Close button */}
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick={handleCloseModal} >
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    {/* End:: Modal header */}

                    {/* Start:: Form component */}
                    <Form 
                        pId={props.pId} 
                        pName={props.pName}
                        onSubmited={handleSave} 
                        onClosed={handleCloseModal} />
                        {/* End:: Form component */}
            </Modal> }
            {/* End:: Delete modal */}

            {/* Start:: Delete modal */}
            { data && 
                (data.balance !== 0 || 
                data.roomsDetail.length !== 0 ||
                data.tablesDetail.length !== 0 ||
                data.miscellaneousesDetail.length !== 0 ||
                data.servicesDetail.length !== 0 ||
                data.expensesPaymentsDetail.length !== 0) && 
                <Modal 
                    size="sm"
                    show={showModal} >

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Delete guest error</Modal.Title>

                        {/* Close button */}
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick={handleCloseModal} >
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    {/* End:: Modal header */}

                    {/* Start:: Form component */}
                    <FormError 
                        pName={props.pName}
                        onClosed={handleCloseModal} />
                        {/* End:: Form component */}
            </Modal>}
            {/* End:: Delete modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestMiscellaneousDelete;