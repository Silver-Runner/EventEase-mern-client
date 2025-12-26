import axios from "axios";
const APIBASEURL = import.meta.env.VITE_API_BASE_URL || "";

export const getClientSecret = async (amount: number) => {
  const response = await axios.post(
    `${APIBASEURL}/api/payments/create-payment-intent`,
    {
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};