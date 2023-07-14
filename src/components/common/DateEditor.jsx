import React, {useState, forwardRef, useImperativeHandle} from "react";
import DatePicker from "react-datepicker";

const DateEditor = forwardRef((props, ref) => {	
	const dateInput = React.createRef();
	const [selected, setSelected] = useState(new Date(props.value));

	const getValue = () => {
		return selected;
    };

	useImperativeHandle(ref, () => {
        return {getValue}
    });

	return (
		<DatePicker
			ref={dateInput}
			placeholder="Stay date"
			className="form-control"
			minDate={new Date()}
			dateFormat="dd/MM/yyyy"
			showDisabledMonthNavigation
			selected={selected}
			onChange={(value) => {
									setSelected(value)
									return true
								}}
			/>

		// <Form.Control size="lg" type="number" placeholder="ext. bed" 
		// 	ref={textInput}
		// 	value={selected}
		// 	onChange={(event) => {  event.preventDefault()

		// 							// if (parseInt(event.target.value)>=0){
		// 								setSelected(event.target.value) 
		// 								return true
		// 							// } else {
		// 								// return false
		// 							// }
		// 						}}
        //     style={{border: "none", height: "99%", width: "100%"}} />
    );
})
 
export default DateEditor;