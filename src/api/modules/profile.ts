import { useMutation } from "@tanstack/react-query";
import { apiClient } from "./auth";

export interface UpdateProfileData {
  firstName: string;
  lastName: string;
  age: number;
  bio?: string;
  gender?: "male" | "female" | "other";
  skills?: string[];
}

// Raw API calls
const profileApi = {
  updateProfile: (data: UpdateProfileData) =>
    apiClient.put("/profile/update", data),
};

export function useProfileHooks() {
  return {
    useUpdateProfile: () => {
      return useMutation({
        mutationFn: (data: UpdateProfileData) => profileApi.updateProfile(data),
      });
    },
  };
}
