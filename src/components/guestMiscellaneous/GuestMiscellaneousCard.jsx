import React, {useState, useRef, forwardRef, useImperativeHandle} from "react";
import {Card, Dropdown, Stack} from "react-bootstrap";
import TimeElapsed from "../common/TimeElapsed";
import {NavLink} from "react-router-dom";
import {PenTool, ShoppingBag, FileText, CreditCard, LogOut, ChevronDown} from "react-feather";

import {subStr, formatINR} from "../common/Common";

import View from "./GuestMiscellaneousView";
import Order from "./GuestMiscellaneousOrder";
import Despatch from "./GuestMiscellaneousDespatch";
import GenerateBill from "./GuestMiscellaneousGenerateBill";
import AddPayment from "../guestPayment/GuestPaymentAdd";
import Checkout from "./GuestMiscellaneousCheckout";
import Delete from "./GuestMiscellaneousDelete";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <NavLink to="#" className="dropdown" ref={ref} 
        onClick={(e) => {e.preventDefault(); onClick(e);}}>
      {children}
    </NavLink>
));

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
// handelOpenCheckout
// handelOpenDelete
const GuestMiscellaneousCard = forwardRef((props, ref) => {
    const viewRef = useRef(null);
    const orderRef = useRef(null);
    const despatchRef = useRef(null);
    const generateBillRef = useRef(null);
    const addPaymentRef = useRef(null);
    const checkoutRef = useRef(null);
    const deleteRef = useRef(null);
    const [focus, setFocus] = useState(false);
    const [active, setActive] = useState(false);

    // Start:: Show view modal 
    const handelOpenView = () => {
        viewRef && viewRef.current.handleShowModal();
    };
    // End:: Show view modal 

    // Start:: Show order modal 
    const handelOpenOrder = () => {
        orderRef && orderRef.current.handleShowModal();
    };
    // End:: Show order modal 

    // Start:: Show despatch modal 
    const handelOpenDespatch = () => {
        despatchRef && despatchRef.current.handleShowModal();
    };
    // End:: Show despatch modal 
    
    // Start:: Show generate bill modal 
    const handelOpenGenerateBill = () => {
        generateBillRef && generateBillRef.current.handleShowModal();
    };
    // End:: Show generate bill modal 

    // Start:: Show payment modal 
    const handelOpenPayment = () => {
        addPaymentRef && addPaymentRef.current.handleShowModal();
    };
    // End:: Show payment modal 
    
    // Start:: Show checkout modal 
    const handelOpenCheckout = () => {
        checkoutRef && checkoutRef.current.handleShowModal();
    };
    // End:: Show checkout modal 
    
    // Start:: Show delete modal 
    const handelOpenDelete = () => {
        deleteRef && deleteRef.current.handleShowModal();
    };
    // End:: Show delete modal 
    
    // Start:: Close all modal 
    const handleClose = () => {
        props.onClosed();
    };
    // End:: Close all modal 

    // Start:: de-select card 
    const handleDeSelect = () => {
        setActive(false);
        setFocus(false);
    };
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
    });
    // End:: forward reff de-select, show edit/delete modal function

    // Start:: Html
    return (
        <>
            {/* Start :: card component */}
            <Card 
                key={props.pIndex}
                index={props.pIndex}
                className={"border"}
                border={active ? "info" : focus ? "primary" : ""}  
                ref={ref}
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

                {/* Start:: card body */}
                <Card.Body className="text-sm p-1"> 
                    <Stack gap={1}>
                        <Stack direction="horizontal" gap={0}>
                            <span className="col-10 text-left">
                                <TimeElapsed
                                    pInDate = {props.pIndate}
                                    pInTime = {props.pInTime} />
                            </span>

                            {/* Start:: Column menu */}
                            <span className="col-2 text-right">
                                {/* Start:: operational menu */}
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle}>
                                        <ChevronDown size={16}/>
                                    </Dropdown.Toggle>
                                    
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="1" 
                                            onClick = {handelOpenOrder}>
                                            <PenTool className="feather-16 mr-3" />Order
                                        </Dropdown.Item>

                                        <Dropdown.Item eventKey="2"
                                            onClick = {handelOpenDespatch}>
                                            <ShoppingBag className="feather-16 mr-3"/>Despatch
                                        </Dropdown.Item>

                                        <Dropdown.Item eventKey="3" 
                                            onClick = {handelOpenGenerateBill}>
                                            <FileText className="feather-16 mr-3"/>Bill
                                        </Dropdown.Item>

                                        <Dropdown.Item eventKey="4"
                                            onClick = {handelOpenPayment}>
                                            <CreditCard className="feather-16 mr-3"/>Payment
                                        </Dropdown.Item>

                                        <Dropdown.Item eventKey="5"
                                            onClick = {handelOpenCheckout}>
                                            <LogOut className="feather-16 mr-3"/>Check out
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {/* End:: operational menu */}
                            </span>
                            {/* End:: Column menu */}
                        </Stack>

                        <Stack gap={0}>
                            <div className="col-12">
                                {props.pCorporateName ? subStr(props.pCorporateName, 40): subStr(props.pName, 40)}
                            </div>
                        </Stack>

                        <Stack gap={0}>
                            {props.pCorporateName ?
                                <span className="col-12">{subStr(props.pCorporateAddress, 40)}</span>
                                :
                                <Stack direction="horizontal" gap={0}>
                                    <span className="col-6 text-left">
                                        Mobile : {props.pMobile}</span>

                                    <span className="col-6 text-right">
                                        Guest count : {props.pGuestCount}</span>
                                </Stack> 
                            }
                        </Stack>        

                        <Stack direction="horizontal" gap={0}>
                            <span className="col-6 text-left">
                                Expense : {formatINR(props.pTotalExpense)}</span>
                                
                            <span className="col-6 text-right text-danger">
                                    Due : {formatINR(props.pTotalBalance)}</span>
                        </Stack>
                    </Stack>
                </Card.Body>
                {/* End:: card body */}
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

            {/* Start :: checkout component */}
            <Checkout
                ref = {checkoutRef}
                pGuestId = {props.pGuestId} 
                pName = {props.pName}
                pCorporateName = {props.pCorporateName}
                onSaved = {props.onCheckedout} 
                onClosed = {handleClose} />
            {/* End :: checkout component */}

            {/* Start :: delete employee component */}
            <Delete 
                ref = {deleteRef}
                pId = {props.pGuestId} 
                pName = {props.pName}
                onDeleted = {props.onDeleted} 
                onClosed = {handleClose} />
            {/* End :: delete employee component */}

        </>
    );
    // End:: Html

});

export default GuestMiscellaneousCard;