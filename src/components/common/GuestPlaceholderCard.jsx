import React, { forwardRef } from "react";
import { Row, Card, Placeholder } from "react-bootstrap";

// Start:: Component
// props parameters
// pIndex
const GuestPlaceholderCard = forwardRef((props, ref) => {

    // Start:: Html
    return (
        <>
            {/* Start :: card component */}
            <Card 
                ref = {ref}
                key = {props.pIndex}
                index = {props.pIndex}
                className = {"border"}> 

                {/* Start:: card body */}
                <Card.Body className = "p-1"> 
                    <Placeholder animation="glow">
                        <Row className="m-1">
                            <Placeholder xs={7} sm={7} md={7} lg={7} xl={7} size="lg"/>
                            <Placeholder xs={4} sm={4} md={4} lg={4} xl={4} size="lg" className="ms-4"/>
                        </Row>
                        <Row className="my-2 mx-1">
                            <Placeholder xs={11} sm={11} md={11} lg={11} xl={11} size="sm" className="me-4"/>
                        </Row>
                        <Row className="m-1">
                            <Placeholder xs={9} sm={9} md={5} lg={5} xl={5} size="xs" className="me-1"/>
                            <Placeholder xs={0} sm={0} md={5} lg={5} xl={5} size="xs" className="mx-1"/>
                            <Placeholder xs={1} sm={1} md={1} lg={1} xl={1} size="xs" className="ms-2"/>
                        </Row>
                    </Placeholder>
                </Card.Body>
                {/* End:: card body */}
            </Card>
            {/* End :: card component */}
        </>
    );
    // End:: Html

});

export default GuestPlaceholderCard;