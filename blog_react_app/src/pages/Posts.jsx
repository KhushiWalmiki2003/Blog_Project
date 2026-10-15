import PostList from "../components/PostList";
export default function Posts(){
  return(
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">
        All Blog Posts
      </h1>
      <PostList/>

    </div>
  );
};