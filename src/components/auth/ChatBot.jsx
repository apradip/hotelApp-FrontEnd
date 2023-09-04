import React, { useContext } from "react";

import { HotelId } from "../../App";

import "react-toastify/dist/ReactToastify.css";

// Start:: Component
const ChatBot = ({}) => {
	const hotelId = useContext(HotelId);

	return ( 
		<>
			<df-messenger
				intent="WELCOME"
				chat-title="HotelLive"
				agent-id="fc67500b-e537-4c67-b2d6-77f5b651013e"
				language-code="en"></df-messenger> 
		</>
    );
}
// End:: Component

export default ChatBot;