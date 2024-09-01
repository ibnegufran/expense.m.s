const userModel = require("../models/userMosel");

const register=async(req,res)=>{
    try {
        let newUser =new userModel(req.body);
        let {name,email,password}=req.body;
        let user=  await userModel.findOne({email,password});
        if(user){
console.log("user already exist");
alert("user already exist");
        }else{
            await newUser.save();
            res.status(201).json({
                success:true,
               newUser,
            });
            
        }
        
     
    } catch (error) {
        // res.status(401).json({error })
        res.status(401).json({
            success:false,
           error,
        });
        
    }

}




const login =async (req,res)=>{
    try {
       let {email,password}=req.body;
     let user=  await userModel.findOne({email,password});
    //    its just like in php : $select_user=mysqli_query($con,SELECT * FROM `table` WHERE email=email and password=password)
    if(!user){
     return   res.status(404).send("user not found");
    //  if we use "RETURN" key word then the if block is terminated 
    }else{
        res.status(200).json(user);
console.log("login successfully")
    }
        
    } catch (error) {
        throw new Error("errror",error.message);
        
    }    
}


module.exports={register,login};