const express=require("express");
const BodyParser=require("body-parser");
const cors=require("cors");
const morgan =require("morgan");
const colors=require("colors");
const dotenv=require("dotenv");
const connectDB = require("./config/Db");
const authRoute=require("./routes/authRoutes");
const openaiRoute=require("./routes/openaiRoutes")
const errorHandler = require("./middleware/errorMiddleware");
const path =require("path");

//DOTENV
dotenv.config();

//DATABSE CONNECTION
connectDB();

// REST OBJECT
const app=express();

// MIDDLEWARE
app.use(morgan("dev"));
app.use(BodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use(express.static(path.join(__dirname,'./client/build')));

//API ROUTES 
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/openai",openaiRoute);

const PORT=process.env.PORT 
//LISTEN SERVER
app.listen(8080,()=>{
    console.log(`Server Running Development mode on Port No. ${PORT}`.bgCyan.white);
})