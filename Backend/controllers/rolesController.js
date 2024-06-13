import { defaultPermissions } from "../constants.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Roles from '../models/rolesModel.js'
import User from "../models/userModel.js";

//@desc fetches all roles
//@route GET/api/roles
//@access Public
const getRoles = asyncHandler( async (req, res) => {
  const roles = await Roles.find({ name: { $ne: 'Super Admin' } });
  res.json(roles);
});

//@desc fetches roles for manager
//@route GET/api/roles/manager
//@access Public
const getRolesForManager = asyncHandler( async (req, res) => {
  const roles = await Roles.find({ name: { $in: ['Agent', 'Player'] } });
  res.json(roles);
});

//@desc fetches roles for agent
//@route GET/api/roles/agent
//@access Public
const getRolesForAgent = asyncHandler( async (req, res) => {
  const roles = await Roles.find({ name: { $in: ['Player'] } });
  res.json(roles);
});



//@desc create a new roles
//@route POST/api/roles
//@access Private Admin
const createRoles = asyncHandler(async (req, res) => {
      const { name = '' } = req.body
      
      const roles = new Roles({
        name,
        user: req.user._id,
      });
      
      
      const createdRoles = await roles.save();
      res.status(201).json(createdRoles);
})





// @desc    Fetch a single roles
// @route   GET /api/roles/:id
// @access  Private/Admin
const getRolesById = asyncHandler(async (req, res) => {
      const roles = await Roles.findById(req.params.id);
    
      if (roles) {
        let defaultsT = {...defaultPermissions};
        Object.keys(defaultsT).forEach(element => {
          if (roles.permissions[element]) {
           defaultsT[element] = roles.permissions[element]
          }

         });
         res.json({ ...roles._doc, permissions : defaultsT});

      } else {
        res.status(404).json({error: true, message: 'Roles not found!'});
        // throw new Error('Roles not found');
      }
    });
    

// @desc    Update a roles
// @route   PUT /api/roles/:id
// @access  Private/Admin
const updateRoles = asyncHandler(async (req, res) => {
  const roles = await Roles.findById(req.params.id);

  if (roles) {
    if (roles.name === 'Agent' && req.body.name && req.body.name !== 'Agent') {
      return res.status(403).json({ error: true, message: "Emri i rolit te agjentit nuk mund te ndryshohet!" });
    }

    if (req.body.name) {
      roles.name = req.body.name;
    }

    roles.permissions = req.body.permissions;
    const updatedRoles = await roles.save();

    res.json({
      _id: updatedRoles._id,
      name: updatedRoles.name,
      permissions: updatedRoles.permissions,
    });
  } else {
    res.status(404).json({error: true, message: 'Roles not found!'});
  }
});


    

// @desc    Delete a roles
// @route   DELETE /api/roles/:id
// @access  Private/Admin
const deleteRoles = asyncHandler(async (req, res) => {

      const roles = await Roles.findById(req.params.id);
      try {
        
      if (roles) {
        await User.updateMany({rolesId: roles._id}, {rolesId: null})
          await roles.deleteOne({_id : roles._id})
          res.status(200).json({message: 'Roles deleted'})
      } else {
        res.status(404).json({error: true, message: 'Roles not found!'});
        // throw new Error('Roles not found');
      }
      } catch (error) {
        res.status(404).json({error: true, message: 'Roles not found!'});
        // throw new Error('Roles not found');
      }
})
  
    


export { getRoles, getRolesForAgent, getRolesForManager, createRoles, updateRoles, deleteRoles, getRolesById }