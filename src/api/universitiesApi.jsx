import axios from "axios";

export async function fetchUniversities({ country, name }) {
  const params = new URLSearchParams();
  if (country?.trim()) params.append("country", country.trim());
  if (name?.trim()) params.append("name", name.trim());

  const query = params.toString();
  const url = `https://universities.hipolabs.com/search${query ? "?" + query : ""}`;

  const corsProxyUrl = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`;

  try {
    const res = await axios.get(corsProxyUrl, {
      timeout: 15000,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch universities:", error.message);
    throw new Error(`Failed to fetch universities: ${error.message}`);
  }
}