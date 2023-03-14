import React, { useContext, forwardRef, useImperativeHandle, useEffect, useState } from "react";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetchWithAuth from "./useFetchWithAuth";

const TableEditor = forwardRef(( props, ref ) => {	
	const hotelId = useContext(HotelId);
	const contextValues = useStateContext();
	const selectInput = React.createRef();
	const emptyElement = {
		_id: "",
		hotelId: hotelId,
		no: "Select table",
		isOccupied: false
	};
	const [listTable, setListTable] = useState(null);
	const [selectedTable, setSelectedTable] = useState(null);
	const [defaultTable, setDefaultTable] = useState(props.value);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.tableAPI}/${hotelId}`
    });

	const handleChange = (event) => {
		event.preventDefault();
		const tableObject = listTable.filter((item) => event.target.value === item._id);
		setSelectedTable(tableObject);
		setDefaultTable(tableObject._id);
    };

	const getValue = () => {
		return selectedTable;
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

		data && data.filter(item => !item.isOccupied).map(table => (list.push(table)));
		data && setListTable(list);
    }, [data, loading, error]);		// eslint-disable-line react-hooks/exhaustive-deps

	return (
		data && 
			<select
				ref={selectInput}
				multiple={false}
				value={defaultTable}
				onChange={handleChange}
				style={{border: "none", height: "99%", width: "100%"}} >

				{listTable && listTable.map((item) => {
					return(<option key={item._id} value={item._id}>{item.no}</option>)
		 		})}
			</select>
    );
})
 
export default TableEditor;