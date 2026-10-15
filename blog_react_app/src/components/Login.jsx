
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/UserApi";

export default function Login(){
  const {login,isAuthenticated}=useAuth();
   const navigate = useNavigate();
   const {userName,setUsername}= useState("");
   const{password,setPassword}=useState("");
   const {error,setError}=useState("");
   const {loading,setLoading} =useState(false);
   useEffect(()=>{
    if(isAuthenticated){
      navigate("/posts");
    }
   },[isAuthenticated,navigate]);

   const handleSubmit=async(e)=>{
    e.preventDefault();
    setError("");
    setLoading(true);
    const result=await login(userName,password);
    setLoading(false);
    if(result.success){
      navigate("posts");
    }else{
      setError(result.message);
    }
   };

   const handleUserNameChange=(e)=>{
    setUsername(e.target.value);
    if(error) setError("");
   };

   const handlePasswordChange= (e)=>{
    setPassword(e.target.value);
    if(error) setError("");
   }
   return(
    <div className="max-w-md mx-auto mt-20 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Login
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
     <form onSubmit={handleSubmit} className="space-y-4">
      
      <input type="text" placeholder="userName"
      className="w-full border border-grey-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 "
      value={userName} onChange={handleUserNameChange} required/>

      <input type="password" placeholder="password"
      className="w-full border border-grey-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 "
      value={password} onChange={handlePasswordChange} required
      />

      <button type="submit" 
      className={`w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors 
      duration-200 flex justify-center items-center ${loading?"opacity-70 cursor-not-allowed:":""}`}
      disabled ={loading}>

       {loading?(
        <svg className="animate-spin h-5 w-5 mr-2 text-white"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">

          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
          strokeWidth="4"></circle>

          <path className="opacity-75 " fill="currentColor" d="M4 12a8 0 018-8v8h4z"></path>
        </svg>
       ):null}
       {  loading? "Logging in...":"Login"}
      </button>
     </form>
    </div>
   )

}
