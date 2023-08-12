import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Badge, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ChevronsRight, Coffee, Umbrella, Wind, ShoppingBag, PenTool, FileText, Edit2, LogOut, Scissors, MoreVertical } from "react-feather";
import { subStr, formatINR, formatDDMMYYYY, getRooms } from "../common/Common";

import View from "../guestRoom/GuestRoomView";
import Edit from "../guestRoom/GuestRoomEdit";
import Booking from "../guestRoom/GuestRoomBooking";
import GenerateBill from "../guestRoom/GuestRoomGenerateBill";
import AdvancePayment from "../common/GuestAdvancePaymentAdd";
import Checkout from "../guestRoom/GuestRoomCheckout";
import Delete from "../guestRoom/GuestRoomDelete";

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
const GuestRoomRow = forwardRef((props, ref) => {
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

    // const [focus, setFocus] = useState(false);
    // const [active, setActive] = useState(false);

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
            // setActive(false);
            // setFocus(false);
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
            <tr>
                <td>
                    <div className="d-flex align-items-left text-muted fs-8">
                        <span className="bullet bullet-vertical h-20px bg-success me-3"></span>
                        {getRooms(props.pRooms)}
                    </div>
                </td>
                <td>
                    <div className="d-flex align-items-center text-muted fs-8">
                        <div className="d-flex justify-content-start flex-column">
                            <span className="fw-bold d-block">{props.pName ? subStr(props.pName, 20) : subStr(props.pCorporateName, 20)}</span>
                            <span className="d-block">{props.pName ? props.pMobile : subStr(props.pCorporateAddress, 20)}  <Badge bg="secondary">{props.pGuestCount}</Badge></span>
                        </div>
                    </div>
                </td>
                <td className="align-items-center text-muted fs-8">
                    <div className="d-flex justify-content-start flex-column">
                        <span className="d-block">{formatDDMMYYYY(props.pIndate)}</span>
                        <span className="d-block">6th Jan 2023</span>
                    </div>
                </td>
                <td className="text-end">
                    <div className="d-flex flex-column w-100 me-2">
                        <div className="d-flex flex-stack mb-2 justify-content-end">
                            <span className="badge badge-light-danger fs-8 fw-bolder"><b>{formatINR(props.pBalance)}</b></span>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="d-flex justify-content-end">

                        {/* Start:: operational menu */}
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle}>
                                <MoreVertical size={16}/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
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
                                                onClick={() => {handelOpenGenerateBill("T")}}>
                                                <FileText className="feather-16 mr-3"/>Bill
                                            </Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {/* End :: Table menu */}
                                        
                                    {/* Start :: Service menu */}        
                                    {/* <Dropdown autoClose="outside">
                                        <Dropdown.Toggle as={CustomToggle} drop="end" variant="secondary">
                                            <span className="dropdown-item">
                                                <Umbrella className="feather-16 mr-3" />
                                                Service
                                                <ChevronsRight className="feather-16 float-end"/>
                                            </span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="dropdown-sub">
                                            
                                            <Dropdown.Item eventKey="20" 
                                                // onClick={() => {handelOpenOrder("S")}}
                                                >
                                                <PenTool className="feather-16 mr-3" />Order
                                            </Dropdown.Item>
                                            
                                            <Dropdown.Item eventKey="21"
                                                // onClick={() => {handelOpenDespatch("S")}}
                                                >
                                                <ShoppingBag className="feather-16 mr-3"/>Despatch
                                            </Dropdown.Item>

                                            <Dropdown.Item eventKey="22" 
                                                // onClick={() => {handelOpenGenerateBill("S")}}
                                                >
                                                <FileText className="feather-16 mr-3"/>Bill
                                            </Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown> */}
                                    {/* End :: Service menu */}        

                                    {/* Start :: Miscellaneous menu */}               
                                    {/* <Dropdown autoClose="outside">
                                        <Dropdown.Toggle as={CustomToggle} drop="end" variant="secondary">
                                            <span className="dropdown-item">
                                                <Wind className="feather-16 mr-3" />
                                                Miscellaneous
                                                <ChevronsRight className="feather-16 float-end"/>
                                            </span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="dropdown-sub">
                                            <Dropdown.Item eventKey="30" 
                                                // onClick={() => {handelOpenOrder("M")}}
                                                >
                                                <PenTool className="feather-16 mr-3" />Order
                                            </Dropdown.Item>
                                            
                                            <Dropdown.Item eventKey="31"
                                                // onClick={() => {handelOpenDespatch("M")}}
                                                >
                                                <ShoppingBag className="feather-16 mr-3"/>Despatch
                                            </Dropdown.Item>

                                            <Dropdown.Item eventKey="32" 
                                                // onClick={() => {handelOpenGenerateBill("M")}}
                                                >
                                                <FileText className="feather-16 mr-3"/>Bill
                                            </Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown> */}
                                    {/* End :: Miscellaneous menu */}               

                                    {/* <Dropdown.Divider /> */}

                                    {/* Start :: Room menu */}                       
                                    {/* <Dropdown.Item eventKey = "1" 
                                        // onClick = {() => {handelOpenBooking()}}
                                        >
                                        <PenTool className = "feather-16 mr-3" />Booking
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey = "2" 
                                        // onClick = {() => {handelOpenGenerateBill()}}
                                        >
                                        <FileText className = "feather-16 mr-3"/>Bill
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey = "3" 
                                        // onClick = {() => {handelOpenPayment()}}
                                        >
                                        <FileText className = "feather-16 mr-3"/>Payment
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey = "4"
                                        // onClick = {() => {handelOpenCheckout()}}
                                        >
                                        <LogOut className="feather-16 mr-3"/>Check out
                                    </Dropdown.Item>

                                    <Dropdown.Divider />

                                    <Dropdown.Item eventKey = "5" 
                                        // onClick = {() => {handelOpenEdit()}}
                                        >
                                        <Edit2 className = "feather-16 mr-3"/>Edit
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey = "6" 
                                        // onClick = {handelOpenDelete}
                                        >
                                        <Scissors className = "feather-16 mr-3"/>Delete
                                    </Dropdown.Item> */}
                                    {/* End :: Room menu */}                       
                                </>
                            </Dropdown.Menu> 
                        </Dropdown>
                        {/* End:: operational menu */}

                    </div>
                </td>
            </tr>
                                                        
                                                        






            {/* Start :: Room component */}
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
            {/* End :: Room component */}


            {/* Start :: Table components */}            
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
            {/* End :: Table components */}            


            {/* Start :: Service components */}
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
            
            {/* End :: Service components */}            


            {/* Start :: miscellaneous components */}            
            
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
            
            {/* End :: miscellaneous components */} 

        </>
    );
    // End:: Html

});


export default GuestRoomRow;