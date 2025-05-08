import mongoose from "mongoose";
let uploadSchema = new mongoose.Schema({
    url: {type: String, required: true},
    publicId: {type: String, required: true},
    userId: {type: String, required: true},
    username:{type:String,required: true},
    likes: [{type: String}],
})

let Uploads =mongoose.models.uploads || mongoose.model("uploads",uploadSchema)
export default Uploads