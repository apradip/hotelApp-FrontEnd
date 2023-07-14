import React, {useEffect} from "react";

import {useStateContext} from "../../contexts/ContextProvider";
import useFetchWithAuth from "./useFetchWithAuth";

const BookingAgentSelect = ({onChange, name, value, disabled = false}) => {
	const contextValues = useStateContext();
    const {data, loading, doFetch} = useFetchWithAuth({
        url: `${contextValues.bookingAgentAPI}`
    });

    // Start:: fetch data list from api
    useEffect(() => {
        (async () => {
            try {
                await doFetch();
            } catch (err) {
                console.log("Error occured when fetching data");
            }
            })();
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch data list from api

	return (
		<select 
			className="form-control"
			// autoFocus
			name={name}
			disabled={loading && disabled} 
			value={value} 
			onChange={(e) => {onChange(e.target.value)}}>

			<option key="" value="">Select agent</option>
			
			{data &&
				data.map((item) => {
					return (<option key={item._id} value={item._id} >{item.name}</option>)
				})}
		</select>
    );
};
 
export default BookingAgentSelect;