import asyncHandler from "../middleware/asyncHandler.js";
import Finance from "../models/financeModel.js";
import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";



export const createFinance = asyncHandler(async (ticket) => {
  const { userName, playedSum, ticketWin, games, playerId, playerOf, ticketId } = ticket;

  const user = await User.findOne({ userName: userName });

  let commissionPercent;
  switch (games.length) {
    case 1:
      commissionPercent = user.commissionS;
      break;
    case 2:
      commissionPercent = user.commission2;
      break;
    default:
      commissionPercent = user.commission3;
      break;
  }

  const commission = playedSum * (commissionPercent / 100);

  const total = ticketWin;

  const finance = await Finance.create({
    player: userName,
    playerId: playerId,
    commission: commission.toFixed(2),
    bet: playedSum,
    total: total.toFixed(2),
    playerOf: playerOf,
    ticketId,
  });

  if (!finance) {
    res.status(404).json({ error: true, message: "failed to create" });
  }

  const registeredByUser = await User.findById(user.registeredBy);

  if (registeredByUser) {
    registeredByUser.credits += commission;

    await registeredByUser.save();
  }
});

export const updateFinanceBasedOnHasWon = asyncHandler(async (ticketId) => {
  const ticket = await Ticket.findOne({ ticketId });

  if (!ticket) {
    throw new Error('Ticket not found');
  }

  const { userName, playedSum, ticketWin, games, playerId, playerOf } = ticket;
  const user = await User.findOne({ userName });

  let commissionPercent;
  switch (games.length) {
    case 1:
      commissionPercent = user.commissionS;
      break;
    case 2:
      commissionPercent = user.commission2;
      break;
    default:
      commissionPercent = user.commission3;
      break;
  }

  const commission = ticketWin * (commissionPercent / 100);
  let total = 0;
  let win = 0;

  // Determine the outcome based on the hasWon field of games
  if (games.every(game => game.hasWon === true)) {
    win = ticketWin - commission;
    total = win;
  } else if (games.some(game => game.hasWon === false)) {
    total = -(ticketWin - commission);
    win = 0;
  } else {
    total = ticketWin - commission;
    win = 0;
  }

  // Update the finance record for this specific ticket
  await Finance.findOneAndUpdate(
    { playerId, player: userName, ticketId },
    {
      commission: commission.toFixed(2),
      bet: playedSum,
      total: total.toFixed(2),
      win: win.toFixed(2),
      playerOf
    },
    { new: true, upsert: true } // Use upsert to create the record if it doesn't exist
  );

  const registeredByUser = await User.findById(user.registeredBy);

  if (registeredByUser) {
    registeredByUser.credits += commission;
    await registeredByUser.save();
  }
});



//@desc fetches all finances
//@route GET/api/finances/:id?isAdmin=value
//@access private
const getFinances = asyncHandler(async (req, res) => {
  const loggedInUser = await User.findById(req.user._id).populate('rolesId'); 

  let query;
  if (loggedInUser.rolesId.name === 'Player') {
    query = Finance.find({ playerId: req.user._id });
  } else if (req.query.isAdmin === 'true') {
    query = Finance.find({});
  } else {
    query = Finance.find({ playerOf: req.params.id });
  }

  const finances = await query.sort({ createdAt: -1 });
  res.json(finances);
});

export { getFinances }





