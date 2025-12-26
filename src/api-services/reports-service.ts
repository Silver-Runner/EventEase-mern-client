import axios from "axios";
const APIBASEURL = import.meta.env.VITE_API_BASE_URL || "";

export const getAdminReports = async (data: any) => {
  const response = await axios.post(
    `${APIBASEURL}/api/reports/get-admin-reports`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const getUserReports = async () => {
  const response = await axios.get(
    `${APIBASEURL}/api/reports/get-user-reports`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};