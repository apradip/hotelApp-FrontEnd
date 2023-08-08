import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Breadcrumb, Row, Col, Placeholder } from "react-bootstrap";
import { toast } from "react-toastify";

import { HotelId } from "../App";
import { useStateContext } from "../contexts/ContextProvider";
import Add from "../components/room/RoomAdd";
import Card from "../components/room/RoomCard";
import CardPlaceholder from "../components/common/GuestPlaceholderCard";
import Paging from "../components/Paging";
import useFetchWithAuth from "../components/common/useFetchWithAuth";

const Operation = {
    Add: "ADD",
    Mod: "MOD",
    Del: "DEL"
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
const Rooms = forwardRef(( props, ref ) => {
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
        url: `${contextValues.roomAPI}/${hotelId}`,
        params: {
            search: search
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
    }, [dataChanged, search]);      // eslint-disable-line react-hooks/exhaustive-deps
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
                    if (selectedCardIndex === idx)
                        cardRefs.current[idx] && 
                            cardRefs.current[idx].handelOpenEdit();
                });
            } else {
                toast.warning("Nothing selected to edit");
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
                        cardRefs.current[idx] && 
                            cardRefs.current[idx].handelOpenDelete();
                });
            } else {
                toast.warning("Nothing selected to delete");
            }
        } catch (err) {
            console.log(err);
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
        try {
            switch (operation) {
                case Operation.Add:
                    toast.success("Data successfully added");
                    setDataChanged(true);
                    props.onSuccess();
                    break;

                case Operation.Mod:
                    toast.success("Data successfully changed");
                    // setDataChanged(true);
                    props.onSuccess();
                    break;                

                case Operation.Del:
                    toast.success("Data successfully deleted");
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

            cardRefs.current && 
                cardRefs.current.forEach((item, idx) => {
                if (index !== idx)
                    cardRefs.current[idx] && 
                        cardRefs.current[idx].handleDeSelect();
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
        return {changeSearch, openAdd, openEdit, openDelete, close}
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

    const createRow = ( pData, rowIdx ) => {
        try {                 
            const rowKey=`row_${rowIdx}`;

            return (<Row key={rowKey}>
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
            const colKey = `col_${pData._id}`;

            return (<Col xl={4} md={4} key={colKey}>
                        <Card 
                            ref = {(el) => cardRefs.current[itemIdx] = el}
                            pIndex = {itemIdx}
                            pId = {pData._id}
                            pCategoryId = {pData.categoryId} 
                            pNo = {pData.no}
                            pTariff = {parseFloat(pData.tariff, 10).toFixed(2)}
                            pDiscount = {parseFloat(pData.maxDiscount, 10).toFixed(2)}
                            pBed = {parseFloat(pData.extraBedTariff, 10).toFixed(2)}
                            pPerson = {parseFloat(pData.extraPersonTariff, 10).toFixed(2)}
                            onEdited = {() => {handleSuccess(Operation.Mod)}}
                            onDeleted = {() => {handleSuccess(Operation.Del)}} 
                            onActivated = {() => {handleActivated(itemIdx)}} 
                            onClosed = {close}/>                
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
                            <h1 className="text-dark">Room</h1>
                        </Col>

                        <Col sm={8}>
                            <Breadcrumb className="breadcrumb float-sm-right">
                                <Breadcrumb.Item href = "/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href = "/">Master</Breadcrumb.Item>
                                <Breadcrumb.Item active>Room</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>                        
                </div>
            </div>
            {/* End :: Bread crumb */}

            {/* Start :: display data */}
            <section className="content">
                <div className="container-fluid">
                    <div className="card mb-0">
                        
                        {/* Start :: Header & operational panel */}
                        <div className="card-header">
                            <Row>
                                {/* Start :: Display data count */}
                                <Col sx={12} md={12} className="text-danger">
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

            {/* Start :: add employee component */}
            <Add 
                ref = {addRef}   
                onAdded = {() => {handleSuccess(Operation.Add)}}
                onClosed = {close}/>
            {/* End :: add employee component */}

        </div>
    );
    // End:: Html

});
// End:: Component


export default Rooms;
