import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/blog")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {blogs && (
        <div className="flex flex-wrap justify-center">
          {blogs.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  navigate(`/blog/${item._id}`);
                }}
                className="text-center cursor-default rounded-xl bg-gray-800 text-gray-300 ml-4 mr-4 mt-10 hover:bg-gray-600"
              >
                <div className="text-2xl font-bold">{item.title}</div>
                <img
                  src={item.imgurl}
                  onError={(e) => (e.target.src = "../book.jpg")}
                />
                <div className="flex justify-center">
                  <div className="mr-4 font-bold">Writer</div>
                  <div className="font-medium">{item.creator.name}</div>
                </div>
                <div className="flex justify-center">
                  <div className="mr-4 font-bold">Score</div>
                  <div className="font-medium">
                    {parseFloat(item.averageScore).toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AllBlogs;
