// frontend/src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-back.onrender.com", 
});

export const getEmployees = () => API.get("/employees");
export const addEmployee = (data) => API.post("/employees", data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);
export const markAttendance = (data) => API.post("/attendance", data);
export const getAttendance = (id) => API.get(`/attendance/${id}`);

export default API;