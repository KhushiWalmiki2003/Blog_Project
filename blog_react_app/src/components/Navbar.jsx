import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-800 text-white">
      <Link to="/" className="text-2xl font-bold">
        My Blog
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/posts" className="hover:text-yellow-400">
          All Posts
        </Link>

        {token ? (
          <>
            <span className="opacity-80">
              Hi, {user?.name || user?.username || "User"}
            </span>

            <Link
              to="/create-post"
              className="hover:text-yellow-400"
            >
              Create Post
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-block bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 cursor-pointer"
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
