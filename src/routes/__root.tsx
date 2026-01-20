import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect, useState } from "react";

import { Navbar } from "@/components/navbar";
import { type AuthState, useAuthStore } from "@/stores/auth-store";
import { useApi } from "@/api";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  authGet: () => AuthState["auth"];
}>()({
  component: RootLayout,
});

function RootLayout() {
  const { auth } = useAuthStore();
  const { useFetchUser } = useApi();
  const fetchUserMutation = useFetchUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If token exists but no user, fetch user data from backend
    if (auth.accessToken && !auth.user) {
      fetchUserMutation.mutate(undefined, {
        onSettled: () => setIsLoading(false),
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {import.meta.env.MODE === "development" && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </>
  );
}
