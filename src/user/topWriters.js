import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopWriters = () => {
  const [topWriters, setTopWriters] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/user/top-users")
      .then((response) => response.json())
      .then((actualData) => {
        setTopWriters(actualData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {topWriters && (
        <div className="flex flex-wrap mb-500">
          {topWriters.map((item, i) => {
            return (
              <div
                onClick={() => {
                  navigate(`/user/${item._id}`);
                }}
                key={i}
                className="bg-gray-800 rounded-3xl text-gray-300 px-4 py-2 m-10 w-72 cursor-default hover:bg-gray-700"
              >
                <img
                  src={"http://localhost:4000/" + item.avatar}
                  onError={(e) => (e.target.src = "../profile-icon.png")}
                  className="rounded-full w-48 h-48 ml-8 bg-gray-300 my-4"
                />
                <div className="flex">
                  <div className="mr-4 font-bold">Username</div>
                  <div className="font-medium">{item.username}</div>
                </div>
                <div className="flex">
                  <div className="mr-4 font-bold">Name</div>
                  <div className="font-medium">{item.name}</div>
                </div>
                <div>
                  <div className="mr-4 font-bold">Bio</div>
                  <div className="font-medium">{item.bio}</div>
                </div>
                <div>
                  <div className="mr-4 font-bold">CreatedAt</div>
                  <div className="font-medium">{item.createdAt}</div>
                </div>
                <div>
                  <div className="mr-4 font-bold">UpdatedAt</div>
                  <div className="font-medium">{item.updatedAt}</div>
                </div>
                <div className="flex">
                  <div className="mr-4 font-bold">Average Score</div>
                  <div className="font-medium">{item.averageScore}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default TopWriters;
