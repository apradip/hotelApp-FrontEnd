import React, { useState, forwardRef, useImperativeHandle } from "react";
import Form from "react-bootstrap/Form";

// const KEY_BACKSPACE = 'Backspace';
// const KEY_DELETE = 'Delete';
// const KEY_F2 = 'F2';
// const KEY_ENTER = 'Enter';
// const KEY_TAB = 'Tab';

const ExtraPersonEditor = forwardRef(( props, ref ) => {	
	const textInput = React.createRef();
	const [selected, setSelected] = useState(props.value);

	const getValue = () => {
        return textInput.current.value;
    };

	useImperativeHandle(ref, () => {
        return {
            getValue
        }
    });

	return (
		<Form.Control size="lg" type="number" placeholder="ext. person" 
			ref={textInput}
			value={selected}
			onChange={event => {
								event.preventDefault()

								if (parseInt(event.target.value)>=0){
									setSelected(parseInt(event.target.value)) 
									return true
								} else {
									return false
								}
							}}
            style={{border: "none", height: "99%", width: "100%"}} />
    );
})
 
export default ExtraPersonEditor;