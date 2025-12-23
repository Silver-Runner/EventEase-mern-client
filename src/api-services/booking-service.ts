import axios from "axios";
const APIBASEURL = import.meta.env.VITE_API_BASE_URL || "";

export const createBooking = async (data: any) => {
  const response = await axios.post(`${APIBASEURL}/bookings/create-booking`, data);
  return response.data;
};

export const getUserBookings = async () => {
  const response = await axios.get(`${APIBASEURL}/bookings/get-user-bookings`);
  return response.data;
};

export const getAllBookings = async () => {
  const response = await axios.get(`${APIBASEURL}/bookings/get-all-bookings`);
  return response.data;
}

export const cancelBooking = async (data: any) => {
  const response = await axios.post(`${APIBASEURL}/bookings/cancel-booking`, data);
  return response.data;
};