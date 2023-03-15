import React, { useState, useContext, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Table, Card, Dropdown } from "react-bootstrap";
import { Edit3, Scissors } from "react-feather";

import { subStr } from "../common/Common";
import View from "./FoodView";
import Edit from "./FoodEdit";
import Delete from "./FoodDelete";

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
const FoodCard = forwardRef(( props, ref ) => {
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
            <Card className='border'
                ref={ref}
                index={props.pIndex}
                border={active ? "info" : focus ? "primary" : ""}  
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
                                }} >

                <Card.Body className="pt-3 pl-1 pb-1 pr-1 m-0 card-element">
                    
                    {/* Start:: card header */}
                    <Card.Subtitle>

                        {/* Start:: Row */}
                        <div className="row">
                            {/* Start:: Column name */}
                            <div className="col-md-10">
                                <h4>{subStr(props.pName, 20)}</h4>
                            </div>
                            {/* End:: Column name */}
                            
                            {/* Start:: Column menu */}
                            <div className="col-md-2 text-right">
                                
                                {/* Start:: operational menu */}
                                <Dropdown autoClose="true">
                                    <Dropdown.Toggle 
                                        variant="light" 
                                        size="sm"
                                        align="end"
                                        drop="down" />
                                    
                                    <Dropdown.Menu>
                                        {/* Start:: edit menu */}
                                        <Dropdown.Item 
                                            href="#" 
                                            className="pl-2"
                                            onClick={handelOpenEdit}>
                                            <span 
                                                className="pr-5">
                                                <Edit3 className="feather-16 mr-3"/>Edit
                                            </span>
                                        </Dropdown.Item>
                                        {/* End:: edit menu */}

                                        {/* Start:: delete menu */}
                                        <Dropdown.Item 
                                            href="#" 
                                            className="m-0 pl-2"
                                            onClick={handelOpenDelete} >
                                                <span 
                                                    className="pr-5">
                                                    <Scissors className="feather-16 mr-3"/>Delete
                                                </span>
                                        </Dropdown.Item>
                                        {/* End:: delete menu */}

                                    </Dropdown.Menu>
                                    
                                </Dropdown>
                                {/* End:: operational menu */}

                            </div>
                            {/* End:: Column menu */}
                        </div>
                        {/* End:: Row */}

                    </Card.Subtitle>
                    {/* End:: card header */}

                    {/* Start:: card body */}
                    <Table striped size="sm" className="text-muted mb-0 mt-2">
                        <tbody>
                            <tr>
                                <td>Price</td>
                                <td className="text-right">{`₹ ${props.pPrice}`}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>{subStr(props.pDescription, 20)}</td>
                            </tr>
                        </tbody>                            
                    </Table>
                    {/* End:: card body */}

                </Card.Body>
            </Card>
            {/* End :: card component */}

            {/* Start :: view component */}
            <View
                ref={viewRef}
                pId={ props.pId} 
                onClosed={handleClose} />
            {/* End :: view component */}

            {/* Start :: edit component */}
            <Edit 
                ref={editRef}
                pId={props.pId} 
                onEdited={props.onEdited} 
                onClosed={handleClose} />
            {/* End :: edit component */}

            {/* Start :: delete component */}
            <Delete 
                ref={deleteRef}
                pId={props.pId} 
                onDeleted={props.onDeleted} 
                onClosed={handleClose} />
            {/* End :: delete component */}
        </>
    );
    // End:: Html

});
// End:: Component


export default FoodCard;