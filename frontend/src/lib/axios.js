import axios from "axios";

export const axiosInstance = axios ({
    baseURL: "http://localhost:5001/api",
    withCredentials: true,
});