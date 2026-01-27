import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./auth";

const connectionsApi = {
  sendConnectionRequest: (status: string, userId: string) => {
    return apiClient.post(`/connection/send/${status}/${userId}`);
  },
  respondToConnectionRequest: (requestId: string, action: string) => {
    return apiClient.post(`/connection/respond/${requestId}/${action}`);
  },
};

export function useConnectionsHooks() {
  const queryClient = useQueryClient();

  return {
    useSendConnectionRequest: () => {
      return useMutation({
        mutationFn: ({ status, userId }: { status: string; userId: string }) =>
          connectionsApi.sendConnectionRequest(status, userId),
      });
    },
    useRespondToConnectionRequest: () => {
      return useMutation({
        mutationFn: ({
          requestId,
          action,
        }: {
          requestId: string;
          action: string;
        }) => connectionsApi.respondToConnectionRequest(requestId, action),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["receivedRequests"] });
        },
      });
    },
  };
}
