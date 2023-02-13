import React from 'react';

const Help = () => {
    return (
        <div className="container mt-5">
            {/* <h1>Help Center</h1><br></br><br></br> */}

            <h3>Introduction:</h3>
            <p>Welcome to the Hotel Management Software, a comprehensive solution for managing your hotel operations efficiently. This software is designed to streamline the day-to-day tasks involved in running a hotel, such as room reservation, billing, front desk management, and more.</p>
        
            <h3>Getting Started:</h3>
            <ol>
            <li>Log in to the software using your username and password.</li>
            <li>Navigate through the different sections of the software using the menu bar located on the left side of the screen.</li>
            <li>To make a room reservation, go to the "Reservations" section and follow the steps.</li>
            <li>To check-in a guest, go to the "Front Desk" section and follow the steps.</li>
            <li>To generate bills for guests, go to the "Billing" section and follow the steps.</li>
            <li>For any other task, refer to the relevant section in the menu bar.</li>
            </ol>
    
            <h3>Room Management:</h3>
            <ol>
            <li>To add/edit rooms, go to the "Rooms" section and follow the steps.</li>
            <li>To view the room status (occupied/vacant), go to the "Rooms" section and check the status of each room.</li>
            <li>To assign a room to a guest, go to the "Front Desk" section and follow the steps.</li>
            </ol>
            
            <h3>Reservation Management:</h3>
            <ol>
            <li>To make a reservation, go to the "Reservations" section and follow the steps.</li>
            <li>To view the reservation details, go to the "Reservations" section and click on the reservation.</li>
            <li>To edit/cancel a reservation, go to the "Reservations" section, click on the reservation, and follow the steps.</li>
            </ol>
    
            <h3>Billing:</h3>
            <ol>
                <li>To generate a bill for a guest, go to the "Billing" section and follow the steps.</li>
                <li>To view the bill details, go to the "Billing" section and click on the bill.</li>
                <li>To edit the bill, go to the "Billing" section, click on the bill, and follow the steps.</li>
            </ol>

            <h3>Reports:</h3>
            <ol>
                <li>To generate reports, go to the "Reports" section and select the type of report you want to generate.</li>
                <li>You can generate reports on reservations, billing, room occupancy, and more.</li>
                <li>To view the generated report, click on the report in the "Reports" section.</li>
            </ol>

            <h3>Support:</h3>
            <p>If you have any questions or need help with the software, please contact our support team for assistance. We are always here to help you.</p>

            <h3>Conclusion:</h3>
            <p>We hope this help text has been helpful in getting you started with our Hotel Management Software. If you have any further questions, please do not hesitate to reach out to our support team.</p>            
        </div>    
    );
}
 
export default Help;