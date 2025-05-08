import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import User from "@/models/user"
import { dbConnect } from "@/lib/dbConnect"
dbConnect()
export const POST= async(req)=>{
    try{
const body = await req.json()
console.log(body)
if(!body.username || !body.password){
    return NextResponse.json({message: "Please fill all the credentials" ,success: false},{status:400})
}

let user = await User.findOne({username: body.username})
if(!user){
    return NextResponse.json({message: "User Not found" ,success: false},{status:400})

}
const ismatch = await bcrypt.compare(body.password,user.password)
if(!ismatch){
    return NextResponse.json({message: "Password is Wrong" ,success: false},{status:400})

}
const token = jwt.sign({username: body.username}, process.env.JWT_SECRET);
const response = NextResponse.json({message: "Logged in Successfully" ,success: true},{status:420})

response.cookies.set("token",token,{
    httpOnly:true
})
return response

    }catch(error){
return NextResponse.json({message: error.message,success: false},{status:400})
    }
}