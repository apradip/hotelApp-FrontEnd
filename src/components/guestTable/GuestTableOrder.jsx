import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, NavLink, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { X } from "react-feather";
import { subStr, getTables } from "../common/Common";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { guestTableSchema } from "../../schemas";
import TableSelect from "../common/TableSelect";
import OrderGrid from "./TableOrderGrid";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: form
const Form = ({pGuestId, pName, pMobile, pGuestCount,
    pCorporateName, pCorporateAddress, pGstNo, 
    pTransactionId, pTables, pData, 
    pShow,
    onSubmited, onClosed}) => {

    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [orderData, setOrderData] = useState(null);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doInsert} = useFetchWithAuth({
        url: `${contextValues.guestTableAPI}/${hotelId}/${pGuestId}/${pTransactionId}`
    });
    const {doUpdate} = useFetchWithAuth({
        url: `${contextValues.guestTableAPI}/${hotelId}/${pGuestId}`
    });

    // Strat:: save assigned table 
    const handleChangeTable = async (tables) => {
        try {
            await doUpdate({tables: tables});
        } catch (err) {
            console.log(err);
        }
    };
    // End:: save assigned table
    
    const handelChangeFood = (gridData) => {
        let dataList = [];

        try {
            for (const row of gridData) {
                let operation = "A";

                for (const od of pData) {
                    if (od.id === row.id) operation = "M";
                }

                dataList.push({
                    id: row.id,
                    quantity: row.quantity,
                    operation: operation
                });
            }

            for (const od of pData) {
                let found = false;

                for (const e of gridData) {
                    if (e.id === od.id) found = true;
                }

                if (!found) {
                    dataList.push({
                        id: od.id,
                        quantity: od.quantity,
                        operation: "R"
                    });
                }
            }

            setOrderData(dataList);
        } catch (err) {
            console.log(err);
        }
    };

    // Start:: Form validate and save data
    const {setFieldValue, handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputName: pName,
            keyInputMobile: pMobile,
            keyInputGuestCount: pGuestCount,
            keyInputCorporateName: pCorporateName,
            keyInputCorporateAddress: pCorporateAddress,
            keyInputGstNo: pGstNo,
            keyInputTables: pTables
        },
        validationSchema: guestTableSchema,
        validateOnChange,
        onSubmit: async () => {
            try {
                orderData && await doInsert({orders: orderData});

                if (error === null) {
                    resetForm();
                    onSubmited();
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

    
    // Strat:: close form    
    const handleClose = () => {
        try {
            setValidateOnChange(false);
            resetForm();
            onClosed();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: close form    

    // Start:: Html
    return (
        <Modal size="lg"
            show={pShow}>

            {/* Start:: Modal header */}
            <Modal.Header>
                {/* Header text */}
                <Modal.Title>Order - [{getTables(pTables)}]</Modal.Title>

                {/* Close button */}
                <NavLink
                    className="nav-icon" href="#"
                    onClick={handleClose}>
                    <i className="align-middle"><X /></i>
                </NavLink>
            </Modal.Header>
            {/* End:: Modal header */}
    
            {/* Start:: Modal body */}
            <Modal.Body>

                {/* Start:: Row */}
                <Row>

                    {/* Start:: Column name / company */}
                    {pCorporateName ?
                        <Col sx={12} md={5}>
                            <label className="col-12 form-label"><b>Company</b></label>
                            <label className="col-12 text-mutedl">{subStr(pCorporateName, 30)}</label>
                        </Col>
                        :
                        <Col sx={12} md={5}>
                            <label className="col-12 form-label"><b>Name</b></label>
                            <label className="col-12 text-muted">{subStr(pName, 30)}</label>
                        </Col>
                    }
                    {/* End:: Column name / company */}

                    {/* Start:: Column mobile no / company address */}
                    {pCorporateName ?
                        <Col sx={12} md={5}>
                            <label className="col-12 form-label"><b>Address</b></label>
                            <label className="col-12 text-muted">{subStr(pCorporateAddress, 30)}</label>
                        </Col>
                        :
                        <Col sx={12} md={5}>
                            <label className="col-12 form-label"><b>Mobile no.</b></label>
                            <label className="col-12 text-muted">{pMobile}</label>
                        </Col>
                    }
                    {/* End:: Column mobile no / company address */}

                    {/* Start:: Column guest count */}
                    <Col sx={12} md={2}>
                        <label className="col-12 form-label"><b>Guest count</b></label>
                        <label className="col-12 text-muted">{pGuestCount} No.</label>
                    </Col>
                    {/* End:: Column guest count */}

                </Row>
                {/* End:: Row */}


                {/* Start:: Row */}
                <Row>

                    <Col sx={5} md={5}>
                        {/* Label element */}
                        <label className="col-12 form-label"><b>Food items</b></label>
                    </Col>

                    <Col sx={7} md={7}>
                        {/* Label element */}
                        <label className="col-12 form-label"><b>Tables</b></label>

                        {/* Input element select*/}
                        <TableSelect
                            name={"keyInputTables"}
                            value={pTables}
                            onChange={(value) => {
                                setFieldValue("keyInputTables", value);
                                if (!value) return;
                                handleChangeTable(value);
                            }}/>
                    </Col>

                </Row>
                {/* End:: Row */}

                {/* Start:: Row */}
                <Row className="mt-2">

                    {/* Start:: Column service detail */}
                    <Col sx={12} md={12}>

                        {/* Start:: Column service detail */}
                        <OrderGrid
                            pState = "MOD"
                            pDefaultRowData = {pData}
                            onChange = {(value) => {
                                if (!value) return;
                                handelChangeFood(value);
                            }} />
                        {/* End:: Column service detail */}

                    </Col>
                    {/* End:: Column service detail */}

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
                    disabled={loading}
                    onClick={handleClose}>
                    Close
                </button>
                {/* End:: Close button */}

                {/* Start:: Save button */}
                <button
                    type="button"
                    className="btn btn-success"
                    disabled={loading}
                    onClick={handleSubmit}>

                    {!loading && "Confirm"}
                    {loading &&
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Working
                        </>}
                </button>
                {/* End:: Save button */}

            </Modal.Footer>
            {/* End:: Modal footer */}

        </Modal>
    );
    // End:: Html

};
// End:: form


// Start:: Component
// props parameters
// pGuestId
// pTransactionId
// pName
// pMobile
// pGuestCount
// pCorporateName
// pCorporateAddress
// pGstNo
// onSaved()
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestTableOrder = forwardRef((props, ref) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestTableAPI}/${hotelId}/${props.pGuestId}`,
        params: {option: "N"}
    });

    // Start:: Show modal
    const handleShowModal = () => {
        try {
            setShowModal(true);
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Show modal

    // Start:: Close modal
    const handleCloseModal = () => {
        try {
            setShowModal(false);
            props.onClosed();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Close modal

    // Start:: Save
    const handleSave = () => {
        try {
            setShowModal(false);
            props.onSaved();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Save

    // Start:: forward reff show modal function
    useImperativeHandle(ref, () => {
        return {handleShowModal};
    });
    // End:: forward reff show modal function

    // Strat:: close modal on key press esc    
    useEffect(() => {
        document.addEventListener("keydown", (event) => {if (event.key === "Escape") handleCloseModal();});
        return () => {document.removeEventListener("keydown", handleCloseModal);};
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: close modal on key press esc    
    
    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            try {
                showModal && await doFetch();
            } catch (err) {
                console.log(err);
            }
        })();
    }, [showModal]);        // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    // Start:: Html
    return (
        <>
            {/* Start:: Edit modal */}
            {data &&
                <Form
                    pGuestId = {props.pGuestId}
                    pName = {data.name}
                    pMobile = {data.mobile}
                    pGuestCount = {data.guestCount}
                    pCorporateName = {data.corporateName}
                    pCorporateAddress = {data.corporateAddress}
                    pGstNo = {data.gstNo}
                    pTransactionId = {data.transactionId}
                    pTables = {data.tables}
                    pData = {data.items}
                    pShow = {showModal}
                    onSubmited = {handleSave}
                    onClosed = {handleCloseModal} />}
            {/* End:: Edit modal */}
        </>
    );
    // End:: Html

});
// End:: Component


export default GuestTableOrder;