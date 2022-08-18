import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./blogSlicer";
import WebLayout from "./webLayout";
import SignUp from "./sign/signUp";
import SignIn from "./sign/signIn";
import WebLayoutText from "./webLayoutText";
import BlogTor from "./blog/blogtor";
import CreateBlog from "./blog/createBlog";
import AllUsers from "./user/allUsers";
import TopWriters from "./user/topWriters";
import UpdateAvatar from "./user/updateAvatar";
import AllBlogs from "./blog/allBlogs";
import TopBlogs from "./blog/topBlogs";
import MyBlogs from "./blog/myBlogs";
import Cookies from "universal-cookie";
import User from "./user/user";
import Blog from "./blog/blog";
import DashboradLayout from "./dashboard";
import EditBlog from "./blog/editBlog";

function App() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cookies.get("token")) return setLoading(false);
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
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) return <h1>loading...</h1>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebLayout />}>
          <Route path="/editBlog/:id" element={<EditBlog />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/" element={<WebLayoutText />} />
          <Route path="/blogtor" element={<BlogTor />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/topWriters" element={<TopWriters />} />
          <Route path="/updateAvatar:id" element={<UpdateAvatar />} />
          <Route path="/allBlogs" element={<AllBlogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/topBlogs" element={<TopBlogs />} />
          <Route path="/myBlogs" element={<MyBlogs />} />
        </Route>
        <Route path="/dashboard" element={<DashboradLayout />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <h1>404 ERROR</h1>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
