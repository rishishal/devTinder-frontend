import { useAuthHooks } from "./modules/auth";
import { useProfileHooks } from "./modules/profile";

export function useApi() {
  return {
    ...useAuthHooks(),
    ...useProfileHooks(),
    // ...createConnectionHooks(),
  };
}
