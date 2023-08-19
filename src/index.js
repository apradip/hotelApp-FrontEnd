import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


import "bootstrap/dist/css/bootstrap.css";  
import "overlayscrollbars/overlayscrollbars.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-alpine.css"; 
import "./assets/css/adminlte.css";
import "./assets/css/classic.css";
import "./assets/css/custom.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);