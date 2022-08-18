import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import moment from "moment";

const User = () => {
  const params = useParams();
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const thisUser = useSelector((state) => state.currentUser.thisUser);

  useEffect(() => {
    fetch(`http://localhost:4000/user/singleUser/${params.id}`)
      .then((response) => response.json())
      .then((actualData) => {
        setUser(actualData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/blog/by-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        _id: params.id,
      }),
    })
      .then((response) => response.json())
      .then((actualData) => {
        setBlogs(actualData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {user && blogs && (
        <>
          <div className="absolute mt-10 cursor-default top-1/3 left-1/2 translate-y-150 translate-x-150">
            <div className="flex">
              <img
                src={"http://localhost:4000/" + user.avatar}
                onError={(e) => (e.target.src = "../profile-icon.png")}
                className="rounded-full w-48 h-48 bg-gray-300"
              />
              <div className="ml-7 mt-10">
                <div className="flex">
                  <div className="mr-4 font-bold">Username</div>
                  <div className="font-medium">{user.username}</div>
                </div>
                <br />
                <br />
                <div className="flex">
                  <div className="mr-4 font-bold">Name</div>
                  <div className="font-medium">{user.name}</div>
                </div>
              </div>
            </div>
            <div className="flex mt-4 font-bold">
              <div className="mr-4">Average Score</div>
              <div className="font-medium">{user.averageScore}</div>
            </div>
            <div>{user.bio}</div>
            <div className="mt-4">
              <div className="font-bold">CreatedAt</div>
              <div className="font-medium">
                {moment(user.createdAt).utc().format("YYYY-MM-DD")}
              </div>
            </div>
            <div className="mt-4">
              <div className="font-bold">UpdatedAt</div>
              <div className="font-medium">
                {moment(user.updatedAt).utc().format("YYYY-MM-DD")}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center mt-400 mb-550">
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
                    <div className="mr-4 font-bold">Score</div>
                    <div className="font-medium">
                      {parseFloat(item.averageScore).toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default User;
