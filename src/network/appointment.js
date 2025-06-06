import { axiosInstance } from "./index.js";


const createAppointment = async (payload) => await axiosInstance.post('/api/appointments', payload);

const getMyAppointments = async () => await axiosInstance.get('/api/appointments/my-appointments');

export { createAppointment, getMyAppointments };