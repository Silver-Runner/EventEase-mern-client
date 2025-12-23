import axios from "axios";
const APIBASEURL = import.meta.env.VITE_API_BASE_URL || "";

export const createEvent = async (data: any) => {
  const response: any = axios.post(`${APIBASEURL}/events/create-event`, data);
  return response.data;
};

export const getEvents = async (filters: any) => {
  const response: any = await axios.get(
    `${APIBASEURL}/events/get-events?searchText=${filters.searchText}&date=${filters.date}`
  );
  return response.data;
};

export const getEventById = async (id: string) => {
  const response: any = await axios.get(`${APIBASEURL}/events/get-event/${id}`);
  return response.data;
};

export const updateEvent = async (id: string, data: any) => {
  const response: any = await axios.put(`${APIBASEURL}/events/edit-event/${id}`, data);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response: any = await axios.delete(`${APIBASEURL}/events/delete-event/${id}`);
  return response.data;
};