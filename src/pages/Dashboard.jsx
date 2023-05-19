import React, { useContext } from "react";
import { Breadcrumb } from "react-bootstrap";

import { HotelId } from "../App";

const Dashboard = () => {
    const hotelId = useContext(HotelId);
    
    return ( 
        <div className="content-wrapper">

            {/* Seart :: Bread crumb */}
            <div className="content-header">
                <Breadcrumb className="container-fluid">
                    <Breadcrumb.Item href = "/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {/* End :: Bread crumb */}

            {/* Start :: display data */}
            <section className="content">
                <div className="container-fluid">
                    <div className="card mb-0">

                        {/* Start :: Display data */}
                        <div className="card-body">
                            Dashboard  Hotel Id : {hotelId}
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