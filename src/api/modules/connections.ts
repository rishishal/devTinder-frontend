import { useMutation } from "@tanstack/react-query";
import { apiClient } from "./auth";

const connectionsApi = {
  sendConnectionRequest: (userId: string) => {
    return apiClient.post(`/connections/request/${userId}`);
  },
  respondToConnectionRequest: (userId: string, accept: boolean) => {
    return apiClient.post(`/connections/respond/${userId}`, { accept });
  },
  getConnectionRequests: () => {
    return apiClient.get("/connections/requests");
  },
};

export function useConnectionsHooks() {
  return {
    useSendConnectionRequest: () => {
      return useMutation({
        mutationFn: (userId: string) =>
          connectionsApi.sendConnectionRequest(userId),
      });
    },
    useRespondToConnectionRequest: () => {
      return useMutation({
        mutationFn: ({ userId, accept }: { userId: string; accept: boolean }) =>
          connectionsApi.respondToConnectionRequest(userId, accept),
      });
    },
    useGetConnectionRequests: () => {
      return useMutation({
        mutationFn: () => connectionsApi.getConnectionRequests(),
      });
    },
  };
}
