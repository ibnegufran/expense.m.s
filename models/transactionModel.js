const mongoose=require("mongoose");
const transactionSchema=new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },

    amount:{
        type:Number,
        require:[true,"please enter amount"]
    },
    type:{
        type:String,
        require:[true,"please enter type"]
    }, 
    category:{
        type:String,
        require:[true,"please enter category"]
    },
    reference:{
        type:String,

    },
    description:{
        type:String,
        require:[true,"please enter desc"]
    },
    
    date:{
        type:Date,
        require:[true,"please enter date"],
       

    }
},{timestamps:true});

const transactionModel=mongoose.model("transactions",transactionSchema);

module.exports=transactionModel;