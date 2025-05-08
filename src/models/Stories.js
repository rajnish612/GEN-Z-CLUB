import mongoose from "mongoose";
const StorySchema = new mongoose.Schema({
    Story:{type:String,required: true},
    userId: {type:String,ref: "User"},
    expireAt: {type: Date,expires:"24h",  default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),},
    createdAt:{type: Date,default: Date.now()},
    username:{type: String,required:true},
    publicId: {type: String},
})

const Stories = mongoose.models.Story || mongoose.model("Story",StorySchema)
export default Stories;