import React, {useContext, useEffect, useState, forwardRef, useImperativeHandle} from "react";
import {Modal, NavLink} from "react-bootstrap";
import {toast} from "react-toastify";
import {X} from "react-feather";

import {HotelId} from "../../App";
import {useStateContext} from "../../contexts/ContextProvider";
import {getAccessLevel} from "../common/Common";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pAccessLevels, pName, pAddress, pMobile, pEmail, onClosed}) => {

    // Start:: Html
    return (
        <form>
            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column name */}
                    <div className="col-xs-12 col-md-6 mb-3">
                        <label className="col-12 form-label"><b>Name</b></label>
                        <label className="col-12 text-muted">{pName}</label>
                    </div>
                    {/* Start:: Column name */}

                    {/* Start:: Column role */}
                    <div className="col-xs-12 col-md-6 mb-3">
                        <label className="col-12 form-label"><b>Role</b></label>
                        <label className="col-12 text-muted">{getAccessLevel(pAccessLevels)}</label>
                    </div>
                    {/* Start:: Column role */}
                    
                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column mobile no */}
                    <div className="col-xs-12 col-md-6 mb-3">
                        <label className="col-12 form-label"><b>Mobile no.</b></label>
                        <label className="col-12 text-muted">{pMobile}</label>
                    </div>
                    {/* End:: Column mobile no */}

                    {/* Start:: Column email */}
                    <div className="col-xs-12 col-md-6 mb-3">
                        <label className="col-12 form-label"><b>Email</b></label>
                        <label className="col-12 text-muted">{pEmail}</label>
                    </div>
                    {/* End:: Column email */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column address */}
                    <div className="col-12 mb-3">
                        <label className="col-12 form-label"><b>Address</b></label>
                        <label className="col-12 text-muted">{pAddress}</label>
                    </div>
                    {/* End:: Column address */}

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
const EmployeeView = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.employeeAPI}/${hotelId}/${props.pId}`
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
                        pAccessLevels={data.accessLevels}
                        pName={data.name}
                        pAddress={data.address}
                        pMobile={data.mobile}
                        pEmail={data.email}
                        onClosed={handleCloseModal}/>
                    {/* End:: Form component */}
                    
                </Modal>}
            {/* End:: View modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default EmployeeView;