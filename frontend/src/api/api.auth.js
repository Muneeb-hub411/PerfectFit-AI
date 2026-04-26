import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const register = async ({ name, email, password }) => {
  try {
    const response = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed");
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.get("/api/auth/logout");
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/api/auth/getme");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch user data");
    throw error;
  }
};
