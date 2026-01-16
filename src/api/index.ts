import { createAuthHooks } from "./modules/auth";

export function useApi() {
  return {
    ...createAuthHooks(),
    // Add more modules here as you build:
    // ...createProfileHooks(),
    // ...createConnectionHooks(),
  };
}
