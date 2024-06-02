import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';
import Roles from '../models/rolesModel.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(404).json({error: true, message: 'Not authorized, token failed!'});
      // throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(404).json({error: true, message: 'Not authorized, no token!'});
    // throw new Error('Not authorized, no token');
  }
});

// Role-based authorization middleware
const authorize = (action, resource) => {
  return asyncHandler(async (req, res, next) => {
   
    if (req.user._doc.isAdmin) {
    return next()
   }

    const userRole = await Roles.findById(req.user.rolesId);

      if(userRole?.permissions?.[resource]?.[action]){
      next();
    } else {
      res.status(401).json({error: true, message: 'You have no permission to this process!'})
      // throw new Error(`Not authorized as ${userRole.name}`);
    }
  });
};


export { protect, authorize };
