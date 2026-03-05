import axios from "axios";

export async function fetchLatestRates(base = "USD") {
  const b = String(base).trim().toUpperCase();
  const res = await axios.get(`https://open.er-api.com/v6/latest/${b}`);
  return res.data;
}