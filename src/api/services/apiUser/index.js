import axiosInstance from "../api";

export const BASE_URL = "/user";
export const BASE_URL_AUTH = "/auth-user";

export default {
    save: async function(data) {
        return await axiosInstance.post(`${BASE_URL}/save`, data).then(response => response);
    },
    updatePersonalInformation: async function(data) {
        return await axiosInstance.put(`${BASE_URL_AUTH}/update-personel-information`, data).then(response => response);
    },
    login: async function(data) {
        return await axiosInstance.post(`${BASE_URL}/login`, data).then(response => response);
    },
    logout: async function() {
        return await axiosInstance.post(`${BASE_URL_AUTH}/logout`).then(response => response);
    },
    getDataUser: async function() {
        return await axiosInstance.get(`${BASE_URL_AUTH}/get-data-user`).then(response => response);
    },
    requestResetPassword: function(data) {
        return axiosInstance.post(`${BASE_URL}/request-reset-password`, data);
    },
    saveResetPassword: function(data) {
        return axiosInstance.post(`${BASE_URL}/save-reset-password`, data);
    }
}