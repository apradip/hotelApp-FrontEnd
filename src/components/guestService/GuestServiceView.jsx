import React, {useContext, useEffect, useState, forwardRef, useImperativeHandle} from "react"
import {Modal, NavLink} from "react-bootstrap"
import {X} from "react-feather"
import {subStr} from "../common/Common"

import {HotelId} from "../../App"
import {useStateContext} from "../../contexts/ContextProvider"
import OrderGrid from "./ServiceOrderGrid"
import useFetchWithAuth from "../common/useFetchWithAuth"

// Start:: form
const Form = ({pGuestId, pName, pMobile, pGuestCount, 
               pCorporateName, pCorporateAddress, pGstNo, 
               pData, onClosed}) => {
                    
    const [defaultRowData, setDefaultRowData] = useState([])

    useEffect(() => {
        pData.forEach(element => {
            const rowData = {
                            rowId: defaultRowData.length + 1, 
                            id: element.id,
                            name: element.name, 
                            unitPrice: element.unitPrice,
                            quantity: element.quantity, 
                            serviceChargePercentage: element.serviceChargePercentage, 
                            serviceCharge: element.serviceCharge, 
                            gstPercentage: element.gstPercentage, 
                            gstCharge: element.gstCharge, 
                            totalPrice: element.unitPrice * element.quantity
                        }
    
            defaultRowData.push(rowData)
        })

        setDefaultRowData(defaultRowData)
    }, [pData])        // eslint-disable-line react-hooks/exhaustive-deps

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

                    <div className="col-12">
                        {/* Label element */}
                        <label className="text-muted">Items :</label>
                    </div>                

                    {/* Start:: Column room detail */}
                    <div className="col-12 ag-theme-alpine grid">
                        <OrderGrid
                            pState = "VIEW"
                            pDefaultRowData = {defaultRowData}
                            onChange = {null} />
                    </div>                
                    {/* End:: Column room detail */}

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
                    onClick = {onClosed} >
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


// Start:: Component
// props parameters
// pGuestId
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestServiceView = forwardRef(( props, ref ) => {    
    const hotelId = useContext(HotelId)
    const contextValues = useStateContext()
    const [showModal, setShowModal] = useState(false)
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestServiceAPI}/${hotelId}/${props.pGuestId}`,
        params: {
            option: 'A'
        }
    })

    // Start :: Show modal 
    const handleShowModal = () => {
        setShowModal(true)
    }
    // End :: Show modal 

    // Start :: Close modal 
    const handleCloseModal = () => {
        setShowModal(false)
    }
    // End :: Close modal 

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {
            handleShowModal
        }
    })
    // End:: forward reff show modal function

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') handleCloseModal()
        })

        return () => {document.removeEventListener('keydown', handleCloseModal)}
    }, [])     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    

    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            try {
                showModal && await doFetch()
            } catch (err) {
              console.log('Error occured when fetching data')
            }
          })()
    }, [showModal])         // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    // Start:: Html
    return (
        <>
            {/* Start:: View modal */}
            {data &&
                <Modal size="lg"
                    show = {showModal}>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>View</Modal.Title>
                        
                        {/* Close button */}
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick = {handleCloseModal} >
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
                        pData={data}
                        onClosed={handleCloseModal} />
                    {/* End:: Form component */}
                    
                </Modal> }
            {/* End:: View modal */}
        </>
    )
    // End:: Html

})
// End:: Component


export default GuestServiceView