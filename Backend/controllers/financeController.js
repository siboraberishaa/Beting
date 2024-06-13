import asyncHandler from "../middleware/asyncHandler.js";
import Finance from "../models/financeModel.js";
import User from "../models/userModel.js";



export const createFinance = asyncHandler(async (ticket) => {
  const { userName, playedSum, ticketWin, games, playerId, playerOf } = ticket;

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

  const commission = ticketWin * (commissionPercent / 100);

  const total = ticketWin - commission;

  const finance = await Finance.create({
    player: userName,
    playerId: playerId,
    commission: commission.toFixed(2),
    bet: playedSum,
    total: total.toFixed(2),
    playerOf: playerOf
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


//@desc fetches all finances
//@route GET/api/finances/:id?isAdmin=value
//@access private
const getFinances = asyncHandler(async (req, res) => {
  const loggedInUser = await User.findById(req.user._id).populate('rolesId'); 

  let query;
  if (loggedInUser.rolesId.name === 'Player') {
    query = Finance.find({ playerId: req.user._id });
  } else if (req.query.isAdmin === 'true' || req.query.isAgent === 'true') {
    query = Finance.find({});
  } else {
    query = Finance.find({ playerOf: req.params.id });
  }

  const finances = await query.sort({ createdAt: -1 });
  res.json(finances);
});

export { getFinances }





