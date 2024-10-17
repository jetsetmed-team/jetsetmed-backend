const jwt = require('jsonwebtoken');
const { ResponseCodes, jwtSecret } = require('../../constants');


const authMiddleware = (req, res, next) => {
  console.log("Auth middleware called");
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log(token);

  if (!token) {
    console.log("No token provided");
    return res.status(ResponseCodes.UNAUTHORIZED).json({
      code: ResponseCodes.UNAUTHORIZED,
      message: 'No token provided',
      success: false
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    console.log("Token verified, user:", decoded);
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(ResponseCodes.UNAUTHORIZED).json({
      code: ResponseCodes.UNAUTHORIZED,
      message: 'Invalid token',
      success: false
    });
  }
};

module.exports = authMiddleware;
