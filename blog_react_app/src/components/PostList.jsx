import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/PostApi";
import Pagination from "./Pagination";

const PAGE_SIZE = 5;

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await getPosts();
      console.log("API Response ===>", res.data);
      setPosts(res.data);
    } catch (err) {
      console.error("Error loading posts:", err);
    }
  };

  // Search in title, content and category
  const q = query.trim().toLowerCase();
  const filtered = q
    ? posts.filter((p) =>
        [p.title, p.content, p.categoryDto?.categoryTitle]
          .filter(Boolean)
          .some((text) => text.toLowerCase().includes(q))
      )
    : posts;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const goToPage = (n) => {
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-bold">All Posts</h2>

      <div className="relative mb-2">
        <input
          type="search"
          value={query}
          onChange={handleSearch}
          placeholder="Search by title, content or category"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {q && (
        <p className="mb-4 text-sm text-gray-500">
          {filtered.length} {filtered.length === 1 ? "result" : "results"} for “{query.trim()}”
          <button
            type="button"
            onClick={() => { setQuery(""); setPage(1); }}
            className="ml-3 text-blue-600 hover:underline"
          >
            Clear search
          </button>
        </p>
      )}

      <div className="mt-4 space-y-4">
        {visible.map((p) => (
          <div
            className="rounded border bg-gray-50 p-4"
            key={p.postId}
          >
            <Link to={`/posts/${p.postId}`}>
              <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                {p.title}
              </h3>
            </Link>

            <p className="mt-2 text-gray-700">
              {p.content?.length > 150
                ? `${p.content.substring(0, 150)}...`
                : p.content}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Category: {p.categoryDto?.categoryTitle || "N/A"}
            </p>

            <Link
              to={`/posts/${p.postId}`}
              className="mt-3 inline-block text-blue-600 hover:underline"
            >
              Read Full Post →
            </Link>
          </div>
        ))}

        {posts.length > 0 && filtered.length === 0 && (
          <p className="rounded border border-dashed p-6 text-center text-gray-500">
            No posts match your search.
          </p>
        )}
      </div>

      <Pagination
        page={current}
        totalPages={totalPages}
        onPageChange={goToPage}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
