import React, {useState, useRef, forwardRef, useImperativeHandle} from "react";
import {NavLink, Card, Stack, Dropdown} from "react-bootstrap";
import {MoreVertical, Edit3, Scissors} from "react-feather";

import {subStr, formatINR} from "../common/Common";
import View from "./FoodView";
import Edit from "./FoodEdit";
import Delete from "./FoodDelete";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <NavLink to='#' className='dropdown' ref={ref} 
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
const FoodCard = forwardRef((props, ref) => {
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
        return {handleDeSelect, handelOpenEdit, handelOpenDelete}
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
                    <Stack gap={0}>
                        <Stack direction="horizontal" gap={0}>
                            <span className="col-7 text-left pl-1">
                                <b>{subStr(props.pName, 25)}</b>
                            </span>

                            <span className="col-4 text-right text-danger p-0">
                                <b>{formatINR(props.pPrice)}</b>
                            </span>

                            {/* Start:: Column menu */}
                            <span className="col-1 text-right p-0">
                                {/* Start:: operational menu */}
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle}>
                                        <MoreVertical size={16} />
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

                        <Stack gap={0}>
                            <span className="col-12 text-left px-1">
                                {subStr(props.pDescription, 40)}
                            </span>
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
        </>
    );
    // End:: Html

});
// End:: Component


export default FoodCard;