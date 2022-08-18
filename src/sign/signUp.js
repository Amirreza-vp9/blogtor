import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../blogSlicer";

const SignUp = () => {
  const [userNameValue, setUserNameValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const signUp = () => {
    fetch("http://localhost:4000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userNameValue,
        name: nameValue,
      }),
    })
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        cookies.set("token", actualData.token, { path: "/" });
        if (actualData.msg === "this username already exists in the database") {
          alert("this username already exists in the database");
        } else if (actualData.msg === "bad input") {
          alert("bad input");
        } else {
          navigate("/");
        }
      })
      .then(() => {
        fetch("http://localhost:4000/user/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth: `ut ${cookies.get("token")}`,
          },
          body: JSON.stringify({}),
        })
          .then((response) => response.json())
          .then((actualData) => {
            dispatch(setCurrentUser(actualData));
            console.log(actualData);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="text-center border-4 border-gray-500 cursor-default font-sans text-gray-300 w-80 py-4 bg-gray-700 top-1/2 left-1/2 absolute translate-x-150 translate-y-150">
        <h2 className="text-2xl font-bold mt-2 ">Sign up</h2>
        <div className="mt-12">
          <h4 className="float-left ml-4 mb-2">Username</h4>
          <input
            type="text"
            className="bg-gray-300 border-2 border-black w-72 text-gray-800 px-1 font-medium"
            onChange={(e) => setUserNameValue(e.target.value)}
          />
        </div>
        <br />
        <div className="mt-10">
          <h4 className="float-left ml-4 mb-2">Name</h4>
          <input
            type="text"
            className="bg-gray-300 border-2 border-black w-72 text-gray-800 px-1 font-medium focus:"
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>
        <br />
        <button
          onClick={signUp}
          className="bg-gray-900 my-12 py-1 w-72 hover:bg-gray-800 cursor-default"
        >
          Submit
        </button>
        <div className="flex mt-2"></div>
      </div>
    </>
  );
};

export default SignUp;
