const userModel=require('../models/userModel');
const errorResponse = require('../utils/errorResponse');

// JWT TOKEN
exports.sendToken=(user,statusCode,res)=>{
    const token=user.getSignTokenres;
    res.status(statusCode).json({success:true,token})
}

//REGISTER
exports.registerController=async(req,res,next)=>{
    try {
        const {username,email,password}=req.body;
        const existingEmail=await userModel.findOne({email});
        if(existingEmail){
            return next(new errorResponse("Email Already register",500));
        }
        const user=await userModel.create({username,email,password});
        this.sendToken(user,201,res);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//LOGIN
exports.loginController=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return next(new errorResponse("Please Provide Email Or Password",500));
        }
        const user=await userModel.findOne({email});
        if(!user){
            return next(new errorResponse("Invalid Creditial",401));
        }
        const isMatch= await user.matchPassword(password);
        if(!isMatch){
            return next(new errorResponse('Invalid Creditial!',401));
        }
        this.sendToken(user,200,res);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//LOGOUT
exports.logoutController=async(req,res)=>{
    try {
        res.clearCookie('refreshToken');
        res.status(200).json({success:true,message:"Logout Successfully"});
    } catch (error) {
        console.log(error);
    }
}