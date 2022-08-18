import React from "react";
import { useSelector } from "react-redux";

const WebLayoutText = () => {
  const thisUser = useSelector((state) => state.currentUser.thisUser);

  return (
    <>
      {thisUser ? (
        <div className="top-1/2 left-1/2 absolute translate-x-150 translate-y-150 text-3xl text-medium italic">
          Welcome to Blogtor !
        </div>
      ) : (
        <div className="top-1/2 left-1/2 absolute translate-x-150 translate-y-150 text-3xl text-medium italic">
          Please signIn
        </div>
      )}
    </>
  );
};

export default WebLayoutText;
