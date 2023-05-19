import React from "react"
import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <nav className="navbar navbar-expand navbar-light fixed-top" style={{"padding":"0px", "backgroundColor": "#575989"}}>
            <div id="header-sidebar">
                <NavLink className="sidebar-brand" to="/">
                    <i className="align-middle mr-1">
                        <span className="badge badge-light">
                            <img className="icon" src='assets/img/brands/hotelapp.png' alt="hotelapp" />                  
                        </span>
                    </i>
                    <span>Hotel App</span>
                </NavLink>
            </div>
        </nav>     
    )
}

export default Header