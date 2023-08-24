import React, { useState, useContext, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Card, Badge, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Users, MapPin, Home, Calendar, Phone, ChevronsRight, Coffee, Umbrella, Wind, ShoppingBag, PenTool, FileText, Edit2, LogOut, Scissors, MoreVertical } from "react-feather";
import { Operation, getRooms, subStr, properCase, formatDDMMYYYY, formatINR } from "../common/Common";
import { toast } from "react-toastify";
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
import CheckoutTable from "../guestTable/GuestTableCheckout";

import OrderService from "../guestService/GuestServiceOrder";
import DespatchService from "../guestService/GuestServiceDespatch";
import GenerateBillService from "../guestService/GuestServiceGenerateBill";
import CheckoutService from "../guestService/GuestServiceCheckout";

import OrderMiscellaneous from "../guestMiscellaneous/GuestMiscellaneousOrder";
import DespatchMiscellaneous from "../guestMiscellaneous/GuestMiscellaneousDespatch";
import GenerateBillMiscellaneous from "../guestMiscellaneous/GuestMiscellaneousGenerateBill";
import CheckoutMiscellaneous from "../guestMiscellaneous/GuestMiscellaneousCheckout";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetchWithAuth from "../common/useFetchWithAuth";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <NavLink to = "#" className = "dropdown"   
        onClick={(e) => {e.preventDefault(); onClick(e);}}>
      {children}
    </NavLink>
));

// Start:: Component
// props parameters
// pIndex
// pGuestId
// onActivated()

// useImperativeHandle
// handleDeSelect
// handelOpenEdit 
// handelOpenDelete
// handelRefresh
// getGuestId

const GuestRoomCard = forwardRef((props, ref) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();

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

    const [corporateName, setCorporateName] = useState();
    const [corporateAddress, setCorporateAddress] = useState();
    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const [guestCount, setGuestCount] = useState();
    const [balance, setBalance] = useState();
    const [rooms, setRooms] = useState();
    const [inDate, setInDate] = useState();
    const [outDate, setOutDate] = useState();

    const [focus, setFocus] = useState(false);
    const [active, setActive] = useState(false);

    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestRoomAPI}/${hotelId}/${props.pGuestId}`,
        params: {option: "N"}
    });

    // Start:: fetch data list from api
    useEffect(() => {
        (async () => {
            try {
                await doFetch();
            } catch (err) {
                console.log(err);
            }
            })();
    }, []);      // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch data list from api
    
    // Start:: set data to state variables
    useEffect(() => {
        try {
            error && toast.error(error);

            data && setCorporateName(data.corporateName);
            data && setCorporateAddress(data.corporateAddress); 
            data && setName(data.name);
            data && setMobile(data.mobile);
            data && setGuestCount(data.guestCount);  
            data && setBalance(data.balance);
            data && setRooms(data.rooms);
            data && setInDate(data.inDate);
            data && setOutDate(data.outDate);
            
            data && setFocus(true);
            data && setActive(true);
        } catch (err) {
            console.log(err);
        }        
    }, [data, error, loading]);
    // End:: set data to state variables

    // Start :: get guest Id of this component
    const getGuestId = () => {return props.pGuestId;}
    // End :: get guest Id of this component

    // Start:: get data from api
    const handelRefresh = async () => {
        try {
            await doFetch()
        } catch (err) {
            console.log(err);
        }
    };
    // End:: get data from api
    
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
            handelOpenDelete,
            handelOpenBooking, 
            handelOpenGenerateBill,
            handelRefresh,
            getGuestId
        };
    });
    // Edit:: forward reff de-select, show edit/delete modal function

    // Start:: Html
    return (
        <>
            {/* Start :: card component */}
            <Card 
                ref = {ref}
                key = {`RC_${props.pGuestId}`}
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
                            {corporateName ?
                                <>
                                    <MapPin className="feather-16 mr-2"/>
                                    <b>{properCase(subStr(corporateName, 20))}</b>
                                </>
                            :
                                <>
                                    <Users className="feather-16 mr-2"/>
                                    <b>{properCase(subStr(name, 20))}</b>
                                </>
                            }

                            <Badge pill bg = "primary">R</Badge>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4} className={"text-right p-0 " + (balance >= 0 ? "text-success" : "text-danger")}>
                            <b>{formatINR(balance)}</b>
                        </Col>
                    </Row>

                    <Row className="d-none d-md-block d-lg-block d-xl-block text-mutedl m-1">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0">
                        {rooms ? 
                            <>
                                <Home className="feather-16 mr-2"/>
                                {getRooms(rooms)}
                            </>
                        :
                            corporateName ?
                                <>
                                    {properCase(subStr(corporateAddress, 30))}
                                </>
                            :
                                <>
                                    <Phone className="feather-16 mr-2"/>
                                    {mobile}
                                </>
                        }
                        </Col>
                    </Row>        

                    {(props.pCallingFrom === "R") && 
                        <Row className="text-mutedl p-0 m-1">
                            <Col xs={12} sm={12} md={6} lg={6} xl={6} className="p-0">
                                <Calendar className="feather-16 mr-2"/>
                                {formatDDMMYYYY(inDate)}
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6} className="text-right p-0">
                                <Calendar className="feather-16 mr-2"/>
                                {formatDDMMYYYY(outDate)}
                            </Col>
                        </Row>}        

                    <Row className="m-1">
                        <Col xs={10} sm={10} md={6} lg={6} xl={6} className="p-0">
                            {guestCount} guest(s)
                        </Col>
                        <Col xs={0} sm={0} md={5} lg={5} xl={5} className="d-none d-md-block d-lg-block d-xl-block text-right p-0">
                            <TimeElapsed
                                pInDate={inDate}/>
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

                                            <Dropdown.Divider />

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

                                                    <Dropdown.Item eventKey="13"
                                                        disabled={props.pTransactionId !== "undefined" ? false : true}
                                                        onClick={() => {handelOpenCheckout("T")}}>
                                                        <LogOut className="feather-16 mr-3"/>Check out
                                                    </Dropdown.Item>

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
                    pGuestId = {props.pGuestId} />
                {/* End :: view room details component */}

                {/* Start :: edit component */}
                <Edit 
                    ref = {editRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => props.onEdited(Operation.GuestMod, props.pGuestId)} />
                {/* End :: edit component */}

                {/* Start :: delete component */}
                <Delete 
                    ref = {deleteRef}
                    pGuestId = {props.pGuestId} 
                    pName = {props.pName}
                    onDeleted = {() => {props.onDeleted(Operation.GuestDel, props.pGuestId)}} />
                {/* End :: delete component */}

                {/* Start :: booking component */}
                <Booking
                    ref = {bookingRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onBooked(Operation.Booked, props.pGuestId)}} />
                {/* End :: booking component */}

                {/* Start :: generate & display summery bill component */}
                <GenerateBill 
                    ref = {generateBillRef}
                    pGuestId = {props.pGuestId} 
                    onPaymentAdded = {props.onPaymentAdded}
                    onSaved = {() => {props.onBillGenerated(Operation.BillGenerate, props.pGuestId)}} />
                {/* End :: generate & display summery bill component */}

                {/* Start :: add payment component */}
                <AdvancePayment 
                    ref = {advancePaymentRef}
                    pGuestId = {props.pGuestId}    
                    pName = {props.pName}
                    pMobile = {props.pMobile}
                    pCorporateName = {props.pCorporateName}
                    pCorporateAddress = {props.pCorporateAddress}
                    onSaved = {() => {props.onPaymentAdded(Operation.Room_PaymentAdd, props.pGuestId)}} />
                {/* End :: add payment component */}

                {/* Start :: checkout component */}
                <Checkout
                    ref = {checkoutRef}
                    pGuestId = {props.pGuestId} 
                    pName = {props.pName}
                    pCorporateName = {props.pCorporateName}
                    onSaved = {() => {props.onCheckedout(Operation.Room_Checkout, props.pGuestId)}} />
                {/* End :: checkout component */}
            </>
            {/* End :: Room component */}

            {/* Start :: Table components */}            
            <>
                {/* Start :: order component */}
                <OrderTable 
                    ref = {orderTableRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onOrdered(Operation.Table_Order, props.pGuestId)}} />
                {/* End :: order component */}

                {/* Start :: despatch component */}
                <DespatchTable
                    ref = {despatchTableRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onDespatched(Operation.Table_Despatch, props.pGuestId)}} />
                {/* End :: despatch component */}

                {/* Start :: generate & display summery bill component */}
                <GenerateBillTable 
                    ref = {generateBillTableRef}
                    pGuestId = {props.pGuestId} 
                    onPaymentAdded = {() => {props.onPaymentAdded(Operation.Table_PaymentAdd, props.pGuestId)}}
                    onSaved = {() => {props.onBillGenerated(Operation.Table_Checkout, props.pGuestId)}} />
                {/* End :: generate & display summery bill component */}

                {/* Start :: tables checkout component */}
                <CheckoutTable
                    ref = {checkoutTableRef}
                    pGuestId = {props.pGuestId} 
                    pName = {props.pName}
                    pCorporateName = {props.pCorporateName}
                    onSaved = {() => {props.onCheckedout(Operation.Table_Checkout, props.pGuestId)}} />
                {/* End :: tables checkout component */}
            </>
            {/* End :: Table components */}            

            {/* Start :: Service components */}
            <>
                {/* Start :: order component */}
                <OrderService 
                    ref = {orderServiceRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onOrdered(Operation.Service_Despatch, props.pGuestId)}} />
                {/* End :: order component */}

                {/* Start :: despatch component */}
                <DespatchService
                    ref = {despatchServiceRef}
                    pGuestId = {props.pGuestId}
                    onSaved = {() => {props.onDespatched(Operation.Service_Despatch, props.pGuestId)}} />
                {/* End :: despatch component */}

                {/* Start :: generate & display summery bill component */}
                <GenerateBillService 
                    ref = {generateBillServiceRef}
                    pGuestId = {props.pGuestId} 
                    onPaymentAdded = {() => {props.onPaymentAdded(Operation.BillGenerate, props.pGuestId)}}
                    onSaved = {() => {props.onBillGenerated(Operation.BillGenerate, props.pGuestId)}} />
                {/* End :: generate & display bill component */}

                {/* Start :: checkout component */}
                <CheckoutService
                    ref = {checkoutServiceRef}
                    pGuestId = {props.pGuestId} 
                    pName = {props.pName}
                    pCorporateName = {props.pCorporateName}
                    onSaved = {() => {props.onCheckedout(Operation.Service_Checkout, props.pGuestId)}} />
                {/* End :: checkout component */}
            </>            
            {/* End :: Service components */}            

            {/* Start :: miscellaneous components */}            
            <>
                {/* Start :: miscellaneous order component */}
                <OrderMiscellaneous 
                    ref = {orderMiscellaneousRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onOrdered(Operation.Miscellaneous_Order, props.pGuestId)}} />
                {/* End :: miscellaneous order component */}

                {/* Start :: miscellaneous despatch component */}
                <DespatchMiscellaneous
                    ref = {despatchMiscellaneousRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onDespatched(Operation.Miscellaneous_Despatch, props.pGuestId)}} />
                {/* End :: miscellaneous despatch component */}

                {/* Start :: miscellaneous generate & display summery bill component */}
                <GenerateBillMiscellaneous 
                    ref = {generateBillMiscellaneousRef}
                    pGuestId = {props.pGuestId} 
                    onPaymentAdded = {() => {props.onPaymentAdded(Operation.Miscellaneous_PaymentAdd, props.pGuestId)}}
                    onSaved = {() => {props.onBillGenerated(Operation.BillGenerate, props.pGuestId)}} />
                {/* End :: miscellaneous generate & display summery bill component */}

                {/* Start :: miscellaneous checkout component */}
                <CheckoutMiscellaneous
                    ref = {checkoutMiscellaneousRef}
                    pGuestId = {props.pGuestId} 
                    pName = {props.pName}
                    pCorporateName = {props.pCorporateName}
                    onSaved = {() => {props.onCheckedout(Operation.Miscellaneous_Checkout, props.pGuestId)}} />
                {/* End :: miscellaneous checkout component */}
            </>
            {/* End :: miscellaneous components */} 

        </>
    );
    // End:: Html

});


export default GuestRoomCard;