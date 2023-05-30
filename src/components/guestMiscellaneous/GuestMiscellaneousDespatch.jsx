import React, {useContext, useEffect, useState, forwardRef, useImperativeHandle} from "react";
import {Modal, NavLink} from "react-bootstrap";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {X} from "react-feather";
import {subStr} from "../common/Common";

import {HotelId} from "../../App";
import {useStateContext} from "../../contexts/ContextProvider";
import {guestMiscellaneousSchema} from "../../schemas";
import MiscellaneousOrderGrid from "./MiscellaneousOrderGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pGuestId, pName, pMobile, pGuestCount, 
               pCorporateName, pCorporateAddress, pGstNo, 
               pTransactionId, pData, onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const [defaultRowData, setDefaultRowData] = useState(pData);
    const { loading, error, doUpdate } = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${pGuestId}/${pTransactionId}`
    })

    const handelChangeMiscellaneousData = (miscellaneousData) => {
        //console.log(miscellaneousData);
        // let miscData = [];
        
        // for(const row of miscellaneousData) {
        //     let operation = 'A';

        //     for(const od of pData) {
        //         if (od.miscellaneousId === row.miscellaneousId) {
        //             operation = 'M';
        //         }
        //     }

        //     const md = {id: row.miscellaneousId, 
        //                 quantity: row.quantity, 
        //                 operation: operation};
        //     miscData.push(md);
        // }

        // for(const od of pData) {
        //     let found = false;

        //     for (const e of miscData) {
        //         if (e.id === od.miscellaneousId) {
        //             found = true;
        //         }
        //     }

        //     if (!found) {
        //         const md = {id: od.miscellaneousId, 
        //                     quantity: od.quantity, 
        //                     operation: 'R'};
        //         miscData.push(md);
        //     }
        // }

        // setMiscellaneousData(miscData);
    }; 

    // Start:: Form validate and save data
    const {handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputName: pName,
            keyInputMobile: pMobile,
            keyInputGuestCount: pGuestCount,
            keyInputCorporateName: pCorporateName,
            keyInputCorporateAddress: pCorporateAddress,
            keyInputGstNo: pGstNo
        },
        validationSchema: guestMiscellaneousSchema,
        validateOnChange,
        onSubmit: async (values) => {
            if (pData.length > 0) {
                await doUpdate();
        
                if (error === null) {
                    resetForm();
                    onSubmited();
                } else {
                    toast.error(error);
                }
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
                            <label className="col-12 text-muted">{subStr(pCorporateName, 30)}</label>
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
                            <label className="col-12 form-label"><b>Mobile</b></label>
                            <label className="col-12 text-muted">{pMobile}</label>
                        </div>
                    }
                    {/* End:: Column mobile no / company address */}

                    {/* Start:: Column mobile no / company address */}
                    <div className="col-sx-12 col-sm-2 mb-3">
                        <label className="col-12 form-label"><b>Guest count</b></label>
                        <label className="col-12 text-muted">{pGuestCount} No.</label>
                    </div>
                    {/* End:: Column mobile no / company address */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column miscellaneous detail */}
                    <div className="col-12">

                        {/* Label element */}
                        <label className="form-label"><b>Items</b></label>

                        {/* Start:: Column miscellaneous detail */}
                        <MiscellaneousOrderGrid
                            pState="VIEW"
                            pDefaultRowData={defaultRowData}
                            onChange={handelChangeMiscellaneousData} />
                        {/* End:: Column miscellaneous detail */}

                    </div>                
                    {/* End:: Column miscellaneous detail */}

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
    )
    // End:: Html

};
// End:: form


// Start:: form error
const FormError = ({onClosed}) => {
    // Strat:: close form    
    const handleClose = () => {
        onClosed();
    };
    // End:: close form    

    // Start:: Html
    return (
        <form>

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div>
                    <label className="form-label mr-2">There is no item to despatch. All ordered items has allready been despatched.</label>
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
                    onClick={handleClose}>
                    Close
                </button>
                {/* End:: Close button */}

            </Modal.Footer>
            {/* End:: Modal footer */}

        </form> 
    );
    // End:: Html
};
// End:: form error



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
const GuestMiscellaneousDespatch = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${props.pGuestId}`,
        params: {
            option: 'N'
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
        return {handleShowModal}
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
            try {
                showModal && await doFetch();
            } catch (err) {
                console.log("Error occured when fetching data");
            }
          })();
    }, [showModal]);        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    // Start:: Html
    return (
        <>
            {/* Start:: Edit modal */}
            {data && data.length ? 
                <Modal size="lg"
                    show={showModal}>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Despatch</Modal.Title>
                        
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
                        pGuestId={props.pGuestId}
                        pName={props.pName}
                        pMobile={props.pMobile}
                        pGuestCount={props.pGuestCount}
                        pCorporateName={props.pCorporateName}
                        pCorporateAddress={props.pCorporateAddress}
                        pGstNo={props.pGstNo}
                        pTransactionId={data[0].transactionId}
                        pData={data}
                        onSubmited={handleSave} 
                        onClosed={handleCloseModal}/>
                        {/* End:: Form component */}
                    
                </Modal>
            :
                <Modal 
                    size="sm"
                    show={showModal}>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Error</Modal.Title>

                        {/* Close button */}
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick={handleCloseModal}>
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    {/* End:: Modal header */}

                    {/* Start:: Form component */}
                    <FormError 
                        onClosed={handleCloseModal}/>
                        {/* End:: Form component */}
                </Modal>
            }
            {/* End:: Edit modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestMiscellaneousDespatch;