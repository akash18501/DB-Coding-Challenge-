import axios from "axios";
const BASE_URL = "http://localhost:8081";

export const getAllSecurities = async () => {
  const response = await axios.get(`${BASE_URL}/security/all`);
  return response.data;
};

// {
//   "userId": 5,
//   "securities":[5]
// }

// http://localhost:8081/security/watchlist?user-id=2

export const getWatchList = async (user_id) => {
  const response = await axios.get(
    `${BASE_URL}/security/watchlist?user-id=${user_id}`
  );
  return response.data;
};

export const addToWatchList = async (securities_id, user_id) => {
  const body = {
    userId: user_id,
    securities: securities_id,
  };
  // const response = await axios.put(`${BASE_URL}/security/watchlist`, body);
  const res = await axios({
    method: "put",
    url: `${BASE_URL}/security/watchlist`,
    data: {
      userId: user_id,
      securities: securities_id,
    },
  });
  console.log("response inside add watchlist", res);
  return res;
};
