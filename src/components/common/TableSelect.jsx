import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import {axiosPrivate} from "./axiosPrivate";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";

const TableSelect = ({ onChange, name, value, disabled = false }) => {
	const hotelId = useContext(HotelId);
	const contextValues = useStateContext();
	const [tableList, setTableList] = useState([]);
	const [selectedList, setSelectedList] = useState(value);
	
	let defaultList = [];
	  
	useEffect(() => {
		(async () => {
			Promise.all([
				await axiosPrivate.request(
					{url: `${contextValues.tableAPI}/${hotelId}`,
					params: {option: "E"}}),
				await axiosPrivate.request(
					{url: `${contextValues.roomAPI}/${hotelId}`,
					params: {option: "O"}}),
			])
			.then(([dataTable, dataRoom]) => {
				let list = [];

				dataTable.data.map((item) => {
					return list.push({value: item._id, label: `T-${item.no}`})
				});

				dataRoom.data.map((item) => {
					return list.push({value: item._id, label: `R-${item.no}`})
				});

				setTableList(list);
			})
			.catch((err) => {console.log(err)});

			if (Array.isArray(value) && value.length > 0){
				value &&
					value.map((item) => {return defaultList.push({value: item.id, label: `T-${item.no}`});})
			}
          })();
    }, [value]);		// eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
        onChange(selectedList);
    }, [selectedList]);		// eslint-disable-line react-hooks/exhaustive-deps

	const onSelect = (selectedList) => {
		let list = [];

		for (const item of selectedList) {
			list.push({id: item.value, name: item.label});
		}

		setSelectedList(list);
	}
	
	return (
		<Select 
			className = "col-12"
			name = {name}
			options = {tableList} 
			defaultValue = {defaultList}
			isDisabled = {disabled}
			onChange = {onSelect}
			isMulti = {true} />
    )
}
 
export default TableSelect;