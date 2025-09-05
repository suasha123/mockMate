import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true,
        unique : true,
    },
    password : {
        type : String,
    },
    profile : {
        type : String,
    },
    username : {
        type : String,
        required : true,
    },
    googleId : {
        type : String,
        unique : true,
    },
    completed:{
        type : Number,
        default : 0
    },
    avg : {
        type : Number,
        default : 0
    }
})

export default mongoose.models.User || mongoose.model("User", userSchema);
