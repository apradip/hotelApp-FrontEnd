import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Card, Badge, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ChevronsRight, Coffee, Umbrella, Wind, ShoppingBag, PenTool, FileText, Edit2, LogOut, Scissors, MoreVertical } from "react-feather";
import { subStr, formatINR, getRooms } from "../common/Common";
import TimeElapsed from "../common/TimeElapsed";

import View from "./GuestRoomView";
import Edit from "./GuestRoomEdit";
import Booking from "./GuestRoomBooking";
import GenerateBill from "./GuestRoomGenerateBill";
import AdvancePayment from "../common/GuestAdvancePaymentAdd";
import Checkout from "./GuestRoomCheckout";
import Delete from "./GuestRoomDelete";

import OrderTable from "../guestTable/GuestTableOrder";
import DespatchTable from "../guestTable/GuestTableDespatch";
import GenerateBillTable from "../guestTable/GuestTableGenerateBill";
import CheckoutTable from "../common/GuestCheckout";

import OrderService from "../guestService/GuestServiceOrder";
import DespatchService from "../guestService/GuestServiceDespatch";
import GenerateBillService from "../guestService/GuestServiceGenerateBill";
import CheckoutService from "../common/GuestCheckout";

import OrderMiscellaneous from "../guestMiscellaneous/GuestMiscellaneousOrder";
import DespatchMiscellaneous from "../guestMiscellaneous/GuestMiscellaneousDespatch";
import GenerateBillMiscellaneous from "../guestMiscellaneous/GuestMiscellaneousGenerateBill";
import CheckoutMiscellaneous from "../common/GuestCheckout";


const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <NavLink to = "#" className = "dropdown"   
        onClick={(e) => {e.preventDefault(); onClick(e);}}>
      {children}
    </NavLink>
));

// Start:: Component
// props parameters
// pIndex
// pId
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
// handelOpenEdit 
// handelOpenDelete
const GuestRoomCard = forwardRef((props, ref) => {
    const viewRef = useRef(null);
    const editRef = useRef(null);
    const deleteRef = useRef(null);
    const bookingRef = useRef(null);
    const generateBillRef = useRef(null);
    const advancePaymentRef = useRef(null);
    const checkoutRef = useRef(null);

    const orderTableRef = useRef(null);
    const despatchTableRef = useRef(null);
    const generateBillTableRef = useRef(null);
    const checkoutTableRef = useRef(null);

    const orderServiceRef = useRef(null);
    const despatchServiceRef = useRef(null);
    const generateBillServiceRef = useRef(null);
    const checkoutServiceRef = useRef(null);

    const orderMiscellaneousRef = useRef(null);
    const despatchMiscellaneousRef = useRef(null);
    const generateBillMiscellaneousRef = useRef(null);
    const checkoutMiscellaneousRef = useRef(null);

    const [focus, setFocus] = useState(false);
    const [active, setActive] = useState(false);


    // Start:: Show view modal 
    const handelOpenView = () => {
        try {
            viewRef && 
                viewRef.current.handleShowModal();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show view modal 

    // Start:: Show order modal 
    const handelOpenBooking = () => {
        try {
            bookingRef && 
                bookingRef.current.handleShowModal();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show order modal 

    // Start:: Show edit modal 
    const handelOpenEdit = () => {
        try {
            editRef && 
                editRef.current.handleShowModal();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show edit modal 

    // Start:: Show delete modal 
    const handelOpenDelete = () => {
        try {
            deleteRef && 
                deleteRef.current.handleShowModal();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show delete modal 
    
    // Start:: Close all modal 
    const handleClose = () => {
        props.onClosed();
    };
    // End:: Close all modal 

    // Start:: Show order modal 
    const handelOpenOrder = (option = "R") => {
        switch (option) {
            case "T" :
                orderTableRef && orderTableRef.current.handleShowModal();
                return;
                
            case "S" :
                orderServiceRef && orderServiceRef.current.handleShowModal();
                return;                

            case "M" :
                orderMiscellaneousRef && orderMiscellaneousRef.current.handleShowModal();
                return;

            default:
                generateBillRef && generateBillRef.current.handleShowModal();
                return;
        }
    };
    // End:: Show order modal 

    // Start:: Show despatch modal 
    const handelOpenDespatch = (option) => {
        switch (option) {
            case "T" :
                despatchTableRef && despatchTableRef.current.handleShowModal();
                return;
                
            case "S" :
                despatchServiceRef && despatchServiceRef.current.handleShowModal();
                return;                

            case "M" :
                despatchMiscellaneousRef && despatchMiscellaneousRef.current.handleShowModal();
                return;

            default:
                return;                
        }
    };
    // End:: Show despatch modal 
    
    // Start:: Show generate bill modal 
    const handelOpenGenerateBill = (option = "R") => {
        switch (option) {
            case "T" :
                generateBillTableRef && generateBillTableRef.current.handleShowModal();
                return;
                
            case "S" :
                generateBillServiceRef && generateBillServiceRef.current.handleShowModal();
                return;                

            case "M" :
                generateBillMiscellaneousRef && generateBillMiscellaneousRef.current.handleShowModal();
                return;
    
            default:
                generateBillRef && generateBillRef.current.handleShowModal();
                return;                
        }
    };
    // End:: Show generate bill modal 

    // Start:: Show generate bill modal 
    const handelOpenPayment = () => {
        advancePaymentRef && advancePaymentRef.current.handleShowModal();
    };
    // End:: Show generate bill modal 

    // Start:: Show checkout modal 
    const handelOpenCheckout = (option = "R") => {
        switch (option) {
            case "T" :
                checkoutTableRef && checkoutTableRef.current.handleShowModal();
                return;
                
            case "S" :
                checkoutServiceRef && checkoutServiceRef.current.handleShowModal();
                return;                

            case "M" :
                checkoutMiscellaneousRef && checkoutMiscellaneousRef.current.handleShowModal();
                return;
    
            default:
                checkoutRef && checkoutRef.current.handleShowModal();
                return;                
        }
    };
    // End:: Show checkout modal 
        

    // Start:: de-select card 
    const handleDeSelect = () => {
        try {
            setActive(false);
            setFocus(false);
        } catch (err) {
            console.log(err);
        }
    };
    // End:: de-select card
    

    // Start:: forward reff de-select, show edit/delete modal function
    useImperativeHandle(ref, () => {
        return {
            handleDeSelect, 
            handelOpenEdit,  
            handelOpenBooking, 
            handelOpenGenerateBill, 
            handelOpenDelete
        };
    });
    // Edit:: forward reff de-select, show edit/delete modal function

    // Start:: Html
    return (
        <>
            {/* Start :: card component */}
            <Card 
                ref = {ref}
                key = {props.pIndex}
                index = {props.pIndex}
                className = {"border"}
                border = {active ? "info" : focus ? "primary" : ""}  
                onMouseEnter = {() => setFocus(true)}
                onMouseLeave = {() => setFocus(false)} 
                onClick = {(e) => { 
                                    if (e.detail === 1) {
                                        setActive(!active); 
                                        props.onActivated(props.pIndex);
                                    }    
                                    else if (e.detail === 2) {
                                        handelOpenView();
                                    }  
                                }}>

                <Card.Body className="text-sm p-1">
                    <Row className="m-1">
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} className="p-0">
                            <b>{props.pCorporateName ? subStr(props.pCorporateName, 20): subStr(props.pName, 20)}</b>
                            {props.pOption === "R" &&
                            <Badge pill bg = "primary">R</Badge>}
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4} className={"text-right p-0 " + (props.pBalance >= 0 ? "text-success" : "text-danger")}>
                            <b>{formatINR(props.pBalance)}</b>
                        </Col>
                    </Row>

                    <Row className="d-none d-md-block d-lg-block d-xl-block m-1">
                        {props.pRooms ? 
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0">
                                Room(s): {getRooms(props.pRooms)}
                            </Col>
                        :
                            props.pCorporateName ?
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0">
                                    {subStr(props.pCorporateAddress, 30)}
                                </Col>
                                :
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0">
                                    Mobile no. {props.pMobile}
                                </Col>
                        }
                    </Row>        

                    <Row className="m-1">
                        <Col xs={10} sm={10} md={6} lg={6} xl={6} className="p-0">
                            {props.pGuestCount} no of guest(s)
                        </Col>
                        <Col xs={0} sm={0} md={5} lg={5} xl={5} className="d-none d-md-block d-lg-block d-xl-block text-right p-0">
                            <TimeElapsed
                                pInDate={props.pIndate}
                                pInTime={props.pInTime}/>
                        </Col>
                        <Col xs={2} sm={2} md={1} lg={1} xl={1} className="text-right p-0">

                            {/* Start:: operational menu */}
                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                    <MoreVertical size={16}/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {(props.pCallingFrom === "R") && 
                                        <>
                                            {/* Start :: Table menu */}
                                            <Dropdown autoClose="outside">
                                                <Dropdown.Toggle as={CustomToggle}>
                                                    <span className="dropdown-item">
                                                        <Coffee className="feather-16 mr-3"/>
                                                        Table
                                                        <ChevronsRight className="feather-16 float-right"/>
                                                    </span>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="dropdown-sub">
                                                    <Dropdown.Item eventKey="10" 
                                                        onClick={() => {handelOpenOrder("T")}}>
                                                        <PenTool className="feather-16 mr-3" />Order
                                                    </Dropdown.Item>
                                                    
                                                    <Dropdown.Item eventKey="11"
                                                        onClick={() => {handelOpenDespatch("T")}}>
                                                        <ShoppingBag className="feather-16 mr-3"/>Despatch
                                                    </Dropdown.Item>

                                                    <Dropdown.Item eventKey="12" 
                                                        disabled={props.pTransactionId !== "undefined" ? false : true}
                                                        onClick={() => {handelOpenGenerateBill("T")}}>
                                                        <FileText className="feather-16 mr-3"/>Bill
                                                    </Dropdown.Item>

                                                    {/* <Dropdown.Item eventKey="13"
                                                        disabled={props.pTransactionId !== "undefined" ? false : true}
                                                        onClick={() => {handelOpenCheckout("T")}}>
                                                        <LogOut className="feather-16 mr-3"/>Check out
                                                    </Dropdown.Item> */}

                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {/* End :: Table menu */}
                                                
                                            {/* Start :: Service menu */}        
                                            <Dropdown autoClose="outside">
                                                <Dropdown.Toggle as={CustomToggle} drop="end" variant="secondary">
                                                    <span className="dropdown-item">
                                                        <Umbrella className="feather-16 mr-3" />
                                                        Service
                                                        <ChevronsRight className="feather-16 float-end"/>
                                                    </span>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="dropdown-sub">
                                                    <Dropdown.Item eventKey="20" 
                                                        onClick={() => {handelOpenOrder("S")}}>
                                                        <PenTool className="feather-16 mr-3" />Order
                                                    </Dropdown.Item>
                                                    
                                                    <Dropdown.Item eventKey="21"
                                                        onClick={() => {handelOpenDespatch("S")}}>
                                                        <ShoppingBag className="feather-16 mr-3"/>Despatch
                                                    </Dropdown.Item>

                                                    <Dropdown.Item eventKey="22" 
                                                        disabled={props.pTransactionId !== "undefined" ? false : true}
                                                        onClick={() => {handelOpenGenerateBill("S")}}>
                                                        <FileText className="feather-16 mr-3"/>Bill
                                                    </Dropdown.Item>

                                                    {/* <Dropdown.Item eventKey="23"
                                                        disabled={props.pTransactionId !== "undefined" ? false : true}
                                                        onClick={() => {handelOpenCheckout("S")}}>
                                                        <LogOut className="feather-16 mr-3"/>Check out
                                                    </Dropdown.Item> */}

                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {/* End :: Service menu */}        

                                            {/* Start :: Miscellaneous menu */}               
                                            <Dropdown autoClose="outside">
                                                <Dropdown.Toggle as={CustomToggle} drop="end" variant="secondary">
                                                    <span className="dropdown-item">
                                                        <Wind className="feather-16 mr-3" />
                                                        Miscellaneous
                                                        <ChevronsRight className="feather-16 float-end"/>
                                                    </span>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="dropdown-sub">
                                                    <Dropdown.Item eventKey="30" 
                                                        onClick={() => {handelOpenOrder("M")}}>
                                                        <PenTool className="feather-16 mr-3" />Order
                                                    </Dropdown.Item>
                                                    
                                                    <Dropdown.Item eventKey="31"
                                                        onClick={() => {handelOpenDespatch("M")}}>
                                                        <ShoppingBag className="feather-16 mr-3"/>Despatch
                                                    </Dropdown.Item>

                                                    <Dropdown.Item eventKey="32" 
                                                        onClick={() => {handelOpenGenerateBill("M")}}>
                                                        <FileText className="feather-16 mr-3"/>Bill
                                                    </Dropdown.Item>

                                                    {/* <Dropdown.Item eventKey="33"
                                                        onClick={() => {handelOpenCheckout("M")}}>
                                                        <LogOut className="feather-16 mr-3"/>Check out
                                                    </Dropdown.Item> */}

                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {/* End :: Miscellaneous menu */}               

                                            <Dropdown.Divider />

                                            {/* Start :: Room menu */}                       
                                            <Dropdown.Item eventKey = "1" 
                                                onClick = {() => {handelOpenBooking()}}>
                                                <PenTool className = "feather-16 mr-3" />Booking
                                            </Dropdown.Item>

                                            <Dropdown.Item eventKey = "2" 
                                                disabled = {props.pTransactionId !== "undefined" ? false : true}
                                                onClick = {() => {handelOpenGenerateBill()}}>
                                                <FileText className = "feather-16 mr-3"/>Bill
                                            </Dropdown.Item>

                                            <Dropdown.Item eventKey = "3" 
                                                disabled = {props.pTransactionId !== "undefined" ? false : true}
                                                onClick = {() => {handelOpenPayment()}}>
                                                <FileText className = "feather-16 mr-3"/>Payment
                                            </Dropdown.Item>

                                            <Dropdown.Item eventKey = "4"
                                                disabled = {props.pTransactionId !== "undefined" ? false : true}
                                                onClick = {() => {handelOpenCheckout()}}>
                                                <LogOut className="feather-16 mr-3"/>Check out
                                            </Dropdown.Item>

                                            <Dropdown.Divider />

                                            <Dropdown.Item eventKey = "5" 
                                                onClick = {() => {handelOpenEdit()}}>
                                                <Edit2 className = "feather-16 mr-3"/>Edit
                                            </Dropdown.Item>

                                            <Dropdown.Item eventKey = "6" 
                                                onClick = {handelOpenDelete}>
                                                <Scissors className = "feather-16 mr-3"/>Delete
                                            </Dropdown.Item>
                                            {/* End :: Room menu */}                       
                                        </>}


                                        {(props.pCallingFrom === "T") && 
                                            <>
                                                {/* Start :: Table menu */}
                                                <Dropdown.Item eventKey="10" 
                                                    onClick={() => {handelOpenOrder("T")}}>
                                                    <PenTool className="feather-16 mr-3" />Order
                                                </Dropdown.Item>
                                                
                                                <Dropdown.Item eventKey="11"
                                                    onClick={() => {handelOpenDespatch("T")}}>
                                                    <ShoppingBag className="feather-16 mr-3"/>Despatch
                                                </Dropdown.Item>

                                                <Dropdown.Item eventKey="12" 
                                                    disabled={props.pTransactionId !== "undefined" ? false : true}
                                                    onClick={() => {handelOpenGenerateBill("T")}}>
                                                    <FileText className="feather-16 mr-3"/>Bill
                                                </Dropdown.Item>

                                                {/* <Dropdown.Item eventKey="13"
                                                    disabled={props.pTransactionId !== "undefined" ? false : true}
                                                    onClick={() => {handelOpenCheckout("T")}}>
                                                    <LogOut className="feather-16 mr-3"/>Check out
                                                </Dropdown.Item> */}
                                                {/* End :: Room menu */}                       
                                            </>}                                        


                                        {(props.pCallingFrom === "S") && 
                                            <>
                                                {/* Start :: Service menu */}        
                                                <Dropdown.Item eventKey="20" 
                                                    onClick={() => {handelOpenOrder("S")}}>
                                                    <PenTool className="feather-16 mr-3" />Order
                                                </Dropdown.Item>
                                                
                                                <Dropdown.Item eventKey="21"
                                                    onClick={() => {handelOpenDespatch("S")}}>
                                                    <ShoppingBag className="feather-16 mr-3"/>Despatch
                                                </Dropdown.Item>

                                                <Dropdown.Item eventKey="22" 
                                                    disabled={props.pTransactionId !== "undefined" ? false : true}
                                                    onClick={() => {handelOpenGenerateBill("S")}}>
                                                    <FileText className="feather-16 mr-3"/>Bill
                                                </Dropdown.Item>

                                                {/* <Dropdown.Item eventKey="23"
                                                    disabled={props.pTransactionId !== "undefined" ? false : true}
                                                    onClick={() => {handelOpenCheckout("S")}}>
                                                    <LogOut className="feather-16 mr-3"/>Check out
                                                </Dropdown.Item> */}
                                                {/* End :: Service menu */}        
                                            </>}


                                        {(props.pCallingFrom === "M") && 
                                            <>
                                                {/* Start :: Miscellaneous menu */}               
                                                <Dropdown.Item eventKey="30" 
                                                    onClick={() => {handelOpenOrder("M")}}>
                                                    <PenTool className="feather-16 mr-3" />Order
                                                </Dropdown.Item>
                                                
                                                <Dropdown.Item eventKey="31"
                                                    onClick={() => {handelOpenDespatch("M")}}>
                                                    <ShoppingBag className="feather-16 mr-3"/>Despatch
                                                </Dropdown.Item>

                                                <Dropdown.Item eventKey="32" 
                                                    onClick={() => {handelOpenGenerateBill("M")}}>
                                                    <FileText className="feather-16 mr-3"/>Bill
                                                </Dropdown.Item>

                                                {/* <Dropdown.Item eventKey="33"
                                                    onClick={() => {handelOpenCheckout("M")}}>
                                                    <LogOut className="feather-16 mr-3"/>Check out
                                                </Dropdown.Item> */}
                                                {/* End :: Miscellaneous menu */}               
                                                {/* End :: Room menu */}                       
                                            </>}

                                </Dropdown.Menu> 
                            </Dropdown>
                            {/* End:: operational menu */}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* End :: card component */}


            {/* Start :: Room component */}
            <>
                {/* Start :: view component */}
                <View
                    ref = {viewRef}
                    pGuestId = {props.pGuestId} 
                    onClosed = {() => {handleClose()}}/>
                {/* End :: view room details component */}

                {/* Start :: edit component */}
                <Edit 
                    ref = {editRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => props.onEdited()} 
                    onClosed = {() => {handleClose()}}/>
                {/* End :: edit component */}

                {/* Start :: delete component */}
                <Delete 
                    ref = {deleteRef}
                    pGuestId = {props.pGuestId} 
                    pName = {props.pName}
                    onDeleted = {() => {props.onDeleted()}} 
                    onClosed = {() => {handleClose()}}/>
                {/* End :: delete component */}

                {/* Start :: booking component */}
                <Booking
                    ref = {bookingRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onBooked()}} 
                    onClosed = {() => {handleClose()}}/>
                {/* End :: booking component */}

                {/* Start :: generate & display summery bill component */}
                <GenerateBill 
                    ref = {generateBillRef}
                    pGuestId = {props.pGuestId} 
                    onPaymentAdded = {props.onPaymentAdded}
                    onSaved = {() => {props.onBillGenerated()}}
                    onClosed = {() => {handleClose()}}/>
                {/* End :: generate & display summery bill component */}

                {/* Start :: add payment component */}
                <AdvancePayment 
                    ref = {advancePaymentRef}
                    pGuestId = {props.pGuestId}    
                    pName = {props.pName}
                    pMobile = {props.pMobile}
                    pCorporateName = {props.pCorporateName}
                    pCorporateAddress = {props.pCorporateAddress}
                    onSaved = {() => {props.onPaymentAdded()}} 
                    onClosed = {() => {handleClose()}}/>
                {/* End :: add payment component */}

                {/* Start :: checkout component */}
                <Checkout
                    ref = {checkoutRef}
                    pGuestId = {props.pGuestId} 
                    pName = {props.pName}
                    pCorporateName = {props.pCorporateName}
                    onSaved = {() => {props.onCheckedout()}} 
                    onClosed = {() => {handleClose()}}/>
                {/* End :: checkout component */}
            </>
            {/* End :: Room component */}


            {/* Start :: Table components */}            
            <>
                {/* Start :: order component */}
                <OrderTable 
                    ref = {orderTableRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onOrdered()}} 
                    onClosed = {() => {handleClose()}}/>
                {/* End :: order component */}

                {/* Start :: despatch component */}
                <DespatchTable
                    ref = {despatchTableRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onDespatched()}} 
                    onClosed = {() => {handleClose()}}/>
                {/* End :: despatch component */}

                {/* Start :: generate & display summery bill component */}
                <GenerateBillTable 
                    ref = {generateBillTableRef}
                    pGuestId = {props.pGuestId} 
                    onPaymentAdded = {() => {props.onPaymentAdded()}}
                    onSaved = {() => {props.onBillGenerated()}}
                    onClosed = {() => {handleClose()}}/>
                {/* End :: generate & display summery bill component */}

                {/* Start :: tables checkout component */}
                <CheckoutTable
                    ref = {checkoutTableRef}
                    pGuestId = {props.pGuestId} 
                    pName = {props.pName}
                    pCorporateName = {props.pCorporateName}
                    onSaved = {() => {props.onCheckedout()}} 
                    onClosed = {() => {handleClose()}}/>
                {/* End :: tables checkout component */}
            </>
            {/* End :: Table components */}            


            {/* Start :: Service components */}
            <>
                {/* Start :: order component */}
                <OrderService 
                    ref = {orderServiceRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onOrdered()}} 
                    onClosed = {() => {handleClose()}} />
                {/* End :: order component */}

                {/* Start :: despatch component */}
                <DespatchService
                    ref = {despatchServiceRef}
                    pGuestId = {props.pGuestId}
                    onSaved = {() => {props.onDespatched()}} 
                    onClosed = {() => {handleClose()}} />
                {/* End :: despatch component */}

                {/* Start :: generate & display summery bill component */}
                <GenerateBillService 
                    ref = {generateBillServiceRef}
                    pGuestId = {props.pGuestId} 
                    onPaymentAdded = {() => {props.onPaymentAdded()}}
                    onSaved = {() => {props.onBillGenerated()}} 
                    onClosed = {() => {handleClose()}} />
                {/* End :: generate & display bill component */}

                {/* Start :: checkout component */}
                <CheckoutService
                    ref = {checkoutServiceRef}
                    pGuestId = {props.pGuestId} 
                    pName = {props.pName}
                    pCorporateName = {props.pCorporateName}
                    onSaved = {() => {props.onCheckedout()}} 
                    onClosed = {() => {handleClose()}}/>
                {/* End :: checkout component */}
            </>            
            {/* End :: Service components */}            


            {/* Start :: miscellaneous components */}            
            <>
                {/* Start :: miscellaneous order component */}
                <OrderMiscellaneous 
                    ref = {orderMiscellaneousRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onOrdered()}} 
                    onClosed = {() => {handleClose()}} />
                {/* End :: miscellaneous order component */}

                {/* Start :: miscellaneous despatch component */}
                <DespatchMiscellaneous
                    ref = {despatchMiscellaneousRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onDespatched()}} 
                    onClosed = {() => {handleClose()}} />
                {/* End :: miscellaneous despatch component */}

                {/* Start :: miscellaneous generate & display summery bill component */}
                <GenerateBillMiscellaneous 
                    ref = {generateBillMiscellaneousRef}
                    pGuestId = {props.pGuestId} 
                    onPaymentAdded = {props.onPaymentAdded}
                    onSaved = {() => {props.onBillGenerated()}}
                    onClosed = {() => {handleClose()}} />
                {/* End :: miscellaneous generate & display summery bill component */}

                {/* Start :: miscellaneous checkout component */}
                <CheckoutMiscellaneous
                    ref = {checkoutMiscellaneousRef}
                    pGuestId = {props.pGuestId} 
                    pName = {props.pName}
                    pCorporateName = {props.pCorporateName}
                    onSaved = {props.onCheckedout} 
                    onClosed = {() => {handleClose()}} />
                {/* End :: miscellaneous checkout component */}
            </>
            {/* End :: miscellaneous components */} 

        </>
    );
    // End:: Html

});


export default GuestRoomCard;