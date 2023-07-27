import React, {useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";
import {Breadcrumb} from "react-bootstrap";
import {toast} from "react-toastify";

import {HotelId} from "../App";
import {useStateContext} from "../contexts/ContextProvider";
import Add from "../components/guestService/GuestServiceAdd";
import CardService from "../components/guestService/GuestServiceCard";
import Paging from "../components/Paging";
import useFetchWithAuth from "../components/common/useFetchWithAuth";

import CardRoom from "../components/guestRoom/GuestRoomCard";

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
const GuestServices = forwardRef((props, ref) => {
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
        url: `${contextValues.guestServiceAPI}/${hotelId}`,
        params: {search: search}
    });

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
                    setDataChanged(true);
                    props.onSuccess();
                    break;
        
                case Operation.GuestDel:
                    toast.success("Guest successfully deleted");
                    setDataChanged(true);
                    props.onSuccess();
                    break;               
                        
                case Operation.Order:
                    toast.success("Item successfully ordered");
                    setDataChanged(true);
                    props.onSuccess();
                    break;               

                case Operation.Despatch:
                    toast.success("Item successfully despatched");
                    setDataChanged(true);
                    props.onSuccess();
                    break;                

                case Operation.BillGenerate:
                    setDataChanged(true);
                    props.onSuccess();
                    break;                
                        
                case Operation.PaymentAdd:
                    toast.success("Payment successfully added");
                    setDataChanged(true);
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
                <div className="row" key={rowKey}>
                    {
                        pData.map((item, idx) => {
                            const itemIdx = (rowIdx * itemPerRow) + idx;
                            return createCol(item, itemIdx);
                        })
                    }
                </div>);
        } catch (err) {
            console.log(err);
        }
    };

    const createCol = (pData = undefined, itemIdx) => {
        try {
            const colKey = `col_${pData.id}`;

            return (
                <div className="col-sm-6 col-xl-4 col-md-4" key={colKey}>
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
                            onEdited = {() => {handleSuccess(Operation.GuestMod)}}
                            onDeleted={() => {handleSuccess(Operation.GuestDel)}} 
                            onBooked={() => {handleSuccess(Operation.Booked)}}
                            onBillGenerated={() => {handleSuccess(Operation.BillGenerate)}}
                            onPaymentAdded={() => {handleSuccess(Operation.PaymentAdd)}} 
                            onCheckedout={() => {handleSuccess(Operation.Checkout)}} 
                            onOrdered = {() => {handleSuccess(Operation.Order)}}
                            onDespatched = {() => {handleSuccess(Operation.Despatch)}}
                            onClosed={close} 
                            onActivated={() => {handleActivated(itemIdx)}} />}

                    {(pData.option === "S") &&
                        <CardService className="border"
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
                            onClosed = {close} 
                            onActivated = {() => {handleActivated(itemIdx)}} />}           
                </div>);
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
                            <h1 className="text-dark">Service</h1>
                        </div>

                        <div className="col-sm-8">
                            <Breadcrumb className="breadcrumb float-sm-right">
                                <Breadcrumb.Item href = "/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href = "/">Transaction</Breadcrumb.Item>
                                <Breadcrumb.Item active>Service</Breadcrumb.Item>
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
                        <div className="card-footer py-0">
                            <div className="row">
                                {/* Start :: Pagination */}
                                <div className="col-12 d-flex justify-content-end">
                                    {!loading && 
                                            data && 
                                                <Paging
                                                    itemPerPage = {itemPerPage}
                                                    totalItem = {data.length}
                                                    selectedPage = {selectedPage}
                                                    onPaging = {handlePaging} />}
                                </div>
                                {/* End :: Pagination */}
                            </div>
                        </div>
                        {/* End :: Footer & operational panel */}

                    </div>
                </div>
            </section>
            {/* End :: display data */}

            {/* Start :: add component */}
            <Add 
                ref = {addRef}   
                onAdded = {() => {handleSuccess(Operation.GuestAdd)}}
                onClosed = {close} />
            {/* End :: add component */}

        </div>
    );
    // End:: Html

});

export default GuestServices;
