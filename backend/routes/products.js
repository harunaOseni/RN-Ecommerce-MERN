const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const multer = require("multer");

const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".jfif"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(" ", "-");
    const uniqueSuffix = Date.now();
    //get the file extension
    const extension = fileName.slice(fileName.lastIndexOf("."));
    //validate the file extension

    if (allowedExtensions.indexOf(extension) < 0) {
      cb(new Error("Invalid file type"));
    } else {
      cb(null, `${fileName}-${uniqueSuffix}${extension}`);
    }
  },
});

const upload = multer({ storage: storage }); // this lines is for uploading files

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

//route to update a product
router.put("/:id", upload.single("image"), (req, res) => {
  //validate category
  Category.findById(req.body.category, (err, category) => {
    if (err) {
      res.status(500).send("Invalid category");
    }
  });

  //validate existing product
  const product = Product.findById(req.params.id);

  if (!product) {
    res.status(404).send("Product not found");
  }

  const file = req.file;
  const fileName = req.file.filename; // this line means that we are getting the file name from the multer middleware
  const baseUrl = req.protocol + "://" + req.get("host") + "/public/uploads/"; // this line means that we are getting the base url from the multer middleware
  let imageUrl;
  if (file) {
    imageUrl = `${baseUrl}${fileName}`;
  } else {
    imageurl = product.image;
  }

  Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: imageUrl,
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

router.post(`/`, upload.single("image"), (req, res) => {
  Category.findById(req.body.category).then((category) => {
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    }

    if (!req.file) {
      res.status(400).json({
        message: "Error, upload a file",
      });
    } else {
      const fileName = req.file.filename; // this line means that we are getting the file name from the multer middleware
      const baseUrl =
        req.protocol + "://" + req.get("host") + "/public/uploads/"; // this line means that we are getting the base url from the multer middleware
      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${baseUrl}${fileName}`,
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

//route to update a products images array
router.put("/gallery/:id", upload.array("images", 12), (req, res) => {
  const product = Product.findById(req.params.id);

  if (!product) {
    res.status(404).send("Product not found");
  }

  const files = req.files;

  const baseUrl = req.protocol + "://" + req.get("host") + "/public/uploads/"; // this line means that we are getting the base url from the multer middleware
  let imagesUrl = [];

  if (files) {
    files.forEach((file) => {
      imagesUrl.push(`${baseUrl}${file.filename}`);
    });
  }

  Product.findByIdAndUpdate(
    req.params.id,
    {
      images: imagesUrl,
    },
    {
      new: true,
    }
  )
    .then((product) => {
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

//export router module
module.exports = router;
