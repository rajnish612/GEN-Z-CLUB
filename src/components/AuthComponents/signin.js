"use client";
import React, { useState } from "react";
import Link from "next/link";
const Signin = () => {
  let [form, setForm] = useState({});
  let [showPass, setShowPass] = useState(false);
  let [next, setNext] = useState(false);
  async function handleClick() {
    await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
  console.log(form)
  return (
    <div className="h-100 shadow-md rounded-md gap-10 justify-center flex-col flex items-center md:w-lg w-sm lg:w-lg m-auto mt-4 bg-slate-50">
    <div className="md:hidden  flex justify-center items-center lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-600">
          GEN CLUB
        </Link>
        

        {/* <input onChange={handleChange} type="file" id="files"  className="bg-red-400 hidden  w-10" />
         */}
        {/* <button  className="bg-blue-100 ml-5">
        <label htmlFor="files">
          upload a file
          </label></button> */}
      
      </div>
        <div className="flex flex-col gap-6 w-[60%]">
          <input onChange={handleChange} type="text" className="bg-white p-4" placeholder="enter username" name="username"></input>
       
     
          <input onChange={handleChange} type="text" className="bg-white p-4" placeholder="enter password" name="password"></input>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
      <button onClick={handleClick} className="bg-blue-400 p-2 shadow-m hover:scale-[1.1] transition-transform cursor-pointer text-white rounded-lg">Login</button>
     <div className="gap-1 flex"> <span>Dont have an account?</span><Link href={"/signup"} className="text-blue-400">SignUp</Link></div>
     </div>
    </div>
  );
};

export default Signin;
