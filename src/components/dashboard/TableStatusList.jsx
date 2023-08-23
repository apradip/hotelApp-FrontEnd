import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { toast } from "react-toastify";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import Table from "./TableStatus";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: Component
// props parameters

const TableStatusList = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const itemPerRow = contextValues.dashboardTableItemPerRow;
    const [dataChanged, setDataChanged] = useState(false);
    const [tableCount, setTableCount] = useState(0);
    let cardRefs = useRef([]);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.tableAPI}/${hotelId}`,
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
        data && setTableCount(count);
    }, [data, error, loading]);
    // Start:: show all data in card format

    // Start:: refresh data
    const handleRefresh = () => {setDataChanged(true);};
    // End:: refresh data
    
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
                
            return (<Table
                        ref = {(el) => cardRefs.current[itemIdx] = el}
                        key = {`guest_table_obj_${pData._id}`}
                        pIndex = {itemIdx}
                        pTableId = {pData._id} 
                        pNo = {`T-${pData.no}`}
                        pGuestCount = {pData.guestCount}
                        pStatus = {pData.isOccupied}/>);
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
                    <span className="text-dark fs-4 mb-1">Table status</span>
                    <span className="text-muted mt-1 fs-8 d-block">Total <b className="text-danger">{tableCount}</b> no of tables(s) are unoccupied</span>
                </h3>
            </div>
            <div className="card-body py-1 px-3 scrollable">
                {!loading && 
                    data && 
                        displayData(data)}
            </div>
        </div>);
    // End:: Html

});
// End:: Component


export default TableStatusList;