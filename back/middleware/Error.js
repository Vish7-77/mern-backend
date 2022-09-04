const ErrorHander =require('../utils/ErrorHander')


module.exports=(err,req,res,next)=>{ 
    err.message=err.message||"intrenal server error",
    err.status=err.status ||500;
    //mongo error
 if(err.name==="CastError"){
   const message =`resource not found/ iNvalid ${err.path}`;
   err  =new ErrorHander(message,400)
 }
    res.status(err.status).json({
        success:false,
        message:err.message
    })
}
