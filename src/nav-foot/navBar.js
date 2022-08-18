import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { setCurrentUser } from "../blogSlicer";
// import Cookies from "universal-cookie";
import * as GiIcons from "react-icons/gi";
import * as ImIcons from "react-icons/im";
import * as BsIcons from "react-icons/bs";
import * as TbIcons from "react-icons/tb";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const thisUser = useSelector((state) => state.currentUser.thisUser);
  // const cookies = new Cookies();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const logout = () => {
  //   dispatch(setCurrentUser(null));
  //   navigate("/");
  //   cookies.remove("token", { path: "/" });
  // };

  return (
    <>
      <div className="flex py-4 bg-gray-800 text-gray-100 cursor-default">
        {!thisUser ? (
          ""
        ) : (
          <div
            onClick={() => setIsOpen(true)}
            className="flex ml-20 hover:text-gray-500"
          >
            <GiIcons.GiHamburgerMenu className="mt-5 mr-1" />
            <div>Menu</div>
          </div>
        )}
        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex ml-20 hover:text-gray-500"
        >
          <ImIcons.ImHome className="mt-3 mr-1" />
          <div className="cursor-default">Home</div>
        </div>
        {!thisUser ? (
          ""
        ) : (
          <div
            onClick={() => {
              navigate("/blogtor");
            }}
            className="flex ml-20 hover:text-gray-500"
          >
            <FaIcons.FaBlog className="mt-1 mr-1" />
            <div className="cursor-default">Blog</div>
          </div>
        )}
        <div
          onClick={() => {
            navigate("/signIn");
          }}
          className="flex ml-20 hover:text-gray-500"
        >
          <BsIcons.BsFillBookmarkFill className="mt-1.5 mr-1" />
          <div className="cursor-default">SignIn</div>
        </div>
      </div>
      {isOpen === true ? (
        <>
          <div
            onClick={() => {
              setIsOpen(false);
            }}
            className="z-50 w-100vw h-100vh bg-black opacity-70 top-0 right-0 fixed"
          ></div>
          <div className="absolute cursor-default z-50 w-34 bg-gray-200 text-black font-medium p-4">
            <AiIcons.AiOutlineCloseSquare
              onClick={() => {
                setIsOpen(false);
              }}
              className="absolute top-0 right-0 text-2xl text-black hover:text-gray-500"
            />
            <div
              onClick={() => {
                setIsOpen(false);
              }}
              className="flex mt-0.5 text-gray-900 hover:text-gray-500"
            >
              <MdIcons.MdDashboard className="mr-1 mt-0.5 text-xl" />
              <Link to={"/dashboard"}>Dashboard</Link>
            </div>
            <br />
            <div
              onClick={() => {
                setIsOpen(false);
              }}
              className="flex text-gray-900 hover:text-gray-500"
            >
              <ImIcons.ImUsers className="mr-1 text-xl" />
              <Link to={"/allUsers"}>All users</Link>
            </div>
            <br />
            <div
              onClick={() => {
                setIsOpen(false);
              }}
              className="flex text-gray-900 hover:text-gray-500"
            >
              <TbIcons.TbWritingSign className="mt-1 mr-1 text-xl" />
              <Link to={"/topWriters"}>Top writers</Link>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default NavBar;
