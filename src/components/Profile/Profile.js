"use client";
import React, { useEffect, useState } from "react";
import Userinfo from "./Userinfo";
import Activities from "./Activities";
import Profilecard from "./Profilecard";
import { useRouter } from "next/navigation";
import Post from "../home/Post";

export default function Profile ({id}) {
console.log(id);


  let[optionForPost,setOptions] =useState("")
  const router = useRouter();
  let [data, setData] = useState({});
  let [posts, setPosts] = useState([]);
  let [success, setSuccess] = useState(null);
  async function fetchPost() {}
  async function fetchData() {
    await fetch(`/api/profile?id=${id}`,{
      method: "GET",

    })
      .then((res) => res.json())
      .then((data) => {
       setSuccess(data.success);
       setData(data.user);
        setPosts(data.posts);
        
      });
  }
  useEffect(() => {
    if (success === false) {
      router.replace("/");
    }
   
    fetchData();
  }, [success]);
  
  
  
  
  return (
   posts || data &&( <div>
      <div className="flex justify-center gap-10  ">
        <Activities />
        {success === null ? (
          <h1>Loading</h1>
        ) : (
          <Profilecard
          post={posts.length}
            followers={data.followers && data.followers.length}
            followings={data.followings && data.followings.length}
            username={data.username}
            fullname={data.fullname}
          />
        )}
        <Userinfo
          followers={data.followers && data.followers.length}
          followings={data.followings && data.followings.length}
          username={data.username}
          fullname={data.fullname}
        />
      </div>
      <div className="flex flex-col flex-wrap gap-5 lg:flex-row  justify-center items-start mt-10">
      {posts &&
          posts.map((post, idx) => {
            return (
              
              <Post
              likes={post.likes}
              optionForPost={optionForPost} 
              setOptions={setOptions}
              postId = {post._id}
              userId={post.userId}
                name={data.username}
                key={idx}
                url={post.url}
                publicId={post.publicId}
            username={post.username}
                postUserId={post.userId}
                selfId={data._id}
                profile={true}
              />
              
              
              
          )
        } )
          }
      </div>
    </div>
    
  )
  );
};


