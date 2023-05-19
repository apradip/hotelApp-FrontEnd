import React, { createContext, useEffect, useState, useRef, Component } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

import './App.css';

import { ContextProvider } from "./contexts/ContextProvider";
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

  

// Start:: click footer page
const handleClickPage = (page) => {
};
// End:: click footer page

// // Start:: Html
// return ( 
//     <Stack direction="horizontal" gap={0} className="min-h-100 h-100 w-100" style={{border: "solid 1px blue"}}>

//       {/* Start:: sidebar */}
//       {menuState &&
//         <div className="sidebar align-self-stretch min-h-100 h-100" style={{border: "solid 1px red", height: "100%" }}>
//           {/* <div className="sidebar-content"> */}
//             <ul className="sidebar-nav">

//               {/* Start:: app logo */}
//               <li className="sidebar-item">
//                 <NavLink className = "sidebar-brand" 
//                     to="/dashboard" >
//                     <i className="align-middle mr-1">
//                         <span className = "badge badge-light">
//                             <img className="icon" 
//                                 src = 'assets/img/brands/hotelapp.png' 
//                                 alt = "Hotel App" />                  
//                         </span>
//                     </i>
//                     <span className = {sideBarHeaderTextClass}>Hotel App</span>
//                 </NavLink>
//               </li>
//               {/* End:: app logo */}

//               <li className="sidebar-item">
//                 <a href="#masters" data-toggle="collapse" className="sidebar-link collapsed">
//                   <Command size={16}/> 
//                   <span className="align-middle">Masters</span>
//                 </a>
//                 <ul id="masters" className="sidebar-dropdown list-unstyled collapse" data-parent="#sidebar">
//                   <li className={`sidebar-item ${menuSelected === 'accesslevels' ? 'active' : null}`} 
//                       onClick={() => {handelClickMenuItem('accesslevels')}}>
//                       <NavLink to="/accesslevels" className="sidebar-link">Role</NavLink>
//                   </li>
//                   <li className={`sidebar-item ${menuSelected === 'plans' ? 'active' : null}`}
//                       onClick={() => {handelClickMenuItem('plans')}}>
//                       <NavLink to="/plans" className="sidebar-link">Plan</NavLink>
//                   </li>
//                   <li className={`sidebar-item ${menuSelected === 'roomcategories' ? 'active' : null}`}
//                       onClick={() => {handelClickMenuItem('roomcategories')}}>
//                       <NavLink to="/roomcategories" className="sidebar-link">Room category</NavLink>
//                   </li>
//                   <li className={`sidebar-item ${ menuSelected === 'iddocuments' ? 'active' : null}`}
//                       onClick={() => {handelClickMenuItem('iddocuments')}}>
//                       <NavLink to="/iddocuments" className="sidebar-link">ID document</NavLink>
//                   </li>
//                   <li className={`sidebar-item ${menuSelected === 'bookingagents' ? 'active' : null}`} 
//                       onClick={() => {handelClickMenuItem('bookingagents')}}>
//                       <NavLink to="/bookingagents" className="sidebar-link">Booking agent</NavLink>
//                   </li>
//                   <li className={`sidebar-item ${menuSelected === 'employees' ? 'active' : null}`} 
//                       onClick={() => {handelClickMenuItem('employees')}}>
//                       <NavLink to="/employees" className="sidebar-link">Employee</NavLink>
//                   </li>
//                   <li className={`sidebar-item ${ menuSelected === 'rooms' ? 'active' : null}`}
//                       onClick={() => {handelClickMenuItem('rooms')}}>
//                       <NavLink to="/rooms" className="sidebar-link">Room</NavLink>
//                   </li>
//                   <li className={`sidebar-item ${ menuSelected === 'tables' ? 'active' : null}`}
//                       onClick={() => {handelClickMenuItem('tables')}}>
//                       <NavLink to="/tables" className="sidebar-link">Table</NavLink>
//                   </li>                  
//                   <li className={`sidebar-item ${ menuSelected === 'foods' ? 'active' : null}`}
//                       onClick={() => {handelClickMenuItem('foods')}}>
//                       <NavLink to="/foods" className="sidebar-link">Food</NavLink>
//                   </li>                  
//                   <li className={`sidebar-item ${ menuSelected === 'miscellaneouses' ? 'active' : null}`}
//                       onClick={() => {handelClickMenuItem('miscellaneouses')}}>
//                       <NavLink to="/Miscellaneouses" className="sidebar-link">Miscellaneous</NavLink>
//                   </li>                  
//                   <li className={`sidebar-item ${ menuSelected === 'services' ? 'active' : null}`}
//                       onClick={() => {handelClickMenuItem('services')}}>
//                       <NavLink to="/services" className="sidebar-link">Service</NavLink>
//                   </li>                  
//                 </ul>
//               </li>
//               <li className="sidebar-item">
//                 <a href="#transactions" data-toggle="collapse" className="sidebar-link collapsed">
//                   <Feather size={16}/>
//                   <span className="align-middle">Transactions</span>
//                 </a>
//                 <ul id="transactions" className="sidebar-dropdown list-unstyled collapse" data-parent="#sidebar">
//                   <li className={`sidebar-item ${menuSelected === 'guestrooms' ? 'active' : null}`} 
//                       onClick={() => {handelClickMenuItem('guestrooms')}}>
//                       <NavLink to="/guestrooms" className="sidebar-link">Rooms</NavLink>
//                   </li>
//                   <li className={`sidebar-item ${menuSelected === 'guesttables' ? 'active' : null}`} 
//                       onClick={() => {handelClickMenuItem('guesttables')}}>
//                       <NavLink to="/guesttables" className="sidebar-link">Tables</NavLink>
//                   </li>
//                   <li className={`sidebar-item ${menuSelected === 'guestfoods' ? 'active' : null}`} 
//                       onClick={() => {handelClickMenuItem('guestfoods')}}>
//                       <NavLink to="/guestfoods" className="sidebar-link">Foods</NavLink>
//                   </li>
//                   <li className={`sidebar-item ${menuSelected === 'guestmiscellaneous' ? 'active' : null}`} 
//                       onClick={() => {handelClickMenuItem('guestmiscellaneous')}}>
//                       <NavLink to="/guestmiscellaneous" className="sidebar-link">Miscellaneous</NavLink>
//                   </li>
//                   <li className={`sidebar-item ${menuSelected === 'guestpayments' ? 'active' : null}`} 
//                       onClick={() => {handelClickMenuItem('guestpayments')}}>
//                       <NavLink to="/guestpayments" className="sidebar-link">Payments</NavLink>
//                   </li>
//                 </ul>
//               </li>
//               <li className="sidebar-item">
//                 <a href="#reports" data-toggle="collapse" className="sidebar-link collapsed">
//                   <BookOpen size={16}/>
//                   <span className="align-middle">Reports</span>
//                 </a>
//                 <ul id="reports" className="sidebar-dropdown list-unstyled collapse" data-parent="#sidebar">
//                   <li className={`sidebar-item ${menuSelected === 'bookings' ? 'active' : null}`} 
//                       onClick={() => {handelClickMenuItem('bookings')}}>
//                       <NavLink to="/bookings" className="sidebar-link">Booking</NavLink>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//           {/* </div> */}
//         </div>
//       }
//       {/* End:: sidebar */}

//       {/* Start:: body container */}
//       <div className="p-0 w-100 min-h-100" style={{border: "solid 0px green"}}>
//           {/* <Stack gap={0}>  */}

//             {/* Start:: header nav component */}
//             <Header
//                 ref = {navRef}
//                 pEmployeeId = {pEmployeeId}
//                 pEmployeeName = {pEmployeeName}
//                 pSelectedPage = {menuSelected}
//                 onShowHideSideBar = {(s) => handleToggleSideBar(s)}
//                 onChangeSearch = {(s) => handleSearch(s)} 
//                 onClickAdd = {handleAdd} 
//                 onClickEdit = {handleEdit}
//                 onClickDel = {handleDel} />
//             {/* End:: header nav component */}

//             {/* Start:: all page cpmponents */}
//             <main>
//                 <Routes>
//                   <Route exact path="/dashboard" element={<Dashboard />}/>
                  
//                   <Route exact path="/accesslevels" element={<AccessLevels 
//                                                               ref={accessLevelRef} 
//                                                               onSuccess={handleSuccess}
//                                                               onClose={handleClose}/>}/>

//                   <Route exact path="/iddocuments" element={<IDDocuments 
//                                                               ref={idDocumentRef} 
//                                                               onSuccess={handleSuccess}
//                                                               onClose={handleClose}/>}/>

//                   <Route exact path="/bookingagents" element={<BookingAgents 
//                                                                 ref={bookingAgentRef} 
//                                                                 onSuccess={handleSuccess}
//                                                                 onClose={handleClose} />}/>
                  
//                   <Route exact path="/plans" element={<Plans 
//                                                         ref={planRef} 
//                                                         onSuccess={handleSuccess}
//                                                         onClose={handleClose}/>}/>

//                   <Route exact path="/roomcategories" element={<RoomCategories 
//                                                                 ref={roomCategoryRef} 
//                                                                 onSuccess={handleSuccess}
//                                                                 onClose={handleClose}/>}/>

//                   <Route exact path="/employees" element={<Employees 
//                                                             ref={employeeRef} 
//                                                             onSuccess={handleSuccess}
//                                                             onClose={handleClose}/>}/>

//                   <Route exact path="/rooms" element={<Rooms
//                                                         ref={roomRef} 
//                                                         onSuccess={handleSuccess}
//                                                         onClose={handleClose}/>}/>

//                   <Route exact path="/tables" element={<Tables
//                                                         ref={tableRef} 
//                                                         onSuccess={handleSuccess}
//                                                         onClose={handleClose}/>}/>

//                   <Route exact path="/foods" element={<Foods
//                                                         ref={foodRef} 
//                                                         onSuccess={handleSuccess}
//                                                         onClose={handleClose}/>}/>

//                   <Route exact path="/miscellaneouses" element={<Miscellaneouses
//                                                         ref={miscellaneousRef} 
//                                                         onSuccess={handleSuccess}
//                                                         onClose={handleClose}/>}/>

//                   <Route exact path="/services" element={<Services
//                                                         ref={serviceRef} 
//                                                         onSuccess={handleSuccess}
//                                                         onClose={handleClose}/>}/>

//                   <Route exact path="/guestrooms" element={<GuestRooms
//                                                         ref={guestRoomRef} 
//                                                         onSuccess={handleSuccess}
//                                                         onClose={handleClose}/>}/>

//                   <Route exact path="/guesttables" element={<GuestTables
//                                                         ref={guestTableRef} 
//                                                         onSuccess={handleSuccess}
//                                                         onClose={handleClose}/>}/>

//                   <Route exact path="/guestfoods" element={<GuestFoods
//                                                         ref={guestFoodRef} 
//                                                         onSuccess={handleSuccess}
//                                                         onClose={handleClose}/>}/>

//                   <Route exact path="/guestmiscellaneous" element = {<GuestMiscellaneouses
//                                                         ref = {guestMiscellaneousRef} 
//                                                         onSuccess = {handleSuccess}
//                                                         onClose = {handleClose}/>}/>

//                   <Route exact path="/guestpayments" element={<GuestPayments
//                                                         ref={guestPaymentRef} 
//                                                         onSuccess={handleSuccess}
//                                                         onClose={handleClose}/>}/>

//                   <Route exact path="/support" element={<Support />}/>
//                   <Route exact path="/help" element={<Help />}/>
//                   <Route exact path="/privacy" element={<Privacy />}/>
//                   <Route exact path="/terms" element={<Terms />}/>
//                   <Route path="*" element={<Error404 />}/>
//                 </Routes>

//                 {/* Start :: display message */}
//                 <ToastContainer
//                   position="bottom-right"
//                   theme="colored"
//                   pauseOnFocusLoss
//                   pauseOnHover
//                   autoClose = { 2000 }
//                   hideProgressBar = { true }
//                   newestOnTop = { true }
//                   rtl = { false }
//                   closeButton = {CloseButton} />
//                 {/* End :: display message */}
//             </main>
//             {/* End:: all page cpmponents */}

//             {/* Start:: footer component */}
//             <Footer 
//               onClickPage = {(p) => handleClickPage(p)}  
//               ref = {footerRef} />
//             {/* End:: footer component */}

//           {/* </Stack>           */}
//       </div>
//       {/* End:: body container */}

//     </Stack>
// );
// // End:: Html



  return (
    <HotelId.Provider value={hotelId}>
      <ContextProvider>
        <BrowserRouter>
          {/* <div> */}

            {/* Start :: call container after login */}
            {pEmployeeId && <ContainerLogin 
                pEmployeeId={pEmployeeId}
                pEmployeeName={pEmployeeName} />}
            {/* End :: call container after login */}

            {/* Start :: call container before login */}
            {!pEmployeeId && <Container />}
            {/* End :: call container before login */}

          {/* </div> */}
        </BrowserRouter>
      </ContextProvider>
    </HotelId.Provider>
  );
}

export default App;
export { HotelId };