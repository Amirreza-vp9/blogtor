import React from "react";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

const Footer = () => {
  return (
    <div className="flex justify-center py-4 mt-100 bg-gray-800 text-gray-100">
      <BsIcons.BsFacebook className="mx-7 text-3xl" />
      <AiIcons.AiFillInstagram className="mx-7 text-3xl" />
      <IoIcons.IoLogoTwitch className="mx-7 text-3xl" />
      <AiIcons.AiOutlineTwitter className="mx-7 text-3xl" />
      <AiIcons.AiFillYoutube className="mx-7 text-3xl" />
    </div>
  );
};

export default Footer;
