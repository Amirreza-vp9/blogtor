import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./blogSlicer";
import Cookies from "universal-cookie";
import * as BiIcons from "react-icons/bi";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import * as ImIcons from "react-icons/im";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

const DashboradLayout = () => {
  const navigate = useNavigate();
  const thisUser = useSelector((state) => state.currentUser.thisUser);
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [col, setCol] = useState();

  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  const logout = () => {
    dispatch(setCurrentUser(null));
    navigate("/");
    cookies.remove("token", { path: "/" });
  };

  const close = () => {
    setCol(false);
  };

  return (
    <>
      <nav className="bg-gray-900 text-gray-200 px-2 cursor-default flex">
        <div
          onClick={() => {
            setCol(true);
          }}
          className="flex hover:text-gray-500"
        >
          <GiIcons.GiHamburgerMenu className="mt-5 mr-1" />
          <div>Dasshboard</div>
        </div>
      </nav>
      {col === true ? (
        <>
          <div
            onClick={() => {
              setCol(false);
            }}
            className="z-50 w-100vw h-100vh bg-black opacity-70 top-0 right-0 fixed"
          ></div>
          <div className="absolute cursor-default z-50 w-40  bg-gray-200 text-black font-medium p-4">
            <AiIcons.AiOutlineCloseSquare
              onClick={close}
              className="absolute top-0 right-0 text-2xl text-black hover:text-gray-500"
            />
            <div
              onClick={() => {
                navigate("/createBlog");
              }}
              className="flex ml-1 mb-2 hover:text-gray-500"
            >
              <MdIcons.MdOutlineCreate className="mt-3 text-xl mr-1" />
              <div className="cursor-default">Create BLog</div>
            </div>
            <div
              onClick={() => {
                navigate(`/updateAvatar:${thisUser._id}`);
              }}
              className="flex ml-1 mb-2 hover:text-gray-500"
            >
              <BiIcons.BiEditAlt className="mt-3 text-xl mr-1" />
              <div className="cursor-default">Edit Avatar</div>
            </div>
            <div
              onClick={() => {
                navigate("/myBLogs");
              }}
              className="flex ml-1 mb-2 hover:text-gray-500"
            >
              <FaIcons.FaBlog className="mt-3 mr-1" />
              <div className="cursor-default">MyBLogs</div>
            </div>

            <div
              onClick={() => {
                navigate("/");
              }}
              className="flex ml-1 mb-2 hover:text-gray-500"
            >
              <ImIcons.ImHome className="mt-3 mr-1" />
              <div className="cursor-default">Home</div>
            </div>
            <div onClick={logout} className="flex hover:text-gray-500">
              <BiIcons.BiLogOut className="mt-1 mr-1 text-xl" />
              <div>Log out</div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="bg-gray-400 h-700 w-100vw h-100vh">
        <div className="text-center text-2xl absolute top-1/2 left-1/2 translate-150">
          <div className="font-medium ">Hi {thisUser.username}</div>
          <h1 className="font-medium">Current date is {date}</h1>
        </div>
      </div>
    </>
  );
};

export default DashboradLayout;
