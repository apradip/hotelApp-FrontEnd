import {useState} from "react";
import {axiosPrivate} from "./axiosPrivate";

const useFetchWithAuth = (params) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(null);


    const doFetch = async () => {        
        setLoading(true);
        setData(undefined);
        setError(null);

        try {
            const response = await axiosPrivate.request(params);
            setData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };     // eslint-disable-line react-hooks/exhaustive-deps


    const doLogout = async (payload) => {
        setLoading(true);
        setData(undefined);
        setError(null);

        await axiosPrivate.delete(`${params.url}`, payload)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error("Could not logout");
                } else {
                    setData(response.data);
                }
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const doChangePassword = async (payload) => {
        setLoading(true);
        setData(undefined);
        setError(null);

        await axiosPrivate.put(`${params.url}`, payload)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error("Could not change password");
                } else {
                    setData(response.data);
                }
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const doInsert = async (payload) => {
        setLoading(true);
        setData(undefined);
        setError(null);

        await axiosPrivate.post(`${params.url}`, payload)
            .then((response) => {
                if (!response.ok) {
                    throw Error("Could not add data");
                } else {
                    setData(response.data);
                }
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const doUpdate = async (payload) => {
        setLoading(true);
        setData(undefined);
        setError(null);
        
        if (payload) {
            await axiosPrivate.put(`${params.url}`, payload)
                .then(response => {
                    if (response.status !== 200) {
                        console.log("Could not update data");
                        throw Error("Could not update data");
                    } else {
                        setData(response.data);
                    }
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            await axiosPrivate.put(`${params.url}`)
            .then(response => {
                if (response.status !== 200) {
                    throw Error("Could not update data");
                } else {
                    setData(response.data);
                }
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
        }
    };

    const doDelete = async () => {
        setLoading(true);
        setData(undefined);
        setError(null);

        await axiosPrivate.delete(`${params.url}`)
            .then((response) => {
                if (!response.ok) {
                    throw Error("Could not delete");
                } else {
                    setData(response.data);
                }
            })
            .catch((error) => {
                setError(error.message);
            })            
            .finally(() => {
                setLoading(false);
            });
    };

    return {data, loading, error, doLogout, doChangePassword, doFetch, doInsert, doUpdate, doDelete};
}

export default useFetchWithAuth;