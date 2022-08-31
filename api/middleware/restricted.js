const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'shh';




module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.json({ status: 401, message: "token required" })
  };
  jwt.verify(authorization, JWT_SECRET, (err, token) => {
    if (err) {
      res.json({ status: 401, message: 'Token invalid' });
      return;
    }
    next();
  })
};










/*
  IMPLEMENT

  1- On valid token in the Authorization header, call next.

  2- On missing token in the Authorization header,
    the response body should include a string exactly as follows: "token required".

  3- On invalid or expired token in the Authorization header,
    the response body should include a string exactly as follows: "token invalid".
*/

