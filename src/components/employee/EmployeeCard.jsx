import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { NavLink, Card, Dropdown, Row, Col } from "react-bootstrap";

import {MoreVertical, Edit3, Scissors} from "react-feather";
import {subStr, getAccessLevel} from "../common/Common";
import View from "./EmployeeView";
import Edit from "./EmployeeEdit";
import Delete from "./EmployeeDelete";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <NavLink to="#" className="dropdown"
        onClick={(e) => {e.preventDefault(); onClick(e);}}>
      {children}
    </NavLink>
));

// Start:: Component
// props parameters
// pIndex
// pAccessLevels
// pName
// pMobile
// pEmail
// pAddress
// onActivated()
// onClosed()

// useImperativeHandle
// handleDeSelect
// handelOpenEdit 
// handelOpenDelete
const EmployeeCard = forwardRef((props, ref) => {
    const viewRef = useRef(null);
    const editRef = useRef(null);
    const deleteRef = useRef(null);
    const [focus, setFocus] = useState(false);
    const [active, setActive] = useState(false);

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
                onClick={(e) => {if (e.detail === 1) {
                                    setActive(!active);
                                    props.onActivated(props.pIndex);
                                 } else if (e.detail === 2) {
                                    handelOpenView();
                                }}}> 

                <Card.Body className="text-sm p-1">
                    <Row className="m-1">
                        <Col xs={10} sm={10} md={11} lg={11} xl={11} className="p-0 m-0">
                            <b>{subStr(props.pName, 20)}</b>
                        </Col>

                        {/* Start:: Column menu */}
                        <Col xs={2} sm={2} md={1} lg={1} xl={1} className="text-right p-0 m-0">
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
                        <Col xs={4} sm={4} md={5} lg={5} xl={5} className="p-0 m-0">
                            Role
                        </Col>
                        <Col xs={8} sm={8} md={7} lg={7} xl={7} className="text-right p-0 m-0">
                            {subStr(getAccessLevel(props.pAccessLevels), 20)}
                        </Col>
                    </Row>

                    <Row className="m-1">
                        <Col xs={4} sm={4} md={5} lg={5} xl={5} className="p-0 m-0">
                            Mobile no.
                        </Col>
                        <Col xs={8} sm={8} md={7} lg={7} xl={7} className="text-right p-0 m-0">
                            {props.pMobile}
                        </Col>
                    </Row>

                    <Row className="m-1">
                        <Col xs={4} sm={4} md={5} lg={5} xl={5} className="p-0 m-0">
                            Email
                        </Col>
                        <Col xs={8} sm={8} md={7} lg={7} xl={7} className="text-right p-0 m-0">
                            {props.pEmail}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* End :: card component */}

            {/* Start :: view employee component */}
            <View
                ref = {viewRef}
                pId = {props.pId} 
                onClosed = {() => {handleClose()}}/>
            {/* End :: view employee component */}

            {/* Start :: edit employee component */}
            <Edit 
                ref = {editRef}
                pId = {props.pId} 
                onEdited = {props.onEdited} 
                onClosed = {() => {handleClose()}}/>
            {/* End :: edit employee component */}

            {/* Start :: delete employee component */}
            <Delete 
                ref = {deleteRef}
                pId = {props.pId} 
                onDeleted = {props.onDeleted} 
                onClosed = {() => {handleClose()}}/>
            {/* End :: delete employee component */}
        </>
    );
    // End:: Html

});

export default EmployeeCard;