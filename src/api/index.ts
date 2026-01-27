import { useAuthHooks } from "./modules/auth";
import { useProfileHooks } from "./modules/profile";
import { useUserHooks } from "./modules/user";

export function useApi() {
  return {
    ...useAuthHooks(),
    ...useProfileHooks(),
    ...useUserHooks(),
  };
}
