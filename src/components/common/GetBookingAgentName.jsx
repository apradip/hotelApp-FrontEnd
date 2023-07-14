import {useEffect} from "react";
import {toast} from "react-toastify";

import {useStateContext} from "../../contexts/ContextProvider";
import useFetchWithAuth from "./useFetchWithAuth";

// Start:: Component
// props parameters
// pId
const GetBookingAgentName = ({pId}) => {    
    const contextValues = useStateContext();
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `${contextValues.bookingAgentAPI}/${pId}`
    });

    // Start:: fetch id wise detail from api
    useEffect(() => {
        (async () => {
            try {
                await doFetch();
            } catch (err) {
              console.log('Error occured when fetching data');
            }
          })();
    }, [pId]);         // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch id wise detail from api

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);

    // Start:: Html
    return (
        <label className="form-label">{data && data.name}</label>
    );
    // End:: Html

}
// End:: Component


export default GetBookingAgentName;