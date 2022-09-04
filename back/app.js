const express= require("express");
const app = express();
app.use(express.json());
const errorMiddleware=require('./middleware/error')



// Routes
const product = require('./routes/ProductRoutes')
const user =require('./routes/UserRoute')
const order =require('./routes/OrderRoute')
app.use('/api/v1',product)
app.use('/api/v1',user)
app.use('/api/v1/',order)


//middleware for errors
app.use(errorMiddleware)





module.exports= app