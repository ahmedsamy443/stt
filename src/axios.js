import axios from "axios";

export const setHeaderAuth = () => {
  let token = localStorage.getItem("token");
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
};

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
