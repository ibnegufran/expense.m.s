const express=require("express");
const { register } = require("../controllers/userController");
const { login } = require("../controllers/userController");

const route=express.Router();


route.post('/register',register);
route.post('/login',login);


module.exports=route