"use client"
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
const VerifyEmail = () => {
    const Router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    
    useEffect(()=>{
if(!token){
    Router.replace("/signup")
}
    },[token])
    async function verify() {
        await fetch("/api/verifyemail",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token: token})
        }).then((res)=>res.json()).then((data)=>console.log("success"))
    }
  return (
    <div className='flex items-center justify-center '>
      <button onClick={verify} className='bg-blue-500 p-2 shadow-md rounded-lg text-white mt-50 md:w-40  w-30 text-sm lg:text-lg lg:w-50'>CLICK HERE TO VERIFY YOUR EMAIL</button>
    </div>
  )
}

export default VerifyEmail
