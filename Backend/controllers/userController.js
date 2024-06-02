import asyncHandler from "../middleware/asyncHandler.js"
import Roles from "../models/rolesModel.js";
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';

//@desc auth user & get token
//@route POST/api/users/login
//@access Public
const authUser = asyncHandler( async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });

  if (user && (await user.matchPassword(password))) {
    // Fetch the user's role
    const role = await Roles.findById(user.rolesId);

    generateToken(res, user._id);
    let obj = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      role: role.name, // role.name / isAdmin
      permissions: role.permissions
    }

    console.log(generateToken, 'gentoken')
    if (user._doc.isAdmin) {
      obj.isAdmin = user._doc.isAdmin
    }
    res.json(obj);
  } else {
    res.status(401).json({error: true, message: 'Invalid email or password'});
    // throw new Error('Invalid email or password');
  }
})

export { authUser }