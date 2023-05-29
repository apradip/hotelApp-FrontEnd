import React, {useEffect, useState, forwardRef, useImperativeHandle} from "react";
import {Modal, NavLink} from "react-bootstrap";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {X} from "react-feather";

import {useStateContext} from "../../contexts/ContextProvider";
import {accessLevelSchema} from "../../schemas";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pId, pName, pDescription, onSubmited, onClosed}) => {
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doUpdate} = useFetchWithAuth({
        url: `${contextValues.accessLevelAPI}/${pId}`
    })

    // Start:: Form validate and save data
    const {values, errors, touched, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputName: pName,
            keyInputDescription: pDescription
        },
        validationSchema: accessLevelSchema,
        validateOnChange,
        onSubmit: async (values) => {
            const payload = {   
                name: values.keyInputName.toUpperCase(), 
                description: values.keyInputDescription
            }

            await doUpdate(payload);
        
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
                    
                    {/* Start:: Column role */}
                    <div className="col-12 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputName"><b>Name</b></label>

                        {/* Input element text*/}
                        <input 
                            type="text" 
                            id="keyInputName"
                            className="form-control"
                            placeholder="Name" 
                            autoComplete="off"
                            maxLength={100}
                            disabled={true}
                            value={values.keyInputName} 
                            onChange={handleChange}/>

                        {/* Validation message */}
                        {errors.keyInputName && 
                            touched.keyInputName ? 
                                (<small className="text-danger">{ errors.keyInputName }</small>) : 
                                    null}
                    </div>
                    {/* End:: Column role */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column description */}
                    <div className="col-12 mb-3">

                        {/* Label element */}
                        <label className="form-label" 
                            htmlFor="keyInputDescription"><b>Description</b></label>

                        {/* Input element text*/}
                        <textarea 
                            id="keyInputDescription"
                            placeholder="Description"
                            className="form-control"
                            autoFocus
                            rows={"5"}
                            maxLength={"256"}
                            disabled={loading || error !== null}
                            value={values.keyInputDescription} 
                            onChange={handleChange}/>

                    {/* Validation message */}
                    {errors.keyInputDescription && 
                        touched.keyInputDescription ? 
                            (<small className="text-danger">{errors.keyInputDescription}</small>) : 
                                null}
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

};
// End:: form


// Start:: Component
// props parameters
// pId
// onEdited()
// onClosed()

// useImperativeHandle
// handleShowModal
const AccessLevelEdit = forwardRef((props, ref) => {    
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `${contextValues.accessLevelAPI}/${props.pId}`
    })

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
        props.onEdited();
    };
    // End:: Save

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
    }, [showModal]);        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);

    // Start:: Html
    return (
        <>
            {/* Start:: Edit modal */}
            {data &&
                <Modal 
                    show={showModal}>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Edit</Modal.Title>
                        
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
                        pId={data._id}    
                        pName={data.name}
                        pDescription={data.description}
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


export default AccessLevelEdit;