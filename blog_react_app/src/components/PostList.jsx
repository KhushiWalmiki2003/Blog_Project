import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/PostApi";
import Pagination from "./Pagination";

const PAGE_SIZE = 5;

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

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

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = posts.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const goToPage = (n) => {
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-bold">All Posts</h2>

      <div className="space-y-4">
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
      </div>

      <Pagination
        page={current}
        totalPages={totalPages}
        onPageChange={goToPage}
        totalItems={posts.length}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
