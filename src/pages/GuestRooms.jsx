import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Breadcrumb, Row, Col, Placeholder } from "react-bootstrap";
import { toast } from "react-toastify";

import { HotelId } from "../App";
import { useStateContext } from "../contexts/ContextProvider";
import { SocketContext } from "../contexts/ContextSocket";
import Add from "../components/guestRoom/GuestRoomAdd";
import CardRoom from "../components/guestRoom/GuestRoomCard";
import CardPlaceholder from "../components/common/GuestPlaceholderCard";
import Paging from "../components/Paging";
import useFetchWithAuth from "../components/common/useFetchWithAuth";
import { ActivityArea, Operation, MessageRoom } from "../components/common/Common";


// Start:: Component
// props parameters

// useImperativeHandle
// changeSearch
// openAdd
// openEdit 
// openDelete
const GuestRooms = forwardRef((props, ref) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const socket = useContext(SocketContext);
    const itemPerRow = contextValues.itemPerRow;
    const itemPerPage = contextValues.itemPerPage;
    const [search, setSearch] = useState("");
    const addRef = useRef(null);
    let cardRefs = useRef([]);
    cardRefs.current = [itemPerRow];
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [dataChanged, setDataChanged] = useState(false);
    const [selectedPage, setSelectedPage] = useState(1);
    const indexOfLastItem = selectedPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestRoomAPI}/${hotelId}`,
        params: {search: search}
    });

    // Start:: leasten and act on command on socket
    useEffect(() => {
        try {        
            socket.on(MessageRoom.Room, (payload) => {
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

                        case Operation.Booked:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId()) {
                                    object.handelRefresh();
                                }
                            });

                            break;                

                        case Operation.BillGenerate:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId()) {
                                    object.handelRefresh();
                                }
                            });

                            break;                

                        case Operation.Room_PaymentAdd:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId())
                                    object.handelRefresh();
                            });

                            break;                

                        case Operation.Room_Checkout:
                            setDataChanged(true);
                            
                            break;                
                                
                        default:                
                            break;  
                    }       
                } catch (err) {
                    console.log(err);
                }
            });

            socket.on(MessageRoom.Table, (payload) => {
                try {
                    const {operation, guestId} = payload;
                    
                    switch (operation) {
                        case Operation.Table_Order:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId()){
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

            socket.on(MessageRoom.Service, (payload) => {
                try {
                    const {operation, guestId} = payload;

                    switch (operation) {
                        case Operation.Service_Order:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId()) {
                                    object.handelRefresh();
                                }
                            });

                            break;

                        case Operation.Service_Despatch:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId()) {
                                    object.handelRefresh();
                                }
                            });

                            break;                

                        case Operation.Service_PaymentAdd:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId()) {
                                    object.handelRefresh();
                                }
                            });

                            break;                

                        case Operation.Service_Checkout:
                            setDataChanged(true);

                            break;                
                                
                        default:                
                            break;  
                    }    
                } catch (err) {
                    console.log(err);
                }          
            });

            socket.on(MessageRoom.Miscellaneous, (payload) => {
                try {
                    const {operation, guestId} = payload;

                    switch (operation) {
                        case Operation.Miscellaneous_Order:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId()) {
                                    object.handelRefresh();
                                }
                            });

                            break;

                        case Operation.Miscellaneous_Despatch:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId()) {
                                    object.handelRefresh();
                                }
                            });

                            break;                

                        case Operation.Miscellaneous_PaymentAdd:
                            cardRefs.current.forEach((object) => {
                                if (guestId === object.getGuestId()) {
                                    object.handelRefresh();
                                }
                            });

                            break;                
                                
                        case Operation.Miscellaneous_Checkout:
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
            } catch (err) {
                console.log(err);
            }
          })();
    }, [dataChanged, search]);      // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch data list from api

    // Start:: check error on fetch data
    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);
    // End:: check error on fetch data

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
            addRef.current && 
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
                    if (selectedCardIndex === idx) {
                        cardRefs.current[idx] && 
                            cardRefs.current[idx].handelOpenEdit();
                    }
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
                    if (selectedCardIndex === idx) {
                        cardRefs.current[idx] && 
                            cardRefs.current[idx].handelOpenDelete();
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
    // End:: Open delete modal

    // Start:: on data operation successfully
    const handleSuccess = (operation = "", guestId = "") => {
        const payload = {operation, guestId};

        try {
            switch (operation) {
                case Operation.GuestAdd:
                    toast.success("Guest successfully added");
                    socket.emit(MessageRoom.Room, payload);
                    
                    break;
        
                case Operation.GuestMod:
                    toast.success("Guest successfully changed");
                    socket.emit(MessageRoom.Room, payload);
                    
                    break;

                case Operation.GuestDel:
                    toast.success("Guest successfully deleted");
                    socket.emit(MessageRoom.Room, payload);
                    
                    break;               
                        
                case Operation.Booked:
                    toast.success("Room successfully booked");
                    socket.emit(MessageRoom.Room, payload);

                    break;               
        
                case Operation.BillGenerate:
                    socket.emit(MessageRoom.Room, payload);    
                    
                    break;                                
    
                case Operation.Table_Order:
                    toast.success("Order successfully placed");
                    socket.emit(MessageRoom.Table, payload);
                    
                    break;               

                case Operation.Service_Order:
                    toast.success("Order successfully placed");
                    socket.emit(MessageRoom.Service, payload);
                    
                    break;               
    
                case Operation.Miscellaneous_Order:
                    toast.success("Order successfully placed");
                    socket.emit(MessageRoom.Miscellaneous, payload);
                    
                    break;               
    
                case Operation.Table_Despatch:
                    toast.success("Order successfully despatched");
                    socket.emit(MessageRoom.Table, payload);
                    
                    break;                
                        
                case Operation.Service_Despatch:
                    toast.success("Order successfully despatched");
                    socket.emit(MessageRoom.Service, payload);
                    
                    break;                

                case Operation.Miscellaneous_Despatch:
                    toast.success("Order successfully despatched");
                    socket.emit(MessageRoom.Miscellaneous, payload);
                    
                    break;                
    
                case Operation.Room_PaymentAdd:
                    toast.success("Payment successfully done");
                    socket.emit(MessageRoom.Room, payload);
                    
                    break;

                case Operation.Table_PaymentAdd:
                    toast.success("Payment successfully done");
                    socket.emit(MessageRoom.Table, payload);
                    
                    break;
                        
                case Operation.Service_PaymentAdd:
                    toast.success("Payment successfully done");
                    socket.emit(MessageRoom.Service, payload);
                    
                    break;

                case Operation.Miscellaneous_PaymentAdd:
                    toast.success("Payment successfully done");
                    socket.emit(MessageRoom.Service, payload);
                    
                    break;
                    
                case Operation.Room_Checkout:
                    toast.success("Guest successfully checked out");
                    socket.emit(MessageRoom.Room, payload);
                    
                    break;

                case Operation.Table_Checkout:
                    toast.success("Guest successfully checked out");
                    socket.emit(MessageRoom.Table, payload);
                    
                    break;
    
                case Operation.Service_Checkout:
                    toast.success("Guest successfully checked out");
                    socket.emit(MessageRoom.Service, payload);
                    
                    break;
    
                case Operation.Miscellaneous_Checkout:
                    toast.success("Guest successfully checked out");
                    socket.emit(MessageRoom.Miscellaneous, payload);
                    
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
                if (index !== idx) {
                    cardRefs.current[idx] && 
                        cardRefs.current[idx].handleDeSelect();
                }
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

            return (<Row key={rowKey}>{
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

            return (<Col xl={4} md={4} key={colKey}>
                    {<CardRoom 
                        ref = {(el) => cardRefs.current[itemIdx] = el}
                        pIndex = {itemIdx}
                        pGuestId = {pData.id} 
                        pCallingFrom = {ActivityArea.Room}
                        onEdited = {(o, g) => {handleSuccess(o, g)}}
                        onDeleted = {(o, g) => {handleSuccess(o, g)}} 
                        onBooked = {(o, g) => {handleSuccess(o, g)}}
                        onBillGenerated = {(o, g) => {handleSuccess(o, g)}}
                        onPaymentAdded = {(o, g) => {handleSuccess(o, g)}} 
                        onCheckedout = {(o, g) => {handleSuccess(o, g)}} 
                        onOrdered = {(o, g) => {handleSuccess(o, g)}}
                        onDespatched = {(o, g) => {handleSuccess(o, g)}}
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

            return (<Row key={rowKey}>
                    {pData.map((item, idx) => {
                            const itemIdx = (rowIdx * itemPerRow) + idx;
                            return createPlaceholderCol(item, itemIdx);
                        })}
                </Row>);
        } catch (err) {
            console.log(err);
        }
    };

    const createPlaceholderCol = (pData = undefined, itemIdx) => {   
        try {
            const colKey = `col_${itemIdx}`;

            return (<Col xl={4} md={4} key={colKey}>
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
                    <div className="row">
                        <div className="col-sm-4 m-0">
                            <h1 className="text-dark">Room</h1>
                        </div>

                        <div className="col-sm-8">
                            <Breadcrumb className="breadcrumb float-sm-right">
                                <Breadcrumb.Item href = "/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href = "/">Transaction</Breadcrumb.Item>
                                <Breadcrumb.Item active>Room</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
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
                                                    totalItem = {data.length}
                                                    selectedPage = {selectedPage}
                                                    onPaging = {handlePaging} />}
                                </Col>
                                {/* End :: Pagination */}
                            </Row>
                        </div>
                        {/* End :: Footer & operational panel */}

                    </div>
                </div>
            </section>
            {/* End :: display data */}

            {/* Start :: add employee component */}
            <Add 
                ref = {addRef}    
                onAdded = {() => {handleSuccess(Operation.GuestAdd)}}/>
            {/* End :: add employee component */}

        </div>
    );
    // End:: Html

});


export default GuestRooms;
