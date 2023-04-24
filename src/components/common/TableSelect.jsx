import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetchWithAuth from "./useFetchWithAuth";

const TableSelect = ({ onChange, name, value, disabled = false }) => {
	const hotelId = useContext(HotelId);
	const contextValues = useStateContext();
	const [tableList, setTableList] = useState([]);
	const [selectedList, setSelectedList] = useState(value);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `${contextValues.tableAPI}/${hotelId}`
    });
	let defaultList = [];

	const onSelect = (selectedList) => {
		let list = [];

		for (const item of selectedList) {
			list.push({id: item.value, name: item.label});
		}

		setSelectedList(list);
	}

	useEffect(() => {
        (async () => {
            try {
                await doFetch();
            } catch (err) {
              console.log("Error occured when fetching data");
            }

			value &&
				value.map((item) => {
					return defaultList.push({value: item.id, label: item.no});
				})
          })();
    }, [value]);		// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
		let list = [];

		data &&
			data.map((item) => {
				return list.push({ value: item._id, label: item.no })
			});

		setTableList(list);
    }, [data, loading, error]);

	useEffect(() => {
        onChange(selectedList);
    }, [selectedList]);		// eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Select 
			name={name}
			options={tableList} 
			defaultValue={defaultList}
			isDisabled={disabled}
			onChange={onSelect}
			isMulti={true} />
    )
}
 
export default TableSelect;