import React, { useContext, useEffect, useRef } from "react";
import { Breadcrumb, Row, Col } from "react-bootstrap";
import io from "socket.io-client";

import GuestList from "../components/dashboard/GuestRoomList"
import RoomList from "../components/dashboard/RoomStatusList"
import TableList from "../components/dashboard/TableStatusList"
import TableOrderList from "../components/dashboard/TableOrderList"
import DueList from "../components/dashboard/DueList";

import { Operation, MessageRoom } from "../components/common/Common";

const Dashboard = () => {
    const socket = io.connect(process.env.REACT_APP_API_URI + ":" + process.env.SOCKET_PORT);

    const guestListRef = useRef(null);
    const roomListRef = useRef(null);
    const tableListRef = useRef(null);
    const orderListRef = useRef(null);
    const dueListRef = useRef(null);

    // Start:: leasten and act on command on socket
    useEffect(() => {
        try {        
            socket.on(MessageRoom.Room, (payload) => {
                try {
                    const {operation, guestId} = payload;
                    
                    switch (operation) {
                        case Operation.GuestAdd:
                            guestListRef.current.handleRefresh();

                            break;                

                        case Operation.GuestMod:
                            guestListRef.current.handleRefresh();

                            break;                

                        case Operation.GuestDel:
                            guestListRef.current.handleRefresh();

                            break;                

                        case Operation.Booked:
                            guestListRef.current.handleRefresh();
                            roomListRef.current.handleRefresh();

                            break;                

                        case Operation.BillGenerate:
                            guestListRef.current.handleRefresh();
                            dueListRef.current.handleRefresh();

                            break;                

                        case Operation.Room_PaymentAdd:
                            guestListRef.current.handleRefresh();
                            dueListRef.current.handleRefresh();

                            break;                

                        case Operation.Room_Checkout:
                            guestListRef.current.handleRefresh();
                            roomListRef.current.handleRefresh();

                            break;                
                                
                        default:                
                            break;  
                    }       
                } catch (err) {
                    console.log(err);
                }
            });

            socket.on(MessageRoom.Table, (payload) => {
                try {
                    const {operation, guestId} = payload;
                    
                    switch (operation) {
                        case Operation.GuestAdd:
                            tableListRef.current.handleRefresh();

                            break;                

                        case Operation.GuestMod:
                            tableListRef.current.handleRefresh();

                            break;                

                        case Operation.GuestDel:
                            tableListRef.current.handleRefresh();
                            
                            break;                

                        case Operation.Table_Order:
                            orderListRef.current.handleRefresh();

                            break;

                        case Operation.Table_Despatch:
                            orderListRef.current.handleRefresh();
                            dueListRef.current.handleRefresh();

                            break;                

                        case Operation.Table_PaymentAdd:
                            guestListRef.current.handleRefresh();
                            dueListRef.current.handleRefresh();

                            break;                

                        case Operation.Table_Checkout:
                            tableListRef.current.handleRefresh();

                            break;                
                                
                        default:                
                            break;  
                    }              
                } catch (err) {
                    console.log(err);
                }
            });

            socket.on(MessageRoom.Service, (payload) => {
                try {
                    const {operation, guestId} = payload;

                    switch (operation) {
                        // case Operation.Service_Order:
                        //     break;

                        case Operation.Service_Despatch:
                            guestListRef.current.handleRefresh();
                            dueListRef.current.handleRefresh();

                            break;                

                        case Operation.Service_PaymentAdd:
                            guestListRef.current.handleRefresh();
                            dueListRef.current.handleRefresh();

                            break;                

                        // case Operation.Service_Checkout:
                        //     break;                
                                
                        default:                
                            break;  
                    }    
                } catch (err) {
                    console.log(err);
                }          
            });

            socket.on(MessageRoom.Miscellaneous, (payload) => {
                try {
                    const {operation, guestId} = payload;

                    switch (operation) {
                        // case Operation.Miscellaneous_Order:
                        //     break;

                        case Operation.Miscellaneous_Despatch:
                            guestListRef.current.handleRefresh();
                            dueListRef.current.handleRefresh();

                            break;                

                        case Operation.Miscellaneous_PaymentAdd:
                            guestListRef.current.handleRefresh();
                            dueListRef.current.handleRefresh();

                            break;                
                                
                        // case Operation.Miscellaneous_Checkout:
                        //     break;                
        
                        default:                
                            break;  
                    }    
                } catch (err) {
                    console.log(err);
                }          
            });

        } catch (err) {
            console.log(err);
        }
    },[]);
    // End:: leasten and act on command on socket



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
                                    <GuestList
                                        ref = {guestListRef} />
                                </div>

                                {/* Room status */}
                                <div className="col-xl-4 h-50">
                                    <RoomList
                                        ref = {roomListRef} />
                                </div>
                            </div>

                            {/* 2nd row */}
                            <div className="row gy-5 g-xl-8">

                                {/* Table status */}
                                <div className="col-xl-4 h-50">
                                    <TableList
                                        ref = {tableListRef} />
                                </div>

                                {/* Food orders                 */}
                                <div className="col-xl-4 h-50">
                                    <TableOrderList
                                        ref = {orderListRef} />
                                </div>

                                {/* Due list                     */}
                                <div className="col-xl-4 h-50">
                                    <DueList
                                        ref = {dueListRef} />
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