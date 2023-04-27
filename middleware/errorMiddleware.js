const errorResponse = require("../utils/errorResponse");

const errorHandler=(err,req,res,next)=>{
    let error={...erro};
    error.message=err.message;

    //MONGOOSE CAST ERROR
    if(err==="castError"){
        const message="Resource Not Found";
        error=new errorResponse(message,404);
    }

    //DUBLICATE KEY ERROR
    if(err===11000){
        const message="Dublicate field value entered";
        error=new errorResponse(message,400);
    }

    //MONGOOSE VALIDATION
    if(err.name==="ValidationError"){
        const message=Object.values(err.error).map((value)=>value.message);
        error=new errorResponse(message,400);
        res.status(error.statusCode || 500).json({sucess:false,error:error.message || "Server Error"})
    }

}

module.exports=errorHandler