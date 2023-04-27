const express=require("express");
const { registerController, loginController, logoutController } = require("../controllers/authRouteController");

//ROUTE OBJECT
const router=express.Router();

//ROUTES

//REGISTER
router.post("/register",registerController);

//LOGIN
router.post("/login",loginController);

//LOGOUT
router.post("/logout",logoutController);

module.exports=router;