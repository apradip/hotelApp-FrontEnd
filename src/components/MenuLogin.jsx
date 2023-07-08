import React, {useState, useEffect, forwardRef} from "react";
import {NavLink} from "react-router-dom";
import SimpleBar from "simplebar-react";
import {Grid, Command, Feather, BookOpen, Link, ChevronLeft, ChevronDown} from "react-feather";

import "simplebar-react/dist/simplebar.min.css";

const MenuLogin = forwardRef((props, ref) => {
    const [menuIsOpen, setMenuIsOpen] = useState(null);
    const [menuParentSelected, setMenuParentSelected] = useState(null);
    const [menuSelected, setMenuSelected] = useState(null);
      
    useEffect(() => {
        props.onSelectPage(menuSelected);
    }, [menuSelected]);    // eslint-disable-line react-hooks/exhaustive-deps

    // Start:: click parent menu
    const toggleParentMenuItem = (name) => {
        let isOpen = false;

        if (menuParentSelected === name) {
            isOpen = menuIsOpen ? false : true;
        } else {
            isOpen = true;
        }

        setMenuIsOpen(isOpen);
        setMenuParentSelected(name);
    };
    // End:: click parent menu

    // Start:: click page menu
    const handelClickMenuItem = (page) => {
        setMenuSelected(page);
    };
    // End:: click page menu


    // Start:: Html
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-secondary">
                {/* Brand Logo */}
                <NavLink to="/dashboard" className="brand-link">
                    <img src="assets/img/brands/hotelapp.png" alt="Hotel App" 
                        className="brand-image"/>
                    <span className="brand-text font-weight-light">Hotel App</span>
                </NavLink>

                {/* Sidebar */}
                <div className="sidebar">

                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <SimpleBar 
                            forceVisible="y" 
                            autoHide={false}
                            style={{height: "90vh"}}>

                            <ul className="nav nav-pills nav-sidebar flex-column">

                                {/* Dashboard */}
                                <li className={`nav-item has-treeview ${menuParentSelected === 'dashboard' ? menuIsOpen ? 'menu-open' : '' : ''}`}>
                                    <NavLink to="#" className="nav-link"
                                        onClick={() => {toggleParentMenuItem('dashboard')}}>
                                        <Grid size={24}/>
                                        <p><b className="mx-2">DASHBOARD</b></p>
                                        {menuParentSelected === 'dashboard' ? menuIsOpen ? <ChevronDown size={24} className="right" /> : <ChevronLeft size={24} className="right" /> : <ChevronLeft size={24} className="right" />}
                                    </NavLink>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item"
                                            onClick={() => {handelClickMenuItem('dashboard')}}>
                                            <NavLink to="/dashboard" className={`nav-link ${menuSelected === 'dashboard' ? 'active' : ''}`}>
                                                <Link size={16}/> <p>Dashboard</p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>

                                {/* Master */}
                                <li className={`nav-item has-treeview ${menuParentSelected === 'masters' ? menuIsOpen ? 'menu-open' : '' : ''}`}>
                                    <NavLink to="#" className="nav-link"
                                        onClick={() => {toggleParentMenuItem('masters')}}>
                                        <Command size={24} />
                                        <p><b className="mx-2">MASTERS</b></p>
                                        {menuParentSelected === 'masters' ? menuIsOpen ? <ChevronDown size={24} className="right" /> : <ChevronLeft size={24} className="right" /> : <ChevronLeft size={24} className="right" />}
                                    </NavLink>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item" 
                                            onClick={() => {handelClickMenuItem('accesslevels')}}>
                                            <NavLink to="/accesslevels" className={`nav-link ${menuSelected === 'accesslevels' ? 'active' : ''}`}>
                                                <Link size={16}/> <p>Role</p>
                                            </NavLink>
                                        </li>
                                        <li className={`nav-item ${menuSelected === 'plans' ? 'active' : ''}`} 
                                            onClick={() => {handelClickMenuItem('plans')}}>
                                            <NavLink to="/plans" className="nav-link">
                                                <Link size={16}/> <p>Plan</p>
                                            </NavLink>
                                        </li>
                                        <li className={`nav-item ${menuSelected === 'roomcategories' ? 'active' : ''}`} 
                                            onClick={() => {handelClickMenuItem('roomcategories')}}>
                                            <NavLink to="/roomcategories" className="nav-link">
                                                <Link size={16}/> <p>Room category</p>
                                            </NavLink>
                                        </li>    
                                        <li className={`nav-item ${menuSelected === 'iddocuments' ? 'active' : ''}`} 
                                            onClick={() => {handelClickMenuItem('iddocuments')}}>
                                            <NavLink to="/iddocuments" className="nav-link">
                                                <Link size={16}/> <p>ID document</p>
                                            </NavLink>
                                        </li>
                                        <li className={`nav-item ${menuSelected === 'bookingagents' ? 'active' : ''}`} 
                                            onClick={() => {handelClickMenuItem('bookingagents')}}>
                                            <NavLink to="/bookingagents" className="nav-link">
                                                <Link size={16}/> <p>Booking agent</p>
                                            </NavLink>
                                        </li>
                                        <li className={`nav-item ${menuSelected === 'employees' ? 'active' : ''}`} 
                                            onClick={() => {handelClickMenuItem('employees')}}>
                                            <NavLink to="/employees" className="nav-link">
                                                <Link size={16}/> <p>Employee</p>
                                            </NavLink>
                                        </li>
                                        <li className={`nav-item ${menuSelected === 'rooms' ? 'active' : ''}`} 
                                            onClick={() => {handelClickMenuItem('rooms')}}>
                                            <NavLink to="/rooms" className="nav-link">
                                                <Link size={16}/> <p>Room</p>
                                            </NavLink>
                                        </li>
                                        <li className={`nav-item ${menuSelected === 'tables' ? 'active' : ''}`} 
                                            onClick={() => {handelClickMenuItem('tables')}}>
                                            <NavLink to="/tables" className="nav-link">
                                                <Link size={16}/> <p>Table</p>
                                            </NavLink>
                                        </li>
                                        <li className={`nav-item ${menuSelected === 'foods' ? 'active' : ''}`} 
                                            onClick={() => {handelClickMenuItem('foods')}}>
                                            <NavLink to="/foods" className="nav-link">
                                                <Link size={16}/> <p>Food</p>
                                            </NavLink>
                                        </li>
                                        <li className={`nav-item ${menuSelected === 'miscellaneouses' ? 'active' : ''}`} 
                                            onClick={() => {handelClickMenuItem('miscellaneouses')}}>
                                            <NavLink to="/miscellaneouses" className="nav-link">
                                                <Link size={16}/> <p>Miscellaneous</p>
                                            </NavLink>
                                        </li>
                                        <li className={`nav-item ${menuSelected === 'services' ? 'active' : ''}`} 
                                            onClick={() => {handelClickMenuItem('services')}}>
                                            <NavLink to="/services" className="nav-link">
                                                <Link size={16}/> <p>Service</p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>

                                {/* Transaction */}
                                <li className={`nav-item has-treeview ${menuParentSelected === 'transactions' ? menuIsOpen ? 'menu-open' : '' : ''}`}>
                                    <NavLink href="#" className="nav-link"
                                        onClick={() => {toggleParentMenuItem('transactions')}}>
                                        <Feather size={24} />
                                        <p><b className="mx-2">TRANSACTIONS</b></p>
                                        {menuParentSelected === 'transactions' ? menuIsOpen ? <ChevronDown size={24} className="right" /> : <ChevronLeft size={24} className="right" /> : <ChevronLeft size={24} className="right" />}
                                    </NavLink>
                                    <ul className="nav nav-treeview">
                                        <li className={`nav-item ${menuSelected === 'guestrooms' ? 'active' : ''}`} 
                                            onClick={() => {handelClickMenuItem('guestrooms')}}>
                                            <NavLink to="/guestrooms" className="nav-link">
                                                <Link size={16}/> <p>Room</p>
                                            </NavLink>
                                        </li>
                                        <li className={`nav-item ${menuSelected === 'guesttables' ? 'active' : ''}`}
                                            onClick={() => {handelClickMenuItem('guesttables')}}>
                                            <NavLink to="/guesttables" className="nav-link">
                                                <Link size={16}/> <p>Table</p>
                                            </NavLink>
                                        </li>
                                        <li className={`nav-item ${menuSelected === 'guestservices' ? 'active' : ''}`}
                                            onClick={() => {handelClickMenuItem('guestservices')}}>
                                            <NavLink to="/guestservices" className="nav-link">
                                                <Link size={16}/> <p>Service</p>
                                            </NavLink>
                                        </li>
                                        <li className={`nav-item ${menuSelected === 'guestmiscellaneous' ? 'active' : ''}`}
                                            onClick={() => {handelClickMenuItem('guestmiscellaneous')}}>
                                            <NavLink to="/guestmiscellaneous" className="nav-link">
                                                <Link size={16}/> <p>Miscellaneous</p>
                                            </NavLink>
                                        </li>
                                        <li className={`nav-item ${menuSelected === 'guestpayments' ? 'active' : ''}`}
                                            onClick={() => {handelClickMenuItem('guestpayments')}}>
                                            <NavLink to="/guestpayments" className="nav-link">
                                                <Link size={16}/> <p>Payment</p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>

                                {/* Report */}
                                <li className={`nav-item has-treeview ${menuParentSelected === 'reports' ? menuIsOpen ? 'menu-open' : '' : ''}`}>
                                    <NavLink href="#" className="nav-link"
                                        onClick={() => {toggleParentMenuItem('reports')}}>
                                        <BookOpen size={24} />
                                        <p><b className="mx-2">REPORTS</b></p>
                                        {menuParentSelected === 'reports' ? menuIsOpen ? <ChevronDown size={24} className="right" /> : <ChevronLeft size={24} className="right" /> : <ChevronLeft size={24} className="right" />}
                                    </NavLink>
                                    <ul className="nav nav-treeview">
                                        <li className={`nav-item ${menuSelected === 'bookings' ? 'active' : ''}`}
                                            onClick={() => {handelClickMenuItem('bookings')}}>
                                            <NavLink to="/bookings" className="nav-link">
                                                <Link size={16}/> <p>Booking</p>
                                            </NavLink>
                                        </li>                            
                                    </ul>
                                </li>

                            </ul>
                        </SimpleBar>
                    </nav>

                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}

            </aside>
        </div>
    );
    // End:: Html
});
 
export default MenuLogin;