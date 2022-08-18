import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const editorRef = useRef(null);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const submit = () => {
    if (editorRef.current) {
      fetch("http://localhost:4000/blog/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${cookies.get("token")}`,
        },
        body: JSON.stringify({
          title: title,
          content: editorRef.current.getContent(),
          imgurl: image,
        }),
      })
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
        });
    }
    navigate("/myBlogs");
  };

  return (
    <div className="top-1/2 left-1/2 absolute translate-x-150 translate-y-150 w-700">
      <div className="text-center">
        <div className="text-3xl font-bold text-gray-900">Title</div>
        <input
          className="mb-2 px-2 font-medium text-center bg-gray-900 text-gray-300 "
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <div className="text-3xl mb-0.5 font-bold text-gray-900">
          Image link
        </div>
        <input
          className="mb-2 px-2 font-medium text-center bg-gray-900 text-gray-300 "
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
      </div>
      <div>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body {font-family:Helvetica,Arial,sans-serif; font-size:14px;}",
          }}
        />
        <button
          className="bg-gray-900 text-gray-300 py-2 w-700 mt-2 font-serif tracking-wider hover:opacity-80"
          onClick={submit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
