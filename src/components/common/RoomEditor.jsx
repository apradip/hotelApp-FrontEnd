import React, { useContext, forwardRef, useImperativeHandle, useEffect, useState } from "react";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetchWithAuth from "./useFetchWithAuth";

const RoomEditor = forwardRef(( props, ref ) => {	
	const hotelId = useContext(HotelId);
	const contextValues = useStateContext();
	const selectInput = React.createRef();
	const emptyElement = {
		_id: "",
		hotelId: hotelId,
		categoryId: "",
		no: "Select room",
		tariff: 0,
		maxDiscount: 0,
		extraBedTariff: 0,
		extraPersonTariff: 0,
		isOccupied: false
	};
	const [listRoom, setListRoom] = useState(null);
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [defaultRoom, setDefaultRoom] = useState(props.value);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.roomAPI}/${hotelId}`
    });

	const handleChange = (event) => {
		event.preventDefault();
		const roomObject = listRoom.filter((item) => event.target.value === item._id);
		setSelectedRoom(roomObject);
		setDefaultRoom(roomObject._id);
    };

	const getValue = () => {
		return selectedRoom;
    };

	useImperativeHandle(ref, () => {
        return {
            getValue
        }
    });

	useEffect(() => {
        (async () => {
            try {
                await doFetch();
            } catch (err) {
              console.log("Error occured when fetching data");
            }
          })();
    }, []);		// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
		let list = [emptyElement];
		data && data.filter(item => !item.isOccupied).map(room => (list.push(room)));
		data && data.filter(item => item.no === defaultRoom).map(room => (list.push(room)));
		
		// data && data.filter(item => item.no === defaultRoom).map(room => (list.map(l => (l._id !== room._id).map(l2 => list.push(l2)))));

		data && data.filter(item => item.no === defaultRoom).map(room => (setDefaultRoom(room._id)));
		data && setListRoom(list);
    }, [data, loading, error]);		// eslint-disable-line react-hooks/exhaustive-deps

	return (
		data && 
			<select
				ref={selectInput}
				multiple={false}
				value={defaultRoom}
				onChange={handleChange}
				style={{border: "none", height: "99%", width: "100%"}} >

				{listRoom && listRoom.map((item) => {
					return(<option key={item._id} value={item._id}>{item.no}</option>)
		 		})}

			</select>
    );
})
 
export default RoomEditor;