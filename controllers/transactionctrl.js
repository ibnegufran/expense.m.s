const moment = require("moment");
const transactionModel = require("../models/transactionModel");
const userModel = require("../models/userMosel");

const Imap = require("imap");
const { simpleParser } = require("mailparser");
// const io = require("socket.io")(server); // Example if you're using Socket.io

const customerNames = [
  "VISHAL ENGINEERING C",
  "MARUTI ENGINEERING WORKS",
  "MAHAVIR ENTERPRISE",
  "OUTWARD CLG MAHARASHTRA",
  "HARMEET ENTERPRISES",
  "MAX MACHINERY AUTOMA",
  "INDOMAX ENGINEERS",
  "HALSTON GLOBAL AHMEDABAD MERCA",
  "AEROSELL HYDRAULICS PNE HDFC",
  "SHOAIB ISMAIL KOJAR PUNJAB NAT",
  "UNIQUE HYDRAULIC SALES",
  "PREMIER AUTO INDUSTRIES",
  "INNOVATIVE TECHNOLOG",
];

const deleteTransaction=async(req, res)=> {
  try {

    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("deleted sucessfully");
  }


  catch (error) {

    throw new Error(error);
  }

}



const addTransaction=async(req,res)=>{
  try {
    const transaction=new transactionModel(req.body);

    await transaction.save();
    res.status(200).json({
      success:true,
     transaction,
  });  



      }
      
   
   catch (error) {
      res.status(401).json({error })
      res.status(500).json({
          success:false,
         error,
      });
      throw new Error(error);
  }

}




const getAllTransaction =async (req,res)=>{
  try {
    const {frequency,selectedDates,type}=req.body;
    const transactions=await transactionModel.find({
      ...(frequency !== "custom" ? {
        date:{
          $gt:moment().subtract(Number(frequency), 'd').toDate(),
  
        }
      } : {
        date:{
          $gte:selectedDates[0],
          $lte:selectedDates[1]
  
        }
      }
    ),
    ...(type !== "all" && {type}),
        userId:req.body.userId,
      



     
    });
  //   sab kuch select karlo jiski id ye hai
  // console.log(req.body)
    res.status(200).json( transactions);
    console.log(frequency);
    console.log(type);



  } catch (error) {
      throw new Error("errror",error.message);
      
  }    
}

// use of spreader operator :ek mnobject ke ander dosre object ke sare data ko store karna ye case me find{} object me ham ne date aur type{} object ko add kiy a hai



const editTransaction=async(req,res)=>{
  try {
   
    await transactionModel.findOneAndUpdate({_id:req.body.transactionId},
      req.body.payload
    );
    res.status(200).send("update suucessfully")




      }
      
   
   catch (error) {
      // res.status(401).json({error })
      // res.status(500).json({
      //     success:false,
      //    error,
      // });
      throw new Error(error);
  }

}


// Function to fetch and insert emails into the DB
const addAllEmailTransaction = async (req, res) => {
 
};


 





module.exports={addTransaction,getAllTransaction,editTransaction,deleteTransaction,addAllEmailTransaction};