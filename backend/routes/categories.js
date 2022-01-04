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

router.get("/:id", async (req, res) => {
  await Category.findById(req.params.id)
    .then((category) => {
      if (!category) {
        res.status(404).json({
          success: false,
        });
      }

      res.send(category);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: error,
      });
    });
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

router.put("/:id", async (req, res) => {
  await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true } // means return the updated document
  )
    .then((category) => {
      if (!category) {
        res.status(404).json({
          success: false,
        });
      }

      res.send(category);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: error,
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
