import axiosInstance from '../api'

export const BASE_URL = "/catalog-profile";

export default {
    getAll: async function() {
        return await axiosInstance.get(`${BASE_URL}`).then(response => response.data);
    }
}