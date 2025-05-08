import Verify from "@/helpers/verifyToken"
import Uploads from "@/models/uploads"
import User from "@/models/user"
import { Coming_Soon } from "next/font/google"
import { NextResponse } from "next/server"
import { use } from "react"

export const GET= async(req)=>{
    try{
        const id = req.nextUrl.searchParams.get('id');
       
         
const userId = await Verify(req)
if(!userId){
    return NextResponse.json({message: "sorry you are unable to access without logging in",success: false},{status:400})

}
if(id==userId){
const user = await User.findById(userId).select("-password")
const posts = await Uploads.find({userId: userId})
// console.log(user.toObject())

return NextResponse.json({user,success: true,posts},{status:200})
}
const user = await User.findById(id).select("-password")
if(!user){
    return NextResponse.json({success:false},{status:200})
}
const posts = await Uploads.find({userId: userId})
return NextResponse.json({user,success: true,posts},{status:200})

    }catch(error){
return NextResponse.json({error: error.message,success: false},{status:400})
    }
}

