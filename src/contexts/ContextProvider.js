import React, {createContext, useContext, useState} from "react";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({children}) => {
  const refreshTokenAPI = "/refreshToken";
  const forgetAPI = "/forgetpassword";
  const loginAPI = "/login";
  const logoutAPI = "/logout";
  const changePasswordAPI = "/changePassword";
  const accessLevelAPI = "/accessLevels";
  const gstAPI = "/gsts";
  const employeeAPI = "/employees";
  const idDocumentAPI = "/idDocuments";
  const planAPI = "/plans";
  const roomCategoryAPI = "/roomCategories";
  const roomAPI = "/rooms";
  const bookingAgentAPI = "/bookingAgents";
  const guestAPI = "/guests";
  const guestRoomAPI = "/guestRooms";
  const guestPaymentAPI = "/guestExpensesPayments";
  const itemPerRow = 3;
  const itemPerPage = itemPerRow * 3;

  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [showMenu, setShowMenu] = useState(localStorage.getItem("menuStatus") !== null ? localStorage.getItem("menuStatus") : true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setMenuStatus = (status) => {
    setShowMenu(status);
    localStorage.setItem("menuStatus", status);
  };

  const handleClick = (clicked) => setIsClicked({...initialState, [clicked]: true});

  return (
    <StateContext.Provider value={{initialState, refreshTokenAPI, forgetAPI, loginAPI, logoutAPI, changePasswordAPI,
      accessLevelAPI, gstAPI, employeeAPI, idDocumentAPI, planAPI, roomCategoryAPI, roomAPI, bookingAgentAPI,
      guestAPI, guestRoomAPI, guestPaymentAPI,
      screenSize, setScreenSize, currentColor, setCurrentColor, 
      currentMode, setCurrentMode, themeSettings, setThemeSettings, 
      activeMenu, setActiveMenu, showMenu, setShowMenu,
      isClicked, setIsClicked, itemPerRow, 
      itemPerPage, setColor, setMode, 
      setMenuStatus, handleClick}} >

      { children }
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);