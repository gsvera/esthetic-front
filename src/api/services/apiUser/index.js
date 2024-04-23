import axiosInstance from "../api";

export const BASE_URL = "/user";

export default {
    save: async function(data) {
        return await axiosInstance.post(`${BASE_URL}/save`, data).then(response => response);
    },
    login: async function(data) {
        return await axiosInstance.post(`${BASE_URL}/login`, data).then(response => response);
    }
}