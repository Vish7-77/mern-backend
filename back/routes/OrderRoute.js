const express = require("express");
const router = express.Router();
const Product = require("../models/ProductModel");
const Order = require("../models/OrderSchema");
const ErrorHander = require("../utils/ErrorHander");
const CatchAsyncError = require("../middleware/CatchAsyncError");

//route to create a new order
router.route("/order/new").post(
  CatchAsyncError(async (req, res, next) => {
    const { shippping, orderItem, pay, itemPrice, TotalPrice } = req.body;
    const order = await Order.create({
      shippping,
      orderItem,
      pay,
      itemPrice,
      TotalPrice,
    });

    res.status(201).json({ success: true, order });
  })
);

//to find a order
router.route("/order/:id").get(
  CatchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new ErrorHander("oredr not found", 404));
    }
    res.status(200).json({
      success: true,
      order,
    });
  })
);
//to get all orders

router.route("/or/a").get(
  CatchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
    let totalamount = 0;
    orders.forEach(order=> {
      totalamount += order.TotalPrice;
    });
    res.status(200).json({
      success: true,
      totalamount,
      orders,
    });
  })
);

//to upadate order

router.route("/order/update/:id").put(
  CatchAsyncError(async (req, res, next) => {
    async function updateStock(id, quantity) {
      const product = await Product.findById(id);
      product.stock = product.stock - quantity;
      await product.save({ validateBeforeSave: false });
    }
    const order = await Order.findById(req.params.id);
    if (order.orderstatus === "deliverd") {
      return next(new ErrorHander("you have  already delivered", 404));
    }

    order.orderItem.forEach(async (o) => {
      await updateStock(o.product, o.quentity);
    });

    order.orderstatus = req.body.status;
    if (req.body.status === "delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  })
);

//to delete a order
router.route("/order/:id").delete(
  CatchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return next(new ErrorHander("oredr not found", 404));
    };
     await order.remove();
    res.status(200).json({
      success: true,
     message:'deleted successfully'
    });
  })
);

module.exports = router;
