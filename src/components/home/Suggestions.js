"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Suggestions = () => {
let[user,setUsers]=useState([])
let [selfId,setId] = useState("")
let [loading,setloading] = useState("")
let [isfollowing,setFollowing] = useState("")
const router = useRouter()
async function Follow(id) {
  setloading(id)
  await fetch("/api/follow",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id: id})
  }).then(res=>res.json()).then(data=>{
    if(data){
      setloading("")
    }
    if(data.success){
  
    setUsers((prev)=>{
  return prev.map((user)=>
     user._id ===id ?
   {...user,followers:[...user.followers,selfId]}
    : user
 
     
      )
  })
  }})
}
async  function users(){

  await fetch("/api/users",{
    method: "GET",
   
  }).then(res=>res.json()).then((data)=>{
    setUsers(data.users)
    setId(data.userId)
  })
      
 
  }
  useEffect(()=>{
    users()
    if(selfId=== false){
 router.replace("/signup")
    }
  },[user])



  return (

    selfId===""?<><h1>Loading</h1></> :
    <><div className='lg:h-100 lg:w-100 md:w-80 md:h-80 sm:block w-70 p-5 overflow-y-scroll  bg-slate-50 shadow-lg'>
        <div className='mt-10 flex flex-col gap-6'>
          
     


 {user && user.map((val,idx)=>{


    return( <div key={idx}> {val._id!==selfId &&<div   className='h-10 hover:scale-[1.1] transition-transform bg-gray-200 py-7 md:px-4 px-1 rounded-lg flex justify-between items-center'>
        <div className='flex justify-center w-fit md:gap-4 gap-1 items-center'>
        <img src='https://picsum.photos/seed/picsum/200/300' className='md:w-8 md:h-8 w-7 h-7 rounded-full object-cover'/>
        <h1>{val.username} </h1>
        </div>
        <button onClick={()=>{
          Follow(val._id)
        }} className='bg-blue-400 p-1 sm:text-sm text-white rounded-lg cursor-pointer hover:scale-[1.1] transition-transform'>
       { loading===val._id ?<h1>Loading</h1>: val.followers.includes(selfId)?"Following":val.followings.includes(selfId)?"Follow Back":"Follow"}</button>
      </div>}
      </div>)
     })}
      </div>
      
     
     
    </div>
    </>
  )
}

export default Suggestions
