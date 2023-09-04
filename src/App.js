import React, { createContext, useEffect, useState, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

import './App.css';

import {ContextProvider} from "./contexts/ContextProvider";
import Container from "./components/Container";
import ContainerLogin from "./components/ContainerLogin";

const HotelId = createContext();

function App() {
  const hotelId = "64252efb369c403b60effae8";  
  const [pEmployeeId, setPEmployeeId] = useState(null);
  const [pEmployeeName, setPEmployeeName] = useState(null);
  
  const menuRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const employeeInfo = jwt_decode(localStorage.getItem("token"));
      setPEmployeeId(employeeInfo.UserInfo.userid);
      setPEmployeeName(employeeInfo.UserInfo.username);
    }
  }, []);

  

// // Start:: click footer page
// const handleClickPage = (page) => {
// };
// // End:: click footer page

return (
    <HotelId.Provider value={hotelId}>
      <ContextProvider>
        <BrowserRouter>
            {/* Start :: call container after login */}
            {pEmployeeId && <ContainerLogin 
                pEmployeeId={pEmployeeId}
                pEmployeeName={pEmployeeName} />}
            {/* End :: call container after login */}

            {/* Start :: call container before login */}
            {!pEmployeeId && <Container />}
            {/* End :: call container before login */}
        </BrowserRouter>
      </ContextProvider>
    </HotelId.Provider>
  );
}

export default App;
export {HotelId};