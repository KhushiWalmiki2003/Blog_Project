import { useState } from "react";

export default function PostForm({onSubmit,categories}){
  const[title,setTitle]= useState("");
  const[content,setContent]= useState("");
  const[categoryId,setCategoryId]=useState(categories[0]?.id||"");
  const handleSubmit=(e)=>{
    e.preventDefault();
    onSubmit({title,content,categoryId});
    setTitle("");
    setContent("");
    setCategoryId(categories[0]?.id||"");
  };
  return(
   <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
     <input type="text" placeholder="Post Title" value={title} onChange={(e)=>setTitle(e.target.value)}
     className="w-full border px-3 py-2 rounded" required/>

     <textarea placeholder="Post Content" value={content} onChange={(e)=>setContent(e.target.value)}
     className="w-full border px-3 py-3 rounded" required/>

     <select value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}
     className="w-full border px-3 py-2 rounded">
      {categories.map((c)=>(
        <option key={c.id} value={c.id} >{c.name}</option>
      ))}
     </select>
     <button type="submit" className="w-full bg-green-600 text-white py-2  rounded hover:bg-green-700">
      Publish
     </button>


   </form>
  );
};