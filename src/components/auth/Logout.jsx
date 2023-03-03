import React, { useContext } from "react";
import { Link } from "react-router-dom";
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

	// useEffect(() => {
	// 	pEmployeeId && !error && data === "OK" && onLogout();
    // }, [data, loading, error, pEmployeeId]);

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
		<Link className="dropdown-item" 
			href="window.location" 
			onClick = { handleLogout }>
			<LogOut className="mr-2" size={16}/>Sign out
		</Link>
    );
	// End:: Html
	
};
// End:: Component

export default Logout;