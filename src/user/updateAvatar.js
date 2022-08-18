import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { setCurrentUser } from "../blogSlicer";

const UpdateAvatar = () => {
  const thisUser = useSelector((state) => state.currentUser.thisUser);
  const [bioValue, setBioValue] = useState(thisUser.bio);
  const [file, setfile] = useState();
  const [col, setCol] = useState(false);
  const [name, setName] = useState(thisUser.name);
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const edit = () => {
    setCol(true);
  };

  const submit = () => {
    let answer = window.confirm("Are you sure ?");
    if (answer) {
      fetch("http://localhost:4000/user/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${cookies.get("token")}`,
        },
        body: JSON.stringify({
          name: name,
          bio: bioValue,
        }),
      })
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
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
      setCol(false);
    }
  };

  const cancle = () => {
    let answer = window.confirm("Are you sure ?");
    if (answer) {
      setCol(false);
    }
  };

  const submitAvatar = async () => {
    try {
      if (!file) return;

      console.log(file);

      const formData = new FormData();
      formData.append("avatar", file);

      fetch("http://localhost:4000/user/update-avatar", {
        method: "POST",
        headers: {
          auth: `ut ${cookies.get("token")}`,
        },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log("lol");
    }
    window.location.reload();
  };

  return (
    <div className="absolute mt-10 cursor-default top-1/3 left-1/2 translate-y-150 translate-x-150">
      <div className="flex bg-red">
        <img
          src={"http://localhost:4000/" + thisUser.avatar}
          className="rounded-full w-48 h-48 bg-gray-300"
        />
        <div className="ml-4">
          <div className="flex mt-6 ml-10">
            <div className="mr-4 font-bold">Username</div>
            <div className="font-medium">{thisUser.username}</div>
          </div>
          <div className="flex">
            {col === true ? (
              <input
                className="h-6 mt-6 px-2"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            ) : (
              <div className="flex mt-6 ml-10">
                <div className="mr-4 font-bold">Name</div>
                <div className="font-medium">{thisUser.name}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <input
        type="file"
        className="mt-2 bg-gray-800 text-gray-200 cursor-pointer"
        onChange={(e) => {
          setfile(e.target.files[0]);
        }}
      />
      <br />
      <button
        onClick={submitAvatar}
        className="bg-gray-800 text-gray-200 mt-2 px-4 cursor-default hover:bg-gray-600"
      >
        set Image
      </button>
      {col === false ? (
        <button
          onClick={edit}
          className="bg-gray-800 float-right mt-2.5 cursor-default text-gray-200 px-5 hover:bg-gray-600"
        >
          Edit
        </button>
      ) : (
        <div className="flex mt-10">
          <div
            onClick={submit}
            className="bg-gray-800 px-32 cursor-default text-gray-200 px-5 hover:bg-gray-600"
          >
            Submit
          </div>
          <div
            onClick={cancle}
            className="bg-gray-800 px-32 cursor-default text-gray-200 px-5 hover:bg-gray-600"
          >
            Cancle
          </div>
        </div>
      )}
      <div className="flex mt-10 ml-5">
        {col === true ? (
          <textarea
            value={bioValue}
            onChange={(e) => {
              setBioValue(e.target.value);
            }}
            className="textarea resize-none truncate w-144 px-5"
          ></textarea>
        ) : (
          <div>{thisUser.bio}</div>
        )}
      </div>
    </div>
  );
};

export default UpdateAvatar;
