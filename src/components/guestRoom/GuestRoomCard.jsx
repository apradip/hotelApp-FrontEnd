import React, {useState, useRef, forwardRef, useImperativeHandle} from "react";
import {Card, Dropdown, Stack} from "react-bootstrap";
// import TimeElapsed from "../common/TimeElapsed";
import {NavLink} from "react-router-dom";
import {Edit3, ShoppingBag, CreditCard, LogOut, ChevronDown} from "react-feather";

import {subStr, formatINR} from "../common/Common";
import {formatDDMMYYYY} from "../common/Common";

import View from "./GuestRoomView";
import Edit from "./GuestRoomEdit";
import Delete from "./GuestRoomDelete";
import AddPayment from "../guestPayment/GuestPaymentAdd";


const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <NavLink to="#" className="dropdown" ref={ref} 
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
    const addPaymentRef = useRef(null);
    const [focus, setFocus] = useState(false);
    const [active, setActive] = useState(false);

    // Start:: Show view modal 
    const handelOpenView = () => {
        viewRef && viewRef.current.handleShowModal();
    };
    // End:: Show view modal 

    // Start:: Show edit modal 
    const handelOpenEdit = () => {
        editRef && editRef.current.handleShowModal();
    };
    // End:: Show edit modal 

    // Start:: Show delete modal 
    const handelOpenDelete = () => {
        deleteRef && deleteRef.current.handleShowModal();
    };
    // End:: Show delete modal 

    // Start:: Show payment modal 
    const handelOpenPayment = () => {
        addPaymentRef && addPaymentRef.current.handleShowModal();
    };
    // End:: Show payment modal 

    // Start:: Show checkout modal 
    const handelOpenCheckout = () => {
        // deleteRef && deleteRef.current.handleShowModal();
    };
    // End:: Show checkout modal 
    
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
            handleDeSelect, handelOpenEdit, handelOpenDelete
        }
    });
    // Edit:: forward reff de-select, show edit/delete modal function

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

                <Card.Body className="text-sm p-1">
                    <Stack gap={1}>
                        <Stack direction="horizontal" gap={0}>
                            <span className="col-10 text-left">
                                <h4>{subStr(props.pRoomNos, 20)}</h4>
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
                                            onClick={handelOpenEdit}>
                                            <Edit3 className="feather-16 mr-3"/>Edit
                                        </Dropdown.Item>

                                        <Dropdown.Item eventKey="2"
                                            onClick = {handelOpenDelete}>
                                            <ShoppingBag className="feather-16 mr-3"/>Delete
                                        </Dropdown.Item>

                                        <Dropdown.Item eventKey="3" 
                                            onClick = {handelOpenPayment}>
                                            <CreditCard className="feather-16 mr-3"/>Payment
                                        </Dropdown.Item>

                                        {/* <Dropdown.Item eventKey="4"
                                            onClick = {handelOpenPayment}>
                                            <CreditCard className="feather-16 mr-3"/>Payment
                                        </Dropdown.Item> */}

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
                            <div className="col-12">{subStr(props.pName, 45)}</div>
                        </Stack>

                        <Stack gap={0}>
                            <div className="col-12">{subStr(props.pAddress, 45)}</div>
                        </Stack>        

                        <Stack gap={0}>
                            <div className="col-12">Mobile : {props.pMobile}</div>
                        </Stack>        

                        <Stack direction="horizontal" gap={0}>
                            <span className="col-6 text-left">
                                Check In : {formatDDMMYYYY(props.pCheckInDate)}</span>
                                
                            <span className="col-6 text-right text-danger">
                                Check Out : {formatDDMMYYYY(props.pCheckOutDate)}</span>
                        </Stack>

                        <Stack direction="horizontal" gap={0}>
                            <span className="col-6 text-left">
                                Expense : {formatINR(props.pTotalExpenseAmount)}</span>
                                
                            <span className="col-6 text-right text-danger">
                                Due : {formatINR(props.pTotalExpenseAmount - props.pTotalPaidAmount)}</span>
                        </Stack>                        
                    </Stack>
                </Card.Body>
            </Card>
            {/* End :: card component */}

            {/* Start :: view component */}
            <View
                ref={viewRef}
                pId={props.pId} 
                onClosed={handleClose}/>
            {/* End :: view component */}

            {/* Start :: edit component */}
            <Edit 
                ref={editRef}
                pId={props.pId} 
                onEdited={props.onEdited} 
                onClosed={handleClose}/>
            {/* End :: edit component */}

            {/* Start :: delete component */}
            <Delete 
                ref={deleteRef}
                pId={props.pId} 
                onDeleted={props.onDeleted} 
                onClosed={handleClose}/>
            {/* End :: delete component */}

            {/* Start :: add payment component */}
            <AddPayment 
                ref={addPaymentRef}
                pGuestId={props.pId}    
                pName={props.pName}
                pMobile={props.pMobile}
                pAddress={props.pAddress}    
                pBalance={props.pTotalExpenseAmount - props.pTotalPaidAmount}    
                onAdded={props.onPaymentAdded}
                onClosed={handleClose} />
            {/* End :: add payment component */}

        </>
    );
    // End:: Html

});


export default GuestRoomCard;