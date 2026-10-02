import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true,
        minLength: [3, 'Username must be at least 3 characters long'],
        maxlength : [50 , "UserName must be within 50 characters"]
    },
    passwordHash : {
        type : String,
        required : true,
        select : false
    },
    role : {
        type : String,
        enum : ["user","seller"],
        default : "seller"
    },
    refreshToken : {
        type : String,
    }
})

const userModel = mongoose.model("users",userSchema);

export default userModel;