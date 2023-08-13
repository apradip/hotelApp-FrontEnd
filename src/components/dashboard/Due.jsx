import React, { forwardRef } from "react";
import { Badge } from "react-bootstrap";

import { Phone } from "react-feather";
import { subStr, properCase, formatINR } from "../common/Common";

// Start:: Component
// props parameters
// pIndex
// pOption
// pGuestId
// pGuestName
// pGuestMobile
// pBalance
const Due = forwardRef((props, ref) => {

    // Start:: Html
    return (
        <div className="d-flex align-items-center p-1 mb-3">
            {props.pOption === "R" &&
                <span className="bullet bullet-vertical h-40px bg-info me-3"></span>}
            {props.pOption === "T" &&
                <span className="bullet bullet-vertical h-40px bg-warning me-3"></span>}
            {props.pOption === "S" &&                
                <span className="bullet bullet-vertical h-40px bg-primary me-3"></span>}
            {props.pOption === "M" &&
                <span className="bullet bullet-vertical h-40px bg-success me-3"></span>}
            <div className="flex-grow-1">
                <span className="text-muted fw-bold fs-8 d-block">{properCase(subStr(props.pGuestName, 20))}
                {props.pOption === "R" &&
                            <Badge pill bg="info">R</Badge>}
                {props.pOption === "T" &&
                            <Badge pill bg="warning">T</Badge>}
                {props.pOption === "S" &&
                            <Badge pill bg="primary">S</Badge>}
                {props.pOption === "M" &&
                            <Badge pill bg="success">M</Badge>}

                </span>
                <span className="text-muted d-block">
                    <Phone className="feather-16 mr-2"/>
                    {props.pGuestMobile}
                </span>
            </div>
            <span className="badge badge-light-danger fw-bolder fs-8">{formatINR(props.pBalance)}</span>
        </div>
    );
    // End:: Html

});


export default Due;