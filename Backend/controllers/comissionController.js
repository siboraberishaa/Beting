import asyncHandler from "../middleware/asyncHandler.js";
import Comission from "../models/comission.js";
import User from "../models/userModel.js";


// @desc Get all commissions
// @route GET /api/commissions
// @access Public
const getCommissions = asyncHandler(async (req, res) => {
    const commissions = await Comission.find({}).lean();

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