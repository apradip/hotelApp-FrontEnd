import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER_URI,
  headers: {"Content-Type": "application/json"}
});