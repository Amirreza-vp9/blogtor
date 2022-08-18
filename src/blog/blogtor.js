import React from "react";
import { useNavigate } from "react-router-dom";

const BlogTor = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute tracking-wide cursor-default text-center top-1/2 left-1/2 translate-x-150 translate-y-150">
        <div
          onClick={() => {
            navigate("/allBlogs");
          }}
          className="bg-gray-900 text-gray-400 py-10 text-xl w-700 font-serif hover:opacity-80"
        >
          All Blogs
        </div>
        <div className="flex">
          <div
            onClick={() => {
              navigate("/topBlogs");
            }}
            className="bg-gray-900 text-gray-400 py-10 text-xl w-700 border-r border-gray-500 border-t-2 font-serif hover:opacity-80"
          >
            Top Blogs
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogTor;
