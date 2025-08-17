import { useQuery } from "@tanstack/react-query";
import { fetchRecipientsApi } from "../api/recipient-api";

export const useRecipients = () => {
  return useQuery({
    queryKey: ["recipients"],
    queryFn: fetchRecipientsApi,
    staleTime: 1000 * 60, // 1 min
    retry: 1, // retry once on failure
  });
};
