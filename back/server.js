const app =require('./app')
const dotenv = require('dotenv')
const connectDB=require('./config/db')
//handling uncaught errors
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`server is shutting down`);
    process.exit(1);

})
 

//setting up the config
dotenv.config({path:'back/config/config.env'})

//connecting to db
connectDB();  


const server =app.listen(process.env.PORT,()=>{console.log
    (`server is running at http://localhost:${process.env.PORT}`)})


 //handling the unhandled prmise rejection error
 process.on("unhandledRejection",err=>{console.log(`Error: ${err.message}`);
console.log(`server is shutting down`);

server.close(()=>{
    process.exit(1);
})
})