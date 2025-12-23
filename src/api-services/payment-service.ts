import axios from "axios";
const APIBASEURL = import.meta.env.VITE_API_BASE_URL || "";

export const getClientSecret = async (amount: number) => {
  const response = await axios.post(`${APIBASEURL}/payments/create-payment-intent`, {
    amount,
  });
  return response.data;
};