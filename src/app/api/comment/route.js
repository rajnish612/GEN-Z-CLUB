import Verify from "@/helpers/verifyToken"
import Comment from "@/models/comments"
import User from "@/models/user"

import { NextResponse } from "next/server"

export const POST =async(req)=>{
    try{
const userId = await Verify(req)
const body = await req.json()
const user = await User.findById(userId)

if(!userId){
    return NextResponse.json({message:"unauthorized you must login or register",success: false},{status:400})
}
if(!body.comment ){
    return NextResponse.json({message:"You must write a comment",success: false},{status:400})

}
console.log(user.username)
const comment = await Comment.create({
    comment: body.comment,
    userId: userId,
    postId: body.postId,
    username: user.username,
})
console.log(comment)
return NextResponse.json({message: 'comment created successfully',success: true},{status: 200})
    }catch(error){
        return NextResponse.json({message:error.message,success: false},{status:400})

    }
}


export const GET = async(req)=>{
    try{
        const userId = await Verify(req)
      const {searchParams} = new URL(req.url)
      const postId = searchParams.get("postId")
        if(!userId){
            return NextResponse.json({message:"unauthorized you must login or register",success: false},{status:400})
        }
        console.log(postId)
        const comments = await Comment.find({postId: postId})
        console.log(comments)
        return NextResponse.json(comments,{status:200})
       
            }catch(error){
                return NextResponse.json({message:error.message,success: false},{status:400})
        
            } 
}