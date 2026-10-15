import { createContext, useContext, useEffect, useState } from "react";
import { attachTokenToApi } from "../api/axiosconfig";
import { loginApi } from "../api/Auth";

const AuthContext = createContext();

export default function AuthProvider({ children }){
  const[user,setUser]=useState(()=>JSON.parse(localStorage.getItem("user")));
  const[token,setToken]=useState(()=>localStorage.getItem("token"));
  useEffect(()=>{
   attachTokenToApi(token);
  },[token]);

  const login=async(userName,password)=>{
    try{
      const res = await loginApi(userName,password);
      const{token:jwt,user:userDto}=res.data;
      setUser(userDto);
      setToken(jwt);
      localStorage.setItem("user",JSON.stringify(userDto));
      localStorage.setItem("token",jwt);
      return {success: true};
    }catch(err){
      return{success: false,message: err.res?.data||"Login Failed"};
    };
    
    const logout=()=>{
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user,token,login, logout ,isAuthenticated: !!token}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);