import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Form, Breadcrumb, Row, Col, Placeholder } from "react-bootstrap";
import { toast } from "react-toastify";

import { HotelId } from "../App";
import { useStateContext } from "../contexts/ContextProvider";
import { SocketContext } from "../contexts/ContextSocket";
import Add from "../components/common/GuestAddSmall";
import CardTable from "../components/guestTable/GuestTableCard";
import CardRoom from "../components/guestRoom/GuestRoomCard";
import CardPlaceholder from "../components/common/GuestPlaceholderCard";
import Paging from "../components/Paging";
import useFetchWithAuth from "../components/common/useFetchWithAuth";
import { SearchOption, ActivityArea, Operation, SocketRoom } from "../components/common/Common";

// Start:: Component
// props parameters

// useImperativeHandle
// changeSearch
// openAdd
// openEdit 
// openDelete
const GuestTables = forwardRef((props, ref) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const socket = useContext(SocketContext);
    const itemPerRow = contextValues.itemPerRow;
    const itemPerPage = contextValues.itemPerPage;
    const [search, setSearch] = useState("");
    const [restaurentOnly, setRestaurentOnly] = useState(JSON.parse(localStorage.getItem(SearchOption.RestaurentOnly)));
    const addRef = useRef(null);
    let cardRefs = useRef([]);
    cardRefs.current = [itemPerRow];
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [dataChanged, setDataChanged] = useState(false);
    const [selectedPage, setSelectedPage] = useState(1);
    const indexOfLastItem = selectedPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestTableAPI}/${hotelId}`,
        params: {
            search: search, 
            restaurentonly: restaurentOnly
        }
    });

    // Start:: leasten and act on command on socket
    useEffect(() => {
        try {   
            socket.on(SocketRoom.Table, (payload) => {
                try {
                    const {operation, guestId} = payload;

                    switch (operation) {
                        case Operation.GuestAdd:
                            setDataChanged(true);

                            break;                

                        case Operation.GuestMod:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId()) {
                                    object.handelRefresh();
                                }
                            });

                            break;                

                        case Operation.GuestDel:
                            setDataChanged(true);

                            break;                

                        case Operation.Table_Order:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId()) {
                                    object.handelRefresh();
                                }
                            });

                            break;

                        case Operation.Table_Despatch:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId()) {
                                    object.handelRefresh();
                                }
                            });

                            break;                

                        case Operation.Table_PaymentAdd:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId()) {
                                    object.handelRefresh();
                                }
                            });

                            break;                

                        case Operation.Table_Checkout:
                            setDataChanged(true);                            

                            break;                
                                
                        default:                
                            break;  
                    }              
                } catch (err) {
                    console.log(err);
                }
            });
        } catch (err) {
            console.log(err);
        }
    },[socket]);
    // End:: leasten and act on command on socket
    
    // Start:: fetch data list from api
    useEffect(() => {
        (async () => {
            try {
              await doFetch();
              setDataChanged(false);
              localStorage.setItem(SearchOption.RestaurentOnly, restaurentOnly);
            } catch (err) {
              console.log("Error occured when fetching data");
            }
          })();
    }, [dataChanged, search, restaurentOnly]);      // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch data list from api

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);

    // Start:: Change search text
    const changeSearch = (text) => {
        try {
            setSearch(text);
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
                })
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
                })
            }
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Open delete modal

    // Start:: on data operation successfully
    const handleSuccess = (operation = "", guestId = "") => {
        try {
            const payload = {operation, guestId};

            switch (operation) {
                case Operation.GuestAdd:
                    try {
                        toast.success("Guest successfully added");
                        socket.emit(SocketRoom.Table, payload);
                    } catch (err) {
                        console.log(err);
                    }        

                    break;

                case Operation.GuestMod:
                    try {
                        toast.success("Guest successfully changed");
                        socket.emit(SocketRoom.Table, payload);
                    } catch (err) {
                        console.log(err);
                    }        

                    break;

                case Operation.GuestDel:
                    try {
                        toast.success("Guest successfully deleted");
                        socket.emit(SocketRoom.Table, payload);
                    } catch (err) {
                        console.log(err);
                    }        

                    break;               
                        
                case Operation.Table_Order:
                    try {
                        toast.success("Item successfully ordered");
                        socket.emit(SocketRoom.Table, payload);
                    } catch (err) {
                        console.log(err);
                    }        

                    break;               

                case Operation.Table_Despatch:
                    try {
                        toast.success("Item successfully despatched");
                        socket.emit(SocketRoom.Table, payload);
                    } catch (err) {
                        console.log(err);
                    }        

                    break;                

                case Operation.BillGenerate:
                    try {
                        socket.emit(SocketRoom.Table, payload);
                    } catch (err) {
                        console.log(err);
                    }        

                    break;                
                        
                case Operation.Table_PaymentAdd:
                    try {
                        toast.success("Payment successfully added");
                        socket.emit(SocketRoom.Table, payload);
                    } catch (err) {
                        console.log(err);
                    }        

                    break;

                case Operation.Table_Checkout:
                    try {
                        toast.success("Guest successfully checked out");
                        socket.emit(SocketRoom.Table, payload);
                    } catch (err) {
                        console.log(err);
                    }        
        
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
        return { changeSearch, openAdd, openEdit, openDelete };
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
                <Row key={rowKey}>{
                        pData.map((item, idx) => {
                            const itemIdx = (rowIdx * itemPerRow) + idx;
                            return createCol(item, itemIdx);
                        })}
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
                    {(pData.option === ActivityArea.Room) && 
                        <CardRoom 
                            ref = {(el) => cardRefs.current[itemIdx] = el}
                            pIndex = {itemIdx}
                            pGuestId = {pData.id} 
                            pCallingFrom = {ActivityArea.Table}
                            onEdited = {(o, g) => {handleSuccess(o, g)}}
                            onDeleted = {(o, g) => {handleSuccess(o, g)}} 
                            onBooked = {(o, g) => {handleSuccess(o, g)}}
                            onBillGenerated = {(o, g) => {handleSuccess(o, g)}}
                            onPaymentAdded = {(o, g) => {handleSuccess(o, g)}} 
                            onCheckedout = {(o, g) => {handleSuccess(o,g)}} 
                            onOrdered = {(o, g) => {handleSuccess(o, g)}}
                            onDespatched = {(o, g) => {handleSuccess(o, g)}}
                            onActivated={() => {handleActivated(itemIdx)}} />}
                    
                    {(pData.option === ActivityArea.Table) &&
                        <CardTable 
                            ref = {(el) => cardRefs.current[itemIdx] = el}
                            pIndex = {itemIdx}
                            pGuestId = {pData.id} 
                            onEdited = {(o, g) => {handleSuccess(o, g)}}
                            onDeleted = {(o, g) => {handleSuccess(o, g)}} 
                            onOrdered = {(o, g) => {handleSuccess(o, g)}}
                            onDespatched = {(o, g) => {handleSuccess(o, g)}}
                            onBillGenerated = {(o, g) => {handleSuccess(o, g)}}
                            onPaymentAdded = {(o, g) => {handleSuccess(o, g)}} 
                            onCheckedout = {(o, g) => {handleSuccess(o, g)}} 
                            onActivated = {() => {handleActivated(itemIdx)}} />}              
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
                    pIndex = {itemIdx} />
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
                            <h1 className="text-dark">Table</h1>
                        </Col>

                        <Col sm={8}>
                            <Breadcrumb className="breadcrumb float-right">
                                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="/">Transaction</Breadcrumb.Item>
                                <Breadcrumb.Item active>Table</Breadcrumb.Item>
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
                                    {JSON.parse(restaurentOnly) ?
                                        <Form.Check 
                                            type = {"switch"}
                                            defaultChecked
                                            label = {"Restaurent only"} 
                                            onChange = {(e) => {
                                                setRestaurentOnly(e.currentTarget.checked)}}/>
                                    :
                                        <Form.Check 
                                            type = {"switch"}
                                            label = {"All guests"} 
                                            onChange = {(e) => {
                                                setRestaurentOnly(e.currentTarget.checked)}}/>                                                                                        
                                    }
                                </Col>
                                {/* End :: display switch option */}
                            </Row>
                        </div>
                        {/* End :: Header & operational panel */}

                        {/* Start :: Display data */}
                        <div className="card-body">
                            {loading &&
                                displayPlsceholder()}

                            {!loading && 
                                data && 
                                    displayData(data.slice(indexOfFirstItem, indexOfLastItem))}
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
                                                totalItem ={data.length}
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
                pOption = {ActivityArea.Table}
                onAdded = {() => {handleSuccess(Operation.GuestAdd)}}/>
            {/* End :: add component */}

        </div>
    );
    // End:: Html

});

export default GuestTables;
