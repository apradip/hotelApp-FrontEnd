import React, {useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";
import {Breadcrumb} from "react-bootstrap";
import {toast} from "react-toastify";

import {HotelId} from "../App";
import {useStateContext} from "../contexts/ContextProvider";
import Add from "../components/guestRoom/GuestRoomAdd";
import Card from "../components/guestRoom/GuestRoomCard";
import Paging from "../components/Paging";
import useFetchWithAuth from "../components/common/useFetchWithAuth";

const Operation = {
    GuestAdd: 'GUEST_ADD',
    Booked: 'BOOKED',
    BillGenerate: 'BILL_GENERATE',
    PaymentAdd: 'PAYMENT_ADD',
    Checkout: 'GUEST_CHECKOUT',
    GuestDel: 'GUEST_DEL'
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
const GuestRooms = forwardRef(( props, ref ) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
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
        params: {
            search: search
        }
    });

    // Start:: Change search text
    const changeSearch = (text) => {
        setSearch(text);
        setSelectedPage(1);
    };
    // End:: Change search text

    // Start:: Open add modal
    const openAdd = () => {
        addRef.current.handleShowModal();
    };
    // End:: Open add modal

    // Start:: Open edit modal
    const openEdit = () => {
        if (selectedCardIndex !== null) {
            if (selectedCardIndex >= 0) { 
                cardRefs.current.forEach((item, idx) => {
                    if (selectedCardIndex === idx)
                        cardRefs.current[idx] && cardRefs.current[idx].handelOpenEdit();
                });
            } else {
                toast.warning("Nothing selected to edit");
            }
        }
    };
    // End:: Open edit modal

    // Start:: Open delete modal
    const openDelete = () => {
        if (selectedCardIndex !== null) {
            if (selectedCardIndex >= 0) { 
                cardRefs.current.forEach((item, idx) => {
                    if (selectedCardIndex === idx)
                        cardRefs.current[idx] && cardRefs.current[idx].handelOpenDelete();
                });
            } else {
                toast.warning("Nothing selected to delete");
            }
        }
    };
    // End:: Open delete modal

    // Start:: Close modal
    const close = () => {
        props.onClose();
    };
    // End:: Close modal

    // Start:: on data operation successfully
    const handleSuccess = (operation) => {
        switch (operation) {
            case Operation.GuestAdd:
                toast.success("Guest successfully added");
                setDataChanged(true);
                props.onSuccess();
                break;
    
            case Operation.Booked:
                toast.success("Room successfully booked");
                setDataChanged(true);
                props.onSuccess();
                break;               
    
            case Operation.BillGenerate:
                setDataChanged(true);
                props.onSuccess();
                break;                                

            case Operation.PaymentAdd:
                toast.success("Payment successfully done");
                setDataChanged(true);
                props.onSuccess();
                break;
    
            case Operation.Checkout:
                toast.success("Guest successfully checked out");
                setDataChanged(true);
                props.onSuccess();
                break;

            case Operation.GuestDel:
                toast.success("Guest successfully deleted");
                setDataChanged(true);
                props.onSuccess();
                break;               
                    
            default:                
                break;                
        }
    };
    // End:: on data operation successfully

    // Start:: change selection of card element    
    const handleActivated = (index) => {
            setSelectedCardIndex(index);

            cardRefs.current && cardRefs.current.forEach((item, idx) => {
                if (index !== idx)
                    cardRefs.current[idx] && cardRefs.current[idx].handleDeSelect();
            });
    };
    // End:: change selection of card element    

    // Seart:: handle page change
    const handlePaging = (pageNumber) => {
        cardRefs.current = [itemPerRow];
        setSelectedPage(pageNumber);
    };
    // End:: handle page change

    // Start:: forward reff change search and open add/edit/delete modal
    useImperativeHandle(ref, () => {
        return {changeSearch, openAdd, openEdit, openDelete, close}
    });
    // End:: forward reff change search and open add/edit/delete modal

    // Start:: fetch data list from api
    useEffect(() => {
        (async () => {
            await doFetch();
            setDataChanged(false);
          })();
    }, [dataChanged, search]);      // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch data list from api

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);

    // Start:: show all data in card format
    const displayData = (pData = []) => {
        let rowIdx = 0;
        let colIdx = 0;
        let rowData = [];

        if (!pData) return null;

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
        })
    };

    const createRow = (pData, rowIdx) => {
        const rowKey=`row_${rowIdx}`;

        return (
            <div className="row" key={rowKey}>
                {
                    pData.map((item, idx) => {
                        const itemIdx = (rowIdx * itemPerRow) + idx;
                        return createCol(item, itemIdx);
                    })
                }
            </div>);
    };

    const createCol = (pData = undefined, itemIdx) => {
        const colKey = `col_${pData.id}`;

        return (
            <div className="col-xl-4 col-md-4" key={colKey}>
                <Card 
                    ref={(el) => cardRefs.current[itemIdx] = el}
                    pIndex={itemIdx}
                    pGuestId={pData.id} 
                    pTransactionId={pData.transactionId ? pData.transactionId : "undefined"}
                    pName={pData.name}
                    pMobile={pData.mobile}
                    pGuestCount={pData.guestCount}
                    pCorporateName={pData.corporateName}
                    pCorporateAddress={pData.corporateAddress}
                    pGstNo={pData.gstNo}
                    pDayCount={pData.dayCount}
                    pBookingAgent={pData.bookingAgent}
                    pPlan={pData.plan}
                    pRooms={pData.rooms}
                    pIndate={pData.inDate}
                    pInTime={pData.inTime}
                    pTotalExpense={pData.totalExpense}
                    pTotalBalance={pData.totalBalance ? pData.totalBalance * -1 : pData.totalBalance}
                    onBooked={() => {handleSuccess(Operation.Booked)}}
                    onBillGenerated={() => {handleSuccess(Operation.BillGenerate)}}
                    onPaymentAdded={() => {handleSuccess(Operation.PaymentAdd)}} 
                    onCheckedout={() => {handleSuccess(Operation.Checkout)}} 
                    onDeleted={() => {handleSuccess(Operation.GuestDel)}} 
                    onClosed={close} 
                    onActivated={handleActivated}/>                
            </div>);
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
                            {/* Start :: Display data count */}
                            <div className="col-12 text-danger p-0">
                                {!loading && 
                                    data && 
                                        `item count : ${selectedPage * itemPerPage > data.length ? data.length : selectedPage * itemPerPage} of ${data.length}`}
                            </div>
                            {/* End :: Display data count */}
                        </div>
                        {/* End :: Header & operational panel */}

                        {/* Start :: Display data */}
                        <div className="card-body py-0">
                            {loading &&
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-primary" role="status"/>
                                </div>}

                            {!loading && 
                                data && 
                                    displayData(data.slice(indexOfFirstItem, indexOfLastItem))}
                        </div>
                        {/* End :: Display data */}
                        
                        {/* Start :: Footer & operational panel */}
                        <div className="card-footer p-0">
                            {/* Start :: Pagination */}
                            <div className="col-12 d-flex justify-content-end">
                                {!loading && 
                                        data && 
                                            <Paging
                                                itemPerPage={itemPerPage}
                                                totalItem={data.length}
                                                selectedPage={selectedPage}
                                                onPaging={handlePaging}/>}
                            </div>
                            {/* End :: Pagination */}
                        </div>
                        {/* End :: Footer & operational panel */}

                    </div>
                </div>
            </section>
            {/* End :: display data */}

            {/* Start :: add employee component */}
            <Add 
                ref={addRef}   
                onAdded={() => {handleSuccess(Operation.GuestAdd)}}
                onClosed={close}/>
            {/* End :: add employee component */}

        </div>
    )
    // End:: Html

});


export default GuestRooms;
