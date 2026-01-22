import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth-store";
import LOGO from "@/assets/logo.svg?react";
import { ProfileAvatar } from "./profile-avatar";

export const Navbar = () => {
  const { auth } = useAuthStore();

  return (
    <nav className="p-4 flex gap-4 bg-gray-100 items-center">
      <Link to="/" className="flex items-center gap-2.5">
        <LOGO className="w-10 h-10" />
        <p className="text-lg font-bold">Code & Connect</p>
      </Link>
      <div className="flex-1" />

      {auth.isAuthenticated ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Hello, </span>
          <ProfileAvatar />
        </div>
      ) : (
        <Link to="/sign-in" className="text-sm ">
          Sign In
        </Link>
      )}
    </nav>
  );
};
