import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    comment: {type: String,required: true},
    userId: {type: String , ref: "User"},
    postId: {type: String,ref: "Uploads"},
    username: {type: String,required: true}
})

const Comment = mongoose.models.comment || mongoose.model("comment",commentSchema)
export default Comment;