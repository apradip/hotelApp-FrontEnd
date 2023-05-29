import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useStateContext } from "../contexts/ContextProvider";
import { getPage } from "./common/Common";
import Header from "./HeaderLogin";
import Menu from "./MenuLogin";
import Footer from "./FooterLogin";
import Dashboard from "../pages/Dashboard"
import AccessLevels from "../pages/AccessLevels";
import Plans from "../pages/Plans";
import RoomCategories from "../pages/RoomCategories";
import IDDocuments from "../pages/IDDocuments";
import BookingAgents from "../pages/BookingAgents";
import Employees from "../pages/Employees";
import Rooms from "../pages/Rooms";
import Tables from "../pages/Tables";
import Foods from "../pages/Foods";
import Miscellaneouses from "../pages/Miscellaneouses";
import Services from "../pages/Services";
import GuestRooms from "../pages/GuestRooms";
import GuestTables from "../pages/GuestTables";
import GuestFoods from "../pages/GuestFoods";
import GuestServices from "../pages/GuestServices";
import GuestMiscellaneouses from "../pages/GuestMiscellaneouses";
import GuestPayments from "../pages/GuestPayments";
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
const ContainerLogin = ({pEmployeeId, pEmployeeName}) => {
  const contextValues = useStateContext();
  const [menuState, setMenuState] = useState(contextValues.showMenu);
  const [menuParentSelected, setMenuParentSelected] = useState(null);
  const [menuSelected, setMenuSelected] = useState(null);
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const footerRef = useRef(null);
  const accessLevelRef = useRef(null);
  const employeeRef = useRef(null);
  const idDocumentRef = useRef(null);
  const planRef = useRef(null);
  const roomCategoryRef = useRef(null);
  const roomRef = useRef(null);
  const tableRef = useRef(null);
  const foodRef = useRef(null);
  const miscellaneousRef = useRef(null);
  const serviceRef = useRef(null);
  const bookingAgentRef = useRef(null);
  const guestRoomRef = useRef(null);
  const guestTableRef = useRef(null);
  const guestFoodRef = useRef(null);
  const guestServiceRef = useRef(null);
  const guestMiscellaneousRef = useRef(null);
  const guestPaymentRef = useRef(null);

  useEffect(() => {
    const page = getPage(process.env.REACT_APP_BASE_URI, window.location.href);
    navRef.current.changePage(page);
    setMenuSelected(page);
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    navRef.current.changePage(menuSelected);
  }, [menuSelected]);

  // Start:: show/hide side menu bar
  const handleToggleSideBar = (s) => {
    s ?  document.body.className = "sidebar-mini layout-fixed" : document.body.className = "sidebar-mini layout-fixed sidebar-collapse";
    setMenuState(s);
  };
  // End:: show/hide side menu bar

  // // Start:: click page menu
  // const handelClickMenuItem = (page) => {
  //   setMenuSelected(page);
  // };
  // // End:: click page menu

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

      case "tables":
        tableRef && tableRef.current.changeSearch(text);
        break;

      case "foods":
        foodRef && foodRef.current.changeSearch(text);
        break;

      case "miscellaneouses":
        miscellaneousRef && miscellaneousRef.current.changeSearch(text);
        break;

      case "services":
        serviceRef && serviceRef.current.changeSearch(text);
        break;
          
      case "guestrooms":
        guestRoomRef && guestRoomRef.current.changeSearch(text);
        break;

      case "guesttables":
        guestTableRef && guestTableRef.current.changeSearch(text);
        break;
  
      case "guestfoods":
        guestFoodRef && guestFoodRef.current.changeSearch(text);
        break;

      case "guestservices":
        guestServiceRef && guestServiceRef.current.changeSearch(text);
        break;
  
      case "guestmiscellaneous":
        guestMiscellaneousRef && guestMiscellaneousRef.current.changeSearch(text);
        break;
          
      case "guestpayments":
        guestPaymentRef && guestPaymentRef.current.changeSearch(text);
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

      case "tables":
        tableRef && tableRef.current.openAdd();
        break;

      case "foods":
        foodRef && foodRef.current.openAdd();
        break;

      case "miscellaneouses":
        miscellaneousRef && miscellaneousRef.current.openAdd();
        break;

      case "services":
        serviceRef && serviceRef.current.openAdd();
        break;
          
      case "guestrooms":
        guestRoomRef && guestRoomRef.current.openAdd();
        break;

      case "guesttables":
        guestTableRef && guestTableRef.current.openAdd();
        break;

      case "guestfoods":
        guestFoodRef && guestFoodRef.current.openAdd();
        break;

      case "guestservices":
        guestServiceRef && guestServiceRef.current.openAdd();
        break;
  
      case "guestmiscellaneous":
        guestMiscellaneousRef && guestMiscellaneousRef.current.openAdd();
        break;
          
      case "guestpayments":
        guestPaymentRef && guestPaymentRef.current.openAdd();
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
  
      case "tables":
        tableRef && tableRef.current.openEdit();
        break;

      case "foods":
        foodRef && foodRef.current.openEdit();
        break;

      case "miscellaneouses":
        miscellaneousRef && miscellaneousRef.current.openEdit();
        break;
    
      case "services":
        serviceRef && serviceRef.current.openEdit();
        break;
          
      case "guestrooms":
        guestRoomRef && guestRoomRef.current.openEdit();
        break;

      case "guesttables":
        guestTableRef && guestTableRef.current.openEdit();
        break;
  
      case "guestfoods":
        guestFoodRef && guestFoodRef.current.openEdit();
        break;

      // case "guestservices":
      //   guestServiceRef && guestServiceRef.current.openEdit();
      //   break;

      // case "guestmiscellaneous":
      //   guestMiscellaneousRef && guestMiscellaneousRef.current.openEdit();
      //   break;
          
      case "guestpayments":
        guestPaymentRef && guestPaymentRef.current.openEdit();
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

      case "tables":
        tableRef && tableRef.current.openDelete();
        break;

      case "foods":
        foodRef && foodRef.current.openDelete();
        break;

      case "miscellaneouses":
        miscellaneousRef && miscellaneousRef.current.openDelete();
        break;

      case "services":
        serviceRef && serviceRef.current.openDelete();
        break;
          
      case "guestrooms":
        guestRoomRef && guestRoomRef.current.openDelete();
        break;

      case "guesttables":
        guestTableRef && guestTableRef.current.openDelete();
        break;
  
      case "guestfoods":
        guestFoodRef && guestFoodRef.current.openDelete();
        break;

      case "guestservices":
        guestServiceRef && guestServiceRef.current.openDelete();
        break;
  
      case "guestmiscellaneous":
        guestMiscellaneousRef && guestMiscellaneousRef.current.openDelete();
        break;
          
      case "guestpayments":
        guestPaymentRef && guestPaymentRef.current.openDelete();
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

  // Start:: click footer page
  const handleClickParent = (parent) => {
    setMenuParentSelected(parent);
  };
  // End:: click footer page

  // Start:: click footer page
  const handleClickPage = (page) => {
    setMenuSelected(page);
  };
  // End:: click footer page
  
  // Start:: Html
  return (
    <div className="wrapper">
      <div className="col-12 p-0">

        {/* Start:: header nav component */}
        <Header
            ref={navRef}
            pEmployeeId={pEmployeeId}
            pEmployeeName={pEmployeeName}
            onToggleSideBar={(s) => handleToggleSideBar(s)}
            onChangeSearch={(s) => handleSearch(s)} 
            onClickAdd={handleAdd} 
            onClickEdit={handleEdit}
            onClickDel={handleDel} />
        {/* End:: header nav component */}

        {/* Start:: sidebar */}
        <Menu
          ref={menuRef}
          onSelectParent={(pr) => handleClickParent(pr)}
          onSelectPage={(p) => handleClickPage(p)} />
        {/* End:: sidebar */}

        {/* Start:: all page cpmponents */}
        <main>
            {/* Start :: route page */}
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />}/>
            
              <Route exact path="/accesslevels" element={<AccessLevels 
                                                          ref={accessLevelRef} 
                                                          onSuccess={handleSuccess}
                                                          onClose={handleClose} />}/>

              <Route exact path="/iddocuments" element={<IDDocuments 
                                                          ref={idDocumentRef} 
                                                          onSuccess={handleSuccess}
                                                          onClose={handleClose} />}/>

              <Route exact path="/bookingagents" element={<BookingAgents 
                                                            ref={bookingAgentRef} 
                                                            onSuccess={handleSuccess}
                                                            onClose={handleClose} />}/>
            
              <Route exact path="/plans" element={<Plans 
                                                    ref={planRef} 
                                                    onSuccess={handleSuccess}
                                                    onClose={handleClose} />}/>

              <Route exact path="/roomcategories" element={<RoomCategories 
                                                            ref={roomCategoryRef} 
                                                            onSuccess={handleSuccess}
                                                            onClose={handleClose} />}/>

              <Route exact path="/employees" element={<Employees 
                                                        ref={employeeRef} 
                                                        onSuccess={handleSuccess}
                                                        onClose={handleClose} />}/>

              <Route exact path="/rooms" element={<Rooms
                                                    ref={roomRef} 
                                                    onSuccess={handleSuccess}
                                                    onClose={handleClose} />}/>

              <Route exact path="/tables" element={<Tables
                                                    ref={tableRef} 
                                                    onSuccess={handleSuccess}
                                                    onClose={handleClose} />}/>

              <Route exact path="/foods" element={<Foods
                                                    ref={foodRef} 
                                                    onSuccess={handleSuccess}
                                                    onClose={handleClose} />}/>

              <Route exact path="/miscellaneouses" element={<Miscellaneouses
                                                            ref={miscellaneousRef} 
                                                            onSuccess={handleSuccess}
                                                            onClose={handleClose} />}/>

              <Route exact path="/services" element={<Services
                                                      ref={serviceRef} 
                                                      onSuccess={handleSuccess}
                                                      onClose={handleClose} />}/>

              <Route exact path="/guestrooms" element={<GuestRooms
                                                        ref={guestRoomRef} 
                                                        onSuccess={handleSuccess}
                                                        onClose={handleClose} />}/>

              <Route exact path="/guesttables" element={<GuestTables
                                                        ref={guestTableRef} 
                                                        onSuccess={handleSuccess}
                                                        onClose={handleClose} />}/>

              <Route exact path="/guestfoods" element={<GuestFoods
                                                        ref={guestFoodRef} 
                                                        onSuccess={handleSuccess}
                                                        onClose={handleClose} />}/>

              <Route exact path="/guestservices" element={<GuestServices
                                                        ref={guestServiceRef} 
                                                        onSuccess={handleSuccess}
                                                        onClose={handleClose} />}/>

              <Route exact path="/guestmiscellaneous" element = {<GuestMiscellaneouses
                                                                  ref = {guestMiscellaneousRef} 
                                                                  onSuccess = {handleSuccess}
                                                                  onClose = {handleClose} />}/>

              <Route exact path="/guestpayments" element={<GuestPayments
                                                          ref={guestPaymentRef} 
                                                          onSuccess={handleSuccess}
                                                          onClose={handleClose} />}/>

              <Route exact path="/support" element={<Support />}/>
              <Route exact path="/help" element={<Help />}/>
              <Route exact path="/privacy" element={<Privacy />}/>
              <Route exact path="/terms" element={<Terms />}/>
              <Route path="*" element={<Error404 />}/>
            </Routes>
            {/* End :: route page */}

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
              closeButton = {CloseButton} />
            {/* End :: display message */}
        </main>
        {/* End:: all page cpmponents */}

        {/* Start:: footer component */}
        <Footer 
          onClickPage={(p) => handleClickPage(p)}  
          ref={footerRef} />
        {/* End:: footer component */}

      </div>
    </div>
  );
  // End:: Html

};
// End:: Component


export default ContainerLogin;