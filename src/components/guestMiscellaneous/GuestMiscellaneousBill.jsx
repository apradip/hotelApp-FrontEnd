import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { Modal, NavLink } from "react-bootstrap"
import { X } from "react-feather"

import { HotelId } from "../../App"
import { useStateContext } from "../../contexts/ContextProvider"
import BillGrid from "./MiscellaneousBillGrid"
import useFetchWithAuth from "../common/useFetchWithAuth"
import { formatDDMMYYYY } from "../common/Common"

// Start:: form
const Form = ({pTransactionId, pTransactionDate, pTransactionTime, 
               pGuestId, pName, pMobile, pGuestCount, 
               pCorporateName, pCorporateAddress, pGstNo, 
               pData, onClosed}) => {

    // Strat:: close form    
    const handleClose = () => {
        onClosed()
    }
    // End:: close form    

    // Strat:: print form    
    const handlePrint = () => {
        // onPrinted()
    }
    // End:: print form    

    // Start:: Html
    return (
        <form>

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div>
                    {/* Start:: Row */}
                    <div className="row mb-3">

                        {/* Start:: Column transaction date */}
                        <div className="col-4">
                            <label className="form-label mr-2">Date :</label>
                            <label className="form-label">{formatDDMMYYYY(pTransactionDate)}</label>
                        </div>
                        {/* End:: Column transaction date */}

                        {/* Start:: Column transaction time */}
                        <div className="col-4">
                            <label className="form-label mr-2">Time :</label>
                            <label className="form-label">{pTransactionTime}</label>
                        </div>
                        {/* End:: Column transaction time */}
                        
                    </div>
                    {/* End:: Row */}

                    {/* Start:: Row */}
                    <div className="row mb-3">

                        {/* Start:: Column name / company */}
                        {pName ? 
                            <div className="col-4">
                                <label className="form-label mr-2">Name :</label>
                                <label className="form-label">{pName}</label>
                            </div>
                        :
                            <div className="col-4">
                                <label className="form-label mr-2">Company :</label>
                                <label className="form-label">{pCorporateName}</label>
                            </div>
                        }
                        {/* End:: Column name / company */}

                        {/* Start:: Column mobile no / company address */}
                        {pName ? 
                            <div className="col-4">
                                <label className="form-label mr-2">Mobile :</label>
                                <label className="form-label">{pMobile}</label>
                            </div>
                        :
                            <div className="col-4">
                                <label className="form-label mr-2">Address :</label>
                                <label className="form-label">{pCorporateAddress}</label>
                            </div>
                        }
                        {/* End:: Column mobile no / company address */}

                        {/* Start:: Column mobile no / company address */}
                        {pName ? 
                            <div className="col-4">
                                <label className="form-label mr-2">Guest count :</label>
                                <label className="form-label">{pGuestCount}</label>
                            </div>
                        :
                            <div className="col-4">
                                <label className="form-label mr-2">GST No. :</label>
                                <label className="form-label">{pGstNo}</label>
                            </div>
                        }
                        {/* End:: Column mobile no / company address */}

                    </div>
                    {/* End:: Row */}
                </div>

                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column miscellaneous detail */}
                    <div className="col-12">

                        {/* Start:: Column miscellaneous detail */}
                        <BillGrid
                            pData={pData} />
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
                    onClick = {handleClose} >
                    Close
                </button>
                {/* End:: Close button */}

                {/* Start:: Print button */}
                <button 
                    type = "button"
                    className = "btn btn-success"
                    onClick = {handlePrint} >
                    Print    
                </button>
                {/* End:: Print button */}

            </Modal.Footer>
            {/* End:: Modal footer */}

        </form> 
    )
    // End:: Html

}
// End:: form


// Start:: form error
const FormError = ({onClosed}) => {
    // Strat:: close form    
    const handleClose = () => {
        onClosed()
    };
    // End:: close form    
    
    // Start:: Html
    return (
        <form>

            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <div>
                    <label className="form-label mr-2">There is no transaction to generate bill.</label>
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
                    onClick = {handleClose} >
                    Close
                </button>
                {/* End:: Close button */}

            </Modal.Footer>
            {/* End:: Modal footer */}

        </form> 
    )
    // End:: Html
}
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
// pTransactionId
// pTransactionDate
// pTransactionTime
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestMiscellaneousBill = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId)
    const contextValues = useStateContext()
    const [showModal, setShowModal] = useState(false)
    const { data, doFetch } = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${props.pGuestId}/${props.pTransactionId}`
    })

    // Start:: Show modal
    const handleShowModal = () => {
        setShowModal(true)
    }
    // End:: Show modal

    // Start:: Close modal
    const handleCloseModal = () => {
        setShowModal(false)
    }
    // End:: Close modal

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal}
    })
    // End:: forward reff show modal function

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") handleCloseModal()
        })

        return () => {
            document.removeEventListener("keydown", handleCloseModal)
        }
    }, [])     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    
    
    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            try {
                showModal && await doFetch()
            } catch (err) {
                console.log("Error occured when fetching data")
            }
          })()
    }, [showModal])        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    // Start:: Html
    return (
        <>
            {/* Start:: Edit modal */}
            { data && data.length ? 
                <Modal size="lg"
                    show={showModal} >

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Miscellaneous items bill</Modal.Title>
                        
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
                        pTransactionId = {props.pTransactionId} 
                        pTransactionDate = {props.pTransactionDate}
                        pTransactionTime = {props.pTransactionTime}
                        pGuestId = {props.pGuestId}
                        pName = {props.pName}
                        pMobile = {props.pMobile}
                        pGuestCount = {props.pGuestCount}
                        pCorporateName = {props.pCorporateName}
                        pCorporateAddress = {props.pCorporateAddress}
                        pGstNo = {props.pGstNo}
                        pData = {data}
                        onClosed = {handleCloseModal} />
                        {/* End:: Form component */}
                    
                </Modal>
            :
                <Modal 
                    size="sm"
                    show = {showModal} >

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Bill error</Modal.Title>

                        {/* Close button */}
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick = { handleCloseModal } >
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    {/* End:: Modal header */}

                    {/* Start:: Form component */}
                    <FormError 
                        onClosed = {handleCloseModal} />
                    {/* End:: Form component */}

                </Modal>
            }
            {/* End:: Edit modal */}
        </>
    )
    // End:: Html

})
// End:: Component


export default GuestMiscellaneousBill