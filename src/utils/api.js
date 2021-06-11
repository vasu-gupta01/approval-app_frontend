import axios from "axios";
import config from "../config/config";

// const axiosInstance = axios.create({
//   baseURL: ":5000",
// });

export default {
  getForms: () =>
    axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      url: "/api/getforms",
    }),
  getApprovers: () =>
    axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      url: "/api/getapprovers",
    }),
};
