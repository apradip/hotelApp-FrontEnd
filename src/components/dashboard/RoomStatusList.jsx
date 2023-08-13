import React, { useContext, useEffect, useState, useRef, forwardRef } from "react";
import { toast } from "react-toastify";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import Room from "./RoomStatus";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: Component
// props parameters
// pGuestId
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
const RoomStatusList = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const itemPerRow = contextValues.dashboardRoomItemPerRow;
    const [dataChanged, setDataChanged] = useState(false);
    const [roomCount, setRoomCount] = useState(0);
    let cardRefs = useRef([]);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.roomAPI}/${hotelId}`,
        params: { option: "A", search: ""}
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
    }, [dataChanged]);      // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch data list from api

    useEffect(() => {
        error && toast.error(error);

        let count = 0;
        data && data.map((object) => {
            if (!object.isOccupied)
                count ++;
        });
        data && setRoomCount(count);
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
            const rowKey = `row_${rowIdx}`;

            return (<div className="row mb-2" key={rowKey}>
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
            cardRefs.current.push();
                
            return (<Room
                        ref = {(el) => cardRefs.current[itemIdx] = el}
                        key = {`guest_room_obj_${pData._id}`}
                        pIndex = {itemIdx}
                        pRoomId = {pData._id} 
                        pNo = {pData.no}
                        pGuestCount = {pData.guestCount}
                        pStatus = {pData.isOccupied}/>);
        } catch (err) {
            console.log(err);
        }
    };
    // End:: show all data in card format

    
    // Start:: Html
    return (
        <div className="card card-xl-stretch mb-5 mb-xl-8 dashboard-card">
            <div className="dashboard-card-header border-0">
                <h3 className="card-title align-items-start flex-column">
                    <span className="text-dark fs-4 mb-1">Room status</span>
                    <span className="text-muted mt-1 fs-8 d-block">Total <b>{roomCount}</b> no of room(s) are unoccupied</span>
                </h3>
            </div>
            <div className="card-body py-1 px-4 scrollable">
                {!loading && 
                        data && 
                            displayData(data)}
            </div>
        </div>);
    // End:: Html

});
// End:: Component


export default RoomStatusList;