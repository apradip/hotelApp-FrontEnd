import axios from "axios";
import { memoizedRefreshToken } from "./refreshToken";

axios.defaults.baseURL = process.env.REACT_APP_API_URI;

axios.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem("token")) {
        config.headers = {
            ...config.headers,
            authorization: `Bearer ${localStorage.getItem("token")}`,
        };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    
    if (error?.response?.status === 403 && !config?.sent) {
      config.sent = true;
      const result = await memoizedRefreshToken();
      
      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;