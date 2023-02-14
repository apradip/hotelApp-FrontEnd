import React, { useContext, useEffect } from "react";

import { HotelId } from "../App";
import { useStateContext } from "../contexts/ContextProvider";
import useFetchWithAuth from "./useFetchWithAuth";

const RoomCategorySelect = ({ onChange, name, value, disabled = false }) => {
	const hotelId = useContext(HotelId);
	const contextValues = useStateContext();
    const { data, loading, doFetch } = useFetchWithAuth({
        url: `${contextValues.roomCategoryAPI}/${hotelId}`
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
    }, [doFetch]);
    // End:: fetch data list from api

	return (
		<select 
			className="form-control"
			autoFocus
			name={name}
			disabled={loading && disabled} 
			value={value} 
			onChange={(e) => {onChange(e.target.value)}} >

			<option key="" value="">Select category</option>
			
			{data &&
				data.map((item) => {
					return (<option key = { item._id } value = { item._id } >{ item.name }</option>)
				})}
		</select>
    );
};
 
export default RoomCategorySelect;