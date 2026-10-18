
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/PostApi";
import Comments from "../components/Comments";

export default function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const response = await getPostById(id);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading post...</p>;
  }

  if (!post) {
    return <p className="p-6">Post not found.</p>;
  }

  return (
    <div className="mx-auto mt-8 max-w-3xl p-6">
      <article className="rounded-lg border bg-white p-6 shadow">
        <h1 className="mb-4 text-3xl font-bold">
          {post.title}
        </h1>

        <p className="mb-5 text-sm text-gray-500">
          Category: {post.category?.categoryTitle || "N/A"}
          {" | "}
          Author: {post.user?.name || "Unknown"}
        </p>

        <p className="whitespace-pre-line leading-7 text-gray-800">
          {post.content}
        </p>
      </article>

      <section className="mt-8 rounded-lg border bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold">
          Comments
        </h2>

        <Comments postId={post.postId} />
      </section>
    </div>
  );
}
