import { useEffect,useState } from "react";
import { deleteUser, getUsers } from "../api/UserApi";

export default function UserList(){
  const[userList,SetUserList]=useState([]);
  const loadUsers = async ()=>{
    const res=await getUsers();
    SetUserList(res.data);
  };
  useEffect(()=>{
   loadUsers();
  },[]);

  const handleDelete = async(id)=>{
  await deleteUser(id);
  loadUsers();
  };

  return(
    <div className="p-4 ">
     <h2 className="text-lg font-bold mb-3">
      All Users
     </h2>
     {
      userList.map((u)=>(
        <div key={u.id} className="flex justify-between border bg-zinc-200 p-2 mb-2">
          <span >
            {u.name} - {u.email}
          </span>
          <button onClick={()=>handleDelete(u.id)} className="bg-red-600 text-white px-3 py-1 rounded-md">
            Delete </button>
          </div>
      ))
     }
    </div>
  );
};