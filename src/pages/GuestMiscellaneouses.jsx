import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Form, Breadcrumb, Row, Col, Placeholder } from "react-bootstrap";
import { toast } from "react-toastify";

import { HotelId } from "../App";
import { useStateContext } from "../contexts/ContextProvider";
import Add from "../components/common/GuestAddSmall";
import CardMiscellaneous from "../components/guestMiscellaneous/GuestMiscellaneousCard";
import CardRoom from "../components/guestRoom/GuestRoomCard";
import CardPlaceholder from "../components/common/GuestPlaceholderCard";
import Paging from "../components/Paging";
import useFetchWithAuth from "../components/common/useFetchWithAuth";


const Operation = {
    GuestAdd: "GUEST_ADD",
    GuestMod: "GUEST_MOD",
    GuestDel: "GUEST_DEL",
    Order: "ORDER",
    Despatch: "DESPATCH",
    BillGenerate: "BILL_GENERATE",
    PaymentAdd: "PAYMENT_ADD",
    Checkout: "GUEST_CHECKOUT"
};

// Start:: Component
// props parameters
// onSuccess
// onClose

// useImperativeHandle
// changeSearch
// openAdd
// openEdit 
// openDelete
// close
const GuestMiscellaneouses = forwardRef((props, ref) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const itemPerRow = contextValues.itemPerRow;
    const itemPerPage = contextValues.itemPerPage;
    const [search, setSearch] = useState("");
    const [roomOnly, setRoomOnly] = useState(false);
    const addRef = useRef(null);
    let cardRefs = useRef([]);
    cardRefs.current = [itemPerRow];
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [dataChanged, setDataChanged] = useState(false);
    const [selectedPage, setSelectedPage] = useState(1);
    const indexOfLastItem = selectedPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestMiscellaneousAPI}/${hotelId}`,
        params: {
            search: search,
            roomonly: roomOnly
        }
    });

    // Start:: fetch data list from api
    useEffect(() => {
        (async () => {
            try {
              await doFetch();
              setDataChanged(false);
            } catch (err) {
              console.log("Error occured when fetching data");
            }
          })();
    }, [dataChanged, search, roomOnly]);      // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch data list from api

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);

    // Start:: Change search text
    const changeSearch = (search) => {
        try {
            setSearch(search);
            setSelectedPage(1);
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Change search text

    // Start:: Open add modal
    const openAdd = () => {
        try {
            addRef.current.handleShowModal();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Open add modal

    // Start:: Open edit modal
    const openEdit = () => {
        try {
            if (selectedCardIndex >= 0) { 
                cardRefs.current.forEach((item, idx) => {
                    if (selectedCardIndex === idx)
                        cardRefs.current[idx] && cardRefs.current[idx].handelOpenEdit();
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Open edit modal

    // Start:: Open delete modal
    const openDelete = () => {
        try {
            if (selectedCardIndex >= 0) { 
                cardRefs.current.forEach((item, idx) => {
                    if (selectedCardIndex === idx)
                        cardRefs.current[idx] && cardRefs.current[idx].handelOpenDelete();
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Open delete modal

    // Start:: Close modal
    const close = () => {
        try {
            props.onClose();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Close modal

    // Start:: on data operation successfully
    const handleSuccess = (operation) => {
        try {
            switch (operation) {
                case Operation.GuestAdd:
                    toast.success("Guest successfully added");
                    setDataChanged(true);
                    props.onSuccess();
                    break;

                case Operation.GuestMod:
                    toast.success("Guest successfully changed");
                    // setDataChanged(true);
                    props.onSuccess();
                    break;

                case Operation.GuestDel:
                    toast.success("Guest successfully deleted");
                    setDataChanged(true);
                    props.onSuccess();
                    break;               
                        
                case Operation.Order:
                    toast.success("Item successfully ordered");
                    // setDataChanged(true);
                    props.onSuccess();
                    break;               

                case Operation.Despatch:
                    toast.success("Item successfully despatched");
                    // setDataChanged(true);
                    props.onSuccess();
                    break;                

                case Operation.BillGenerate:
                    // setDataChanged(true);
                    props.onSuccess();
                    break;                
                        
                case Operation.PaymentAdd:
                    toast.success("Payment successfully added");
                    // setDataChanged(true);
                    props.onSuccess();
                    break;

                case Operation.Checkout:
                    toast.success("Guest successfully checked out");
                    setDataChanged(true);
                    props.onSuccess();
                    break;
                        
                default:                
                    break;                
            }
        } catch (err) {
            console.log(err);
        }
    };
    // End:: on data operation successfully

    // Start:: change selection of card element    
    const handleActivated = (index) => {
        try {
            setSelectedCardIndex(index);

            cardRefs.current && cardRefs.current.forEach((item, idx) => {
                if (index !== idx) 
                    cardRefs.current[idx] && cardRefs.current[idx].handleDeSelect();
            });
        } catch (err) {
            console.log(err);
        }
    };
    // End:: change selection of card element    

    // Seart:: handle page change
    const handlePaging = (pageNumber) => {
        try {
            cardRefs.current = [itemPerRow];
            setSelectedPage(pageNumber);
        } catch (err) {
            console.log(err);
        }
    };
    // End:: handle page change

    // Start:: forward reff change search and open add/edit/delete modal
    useImperativeHandle(ref, () => {
        return {changeSearch, openAdd, openEdit, openDelete, close};
    });
    // End:: forward reff change search and open add/edit/delete modal

    // Start:: show all data in card format
    const displayData = (pData = []) => {
        let rowIdx = 0;
        let colIdx = 0;
        let rowData = [];

        try {
            return pData.map((item) => {
                rowData.push(item);
                colIdx++;

                if ((rowData.length === itemPerRow) || (pData.length === colIdx)) {
                    const r = rowIdx;
                    const d = rowData;

                    rowIdx++;
                    rowData = [];

                    return createRow(d, r);
                } else { 
                    return null;
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const createRow = (pData, rowIdx) => {
        try {
            const rowKey=`row_${rowIdx}`;

            return (
                <Row key={rowKey}>
                    {
                        pData.map((item, idx) => {
                            const itemIdx = (rowIdx * itemPerRow) + idx;
                            return createCol(item, itemIdx);
                        })
                    }
                </Row>);
        } catch (err) {
            console.log(err);
        }
    };

    const createCol = (pData = undefined, itemIdx) => {   
        try {
            const colKey = `col_${pData.id}`;

            return (
                <Col xl={4} md={4} key={colKey}>
                    {(pData.option === "R") && 
                        <CardRoom 
                            className = "border"
                            ref = {(el) => cardRefs.current[itemIdx] = el}
                            pIndex = {itemIdx}
                            pGuestId = {pData.id} 
                            pName = {pData.name}
                            pMobile = {pData.mobile}
                            pGuestCount = {pData.guestCount}
                            pCorporateName = {pData.corporateName}
                            pCorporateAddress = {pData.corporateAddress}
                            pGstNo = {pData.gstNo}
                            pBalance = {pData.balance}
                            pOption = {pData.option}
                            pIndate={pData.inDate}
                            pInTime={pData.inTime}
                            pRooms = {pData.items}
                            pCallingFrom = {"M"}
                            onEdited = {() => {handleSuccess(Operation.GuestMod)}}
                            onDeleted = {() => {handleSuccess(Operation.GuestDel)}} 
                            onBooked = {() => {handleSuccess(Operation.Booked)}}
                            onBillGenerated = {() => {handleSuccess(Operation.BillGenerate)}}
                            onPaymentAdded = {() => {handleSuccess(Operation.PaymentAdd)}} 
                            onCheckedout = {() => {handleSuccess(Operation.Checkout)}} 
                            onOrdered = {() => {handleSuccess(Operation.Order)}}
                            onDespatched = {() => {handleSuccess(Operation.Despatch)}}
                            onActivated = {() => {handleActivated(itemIdx)}} 
                            onClosed = {close} />}

                    {(pData.option === "M") && 
                        <CardMiscellaneous 
                            className = "border"
                            ref = {(el) => cardRefs.current[itemIdx] = el}
                            pIndex = {itemIdx}
                            pGuestId = {pData.id} 
                            pName = {pData.name}
                            pMobile = {pData.mobile}
                            pGuestCount = {pData.guestCount}
                            pCorporateName = {pData.corporateName}
                            pCorporateAddress = {pData.corporateAddress}
                            pGstNo = {pData.gstNo}
                            pBalance = {pData.balance}
                            pOption = {pData.option}
                            pIndate = {pData.inDate}
                            pInTime = {pData.inTime}
                            onEdited = {() => {handleSuccess(Operation.GuestMod)}}
                            onDeleted = {() => {handleSuccess(Operation.GuestDel)}}
                            onOrdered = {() => {handleSuccess(Operation.Order)}}
                            onDespatched = {() => {handleSuccess(Operation.Despatch)}}
                            onBillGenerated = {() => {handleSuccess(Operation.BillGenerate)}}
                            onPaymentAdded = {() => {handleSuccess(Operation.PaymentAdd)}} 
                            onCheckedout = {() => {handleSuccess(Operation.Checkout)}} 
                            onActivated = {() => {handleActivated(itemIdx)}} 
                            onClosed = {close}/>}
                </Col>);
        } catch (err) {
            console.log(err);
        }
    };
    // End:: show all data in card format

    // Start:: show all data in card format
    const displayPlsceholder = (pData = [{},{},{},{},{},{},{},{},{},{},{},{}]) => {
        let rowIdx = 0;
        let colIdx = 0;
        let rowData = [];

        try {
            return pData.map((item) => {
                rowData.push(item);
                colIdx++;

                if ((rowData.length === itemPerRow) || (pData.length === colIdx)) {
                    const r = rowIdx;
                    const d = rowData;

                    rowIdx++;
                    rowData = [];

                    return createPlaceholderRow(d, r);
                } else { 
                    return null;
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const createPlaceholderRow = (pData, rowIdx) => {
        try {
            const rowKey=`row_${rowIdx}`;

            return (
                <Row key={rowKey}>
                    {
                        pData.map((item, idx) => {
                            const itemIdx = (rowIdx * itemPerRow) + idx;
                            return createPlaceholderCol(item, itemIdx);
                        })
                    }
                </Row>);
        } catch (err) {
            console.log(err);
        }
    };

    const createPlaceholderCol = (pData = undefined, itemIdx) => {   
        try {
            const colKey = `col_${itemIdx}`;

            return (
                <Col xl={4} md={4} key={colKey}>
                <CardPlaceholder 
                    ref = {(el) => cardRefs.current[itemIdx] = el}
                    pIndex = {itemIdx}
                    onClosed = {close}/>
                </Col>);
        } catch (err) {
            console.log(err);
        }
    };
    // End:: show all data in card format

    // Start:: Html
    return ( 
        <div className="content-wrapper">
            
            {/* Seart :: Bread crumb */}
            <div className="content-header">
                <div className="container-fluid">
                    <Row>
                        <Col sm={4} className="m-0">
                            <h1 className="text-dark">Miscellaneous</h1>
                        </Col>

                        <Col sm={8}>
                            <Breadcrumb className="breadcrumb float-right">
                                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="/">Transaction</Breadcrumb.Item>
                                <Breadcrumb.Item active>Miscellaneous</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </div>
            </div>
            {/* End :: Bread crumb */}

            {/* Start :: display data */}
            <section className="content">
                <div className="container-fluid">
                    <div className="card">

                        {/* Start :: Header & operational panel */}
                        <div className="card-header">
                            <Row>
                                {/* Start :: Display data count */}
                                <Col sx={6} md={6} className="text-danger">
                                    {loading && 
                                        <Placeholder animation="glow">
                                            <Placeholder xs={3} sm={3} md={3} lg={3} xl={3} bg="danger"/>
                                        </Placeholder>}

                                    {!loading && 
                                        data && 
                                            `item count : ${selectedPage * itemPerPage > data.length ? data.length : selectedPage * itemPerPage} of ${data.length}`}
                                </Col>
                                {/* End :: Display data count */}

                                {/* Start :: display switch option */}
                                <Col sx={6} md={6} className="d-flex justify-content-end">
                                    <Form.Check 
                                        type="switch"
                                        id="chkRoom"
                                        label={roomOnly ? "In-house guests" : "All guests"} 
                                        value={roomOnly} 
                                        onChange={(e) => {setRoomOnly(e.currentTarget.checked);}}/>
                                </Col>
                                {/* End :: display switch option */}
                            </Row>
                        </div>
                        {/* End :: Header & operational panel */}

                        {/* Start :: Display data */}
                        <div className="card-body">
                            <Row>
                                {loading &&
                                    displayPlsceholder()}

                                {!loading && 
                                    data && 
                                        displayData(data.slice(indexOfFirstItem, indexOfLastItem))}
                            </Row>                                    
                        </div>
                        {/* End :: Display data */}
                        
                        {/* Start :: Footer & operational panel */}
                        <div className="card-footer">
                            <Row>
                                {/* Start :: Pagination */}
                                <Col sx={12} md={12} className="d-flex justify-content-end">
                                    {loading && 
                                        <Placeholder animation="glow">
                                            <Placeholder.Button variant="primary" xs={1} sm={1} md={1} lg={1} xl={1}/>
                                        </Placeholder>}

                                    {!loading && 
                                        data && 
                                            <Paging
                                                itemPerPage = {itemPerPage}
                                                totalItem = {data.length}
                                                selectedPage = {selectedPage}
                                                onPaging = {handlePaging}/>}
                                </Col>
                                {/* End :: Pagination */}
                            </Row>
                        </div>
                        {/* End :: Footer & operational panel */}

                    </div>
                </div>
            </section>
            {/* End :: display data */}

            {/* Start :: add component */}
            <Add 
                ref = {addRef}   
                pOption = {"M"}
                onAdded = {() => {handleSuccess(Operation.GuestAdd)}}
                onClosed = {close}/>
            {/* End :: add component */}

        </div>
    );
    // End:: Html

});

export default GuestMiscellaneouses;
