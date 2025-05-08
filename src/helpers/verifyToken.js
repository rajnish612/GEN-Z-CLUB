import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import jwt from "jsonwebtoken"
dbConnect()
async function Verify(req) {
  try {
const token = await req.cookies.get("token").value

if(!token){
    return false
}
const userinfo = jwt.verify(token,process.env.JWT_SECRET)

const user = await User.findOne({
    username: userinfo.username
})
if(!user){
    return false
}
return user._id
  } catch (error){
return false
  }
}
export default Verify;
