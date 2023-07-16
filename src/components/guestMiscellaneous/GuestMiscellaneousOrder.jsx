import React, {useContext, useEffect, useState, forwardRef, useImperativeHandle} from "react"
import {Modal, NavLink, Row, Col} from "react-bootstrap"
import {useFormik} from "formik"
import {toast} from "react-toastify"
import {X} from "react-feather"
import {subStr} from "../common/Common"

import {HotelId} from "../../App"
import {useStateContext} from "../../contexts/ContextProvider"
import {guestMiscellaneousSchema} from "../../schemas"
import OrderGrid from "./MiscellaneousOrderGrid"
import useFetchWithAuth from "../common/useFetchWithAuth"


// Start:: form
const Form = ({pGuestId, pTransactionId, pName, pMobile, pGuestCount, 
                pCorporateName, pCorporateAddress, pGstNo, pData, 
                onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId)
    const contextValues = useStateContext()
    const [orderData, setOrderData] = useState(null)
    const [validateOnChange, setValidateOnChange] = useState(false)
    const {loading, error, doInsert} = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${pGuestId}/${pTransactionId}`
    })

    const handelChangeData = (gridData) => {
        let dataList = []
        
        for(const row of gridData) {
            let operation = "A"

            for(const od of pData) {
                if (od.id === row.id) {
                    operation = "M"
                }
            }

            dataList.push({id: row.id, 
                quantity: row.quantity, 
                operation: operation});
        }

        for(const od of pData) {
            let found = false

            for (const e of dataList) {
                if (e.id === od.id) {
                    found = true
                }
            }

            if (!found) {
                dataList.push({id: od.id, 
                    quantity: od.quantity, 
                    operation: "R"})
            }
        }

        setOrderData(dataList)
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
            orderData && await doInsert({orders: orderData});
        
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
                <Row>

                    {/* Start:: Column name / company */}
                    {pCorporateName ? 
                        <Col sx={12} sm={12} md={12} lg={5} xl={5} xxl={5} className="mb-3">
                            <label className="col-12 form-label"><b>Company</b></label>
                            <label className="col-12 text-mutedl">{subStr(pCorporateName, 30)}</label>
                        </Col>
                    :
                        <Col sx={12} sm={12} md={12} lg={5} xl={5} xxl={5} className="mb-3">
                            <label className="col-12 form-label"><b>Name</b></label>
                            <label className="col-12 text-muted">{subStr(pName, 30)}</label>
                        </Col>
                    }
                    {/* End:: Column name / company */}

                    {/* Start:: Column mobile no / company address */}
                    {pCorporateName ? 
                        <Col sx={12} sm={12} md={12} lg={5} xl={5} xxxl={5} className="mb-3">
                            <label className="col-12 form-label"><b>Address</b></label>
                            <label className="col-12 text-muted">{subStr(pCorporateAddress, 30)}</label>
                        </Col>
                    :
                        <Col sx={12} sm={12} md={12} lg={5} xl={5} xxxl={5} className="mb-3">
                            <label className="col-12 form-label"><b>Mobile no.</b></label>
                            <label className="col-12 text-muted">{pMobile}</label>
                        </Col>
                    }
                    {/* End:: Column mobile no / company address */}

                    {/* Start:: Column guest count */}
                    <Col sx={12} sm={12} md={12} lg={2} xl={2} xxxl={2} className="mb-3">
                        <label className="col-12 form-label"><b>Guest count</b></label>
                        <label className="col-12 text-muted">{pGuestCount} No.</label>
                    </Col>
                    {/* End:: Column guest count */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column miscellaneous detail */}
                    <Col sx={12} md={12}>

                        {/* Label element */}
                        <label className="col-12 form-label"><b>Miscellaneous items</b></label>

                        {/* Start:: Column miscellaneous detail */}
                        <OrderGrid
                            pState="MOD"
                            pDefaultRowData={pData}
                            onChange={handelChangeData}/>
                        {/* End:: Column miscellaneous detail */}

                    </Col>                
                    {/* End:: Column miscellaneous detail */}

                </Row>
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
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${props.pGuestId}`,
        params: {
            option: "N"
        }
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
        document.addEventListener("keydown", (event) => {if (event.key === "Escape") handleCloseModal()})

        return () => {document.removeEventListener("keydown", handleCloseModal)}
    }, [])     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    
    
    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            showModal && await doFetch()
          })()
    }, [showModal])        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    // Start:: Html
    return (
        <>
            {/* Start:: Edit modal */}
            {data &&
                <Modal size="lg"
                    show={showModal}>

                    {/* Start:: Modal header */}
                    <Modal.Header>
                        {/* Header text */}
                        <Modal.Title>Orders</Modal.Title>
                        
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
                        pTransactionId={props.pTransactionId}
                        pName={props.pName}
                        pMobile={props.pMobile}
                        pGuestCount={props.pGuestCount}
                        pCorporateName={props.pCorporateName}
                        pCorporateAddress={props.pCorporateAddress}
                        pGstNo={props.pGstNo}
                        pData={data}
                        onSubmited={handleSave} 
                        onClosed={handleCloseModal}/>
                        {/* End:: Form component */}
                    
                </Modal>}
            {/* End:: Edit modal */}
        </>
    )
    // End:: Html

})
// End:: Component


export default GuestMiscellaneousOrder