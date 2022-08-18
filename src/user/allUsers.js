import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const AllUsers = () => {
  const [users, setUsers] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/user/")
      .then((response) => response.json())
      .then((actualData) => {
        setUsers(actualData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {users && (
        <div className="flex flex-wrap justify-center mb-550">
          {users.map((item, i) => {
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
                  <div className="font-medium">
                    {moment(item.createdAt).utc().format("YYYY-MM-DD")}
                  </div>
                </div>
                <div>
                  <div className="mr-4 font-bold">UpdatedAt</div>
                  <div className="font-medium">
                    {moment(item.updatedAt).utc().format("YYYY-MM-DD")}
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 font-bold">Average Score</div>
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

export default AllUsers;
