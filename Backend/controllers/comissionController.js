import asyncHandler from "../middleware/asyncHandler.js";
import Comission from "../models/comission.js";
import User from "../models/userModel.js";


// @desc Get all commissions
// @route GET /api/commissions
// @access Public
const getCommissions = asyncHandler(async (req, res) => {
    // Get the user making the request
    const requestUser = await User.findById(req.user._id);

    let commissions;
    if (requestUser.isAdmin) {
        // If the user is an admin, get all commissions
        commissions = await Comission.find({}).lean();
    } else {
        // If the user is not an admin, only get commissions of agents registered by them
        const agentIds = (await User.find({ registeredBy: requestUser._id })).map(user => user._id);
        commissions = await Comission.find({ agentId: { $in: agentIds } }).lean();
    }

    for (let commission of commissions) {
        const user = await User.findById(commission.agentId);
        commission.userName = user.userName;
    }

    res.json(commissions);
});


// @desc Get all commissions for a specific user
// @route GET /api/commissions/:userId
// @access Public
const getUserCommissions = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const commissions = await Comission.find({ agentId: userId }).lean();

    for (let commission of commissions) {
        const user = await User.findById(commission.agentId);

        commission.userName = user.userName;
    }

    res.json(commissions);
});


export { getCommissions, getUserCommissions }