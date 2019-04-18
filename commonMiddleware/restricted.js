require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || 'secret for development purposes';

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res
          .status(401)
          .json({ message: 'You are unauthorized, please log in to continue' });
      } else {
        // req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'you shall not pass! (no token)' });
  }
};
