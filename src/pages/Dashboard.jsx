import React from "react";
import { Breadcrumb, Row, Col } from "react-bootstrap";

import GuestList from "../components/dashboard/GuestRoomList"
import RoomList from "../components/dashboard/RoomStatusList"
import TableList from "../components/dashboard/TableStatusList"
import TableOrderList from "../components/dashboard/TableOrderList"

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
                                    <RoomList/>
                                </div>
                            </div>

                            {/* 2nd row */}
                            <div className="row gy-5 g-xl-8">

                                {/* Table status */}
                                <div className="col-xl-4 h-50">
                                    <TableList/>
                                </div>

                                {/* Food orders                 */}
                                <div className="col-xl-4 h-50">
                                    <TableOrderList/>
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