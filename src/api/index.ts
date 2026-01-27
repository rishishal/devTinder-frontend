import { useAuthHooks } from "./modules/auth";
import { useProfileHooks } from "./modules/profile";
import { useUserHooks } from "./modules/user";
import { useConnectionsHooks } from "./modules/connections";

export function useApi() {
  return {
    ...useAuthHooks(),
    ...useProfileHooks(),
    ...useUserHooks(),
    ...useConnectionsHooks(),
  };
}
