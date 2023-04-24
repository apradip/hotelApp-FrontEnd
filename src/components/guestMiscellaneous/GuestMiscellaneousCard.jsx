import React, { useState, useRef, forwardRef, useImperativeHandle } from "react"
import { Table, Card, Dropdown } from "react-bootstrap"

import { PenTool, ShoppingBag, FileText, CreditCard } from "react-feather"
import { subStr, formatINR } from "../common/Common"
import View from "./GuestMiscellaneousView"
import Order from "./GuestMiscellaneousOrder"
import Despatch from "./GuestMiscellaneousDespatch"
import GenerateBill from "./GuestMiscellaneousGenerateBill"
import AddPayment from "../guestPayment/GuestPaymentAdd"
import Delete from "./GuestMiscellaneousDelete"

// Start:: Component
// props parameters
// pIndex
// pGuestId
// pRoomNos
// pName
// pMobile
// pAddress
// pCheckInDate
// pCheckOutDate
// pTotalPaidAmount
// pTotalDueAmount
// onActivated()
// onClosed()

// useImperativeHandle
// handleDeSelect
// handelOpenOrder
// handelDespatch 
// handelOpenGenerateBill
// handelOpenPayment
// handelOpenDelete
const GuestMiscellaneousCard = forwardRef((props, ref) => {
    const viewRef = useRef(null)
    const orderRef = useRef(null)
    const despatchRef = useRef(null)
    const generateBillRef = useRef(null)
    const addPaymentRef = useRef(null)
    const deleteRef = useRef(null)
    const [focus, setFocus] = useState(false)
    const [active, setActive] = useState(false)

    // Start:: Show view modal 
    const handelOpenView = () => {
        viewRef && viewRef.current.handleShowModal()
    }
    // End:: Show view modal 

    // Start:: Show order modal 
    const handelOpenOrder = () => {
        orderRef && orderRef.current.handleShowModal()
    }
    // End:: Show order modal 

    // Start:: Show despatch modal 
    const handelOpenDespatch = () => {
        despatchRef && despatchRef.current.handleShowModal()
    }
    // End:: Show despatch modal 
    
    // Start:: Show generate bill modal 
    const handelOpenGenerateBill = () => {
        generateBillRef && generateBillRef.current.handleShowModal()
    }
    // End:: Show generate bill modal 

    // Start:: Show payment modal 
    const handelOpenPayment = () => {
        addPaymentRef && addPaymentRef.current.handleShowModal()
    }
    // End:: Show payment modal 
    
    // Start:: Show delete modal 
    const handelOpenDelete = () => {
        deleteRef && deleteRef.current.handleShowModal()
    }
    // End:: Show delete modal 
    
    // Start:: Close all modal 
    const handleClose = () => {
        props.onClosed()
    }
    // End:: Close all modal 

    // Start:: de-select card 
    const handleDeSelect = () => {
        setActive(false)
        setFocus(false)
    }
    // End:: de-select card

    // Start:: forward reff de-select, show edit/delete modal function
    useImperativeHandle(ref, () => {
        return {
            handleDeSelect, 
            handelOpenOrder, 
            handelOpenDespatch, 
            handelOpenGenerateBill, 
            handelOpenPayment,
            handelOpenDelete
        }
    })
    // End:: forward reff de-select, show edit/delete modal function

    // Start:: Html
    return (
        <>
            {/* Start :: card component */}
            <Card className="border"
                ref={ref}
                index={props.pIndex}
                border={active ? "info" : focus ? "primary" : ""}  
                onMouseEnter={() => setFocus(true)}
                onMouseLeave={() => setFocus(false)} 
                onClick={(e) => { 
                                    if (e.detail === 1) {
                                        setActive(!active)
                                        props.onActivated(props.pIndex)
                                    }    
                                    else if (e.detail === 2) {
                                        handelOpenView()
                                    }  
                                }}>

                <Card.Body className="pt-3 pl-1 pb-1 pr-1 m-0 card-element">
                    
                    {/* Start:: card header */}
                    <Card.Subtitle>
                        {/* Start:: Row */}
                        <div className="row">
                            {/* Start:: Column name / company name*/}
                            <div className="col-md-10">
                                <h4>
                                    {props.pCorporateName ? subStr(props.pCorporateName, 20): subStr(props.pName, 20)}
                                </h4>
                            </div>
                            {/* End:: Column name / company name */}
                            
                            {/* Start:: Column menu */}
                            <div className="col-md-2 text-right">
                                {/* Start:: operational menu */}
                                <Dropdown autoClose="true">
                                    <Dropdown.Toggle 
                                        variant="light" 
                                        size="sm"
                                        align="end"
                                        drop="down" />
                                    
                                    <Dropdown.Menu>
                                        {/* Start:: order menu */}
                                        <Dropdown.Item 
                                            href="#" 
                                            className="pl-2"
                                            onClick={handelOpenOrder}>
                                            <span 
                                                className="pr-5">
                                                <PenTool className="feather-16 mr-3"/>Order
                                            </span>
                                        </Dropdown.Item>
                                        {/* End:: order menu */}

                                        {/* Start:: despatch menu */}
                                        <Dropdown.Item 
                                            href="#" 
                                            className="pl-2"
                                            onClick={handelOpenDespatch}>
                                            <span 
                                                className="pr-5">
                                                <ShoppingBag className="feather-16 mr-3"/>Despatch
                                            </span>
                                        </Dropdown.Item>
                                        {/* End:: despatch menu */}

                                        {/* Start:: bill menu */}
                                        <Dropdown.Item 
                                            href="#" 
                                            className="pl-2"
                                            onClick={handelOpenGenerateBill}>
                                            <span 
                                                className="pr-5">
                                                <FileText className="feather-16 mr-3"/>Bill
                                            </span>
                                        </Dropdown.Item>
                                        {/* End:: bill menu */}

                                        {/* Start:: payment menu */}
                                        <Dropdown.Item 
                                            href="#" 
                                            className="m-0 pl-2"
                                            onClick={handelOpenPayment} >
                                                <span 
                                                    className="pr-5">
                                                    <CreditCard className="feather-16 mr-3"/>Payment
                                                </span>
                                        </Dropdown.Item>
                                        {/* End:: payment menu */}

                                        {/* Start:: checkout menu */}
                                        {/* <Dropdown.Item 
                                            href="#" 
                                            className="m-0 pl-2"
                                            onClick={handelOpenCheckout} >
                                                <span 
                                                    className="pr-5">
                                                    <LogOut className="feather-16 mr-3"/>Check out
                                                </span>
                                        </Dropdown.Item> */}
                                        {/* End:: checkout menu */}

                                    </Dropdown.Menu>
                                    
                                </Dropdown>
                                {/* End:: operational menu */}
                            </div>
                            {/* End:: Column menu */}
                        </div>
                        {/* End:: Row */}
                    </Card.Subtitle>
                    {/* End:: card header */}

                    {/* Start:: card body */}
                    <Table striped size="sm" className="text-muted mb-0 mt-2">
                        <tbody>
                            <tr>
                                <td>{props.pCorporateName ? props.pCorporateAddress : `Mobile : ${props.pMobile}`}</td>
                                <td>{props.pCorporateName ? `GST No : ${props.pCorporateAddress}` : `Guest count : ${props.pGuestCount}`}</td>
                            </tr>
                            <tr>
                                <td>Expense : {formatINR(props.pTotalExpense)}</td>
                                <td className="text-danger">Due : {formatINR(props.pTotalBalance)}</td>
                            </tr>
                        </tbody>                            
                    </Table>
                    {/* End:: card body */}

                </Card.Body>
            </Card>
            {/* End :: card component */}

            {/* Start :: view component */}
            <View
                ref = {viewRef}
                pGuestId = {props.pGuestId} 
                pName = {props.pName}
                pMobile = {props.pMobile}
                pGuestCount = {props.pGuestCount}
                pCorporateName = {props.pCorporateName}
                pCorporateAddress = {props.pCorporateAddress}
                pGstNo = {props.pGstNo}
                onClosed = {handleClose} />
            {/* End :: view component */}

            {/* Start :: order component */}
            <Order 
                ref = {orderRef}
                pGuestId = {props.pGuestId} 
                pName = {props.pName}
                pMobile = {props.pMobile}
                pGuestCount = {props.pGuestCount}
                pCorporateName = {props.pCorporateName}
                pCorporateAddress = {props.pCorporateAddress}
                pGstNo = {props.pGstNo}
                onSaved = {props.onOrdered} 
                onClosed = {handleClose} />
            {/* End :: order component */}

            {/* Start :: despatch component */}
            <Despatch
                ref = {despatchRef}
                pGuestId = {props.pGuestId} 
                pName = {props.pName}
                pMobile = {props.pMobile}
                pGuestCount = {props.pGuestCount}
                pCorporateName = {props.pCorporateName}
                pCorporateAddress = {props.pCorporateAddress}
                pGstNo = {props.pGstNo}
                onSaved = {props.onDespatched} 
                onClosed = {handleClose} />
            {/* End :: despatch component */}

            {/* Start :: generate & display summery bill component */}
            <GenerateBill 
                ref = {generateBillRef}
                pGuestId = {props.pGuestId} 
                pName = {props.pName}
                pMobile = {props.pMobile}
                pGuestCount = {props.pGuestCount}
                pCorporateName = {props.pCorporateName}
                pCorporateAddress = {props.pCorporateAddress}
                pGstNo = {props.pGstNo}
                onSaved = {props.onBillGenerated} 
                // onClosed = {handleClose} 
                />
            {/* End :: generate & display summery bill component */}

            {/* Start :: add payment component */}
            <AddPayment 
                ref = {addPaymentRef}
                pGuestId = {props.pGuestId}    
                pName = {props.pName}
                pMobile = {props.pMobile}
                pCorporateName = {props.pCorporateName}
                pCorporateAddress = {props.pCorporateAddress}
                pBalance = {props.pTotalBalance}    
                onSaved = {props.onPaymentAdded}
                onClosed = {handleClose} />
            {/* End :: add payment component */}

            {/* Start :: delete employee component */}
            <Delete 
                ref = {deleteRef}
                pId = {props.pGuestId} 
                pName = {props.pName}
                onDeleted = {props.onDeleted} 
                onClosed = {handleClose} />
            {/* End :: delete employee component */}

        </>
    )
    // End:: Html

})


export default GuestMiscellaneousCard