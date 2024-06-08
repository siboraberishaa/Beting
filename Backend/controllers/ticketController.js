import asyncHandler from "../middleware/asyncHandler.js";
import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";


async function randomString(length) {
    let result = 0;
    do {
        var code = '';
        for (var i = 0; i < length; i++) {
            code += Math.floor(Math.random() * 10); 
        }
        result = await Ticket.find({ticketId: code});
    } while (result.length > 0);

    return code;
}

//@desc create a new ticket
//@route POST/api/tickets
//@access Public
const createTicket = asyncHandler(async (req, res) => {
    const { userName, ticketWin, playedSum } = req.body;

    // Find the user
    const user = await User.findOne({ userName: userName });

    // Check if the user's credits are 0
    if (user.credits === 0) {
        res.status(400);
        throw new Error('Insufficient credits');
    }

    const ticketId = await randomString(10); // generates a unique 10-digit numeric ID

    const ticket = await Ticket.create({
        ticketId,
        userName,
        ticketWin,
        playedSum
    });

    if (ticket) {
        // Update the user's credits
        await User.findOneAndUpdate(
            { userName: userName }, 
            { $inc: { credits: -playedSum } },
            { new: true } // This option returns the updated document
        );

        res.status(201).json({
            _id: ticket._id,
            ticketId: ticket.ticketId,
            userName: ticket.userName,
            ticketWin: ticket.ticketWin,
            playedSum: ticket.playedSum
        });
    } else {
        res.status(400);
        throw new Error('Invalid ticket data');
    }
});



//@desc fetches all tickets
//@route GET/api/tickets
//@access private
const getTickets = asyncHandler( async (req, res) => {
    const tickets = await Ticket.find();
    res.json(tickets);
  });
  

export { createTicket, getTickets }
    

