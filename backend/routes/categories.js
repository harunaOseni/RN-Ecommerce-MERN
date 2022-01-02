const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    req.status(500).json({
      success: false,
    });
  }

  res.send(categoryList);
});

router.post("/", async (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  newCategory
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error saving category",
        error: err,
        success: false,
      });
    });
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404).json({
      message: "Category not found",
      success: false,
    });
  } else {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Category deleted",
      success: true,
    });
  }
});

module.exports = router;
