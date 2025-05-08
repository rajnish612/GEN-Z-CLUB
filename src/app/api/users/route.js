import Verify from "@/helpers/verifyToken"
import { dbConnect } from "@/lib/dbConnect"
import User from "@/models/user"

import { NextResponse } from "next/server"

export const GET = async(req)=>{
    await dbConnect()
    try{
        const userId = await Verify(req)
let users = await User.find().select("-password")
return NextResponse.json({users,userId})

    }catch(error){
return NextResponse.json({message: error.message})
    }
}