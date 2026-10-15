import { useState } from "react";

import { createUser } from "../api/UserApi";
export default function UserForm ({onSuccess}){
  const [user,setUser]=useState({
    name:"",email: "",password:"",about:""});
  const handleSubmit =async (e)=>{
    e.preventDefault();
    try{
    await createUser(user);
    alert("User Created...!")
    onSuccess();
    }catch(error){
      alert("Failed to Create User.Please Try Again.");
      console.log(error);
    }
  };
  return(
    <form onSubmit={handleSubmit} className="p-4 border  rounded">
     <h2 className="text-lg font-blod mb-3">
      Create User
     </h2>
     <input type="text" placeholder="name" className="border p-2 w-full mb-3"
     onChange={(e)=>setUser({...user,name:e.target.value})}/>

     <input type="email" placeholder="email" className="border p-2 w-full mb-3"
     onChange={(e)=>setUser({...user,email:e.target.value})}/>


   <input type="password" placeholder="password" className="border p-2 w-full mb-3"
     onChange={(e)=>setUser({...user,password:e.target.value})}/>

    <input type="text" placeholder="about" className="border p-2 w-full mb-3"
     onChange={(e)=>setUser({...user,about:e.target.value})}/>

     <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
      Submit</button>


    </form>
  )

}
