import asyncHandler from "../middleware/asyncHandler.js";
import Transfer from "../models/transfersModel.js";
import User from "../models/userModel.js";

//@desc create transfer
//@route POST/api/transfers
//@access private
const createTransfer = asyncHandler(async (req, res) => {
    const { transferFrom, transferTo, transferSum, transferToId, userOf } = req.body;

    const userTo = await User.findOne({ userName: transferTo });
    const userFrom = await User.findOne({ userName: transferFrom }).lean();
    console.log('Is Admin:', userFrom.isAdmin);

    if (userTo && userFrom) {
        if (userFrom.isAdmin || userFrom.credits >= transferSum) {
            const transfer = await Transfer.create({
                transferFrom,
                transferTo,
                transferSum,
                transferToId,
                userOf
            });

            await User.findOneAndUpdate(
                { userName: transferTo },
                { $inc: { credits: transferSum } },
                { new: true }
            );

            if (!userFrom.isAdmin) {
                await User.findOneAndUpdate(
                    { userName: transferFrom },
                    { $inc: { credits: -transferSum } },
                    { new: true }
                );
            }

            res.status(201).json({
                transferFrom: transfer.transferFrom,
                transferTo: transfer.transferTo,
                transferSum: transfer.transferSum,
                transferToId: transfer.transferToId,
                userOf: transfer.userOf
            });
        } else {
            res.status(403).json({ message: "Skeni kreditsa te mjaftueshme" });
        }
    } else {
        res.status(400).json({ message: "Skeni kreditsa te mjaftueshme" });
    }
});






//@desc fetches all transfers
//@route GET/api/transfers/:id?isAdmin=value
//@access private
const getTransfers = asyncHandler(async (req, res) => {
    const loggedInUser = await User.findById(req.user._id).populate('rolesId');
  
    let query;
    if (loggedInUser.rolesId.name === 'Player') {
      query = Transfer.find({ transferToId: req.user._id });
    } else if (req.query.isAdmin === 'true') {
      query = Transfer.find({});
    } else {
      query = Transfer.find({ userOf: req.params.id });
    }
  
    const transfers = await query.sort({ createdAt: -1 });
    res.json(transfers);
  });
  



export { createTransfer, getTransfers }