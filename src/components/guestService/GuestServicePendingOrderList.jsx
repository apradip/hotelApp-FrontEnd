import { useContext, useEffect, forwardRef, useImperativeHandle } from "react";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: Component
// props parameters
// onRefresh()

const GuestServicePendingOrderList = forwardRef((props, ref) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();

    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestServiceAPI}/${hotelId}`,
        params: {
            search: "", 
            roomonly: false
        }
    });

    useEffect(() => {
        error && console.log(error);
        data && props.onRefreshed("S", data);
    }, [data, error, loading]);

    // Start:: get data from db
    const Refresh = async () => {
        try {
            await doFetch();
        } catch (err) {
            console.log(err);
        }
    };
    // End:: get data from db

    // Start:: forward reff 
    useImperativeHandle(ref, () => {
        return {Refresh};
    });
    // End:: forward reff 
    
    // Start:: Html
    return (<></>);
    // End:: Html

});

export default GuestServicePendingOrderList;