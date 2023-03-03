import mem from "mem";

import { axiosPublic } from "./axiosPublic";

const refreshTokenFn = async () => {
    axiosPublic.defaults.headers.common = {Authorization: `Bearer ${localStorage.getItem("refreshToken")}`};
    
    await axiosPublic.get('/refreshToken')
        .then((response) => {
            if (!response.status === 200) {
                throw Error("Invalid token");
            } else {
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);

                return response.data;
            }
        })
        .catch((error) => {
            // console.log(error);

            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
        });
}

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});