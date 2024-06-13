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
    // Check if the user is true
    if (user.status) {
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
      if (user._doc.isAgent) {
        obj.isAgent = user._doc.isAgent;
      }
      res.json(obj);
    } else if (!user.status) {
      res
        .status(404)
        .json({
          error: true,
          message:
            "Your account has been disabled. Please contact our support!",
        });
    }
  } else {
    res.status(401).json({ error: true, message: "Invalid username or password" });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");


  const roles = await Roles.find()

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
      registeredBy: user.registeredBy,
      commissionS: user.commissionS,
      commission2: user.commission2,
      commission3: user.commission3,
      roleName: user._doc.roleName, // Add this line
      // isAdmin: user.isAdmin,
    });

  } else {
    res.status(404); /*.json({error: true, message: 'User not found!'});*/
    throw new Error("User not found");
  }
});

// @desc    Get all users or users created by the logged in user
// @route   GET /api/users/get/:id
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const userId = req.params.id; // Get user ID from route parameters
  const isAdmin = req.query.isAdmin === 'true';
  const isAgent = req.query.isAgent === 'true';
  let query;

  console.log(isAdmin, 'isAdm')

  if (isAdmin || isAgent) {
    query = User.find({});
  } else {
    query = User.find({ registeredBy: userId });
  }

  const users = await query.sort({ createdAt: -1 }).select("-password");
  res.json(users);
});




// @desc    Register a new user
// @route   POST /api/users/register
// @access  Private
const registerUser = asyncHandler(async (req, res) => {
  const { userName, password, rolesId, userId } = req.body;

  const userExists = await User.findOne({ userName });

  if (userExists) {
    res.status(400).json({ error: true, message: "User already exists!" });
    // throw new Error('User already exists');
  }

  const user = await User.create({
    userName,
    password,
    rolesId,
    registeredBy: userId,
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

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: true, message: "User not found!" });
    // throw new Error('User not found');
  }
});

// @desc    Update users username
// @route   PUT /api/users/:id/userName
// @access  Private/Admin
const updateUsersUsername = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.userName = req.body.userName || user.userName;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      userName: updatedUser.userName,
    });
  } else {
    res.status(404).json({ error: true, message: "User not found!" });
    // throw new Error('User not found');
  }
});


// @desc    Update users description
// @route   PUT /api/users/:id/description
// @access  Private/Admin
const updateUsersDescription = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.description = req.body.description || user.description;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      description: updatedUser.description,
    });
  } else {
    res.status(404).json({ error: true, message: "User not found!" });
    // throw new Error('User not found');
  }
});

// @desc    Update users commissions
// @route   PUT /api/users/:id/commissions
// @access  Private/Admin
const updateUsersCommissions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate('rolesId');
  const loggedInUser = await User.findById(req.user._id).populate('rolesId');

  if (user && loggedInUser) {
    // Check if the logged-in user is a Super Admin and the user to be updated is a Manager
    if (loggedInUser.rolesId.name === 'Super Admin' && user.rolesId.name === 'Manager') {
      return res.status(403).json({ error: true, message: "Super Admini nuk mundet te ndryshoj komisionin e menagjerit!" });
    }

    user.commissionS = req.body.commissionS || user.commissionS;
    user.commission2 = req.body.commission2 || user.commission2;
    user.commission3 = req.body.commission3 || user.commission3;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      commissionS: updatedUser.commissionS,
      commission2: updatedUser.commission2,
      commission3: updatedUser.commission3,
    });
  } else {
    res.status(404).json({ error: true, message: "User not found!" });
  }
});



// @desc    Change Status of an user
// @route   PUT /api/users/:id/status
// @access  Private
const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.status = req.body.status;

    //save it to the database
    const updatedUser = await user.save();
    //respond with 200 and pass the updatedStatus
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({error: true, message: "user not found"});
  }
});

//@desc logout user & clear cookie
//@route POST/api/users/logout
//@access Private
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
const updateUsersPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Check if old password matches the current password
    if (await user.matchPassword(req.body.oldPassword)) {
      // If it matches, update the password
      user.password = req.body.newPassword;
      await user.save();

      res.json({
        message: "Password updated successfully",
      });
    } else {
      // If it doesn't match, send an error message
      res.status(401).json({ error: true, message: "Invalid old password" });
    }
  } else {
    res.status(404).json({ error: true, message: "User not found!" });
  }
});


export { authUser, getUserProfile, getUsers, registerUser, getUserById, updateUsersUsername, updateUsersDescription, updateUserStatus, logoutUser, updateUsersPassword, updateUsersCommissions }