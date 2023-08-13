import React, { useContext, useEffect, useState, useRef, forwardRef } from "react";
import { toast } from "react-toastify";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import Due from "./Due";
import useFetchWithAuth from "../common/useFetchWithAuth";
import { formatINR } from "../common/Common";

// Start:: Component
// props parameters
const DueList = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [filterData, setFilterData] = useState(undefined);
    const [dataChanged, setDataChanged] = useState(false);
    const [totalDue, setTotalDue] = useState(0);
    let cardRefs = useRef([]);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestAPI}/${hotelId}`,
        params: {search: ""}
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
            setFilterData(data.filter((item) => item.balance < 0));

        let total = 0;            
        data && 
            data.filter((item) => item.balance < 0).map((object) => {
                total += object.balance * -1;
            }); 
        data && setTotalDue(total);    
    }, [data, error, loading]);

    // Start:: show all data in card format
    const displayData = (pData = []) => {
        try {
            return pData.map((object, idx) => {
                cardRefs.current.push();
                
                return (<Due
                    ref = {(el) => cardRefs.current[idx] = el}
                    key = {`_guest_due_row_${idx}`}
                    pIndex = {idx + 1}
                    pOption = {object.option}
                    pGuestId = {object._d}
                    pGuestName = {object.name}
                    pGuestMobile = {object.mobile}
                    pBalance = {object.balance * -1}/>);
            });
        } catch (err) {
            console.log(err);
        }
    };
    // End:: show all data in card format

    
    // Start:: Html
    return (
        <div className="card dashboard-card mb-5 mb-xl-8">
        <div className="dashboard-card-header border-0">
            <h3 className="card-title align-items-start flex-column">
                <span className="text-dark fs-4 mb-1">Due list</span>
                <span className="text-muted mt-1 fs-8 d-block">Total <b className="text-danger">{formatINR(totalDue)}</b> is due still now</span>
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


export default DueList;