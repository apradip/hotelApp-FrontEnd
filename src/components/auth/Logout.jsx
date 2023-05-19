import React, { useContext } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { LogOut } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import useFetchWithAuth from "../common/useFetchWithAuth";


// Start:: Component
const Logout = ({ pEmployeeId, onLogout }) => {
	const hotelId = useContext(HotelId);
	const contextValues = useStateContext();
	const { error, doLogout } = useFetchWithAuth({
        url: `${contextValues.logoutAPI}/${hotelId}/${pEmployeeId}`
    });

	// Strat:: logout   
	const handleLogout = async () => {
		await doLogout();

		if (error === null) {
			onLogout();
		}
    };
	// End:: logout   

	// Start:: Html
    return ( 
		<Dropdown.Item eventKey="3"
			onClick={handleLogout}>
			<LogOut className="mr-2" size={16} />Sign out
		</Dropdown.Item>
    );
	// End:: Html
	
};
// End:: Component

export default Logout;