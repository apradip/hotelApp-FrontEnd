import React, {useState, useRef, forwardRef, useImperativeHandle} from "react";
import {Row, Col, Card, Badge, Dropdown, Stack} from "react-bootstrap";
import TimeElapsed from "../common/TimeElapsed";
import {NavLink} from "react-router-dom";
import {Coffee, Phone, ChevronsRight, Edit2, PenTool, ShoppingBag, FileText, CreditCard, LogOut, Scissors, MoreVertical} from "react-feather";
import {subStr, formatINR} from "../common/Common";

import View from "./GuestMiscellaneousView";
import Edit from "./GuestMiscellaneousEdit";
import Delete from "./GuestMiscellaneousDelete";

import OrderTable from "../guestTable/GuestTableOrder";
import OrderService from "../guestService/GuestServiceOrder";
import Order from "./GuestMiscellaneousOrder";

import DespatchTable from "../guestTable/GuestTableDespatch";
import DespatchService from "../guestService/GuestServiceDespatch";
import Despatch from "./GuestMiscellaneousDespatch";

import GenerateBillTable from "../guestTable/GuestTableGenerateBill";
import GenerateBillService from "../guestService/GuestServiceGenerateBill";
import GenerateBill from "./GuestMiscellaneousGenerateBill";

import AddPayment from "../guestPayment/GuestPaymentAdd";

import CheckoutTable from "../guestTable/GuestTableCheckout";
import CheckoutService from "../guestService/GuestServiceCheckout";
import Checkout from "./GuestMiscellaneousCheckout";


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
    const viewRef=useRef(null);
    const editRef = useRef(null);
    const deleteRef=useRef(null);

    const orderTableRef=useRef(null);
    const orderServiceRef=useRef(null);
    const orderRef=useRef(null);
    
    const despatchTableRef=useRef(null);
    const despatchServiceRef=useRef(null);
    const despatchRef=useRef(null);

    const generateBillTableRef=useRef(null);
    const generateBillServiceRef=useRef(null);
    const generateBillRef=useRef(null);

    const addPaymentRef=useRef(null);

    const checkoutTableRef=useRef(null);
    const checkoutServiceRef=useRef(null);
    const checkoutRef=useRef(null);
    
    const [focus, setFocus]=useState(false);
    const [active, setActive]=useState(false);

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
    
    // Start:: Show order modal 
    const handelOpenOrder = (option) => {
        switch (option) {
            case "M" :
                orderRef && orderRef.current.handleShowModal();
                return;

            case "T" :
                orderTableRef && orderTableRef.current.handleShowModal();
                return;
                
            case "S" :
                orderServiceRef && orderServiceRef.current.handleShowModal();
                return;                

            default:
                orderRef && orderRef.current.handleShowModal();
                return;                
        }
    };
    // End:: Show order modal 

    // Start:: Show despatch modal 
    const handelOpenDespatch = (option) => {
        switch (option) {
            case "M" :
                despatchRef && despatchRef.current.handleShowModal();
                return;

            case "T" :
                despatchTableRef && despatchTableRef.current.handleShowModal();
                return;
                
            case "S" :
                despatchServiceRef && despatchServiceRef.current.handleShowModal();
                return;                

            default:
                despatchRef && despatchRef.current.handleShowModal();
                return;                
        }
    };
    // End:: Show despatch modal 
    
    // Start:: Show generate bill modal 
    const handelOpenGenerateBill = (option) => {
        switch (option) {
            case "M" :
                generateBillRef && generateBillRef.current.handleShowModal();
                return;

            case "T" :
                generateBillTableRef && generateBillTableRef.current.handleShowModal();
                return;
                
            case "S" :
                generateBillServiceRef && generateBillServiceRef.current.handleShowModal();
                return;                

            default:
                generateBillRef && generateBillRef.current.handleShowModal();
                return;                
        }
    };
    // End:: Show generate bill modal 

    // Start:: Show payment modal 
    const handelOpenPayment = () => {
        addPaymentRef && addPaymentRef.current.handleShowModal();
    };
    // End:: Show payment modal 
    
    // Start:: Show checkout modal 
    const handelOpenCheckout = (option) => {
        switch (option) {
            case "M" :
                checkoutRef && checkoutRef.current.handleShowModal();
                return;

            case "T" :
                checkoutTableRef && checkoutTableRef.current.handleShowModal();
                return;
                
            case "S" :
                checkoutServiceRef && checkoutServiceRef.current.handleShowModal();
                return;                

            default:
                checkoutRef && checkoutRef.current.handleShowModal();
                return;                
        }
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
            handelOpenEdit,  
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
                className={props.pOption === 'R' ? 'border-room' : 'border'}
                border={active ? 'info' : focus ? 'primary' : ''}  
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
                    <Row className="m-1">
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} className="p-0">
                            <b>{props.pCorporateName ? subStr(props.pCorporateName, 20): subStr(props.pName, 20)}</b>
                            {props.pOption === 'R' &&
                            <Badge pill bg='danger'>R</Badge>}
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4} className="text-right text-danger p-0">
                            <b>{formatINR(props.pTotalBalance)}</b>
                        </Col>
                    </Row>

                    <Row className="d-none d-md-block d-lg-block d-xl-block m-1">
                        {props.pCorporateName ?
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

                                    {props.pOption === "R" &&
                                    <>
                                        <Dropdown autoClose="outside">
                                            <Dropdown.Toggle as={CustomToggle}>
                                                <span className="dropdown-item">
                                                    <Coffee className="feather-16 mr-3"/>
                                                    Food
                                                    <ChevronsRight className="feather-16 float-right"/>
                                                </span>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
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
                                                    onClick={handelOpenPayment}>
                                                    <CreditCard className="feather-16 mr-3"/>Payment
                                                </Dropdown.Item>

                                                <Dropdown.Item eventKey="14"
                                                    disabled={props.pTransactionId !== "undefined" ? false : true}
                                                    onClick={() => {handelOpenCheckout("T")}}>
                                                    <LogOut className="feather-16 mr-3"/>Check out
                                                </Dropdown.Item>

                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <Dropdown autoClose="outside">
                                            <Dropdown.Toggle as={CustomToggle} drop="end" variant="secondary">
                                                <span className="dropdown-item">
                                                    <Phone className="feather-16 mr-3" />
                                                    Service
                                                    <ChevronsRight className="feather-16 float-end"/>
                                                </span>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
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

                                                <Dropdown.Item eventKey="23"
                                                    disabled={props.pTransactionId !== "undefined" ? false : true}
                                                    onClick={handelOpenPayment}>
                                                    <CreditCard className="feather-16 mr-3"/>Payment
                                                </Dropdown.Item>

                                                <Dropdown.Item eventKey="24"
                                                    disabled={props.pTransactionId !== "undefined" ? false : true}
                                                    onClick={() => {handelOpenCheckout("S")}}>
                                                    <LogOut className="feather-16 mr-3"/>Check out
                                                </Dropdown.Item>

                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <Dropdown.Divider />
                                    </>
                                    }

                                    <Dropdown.Item eventKey="3" 
                                        onClick={() => {handelOpenEdit()}}>
                                        <Edit2 className="feather-16 mr-3"/>Edit
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey="4" 
                                        onClick={() => {handelOpenOrder("M")}}>
                                        <PenTool className="feather-16 mr-3"/>Order
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey="5"
                                        disabled={props.pTransactionId !== 'undefined' ? false : true}
                                        onClick={() => {handelOpenDespatch("M")}}>
                                        <ShoppingBag className="feather-16 mr-3"/>Despatch
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey="6" 
                                        disabled={props.pTransactionId !== 'undefined' ? false : true}
                                        onClick={() => {handelOpenGenerateBill("M")}}>
                                        <FileText className="feather-16 mr-3"/>Bill
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey="7"
                                        disabled={props.pTransactionId !== 'undefined' ? false : true}
                                        onClick={handelOpenPayment}>
                                        <CreditCard className="feather-16 mr-3"/>Payment
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey="8"
                                        disabled={props.pTransactionId !== 'undefined' ? false : true}
                                        onClick={() => {handelOpenCheckout("M")}}>
                                        <LogOut className="feather-16 mr-3"/>Check out
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey="9" 
                                        onClick={() => {handelOpenDelete()}}>
                                        <Scissors className="feather-16 mr-3"/>Delete
                                    </Dropdown.Item>

                                </Dropdown.Menu>

                            </Dropdown>
                            {/* End:: operational menu */}
                        </Col>
                    </Row>
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
                onClosed={handleClose} />
            {/* End :: view component */}

            {/* Start :: edit component */}
            <Edit 
                ref={editRef}
                pGuestId={props.pGuestId} 
                onSaved={props.onEdited} 
                onClosed={handleClose}/>
            {/* End :: edit component */}

            {/* Start :: delete employee component */}
            <Delete 
                ref={deleteRef}
                pGuestId={props.pGuestId} 
                pName={props.pName}
                onDeleted={props.onDeleted} 
                onClosed={handleClose}/>
            {/* End :: delete employee component */}

            {/* Start :: table order component */}
            <OrderTable
                ref={orderTableRef}
                pGuestId={props.pGuestId} 
                pTransactionId={props.pTableTransactionId}
                pName={props.pName}
                pMobile={props.pMobile}
                pGuestCount={props.pGuestCount}
                pCorporateName={props.pCorporateName}
                pCorporateAddress={props.pCorporateAddress}
                pGstNo={props.pGstNo}
                // pTables={props.pTables}
                pIndate={props.inDate}
                pInTime={props.inTime}
                onSaved={props.onOrdered} 
                onClosed={handleClose}/>
            {/* End :: table order component */}

            {/* Start :: service order component */}
            <OrderService
                ref={orderServiceRef}
                pGuestId={props.pGuestId} 
                pTransactionId={props.pServiceTransactionId}
                pName={props.pName}
                pMobile={props.pMobile}
                pGuestCount={props.pGuestCount}
                pCorporateName={props.pCorporateName}
                pCorporateAddress={props.pCorporateAddress}
                pGstNo={props.pGstNo}
                onSaved={props.onOrdered} 
                onClosed={handleClose}/>
            {/* End :: service order component */}

            {/* Start :: miscellaneous order component */}
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
            {/* End :: miscellaneous order component */}

            {/* Start :: table despatch component */}
            <DespatchTable
                ref={despatchTableRef}
                pGuestId={props.pGuestId} 
                pTransactionId={props.pTableTransactionId} 
                pName={props.pName}
                pMobile={props.pMobile}
                pGuestCount={props.pGuestCount}
                pCorporateName={props.pCorporateName}
                pCorporateAddress={props.pCorporateAddress}
                pGstNo={props.pGstNo}
                // pTables={props.pTables}
                pIndate={props.inDate}
                pInTime={props.inTime}
                onSaved={props.onDespatched} 
                onClosed={handleClose}/>
            {/* End :: table despatch component */}

            {/* Start :: service despatch component */}
            <DespatchService
                ref={despatchServiceRef}
                pGuestId={props.pGuestId} 
                pTransactionId={props.pServiceTransactionId} 
                pName={props.pName}
                pMobile={props.pMobile}
                pGuestCount={props.pGuestCount}
                pCorporateName={props.pCorporateName}
                pCorporateAddress={props.pCorporateAddress}
                pGstNo={props.pGstNo}
                onSaved={props.onDespatched} 
                onClosed={handleClose}/>
            {/* End :: service despatch component */}

            {/* Start :: miscellaneous despatch component */}
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
            {/* End :: miscellaneous despatch component */}

            {/* Start :: table generate & display summery bill component */}
            <GenerateBillTable
                ref={generateBillTableRef}
                pGuestId={props.pGuestId} 
                pTransactionId={props.pTableTransactionId}
                pName={props.pName}
                pMobile={props.pMobile}
                pGuestCount={props.pGuestCount}
                pCorporateName={props.pCorporateName}
                pCorporateAddress={props.pCorporateAddress}
                pGstNo={props.pGstNo}
                // pTables={props.pTables}
                pIndate={props.inDate}
                pInTime={props.inTime}
                onSaved={props.onBillGenerated}
                onClosed={handleClose}/>
            {/* End :: table generate & display summery bill component */}

            {/* Start :: service generate & display summery bill component */}
            <GenerateBillService 
                ref={generateBillServiceRef}
                pGuestId={props.pGuestId} 
                pTransactionId={props.pServiceTransactionId}
                pName={props.pName}
                pMobile={props.pMobile}
                pGuestCount={props.pGuestCount}
                pCorporateName={props.pCorporateName}
                pCorporateAddress={props.pCorporateAddress}
                pGstNo={props.pGstNo}
                onSaved={props.onBillGenerated}
                onClosed={handleClose}/>
            {/* End :: service generate & display summery bill component */}

            {/* Start :: miscellaneous generate & display summery bill component */}
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
            {/* End :: miscellaneous generate & display summery bill component */}

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
                onClosed={handleClose} />
            {/* End :: add payment component */}

            {/* Start :: table checkout component */}
            <CheckoutTable
                ref={checkoutTableRef}
                pGuestId={props.pGuestId} 
                pTransactionId={props.pTableTransactionId}
                pName={props.pName}
                pCorporateName={props.pCorporateName}
                onSaved={props.onCheckedout} 
                onClosed={handleClose}/>
            {/* End :: table checkout component */}

            {/* Start :: service checkout component */}
            <CheckoutService
                ref={checkoutServiceRef}
                pGuestId={props.pGuestId} 
                pTransactionId={props.pServiceTransactionId}
                pName={props.pName}
                pCorporateName={props.pCorporateName}
                onSaved={props.onCheckedout} 
                onClosed={handleClose}/>
            {/* End :: service checkout component */}

            {/* Start :: miscellaneous checkout component */}
            <Checkout
                ref={checkoutRef}
                pGuestId={props.pGuestId} 
                pTransactionId={props.pTransactionId}
                pName={props.pName}
                pCorporateName={props.pCorporateName}
                onSaved={props.onCheckedout} 
                onClosed={handleClose}/>
            {/* End :: miscellaneous checkout component */}


        </>
    );
    // End:: Html

});

export default GuestMiscellaneousCard;