import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronsLeft, ChevronsRight, Paperclip, Edit3, Scissors, AtSign } from "react-feather";

import { HotelId } from "../App";
import { useStateContext } from "../contexts/ContextProvider";
import { getFirstName, getPageAttribute } from "../components/Common";
import useFetchWithAuth from "./useFetchWithAuth";
import Search from "../components/Search";
import ChangePassword from "./auth/ChangePassword";
import Profile from "./auth/Profile";
import Logout from "./auth/Logout";

// Start:: Component
// props parameters
// pEmployeeId
// pEmployeeName
// onShowHideSideBar
// onChangeSearch
// onClickAdd
// onClickEdit
// onClickDel

// useImperativeHandle
// changePage
// success
const NavbarLogin = forwardRef(( props, ref ) => {   
    const hotelId = useContext(HotelId);     
    const contextValues = useStateContext();
    const [menuState, setMenuState] = useState(contextValues.showMenu);
    const [selectedPage, setSelectedPage] = useState(null);
    const [sideBarHeaderClass, setSideBarHeaderClass] = useState("sidebar");
    const [sideBarHeaderTextClass, setSideBarHeaderTextClass] = useState("");
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.employeeAPI}/${hotelId}/${props.pEmployeeId}`
    });
	const { doLogout } = useFetchWithAuth({
        url: `${contextValues.logoutAPI}/${hotelId}/${props.pEmployeeId}`
    });

    useEffect(() => {
        menuState && setSideBarHeaderClass("sidebar");
        menuState && setSideBarHeaderTextClass("align-middle pt-4");

        !menuState && setSideBarHeaderClass("sidebar bg-white"); 
        !menuState && setSideBarHeaderTextClass("align-middle pt-4 header-text");

        contextValues.setMenuStatus(menuState);
        props.onShowHideSideBar(menuState);
    }, [menuState]);    // eslint-disable-line react-hooks/exhaustive-deps

    // Start:: on success of user options
    const handleShowHideMenu = () => {
        setMenuState(!menuState);
    };

    const handleClose = () => {
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

    // Start:: click page menu
    const handelClickMenuItem = (page) => {
        changePage(page);
    };
    // End:: click page menu

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
        return {
            changePage, success
        }
    });
    // End:: forward reff change page

    // Start:: Html
    return (
        <nav className="navbar navbar-expand navbar-light fixed-top bg-white" style={{"padding":"0px"}}>
            
            {/* Start:: app logo */}
            <div className = { sideBarHeaderClass } id="header-sidebar">
                <NavLink className="sidebar-brand" to="/dashboard"
                    onClick={() => {handelClickMenuItem("dashboard")}}>
                    <i className="align-middle mr-1">
                        <span className="badge badge-light">
                            <img className="icon" src='assets/img/brands/hotelapp.png' alt="Hotel App" />                  
                        </span>
                    </i>
                    <span className = { sideBarHeaderTextClass }>Hotel App</span>
                </NavLink>
            </div>
            {/* End:: app logo */}

            {/* Start:: open/close menu icon */}
            <Link className="sidebar-toggle d-flex mx-2" 
                data-toggle="collapse"
                data-target="#sidebar" 
                aria-expanded="true"
                href="window.location"
                onClick = { handleShowHideMenu }>

                { menuState ? <ChevronsLeft size={20} className="mx-1"/> : 
                                <ChevronsRight size={28} className="mx-1"/> }
            </Link>
            {/* End:: open/close menu icon */}

            <div className="navbar-collapse collapse">
                
                {/* {currentPageAttribute = getPageAttribute(selectedPage)} */}
                {selectedPage !== "" ?
                    <>
                        <Navbar.Brand href="#">{getPageAttribute(selectedPage).name}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto col-7">

                                {getPageAttribute(selectedPage).show.search &&
                                    <Search 
                                        onChange = { handleSearch }
                                        ref = { searchRef }
                                        currentPage = { selectedPage } />}

                                {getPageAttribute(selectedPage).show.add &&
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay = { <Tooltip>new</Tooltip> } >
                                        
                                        <button 
                                            className="btn btn-success ml-3 mr-1" 
                                            size="md" 
                                            onClick = { handleOpenAdd } >

                                            <Paperclip className="feather-16" />
                                        </button>

                                    </OverlayTrigger>}

                                {getPageAttribute(selectedPage).show.edit &&
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay = { <Tooltip>edit</Tooltip> } >
                                        
                                        <button 
                                            className="btn btn-info mx-1" 
                                            size="md" 
                                            onClick = { handleOpenEdit } >

                                            <Edit3 className="feather-16" />
                                        </button>
                                    </OverlayTrigger>}

                                {getPageAttribute(selectedPage).show.delete &&
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay = { <Tooltip>delete</Tooltip> } >
                                        <button 
                                            className="btn btn-danger mx-1" 
                                            size="md" 
                                            onClick = { handleOpenDel } >

                                            <Scissors className="feather-16"/>
                                        </button>
                                    </OverlayTrigger>}
                            </Nav>
                        </Navbar.Collapse>
                    </> : <></>}
                {/* End:: data operations menu search/add/edit/delete */}

                {/* Start:: user menu */}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        {/* Start:: user first name & menu icon */}
                        <Link className="nav-link dropdown-toggle d-none d-sm-inline-block" 
                            data-toggle="dropdown"
                            href="window.location">

                            <span className="text-dark fw-bold mx-2">
                                <AtSign size={20} className="mx-1"/>
                                { data && getFirstName(data.name) }
                                { !data && getFirstName(props.pEmployeeName) }
                            </span>
                        </Link>
                        {/* End:: user first name & menu icon */}

                        {/* Start:: dropdown menu */}
                        <div className="dropdown-menu dropdown-menu-right">
                            {/* Profile component */}
                            <Profile 
                                pEmployeeId = { props.pEmployeeId }
                                onEdited = { handleChangeProfileSuccess } 
                                onClosed = { handleClose } />

                            {/* Change password component */}
                            <ChangePassword 
                                pEmployeeId = { props.pEmployeeId }
                                onEdited = { handleChangePasswordSuccess }
                                onClosed = { handleClose } />

                            {/* Logout component */}
                            <Logout
                                pEmployeeId = { props.pEmployeeId }
                                onLogout = { handleLogoutSuccess } />
                        </div>
                        {/* End:: dropdown menu */}
                    </li>
                </ul>
                {/* End:: user menu */}

            </div>
        </nav>     
    );
    // End:: Html
});

export default NavbarLogin;