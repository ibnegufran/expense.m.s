const express=require("express");
const cors=require("cors");
const morgan=require("morgan");
const colors=require("colors");
const dotenv=require("dotenv");
const connectDB = require("./config/connectDB");
dotenv.config()
const userRoute=require("./routes/userRoute");
const transactionRoute=require("./routes/transactionRoute");

const app=express();
app.use(cors());
// app.use(morgan('dev'))
app.use(express.json());
connectDB();

require("./services/emailFetch")



app.use('/auth',userRoute);
app.use('/transaction',transactionRoute);










const PORT= 8080 || process.env.PORT;
app.listen(PORT,()=>{
    console.log("app is listening on port", PORT)
})
// # Dln2pOVR9YHZpAFD