import asyncHandler from "../middleware/asyncHandler.js"
import Roles from "../models/rolesModel.js";
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';

//@desc auth user & get token
//@route POST/api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });

  if (user && (await user.matchPassword(password))) {
    // Check if the user is verified
    
      // Fetch the user's role
      const role = await Roles.findById(user.rolesId);

      generateToken(res, user._id);
      let obj = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        role: role.name, // role.name / isAdmin
        permissions: role.permissions,
      };
      if (user._doc.isAdmin) {
        obj.isAdmin = user._doc.isAdmin;
      }
      res.json(obj);
  } else {
    res.status(401).json({ error: true, message: "Invalid username or password" });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  console.log(req.user._id, "requsserid");

  const roles = await Roles.find()
  console.log(roles, 'roles') // Log the roles

  let role = roles.find((item) => item._id.toString() === user._doc.rolesId.toString()) // Convert to string before comparing
  
  if (role) { // Check if role is not undefined
    user._doc.roleName = role.name
  } else {
    console.error('Role not found for user:', user._id);
  }

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      citizenship: user.citizenship,
      country: user.country,
      postCode: user.postCode,
      city: user.city,
      street: user.street,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      credits: user.credits,
      roleName: user._doc.roleName, // Add this line
      // isAdmin: user.isAdmin,
    });

  } else {
    res.status(404); /*.json({error: true, message: 'User not found!'});*/
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users/all
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 }).select("-password");
  res.json(users);
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Private
const registerUser = asyncHandler(async (req, res) => {
  const { userName, password, rolesId } = req.body;

  const userExists = await User.findOne({ userName });

  if (userExists) {
    res.status(400).json({ error: true, message: "User already exists!" });
    // throw new Error('User already exists');
  }

  const user = await User.create({
    userName,
    password,
    rolesId,
    status: true,
  });

  if (user) {
    // Do not automatically log in as the new user
    // Just send back the user data
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      rolesId: user.rolesId,
      message: "User created successfully",
    });
  } else {
    res.status(400).json({ error: true, message: "Invalid user data!" });
    // throw new Error('Invalid user data');
  }
});



export { authUser, getUserProfile, getUsers, registerUser }