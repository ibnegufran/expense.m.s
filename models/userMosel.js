const { Timestamp } = require("bson");
const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"]
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
      
    },
    password:{
        type:String,
        required:[true,"please enter your name"]
    }
},
{timestamps:true}
);

const userModel=mongoose.model("user",userSchema)
module.exports=userModel;

