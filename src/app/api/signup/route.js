import { dbConnect } from "@/lib/dbConnect"
import User from "@/models/user"
import sendmail from "@/helpers/sendmail"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { use } from "react"
import { UploadImage } from "@/helpers/Cloudinary"
dbConnect()
export const POST =async(req)=>{
    
    try{
const formData = await req.formData()
const fullname = await formData.get("fullname")
const email = await formData.get("email")
const password = await formData.get("password")
const username = await formData.get("username")
const avatar = await formData.get("avatar")


let user = await User.findOne({email:email})
if(user){
    return NextResponse.json({message: "user already exist with the same email",success: false},{status:400})
}     
console.log(user)
user =  await User.findOne({username:email})
if(user){
    return NextResponse.json({message: "user already exist with the same username",success: false},{status:400}) 
}
const data = await UploadImage(avatar,"NextJs")
 user = await User.create({
    fullname: email,
    username: email,
    password: await bcrypt.hash(password,10),
    avatar:data.url,
    email: email,
 })
await sendmail(email)
return NextResponse.json({message: "Successfully created your account",success: true},{status:200}) 
    }catch(error){
        return NextResponse.json({message: error.message,success: false},{status:400}) 

    }
}