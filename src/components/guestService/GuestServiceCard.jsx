import React, {useState, useRef, forwardRef, useImperativeHandle} from "react";
import {Card, Dropdown, Stack} from "react-bootstrap";
import TimeElapsed from "../common/TimeElapsed";
import {NavLink} from "react-router-dom";
import {PenTool, ShoppingBag, FileText, CreditCard, LogOut, Scissors, MoreVertical} from "react-feather";
import {subStr, formatINR} from "../common/Common";

import View from "./GuestServiceView";
import Order from "./GuestServiceOrder";
import Despatch from "./GuestServiceDespatch";
import GenerateBill from "./GuestServiceGenerateBill";
import AddPayment from "../guestPayment/GuestPaymentAdd";
import Checkout from "./GuestServiceCheckout";
import Delete from "./GuestServiceDelete";

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
const GuestServiceCard = forwardRef((props, ref) => {
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
                ref={ref}
                key={props.pIndex}
                index={props.pIndex}
                className={"border"}
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

                {/* Start:: card body */}
                <Card.Body className="text-sm p-1"> 
                    <Stack gap={1}>
                        <Stack direction="horizontal" gap={0}>
                            <span className="col-9 text-left pl-1">
                                <b>{props.pCorporateName ? subStr(props.pCorporateName, 40): subStr(props.pName, 40)}</b>
                            </span>

                            <span className="col-3 text-right text-danger pr-1">
                                <b>{formatINR(props.pTotalBalance)}</b>
                            </span>
                        </Stack>

                        <Stack gap={0}>
                            {props.pCorporateName ?
                                <span className="col-12 px-1">{subStr(props.pCorporateAddress, 40)}</span>
                                :
                                <Stack direction="horizontal" gap={0}>
                                    <span className="col-12 text-left px-1">
                                        Mobile No. {props.pMobile}</span>
                                </Stack> 
                            }
                        </Stack>        

                        <Stack direction="horizontal" gap={0}>
                            <span className="col-6 text-left pl-1">
                                {props.pGuestCount} no of guest(s)</span>

                            <span className="col-5 text-right pr-0">
                                <TimeElapsed
                                    pInDate={props.pIndate}
                                    pInTime={props.pInTime}/>
                            </span>

                            <span className="col-1 text-right pr-1">
                                {/* Start:: operational menu */}
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle}>
                                        <MoreVertical size={16}/>
                                    </Dropdown.Toggle>
                                    
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="1" 
                                            onClick={handelOpenOrder}>
                                            <PenTool className="feather-16 mr-3" />Order
                                        </Dropdown.Item>

                                        <Dropdown.Item eventKey="2"
                                            disabled={props.pTransactionId !== 'undefined' ? false : true}
                                            onClick={handelOpenDespatch}>
                                            <ShoppingBag className="feather-16 mr-3"/>Despatch
                                        </Dropdown.Item>

                                        <Dropdown.Item eventKey="3" 
                                            disabled={props.pTransactionId !== 'undefined' ? false : true}
                                            onClick={handelOpenGenerateBill}>
                                            <FileText className="feather-16 mr-3"/>Bill
                                        </Dropdown.Item>

                                        <Dropdown.Item eventKey="4"
                                            disabled={props.pTransactionId !== 'undefined' ? false : true}
                                            onClick={handelOpenPayment}>
                                            <CreditCard className="feather-16 mr-3"/>Payment
                                        </Dropdown.Item>

                                        <Dropdown.Item eventKey="5"
                                            disabled={props.pTransactionId !== 'undefined' ? false : true}
                                            onClick={handelOpenCheckout}>
                                            <LogOut className="feather-16 mr-3"/>Check out
                                        </Dropdown.Item>

                                        <Dropdown.Item eventKey="6" 
                                            disabled={props.pTransactionId === 'undefined' ? false : true}
                                            onClick={handelOpenDelete}>
                                            <Scissors className="feather-16 mr-3"/>Delete
                                        </Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                                {/* End:: operational menu */}

                                    
                            </span>
                        </Stack>
                    </Stack>
                </Card.Body>
                {/* End:: card body */}
            </Card>
            {/* End :: card component */}

            {/* Start :: view component */}
            <View
                ref={viewRef}
                pGuestId={props.pGuestId} 
                pName={props.pName}
                pMobile={props.pMobile}
                pGuestCount={props.pGuestCount}
                pCorporateName={props.pCorporateName}
                pCorporateAddress={props.pCorporateAddress}
                pGstNo={props.pGstNo}
                onClosed={handleClose}/>
            {/* End :: view component */}

            {/* Start :: order component */}
            <Order 
                ref={orderRef}
                pGuestId={props.pGuestId} 
                pTransactionId={props.pTransactionId}
                pName={props.pName}
                pMobile={props.pMobile}
                pGuestCount={props.pGuestCount}
                pCorporateName={props.pCorporateName}
                pCorporateAddress={props.pCorporateAddress}
                pGstNo={props.pGstNo}
                onSaved={props.onOrdered} 
                onClosed={handleClose}/>
            {/* End :: order component */}

            {/* Start :: despatch component */}
            <Despatch
                ref={despatchRef}
                pGuestId={props.pGuestId}
                pTransactionId={props.pTransactionId} 
                pName={props.pName}
                pMobile={props.pMobile}
                pGuestCount={props.pGuestCount}
                pCorporateName={props.pCorporateName}
                pCorporateAddress={props.pCorporateAddress}
                pGstNo={props.pGstNo}
                onSaved={props.onDespatched} 
                onClosed={handleClose}/>
            {/* End :: despatch component */}

            {/* Start :: generate & display summery bill component */}
            <GenerateBill 
                ref={generateBillRef}
                pGuestId={props.pGuestId} 
                pTransactionId={props.pTransactionId}
                pName={props.pName}
                pMobile={props.pMobile}
                pGuestCount={props.pGuestCount}
                pCorporateName={props.pCorporateName}
                pCorporateAddress={props.pCorporateAddress}
                pGstNo={props.pGstNo}
                onSaved={props.onBillGenerated} 
                onClosed={handleClose}/>
            {/* End :: generate & display bill component */}

            {/* Start :: add payment component */}
            <AddPayment 
                ref={addPaymentRef}
                pGuestId={props.pGuestId}    
                pTransactionId={props.pTransactionId}
                pName={props.pName}
                pMobile={props.pMobile}
                pCorporateName={props.pCorporateName}
                pCorporateAddress={props.pCorporateAddress}
                pBalance={props.pTotalBalance}    
                onSaved={props.onPaymentAdded}
                onClosed={handleClose}/>
            {/* End :: add payment component */}

            {/* Start :: checkout component */}
            <Checkout
                ref={checkoutRef}
                pGuestId={props.pGuestId} 
                pTransactionId={props.pTransactionId}
                pName={props.pName}
                pCorporateName={props.pCorporateName}
                onSaved={props.onCheckedout} 
                onClosed={handleClose}/>
            {/* End :: checkout component */}

            {/* Start :: delete employee component */}
            <Delete 
                ref={deleteRef}
                pId={props.pGuestId} 
                pName={props.pName}
                onDeleted={props.onDeleted} 
                onClosed={handleClose}/>
            {/* End :: delete employee component */}

        </>
    );
    // End:: Html

});

export default GuestServiceCard;