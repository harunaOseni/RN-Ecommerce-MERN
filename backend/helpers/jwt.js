const expressJwt = require("express-jwt");
require("dotenv/config");

function authJwt() {
  const secret = process.env.JWT_SECRET;
  const api = process.env.API_URL;

  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: (req, payload, done) => {
      if (!payload.isAdmin) {
        return done(null, true);
      }
      done();
    },
  }).unless({
    path: [
      // public routes that don't require authentication
      //regex for products
      { url: /\/api\/v1\/product(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/category(.*)/, methods: ["GET", "OPTIONS"] },
      `${api}/user/login`,
      `${api}/user/register`,
    ],
  });
}

module.exports = authJwt;
