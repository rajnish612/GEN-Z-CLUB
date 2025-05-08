// import Verify from "@/helpers/verifyToken"
import { dbConnect } from "@/lib/dbConnect"
import Uploads from "@/models/uploads"
// import { NextResponse } from "next/server"

import { UploadImage } from "@/helpers/Cloudinary"
import Verify from "@/helpers/verifyToken"

import { NextResponse } from "next/server"
import User from "@/models/user"

// export const POST = async(req)=>{
//     await dbConnect()
//     try{
// const userId = await Verify(req)
// const body =  await req.json()
// const{publicId,url} = body;
// console.log(publicId,url)

// if(!userId){
//     return NextResponse.json({message: "you mus login or register to upload",success: false},{status: 400})
// }
// if(!publicId || !url){
//     return NextResponse.json({message: "you must upload any image",success: false},{status: 400})
// }
// let image = await Uploads.create({
//     publicId: publicId,
//     url: url,
//     userId: userId
// })
// return NextResponse.json({message: "image uploaded successfully",success: true},{status: 200})
//     }catch(error){
//         return NextResponse.json({message: error.message,success: false},{status: 400})
//     }
// }

export const POST = async(req)=>{
    await dbConnect()
    try{
        const userId = await Verify(req)
        if(!userId){
            return NextResponse.json({message: "Failed to Upload",success:false},{status:400})

        }
        const user = await User.findById(userId)
        const formData = await req.formData()
        const image = await formData.get("image")
        const data = await UploadImage(image,"NextJs")
        if(!data){
            return NextResponse.json({message: "Failed to Upload",success:false},{status:400})
        }
        let uploaded = await Uploads.create({
                publicId: data.public_id,
                url: data.url,
                userId: userId,
                username: user.username,
            })
            if(!uploaded){
            return NextResponse.json({message: "Failed to Upload",success:false},{status:400})

            }
return NextResponse.json({message:"hey",image:data,success: true},{status:200})
    }catch(error){
        return NextResponse.json({message:error.message,success: true},{status:400})

    }
}