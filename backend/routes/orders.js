const { Order } = require("../models/order");
const { OrderItem } = require("../models/orderItem");
const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).json({
      success: false,
    });
  }

  res.send(orderList);
});

//get order by id router
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user")
    .populate("orderItems")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        // populate the category field of the product
        populate: {
          path: "category",
        },
      },
    })
    .sort({
      dateOrdered: -1,
    });

  if (!order) {
    res.status(404).send("Order not found");
  } else {
    res.send(order);
  }
});

//get total ecommerce sales using $sum
router.get("/get/total", async (req, res) => {
  const totalSales = await Order.aggregate([
    //aggregate is a mongoose method used to perform aggregation operations on the data in the database
    {
      $group: {
        _id: null,
        // $group is a mongoose aggregation operator that groups the data in the database based on the specified field and performs the specified operation on the grouped data
        total: { $sum: "$totalPrice" }, // $sum is a mongoose aggregation operator that sums the data in the specified field and returns the sum
      },
    },
  ]);

  if (!totalSales) {
    res.status(500).json({
      success: false,
    });
  }

  //return a json without the _id field
  res.status(200).json(totalSales[0].total);
});

//route to get the total number of orders
router.get("/get/count", async (req, res) => {
  const orderCount = await Order.find().countDocuments();

  if (!orderCount) {
    res.status(500).json({
      success: false,
    });
  }

  res.status(200).json({
    count: orderCount,
    success: true,
  });
});

// route to get history of orders
router.get("/get/orderhistory/:id", async (req, res) => {
  const orderHistory = await Order.find({
    user: req.params.id,
  })
    .populate("user")
    .populate("orderItems")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        // populate the category field of the product
        populate: {
          path: "category",
        },
      },
    })
    .sort({
      dateOrdered: -1,
    });

  if (!orderHistory) {
    res.status(500).json({
      success: false,
    });
  }

  res.send(orderHistory);
});

router.post("/", (req, res) => {
  const orderItemsId = req.body.orderItems.map((orderItem) => {
    let newOrderItem = new OrderItem({
      quantity: orderItem.quantity,
      product: orderItem.product,
    });

    newOrderItem.save();

    return newOrderItem._id;
  });

  //calculate total price of order using orderItemsId
  const totalPrice = req.body.orderItems.map((orderItem) => {
    //get product price from product id
    const product = Product.findById(orderItem.product);
    // resolve the promise and get the price array
    return product.then((product) => {
      return product.price * orderItem.quantity;
    });
  });

  //resolve the promise and get the total price
  Promise.all(totalPrice).then((totalPrice) => {
    let total = 0;
    totalPrice.forEach((price) => {
      total += price;
    });

    const newOrder = new Order({
      orderItems: orderItemsId,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: req.body.totalPrice,
      user: req.body.user,
      dateOrdered: req.body.dateOrdered,
      totalPrice: total,
    });

    newOrder
      .save()
      .then((order) => {
        res.status(200).json(order);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          message: "Error saving order",
          success: false,
        });
      });
  });
});

router.put("/:id", (req, res) => {
  Order.findByIdAndUpdate(
    req.params.id,
    {
      //update only status
      status: req.body.status,
    },
    { new: true }
  )
    .then((order) => {
      if (!order) {
        res.status(404).json({
          success: false,
        });
      }

      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
        message: "Error updating order",
      });
    });
});

router.delete("/:id", (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then((order) => {
      if (!order) {
        res.status(404).json({
          success: false,
        });
      }
      OrderItem.deleteMany(
        {
          _id: {
            $in: order.orderItems,
          },
        },
        (err) => {
          if (err) {
            res.status(500).json({
              success: false,
              error: err,
              message: "Error deleting order items",
            });
          }
        }
      );

      res.status(200).json({
        success: true,
        order,
        message: "Order deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
        message: "Error deleting order",
      });
    });
});

module.exports = router;
