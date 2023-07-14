import React, {useState, forwardRef, useImperativeHandle} from "react";
import Form from "react-bootstrap/Form";

const ExtraBedEditor = forwardRef((props, ref) => {	
	const textInput = React.createRef();
	const [selected, setSelected] = useState(props.value);

	const getValue = () => {return textInput.current.value;};

	useImperativeHandle(ref, () => {
        return {getValue}
    });

	return (
		<Form.Control size="lg" type="number" placeholder="ext. bed" 
			ref={textInput}
			value={selected}
			onChange={(event) => { 
				event.preventDefault()
				setSelected(event.target.value) 
				return true}}
            style={{border: "none", height: "99%", width: "100%"}}/>
    );
})
 
export default ExtraBedEditor;