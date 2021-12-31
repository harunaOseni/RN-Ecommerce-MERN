const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");

const api = process.env.API_URL;

app.use(express.json()); // means we can receive json data from the client
app.use(morgan("dev")); // log every request to the console

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  countInStock: Number,
});

const Product = mongoose.model("Product", productSchema);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(`Error connecting to database: ${error}`);
  });

app.get(`${api}/product`, async (req, res) => {
  const productList = await Product.find();
  // const product = {
  //   id: 1,
  //   name: "Product 1",
  //   image: "https://via.placeholder.com/150",
  // };
  if (productList.length > 0) {
    res.status(200).json(productList);
  } else {
    res.status(404).json({ message: "No products found" });
  }
});

app.post(`${api}/product`, (req, res) => {
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
