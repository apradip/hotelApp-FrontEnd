import React, {useContext, forwardRef, useImperativeHandle, useEffect, useState} from "react";
import {Form} from "react-bootstrap";

import {HotelId} from "../../App";
import {useStateContext} from "../../contexts/ContextProvider";
import useFetchWithAuth from "./useFetchWithAuth";

const MiscellaneousEditor = forwardRef((props, ref) => {	
	const hotelId = useContext(HotelId);
	const contextValues = useStateContext();
	const selectInput = React.createRef();
	const emptyElement = {
		_id: "",
		name: "Select item",
		price: 0,
	};
	const [listItem, setListItem] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [defaultItem, setDefaultItem] = useState(props.value);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.miscellaneousAPI}/${hotelId}`
    });

	const handleChange = (event) => {
		event.preventDefault();
		const itemObject = listItem.filter((item) => event.target.value === item._id);
		setSelectedItem(itemObject);
		setDefaultItem(itemObject._id);
    };

	const getValue = () => {
		return selectedItem;
    };

	useImperativeHandle(ref, () => {
        return {getValue}
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
		data && data.map(item => (list.push({_id:item._id, name:item.name, price:item.price})));
		data && setListItem(list);
    }, [data, loading, error]);		// eslint-disable-line react-hooks/exhaustive-deps

	return (
		data && 
			<Form.Select
				ref = {selectInput}
				multiple = {false}
				value = {defaultItem}
				onChange = {handleChange}
				style = {{border: "none", height: "99%", width: "100%"}}>

				{listItem && listItem.map((item) => {
					return(<option key={item._id} value={item._id}>{item.name}</option>)
		 		})}
			</Form.Select>
    );
});
 
export default MiscellaneousEditor;