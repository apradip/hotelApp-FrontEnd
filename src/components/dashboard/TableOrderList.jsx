import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { toast } from "react-toastify";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import Order from "./TableOrder";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: Component
// props parameters
const TableOrderList = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [filterData, setFilterData] = useState(undefined);
    const [dataChanged, setDataChanged] = useState(false);
    const [tableCount, setTableCount] = useState(0);
    let cardRefs = useRef([]);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.tableAPI}/${hotelId}`,
        params: {option: "A", search: ""}
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

        data &&
            setFilterData(data.filter((item) => item.isOccupied === true));

        data && 
            setTableCount(data.filter((item) => item.isOccupied === true).length);
    }, [data, error, loading]);

    // Start:: refresh data
    const handleRefresh = () => {setDataChanged(true);};
    // End:: refresh data
    
    // Start:: show all data in card format
    const displayData = (pData = []) => {
        try {
            let index = 0;
            let prviousGuestId = "";
            let previousTableNo = "";

            return pData.map((item, idx) => {
                if (prviousGuestId !== "") {
                    if (prviousGuestId !== item.guestId) {
                        index ++;
                        prviousGuestId = item.guestId; 
                        previousTableNo = `T-${item.no}`;
        
                        cardRefs.current.push();
                        
                        return (<Order
                            ref = {(el) => cardRefs.current[index] = el}
                            key = {`RO_${item._id}`}
                            pIndex = {index}
                            pGuestId = {prviousGuestId}
                            pTableNo = {previousTableNo} />);
                    } else {
                        prviousGuestId = item.guestId; 
                        previousTableNo = previousTableNo + "," + `T-${item.no}`;

                        if (pData.length === idx + 1){
                            return (<Order
                                ref = {(el) => cardRefs.current[index] = el}
                                key = {`RO_${item._id}`}
                                pIndex = {index}
                                pGuestId = {prviousGuestId}
                                pTableNo = {previousTableNo} />);
                        }
                    }
                } else {
                    prviousGuestId = item.guestId; 
                    previousTableNo = `T-${item.no}`;
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
    // End:: show all data in card format

    // Start:: forward reff refresh 
    useImperativeHandle(ref, () => {
        return {handleRefresh};
    });
    // End:: forward reff refresh

    
    // Start:: Html
    return (
        <div className="card card-xl-stretch mb-5 mb-xl-8 dashboard-card">
        <div className="dashboard-card-header border-0">
            <h3 className="card-title align-items-start flex-column">
                <span className="text-dark fs-4 mb-1">Order details</span>
                <span className="text-muted mt-1 fs-8 d-block">Total <b>{tableCount}</b> no of table(s) occupied</span>
            </h3>
        </div>
        <div className="card-body py-1 px-4 scrollable">
            {!loading && 
                filterData && 
                    displayData(filterData)}
        </div>
    </div>);

    // End:: Html
});
// End:: Component


export default TableOrderList;