import axios from 'axios'

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_BASE_URL,
});