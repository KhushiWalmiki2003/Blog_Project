import { useState } from "react";
import PostForm from "../components/PostForm";
import TEMP_CATEGORIES from "../data/categories";
import { useAuth } from "../context/AuthContext";
import { createPost } from "../api/PostApi";

export default function CreatePost() {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCreate = async ({ title, content, categoryId }) => {
    try {
      if (!token || !user) {
        alert("Please login first!");
        return;
      }

      if (!user.id) {
        console.error("Logged-in user:", user);
        alert("User ID is missing. Please check your login response.");
        return;
      }

      if (!categoryId) {
        alert("Please select a category.");
        return;
      }

      const postDto = {
        title,
        content,
      };

      setLoading(true);

      await createPost(postDto, user.id, categoryId);

      alert("Post created successfully!");
    } catch (error) {
      console.error("Status:", error.response?.status);
      console.error("Backend response:", error.response?.data);
      console.error("Error message:", error.message);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Post creation failed. Check the browser console."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">
        Create Post
      </h2>

      <PostForm
        onSubmit={handleCreate}
        categories={TEMP_CATEGORIES}
        loading={loading}
      />
    </div>
  );
}
