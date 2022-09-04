const mongoose =require('mongoose')

const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter the name']
    },
    desc:{
        type:String,
        required:[true,'enter dscription']
    },
    price:{
        type:Number,
        required:[true,'enter the price']
    },
    category:{
        type:String,
        required:[true,'enter the category']
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
    
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        require:true
    },
    craetedAT:{
   type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Product",ProductSchema)