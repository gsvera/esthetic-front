import axiosInstance from "../api";

const BASE_URL = "/catalog-lada-phone";

export default {
    getAll: async function() {
        return await axiosInstance.get(`${BASE_URL}`).then(response => response.data);
    }
}