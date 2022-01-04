const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Category } = require("../models/category");

router.get(`/`, async (req, res) => {
  const productList = await Product.find();
  if (productList.length > 0) {
    res.status(200).json(productList);
  } else {
    res.status(404).json({ message: "No products found" });
  }
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(404).send("Product not found");
  } else {
    res.status(200).send(product);
  }
});

router.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  })
    .then((product) => {
      if (!product) {
        res.status(404).json({
          success: false,
        });
      }

      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      });
    });
});

router.post(`/`, (req, res) => {
  Category.findById(req.body.category).then((category) => {
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    } else {
      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
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
    }
  });
});

//export router module
module.exports = router;
