const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication is invalid');
  }
  const token = authHeader.split(' ')[1];

  try {
    const decodedDetails = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name } = decodedDetails;
    req.user = { userId: userId, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError('token verification unsuccessfull');
  }
};

module.exports = authenticationMiddleware;
