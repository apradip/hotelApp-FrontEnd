import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Card, Badge, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { PenTool, FileText, Edit2, CreditCard, LogOut, Scissors, MoreVertical } from "react-feather";
import { subStr, formatINR, getRooms } from "../common/Common";
import TimeElapsed from "../common/TimeElapsed";

import View from "./GuestRoomView";
import Edit from "./GuestRoomEdit";
import Booking from "./GuestRoomBooking";
import GenerateBill from "./GuestRoomGenerateBill";
import Checkout from "./GuestRoomCheckout";
import Delete from "./GuestRoomDelete";


const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <NavLink to = "#" className = "dropdown" ref = {ref} 
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
    const bookingRef=useRef(null);
    const generateBillRef=useRef(null);
    const checkoutRef=useRef(null);
    
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

    // Start:: Show generate bill modal 
    const handelOpenGenerateBill = () => {
        try {
            generateBillRef && 
                generateBillRef.current.handleShowModal();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show generate bill modal 

    // Start:: Show checkout modal 
    const handelOpenCheckout = () => {
        try {
            checkoutRef && 
                checkoutRef.current.handleShowModal();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show checkout modal 

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
                                        setActive(!active) 
                                        props.onActivated(props.pIndex)
                                    }    
                                    else if (e.detail === 2) {
                                        handelOpenView()
                                    }  
                                }}>

                <Card.Body className = "text-sm p-1">
                    <Row className = "m-1">
                        <Col xs = {8} sm = {8} md = {8} lg = {8} xl = {8} className = "p-0">
                            <b>{props.pCorporateName ? subStr(props.pCorporateName, 20): subStr(props.pName, 20)}</b>
                            {props.pOption === "R" &&
                            <Badge pill bg = "danger">R</Badge>}
                        </Col>
                        <Col xs = {4} sm = {4} md = {4} lg = {4} xl = {4} className = "text-right text-danger p-0">
                            <b>{formatINR(props.pBalance)}</b>
                        </Col>
                    </Row>

                    <Row className = "d-none d-md-block d-lg-block d-xl-block m-1">
                        {props.pCorporateName ?
                            <Col xs = {12} sm = {12} md = {12} lg = {12} xl = {12} className = "p-0">
                                {subStr(props.pCorporateAddress, 30)}
                            </Col>
                            :
                            <Col xs = {12} sm = {12} md = {12} lg = {12} xl = {12} className = "p-0">
                                Mobile no. {props.pMobile}
                            </Col>
                        }
                    </Row>        

                    <Row className = "m-1">
                        <Col xs = {10} sm = {10} md = {6} lg = {6} xl = {6} className = "p-0">
                            {props.pGuestCount} no of guest(s)
                        </Col>
                        <Col xs = {0} sm = {0} md = {5} lg = {5} xl = {5} className = "d-none d-md-block d-lg-block d-xl-block text-right p-0">
                            <TimeElapsed
                                pInDate={props.pIndate}
                                pInTime={props.pInTime}/>
                        </Col>
                        <Col xs = {2} sm = {2} md = {1} lg = {1} xl = {1} className = "text-right p-0">
                            {/* Start:: operational menu */}
                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                    <MoreVertical size={16}/>
                                </Dropdown.Toggle>
                                
                                <Dropdown.Menu>
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
                                        onClick = {() => {handelOpenCheckout()}}>
                                        <LogOut className="feather-16 mr-3"/>Check out
                                    </Dropdown.Item>

                                    <Dropdown.Divider />

                                    <Dropdown.Item eventKey = "4" 
                                        onClick = {() => {handelOpenEdit()}}>
                                        <Edit2 className = "feather-16 mr-3"/>Edit
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey = "5" 
                                        // disabled = {props.pTransactionId === "undefined" ? false : true}
                                        onClick = {handelOpenDelete}>
                                        <Scissors className = "feather-16 mr-3"/>Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* End:: operational menu */}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* End :: card component */}

            {/* Start :: view component */}
            <View
                ref = {viewRef}
                pGuestId = {props.pGuestId} 
                onClosed = {handleClose} />
            {/* End :: view component */}

            {/* Start :: edit component */}
            <Edit 
                ref = {editRef}
                pGuestId = {props.pGuestId} 
                onSaved = {props.onEdited} 
                onClosed = {handleClose} />
            {/* End :: edit component */}

            {/* Start :: delete component */}
            <Delete 
                ref = {deleteRef}
                pGuestId = {props.pGuestId} 
                pName = {props.pName}
                onDeleted = {props.onDeleted} 
                onClosed = {handleClose} />
            {/* End :: delete component */}

            {/* Start :: booking component */}
            <Booking
                ref = {bookingRef}
                pGuestId = {props.pGuestId} 
                onSaved = {props.onBooked} 
                onClosed = {handleClose}/>
            {/* End :: booking component */}

            {/* Start :: generate & display summery bill component */}
            <GenerateBill 
                ref = {generateBillRef}
                pGuestId = {props.pGuestId} 
                onPaymentAdded = {props.onPaymentAdded}
                onSaved = {props.onBillGenerated}
                onClosed = {handleClose} />
            {/* End :: generate & display summery bill component */}

            {/* Start :: checkout component */}
            <Checkout
                ref = {checkoutRef}
                pGuestId = {props.pGuestId} 
                pName = {props.pName}
                pCorporateName = {props.pCorporateName}
                onSaved = {props.onCheckedout} 
                onClosed = {handleClose} />
            {/* End :: checkout component */}
        </>
    );
    // End:: Html

});


export default GuestRoomCard;