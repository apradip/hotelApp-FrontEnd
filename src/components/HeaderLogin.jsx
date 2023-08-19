import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Button, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, Paperclip, Edit3, Scissors, User, MoreVertical, Coffee, Umbrella, Wind } from "react-feather";

import { HotelId } from "../App";
import { useStateContext } from "../contexts/ContextProvider";
import { getFirstName, getPageAttribute } from "./common/Common";
import useFetchWithAuth from "./common/useFetchWithAuth";
import Search from "./Search";
import Profile from "./auth/Profile";
import ChangePassword from "./auth/ChangePassword";
import Logout from "./auth/Logout";

// import Dropdown, { DropdownItem } from "./common/Dropdown";

import CardMiscellaneousOrder from "./guestMiscellaneous/GuestMiscellaneousOrderCard";
import CardServiceOrder from "./guestService/GuestServiceOrderCard";
import CardTableOrder from "./guestTable/GuestTableOrderCard";

import MiscellaneousOrderList from "./guestMiscellaneous/GuestMiscellaneousPendingOrderList";
import ServiceOrderList from "./guestService/GuestServicePendingOrderList";
import TableOrderList from "./guestTable/GuestTablePendingOrderList";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");


const alertOptions = [
    {
        key: "T",  
        name: "TableAlert",
        placement: "end",
        scroll: false,
        backdrop: true
    },
    {
        key: "S",  
        name: "ServiceAlert",
        placement: "end",
        scroll: false,
        backdrop: true
    },
    {
        key: "M",  
        name: "MiscellaneousAlert",
        placement: "end",
        scroll: false,
        backdrop: true
    }
];

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <NavLink to="#" className="dropdown"
        onClick={(e) => {e.preventDefault(); onClick(e);}} >
        {children}
    </NavLink>
))

// Start:: Component
// props parameters
// pEmployeeId
// pEmployeeName
// onToggleSideBar
// onChangeSearch
// onClickAdd
// onClickEdit
// onClickDel

// useImperativeHandle
// changePage
// success
const HeaderLogin = forwardRef((props, ref) => {   
    const hotelId = useContext(HotelId);     
    const contextValues = useStateContext();

    const [miscellaneousCardComponents, setMiscellaneousCardComponents] = useState([]);
    const [serviceCardComponents, setServiceCardComponents] = useState([]);
    const [tableCardComponents, setTableCardComponents] = useState([]);

    const miscellaneousOrderListRef = useRef(null);
    const serviceOrderListRef = useRef(null);
    const tableOrderListRef = useRef(null);

    const [miscellaneousOrderCount, setMiscellaneousOrderCount] = useState(0);
    const [serviceOrderCount, setServiceOrderCount] = useState(0);
    const [tableOrderCount, setTableOrderCount] = useState(0);

    const [showKitchenAlert, setShowKitchenAlert] = useState([false, false, false]);

    const [selectedPage, setSelectedPage] = useState(null);
    const [menuState, setMenuState] = useState(contextValues.showMenu);
    const searchRef = useRef(null);
    const navigate = useNavigate();


    const dropUserRef = useRef(null);
    const dropToggleUserRef = useRef(null);
    

    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.employeeAPI}/${hotelId}/${props.pEmployeeId}`
    });
	const {doLogout} = useFetchWithAuth({
        url: `${contextValues.logoutAPI}/${hotelId}/${props.pEmployeeId}`
    });

    useEffect(() => {
        try {
            socket.on("M_order", (guestId) => {
                miscellaneousOrderListRef.current && 
                    miscellaneousOrderListRef.current.Refresh();
            });

            socket.on("S_order", (guestId) => {
                serviceOrderListRef.current && 
                    serviceOrderListRef.current.Refresh();
            });

            socket.on("T_order", (guestId) => {
                tableOrderListRef.current && 
                    tableOrderListRef.current.Refresh();
            });
        } catch (err) {
            console.log(err);
        }
    },[]);

    useEffect(() => {
        try {
            contextValues.setMenuStatus(menuState);
            props.onToggleSideBar(menuState);
        } catch (err) {
            console.log(err);
        }
    }, [menuState]);    // eslint-disable-line react-hooks/exhaustive-deps

    const handleToggleKitchenAlert = (offcanvasName) => {
        try {
            const newItems = alertOptions.map((item, idx) => {
                if (item.name === offcanvasName) {
                    if (offcanvasName === alertOptions[0].name) {
                        if (!showKitchenAlert[idx]) {
                            tableOrderListRef.current && 
                                tableOrderListRef.current.Refresh();
                        }
                    }

                    if (offcanvasName === alertOptions[1].name) {
                        if (!showKitchenAlert[idx]) {
                            serviceOrderListRef.current && 
                                serviceOrderListRef.current.Refresh();
                        }
                    }

                    if (offcanvasName === alertOptions[2].name) {
                        if (!showKitchenAlert[idx]) {
                            miscellaneousOrderListRef.current && 
                                miscellaneousOrderListRef.current.Refresh();
                        }
                    }

                    return showKitchenAlert[idx] ? false : true;
                }

                return showKitchenAlert[idx];
            });

            setShowKitchenAlert(newItems);
        } catch (err) {
            console.log(err);
        }
    };

    // Start:: on success of user options
    const handleToggleSideMenu = () => {
        setMenuState(!menuState);
    };

    const handleClose = () => {
        console.log("close");
    };
    
    const handleChangeProfileSuccess = async () => {
        toast.success("Profile successfully updated & your password has been reseated");

        (async () => {
            try {
                await doFetch();
            } catch (err) {
              console.log("Error occured when fetching data");
            }
        })();

        (async () => {
            try {
                await doLogout();
                handleLogoutSuccess();
            } catch (err) {
              console.log("Error occured when fetching data");
            }
        })();
    };
    
    const handleChangePasswordSuccess = async() => {
        toast.success("Password successfully updated");

        (async () => {
            try {
                await doLogout();
                handleLogoutSuccess();
            } catch (err) {
              console.log("Error occured when fetching data");
            }
          })();
    };
        
    const handleLogoutSuccess = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        navigate("./", { replace: true });
        navigate(0);
    };
    // End:: on success of user options

    // Start:: handle page component search/add/edit/delete
    // Start:: Search
    const handleSearch = (text) => {
        props.onChangeSearch(text);
    };
    // End:: Search

    // Start:: Open add modal
    const handleOpenAdd = () => {
        props.onClickAdd();
    };
    // End:: Open add modal

    // Start:: Open edit modal
    const handleOpenEdit = () => {
        props.onClickEdit();
    };
    // End:: Open edit modal

    // Start:: Open delete modal
    const handleOpenDel = () => {
        props.onClickDel();
    };
    // End:: Open delete modal

    // Start:: on successfull operation
    const success = () => {
        searchRef.current &&
            searchRef.current.setFocus();
    };
    // End:: on successfull operation
    // End:: handle page component search/add/edit/delete 

    // Start:: forward reff change page
    const changePage = (page) => {
        try {
            setSelectedPage(page);
        } catch (err) {
            console.log(err);
        }
    };

    // Start:: populate offcanvas with pending orders
    const handleHefresh = (option, orders) => {
        try {
            switch (option) {
                case "M":
                    const MGuests = orders.filter((order) => (order.items.length > 0));
                    const tmpMCards = MGuests.map((element) => {
                        return (<CardMiscellaneousOrder
                                    className = "border"
                                    key = {`M_${element.id}`}
                                    pGuestId = {element.id}/>);
                    });
                      
                    setMiscellaneousCardComponents(tmpMCards);
                    setMiscellaneousOrderCount(MGuests.length);

                    break;

                case "S":
                    const SGuests = orders.filter((order) => (order.items.length > 0));
                    const tmpSCards = SGuests.map((element) => {
                        return (<CardServiceOrder
                                    className = "border"
                                    key = {`S_${element.id}`}
                                    pGuestId = {element.id}/>);
                    });
                      
                    setServiceCardComponents(tmpSCards);
                    setServiceOrderCount(SGuests.length);

                    break;

                case "T":
                    const TGuests = orders.filter((order) => (order.items.length > 0));
                    const tmpTCards = TGuests.map((element) => {
                        return (<CardTableOrder
                                    className = "border"
                                    key = {`T_${element.id}`}
                                    pGuestId = {element.id}/>);
                    });
                      
                    setTableCardComponents(tmpTCards);
                    setTableOrderCount(TGuests.length);

                    break;
                        
                default:                
                    break;                
            }
        } catch (err) {
            console.log(err);
        }
    };
    // End:: populate offcanvas with pending orders

    useImperativeHandle(ref, () => {
        return {changePage, success}
    });
    // End:: forward reff change page


    // Start:: Html
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">

            <MiscellaneousOrderList 
                key = "keyMiscellaneousOrderList"
                ref = {miscellaneousOrderListRef}
                onRefreshed = {handleHefresh}/>

            <ServiceOrderList 
                key = "keyServiceOrderList"
                ref = {serviceOrderListRef}
                onRefreshed = {handleHefresh}/>

            <TableOrderList 
                key = "keyTableOrderList"
                ref = {tableOrderListRef}
                onRefreshed = {handleHefresh}/>

            {/* Start:: Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item"
                    onClick = {handleToggleSideMenu}>
                    <NavLink to="#" className="nav-link">
                        <Menu size={20}/>
                    </NavLink>
                </li>
            </ul>
            {/* End:: Left navbar links */}

            {/* Start:: Middle form */}
            <div className="form-inline">
                <div className="input-group input-group-sm">
                    {selectedPage &&
                        <div className="navbar-collapse collapse">
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    {getPageAttribute(selectedPage).show.search &&
                                        <Search 
                                            onChange = {handleSearch}
                                            ref = {searchRef}
                                            currentPage = {selectedPage}/>}

                                    {getPageAttribute(selectedPage).show.add &&
                                        // <OverlayTrigger
                                        //     placement="bottom"
                                        //     overlay={<Tooltip>new</Tooltip>}>
                                            <button 
                                                aria-label="add master"
                                                className="btn btn-success me-1" 
                                                size="md" 
                                                onClick={() => {handleOpenAdd()}}>
                                                <Paperclip className="feather-16"/>
                                            </button>
                                        // </OverlayTrigger>
                                        }

                                    {getPageAttribute(selectedPage).show.edit &&
                                        // <OverlayTrigger
                                        //     placement ="bottom"
                                        //     overlay={<Tooltip>edit</Tooltip>}>
                                            <button 
                                                aria-label="mod master"
                                                className="d-none d-md-block d-lg-block d-xl-block btn btn-info me-1" 
                                                size="md" 
                                                onClick={() => {handleOpenEdit()}}>
                                                <Edit3 className="feather-16"/>
                                            </button>
                                        // </OverlayTrigger>
                                        }

                                    {getPageAttribute(selectedPage).show.delete &&
                                        // <OverlayTrigger
                                        //     placement = "bottom"
                                        //     overlay = {<Tooltip>delete</Tooltip>}>
                                            <button 
                                                aria-label="delete master"
                                                className="d-none d-md-block d-lg-block d-xl-block btn btn-danger mx-0" 
                                                size="md" 
                                                onClick={() => {handleOpenDel()}}>
                                                <Scissors className="feather-16"/>
                                            </button>
                                        // </OverlayTrigger>
                                        }
                                </Nav>
                            </Navbar.Collapse>
                        </div>}
                </div>
            </div>
            {/* End:: Middle form */}

            {/* Start:: Right navbar links */}
            <ul className="navbar-nav ml-auto">

                {/* table orders */}
                <li className="nav-item dropdown">
                    <Dropdown className="d-flex align-items-center ms-3 ms-lg-3" >
                        <Dropdown.Toggle 
                            as={CustomToggle} 
                            onClick={() => {handleToggleKitchenAlert(alertOptions[0].name)}}>
                            <Coffee size={20} className="d-none d-sm-inline-block"/>
                            {(tableOrderCount > 0) ? <span className="bullet bullet-dot bg-success position-absolute translate-middle blink"></span> : ""}
                        </Dropdown.Toggle>
                    </Dropdown>

                    <Offcanvas 
                        {...alertOptions[0]}
                        show={showKitchenAlert[0]} 
                        onHide={() => {handleToggleKitchenAlert(alertOptions[0].name)}}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title><h3>Pending Table Orders</h3></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {tableCardComponents}
                        </Offcanvas.Body>
                    </Offcanvas>
                </li>

                {/* service orders             */}
                <li className="nav-item dropdown">
                    <Dropdown className="d-flex align-items-center ms-3 ms-lg-3">
                        <Dropdown.Toggle 
                            as={CustomToggle} 
                            onClick={() => {handleToggleKitchenAlert(alertOptions[1].name)}}>
                            <Umbrella size={20} className="d-none d-sm-inline-block"/>
                            {(serviceOrderCount > 0) ? <span className="bullet bullet-dot bg-success position-absolute translate-middle blink"></span> : ""}
                        </Dropdown.Toggle>
                    </Dropdown>

                    <Offcanvas 
                        {...alertOptions[1]}
                        show={showKitchenAlert[1]} 
                        onHide={() => {handleToggleKitchenAlert(alertOptions[1].name)}}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title><h3>Pending Service Orders</h3></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {serviceCardComponents}
                        </Offcanvas.Body>
                    </Offcanvas>
                </li>

                {/* Miscellaneous orders                                 */}
                <li className="nav-item dropdown">
                    <Dropdown className="d-flex align-items-center ms-3 ms-lg-3">
                        <Dropdown.Toggle 
                            as={CustomToggle} 
                            onClick={() => {handleToggleKitchenAlert(alertOptions[2].name)}}>
                            <Wind size={20} className="d-none d-sm-inline-block"/>
                            {(miscellaneousOrderCount > 0) ? <span className="bullet bullet-dot bg-success position-absolute translate-middle blink"></span> : ""}
                        </Dropdown.Toggle>
                    </Dropdown>

                    <Offcanvas 
                        {...alertOptions[2]}
                        show={showKitchenAlert[2]} 
                        onHide={() => {handleToggleKitchenAlert(alertOptions[2].name)}}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title><h3>Pending Miscellaneous Orders</h3></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {miscellaneousCardComponents}
                        </Offcanvas.Body>
                    </Offcanvas>
                </li>

                <li className="nav-item dropdown">



                    {/* <nav className="flex items-start justify-end px-4 py-2 border-b"> */}
                        {/* <Dropdown trigger={<Button>user</Button>}>
                            <DropdownItem>
                                <Edit3 size={16}/> Edit
                            </DropdownItem>
                        </Dropdown> */}
                    {/* </nav> */}



                    <Dropdown className="d-flex align-items-center ms-3 ms-lg-3"
                        ref={dropUserRef}>
                        <Dropdown.Toggle ref={dropToggleUserRef} as={CustomToggle}>
                            <User size={20} className="d-none d-sm-inline-block"/>
                            <span className="mx-1 d-none d-sm-inline-block">                                 
                                {data && getFirstName(data.name)}
                                {!data && getFirstName(props.pEmployeeName)}
                            </span>
                            <MoreVertical size={16}/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Profile 
                                pEmployeeId={props.pEmployeeId}
                                onEdited={handleChangeProfileSuccess} 
                                onClosed={handleClose}/>

                            <ChangePassword 
                                pEmployeeId={props.pEmployeeId}
                                onEdited={handleChangePasswordSuccess}
                                onClosed={handleClose}/>

                            <Logout
                                pEmployeeId={props.pEmployeeId}
                                onLogout={handleLogoutSuccess}/>                        
                        </Dropdown.Menu>
                    </Dropdown>
                </li>

            </ul>
            {/* End:: Right navbar links */}

        </nav>
    );
    // End:: Html

});

export default HeaderLogin;