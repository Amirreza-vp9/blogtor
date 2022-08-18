import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./nav-foot/navBar";
import Footer from "./nav-foot/footer";

const WebLayout = () => {
  return (
    <div className="bg-gray-400">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default WebLayout;
