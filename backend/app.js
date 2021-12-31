const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");

const api = process.env.API_URL;
const productRoutes = require("./routes/products");

app.use(express.json()); // means we can receive json data from the client
app.use(morgan("dev")); // log every request to the console
app.use(`${api}/product`, productRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(`Error connecting to database: ${error}`);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
