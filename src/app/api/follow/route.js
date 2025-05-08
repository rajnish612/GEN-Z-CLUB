import Verify from "@/helpers/verifyToken";
import User from "@/models/user";
import { NextResponse } from "next/server";



export const POST = async(req)=>{
    try{
        const body = await req.json()
        const {id} = body;
        const userId = await Verify(req)
        if (id===userId){
            return NextResponse.json({message: "You cant Follow Your self",success: false},{status:400})
        }
    

       let user = await User.findOne({_id: id})
       
      let self = await User.findOne({_id:userId})
    
      if(self.followings.includes(id) &&user.followers.includes(userId)){
       self = await User.findByIdAndUpdate(userId,{$pull: {followings: id}}) 
       user = await User.findByIdAndUpdate(id,{$pull: {followers: userId}})
            // return NextResponse.json(
            //     { message: "Unfollowed successfully", success: true },
            //     { status: 200 }
            //   );
       return NextResponse.json(
        { message: "Unfollowed successfully", success: true },
        { status: 200 }
      );
      }
      self = await User.findByIdAndUpdate(userId,{$addToSet: {followings:id}})

        // if(user.followers.includes(userId)){
        //    user = await User.findByIdAndUpdate(id,{$pull: {followers: userId}})
        //     return NextResponse.json(
        //         { message: "Unfollowed successfully", success: true },
        //         { status: 200 }
        //       );
        // }
        // console.log(user)
        user = await User.findByIdAndUpdate(id,{$addToSet: {followers: userId}})
        
       if(!user){
        return NextResponse.json({message: "User Not Found",succes: false},{status:400})
       }
      
       
   return NextResponse.json({success: true},{status:200})
    }catch(error){
return NextResponse.json({message: error.message},{status:400})
    }
}