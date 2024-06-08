import asyncHandler from "../middleware/asyncHandler.js";
import Transfer from "../models/transfersModel.js";
import User from "../models/userModel.js";

//@desc create transfer
//@route POST/api/transfers
//@access private
const createTransfer = asyncHandler(async (req, res) => {
    const { transferFrom, transferTo, transferSum } = req.body;

    const transfer = await Transfer.create({
        transferFrom,
        transferTo,
        transferSum,
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
            transferSum: transfer.transferSum
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
    const transfers = await Transfer.find();
    res.json(transfers);
  });



export { createTransfer, getTransfers }