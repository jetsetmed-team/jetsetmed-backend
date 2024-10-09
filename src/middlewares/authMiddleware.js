const jwt = require('jsonwebtoken');
const { jwtSecret, ResponseCodes } = require('../../constants');
const User = require('../models/User');

// Middleware to verify authentication
const verifyAuth = async (req, res, next) => {
  let authToken = req.headers['authorization']?.replace("Bearer ", "");
  // Check if authToken exists
  if (!authToken) { 
    return res.status(ResponseCodes.UNAUTHORIZED).json({ code: ResponseCodes.UNAUTHORIZED, success: false, message: "Invalid token please login again" });
    }
  console.log('REq header token ', authToken);
  try {
    // Verify the authentication token
    const decodedToken = jwt.verify(authToken, jwtSecret);
    console.log('decoed toke ',  decodedToken);
    if(decodedToken.user.id){
      // Extract _id from the decoded token and attach it to the request object
      const user = await User.findById(decodedToken.user.id);
      if(!user){
        return res.status(ResponseCodes.UNAUTHORIZED).json({ code: ResponseCodes.UNAUTHORIZED, success: false, message: "Invalid token please login again" });
      }
      req.user_id = decodedToken.user.id;
      console.log('REQ userid ', decodedToken.user.id);
      // Proceed to the next middleware or route handler
      next();
    }
  } catch (error) {
    console.error('Error verifying authentication token:', error);
    res.status(400).json({ success: false, message: 'Invalid token, please login again', code: 498 });
  }
};

module.exports =  verifyAuth ;