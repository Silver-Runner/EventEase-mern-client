import axios from "axios";
const APIBASEURL = import.meta.env.VITE_API_BASE_URL || "";

export const createEvent = async (data: any) => {
  const response: any = axios.post(
    `${APIBASEURL}/api/events/create-event`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const getEvents = async (filters: any) => {
  const response: any = await axios.get(
    `${APIBASEURL}/api/events/get-events?searchText=${filters.searchText}&date=${filters.date}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const getEventById = async (id: string) => {
  const response: any = await axios.get(
    `${APIBASEURL}/api/events/get-event/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const updateEvent = async (id: string, data: any) => {
  const response: any = await axios.put(
    `${APIBASEURL}/api/events/edit-event/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response: any = await axios.delete(
    `${APIBASEURL}/api/events/delete-event/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};