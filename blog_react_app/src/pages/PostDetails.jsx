
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/PostApi";
import Comments from "../components/Comments"; // Adjust path if needed

export default function PostDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const res = await getPostById(id);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPost();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!post) {
    return <div className="p-4">Post not found.</div>;
  }

  return (
    <div className="p-4 border rounded bg-gray-50">
      <h1 className="text-2xl font-bold mb-2">
        {post.title}
      </h1>

      <p className="text-gray-500 text-sm mb-4">
        Created:{" "}
        {post.addedDate
          ? new Date(post.addedDate).toLocaleDateString()
          : "N/A"}
        {" | "}
        Category: {post.category?.categoryTitle || "N/A"}
        {" | "}
        Author: {post.user?.name || "Unknown"}
      </p>

      <p className="text-gray-700 whitespace-pre-line mb-8">
        {post.content}
      </p>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <Comments postId={post.postId ?? post.id} />
      </div>
    </div>
  );
}
