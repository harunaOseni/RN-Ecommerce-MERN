const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Category } = require("../models/category");

router.get(`/`, async (req, res) => {
  //get product based on category
  const filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const productList = await Product.find(filter).populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  } else {
    res.status(200).json(productList);
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

router.get("/get/count", async (req, res) => {
  const productCount = await Product.find().countDocuments();
  res.status(200).json({
    count: productCount,
  });
});

router.get("/get/featured/:count", async (req, res) => {
  const featuredProducts = await Product.find({ isFeatured: true }).limit(
    Number(req.params.count)
  );
  res.status(200).json(featuredProducts);
});

router.delete(`/:id`, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
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
        message: "Error updating product",
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
