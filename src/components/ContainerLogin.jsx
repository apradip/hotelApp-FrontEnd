import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Sliders } from "react-feather";
import { ToastContainer } from "react-toastify";

import { useStateContext } from "../contexts/ContextProvider";
import { getPage } from "./Common";
import Navbar from "./NavbarLogin";
import Footer from "./FooterLogin";
import Dashboard from "../pages/Dashboard"
import AccessLevels from "../pages/AccessLevels";
import Plans from "../pages/Plans";
import RoomCategories from "../pages/RoomCategories";
import IDDocuments from "../pages/IDDocuments";
import BookingAgents from "../pages/BookingAgents";
import Employees from "../pages/Employees";
import Rooms from "../pages/Rooms";
import Support from "../pages/Support";
import Help from "../pages/Help";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Error404 from "../pages/Error404";

// Start:: hide toast close button
const CloseButton = ({closeToast}) => (
  <i className="material-icons"
      onClick={closeToast}>
  </i>
);
// End:: hide toast close button

// Start:: Component
const ContainerLogin = ({ pEmployeeId, pEmployeeName }) => {
  const contextValues = useStateContext();
  const [menuState, setMenuState] = useState(contextValues.showMenu);
  const [menuSelected, setMenuSelected] = useState(null);
  const navRef = useRef(null);
  const accessLevelRef = useRef(null);
  const employeeRef = useRef(null);
  const idDocumentRef = useRef(null);
  const planRef = useRef(null);
  const roomCategoryRef = useRef(null);
  const roomRef = useRef(null);
  const bookingAgentRef = useRef(null);

  useEffect(() => {
    const page = getPage(process.env.REACT_APP_BASE_URI, window.location.href);
    navRef.current.changePage(page);
    setMenuSelected(page);
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    navRef.current.changePage(menuSelected);
  }, [menuSelected]);

  // Start:: show/hide side menu bar
  const handleShowHideSideBar = (s) => {
    setMenuState(s);
  };
  // End:: show/hide side menu bar

  // Start:: click page menu
  const handelClickMenuItem = (page) => {
    setMenuSelected(page);
  };
  // End:: click page menu

  // Start:: handle header operational options
  const handleSearch = (text) => {
    switch (menuSelected) {
      case "accesslevels":
        accessLevelRef && accessLevelRef.current.changeSearch(text);
        break;

      case "plans":
        planRef && planRef.current.changeSearch(text);
        break;

      case "roomcategories":
        roomCategoryRef && roomCategoryRef.current.changeSearch(text);
        break;
          
      case "iddocuments":
        idDocumentRef && idDocumentRef.current.changeSearch(text);
        break;

      case "bookingagents":
        bookingAgentRef && bookingAgentRef.current.changeSearch(text);
        break;

      case "employees":
        employeeRef && employeeRef.current.changeSearch(text);
        break;
  
      case "rooms":
        roomRef && roomRef.current.changeSearch(text);
        break;
          
      default:
        break;        
    }
  };

  const handleAdd = () => {
    switch (menuSelected) {
      case "accesslevels":
        accessLevelRef && accessLevelRef.current.openAdd();
        break;

      case "plans":
        planRef && planRef.current.openAdd();
        break;

      case "roomcategories":
        roomCategoryRef && roomCategoryRef.current.openAdd();
        break;
          
      case "iddocuments":
        idDocumentRef && idDocumentRef.current.openAdd();
        break;

      case "bookingagents":
        bookingAgentRef && bookingAgentRef.current.openAdd();
        break;
  
      case "employees":
        employeeRef && employeeRef.current.openAdd();
        break;

      case "rooms":
        roomRef && roomRef.current.openAdd();
        break;
          
      default:
        break;        
    }
  };

  const handleEdit = () => {
    switch (menuSelected) {
      case "accesslevels":
        accessLevelRef && accessLevelRef.current.openEdit();
        break;

      case "plans":
        planRef && planRef.current.openEdit();
        break;

      case "roomcategories":
        roomCategoryRef && roomCategoryRef.current.openEdit();
        break;
          
      case "iddocuments":
        idDocumentRef && idDocumentRef.current.openEdit();
        break;

      case "bookingagents":
        bookingAgentRef && bookingAgentRef.current.openEdit();
        break;

      case "employees":
        employeeRef && employeeRef.current.openEdit();
        break;
          
      case "rooms":
        roomRef && roomRef.current.openEdit();
        break;
          
      default:
        break;        
      }
  };

  const handleDel = () => {
    switch (menuSelected) {
      case "accesslevels":
        accessLevelRef && accessLevelRef.current.openDelete();
        break;

      case "plans":
        planRef && planRef.current.openDelete();
        break;

      case "roomcategories":
        roomCategoryRef && roomCategoryRef.current.openDelete();
        break;
          
      case "iddocuments":
        idDocumentRef && idDocumentRef.current.openDelete();
        break;

      case "bookingagents":
        bookingAgentRef && bookingAgentRef.current.openDelete();
        break;
  
      case "employees":
        employeeRef && employeeRef.current.openDelete();
        break;
  
      case "rooms":
        roomRef && roomRef.current.openDelete();
        break;
          
      default:
        break;
    }
  };

  const handleClose = () => {
    // console.log("close")
  };

  const handleSuccess = () => {
    navRef.current.success();
  };
  // End:: handle header operational options
  
  // Start:: Html
  return ( 
    <>
      {/* Start:: side menus */}
      { menuState &&
        <nav id="sidebar" className="sidebar mt-5">
          <div className="sidebar-content">
            <ul className="sidebar-nav mt-3">
              <li className="sidebar-item">
                <a href="#masters" data-toggle="collapse" className="sidebar-link collapsed">
                  <Sliders size={16}/>
                  <span className="align-middle">Master</span>
                </a>
                <ul id="masters" className="sidebar-dropdown list-unstyled collapse" data-parent="#sidebar">
                  <li className={`sidebar-item ${menuSelected === 'accesslevels' ? 'active' : null}`} 
                      onClick={() => {handelClickMenuItem('accesslevels')}}>
                      <NavLink to="/accesslevels" className="sidebar-link">Role</NavLink>
                  </li>
                  <li className={`sidebar-item ${menuSelected === 'plans' ? 'active' : null}`}
                      onClick={() => {handelClickMenuItem('plans')}}>
                      <NavLink to="/plans" className="sidebar-link">Plan</NavLink>
                  </li>
                  <li className={`sidebar-item ${menuSelected === 'roomcategories' ? 'active' : null}`}
                      onClick={() => {handelClickMenuItem('roomcategories')}}>
                      <NavLink to="/roomcategories" className="sidebar-link">Room category</NavLink>
                  </li>
                  <li className={`sidebar-item ${ menuSelected === 'iddocuments' ? 'active' : null}`}
                      onClick={() => {handelClickMenuItem('iddocuments')}}>
                      <NavLink to="/iddocuments" className="sidebar-link">ID document</NavLink>
                  </li>
                  <li className={`sidebar-item ${menuSelected === 'bookingagents' ? 'active' : null}`} 
                      onClick={() => {handelClickMenuItem('bookingagents')}}>
                      <NavLink to="/bookingagents" className="sidebar-link">Booking agent</NavLink>
                  </li>
                  <li className={`sidebar-item ${menuSelected === 'employees' ? 'active' : null}`} 
                      onClick={() => {handelClickMenuItem('employees')}}>
                      <NavLink to="/employees" className="sidebar-link">Employee</NavLink>
                  </li>
                  <li className={`sidebar-item ${ menuSelected === 'rooms' ? 'active' : null}`}
                      onClick={() => {handelClickMenuItem('rooms')}}>
                      <NavLink to="/rooms" className="sidebar-link">Room</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav> }
      {/* End:: side menus */}

      <div className="main">

        {/* Start:: header nav component */}
        <Navbar
            pEmployeeId = { pEmployeeId }
            pEmployeeName = { pEmployeeName }
            pSelectedPage = { menuSelected }
            onShowHideSideBar = { (s) => handleShowHideSideBar(s) }
            onChangeSearch = { (s) => handleSearch(s) } 
            onClickAdd = { handleAdd } 
            onClickEdit = { handleEdit }
            onClickDel = { handleDel }
            ref = { navRef }/>
        {/* End:: header nav component */}

        {/* Start:: all page cpmponents */}
        <main className="content">
          <div className="container-fluid p-0">
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />}/>
              
              <Route exact path="/accesslevels" element={<AccessLevels 
                                                          ref = { accessLevelRef } 
                                                          onSuccess = { handleSuccess }
                                                          onClose = { handleClose } />}/>

              <Route exact path="/iddocuments" element={<IDDocuments 
                                                          ref = { idDocumentRef } 
                                                          onSuccess = { handleSuccess }
                                                          onClose = { handleClose } />}/>

              <Route exact path="/bookingagents" element={<BookingAgents 
                                                            ref = { bookingAgentRef } 
                                                            onSuccess = { handleSuccess }
                                                            onClose = { handleClose } />}/>
              
              <Route exact path="/plans" element={<Plans 
                                                    ref = { planRef } 
                                                    onSuccess = { handleSuccess }
                                                    onClose = { handleClose } />}/>

              <Route exact path="/roomcategories" element={<RoomCategories 
                                                            ref = { roomCategoryRef } 
                                                            onSuccess = { handleSuccess }
                                                            onClose = { handleClose } />}/>

              <Route exact path="/employees" element={<Employees 
                                                        ref = { employeeRef } 
                                                        onSuccess = { handleSuccess }
                                                        onClose = { handleClose } />}/>

              <Route exact path="/rooms" element={<Rooms
                                                    ref = { roomRef } 
                                                    onSuccess = { handleSuccess }
                                                    onClose = { handleClose } />}/>
              
              <Route exact path="/support" element={<Support />}/>
              <Route exact path="/help" element={<Help />}/>
              <Route exact path="/privacy" element={<Privacy />}/>
              <Route exact path="/terms" element={<Terms />}/>
              <Route path="*" element={<Error404 />}/>
            </Routes>
          </div>
        </main>
        {/* End:: all page cpmponents */}

        {/* Start:: footer component */}
        <Footer />
        {/* End:: footer component */}
      </div>

      {/* Start :: display message */}
      <ToastContainer
        position="bottom-right"
        theme="colored"
        pauseOnFocusLoss
        pauseOnHover
        autoClose = { 2000 }
        hideProgressBar = { true }
        newestOnTop = { true }
        rtl = { false }
        closeButton ={ CloseButton } />
      {/* End :: display message */}
    </>
  );
  // End:: Html

};
// End:: Component


export default ContainerLogin;