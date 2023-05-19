import React, {useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";
import {Nav, Navbar, OverlayTrigger, Tooltip} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import {useNavigate, NavLink} from "react-router-dom";
import {toast} from "react-toastify";
import {Menu, Paperclip, Edit3, Scissors, AtSign, ChevronDown} from "react-feather";

import {HotelId} from "../App";
import {useStateContext} from "../contexts/ContextProvider";
import {getFirstName, getPageAttribute} from "./common/Common";
import useFetchWithAuth from "./common/useFetchWithAuth";
import Search from "./Search";
import Profile from "./auth/Profile";
import ChangePassword from "./auth/ChangePassword";
import Logout from "./auth/Logout";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <NavLink to="#" className="dropdown"
        ref={ref} 
        onClick={(e) => {e.preventDefault(); onClick(e);}} >
        {children}
    </NavLink>
));

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
    const [selectedPage, setSelectedPage] = useState(null);
    const [menuState, setMenuState] = useState(contextValues.showMenu);
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const {data, doFetch} = useFetchWithAuth({
        url: `${contextValues.employeeAPI}/${hotelId}/${props.pEmployeeId}`
    });
	const { doLogout } = useFetchWithAuth({
        url: `${contextValues.logoutAPI}/${hotelId}/${props.pEmployeeId}`
    });

    useEffect(() => {
        contextValues.setMenuStatus(menuState);
        props.onToggleSideBar(menuState);
    }, [menuState]);    // eslint-disable-line react-hooks/exhaustive-deps

    // Start:: on success of user options
    const handleToggleSideMenu = () => {
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
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">

            {/* Start:: Left navbar links */}
            <ul className="navbar-nav" style={{border: "solid 0px red"}}>
                <li className="nav-item"
                    onClick = {handleToggleSideMenu}>
                    <NavLink to="#" className="nav-link">
                        <Menu size={20} />
                    </NavLink>
                </li>
            </ul>
            {/* End:: Left navbar links */}

            {/* Start:: Middle form */}
            <div className="form-inline">
                <div className="input-group input-group-sm">
                    {selectedPage &&
                        <div className="navbar-collapse collapse">
                            {/* <Navbar.Brand className="d-none d-lg-block d-xl-block">{getPageAttribute(selectedPage).name}</Navbar.Brand> */}
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    {getPageAttribute(selectedPage).show.search &&
                                        <Search 
                                            onChange = {handleSearch}
                                            ref = {searchRef}
                                            currentPage = {selectedPage} />}

                                    {getPageAttribute(selectedPage).show.add &&
                                        <OverlayTrigger
                                            placement = "bottom"
                                            overlay = {<Tooltip>new</Tooltip>}>
                                            <button 
                                                className = "btn btn-success me-1" 
                                                size = "md" 
                                                onClick = {handleOpenAdd}>
                                                <Paperclip className="feather-16" />
                                            </button>
                                        </OverlayTrigger>}

                                    {getPageAttribute(selectedPage).show.edit &&
                                        <OverlayTrigger
                                            placement = "bottom"
                                            overlay = {<Tooltip>edit</Tooltip>}>
                                            <button 
                                                className = "btn btn-info me-1" 
                                                size = "md" 
                                                onClick = {handleOpenEdit}>
                                                <Edit3 className="feather-16" />
                                            </button>
                                        </OverlayTrigger>}

                                    {getPageAttribute(selectedPage).show.delete &&
                                        <OverlayTrigger
                                            placement = "bottom"
                                            overlay = {<Tooltip>delete</Tooltip>}>
                                            <button 
                                                className = "btn btn-danger mx-0" 
                                                size = "md" 
                                                onClick = {handleOpenDel}>
                                                <Scissors className="feather-16" />
                                            </button>
                                        </OverlayTrigger>}
                                </Nav>
                            </Navbar.Collapse>
                        </div>}
                </div>
            </div>
            {/* End:: Middle form */}

            {/* Start:: Right navbar links */}
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle}>
                            <AtSign size={20} className="d-none d-sm-inline-block"/>
                            <span className="mx-1 d-none d-sm-inline-block">                                 
                                {data && getFirstName(data.name)}
                                {!data && getFirstName(props.pEmployeeName)}
                            </span>
                            <ChevronDown size={16}/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Profile 
                                pEmployeeId = {props.pEmployeeId}
                                onEdited = {handleChangeProfileSuccess} 
                                onClosed = {handleClose} />

                            <ChangePassword 
                                pEmployeeId = {props.pEmployeeId}
                                onEdited = {handleChangePasswordSuccess}
                                onClosed = {handleClose} />

                            <Logout
                                pEmployeeId = {props.pEmployeeId}
                                onLogout = {handleLogoutSuccess} />                        
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