import axios from "axios";
const APIBASEURL = import.meta.env.VITE_API_BASE_URL || "";

export const createBooking = async (data: any) => {
  const response = await axios.post(
    `${APIBASEURL}/api/bookings/create-booking`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const getUserBookings = async () => {
  const response = await axios.get(`${APIBASEURL}/api/bookings/get-user-bookings`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getAllBookings = async () => {
  const response = await axios.get(`${APIBASEURL}/api/bookings/get-all-bookings`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

export const cancelBooking = async (data: any) => {
  const response = await axios.post(`${APIBASEURL}/api/bookings/cancel-booking`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};