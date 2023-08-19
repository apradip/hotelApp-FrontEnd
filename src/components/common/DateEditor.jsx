import React, { useState, forwardRef, useImperativeHandle } from "react";
import DatePicker from "react-datepicker";
import { formatDDMMYYYY } from "./Common"


const DateEditor = forwardRef((props, ref) => {	
	const dateInput = React.createRef();
	const [selectedDate, setSelectedDate] = useState(props.value ? new Date(props.value) : new Date());

	const getValue = () => {
		return selectedDate;
    };

	useImperativeHandle(ref, () => {
        return {getValue}
    });

	return (
		<DatePicker
			ref={dateInput}
			placeholder="Select date"
			className="form-control"
			minDate={new Date()}
			dateFormat="dd/MM/yyyy"
			showDisabledMonthNavigation
			selected={selectedDate}
			onChange={(value) => {
									setSelectedDate(value);
									return true;
								}}
			/>
    );
})
 
export default DateEditor;