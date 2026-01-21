import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth-store";
import LOGO from "@/assets/logo.svg?react";

export const Navbar = () => {
  const { auth } = useAuthStore();

  return (
    <nav className="p-4 flex gap-4 bg-gray-100 items-center">
      <div className="flex items-center gap-2.5">
        <LOGO className="w-10 h-10" />
        <p className="text-lg font-bold">Code & Connect</p>
      </div>
      <div className="flex-1" />

      {auth.isAuthenticated ? (
        <span className="text-sm text-gray-600">
          Hello, {auth.user?.firstName}!
        </span>
      ) : (
        <Link to="/sign-in" className="text-sm ">
          Sign In
        </Link>
      )}
    </nav>
  );
};
