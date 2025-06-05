import { axiosInstance } from "./index.js";

const addToFavorites = async (payload) => await axiosInstance.post(`/api/users/${payload.propertyId}/add-to-favorites`, payload);

const removeFromFavorites = async (payload) => await axiosInstance.delete(`/api/users/${payload.propertyId}/remove-from-favorites`, payload);


export {
    addToFavorites,
    removeFromFavorites
};


