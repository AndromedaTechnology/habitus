import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL + process.env.VUE_APP_API_PREFIX,
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
