import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("lnq_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong";

    return Promise.reject({ ...error, message });
  },
);

export default axiosInstance;
