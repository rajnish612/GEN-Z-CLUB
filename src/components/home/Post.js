"use client";
import { CldImage } from "next-cloudinary";
import { Funnel_Display } from "next/font/google";
import React, { useEffect, useState } from "react";

const Post = ({optionForPost,setOptions, profile, postId, url, publicId, username, userId,likes,selfId }) => {
let [isDeleted,setDeleted]= useState("")
let [like,setLikes] = useState(likes)
let [comment,setComment] = useState(false)
  let [commented, setCommented] = useState("");
  let [comments, setComments] = useState([]);
  let [form, setForm] = useState({});
  async function handleLikes(id) {
  
    await fetch("/api/posts",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id:id})
    })
    setLikes((prev)=>{


   
      if(!prev.includes(id)){
       return [...prev,id]
      } else {
    return prev?.filter((lik)=>{
      
        if(lik===id){
          return lik!==id
        }
        return lik
     })
    }
    })
    console.log(id,like)
  
    
  }
  async function fetchComment() {
    await fetch(`/api/comment?postId=${postId}`, {
      method: "GET",
      "Content-Type": "application/json",
    })
      .then((res) => res.json())
      .then((data) => setComments(data));
  }
  useEffect(() => {
    
    fetchComment();
  }, []);
 
    function handleOptions(id) {
      console.log(id)
      setOptions(prev => (prev === id ? "" : id));
    }
    
  
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
        postId: postId,
      };
    });
  }
async function handleDelete(id) {
  setDeleted(null)
  await fetch("/api/posts",{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({id:id})
  }).then(res=>res.json()).then(data=>{
    if(data.success){
    setDeleted(data.success)
    alert("Post Successfully Deleted")
    }else{
      setDeleted("")
    }
  })
}
  async function handleSubmit(id) {
    if(!form.comment){
      alert("Write Something")
      return
    }
    setCommented(null);
    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCommented(data.success);
        setComments((prev) => {
          prev.push({
            comment: form.comment,
            postId: id,
            username: username,
            userId: userId,
          });
          return [...prev];
        });
        setInterval(() => {
          setCommented("");
        }, 800);
      });
  }



  return (
    <>
      {postId && (
        <div 

        className={`lg:w-100 md:w-100 w-100 ml-50 ${profile?"lg:ml-0":"lg:ml-50"} relative mb-20 md:mr-30 flex p-5 lg:mr-0 justify-center bg-slate-50 shadow-md `}>
          <div className="w-[100%] flex flex-col   gap-4">
            <div className="h-5 flex justify-between">
              <div className="flex gap-4 w-fit  items-center">
                <img
                  src="https://picsum.photos/seed/picsum/200/300"
                  className="w-6 h-6 rounded-full object-cover "
                />
                <h1>{username}</h1>
              </div>
              {selfId===userId &&  profile&&(
                <>           <div className="w-5 h-5 ">
                <img src="/more.png" onClick={()=>{handleOptions(postId)}} className="w-full h-full hover:cursor-pointer hover:scale-[1.2] transition-transform" />
              </div>
             {optionForPost===postId&&(
              <div className="absolute -right-10  bg-white z-10 top-10  w-30 p-2  rounded-md shadow-md">
                <button onClick={()=>{
                  handleDelete(postId)
                }} className="text-red-500 p-2 rounded-md  bg-gray-100 w-[90%] text-left cursor-pointer">{isDeleted===null?"Loading":isDeleted===""?"Delete":"Deleted"}</button>
                
                </div>
                )}
                </>

              )}
            </div>

            <div      onClick={()=>{
      setOptions("")
     }} className="w-full  ">
              <img 
                src={url}
               
                className="w-full h-70 object-cover  "
              ></img>
            </div>

            <h2 className="break-words ">
              Lasopfjaosfnalskfnanfasfnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
            </h2>

            <div>
              <div className="flex justify-between">
                <div onClick={()=>{
                  handleLikes(selfId)
                }} className="flex gap-2 cursor-pointer hover:scale-[1.1] transition-transform justify-center items-center">
                 <i style={{color:like.includes(selfId)?"red":"blue",fontSize:"large"}}  class="fa-solid fa-heart"></i>
                  <h2 className="font-medium">{like.length} Likes
                  
                  </h2>
                </div>
                <div onClick={()=>{
                  setComment((prev)=>!prev)
                }} className="flex gap-2 cursor-pointer hover:scale-[1.1] transition-transform justify-between items-center">
                  <img src="/comment.png" className="md:w-5 md:h-5 w-3 h-3 " />
                  <h2 className="font-medium">{comments?.length} comments</h2>
                </div>
                <div  className="flex gap-2 hover:scale-[1.1] transition-transform justify-between items-center">
                  <img src="/share.png" className="md:w-5 md:h-5 w-3 h-3 " />
                  <h2 className="font-medium" >Shares</h2>
                </div>
              </div>
              <div className="flex items-center mt-3  justify-center gap-x-4">
                <input
                  onChange={handleChange}
                  name="comment"
                  type="text"
                  placeholder="Write comment"
                  className="bg-gray-200 w-full rounded-lg p-1"
                />
                <button
                  onClick={() => {
                    handleSubmit(postId);
                  }}
                  className="bg-blue-400 py-1 px-3 wrap-break-word  rounded-2xl text-white "
                >
                  {commented === null
                    ? "Loading"
                    : commented === true
                    ? "done"
                    : commented === false
                    ? "not send"
                    : "send"}
                </button>
              </div>
            </div>
            <div className={`flex  flex-col gap-3 ${comment?"h-30":"h-0"} relative  transition-all overflow-y-scroll`}>
              {comments &&
                comments.map((comment,idx) => {
                  return (
                    <>
                      <div key={idx}
                    
                        className={`flex  lg:w-[100%]  justify-start ${
                          comment.userId === userId && "flex-row-reverse"
                        }    items-center gap-5`}
                      >
                        <div className="w-[20%]">
                          <img
                            src="https://picsum.photos/seed/picsum/200/300"
                            className="w-10 h-10 rounded-full "
                          />
                        </div>
                        <div className=" w-fit p-0 m-0 ">
                          <h1 className="font-semibold">{comment.username}</h1>
                          <h1 className="break-words font-light">
                            {comment.comment}
                          </h1>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
