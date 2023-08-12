import React, { useState, useContext, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { NavLink, Card, Dropdown, Row, Col } from "react-bootstrap";
import { MoreVertical, Edit3, Scissors } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { subStr, formatINR } from "../common/Common";
import useFetchWithAuth from "../common/useFetchWithAuth";
import View from "./RoomView";
import Edit from "./RoomEdit";
import Delete from "./RoomDelete";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <NavLink to="#" className="dropdown"
        onClick={(e) => {e.preventDefault(); onClick(e);}}>
      {children}
    </NavLink>
));

// Start:: Component
// props parameters
// pIndex
// pNo
// pCategoryId
// pTariff
// pDiscount
// pBed
// pPerson
// onActivated()
// onClosed()

// useImperativeHandle
// handleDeSelect
// handelOpenEdit 
// handelOpenDelete
const RoomCard = forwardRef(( props, ref ) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [categoryName, setCategoryName] = useState("");
    const viewRef = useRef(null);
    const editRef = useRef(null);
    const deleteRef = useRef(null);
    const [focus, setFocus] = useState(false);
    const [active, setActive] = useState(false);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `${contextValues.roomCategoryAPI}/${hotelId}/${props.pCategoryId}`
    });

    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            try {
                await doFetch();
            } catch (err) {
                console.log("Error occured when fetching data");
            }
        })();
    }, [props.pCategoryId]);        // eslint-disable-line react-hooks/exhaustive-deps
    // Start:: fetch id wise detail from api

    useEffect(() => {
        data && setCategoryName(data.name);
    }, [data, error, loading]);

    // Start:: Show view modal 
    const handelOpenView = () => {
        try {
            viewRef.current && 
                viewRef.current.handleShowModal();
        } catch (err) {
            console.log(err);
        }        
    };
    // End:: Show view modal 

    // Start:: Show edit modal 
    const handelOpenEdit = () => {
        try {
            editRef.current && 
                editRef.current.handleShowModal();
        } catch (err) {
            console.log(err);
        }        
    };
    // End:: Show edit modal 

    // Start:: Show delete modal 
    const handelOpenDelete = () => {
        try {
            deleteRef.current && 
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
        return {handleDeSelect, handelOpenEdit, handelOpenDelete}
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
                onClick = {(e) => {if (e.detail === 1) {
                                        setActive(!active);
                                        props.onActivated(props.pIndex);
                                    } else if (e.detail === 2) {
                                        handelOpenView();
                                    }}}> 

                <Card.Body className="text-sm p-1">
                    <Row className="m-1">
                        <Col xs={5} sm={5} md={7} lg={7} xl={7} className="p-0">
                            <b>{subStr(props.pNo, 20)} ({subStr(categoryName, 20)})</b>
                        </Col>

                        <Col xs={5} sm={5} md={4} lg={4} xl={4} className="text-end p-0">
                            {props.pAccommodation} bedded
                        </Col>

                        {/* Start:: Column menu */}
                        <Col xs={2} sm={2} md={1} lg={1} xl={1} className="text-right p-0">
                            {/* Start:: operational menu */}
                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                    <MoreVertical size={16}/>
                                </Dropdown.Toggle>
                                
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="1" 
                                        onClick = {() => {handelOpenEdit()}}>
                                        <Edit3 className="feather-16 mr-3"/>Edit
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey="2"
                                        onClick = {() => {handelOpenDelete()}}>
                                        <Scissors className="feather-16 mr-3"/>Delete
                                    </Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                            {/* End:: operational menu */}
                        </Col>
                        {/* End:: Column menu */}
                    </Row>

                    <Row className="m-1">
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="p-0">
                            Tariff
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="text-right text-danger p-0">
                            {formatINR(props.pTariff)}
                        </Col>
                    </Row>

                    <Row className="m-1">
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="p-0">
                            Max. discount
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="text-right text-danger p-0">
                            {formatINR(props.pDiscount)}
                        </Col>
                    </Row>

                    <Row className="m-1">
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="p-0">
                            Ext. bed tariff
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="text-right text-danger p-0">
                            {formatINR(props.pBed)}
                        </Col>
                    </Row>

                    <Row className="m-1">
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="p-0">
                            Ext. person tariff
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="text-right text-danger p-0">
                            {formatINR(props.pPerson)}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* End :: card component */}

            {/* Start :: view component */}
            <View
                ref = {viewRef}
                pId = {props.pId} 
                onClosed = {() => {handleClose()}}/>
            {/* End :: view component */}

            {/* Start :: edit component */}
            <Edit 
                ref = {editRef}
                pId = {props.pId} 
                onEdited = {props.onEdited} 
                onClosed = {() => {handleClose()}}/>
            {/* End :: edit component */}

            {/* Start :: delete component */}
            <Delete 
                ref = {deleteRef}
                pId = {props.pId} 
                onDeleted = {props.onDeleted} 
                onClosed = {() => {handleClose()}}/>
            {/* End :: delete component */}
        </>
    );
    // End:: Html

});
// End:: Component

export default RoomCard;