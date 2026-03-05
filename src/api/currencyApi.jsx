import axios from "axios";

export async function fetchLatestRates(base = "USD") {
  const b = String(base).trim().toUpperCase();   
  const res = await axios.get(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${base}`);
  return res.data;
}