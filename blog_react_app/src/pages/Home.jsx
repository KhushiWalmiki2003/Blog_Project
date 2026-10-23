import React, { useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
export default function Home(){
  const[reload,setReload]=useState(false);
  return(
    <div className="grid grid-cols-2 gap-4 p-6">
      <UserForm onSuccess={()=>setReload(!reload)}>
        
      </UserForm>
      <UserList key={reload}>
      </UserList>
    </div>
  );
};