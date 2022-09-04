const Product = require("../models/ProductModel");
const ErrorHander =require('../utils/ErrorHander')
const CatchAsyncError = require ('../middleware/CatchAsyncError')
const ApiFeaturs =require('../utils/ApiFeaturs')
//get all the products
exports.getAllProduct = CatchAsyncError(async (req, res,next) => {

  const resultPP=8;
  const ProductsCount=await Product.countDocuments();

 const apiFeaturs= new  ApiFeaturs(Product.find(),req.query).search().filter().pagination(resultPP)
  const products = await apiFeaturs.query;
  res.status(200).json({
    success: true,
    products,
    ProductsCount
  });
});

//craete a new Product
exports.CreateProduct = CatchAsyncError(async (req, res, next) => {
  req.body.user=req.user.id
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,

  });
});


//update a product
exports.UpdateProduct =CatchAsyncError( async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander( "product not found",404))
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    findAndModify: false,
  });

  res.status(200).json({ success: true, product });
});
//delete a product
exports.DeleteProduct = CatchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander( "product not found",404))
  }
  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "product deleted successfully" });
});

//get a single product details
exports.getProductDetails= CatchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHander( "product not found",404))
      }
    res.status(200).json({success:true,product})
});
