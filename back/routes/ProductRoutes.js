const express = require("express");
const router = express.Router();
const {auth} =require('../middleware/auth')
const {
  getAllProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  getProductDetails,
} = require("../control/productcontrol");

//creating the routes
router.route("/products").get(getAllProduct);
router.route("/product/new").post(auth("admin"), CreateProduct);
router
  .route("/product/:id")
  .put(auth("admin"), UpdateProduct)
  .delete(auth("admin"), DeleteProduct)
  .get(getProductDetails);

module.exports = router;
