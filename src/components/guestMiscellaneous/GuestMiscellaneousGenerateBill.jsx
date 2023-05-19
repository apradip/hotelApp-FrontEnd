import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { Modal, NavLink } from "react-bootstrap"
import { X } from "react-feather"
import { subStr } from "../common/Common"

import { HotelId } from "../../App"
import { useStateContext } from "../../contexts/ContextProvider"
import SummeryBillGrid from "./MiscellaneousSummeryBillGrid"
import useFetchWithAuth from "../common/useFetchWithAuth"


// Start:: form
const Form = ({pGuestId, pName, pMobile, pGuestCount, 
               pCorporateName, pCorporateAddress, pGstNo, 
               pData, onClosed}) => {

    // Strat:: close form    
    const handleClose = () => {
        onClosed()
    }
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
                        <div className="col-5">
                            <label className="form-label mr-2">Company :</label>
                            <label className="text-muted">{subStr(pCorporateName, 30)}</label>
                        </div>
                    :
                        <div className="col-5">
                            <label className="form-label mr-2">Name :</label>
                            <label className="text-muted">{subStr(pName, 30)}</label>
                        </div>
                    }
                    {/* End:: Column name / company */}

                    {/* Start:: Column mobile no / company address */}
                    {pCorporateName ? 
                        <div className="col-5">
                            <label className="form-label mr-2">Address :</label>
                            <label className="text-muted">{subStr(pCorporateAddress, 30)}</label>
                        </div>
                    :
                        <div className="col-5">
                            <label className="form-label mr-2">Mobile :</label>
                            <label className="text-muted">{pMobile}</label>
                        </div>
                    }
                    {/* End:: Column mobile no / company address */}

                    {/* Start:: Column mobile no / company address */}
                    <div className="col-2">
                        <label className="form-label mr-2">Guest count :</label>
                        <label className="text-muted">{pGuestCount}</label>
                    </div>
                    {/* End:: Column mobile no / company address */}

                </div>
                {/* End:: Row */}

                {/* Start:: Row */}
                <div className="row">

                    {/* Start:: Column miscellaneous detail */}
                    <div className="col-12">

                        {/* Label element */}
                        <label className="form-label">Bills :</label>

                        {/* Start:: Column miscellaneous detail */}
                        <SummeryBillGrid
                            pGuestId = {pGuestId}
                            pName = {pName}
                            pMobile = {pMobile}
                            pGuestCount = {pGuestCount}
                            pCorporateName = {pCorporateName}
                            pCorporateAddress = {pCorporateAddress}
                            pGstNo = {pGstNo}
                            pData = {pData} 
                            onClosed = {handleClose}/>
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
    }
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
// onSaved()
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestMiscellaneousGenerateBill = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId)
    const contextValues = useStateContext()
    const [showModal, setShowModal] = useState(false)
    const {data, doUpdate} = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${props.pGuestId}`
    })

    // Start:: Show modal
    const handleShowModal = () => {
        setShowModal(true)
    }
    // End:: Show modal

    // Start:: Close modal
    const handleCloseModal = () => {
        setShowModal(false)
        // props.onClosed()
        data && props.onSaved()
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

        return () => {document.removeEventListener("keydown", handleCloseModal)}
    }, [])     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    
    
    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            try {
                showModal && await doUpdate()
            } catch (err) {
                console.log("Error occured when fetching data")
            }
          })()
    }, [showModal])      // eslint-disable-line react-hooks/exhaustive-deps
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
                        <Modal.Title>Bill summery</Modal.Title>
                        
                        {/* Close button */}
                        <NavLink 
                            className = "nav-icon" href="#" 
                            onClick = {handleCloseModal} >
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    {/* End:: Modal header */}

                    {/* Start:: Form component */}
                    <Form 
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
                        <Modal.Title>Error</Modal.Title>

                        {/* Close button */}
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick = {handleCloseModal} >
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


export default GuestMiscellaneousGenerateBill