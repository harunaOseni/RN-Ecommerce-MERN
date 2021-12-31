const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");

router.get(`/`, async (req, res) => {
  const productList = await Product.find();
  if (productList.length > 0) {
    res.status(200).json(productList);
  } else {
    res.status(404).json({ message: "No products found" });
  }
});

router.post(`/`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error saving product",
        error: error,
        success: false,
      });
    });
});

//export router module
module.exports = router;
