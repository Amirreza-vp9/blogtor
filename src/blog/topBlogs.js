import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const TopBlogs = () => {
  const [topBlogs, setTopBlogs] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/blog/top-blogs")
      .then((response) => response.json())
      .then((data) => {
        setTopBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {topBlogs && (
        <div className="flex flex-wrap justify-center">
          {topBlogs.map((item, i) => {
            return (
              <>
                <div
                  key={i}
                  onClick={() => {
                    navigate(`/blog/${item._id}`);
                  }}
                  className="text-center cursor-default rounded-xl bg-gray-800 text-gray-300 ml-4 mr-4 mt-10 hover:bg-gray-600"
                >
                  <div className="text-2xl font-bold">{item.title}</div>
                  <img src={item.imgurl} />
                  <div className="flex justify-center">
                    <div className="mr-4 font-bold">Score</div>
                    <div className="font-medium">{item.averageScore}</div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default TopBlogs;
