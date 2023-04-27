const mongoose=require("mongoose");
const bcrypt= require("bcryptjs");
const JWT=require("jsonwebtoken");
const cookie=require("cookie");
//MODELS
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"User Name is Required"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        minlength:[6,"Password Should be 6 Character Long"]
    },
    subscription:{
        type:String,
        default:''
    }
});

// HASHED PASSWORD
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
    next();
})

// MATCH PASSWORD
userSchema.methods.matchPassword=async function(passwor){
    return await bcrypt.compare(passwor,this.password);
}

//SIGN TOKEN
userSchema.methods.getSignToken=function(res){
    const aceessToken=JWT.sign({id:this._id},process.env.JWT_ACCESS_SECRET,{expiresIn:process.env.JWT_ACCESS_EXPIREIN});
    const refreshToken=JWT.sign({id:this._id},process.env.JWT_REFRESH_TOKEN,{expiresIn:process.env.JWT_REFRESH_EXPIREIN});
    res.cookie("refreshToken",`${refreshToken}`,{maxAge:86400*700,httpOnly:true});
}
const User=mongoose.model("User",userSchema);

module.exports=User;