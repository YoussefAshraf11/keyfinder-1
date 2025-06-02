import { axiosInstance } from "./index.js";


const login = async (payload) => await axiosInstance.post('/api/auth/login',payload);

const signup = async (payload) => await axiosInstance.post('/api/auth/signup', payload);

export {login, signup};