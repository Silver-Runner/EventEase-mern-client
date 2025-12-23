import axios from "axios";
const APIBASEURL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (data: never) => {
  const response = await axios.post(`${APIBASEURL}/api/users/register`, data);
  return response.data;
};

export const loginUser = async (data: never) => {
  const response = await axios.post(`${APIBASEURL}/api/users/login`, data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${APIBASEURL}/api/users/current-user`)
  return response.data;
}

export const getAllUsers = async () => {
  const response = await axios.get(`${APIBASEURL}/api/users/get-all-users`);
  return response.data;
}

export const updateUserData = async (data: any) => {
  const response = await axios.put(`${APIBASEURL}/api/users/update-user`, data);
  return response.data;
}
