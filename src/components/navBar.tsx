import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <nav className="p-4 flex gap-4 bg-gray-100">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
    </nav>
  );
};
