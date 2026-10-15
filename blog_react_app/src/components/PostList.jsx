import { useEffect, useState } from "react";
import { getPosts } from "../api/PostApi";


export default function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
     loadPosts(); 
    }, []);
  const loadPosts = async () => {
    try {
      const res = await getPosts();
      console.log("API Response ===>",res.data);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">All Posts</h2>
      <div className="space-y-4">
        {posts.map((p) => (
          <div className="p-4 border rounded bg-grey-50 " key={p.id}>
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-grey-700">{p.content}</p>
            <span className="text-sm text-grey-500">Category:{p.category?.name || "N/A"}</span>
          </div>
        ))}
      </div>
    </div>
  )
}