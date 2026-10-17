
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/posts" element={<Posts />} />
  <Route path="/posts/:id" element={<PostDetails />} />
  <Route path="/create-post" element={<CreatePost />} />
  <Route path="/login" element={<Login />} />
</Routes>
    </AuthProvider>
  );
}
