import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X } from "react-feather";
import { subStr, properCase } from "../common/Common";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { guestTableSchema } from "../../schemas";
import DespatchGrid from "../common/ItemDespatchGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pGuestId, pName, pMobile, pGuestCount, 
               pCorporateName, pCorporateAddress, pGstNo, 
               pTransactionId, pTables, pData,
               pShow, 
               onSubmited, onClosed}) => {

    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [despatchData, setDespatchData] = useState(null);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doUpdate} = useFetchWithAuth({
        url: `${contextValues.guestTableAPI}/${hotelId}/${pGuestId}/${pTransactionId}`
    });         // update delivery status

    const handelChangeData = (gridData) => {
        let listData = [];
        
        try {
            for(const row of gridData) {
                listData.push({itemTransactionId: row.itemTransactionId});
            }

            setDespatchData(listData);
        } catch (err) {
            console.log(err);
        }
    }; 

    // Start:: Form validate and save data
    const {handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputName: pName,
            keyInputMobile: pMobile,
            keyInputGuestCount: pGuestCount,
            keyInputCorporateName: pCorporateName,
            keyInputCorporateAddress: pCorporateAddress,
            keyInputGstNo: pGstNo,
            keyInputTables: pTables
        },
        validationSchema: guestTableSchema,
        validateOnChange,
        onSubmit: async () => {
            try {
                despatchData && await doUpdate({deliveries: despatchData});
        
                if (error === null) {
                    resetForm();
                    onSubmited();
                } else {
                    toast.error(error);
                }
            } catch (err) {
                console.log(err);
                toast.error(err);
            }
        }
    });
    // End:: Form validate and save data

    // Strat:: close form    
    const handleClose = () => {
        try {
            setValidateOnChange(false);
            resetForm();
            onClosed();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: close form    

    // Start:: Html
    return (
        <Modal size =  "lg"
            show = {pShow}>

            {/* Start:: Modal header */}
            <Modal.Header>
                {/* Header text */}
                <Modal.Title>Despatch</Modal.Title>
                
                {/* Close button */}
                <NavLink 
                    className = "nav-icon" href = "#" 
                    onClick = {handleClose}>
                    <i className = "align-middle"><X/></i>
                </NavLink>
            </Modal.Header> 
            {/* End:: Modal header */}

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column name / company */}
                    {pCorporateName ? 
                        <Col sx = {12} md = {5} className = "mb-3">
                            <label className = "col-12 form-label"><b>Company</b></label>
                            <label className = "col-12 text-muted">{properCase(subStr(pCorporateName, 30))}</label>
                        </Col>
                    :
                        <Col sx = {12} md = {5} className = "mb-3">
                            <label className = "col-12 form-label"><b>Name</b></label>
                            <label className = "col-12 text-muted">{properCase(subStr(pName, 30))}</label>
                        </Col>
                    }
                    {/* End:: Column name / company */}

                    {/* Start:: Column mobile no / company address */}
                    {pCorporateName ? 
                        <Col sx = {12} md = {2} className = "mb-3">
                            <label className = "col-12 form-label"><b>Address</b></label>
                            <label className = "col-12 text-muted">{properCase(subStr(pCorporateAddress, 30))}</label>
                        </Col>
                    :
                        <Col sx = {12} md = {5} className = "mb-3">
                            <label className = "col-12 form-label"><b>Mobile no.</b></label>
                            <label className = "col-12 text-muted">{pMobile}</label>
                        </Col>
                    }
                    {/* End:: Column mobile no / company address */}

                    {/* Start:: Column mobile no / company address */}
                    <Col sx = {12} md = {2} className = "mb-3">
                        <label className = "col-12 form-label"><b>Guest</b></label>
                        <label className = "col-12 text-muted">{pGuestCount} No.</label>
                    </Col>
                    {/* End:: Column mobile no / company address */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column service detail */}
                    <Col sx = {12} md = {12}>

                        {/* Label element */}
                        <label className = "col-12 form-label"><b>Food items</b></label>

                        <div className = "ag-theme-alpine grid-height-400">
                            {/* Start:: Column service detail */}
                            <DespatchGrid
                                pDefaultRowData = {pData}
                                onChange = {handelChangeData} />
                            {/* End:: Column service detail */}
                        </div>

                    </Col>                
                    {/* End:: Column service detail */}

                </Row>
                {/* End:: Row */}

            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>

                {/* Start:: Close button */}
                <button
                    type = "button"
                    className = "btn btn-danger"
                    disabled = {loading}
                    onClick = {handleClose} >
                    Close
                </button> 
                {/* End:: Close button */}
                
                {/* Start:: Save button */}
                <button 
                    type = "button"
                    className = "btn btn-success"
                    disabled = {loading} 
                    onClick = {handleSubmit}>

                    {!loading && "Confirm"}
                    {loading && 
                                <>
                                    <span className = "spinner-border spinner-border-sm" role = "status" aria-hidden = "true"></span>
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
const GuestTableDespatch = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showMain, setShowMain] = useState(false);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestTableAPI}/${hotelId}/${props.pGuestId}`,
        params: {option: "N"}
    });

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {if (event.key === "Escape") handleCloseModal();});
        return () => {document.removeEventListener("keydown", handleCloseModal);};
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    

    // Start:: fetch id wise detail from api
    useEffect(() => {
        try {
            data && 
                data.items.length === 0 ?
                    toast.error("There is no item to despatch. All ordered items has allready been despatched.")
                :
                    setShowMain(true)
        } catch (err) {
            console.log(err);
        }
    }, [data]);
    // End:: fetch id wise detail from api

    // Start:: Show modal
    const handleShowModal = async () => {
        try {
            setShowMain(true);
            await doFetch();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show modal

    // Start:: Close modal
    const handleCloseModal = () => {
        try {
            setShowMain(false);
            props.onClosed();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Close modal

    // Start:: Save
    const handleSave = () => { 
        try {
            setShowMain(false);
            props.onSaved();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Save

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal};
    });
    // End:: forward reff show modal function
    
    // Start:: Html
    return (
        <>
            {/* Start:: Edit modal */}
            {data && data.items.length > 0 &&
                <>
                    {/* Start:: Form component */}
                    <Form 
                        pGuestId = {props.pGuestId}
                        pName = {data.name}
                        pMobile = {data.mobile}
                        pGuestCount = {data.guestCount}
                        pCorporateName = {data.corporateName}
                        pCorporateAddress = {data.corporateAddress}
                        pGstNo = {data.gstNo}
                        pTransactionId = {data.transactionId}
                        pTables = {data.tables}
                        pData = {data.items}
                        pShow = {showMain}
                        onSubmited = {handleSave} 
                        onClosed = {handleCloseModal} />
                    {/* End:: Form component */}
                </>  
            }
            {/* End:: Edit modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestTableDespatch;