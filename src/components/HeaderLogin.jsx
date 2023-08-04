import React, {useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";
import { Nav, Navbar, Dropdown, Offcanvas } from "react-bootstrap";
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

import CardMiscellaneousOrder from "./guestMiscellaneous/GuestMiscellaneousOrderCard";
import CardServiceOrder from "./guestService/GuestServiceOrderCard";
import CardTableOrder from "./guestTable/GuestTableOrderCard";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Operation = {
    GuestAdd: "GUEST_ADD",
    GuestMod: "GUEST_MOD",
    GuestDel: "GUEST_DEL",
    Order: "ORDER",
    Despatch: "DESPATCH",
    BillGenerate: "BILL_GENERATE",
    PaymentAdd: "PAYMENT_ADD",
    Checkout: "GUEST_CHECKOUT"
};

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
    
    let miscellaneousCardRefs = useRef([]);
    let serviceCardRefs = useRef([]);
    let tableCardRefs = useRef([]);

    const [showKitchenAlert, setShowKitchenAlert] = useState([false, false, false]);

    const [selectedPage, setSelectedPage] = useState(null);
    const [menuState, setMenuState] = useState(contextValues.showMenu);
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.employeeAPI}/${hotelId}/${props.pEmployeeId}`
    });
	const {doLogout} = useFetchWithAuth({
        url: `${contextValues.logoutAPI}/${hotelId}/${props.pEmployeeId}`
    });

    useEffect(() => {
        socket.on("M_order", (guestId) => {
            try {
                miscellaneousCardRefs.current.push();
                const index = miscellaneousCardRefs.current.length;

                setMiscellaneousCardComponents([...miscellaneousCardComponents, 
                                                <CardMiscellaneousOrder 
                                                    key={`M_${guestId}`}
                                                    className="border"
                                                    ref={(el) => miscellaneousCardRefs.current[index] = el}
                                                    pIndex={guestId}
                                                    pGuestId={guestId} 
                                                    onSaved={() => {handleSuccess(Operation.GuestDespatch)}}/>]);
            } catch (err) {
                console.log(err);
            }
        });

        socket.on("S_order", (guestId) => {
            try {
                serviceCardRefs.current.push();
                const index = serviceCardRefs.current.length;

                setServiceCardComponents([...serviceCardComponents, 
                                            <CardServiceOrder 
                                                key={`S_${guestId}`}
                                                className="border"
                                                ref={(el) => serviceCardRefs.current[index] = el}
                                                pIndex={guestId}
                                                pGuestId={guestId} 
                                                onSaved={() => {handleSuccess(Operation.GuestDespatch)}}/>]);
            } catch (err) {
                console.log(err);
            }
        });

        socket.on("T_order", (guestId) => {
            try {
                tableCardRefs.current.push();
                const index = tableCardRefs.current.length;

                setTableCardComponents([...tableCardComponents, 
                                        <CardTableOrder 
                                            key={`T_${guestId}`}
                                            className="border"
                                            ref={(el) => tableCardRefs.current[index] = el}
                                            pIndex={guestId}
                                            pGuestId={guestId} 
                                            onSaved={() => {handleSuccess(Operation.GuestDespatch)}}/>]);
            } catch (err) {
                console.log(err);
            }
        });
    }, [miscellaneousCardComponents, serviceCardComponents, tableCardComponents]);

    useEffect(() => {
        contextValues.setMenuStatus(menuState);
        props.onToggleSideBar(menuState);
    }, [menuState]);    // eslint-disable-line react-hooks/exhaustive-deps

    const handleToggleKitchenAlert = (offcanvasName) => {
        const newItems = alertOptions.map((item, idx) => {
            if (item.name === offcanvasName) {
                return showKitchenAlert[idx] ? false : true;
            }

            return showKitchenAlert[idx];
        });

        setShowKitchenAlert(newItems);
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
        searchRef.current.setFocus();
    };
    // End:: on successfull operation
    // End:: handle page component search/add/edit/delete 

    // Start:: forward reff change page
    const changePage = (page) => {
        setSelectedPage(page);
    };
    
    useImperativeHandle(ref, () => {
        return {changePage, success}
    });
    // End:: forward reff change page

    // Start:: on data operation successfully
    const handleSuccess = (operation) => {
        try {
            switch (operation) {
                case "Operation.GuestDespatch":
                    toast.success("Order despatched successfully");
                    // setDataChanged(true);
                    // props.onSuccess();
                    break;
                        
                default:                
                    break;                
            }
        } catch (err) {
            console.log(err);
        }
    };
    // End:: on data operation successfully
    

    // Start:: Html
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">

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
                    <div className="d-flex align-items-center ms-1 ms-lg-3">
                        <div className="btn btn-icon" onClick={() => {handleToggleKitchenAlert(alertOptions[0].name)}}>
                            <Coffee size={20} className="d-none d-sm-inline-block"/>
                            <span className="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
                        </div>
                    </div>

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
                    <div className="d-flex align-items-center ms-1 ms-lg-3">
                        <div className="btn btn-icon" onClick={() => {handleToggleKitchenAlert(alertOptions[1].name)}}>
                            <Umbrella size={20} className="d-none d-sm-inline-block"/>
                            <span className="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
                        </div>
                    </div>

                    <Offcanvas 
                        {...alertOptions[1]}
                        show={showKitchenAlert[1]} 
                        onHide={() => {handleToggleKitchenAlert(alertOptions[1].name)}}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title><h3>Pending Service Orders</h3></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {tableCardComponents}
                        </Offcanvas.Body>
                    </Offcanvas>
                </li>

                {/* Miscellaneous orders                                 */}
                <li className="nav-item dropdown">
                    <div className="d-flex align-items-center ms-1 ms-lg-3">
                        <div className="btn btn-icon" onClick={() => {handleToggleKitchenAlert(alertOptions[2].name)}}>
                            <Wind size={20} className="d-none d-sm-inline-block"/>
                            <span className="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
                        </div>
                    </div>

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
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle}>
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