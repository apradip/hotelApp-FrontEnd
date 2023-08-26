import React, { useState, useContext, useEffect, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useFormik } from "formik";
import { Operation, properCase } from "../common/Common";
import { Users, MapPin } from "react-feather";

import DespatchGrid from "../common/ItemDespatchGrid";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: Component
// props parameters
// pGuestId
// onRefresh()
const GuestMiscellaneousDespatchCard = forwardRef((props, ref) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [transactionId, setTransactionId] = useState(null);
    const [despatchData, setDespatchData] = useState(null);

    const {data, error, loading, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}/${props.pGuestId}`,
        params: {option: "N"}
    });         // get pending orders
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
        error && console.log(error);

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
        initialValues: {},
        onSubmit: async () => {
            try {
                despatchData && await doUpdate({deliveries: despatchData});

                if (error === null) {
                    resetForm();
                    await doFetch();
                    props.onDespatched(Operation.Miscellaneous_Despatch, props.pGuestId);
                } else {
                    console.log(error);
                }
            } catch (err) {
                console.log(err);
            }
        }
    });
    // End:: Form validate and save data

    // Start:: Show modal
    const handleRefresh = async () => {
        try {
            await doFetch();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show modal
    
    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleRefresh};
    });
    // End:: forward reff show modal function
    
    // Start:: Html
    return (
        <>
            {/* Start :: card component */}
            {data && 
                data.items.length > 0 &&
                    <Card 
                        ref = {ref}
                        key = {`MOA_${data.id}`}
                        className = {"miscellanious"}> 

                        {/* Start:: card body */}
                        <Card.Body className="text-sm p-1"> 

                            <Row className="d-none d-md-block d-lg-block d-xl-block m-1">
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0">

                                    {data.corporateName ?
                                        <>
                                            <MapPin className="feather-16 mr-2"/>
                                            <b>{properCase(data.corporateName)}</b>
                                        </>
                                    :
                                        <>
                                            <Users className="feather-16 mr-2"/>
                                            <b>{properCase(data.name)}</b>
                                        </>
                                    }

                                </Col>
                            </Row>

                            <Row className="m-1">
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0">
                                    
                                    <div className = "ag-theme-alpine grid-height-150">
                                        {/* Start:: Column service detail */}
                                        {<DespatchGrid
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
                                        className = "btn btn-success mt-1"
                                        disabled = {loading} 
                                        onClick = {handleSubmit}>

                                        {!loading && <b>OK</b>}
                                        {loading && <span className = "spinner-border spinner-border-sm" role = "status" aria-hidden = "true"></span>}

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

export default GuestMiscellaneousDespatchCard;