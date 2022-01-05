// modules required for server
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
//import error handler function
const errorHandler = require("./helpers/error-handler");

// a helper folder is a folder that contains helper files that are used by other files

// Routes
const productsRoutes = require("./routes/products");
const ordersRoutes = require("./routes/orders");
const usersRoutes = require("./routes/users");
const categoriesRoutes = require("./routes/categories");

// api for routes
const api = process.env.API_URL;

// middleware
app.use(express.json()); // means we can receive json data from the client
app.use(morgan("dev")); // log every request to the console
app.use(authJwt()); // authJwt middleware
// authentication error handling
app.use(errorHandler);

app.use(cors()); // allow cross origin resource sharing
app.options("*", cors()); // this means we can access the api from any origin
app.use(`${api}/product`, productsRoutes);
app.use(`${api}/order`, ordersRoutes);
app.use(`${api}/user`, usersRoutes);
app.use(`${api}/category`, categoriesRoutes);

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(`Error connecting to database: ${error}`);
  });

// creating a server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
