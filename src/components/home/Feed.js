"use client"
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { consumeDynamicAccess } from "next/dist/server/app-render/dynamic-rendering";

const Feed = () => {
  let[data,setData] = useState({})

  async function fetchPosts() {
    await fetch("/api/posts",{
      method: "GET",
      headers:{
        "Content-Type": "application/json"
      }
    }).then(res=>res.json()).then(data=>setData(data))
    
  }
  useEffect(()=>{
fetchPosts()
  },[])
  console.log(data)
  return (
    <div className="flex mt-5 flex-col gap-6 w  ">
{ data.posts?.map((post,idx)=>{
 return <Post  key={idx} username={data.username} userId={data.userId} postId={post._id} url={post.url} likes={post.likes} selfId={data.userId} publicId={post.publicId} />
})

}
    </div>
  );
};

export default Feed;
