"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Suggestions from "./home/Suggestions";
import Search from "./home/Search";

const Navbar = () => {
  const pathname = usePathname()

  // function handleChange(e){
  //   if(e.target.files){
  //     const file = e.target.files[0]
  //    if(!file.type.startsWith("image")){
  //     console.log("error")
  //     return
  //    }
  //     const reader = new FileReader()
  //   reader.onload=()=>{
  //     console.log(reader.result)
  //   }
  // reader.readAsDataURL(file)

  //   }
    
  // }
console.log(pathname!=="/signup")
  return (
    <>
    <div className="h-24 flex items-center justify-between">
      {/* LEFT */}
      <div className="md:hidden pl-10 flex justify-center items-center lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-600">
          GEN
        </Link>
        

        {/* <input onChange={handleChange} type="file" id="files"  className="bg-red-400 hidden  w-10" />
         */}
        {/* <button  className="bg-blue-100 ml-5">
        <label htmlFor="files">
          upload a file
          </label></button> */}
      
      </div>
      {/* CENTER */}
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        {/* LINKS */}
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/home.png"
              alt="Homepage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Homepage</span>
          </Link>
          {pathname!=="/signin"&& pathname!=="/signup" &&(  
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/friends.png"
              alt="Friends"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Friends</span>
          </Link>
             )}
        </div>
   
        {pathname!=="/signin"&& pathname!=="/signup" &&(  
      <Search/>
    )}
      </div>

      {/* RIGHT */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
       
      
      {pathname!=="/signin"&& pathname!=="/signup" &&(  
       <>
            <div className="cursor-pointer">
              <img src="/people.png" alt="" width={24} height={24} />
            </div>
            <div className="cursor-pointer">
              <img src="/messages.png" alt="" width={20} height={20} />
            </div>
            <div className="cursor-pointer">
              <img src="/notifications.png" alt="" width={20} height={20} />
            </div>
        
            <div className="flex items-center gap-2 pr-7 text-sm">
              <img src="/login.png" alt="" width={20} height={20} />
              <Link href="/signin">Login/Register</Link>
            </div>
            </>
      )}
      </div>
    </div>
    </>
  );
};

export default Navbar;