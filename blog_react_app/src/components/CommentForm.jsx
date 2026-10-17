
import { useState } from "react";
import { addComment } from "../api/CommentApi";

export default function CommentForm({
  postId,
  parentCommentId,
  onCommentAdded,
}) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to comment.");
      return;
    }

    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    try {
      setLoading(true);

      const commentData = {
        content: comment.trim(),
        ...(parentCommentId ? { parentCommentId } : {}),
      };

      await addComment(postId, commentData);

      setComment("");

      if (onCommentAdded) {
        await onCommentAdded();
      }
    } catch (err) {
      console.error("Comment error:", err);
      console.error("Status:", err.response?.status);
      console.error("Response:", err.response?.data);

      alert(
        err.response?.status === 401
          ? "Your session is not authenticated. Please log in again."
          : "Could not add comment. Check the browser console."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-3 flex flex-col gap-2 rounded-lg bg-gray-50 p-3"
    >
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 outline-none"
        rows={3}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Comment"}
      </button>
    </form>
  );
}
