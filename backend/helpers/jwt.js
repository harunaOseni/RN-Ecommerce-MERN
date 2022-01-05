const expressJwt = require("express-jwt");
require("dotenv/config");

function authJwt() {
  return expressJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] });
}

module.exports = authJwt;
