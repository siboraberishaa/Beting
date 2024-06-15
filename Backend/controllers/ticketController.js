import asyncHandler from "../middleware/asyncHandler.js";
import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";
import { createFinance } from "./financeController.js";


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
    const { userName, ticketWin, playedSum, playerOf, playerId, ticketType, games } = req.body;

    // Find the user
    const user = await User.findOne({ userName: userName });

    // Check if the user's credits are 0
    if (user.credits === 0 && !user.isAdmin) {
        res.status(400);
        throw new Error('Insufficient credits');
    }

    const ticketId = await randomString(10); // generates a unique 10-digit numeric ID

    const ticket = await Ticket.create({
        ticketId,
        userName,
        ticketWin,
        playedSum,
        playerOf,
        playerId,
        ticketType,
        games
    });

    if (ticket) {
        // Update the user's credits
        await User.findOneAndUpdate(
            { userName: userName }, 
            { $inc: { credits: -playedSum } },
            { new: true } // This option returns the updated document
        );

        await createFinance(ticket);

        res.status(201).json({
            _id: ticket._id,
            ticketId: ticket.ticketId,
            userName: ticket.userName,
            ticketWin: ticket.ticketWin,
            playedSum: ticket.playedSum,
            playerOf: ticket.playerOf,
            playerId: ticket.playerId,
            ticketType: ticket.ticketType,
            games: ticket.games,
        });
    } else {
        res.status(400);
        throw new Error('Invalid ticket data');
    }
});



//@desc fetches all tickets
//@route GET/api/tickets/:id?isAdmin=value
//@access private
const getTickets = asyncHandler(async (req, res) => {
    const loggedInUser = await User.findById(req.user._id).populate('rolesId'); 
  
    let query;
    if (loggedInUser.rolesId.name === 'Player') {
      query = Ticket.find({ playerId: req.user._id });
    } else if (req.query.isAdmin === 'true' || req.query.isAgent === 'true') {
      query = Ticket.find({});
    } else {
      query = Ticket.find({ playerOf: req.params.id });
    }
  
    const tickets = await query.sort({ createdAt: -1 });
    res.json(tickets);
  });
  
  

export { createTicket, getTickets }
    

