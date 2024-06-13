import asyncHandler from "../middleware/asyncHandler.js";
import Transfer from "../models/transfersModel.js";
import User from "../models/userModel.js";

//@desc create transfer
//@route POST/api/transfers
//@access private
const createTransfer = asyncHandler(async (req, res) => {
    const { transferFrom, transferTo, transferSum, transferToId } = req.body;

    const transfer = await Transfer.create({
        transferFrom,
        transferTo,
        transferSum,
        transferToId
    });
    const user = await User.findOne({ userName: transferTo });

    if (user) {
        // Update the user's credits
        await User.findOneAndUpdate(
            { userName: transferTo }, 
            { $inc: { credits: transferSum } },
            { new: true } 
        );
    
        res.status(201).json({
            transferFrom: transfer.transferFrom,
            transferTo: transfer.transferTo,
            transferSum: transfer.transferSum,
            transferToId: transfer.transferToId
        });
    } else {
        res.status(400);
        throw new Error('Invalid transfer data');
    }
    
});

//@desc fetches all transfers
//@route GET/api/transfers
//@access private
const getTransfers = asyncHandler( async (req, res) => {
    const loggedInUser = await User.findById(req.user._id).populate('rolesId');
  
    let transfers;
    if (loggedInUser.rolesId.name === 'Player') {
      transfers = await Transfer.find({ transferToId: req.user._id }).sort({ createdAt: -1 });
    } else {
      transfers = await Transfer.find().sort({ createdAt: -1 });
    }
  
    res.json(transfers);
  });
  



export { createTransfer, getTransfers }