import React, { forwardRef } from "react";

// Start:: Component
// props parameters
// pIndex
// pTableId
// pNo
// pGuestCount
// pStatus
const GuestRoomStatus = forwardRef((props, ref) => {

    // Start:: Html
    return (<div className="col-xl-3 align-items-center">
        {
            props.pStatus ?
                <h2>
                    <span className="badge badge-light-danger-border fs-8 fw-bold p-3" style={{"position":"relative"}}>
                        {props.pNo}
                        <span className="badge badge-danger" style={{"fontSize": "12px", "position": "absolute", "marginTop": "-20px" }}>{props.pGuestCount}</span>
                    </span>
                </h2>
            :
                <h2>
                    <span className="badge badge-light-success-border fs-8 fw-bold p-3">{props.pNo}</span>
                </h2>
        }

    </div>);
    // End:: Html

});


export default GuestRoomStatus;