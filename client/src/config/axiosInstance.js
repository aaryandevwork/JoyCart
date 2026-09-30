import axios from "axios";
import { setAccessToken } from "../store/authSlice";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5173/api",
  withCredentials: true,
});


export const setupInterceptors = (store) => {

  //Request Interceptors

  axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken;

        if(accessToken){
          config.headers.Authorization = `bearer ${accessToken}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
  )

  //Response Interceptors

  axiosInstance.interceptors.response.use(
    (response) => { return response},
    async (error) => {
      const originalRequest = error.config;

      if(error.response?.status === 401 && !originalRequest._retry){
          originalRequest._retry = true;

          try {
            const response = await axiosInstance.post("/auth/refresh");
            const newAccessToken = response?.data.data.accessToken;

            console.log(newAccessToken);

            store.dispatch(setAccessToken(newAccessToken));

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);

          } catch (refreshError) {            
            return Promise.reject(refreshError);
          }
      }

        return Promise.reject(error);
    }
  )

}