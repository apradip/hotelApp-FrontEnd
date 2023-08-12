import React from "react";
import { Breadcrumb, Row, Col } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import { ChevronsRight, Coffee, Umbrella, Wind, ShoppingBag, PenTool, FileText, Edit2, LogOut, Scissors, MoreVertical } from "react-feather";
// import { subStr, formatINR } from "../components/common/Common"

import GuestList from "../components/dashboard/GuestRoomList"
import GuestRoomList from "../components/dashboard/GuestRoomStatusList"
import GuestTableList from "../components/dashboard/GuestTableStatusList"

const Dashboard = () => {

    return ( 
        <div className="content-wrapper">

            {/* Seart :: Bread crumb */}
            <div className="content-header">
                <div className="container-fluid">
                    <Row>
                        <Col sm={4} className="m-0">
                            <h1 className="text-dark">Dashboard</h1>
                        </Col>

                        <Col sm={8}>
                            <Breadcrumb className="breadcrumb float-right">
                                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </div>
            </div>
            {/* End :: Bread crumb */}

            {/* Start :: display data */}
            <section className="content">
                <div className="container-fluid">
                    <div className="card mb-0">

                        {/* Start :: Display data */}
                        <div className="card-body">

                            <div className="row gy-5 g-xl-8">

                                {/* Guest list */}
                                <div className="col-xl-8">

                                    <GuestList/>

                                    {/* <div className="card card-xl-stretch mb-5 mb-xl-8 dashboard-card">
                                        <div className="dashboard-card-header">
                                            <h3 className="card-title align-items-start flex-column">
                                                <span className="text-dark fs-4 mb-1">
                                                    Room status</span>
                                                <span className="text-muted mt-1 fs-8 d-block">Total 10 guest at present</span>
                                            </h3>
                                        </div>
                                        <div className="card-body py-3 scrollable">
                                            <div className="table-responsive">
                                                <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                                    <thead>
                                                        <tr className="fw-bolder text-muted">
                                                            <th className="w-25px">Rooms</th>
                                                            <th className="min-w-150px">Guest</th>
                                                            <th className="min-w-140px">In/Out date</th>
                                                            <th className="min-w-120px text-end">Due</th>
                                                            <th className="min-w-100px text-end">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-left text-muted fs-8">
                                                                    <span className="bullet bullet-vertical h-20px bg-success me-3"></span>
                                                                    201, 202, 203
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center text-muted fs-8">
                                                                    <div className="d-flex justify-content-start flex-column">
                                                                        <span className="fw-bold d-block">Pradip Adhikari</span>
                                                                        <span className="d-block">M: 9830152752  <Badge bg="secondary">3</Badge></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="align-items-center text-muted fs-8">
                                                                <div className="d-flex justify-content-start flex-column">
                                                                    <span className="d-block">4th Jan 2023</span>
                                                                    <span className="d-block">6th Jan 2023</span>
                                                                </div>
                                                            </td>
                                                            <td className="text-end">
                                                                <div className="d-flex flex-column w-100 me-2">
                                                                    <div className="d-flex flex-stack mb-2 justify-content-end">
                                                                        <span className="badge badge-light-danger fs-8 fw-bolder"><b>{formatINR("7000")}</b></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex justify-content-end">
                                                                    
                                                      
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-left text-muted fs-8">
                                                                    <span className="bullet bullet-vertical h-20px bg-primary me-3"></span>
                                                                    201, 202, 203
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center text-muted fs-8">
                                                                    <div className="d-flex justify-content-start flex-column">
                                                                        <span className="fw-bold d-block">Pradip Adhikari</span>
                                                                        <span className="d-block">M: 9830152752  <Badge bg="secondary">3</Badge></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="align-items-center text-muted fs-8">
                                                                <div className="d-flex justify-content-start flex-column">
                                                                    <span className="d-block">4th Jan 2023</span>
                                                                    <span className="d-block">6th Jan 2023</span>
                                                                </div>
                                                            </td>
                                                            <td className="text-end">
                                                                <div className="d-flex flex-column w-100 me-2">
                                                                    <div className="d-flex flex-stack mb-2 justify-content-end">
                                                                        <span className="badge badge-light-danger fs-8 fw-bolder"><b>{formatINR("7000")}</b></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex justify-content-end">
                                                                    <Button variant="light"><MoreVertical size={16} /></Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-left text-muted fs-8">
                                                                    <span className="bullet bullet-vertical h-20px bg-warning me-3"></span>
                                                                    201, 202, 203
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center text-muted fs-8">
                                                                    <div className="d-flex justify-content-start flex-column">
                                                                        <span className="fw-bold d-block">Pradip Adhikari</span>
                                                                        <span className="d-block">M: 9830152752  <Badge bg="secondary">3</Badge></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="align-items-center text-muted fs-8">
                                                                <div className="d-flex justify-content-start flex-column">
                                                                    <span className="d-block">4th Jan 2023</span>
                                                                    <span className="d-block">6th Jan 2023</span>
                                                                </div>
                                                            </td>
                                                            <td className="text-end">
                                                                <div className="d-flex flex-column w-100 me-2">
                                                                    <div className="d-flex flex-stack mb-2 justify-content-end">
                                                                        <span className="badge badge-light-danger fs-8 fw-bolder"><b>{formatINR("7000")}</b></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex justify-content-end">
                                                                    <Button variant="light"><MoreVertical size={16} /></Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-left text-muted fs-8">
                                                                    <span className="bullet bullet-vertical h-20px bg-danger me-3"></span>
                                                                    201, 202, 203
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center text-muted fs-8">
                                                                    <div className="d-flex justify-content-start flex-column">
                                                                        <span className="fw-bold d-block">Pradip Adhikari</span>
                                                                        <span className="d-block">M: 9830152752  <Badge bg="secondary">3</Badge></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="align-items-center text-muted fs-8">
                                                                <div className="d-flex justify-content-start flex-column">
                                                                    <span className="d-block">4th Jan 2023</span>
                                                                    <span className="d-block">6th Jan 2023</span>
                                                                </div>
                                                            </td>
                                                            <td className="text-end">
                                                                <div className="d-flex flex-column w-100 me-2">
                                                                    <div className="d-flex flex-stack mb-2 justify-content-end">
                                                                        <span className="badge badge-light-danger fs-8 fw-bolder"><b>{formatINR("7000")}</b></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex justify-content-end">
                                                                    <Button variant="light"><MoreVertical size={16} /></Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-left text-muted fs-8">
                                                                    <span className="bullet bullet-vertical h-20px bg-success me-3"></span>
                                                                    201, 202, 203
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center text-muted fs-8">
                                                                    <div className="d-flex justify-content-start flex-column">
                                                                        <span className="fw-bold d-block">Pradip Adhikari</span>
                                                                        <span className="d-block">M: 9830152752  <Badge bg="secondary">3</Badge></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="align-items-center text-muted fs-8">
                                                                <div className="d-flex justify-content-start flex-column">
                                                                    <span className="d-block">4th Jan 2023</span>
                                                                    <span className="d-block">6th Jan 2023</span>
                                                                </div>
                                                            </td>
                                                            <td className="text-end">
                                                                <div className="d-flex flex-column w-100 me-2">
                                                                    <div className="d-flex flex-stack mb-2 justify-content-end">
                                                                        <span className="badge badge-light-danger fs-8 fw-bolder"><b>{formatINR("7000")}</b></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex justify-content-end">
                                                                    <Button variant="light"><MoreVertical size={16} /></Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-left text-muted fs-8">
                                                                    <span className="bullet bullet-vertical h-20px bg-primary me-3"></span>
                                                                    201, 202, 203
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center text-muted fs-8">
                                                                    <div className="d-flex justify-content-start flex-column">
                                                                        <span className="fw-bold d-block">Pradip Adhikari</span>
                                                                        <span className="d-block">M: 9830152752  <Badge bg="secondary">3</Badge></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="align-items-center text-muted fs-8">
                                                                <div className="d-flex justify-content-start flex-column">
                                                                    <span className="d-block">4th Jan 2023</span>
                                                                    <span className="d-block">6th Jan 2023</span>
                                                                </div>
                                                            </td>
                                                            <td className="text-end">
                                                                <div className="d-flex flex-column w-100 me-2">
                                                                    <div className="d-flex flex-stack mb-2 justify-content-end">
                                                                        <span className="badge badge-light-danger fs-8 fw-bolder"><b>{formatINR("7000")}</b></span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex justify-content-end">
                                                                    <Button variant="light"><MoreVertical size={16} /></Button>
                                                                </div>
                                                            </td>
                                                        </tr> 
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>

                                {/* Room status */}
                                <div className="col-xl-4 h-50">
                                    <GuestRoomList/>

                                    {/* <div className="card card-xl-stretch mb-5 mb-xl-8 dashboard-card">
                                        <div className="dashboard-card-header border-0">
                                            <h3 className="card-title align-items-start flex-column">
                                                <span className="text-dark fs-4 mb-1">Room status</span>
                                                <span className="text-muted mt-1 fs-8 d-block">25 no. of gust at room</span>
                                            </h3>
                                        </div>
                                        <div className="card-body py-1 px-4 scrollable">
                                            <div className="row mb-2">
                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-danger fs-8 fw-bold p-3">101</span></h2>
                                                </div>

                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-success fs-8 fw-bold p-3">102</span></h2>
                                                </div>

                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-danger fs-8 fw-bold p-3">103</span></h2>
                                                </div>

                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-danger fs-8 fw-bold p-3">104</span></h2>
                                                </div>    
                                            </div>

                                            <div className="row mb-2">
                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-success fs-8 fw-bold p-3">105</span></h2>
                                                </div>

                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-success fs-8 fw-bold p-3">106</span></h2>
                                                </div>

                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-danger fs-8 fw-bold p-3">107</span></h2>
                                                </div>

                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-danger fs-8 fw-bold p-3">108</span></h2>
                                                </div>    
                                            </div>

                                            <div className="row mb-2">
                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-danger fs-8 fw-bold p-3">201</span></h2>
                                                </div>

                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-danger fs-8 fw-bold p-3">202</span></h2>
                                                </div>

                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-danger fs-8 fw-bold p-3">203</span></h2>
                                                </div>

                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-danger fs-8 fw-bold p-3">204</span></h2>
                                                </div>    
                                            </div>

                                            <div className="row mb-2">
                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-danger fs-8 fw-bold p-3">205</span></h2>
                                                </div>

                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-danger fs-8 fw-bold p-3">206</span></h2>
                                                </div>

                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-danger fs-8 fw-bold p-3">207</span></h2>
                                                </div>

                                                <div className="col-xl-3 align-items-center">
                                                    <h2><span className="badge badge-light-danger fs-8 fw-bold p-3">208</span></h2>
                                                </div>    
                                            </div>


                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            {/* 2nd row */}
                            <div className="row gy-5 g-xl-8">

                                {/* Table status */}
                                <div className="col-xl-4 h-50">
                                    <GuestTableList/>
                                </div>

                                {/* Food orders                 */}
                                <div className="col-xl-4 h-50">
                                    <div className="card card-xl-stretch mb-5 mb-xl-8 dashboard-card">
                                        <div className="dashboard-card-header border-0">
                                            <h3 className="card-title align-items-start flex-column">
                                                <span className="text-dark fs-4 mb-1">Order details</span>
                                                <span className="text-muted mt-1 fs-8 d-block">Total 13 no of orders</span>
                                            </h3>
                                        </div>
                                        <div className="card-body py-1 px-4 scrollable">

                                            <div className="d-flex bg-light-warning rounded p-1 mb-3">
                                                <div className="col-xl-2 p-0 m-0">
                                                    <div className="rounded-circle-warning">
                                                        <span className="fw-bolder text-warning">
                                                            T1
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-xl-10 p-1">
                                                    <Row className="text-muted fs-8 mx-1">
                                                        <Col className="col-xl-1 p-0"><span className="bullet bullet-vertical h-6px bg-warning p-0 m-0"></span></Col>
                                                        <Col className="col-xl-8 text-start p-0">Bisleri water (1Lt)</Col>
                                                        <Col className="col-xl-3 text-end p-0">1</Col>
                                                    </Row>
                                                    <Row className="text-muted fs-8 mx-1">
                                                        <Col className="col-xl-1 p-0"><span className="bullet bullet-vertical h-6px bg-warning p-0 m-0"></span></Col>
                                                        <Col className="col-xl-8 text-start p-0">Chicken fried rice</Col>
                                                        <Col className="col-xl-3 text-end p-0">2</Col>
                                                    </Row>
                                                    <Row className="text-muted fs-8 mx-1">
                                                        <Col className="col-xl-1 p-0"><span className="bullet bullet-vertical h-6px bg-warning p-0 m-0"></span></Col>
                                                        <Col className="col-xl-8 text-start p-0">Chilli chiken</Col>
                                                        <Col className="col-xl-3 text-end p-0">1</Col>
                                                    </Row>
                                                </div>
                                            </div>

                                            <div className="d-flex bg-light-info rounded p-1 mb-3">
                                                <div className="col-xl-2 p-0 m-0">
                                                    <div className="rounded-circle-info">
                                                        <span className="fw-bolder text-info">
                                                            T2
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-xl-10 p-1">
                                                    <Row className="text-muted fs-8 mx-1">
                                                        <Col className="col-xl-1 p-0"><span className="bullet bullet-vertical h-6px bg-info p-0 m-0"></span></Col>
                                                        <Col className="col-xl-8 text-start p-0">Bisleri water (1Lt)</Col>
                                                        <Col className="col-xl-3 text-end p-0">1</Col>
                                                    </Row>
                                                    <Row className="text-muted fs-8 mx-1">
                                                        <Col className="col-xl-1 p-0"><span className="bullet bullet-vertical h-6px bg-info p-0 m-0"></span></Col>
                                                        <Col className="col-xl-8 text-start p-0">Chicken fried rice</Col>
                                                        <Col className="col-xl-3 text-end p-0">2</Col>
                                                    </Row>
                                                    <Row className="text-muted fs-8 mx-1">
                                                        <Col className="col-xl-1 p-0"><span className="bullet bullet-vertical h-6px bg-info p-0 m-0"></span></Col>
                                                        <Col className="col-xl-8 text-start p-0">Chilli chiken</Col>
                                                        <Col className="col-xl-3 text-end p-0">1</Col>
                                                    </Row>
                                                </div>
                                            </div>

                                            <div className="d-flex bg-light-warning rounded p-1 mb-3">
                                                <div className="col-xl-2 p-0 m-0">
                                                    <div className="rounded-circle-warning">
                                                        <span className="fw-bolder text-warning">
                                                            T3
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-xl-10 p-1">
                                                    <Row className="text-muted fs-8 mx-1">
                                                        <Col className="col-xl-1 p-0"><span className="bullet bullet-vertical h-6px bg-warning p-0 m-0"></span></Col>
                                                        <Col className="col-xl-8 text-start p-0">Bisleri water (1Lt)</Col>
                                                        <Col className="col-xl-3 text-end p-0">1</Col>
                                                    </Row>
                                                    <Row className="text-muted fs-8 mx-1">
                                                        <Col className="col-xl-1 p-0"><span className="bullet bullet-vertical h-6px bg-warning p-0 m-0"></span></Col>
                                                        <Col className="col-xl-8 text-start p-0">Chicken fried rice</Col>
                                                        <Col className="col-xl-3 text-end p-0">2</Col>
                                                    </Row>
                                                    <Row className="text-muted fs-8 mx-1">
                                                        <Col className="col-xl-1 p-0"><span className="bullet bullet-vertical h-6px bg-warning p-0 m-0"></span></Col>
                                                        <Col className="col-xl-8 text-start p-0">Chilli chiken</Col>
                                                        <Col className="col-xl-3 text-end p-0">1</Col>
                                                    </Row>
                                                </div>
                                            </div>

                                            <div className="d-flex bg-light-info rounded p-1 mb-3">
                                                <div className="col-xl-2 p-0 m-0">
                                                    <div className="rounded-circle-info">
                                                        <span className="fw-bolder text-info">
                                                            T2
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-xl-10 p-1">
                                                    <Row className="text-muted fs-8 mx-1">
                                                        <Col className="col-xl-1 p-0"><span className="bullet bullet-vertical h-6px bg-info p-0 m-0"></span></Col>
                                                        <Col className="col-xl-8 text-start p-0">Bisleri water (1Lt)</Col>
                                                        <Col className="col-xl-3 text-end p-0">1</Col>
                                                    </Row>
                                                    <Row className="text-muted fs-8 mx-1">
                                                        <Col className="col-xl-1 p-0"><span className="bullet bullet-vertical h-6px bg-info p-0 m-0"></span></Col>
                                                        <Col className="col-xl-8 text-start p-0">Chicken fried rice</Col>
                                                        <Col className="col-xl-3 text-end p-0">2</Col>
                                                    </Row>
                                                    <Row className="text-muted fs-8 mx-1">
                                                        <Col className="col-xl-1 p-0"><span className="bullet bullet-vertical h-6px bg-info p-0 m-0"></span></Col>
                                                        <Col className="col-xl-8 text-start p-0">Chilli chiken</Col>
                                                        <Col className="col-xl-3 text-end p-0">1</Col>
                                                    </Row>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* Payment status                             */}
                                <div className="col-xl-4 h-50">
                                    <div className="card dashboard-card mb-5 mb-xl-8">
                                        <div className="dashboard-card-header border-0">
                                            <h3 className="card-title align-items-start flex-column">
                                                <span className="text-dark fs-4 mb-1">Payment position</span>
                                                <span className="text-muted mt-1 fs-8 d-block">Total 13040.00/- payment today</span>
                                            </h3>
                                        </div>
                                        <div className="card-body py-1 px-4 scrollable">
                                            {/* <Chrono
                                                items={paymentData}
                                                mode="VERTICAL"
                                                slideShow
                                                cardHeight={90}
                                                cardWidth={240}
                                                hideControls={true}/> */}

                                            <div className="d-flex align-items-center p-1 mb-3">
                                                <span className="bullet bullet-vertical h-40px bg-success me-3"></span>
                                                <div className="flex-grow-1">
                                                    <span className="text-muted fw-bold fs-8 d-block">Pradip Adhikari</span>
                                                    <span className="text-muted d-block">Advance in cash</span>
                                                </div>
                                                <span className="badge badge-light-success fw-bolder fs-8">$ 3000.00/-</span>
                                            </div>          

                                            <div className="d-flex align-items-center p-1 mb-3">
                                                <span className="bullet bullet-vertical h-40px bg-primary me-3"></span>
                                                <div className="flex-grow-1">
                                                    <span className="text-gray-800 fw-bolder fs-6">Pradip Adhikari</span>
                                                    <span className="text-muted d-block">Advance in cash</span>
                                                </div>
                                                <span className="badge badge-light-primary fs-8 fw-bolder">$ 3000.00/-</span>
                                            </div>          

                                            <div className="d-flex align-items-center p-1 mb-3">
                                                <span className="bullet bullet-vertical h-40px bg-warning me-3"></span>
                                                <div className="flex-grow-1">
                                                    <span className="text-gray-800 fw-bolder fs-6">Pradip Adhikari</span>
                                                    <span className="text-muted d-block">Advance in cash</span>
                                                </div>
                                                <span className="badge badge-light-warning fs-8 fw-bolder">$ 3000.00/-</span>
                                            </div>          

                                            <div className="d-flex align-items-center p-1 mb-3">
                                                <span className="bullet bullet-vertical h-40px bg-danger me-3"></span>
                                                <div className="flex-grow-1">
                                                    <span className="text-gray-800 fw-bolder fs-6">Pradip Adhikari</span>
                                                    <span className="text-muted d-block">Advance in cash</span>
                                                </div>
                                                <span className="badge badge-light-danger fs-8 fw-bolder">$ 3000.00/-</span>
                                            </div>          

                                            <div className="d-flex align-items-center p-1 mb-3">
                                                <span className="bullet bullet-vertical h-40px bg-success me-3"></span>
                                                <div className="flex-grow-1">
                                                    <span className="text-gray-800 fw-bolder fs-6">Pradip Adhikari</span>
                                                    <span className="text-muted d-block">Advance in cash</span>
                                                </div>
                                                <span className="badge badge-light-success fs-8 fw-bolder">$ 3000.00/-</span>
                                            </div>          

                                            <div className="d-flex align-items-center p-1 mb-3">
                                                <span className="bullet bullet-vertical h-40px bg-primary me-3"></span>
                                                <div className="flex-grow-1">
                                                    <span className="text-gray-800 fw-bolder fs-6">Pradip Adhikari</span>
                                                    <span className="text-muted d-block">Advance in cash</span>
                                                </div>
                                                <span className="badge badge-light-primary fs-8 fw-bolder">$ 3000.00/-</span>
                                            </div>          

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>    
                        {/* End :: Display data */}

                    </div>
                </div>
            </section>
            {/* End :: display data */}

        </div> 
    );
}
 
export default Dashboard;