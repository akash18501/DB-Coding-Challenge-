import axios from "axios";
const BASE_URL = "http://localhost:8081";

export const getAllSecurities = async () => {
  const response = await axios.get(`${BASE_URL}/security/all`);
  return response.data;
};
