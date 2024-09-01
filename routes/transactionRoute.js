const express=require("express");
const { addTransaction, getAllTransaction,editTransaction,deleteTransaction,addAllEmailTransaction  } = require("../controllers/transactionctrl");

const route=express.Router();


route.post('/delete-transaction',deleteTransaction);
route.post('/add-transaction',addTransaction);
route.post('/edit-transaction',editTransaction);


route.post('/get-transaction',getAllTransaction);
route.post('/email-transaction',addAllEmailTransaction);



module.exports=route