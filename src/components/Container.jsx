import React from "react"
import { Routes, Route } from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"

import Login from "../pages/Login"
import AdvanceRoomBooking from "../pages/AdvanceRoomBooking"
import Support from "../pages/Support"
import Help from "../pages/Help"
import Privacy from "../pages/Privacy"
import Terms from "../pages/Terms"
import Error404 from "../pages/Error404"

const Container = () => {
  return ( 
    <div className="main">
      <Header/>

      <main className="content">
        <div className="container-fluid p-0">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/advanceroombooking" element={<AdvanceRoomBooking />} />
            <Route exact path="/support" element={<Support />} />
            <Route exact path="/help" element={<Help />} />
            <Route exact path="/privacy" element={<Privacy />} />
            <Route exact path="/terms" element={<Terms />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </main>

      <Footer/>
    </div>
  );
}

export default Container