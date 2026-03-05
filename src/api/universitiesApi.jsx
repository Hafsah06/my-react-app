import axios from "axios";

export async function fetchUniversities({ country, name }) {
  const params = new URLSearchParams();
  if (country?.trim()) params.append("country", country.trim());
  if (name?.trim()) params.append("name", name.trim());

  const query = params.toString();
  const url = `https://universities.hipolabs.com/search${query ? "?" + query : ""}`;

  const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

  try {
    const res = await axios.get(corsProxyUrl, {
      timeout: 10000,
    });
    return res.data;
  } catch (error) {
    try {
      const directRes = await axios.get(url, { timeout: 10000 });
      return directRes.data;
    } catch {
      throw error;
    }
  }
}