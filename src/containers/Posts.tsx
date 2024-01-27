import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Navbar,
  Feed,
  PostDetail,
  CreatePost,
  Search,
  EditPost,
} from "../components";
import PrivateRoutes from "../utils/PrivateRoutes";
import { User } from "../types";

interface PostsProps {
  user: User | null;
}

const Posts = ({ user }: PostsProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="px-2">
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category" element={<Feed />} />
          <Route
            path="/post-detail/:postId"
            element={<PostDetail user={user && user} />}
          />
          <Route path="/search" element={<Search searchTerm={searchTerm} />} />
        </Routes>

        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/create-post"
              element={<CreatePost user={user && user} />}
            />
            <Route path="/post/edit/:postId" element={<EditPost />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Posts;
