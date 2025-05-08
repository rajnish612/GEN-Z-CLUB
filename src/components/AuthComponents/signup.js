"use client";
import React, { useState } from "react";
import Link from "next/link";
const Signup = () => {
  let [form, setForm] = useState({});
  let [avatarString, setAvatarString] = useState("");
  let [avatar,setAvatar] = useState("")
  let [showPass, setShowPass] = useState(false);
  let [next, setNext] = useState(false);
  function handleAvatar(e) {

    if (e.target.files[0]) {
      setAvatar(e.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
      
        setAvatarString(reader.result)
      };
    }
  
  }
  async function handleClick() {
    console.log(avatar);
    
    if(!form.email || !form.username || !form.password || !form.fullname){
      return alert("Please fill all your credentials")
    }
    if (form?.email?.endsWith("." || "@") || !form?.email?.includes("@" || ".")) {
      return alert("enter a valid email id");
    }
    if(!avatar){
      return alert("please choose your profile pic")
    }
    const formData = new FormData;
    formData.append("username",form.username)
    formData.append("email",form.email)
    formData.append("password",form.password)
    formData.append("fullname",form.fullname)
    formData.append("avatar",avatar)
    await fetch("/api/signup", {
      method: "POST",
      
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        
       
      if(data.success){
alert("Successfully created your account. A verification link has been sent to your email id ")
      }
      alert(data.message)
      });
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

  }


  return (
    <div className="h-fit shadow-md rounded-md gap-10 py-10 justify-center flex-col flex items-center md:w-fit  w-sm  m-auto mt-4 bg-slate-50">
      <input
        onChange={handleAvatar}
        type="file"
        id="avatar"
        className="hidden"
      />
      <label htmlFor="avatar">
        <div className="flex flex-col items-center ">
          <img
          src={avatarString?`${avatarString}`:`./noavatar.png`}
            className="h-20 w-20 rounded-full ring-2  ring-amber-300 "
          />
        </div>
      </label>
      <div
        className={`gap-6 ${
          !next ? "slideRight" : ""
        } flex flex-col justify-center h-fit lg:w-md md:w-sm w-fit`}
      >
        {!next ? (
          <>
          <div className="flex flex-col justify-center items-center gap-6">
            <input
            value={form.username}
              onChange={handleChange}
              name="username"
              className="bg-white w-fit rounded-md lg:w-70 focus:ring-2 ring-blue-300 p-2 outline-0"
              placeholder="enter a username"
            ></input>
              {" "}
              <div className="flex w-fit bg-white justify-between  lg:w-70 items-center p-2">
              <input
              value={form.password}
                onChange={handleChange}
                name="password"
                type={showPass ? "text" : "password"}
                className="bg-white text-md  rounded-md outline-0"
                placeholder="enter your password"
                required={true}
              />
              <span
                className="cursor-pointer text-sm  md:ml-0"
                onClick={() => {
                  setShowPass((prev) => !prev);
                }}
              >
                {!showPass ? "show" : "hide"}
              </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="gap-6 slideLeft flex items-center  flex-col justify-center h-fit lg:w-md md:w-sm w-fit">
              <input
              value={form.fullname}
                onChange={handleChange}
                type="text"
                name="fullname"
                className="bg-white rounded-md lg:w-70 w-fit focus:ring-2 ring-blue-300 p-2 outline-0"
                placeholder="enter full name"
              ></input>
              <div className=" focus-within:ring-2 ring-blue-300 lg:w-70 w-fit p-2  flex justify-between bg-white rounded-md items-center ">
                {" "}
                <input
                value={form.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  className=" bg-white  rounded-md outline-0"
                  placeholder="enter your email id"
                  required={true}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {!next ? (
        <button
          onClick={() => {
            setNext((prev) => !prev);
          }}
          className="bg-blue-400  p-2 hover:scale-[1.1] transition-transform cursor-pointer shadow-md rounded-md text-white font-semibold"
        >
          Next
        </button>
      ) : (
        <>
        <div className="flex flex-col items-center gap-2">
          <button
            className="bg-blue-400 p-2 shadow-md cursor-pointer hover:scale-[1.1] transition-transform rounded-md text-white font-semibold "
            onClick={() => {
              setNext((prev) => !prev);
            }}
          >
            Back
          </button>
          <button
            className="bg-blue-400 p-2 shadow-md cursor-pointer hover:scale-[1.1] transition-transform rounded-md text-white font-semibold "
            onClick={handleClick}
          >
            Confirm
          </button>
          </div>
        </>
      )}
      <div className="gap-1 flex"> <span>Already have an account?</span><Link href={"/signin"} className="text-blue-400">SignUp</Link></div>
    </div>
  );
};

export default Signup;
