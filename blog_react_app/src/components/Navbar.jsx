import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  const isAuthenticated = !!currentUser;

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-800 text-white">
      <Link to="/" className="text-2xl font-bold">
        My Blog
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/posts" className="hover:text-yellow-400">
          All Posts
        </Link>

        {isAuthenticated ? (
          <>
            <span className="opacity-80">
              Hi, {currentUser?.name || `User#${currentUser?.id}`}
            </span>

            <Link to="/create-post" className="hover:text-yellow-400">
              Create Post
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-yellow-400">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
