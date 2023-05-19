import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { NavLink, Card, Stack, Dropdown } from "react-bootstrap";

import { ChevronDown, Edit3, Scissors } from "react-feather";
import { subStr } from "../common/Common";
import RoomCategoryView from "./RoomCategoryView";
import RoomCategoryEdit from "./RoomCategoryEdit";
import RoomCategoryDelete from "./RoomCategoryDelete";

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
// pName
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
const RoomCategoryCard = forwardRef(( props, ref ) => {
    const viewRef = useRef(null);
    const editRef = useRef(null);
    const deleteRef = useRef(null);
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
                                <h4>{ subStr(props.pName, 20) }</h4>
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
                                            onClick = {handelOpenEdit}>
                                            <Edit3 className="feather-16 mr-3"/>Edit
                                        </Dropdown.Item>

                                        <Dropdown.Item eventKey="2"
                                            onClick = {handelOpenDelete}>
                                            <Scissors className="feather-16 mr-3"/>Delete
                                        </Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                                {/* End:: operational menu */}
                            </span>
                            {/* End:: Column menu */}
                        </Stack>

                        <Stack direction="horizontal" gap={0}>
                            <span className="col-6 text-left">Room tariff</span>
                            <span className="col-6 text-right">{`₹ ${props.pTariff}`}</span>
                        </Stack>

                        <Stack direction="horizontal" gap={0}>
                            <span className="col-6 text-left">Max. discount</span>
                            <span className="col-6 text-right">{`₹ ${props.pDiscount}`}</span>
                        </Stack>                        

                        <Stack direction="horizontal" gap={0}>
                            <span className="col-6 text-left">Ext. bed tariff</span>
                            <span className="col-6 text-right">{`₹ ${props.pBed}`}</span>
                        </Stack>                                                

                        <Stack direction="horizontal" gap={0}>
                            <span className="col-6 text-left">Ext. person tariff</span>
                            <span className="col-6 text-right">{`₹ ${props.pPerson}`}</span>
                        </Stack>                                                                        
                    </Stack>
                </Card.Body>
            </Card>
            {/* End :: card component */}

            {/* Start :: view component */}
            <RoomCategoryView
                ref = { viewRef }
                pId = { props.pId } 
                onClosed = { handleClose } />
            {/* End :: view component */}

            {/* Start :: edit component */}
            <RoomCategoryEdit 
                ref = { editRef }
                pId = { props.pId } 
                onEdited = { props.onEdited } 
                onClosed = { handleClose } />
            {/* End :: edit component */}

            {/* Start :: delete component */}
            <RoomCategoryDelete 
                ref = { deleteRef }
                pId = { props.pId } 
                onDeleted = { props.onDeleted } 
                onClosed = { handleClose } />
            {/* End :: delete component */}
        </>
    );
    // End:: Html

});


export default RoomCategoryCard;