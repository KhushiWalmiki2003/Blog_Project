
import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { getCommentsByPostId } from "../api/CommentApi";

function CommentItem({ comment, postId, onCommentAdded }) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="my-2">
      <div className="bg-gray-100 p-3 rounded">
        <p className="font-semibold">
          {comment.user?.name || comment.user?.userName || "User"}
        </p>

        <p>{comment.content}</p>

        <button
          type="button"
          onClick={() => setShowReply(!showReply)}
          className="text-blue-600 text-sm hover:underline"
        >
          {showReply ? "Cancel reply" : "Reply"}
        </button>
      </div>

      {showReply && (
        <CommentForm
          postId={postId}
          parentCommentId={comment.id}
          onCommentAdded={onCommentAdded}
        />
      )}

      {comment.replies?.map((reply) => (
        <div key={reply.id} className="ml-5">
          <CommentItem
            comment={reply}
            postId={postId}
            onCommentAdded={onCommentAdded}
          />
        </div>
      ))}
    </div>
  );
}

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    if (!postId) return;

    try {
      setLoading(true);
      setError("");

      const res = await getCommentsByPostId(postId);

      // Adjust this if your backend wraps the list in another property.
      const data = res.data;
      setComments(Array.isArray(data) ? data : data?.content ?? []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Could not load comments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="space-y-3">
      <CommentForm
        postId={postId}
        onCommentAdded={fetchComments}
      />

      {error && <p className="text-red-600">{error}</p>}

      {!error && comments.length === 0 && (
        <p className="text-gray-500">No comments yet.</p>
      )}

      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          onCommentAdded={fetchComments}
        />
      ))}
    </div>
  );
}
