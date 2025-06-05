import { axiosInstance } from "./index.js";


const login = async (payload) => await axiosInstance.post('/api/auth/login',payload);

const signup = async (payload) => await axiosInstance.post('/api/auth/signup', payload);

const validateUserAndSendOtp = async (payload) => await axiosInstance.post('/api/auth/validateUserAndSendOtp', payload);

const validateOtp = async (payload) => await axiosInstance.post('/api/auth/validate-otp', payload);

const resetPasswordOtp = async (payload) => await axiosInstance.post('/api/auth/reset-password-otp', payload);

const getLoggedInUser = async () => await axiosInstance.get('/api/auth/get-logged-in-user');

export {login, signup, validateUserAndSendOtp, validateOtp, resetPasswordOtp, getLoggedInUser  };