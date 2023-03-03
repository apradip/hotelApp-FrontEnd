import {useState} from "react";
import {axiosPublic} from "./axiosPublic";

const useFetch = (params) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const doLoginPassword = async (payload) => {
        setLoading(true);
        setData(undefined);
        setError(null);

        await axiosPublic.post(`${params.url}`, payload)
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data)
                    //store login details in localstore
                    localStorage.setItem("user", payload.keyInputUser);
                    localStorage.setItem("password", payload.keyInputPassword);
                } else {
                    throw Error("Could not login");
                }
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    const doLoginOtp = async (payload) => {
        setLoading(true);
        setData(undefined);
        setError(null);

        await axiosPublic.put(`${params.url}`, payload)
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    throw Error("Could not login");
                }
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const doForgetPassword = async (payload) => {
        setLoading(true);
        setData(undefined);
        setError(null);

        await axiosPublic.put(`${params.url}`, payload)
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    throw Error("Invalid user");
                }
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return { data, loading, error, doLoginPassword, doLoginOtp, doForgetPassword };
}

export default useFetch;