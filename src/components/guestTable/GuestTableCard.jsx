import React, { useState, useContext, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Card, Badge, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Users, Phone, MapPin, Layers, Edit2, PenTool, ShoppingBag, FileText, LogOut, Scissors, MoreVertical } from "react-feather";
import { ActivityArea, Operation, getTables, subStr, properCase, formatINR } from "../common/Common";
import { toast } from "react-toastify";
import TimeElapsed from "../common/TimeElapsed";

import View from "./GuestTableView";
import Edit from "../common/GuestEditSmall";
import Delete from "../common/GuestDeleteSmall";
import Order from "./GuestTableOrder";
import Despatch from "./GuestTableDespatch";
import GenerateBill from "./GuestTableGenerateBill";
import Checkout from "./GuestTableCheckout";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetchWithAuth from "../common/useFetchWithAuth";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <NavLink to="#" className="dropdown"
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
// handelOpenOrder
// handelDespatch 
// handelOpenGenerateBill
// handelOpenPayment
// handelOpenCheckout
// handelOpenDelete
// handelRefresh
// getGuestId
const GuestTableCard = forwardRef((props, ref) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();

    const viewRef = useRef(null);
    const editRef = useRef(null);
    const deleteRef = useRef(null);
    const orderRef = useRef(null);
    const despatchRef = useRef(null);
    const generateBillRef = useRef(null);
    const checkoutRef = useRef(null);

    const [corporateName, setCorporateName] = useState();
    const [corporateAddress, setCorporateAddress] = useState();
    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const [guestCount, setGuestCount] = useState();
    const [balance, setBalance] = useState();
    const [tables, setTables] = useState();
    const [inDate, setInDate] = useState();

    const [focus, setFocus] = useState(false);
    const [active, setActive] = useState(false);
    
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestTableAPI}/${hotelId}/${props.pGuestId}`,
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
    
    useEffect(() => {
        try {
            error && toast.error(error);

            data && setCorporateName(data.corporateName);
            data && setCorporateAddress(data.corporateAddress); 
            data && setName(data.name);
            data && setMobile(data.mobile);
            data && setGuestCount(data.guestCount);  
            data && setBalance(data.balance);
            data && setTables(data.tables);
            data && setInDate(data.inDate);
            
            // data && setFocus(true);
            // data && setActive(true);
        } catch (err) {
            console.log(err);
        }        
    }, [data, error, loading]);

    // Start :: get guest Id of this component
    const getGuestId = () => {return props.pGuestId;}
    // End :: get guest Id of this component
    
    // Start:: get data from api
    const handelRefresh = async () => {
        try {
            await doFetch();
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
    const handelOpenOrder = () => {
        try {
            orderRef && 
                orderRef.current.handleShowModal();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show order modal 

    // Start:: Show despatch modal 
    const handelOpenDespatch = () => {
        try {
            despatchRef && 
                despatchRef.current.handleShowModal();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show despatch modal 
    
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
            handelOpenOrder, 
            handelOpenDespatch, 
            handelOpenGenerateBill, 
            handelOpenDelete,
            handelRefresh,
            getGuestId
        }
    });
    // End:: forward reff de-select, show edit/delete modal function

    // Start:: Html
    return (
        <>
            {/* Start :: card component */}
            <Card 
                ref = {ref}
                key = {`TC_${props.pGuestId}`}
                index = {props.pIndex}
                className = {active ? "active" : focus ? "focus" : "restaurent"}  
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

                {/* Start:: card body */}
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

                            {/* <Badge pill bg = "secondary">T</Badge> */}
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4} className={"text-right p-0 " + (balance >= 0 ? "text-success" : "text-danger")}>
                            <b>{formatINR(balance)}</b>
                        </Col>
                    </Row>

                    <Row className="d-none d-md-block d-lg-block d-xl-block m-1">
                        {tables ? 
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0">
                               <Layers className="feather-16 mr-2"/>
                               {getTables(tables)}
                            </Col>
                        :
                            corporateName ?
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0">
                                    {properCase(subStr(corporateAddress, 30))}
                                </Col>
                                :
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0">
                                    <Phone className="feather-16 mr-2"/>
                                    {mobile}
                                </Col>}
                    </Row>

                    <Row className="m-1">
                        <Col xs={10} sm={10} md={6} lg={6} xl={6} className="p-0">
                            {guestCount} guest(s)
                        </Col>

                        <Col xs={0} sm={0} md={5} lg={5} xl={5} className="d-none d-md-block d-lg-block d-xl-block text-right p-0">
                            <TimeElapsed
                                pInDate = {inDate}/>
                        </Col>

                        <Col xs={2} sm={2} md={1} lg={1} xl={1} className="text-right p-0">

                            {/* Start:: operational menu */}
                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                    <MoreVertical size={16}/>
                                </Dropdown.Toggle>
                                
                                <Dropdown.Menu>

                                    <Dropdown.Item eventKey = "1" 
                                        onClick = {() => {handelOpenOrder()}}>
                                        <PenTool className = "feather-16 mr-3" />Order
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey = "2"
                                        disabled = {props.pTransactionId !== "undefined" ? false : true}
                                        onClick = {() => {handelOpenDespatch()}}>
                                        <ShoppingBag className="feather-16 mr-3"/>Despatch
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey = "3" 
                                        disabled = {props.pTransactionId !== "undefined" ? false : true}
                                        onClick = {() => {handelOpenGenerateBill()}}>
                                        <FileText className="feather-16 mr-3"/>Bill
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
                                        onClick = {() => {handelOpenDelete()}}>
                                        <Scissors className = "feather-16 mr-3"/>Delete
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

            <>
                {/* Start :: view component */}
                <View
                    ref = {viewRef}
                    pGuestId = {props.pGuestId} />
                {/* End :: view component */}

                {/* Start :: edit component */}
                <Edit 
                    ref = {editRef}
                    pGuestId = {props.pGuestId} 
                    pOption = {ActivityArea.Table}
                    onSaved = {() => {props.onEdited(Operation.GuestMod, props.pGuestId);}} />
                {/* End :: edit component */}

                {/* Start :: delete employee component */}
                <Delete 
                    ref = {deleteRef}
                    pGuestId = {props.pGuestId} 
                    pName = {props.pName}
                    onDeleted = {() => {props.onDeleted(Operation.GuestDel, props.pGuestId);}} />
                {/* End :: delete employee component */}

                {/* Start :: order component */}
                <Order 
                    ref = {orderRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onOrdered(Operation.Table_Order, props.pGuestId);}} />
                {/* End :: order component */}

                {/* Start :: despatch component */}
                <Despatch
                    ref = {despatchRef}
                    pGuestId = {props.pGuestId} 
                    onSaved = {() => {props.onDespatched(Operation.Table_Despatch, props.pGuestId);}} />
                {/* End :: despatch component */}

                {/* Start :: generate & display summery bill component */}
                <GenerateBill 
                    ref = {generateBillRef}
                    pGuestId = {props.pGuestId} 
                    onPaymentAdded = {() => {props.onPaymentAdded(Operation.Table_PaymentAdd, props.pGuestId);}}
                    onSaved = {() => {props.onBillGenerated(Operation.BillGenerate, props.pGuestId);}} />
                {/* End :: generate & display summery bill component */}

                {/* Start :: tables checkout component */}
                <Checkout
                    ref = {checkoutRef}
                    pGuestId = {props.pGuestId} 
                    pName = {name}
                    pCorporateName = {corporateName}
                    onSaved = {() => {props.onCheckedout(Operation.Table_Checkout, props.pGuestId);}} />
                {/* End :: tables checkout component */}
            </>                                    
        </>
    );
    // End:: Html

});

export default GuestTableCard;