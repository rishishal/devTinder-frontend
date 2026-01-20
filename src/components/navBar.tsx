import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth-store";

export const Navbar = () => {
  const { auth } = useAuthStore();

  return (
    <nav className="p-4 flex gap-4 bg-gray-100 items-center">

      {/* Show profile link only if authenticated */}
      {auth.isAuthenticated && (
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Auth status indicator */}
      {auth.isAuthenticated ? (
        <span className="text-sm text-gray-600">
          Hello, {auth.user?.firstName}!
        </span>
      ) : (
        <Link
          to="/sign-in"
          className="text-sm text-blue-600 hover:underline"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};
