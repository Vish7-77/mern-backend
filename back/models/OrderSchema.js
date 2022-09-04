const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  shippping: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pin: { type: Number, required: true },
    phone: { type: Number, required: true },
  },
  orderItem: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    require:true
},

pay:{
    id:{
        type:String,
        required:true
    },
    status:{
    type:String,
    required:true
    }
},
stock:{type:Number,required:true,default:0},
paidAt:{type:Date, required:true,default:0},
itemPrice:{type:Number, required:true,default:0},
TotalPrice:{type:Number, required:true,default:0},
orderstatus:{type:String , required:true, default:'Processing'},
deliveredAt:Date,
createdAt:{type:Date, default:Date.now,}
});

module.exports = mongoose.model ("Order",OrderSchema)