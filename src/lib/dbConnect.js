
import mongoose from "mongoose";
export async function  dbConnect(params) {
    try{
     await mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
  const connection = mongoose.connection
  connection.on("connected",()=>{
    console.log("MongoDB connected")
  })
  connection.on("error",()=>{
    console.log("MongoDB connection error")
  })
  connection.on("disconnected",()=>{
    console.log("MongoDB disconnected");
    process.exit()
  })
    } catch(error){
        console.log(error)
    }
}