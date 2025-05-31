import { axiosInstance } from "./index.js";


const login = async (payload) => await axiosInstance.post('/api/auth/login',payload);


export {login};