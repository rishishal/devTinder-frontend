import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./auth";
import type { User } from "@/types/user";

export interface ConnectionRequest {
  _id: string;
  sender: User;
  receiver: string;
  status: "interested" | "ignored" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface ReceivedRequestsResponse {
  connectionRequests: ConnectionRequest[];
}

const userApi = {
  getReceivedRequests: () =>
    apiClient.get<ReceivedRequestsResponse>("/user/request/received"),
};

export function useUserHooks() {
  return {
    useReceivedRequests: () => {
      return useQuery({
        queryKey: ["receivedRequests"],
        queryFn: async () => {
          const response = await userApi.getReceivedRequests();
          return response.data.connectionRequests;
        },
      });
    },
  };
}
