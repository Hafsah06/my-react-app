import axios from "axios";

export function createApiClient(baseURL) {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
}