import React, {useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";
import {Modal, NavLink} from "react-bootstrap";
import {toast} from "react-toastify";
import {X} from "react-feather";

import {formatINR} from "../common/Common";
import {HotelId} from "../../App";
import {useStateContext} from "../../contexts/ContextProvider";
import useFetchWithAuth from "../common/useFetchWithAuth";

// Start:: form
const Form = ({pName, pPrice, pDescription, onClosed}) => {
    const buttonRef = useRef(null);

    // Start:: Html
    return (
        <form>
            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column name */}
                    <div className="col-sx-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 mb-3">
                        <label className="col-12 form-label"><b>Name</b></label>
                        <label className="col-12 text-muted">{pName}</label>
                    </div>
                    {/* End:: Column name */}

                    {/* Start:: Column price */}
                    <div className="col-sx-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 mb-3">
                        <label className="col-12 form-label"><b>Price</b></label>
                        <label className="col-12 text-muted">{formatINR(pPrice)}</label>
                    </div>
                    {/* End:: Column price */}

                 </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                 <div className="row">

                    {/* Start:: Column description */}
                    <div className="col-12 mb-4">
                        <label className="col-12 form-label"><b>Description</b></label>
                        <label className="col-12 text-muted">{pDescription}</label>
                    </div>
                    {/* End:: Column description */}
                    
                </div>
                {/* End:: Row */}

            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>

                {/* Start:: Close button */}
                <button
                    ref={buttonRef}
                    type="button"
                    className="btn btn-danger"
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
const MiscellaneousView = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `${contextValues.miscellaneousAPI}/${hotelId}/${props.pId}`
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
                            onClick={handleCloseModal} >
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    {/* End:: Modal header */}

                    {/* Start:: Form component */}
                    <Form 
                        pName={data.name}
                        pPrice={data.price}
                        pDescription={data.description}
                        onClosed={handleCloseModal}/>
                    {/* End:: Form component */}
                    
                </Modal>}
            {/* End:: View modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default MiscellaneousView;