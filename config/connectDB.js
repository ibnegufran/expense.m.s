const mongoose=require("mongoose");
const dotenv=require("dotenv")


const connectDB=async()=>{
    try {
        let connect=  await mongoose.connect(process.env.MONGO_URL);
        if(connect){
          console.log("db is connected")
        }       
    } catch (error) {
        throw new Error(error)
    }
 
}
module.exports=connectDB;









