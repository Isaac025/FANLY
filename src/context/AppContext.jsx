import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser || savedUser === "undefined" || savedUser === "null") {
        return null;
      }

      return JSON.parse(savedUser);
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("lnq_token");
      return null;
    }
  });
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!user;

  const getMe = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/me");
      setUser(data.data);
      localStorage.setItem("user", JSON.stringify(data.data));
    } catch {
      setUser(null);
      localStorage.removeItem("lnq_token");
      localStorage.removeItem("user");
    }
  };

  const login = async (payload) => {
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/auth/login", payload);

      const accessToken = data?.data?.accessToken;
      const userData = data?.data?.user;

      if (!accessToken || !userData) {
        toast.error("Invalid login response from server");
        return false;
      }

      localStorage.setItem("lnq_token", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast.success(data.message || "Login successful");
      return userData;
    } catch (error) {
      toast.error(error.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/auth/register", payload);

      toast.success(data.message || "Registration successful");
      return true;
    } catch (error) {
      const response = error?.response?.data;

      if (response?.errors?.length) {
        response.errors.forEach((err) => {
          toast.error(err.msg);
        });
      } else {
        toast.error(
          response?.message || error.message || "Registration failed",
        );
      }

      return false;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("lnq_token");
      setUser(null);
      toast.success("Logged out successfully");
    }
  };

  const fetchCelebrities = async () => {
    try {
      const { data } = await axiosInstance.get("/celebrities");
      setCelebrities(data.data?.celebrities || data.data || []);
    } catch (error) {
      toast.error(error.message || "Could not fetch celebrities");
    }
  };

  const createBooking = async (payload) => {
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/bookings", payload);

      toast.success(data.message || "Booking created successfully");
      return data.data;
    } catch (error) {
      toast.error(error.message || "Booking failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createDonation = async (payload) => {
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/donations", payload);

      toast.success(data.message || "Donation created successfully");
      return data.data;
    } catch (error) {
      toast.error(error.message || "Donation failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createVipMembership = async (payload) => {
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/vip-memberships", payload);

      toast.success(data.message || "VIP membership created successfully");
      return data.data;
    } catch (error) {
      toast.error(error.message || "VIP membership failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
    fetchCelebrities();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        celebrities,
        loading,
        login,
        register,
        logout,
        getMe,
        fetchCelebrities,
        createBooking,
        createDonation,
        createVipMembership,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
