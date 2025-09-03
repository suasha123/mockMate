import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    profile : {
        type : String,
    },
    username : {
        type : String,
        required : true,
    }
})

export default mongoose.models.User || mongoose.model("User", userSchema);
