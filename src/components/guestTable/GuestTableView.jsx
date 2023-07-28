import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink, Row, Col } from "react-bootstrap";
import { X } from "react-feather";
import { subStr } from "../common/Common";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import ViewGrid from "./TableViewGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";

// Start:: form
const Form = ({pName, pMobile, pGuestCount, 
               pCorporateName, pCorporateAddress, 
               pTables, pData, 
               pShow, 
               onClosed}) => {
                    
    const [defaultRowData, setDefaultRowData] = useState([]);

    useEffect(() => {
        try {
            if (pData) {
                pData.forEach(element => {
                    const rowData = {
                        rowId: defaultRowData.length + 1, 
                        id: element.id,
                        name: element.name, 
                        unitPrice: element.unitPrice,
                        quantity: element.quantity, 
                        serviceChargePercentage: element.serviceChargePercentage, 
                        serviceCharge: element.serviceCharge, 
                        gstPercentage: element.gstPercentage, 
                        gstCharge: element.gstCharge, 
                        totalPrice: element.unitPrice * element.quantity,
                        despatchDate: element.despatchDate ? element.despatchDate : "",
                        despatchTime: element.despatchTime ? element.despatchTime : ""
                    };

                    defaultRowData.push(rowData);
                });
            }

            setDefaultRowData(defaultRowData);
        } catch (err) {
            console.log("Error occured when fetching data");
        }
    }, [pData])        // eslint-disable-line react-hooks/exhaustive-deps

    // Start:: Html
    return (
        <Modal size="lg"
            show={pShow}>

            {/* Start:: Modal header */}
            <Modal.Header>
                {/* Header text */}
                <Modal.Title>Orders</Modal.Title>
                {/* Close button */}
                <NavLink 
                    className="nav-icon" href="#" 
                    onClick={onClosed} >
                    <i className="align-middle"><X/></i>
                </NavLink>
            </Modal.Header>
            {/* End:: Modal header */}
    
            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column name / company */}
                    {pCorporateName ? 
                        <Col sx={12} md={5} className="mb-3">
                            <label className="col-12 form-label"><b>Company</b></label>
                            <label className="col-12 text-muted">{subStr(pCorporateName, 30)}</label>
                        </Col>
                    :
                        <Col sx={12} md={5} className="mb-3">
                            <label className="col-12 form-label"><b>Name</b></label>
                            <label className="col-12 text-muted">{subStr(pName, 30)}</label>
                        </Col>
                    }
                    {/* End:: Column name / company */}

                    {/* Start:: Column mobile no / company address */}
                    {pCorporateName ? 
                        <Col sx={12} md={5} className="mb-3">
                            <label className="col-12 form-label"><b>Address</b></label>
                            <label className="col-12 text-muted">{subStr(pCorporateAddress, 30)}</label>
                        </Col>
                    :
                        <Col sx={12} md={5} className="mb-3">
                            <label className="col-12 form-label"><b>Mobile no.</b></label>
                            <label className="col-12 text-muted">{pMobile}</label>
                        </Col>
                    }
                    {/* End:: Column mobile no / company address */}

                    {/* Start:: Column mobile no / company address */}
                    <Col sx={12} md={2} className="mb-3">
                        <label className="col-12 form-label"><b>Guest count</b></label>
                        <label className="col-12 text-muted">{pGuestCount} No.</label>
                    </Col>
                    {/* End:: Column mobile no / company address */}

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row>

                    <Col sx={12} md={12}>
                        {/* Label element */}
                        <label className="col-12 text-muted"><b>Food items</b></label>

                        {/* Start:: Column room detail */}
                        <ViewGrid
                            pDefaultRowData={defaultRowData}/>
                        {/* End:: Column room detail */}

                    </Col>                
                </Row>
                {/* End:: Row */}

            </Modal.Body>
            {/* End:: Modal body */}

            {/* Start:: Modal footer */}
            <Modal.Footer>

                {/* Start:: Close button */}
                <button
                    type="button"
                    className="btn btn-danger"
                    autoFocus
                    onClick={onClosed}>
                    Close
                </button>
                {/* End:: Close button */}

            </Modal.Footer>
            {/* End:: Modal footer */}

        </Modal>
    )
    // End:: Html

};
// End:: form


// Start:: Component
// props parameters
// pGuestId
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestTableView = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestTableAPI}/${hotelId}/${props.pGuestId}`,
        params: {option: "GA"}
    });

    // Start :: Show modal 
    const handleShowModal = () => {
        try {
            setShowModal(true);
        } catch (err) {
            console.log(err);
        }
    };
    // End :: Show modal 

    // Start :: Close modal 
    const handleCloseModal = () => {
        try {
            setShowModal(false);
        } catch (err) {
            console.log(err);
        }
    };
    // End :: Close modal 

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal};
    });
    // End:: forward reff show modal function

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {if (event.key === "Escape") handleCloseModal();});
        return () => {document.removeEventListener("keydown", handleCloseModal);}
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    

    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            try {
                showModal && await doFetch();
            } catch (err) {
              console.log("Error occured when fetching data");
            }
          })();
    }, [showModal]);         // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    // Start:: Html
    return (
        <>
            {/* Start:: View modal */}
            {data &&
                <Form 
                    pName = {data.name}
                    pMobile = {data.mobile}
                    pGuestCount = {data.guestCount}
                    pCorporateName = {data.corporateName}
                    pCorporateAddress = {data.corporateAddress}
                    pTables = {data.tables}
                    pData = {data.items}
                    pShow = {showModal}
                    onClosed = {handleCloseModal}/>}
            {/* End:: View modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestTableView;