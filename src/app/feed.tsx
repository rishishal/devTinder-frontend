import SwipeCards from "@/components/swip-card";
import { useAuthStore } from "@/stores/auth-store";

export const FeedPage = () => {
  const { auth } = useAuthStore();

  console.log(auth.user);

  return (
    <div className="text-2xl font-bold">
      Welcome to DevTinder, {auth.user?.firstName}!
      <SwipeCards />
    </div>
  );
};
