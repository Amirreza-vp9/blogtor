import React, { useEffect, useState } from "react";
import * as BiIcons from "react-icons/bi";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";

const Comments = () => {
  const [col, setCol] = useState(false);
  const [text, setText] = useState("");
  const [comment, setComment] = useState();
  const [commentO, setCommentO] = useState();
  const cookies = new Cookies();
  const params = useParams();

  const add = () => {
    setCol(true);
  };

  useEffect(() => {
    fetch(`http://localhost:4000/comment/by-blog/${params.id}`)
      .then((response) => response.json())
      .then((actualData) => {
        setComment(actualData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [commentO]);

  const submit = () => {
    fetch("http://localhost:4000/comment/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        text: text,
        blogId: params.id,
      }),
    })
      .then((response) => response.json())
      .then((actualData) => {
        setCommentO(actualData);
      });
    setCol(false);
  };

  return (
    <>
      <div className="flex ml-400 mb-1 cursor-default">
        <div className="h-8 mr-1 rounded-md w-2 bg-gray-800"></div>
        <div className="text-xl font-bold">Comments</div>
        <BiIcons.BiMessageSquareAdd
          onClick={add}
          className="text-2xl mt-1 ml-1"
        />
      </div>
      {col === true ? (
        <>
          <div className="absolute p-2 ml-24 cursor-default bg-gray-900">
            <button
              onClick={() => {
                setCol(false);
              }}
              className="bg-gray-700 w-72 mb-1.5 text-gray-200 cursor-default hover:bg-gray-500"
            >
              Cancle
            </button>
            <br />
            <textarea
              className="resize-none px-2 w-72 overflow-hidden"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <br />
            <button
              onClick={submit}
              className="bg-gray-700 w-72 text-gray-200 cursor-default hover:bg-gray-500"
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        ""
      )}
      {comment && (
        <div className="bg-gray-800 cursor-default px-4 py-2 w-700 ml-400">
          {comment.map((item, i) => {
            return (
              <div
                key={i}
                className="bg-gray-500 py-1 px-2 my-2 text-medium break-words"
              >
                <div className="text-gray-100 font-medium">
                  {item.user.username}
                </div>
                <div className="text-gray-900 font-medium">{item.text}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Comments;
