import React, { useContext, useEffect, forwardRef } from "react";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetchWithAuth from "../common/useFetchWithAuth";
import { subStr } from "../common/Common";

// Start:: Component
// props parameters
// pIndex
// pGuestId
const TableOrder = forwardRef((props, ref) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();

    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestTableAPI}/${hotelId}/${props.pGuestId}`,
        params: {option: "N"}
    });

    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            try {
                await doFetch();
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api
    
    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);


    // Start:: Html
    return (
        <>
            {(props.pIndex % 2) != 0 ? 
                <div className="d-flex bg-light-warning-border rounded p-1 mb-3">
                    <div className="col-xl-2 p-0 m-0">
                        <div className="rounded-circle-warning">
                            <span className="fw-bolder text-warning">
                                {props.pTableNo}
                            </span>
                        </div>
                    </div>
                    <div className="col-xl-10 p-1">
                        {data &&
                            data.items.length > 0 && 
                                data.items.map((food) => {
                                    return (<Row className="text-muted fs-8 mx-1" key={`_order_${props.pGuestId}_${food.id}`}>
                                        <Col className="col-xl-1 p-0">
                                            <span className="bullet bullet-vertical h-6px bg-warning p-0 m-0"></span>
                                        </Col>
                                        <Col className="col-xl-8 text-start p-0">{subStr(food.name, 20)}</Col>
                                        <Col className="col-xl-3 text-end p-0">{food.quantity}</Col>
                                    </Row>)})}
                    </div>
                </div>
                :
                <div className="d-flex bg-light-info-border rounded p-1 mb-3">
                    <div className="col-xl-2 p-0 m-0">
                        <div className="rounded-circle-info">
                            <span className="fw-bolder text-info">
                                {props.pTableNo}
                            </span>
                        </div>
                    </div>
                    <div className="col-xl-10 p-1">
                        {data &&
                            data.items.length > 0 && 
                                data.items.map((food) => {
                                    return (<Row className="text-muted fs-8 mx-1" key={`_order_${props.pGuestId}_${food.id}`}>
                                        <Col className="col-xl-1 p-0">
                                            <span className="bullet bullet-vertical h-6px bg-info p-0 m-0"></span>
                                        </Col>
                                        <Col className="col-xl-8 text-start p-0">{subStr(food.name, 20)}</Col>
                                        <Col className="col-xl-3 text-end p-0">{food.quantity}</Col>
                                    </Row>)})}
                    </div>
                </div>}
        </>
    );
    // End:: Html

});


export default TableOrder;