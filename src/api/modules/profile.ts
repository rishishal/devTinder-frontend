import { useMutation } from "@tanstack/react-query";
import { apiClient } from "./auth";

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  age?: number;
  bio?: string;
  gender?: "male" | "female" | "other";
  skills?: string[];
}

// Raw API calls
const profileApi = {
  updateProfile: (data: UpdateProfileData) => {
    return apiClient.patch("/profile/update", data);
  },

  // Upload new avatar (POST)
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return apiClient.post("/profile/avatar", formData);
  },

  // Update/replace avatar (PUT)
  updateAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return apiClient.put("/profile/avatar", formData);
  },

  // Delete avatar
  deleteAvatar: () => {
    return apiClient.delete("/profile/avatar");
  },
};

export function useProfileHooks() {
  return {
    useUpdateProfile: () => {
      return useMutation({
        mutationFn: (data: UpdateProfileData) => profileApi.updateProfile(data),
      });
    },
    useUploadAvatar: () => {
      return useMutation({
        mutationFn: (file: File) => profileApi.uploadAvatar(file),
      });
    },
    useUpdateAvatar: () => {
      return useMutation({
        mutationFn: (file: File) => profileApi.updateAvatar(file),
      });
    },
    useDeleteAvatar: () => {
      return useMutation({
        mutationFn: () => profileApi.deleteAvatar(),
      });
    },
  };
}
