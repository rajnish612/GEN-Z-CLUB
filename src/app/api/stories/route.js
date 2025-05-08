import { dbConnect } from "@/lib/dbConnect"
import Verify from "@/helpers/verifyToken"
import User from "@/models/user"
import Stories from "@/models/Stories"
import { NextResponse } from "next/server"
import { UploadImage } from "@/helpers/Cloudinary"
import { ST } from "next/dist/shared/lib/utils"

export const POST = async(req)=>{
    await dbConnect()
    try{
        const userId = await Verify(req)
        if(!userId){
            return NextResponse.json({message: "Failed to Upload",success:false},{status:400})

        }
        const user = await User.findById(userId)
        const formData = await req.formData()
        const story = await formData.get("story")
        const data = await UploadImage(story,"NextJs")
        console.log(data)
        if(!data){
            return NextResponse.json({message: "Failed to Upload",success:false},{status:400})
        }
        let uploaded = {
                Story: data.url,
                publicId: data.public_id,
                userId: userId,
                username: user.username,
            }
             user.stories.push(uploaded)
             await user.save()
           
return NextResponse.json({message:"hey",story:data,success: true},{status:200})
    }catch(error){
        console.log(error)
        return NextResponse.json({message:error.message,success: false},{status:400})

    }
}

export const GET = async(req)=>{
    await dbConnect()
    try{
        const userId = await Verify(req)
        let self = await User.findById(userId)
let users = await User.find({_id:{$ne:userId}}).select("-password")
return NextResponse.json({users,self})

    }catch(error){
return NextResponse.json({message: error.message})
    }
}