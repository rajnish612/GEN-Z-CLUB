import Verify from "@/helpers/verifyToken"
import { dbConnect } from "@/lib/dbConnect"
import Uploads from "@/models/uploads"
import User from "@/models/user"
import { NextResponse } from "next/server"

export const GET =async(req)=>{
   await dbConnect()
    try{
        const userId = await Verify(req)
        if(!userId){
            return NextResponse.json({message:"Unauthorized",success: false},{status:400})
        }
        const user = await User.findById(userId)
      
        const posts = await Uploads.find({
            userId: {$in: user.followings}
        })
        return NextResponse.json({posts,success: true,userId:userId,username:user.username},{status: 200})

    }catch(error){
        return NextResponse.json({message:error.message,success: false},{status:400})
    }
}

export const DELETE= async(req)=>{
    await dbConnect()
    try{
        const userId = await Verify(req)
        const body = await req.json()
        const {id} = body;
        if(!userId){
            return NextResponse.json({message:"Unauthorized",success: false},{status:400})
        }
        const post = await Uploads.findOneAndDelete({_id: id,userId:userId})
        if(!post){
            return NextResponse.json({message:"POST NOT FOUND",success: false},{status:400})
        }
    
        return NextResponse.json({message:"POST SUCCESSFULLY DELETED",success:true},{status:200})

    }catch(error){
        return NextResponse.json({message:error.message,success: false},{status:400})
    }
}
export const POST =async(req) =>{
    await dbConnect()
    try{
        const userId = await Verify(req)
        const body = await req.json()
        if(!body){
            return NextResponse.json({message:"you must select a post",success: false},{status:400})

        }
        if(!userId){
            return NextResponse.json({message:"Unauthorized",success: false},{status:400})
        }
        let post = await Uploads.findOne({_id:body.id})
        if(post.likes.includes(userId)){
            await Uploads.findByIdAndUpdate(body.id,{$pull:{likes:userId}})
        } else {
            await Uploads.findByIdAndUpdate(body.id,{$addToSet:{likes:userId}})

        }
        return NextResponse.json({message:"success",success:true},{status:200})
      
    }catch(error){
        return NextResponse.json({message:error.message,success: false},{status:400})

    }
}