import { createApiClient } from "./axiosInstance";

export const universitiesApi = createApiClient("http://universities.hipolabs.com");

export async function fetchUniversities({ country, name }) {
  const res = await universitiesApi.get("/search", {
    params: {
      country: country?.trim() || undefined,
      name: name?.trim() || undefined,
    },
  });

  return res.data;
}