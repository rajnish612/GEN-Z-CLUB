import React from "react";

const Userinfo = ({username,fullname}) => {
  return (
    <div className="flex flex-col gap-6 lg:w-100 w-40 p-4 mr-7 text-[8px] md:mr-20 sm:text-[10px] lg:text-lg lg:mr-0 h-fit bg-slate-50 rounded-lg shadow-md ">
      <div className="flex justify-between">
        <span className="font-light">User Information</span>{" "}
        <span className="text-blue-400">See All</span>
      </div>
      <div className="flex justify-start gap-4 items-end">
        <h1 className="font-bold">{fullname}</h1>
        <small className="">{username}</small>
      </div>
      <div className=" clip flex gap-6 flex-col text-sm break-words">
        <h4 className="">
          lorasdhaoifhsiohfaiosfoiasgfouasggggggggggggggggggggggggggggggggggggggggggggggggggggggg
        </h4>
        <span>Living in Place</span>
        <span>Went to education</span>
        <span>Works at place</span>
        <div className="flex justify-between"><a className="text-blue-400" href="google.com">Name.dev</a><span>Joined at Date</span></div>
      </div>
    </div>
  );
};

export default Userinfo;
