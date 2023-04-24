import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { Modal, NavLink } from "react-bootstrap"
import { useFormik } from "formik"
import { toast } from "react-toastify"
import { X } from "react-feather"

import { HotelId } from "../../App"
import { useStateContext } from "../../contexts/ContextProvider"
import { guestMiscellaneousSchema } from "../../schemas"
import MiscellaneousOrderGrid from "./MiscellaneousOrderGrid"
import useFetchWithAuth from "../common/useFetchWithAuth"


// Start:: form
const Form = ({pGuestId, pName, pMobile, pGuestCount, 
                pCorporateName, pCorporateAddress, pGstNo, 
                pData, onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId)
    const contextValues = useStateContext()

    const [miscellaneousData, setMiscellaneousData] = useState(null)
    const [validateOnChange, setValidateOnChange] = useState(false)

    const [defaultRowData, setDefaultRowData] = useState([])
    const { loading, error, doInsert } = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${pGuestId}`
    })


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
                            // totalPrice: element.totalPrice, 
                            totalPrice: element.unitPrice * element.quantity
                        }
    
            defaultRowData.push(rowData)
        })

        setDefaultRowData(defaultRowData)
    }, [pData])        // eslint-disable-line react-hooks/exhaustive-deps


    const handelChangeMiscellaneousData = (miscellaneousData) => {
        let miscData = []
        
        for(const row of miscellaneousData) {
            let operation = 'A'

            for(const od of pData) {
                if (od.id === row.id) {
                    operation = 'M'
                }
            }

            const md = {id: row.id, quantity: row.quantity, operation: operation}
            miscData.push(md)
        }

        for(const od of pData) {
            let found = false

            for (const e of miscData) {
                if (e.id === od.id) {
                    found = true
                }
            }

            if (!found) {
                const md = {id: od.id, quantity: od.quantity, operation: 'R'}
                miscData.push(md)
            }
        }

        setMiscellaneousData(miscData)
    } 

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
            let payload

            if (pData.length > 0) {
                payload = {   
                    transactionId: pData[0].transactionId,
                    miscellaneouses: miscellaneousData
                }
            } else {
                payload = {   
                    miscellaneouses: miscellaneousData
                }
            }

            await doInsert(payload)
        
            if (error === null) {
                resetForm()
                onSubmited()
            } else {
                toast.error(error)
            }
        }
    })
    // End:: Form validate and save data

    // Strat:: close form    
    const handleClose = () => {
        setValidateOnChange(false)
        resetForm()
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

                        {/* Label element */}
                        <label className="form-label">Not delivered item list :</label>

                        {/* Start:: Column miscellaneous detail */}
                        <MiscellaneousOrderGrid
                            pState = "MOD"
                            pDefaultRowData = {defaultRowData}
                            onChange = {handelChangeMiscellaneousData} />
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
                    onClick = {handleSubmit} >

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

}
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
const GuestMiscellaneousOrder = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId)
    const contextValues = useStateContext()
    const [showModal, setShowModal] = useState(false)
    const { data, doFetch } = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${props.pGuestId}/N`
    })

    // Start:: Show modal
    const handleShowModal = () => {
        setShowModal(true)
    }
    // End:: Show modal

    // Start:: Close modal
    const handleCloseModal = () => {
        setShowModal(false)
        props.onClosed()
    }
    // End:: Close modal

    // Start:: Save
    const handleSave = () => { 
        setShowModal(false)
        props.onSaved()
    }
    // End:: Save

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
            { data &&
                <Modal size = "lg"
                    show = {showModal} >

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Order miscellaneous items</Modal.Title>
                        
                        {/* Close button */}
                        <NavLink 
                            className = "nav-icon" href="#" 
                            onClick = {handleCloseModal} >
                            <i className = "align-middle"><X/></i>
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
                        onSubmited = {handleSave} 
                        onClosed = {handleCloseModal} />
                        {/* End:: Form component */}
                    
                </Modal>}
            {/* End:: Edit modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestMiscellaneousOrder;