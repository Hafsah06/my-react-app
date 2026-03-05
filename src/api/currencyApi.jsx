import axios from "axios";

export async function fetchLatestRates(base = "USD") {
  const b = String(base).trim().toUpperCase();   
  const res = await axios.get(`/fx/v6/latest/${b}`);
  return res.data;
}