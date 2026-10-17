
import { useState } from "react";
import PostForm from "../components/PostForm";
import TEMP_CATEGORIES from "../data/categories";
import { useAuth } from "../context/AuthContext";
import { createPost } from "../api/PostApi";

export default function CreatePost() {
  const { user, token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCreate = async ({ title, content, categoryId }) => {
    console.log("Is authenticated:", isAuthenticated);
    console.log("User:", user);
    console.log("Token exists:", !!token);
    console.log("Category ID:", categoryId);

    if (!token) {
      alert("JWT token is missing. Please log in again.");
      return;
    }

    if (!user) {
      alert("User details are missing. Check your AuthContext login response.");
      return;
    }

    if (!user.id) {
      alert("User ID is missing. Check the login response in the console.");
      return;
    }

    if (!categoryId) {
      alert("Please select a category.");
      return;
    }

    try {
      setLoading(true);

      const postDto = { title, content };

      const response = await createPost(
        postDto,
        user.id,
        categoryId
      );

      console.log("Created post:", response.data);
      alert("Post created successfully!");
    } catch (error) {
      console.error("Status:", error.response?.status);
      console.error("Backend response:", error.response?.data);
      console.error("Error message:", error.message);

      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Post creation failed. Check the console."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Create Post</h2>

      <PostForm
        onSubmit={handleCreate}
        categories={TEMP_CATEGORIES}
        loading={loading}
      />
    </div>
  );
}
