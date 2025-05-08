import User from "@/models/user"
import { dbConnect } from "@/lib/dbConnect"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import { use } from "react"
dbConnect()
export const POST = async(req)=>{
    try{

   const body = await req.json()
   const {token} = body
   if(!token){
    return NextResponse.json({message: "no token",success: false},{status:400})
   }
   console.log(token)
   let user = await User.findOne({verifytoken: token})
   if(!user){
    return NextResponse.json({message: "unauthorized",success: false},{status:400})
   }
   if(user.verificationTime<Date.now()){
    return NextResponse.json({message: "Token Expired",success: false},{status:400}) 
   }
   user.isVerified = true;
   await user.save()
   return NextResponse.json({message: "Successfully verified",success: true},{status:200})

    }catch(error){
        console.log(error);
        return NextResponse.json({message: error.message,success: false},{status:400}) 
        
    }

}