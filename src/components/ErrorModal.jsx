import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink } from "react-bootstrap";
import { X } from "react-feather";


// Start:: form error
const ErrorModal = forwardRef((props, ref) => {    
    const [showModal, setShowModal] = useState(false);

    // Start:: Show modal
    const handleShowModal = () => {
        setShowModal(true);
    };
    // End:: Show modal
    
    // Strat:: close form    
    const handleClose = () => {
        setShowModal(false);
        props.onClosed();
    };
    // End:: close form    

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal};
    });
    // End:: forward reff show modal function
    
    // Start:: Html
    return (
        <Modal 
            size = "sm"
            show = {showModal}>

            {/* Start:: Modal header */}
            <Modal.Header>
                {/* Header text */}
                <Modal.Title>Error</Modal.Title>

                {/* Close button */}
                <NavLink 
                    className = "nav-icon" 
                    href = "#" 
                    onClick = {handleClose}>
                    <i className = "align-middle"><X/></i>
                </NavLink>
            </Modal.Header>
            {/* End:: Modal header */}

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div>
                    <label className = "form-label mr-2">{props.message}</label>
                </div>
                {/* End:: Row */}

            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>

                {/* Start:: Close button */}
                <button
                    type = "button"
                    className = "btn btn-danger"
                    onClick = {handleClose}>
                    Close
                </button>
                {/* End:: Close button */}

            </Modal.Footer>
            {/* End:: Modal footer */}

        </Modal>
    );
    // End:: Html
});
// End:: form error


export default ErrorModal;