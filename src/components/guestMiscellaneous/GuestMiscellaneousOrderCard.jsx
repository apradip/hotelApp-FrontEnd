import React, { useState, useContext, useEffect, forwardRef } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";
// import { subStr, getTables } from "../common/Common";
// import TimeElapsed from "../common/TimeElapsed";

import DespatchGrid from "../common/ItemDespatchGrid";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: Component
// props parameters
// pIndex
// pGuestId
// onSaved()
// onClosed()

const GuestMiscellaneousOrderCard = forwardRef((props, ref) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [transactionId, setTransactionId] = useState(null);
    const [despatchData, setDespatchData] = useState(null);

    const {data, error, loading, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${props.pGuestId}`,
        params: {option: "N"}
    });
    const {doUpdate} = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${props.pGuestId}/${transactionId}`
    });         // update delivery status

    useEffect(() => {
        (async () => {
            try {
                await doFetch();
            } catch (err) {
                console.log(err);
            }
        })();
    }, [props.pGuestId]);

    useEffect(() => {
        error && toast.error(error);
        data && setTransactionId(data.transactionId);
    }, [data, error, loading]);
    

    const handelChangeData = (gridData) => {
        let listData = [];
        
        try {
            for(const row of gridData) {
                listData.push({itemTransactionId: row.itemTransactionId});
            }

            setDespatchData(listData);
        } catch (err) {
            console.log(err);
        }
    }; 

    // Start:: Form validate and save data
    const {handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputName: "",
        },
        onSubmit: async () => {
            try {
                despatchData && await doUpdate({deliveries: despatchData});

                if (error === null) {
                    resetForm();
                    props.onSaved();

                    await doFetch();
                } else {
                    toast.error(error);
                }
            } catch (err) {
                console.log(err);
                toast.error(err);
            }
        }
    });
    // End:: Form validate and save data

    // Start:: Html
    return (
        <>
            {/* Start :: card component */}
            {data && data.items.length > 0 &&
                <Card 
                    className="border"
                    ref = {ref}
                    key = {props.pIndex}
                    index = {props.pIndex}> 

                    {/* Start:: card body */}
                    <Card.Body className="text-sm p-1"> 

                        <Row className="d-none d-md-block d-lg-block d-xl-block m-1">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0">
                                Guest: {data && data.name}
                            </Col>
                        </Row>

                        <Row className="m-1">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0">
                                
                                <div className = "ag-theme-alpine grid-height-150">
                                    {/* Start:: Column service detail */}
                                    {data &&
                                        <DespatchGrid
                                            pDefaultRowData = {data.items}
                                            onChange = {handelChangeData}/>}
                                    {/* End:: Column service detail */}
                                </div>

                            </Col>
                        </Row>

                        <Row className="m-1">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0 text-right">
                                
                                {/* Start:: Save button */}
                                <button 
                                    type = "button"
                                    className = "btn btn-success"
                                    disabled = {loading} 
                                    onClick = {handleSubmit}>

                                    {!loading && "Done"}
                                    {loading && 
                                                <>
                                                    <span className = "spinner-border spinner-border-sm" role = "status" aria-hidden = "true"></span>
                                                </>}
                                </button>
                                {/* End:: Save button */}

                            </Col>
                        </Row>

                    </Card.Body>
                    {/* End:: card body */}
                </Card>
            }
            {/* End :: card component */}
        </>
    );
    // End:: Html

});

export default GuestMiscellaneousOrderCard;