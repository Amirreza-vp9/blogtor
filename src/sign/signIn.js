import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../blogSlicer";

const SignIn = () => {
  const [userNameValue, setUserNameValue] = useState();
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const signIn = () => {
    fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userNameValue,
        password: passwordValue,
      }),
    })
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        cookies.set("token", actualData.token, { path: "/" });
        if (actualData && actualData.msg === "bad inputs") {
          return alert("bad inputs");
        }
        if (
          actualData &&
          actualData.msg === "bad request: no such user exists"
        ) {
          return alert("bad request: no such user exists");
        }
        if (actualData && actualData.msg === "password doesnt match") {
          return alert("password doesnt match");
        }
        if (actualData && actualData.token) {
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
    <div className="text-center border-4 border-gray-500 cursor-default font-sans text-gray-300 w-80 py-4 bg-gray-700 top-1/2 left-1/2 absolute translate-x-150 translate-y-150">
      <h2 className="text-2xl font-bold mt-2">Log in</h2>
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
        <h4 className="float-left ml-4 mb-2">Password</h4>
        <input
          type="password"
          className="bg-gray-300 border-2 border-black w-72 text-gray-800 px-1 font-medium focus:"
          onChange={(e) => setPasswordValue(e.target.value)}
        />
      </div>
      <br />
      <button
        onClick={signIn}
        className="bg-gray-900 my-12 py-1 w-72 hover:bg-gray-800 cursor-default"
      >
        Submit
      </button>
      <div className="flex mt-2">
        <p className="cursor-default text-gray-400 ml-4">
          Don't have any account ?
        </p>
        <button
          onClick={() => {
            navigate("/signUp");
          }}
          className="cursor-default text-gray-400 ml-14 hover:text-gray-200 "
        >
          Sing up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
