import { API_ENDPOINT, apiClient } from "@/lib/api";

export const fetchSummary = async () => {
  const response = await apiClient.get(API_ENDPOINT.SUMMARY);

  return response.data;
};
