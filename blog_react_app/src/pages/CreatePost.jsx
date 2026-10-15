
import PostForm from "../components/PostForm";
import TEMP_CATEGORIES from "../data/categories";
import { useAuth } from "../context/AuthContext";
import { createPost } from "../api/PostApi";

export default function CreatePost() {
  const { currentUser } = useAuth();

  
const handleCreate = async ({ title, content, categoryId }) => {
  try {
    if (!currentUser) {
      alert("Please login first!");
      return;
    }

    const postDto = {
      title,
      content,
    };

    await createPost(
      postDto,
      currentUser.id,
      categoryId
    );

    alert("Post created successfully!");
  } catch (error) {
  console.error("Status:", error.response?.status);
  console.error(
    "Backend response:",
    JSON.stringify(error.response?.data, null, 2)
  );
  console.error("Error message:", error.message);

  alert(
    error.response?.data?.message ||
    error.response?.data?.error ||
    "Post creation failed. Check the backend console."
  );
};

};

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">
        Create Post
      </h2>

      <PostForm
        onSubmit={handleCreate}
        categories={TEMP_CATEGORIES}
      />
    </div>
  );
}
