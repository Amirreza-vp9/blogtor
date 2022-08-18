import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import Cookies from "universal-cookie";
import { Editor } from "@tinymce/tinymce-react";
import Comments from "../comments";
import moment from "moment";

const Blog = () => {
  const [blog, setBlog] = useState();
  const [rate, setRate] = useState([]);
  const [col, setCol] = useState(false);
  const [title, setTitle] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const thisUser = useSelector((state) => state.currentUser.thisUser);
  const editorRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:4000/blog/single-blog/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
        setTitle(data.title);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const ratingChanged = (newRating) => {
    setRate(newRating);
  };

  const submitRate = () => {
    fetch("http://localhost:4000/blog/submit-rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        blogId: params.id,
        score: rate,
      }),
    })
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  };

  console.log(blog);

  const submit = () => {
    let answer = window.confirm("Are you sure to submit changes?");
    if (answer) {
      if (editorRef.current) {
        setCol(false);
        fetch("http://localhost:4000/blog/edit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth: `ut ${cookies.get("token")}`,
          },
          body: JSON.stringify({
            blogId: params.id,
            data: {
              title: title,
              content: editorRef.current.getContent(),
              imgurl: "../book.jpg",
            },
          }),
        })
          .then((response) => response.json())
          .then((actualData) => {
            console.log(actualData);
          })
          .catch((error) => {
            console.log(error);
          });
        window.location.reload();
      }
    }
  };

  const cancle = () => {
    let answer = window.confirm("Are you sure to cancle changes ?");
    if (answer) {
      setCol(false);
    }
  };

  const Delete = () => {
    let answer = window.confirm("Are you sure to delete this blog?");
    if (answer) {
      fetch("http://localhost:4000/blog/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${cookies.get("token")}`,
        },
        body: JSON.stringify({
          blogId: params.id,
        }),
      })
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/myBlogs");
    }
  };

  return (
    <>
      {blog && thisUser && (
        <>
          {blog._id === params.id ? (
            <>
              <div className="mb-550 cursor-default">
                <div>
                  {thisUser._id === blog.creator._id ? (
                    <>
                      {col === true ? (
                        <>
                          <button
                            className="absolute top-24 left-28 w-24 h-24 bg-gray-800 text-gray-300 hover:bg-gray-600 cursor-default"
                            onClick={submit}
                          >
                            Submit
                          </button>
                          <button
                            className="absolute top-52 left-28 w-24 h-24 bg-gray-800 text-gray-300 hover:bg-gray-600 cursor-default"
                            onClick={cancle}
                          >
                            Cancle
                          </button>
                        </>
                      ) : (
                        <button
                          className="absolute top-24 left-28 w-24 h-24 bg-gray-800 text-gray-300 hover:bg-gray-600 cursor-default"
                          onClick={() => {
                            setCol(true);
                          }}
                        >
                          Edit
                        </button>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {thisUser._id === blog.creator._id ? (
                  <button
                    className="absolute top-80 left-28 w-24 h-24 bg-gray-800 text-gray-300 hover:bg-gray-600 cursor-default"
                    onClick={Delete}
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )}
                <div className="flex">
                  <div className="absolutes ml-64 top-32 left-1/4 translate-150 w-700 mt-10">
                    {col === true ? (
                      <input
                        className="text-center bg-gray-300 w-700"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    ) : (
                      <div className="text-center bg-gray-900 text-gray-200 text-3xl font-bold">
                        {blog.title}
                      </div>
                    )}
                    {col === true ? (
                      <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={blog.content}
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
                    ) : (
                      <div
                        className="bg-gray-700 px-4 py-2 h-400 text-gray-300 break-words"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      />
                    )}

                    <div className="flex  mt-2">
                      <div className="flex">
                        <div className="mr-4">CreatedAt</div>
                        <div>{blog.createdAt}</div>
                      </div>
                      <div className="flex">
                        <div className="mr-4 ml-36">UpdatedAt</div>
                        <div>{blog.updatedAt}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => {
                        navigate(`/user/${blog.creator._id}`);
                      }}
                      className="bg-gray-800 rounded-3xl text-gray-300 px-4 py-2 m-10 w-72 cursor-default hover:bg-gray-700"
                    >
                      <img
                        src={"http://localhost:4000/" + blog.creator.avatar}
                        onError={(e) => (e.target.src = "../profile-icon.png")}
                        className="rounded-full w-48 h-48 ml-8 bg-gray-300 my-4"
                      />
                      <div className="flex">
                        <div className="mr-4 font-bold">Username</div>
                        <div className="font-medium">
                          {blog.creator.username}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="mr-4 font-bold">Name</div>
                        <div className="font-medium">{blog.creator.name}</div>
                      </div>
                      <div>
                        <div className="mr-4 font-bold">Bio</div>
                        <div className="font-medium">{blog.creator.bio}</div>
                      </div>
                      <div>
                        <div className="mr-4 font-bold">CreatedAt</div>
                        <div className="font-medium">
                          {moment(blog.creator.createdAt)
                            .utc()
                            .format("YYYY-MM-DD")}
                        </div>
                      </div>
                      <div>
                        <div className="mr-4 font-bold">UpdatedAt</div>
                        <div className="font-medium">
                          {moment(blog.creator.updatedAt)
                            .utc()
                            .format("YYYY-MM-DD")}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="mr-4 font-bold">Average Score</div>
                        <div className="font-medium">
                          {blog.creator.averageScore}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-144 mt-10 text-center w-96">
                  <div className="text-xl">Average score</div>
                  <div className="font-bold text-3xl">
                    {parseFloat(blog.averageScore).toFixed(2)}
                  </div>
                  <button
                    onClick={submitRate}
                    className="bg-gray-900 text-gray-300 cursor-default font-medium w-32 hover:bg-gray-700"
                  >
                    Submit
                  </button>
                  <div>
                    <div>({blog.rateCount})</div>
                  </div>
                </div>
                <ReactStars
                  className="ml-600"
                  count={5}
                  onChange={ratingChanged}
                  size={50}
                  color2={"#000000"}
                />
                <Comments />
              </div>
            </>
          ) : (
            "ERROR 404"
          )}
        </>
      )}
    </>
  );
};

export default Blog;
