import { useAuthStore } from "@/stores/auth-store";

export const HomePage = () => {
  const { auth } = useAuthStore();

  console.log(auth.user);

  return (
    <div className="text-2xl font-bold">
      Welcome to DevTinder, {auth.user?.firstName}!
    </div>
  );
};
