const expressJwt = require("express-jwt");
require("dotenv/config");

function authJwt() {
  const secret = process.env.JWT_SECRET;
  const api = process.env.API_URL;
  return expressJwt({ secret, algorithms: ["HS256"] }).unless({
    path: [
      // public routes that don't require authentication
      //regex for products
      `${api}/user/login`,
      `${api}/user/register`,
      { url: /\/api\/v1\/product(.*)/, methods: ["GET"] },
      { url: /\/api\/v1\/category(.*)/, methods: ["GET"] },
    ],
  });
}

module.exports = authJwt;
