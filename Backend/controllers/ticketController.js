import axios from "axios";
import asyncHandler from "../middleware/asyncHandler.js";
import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";
import { createFinance, updateFinanceBasedOnHasWon } from "./financeController.js";
import cron from 'node-cron'
import Comission from "../models/comission.js";

const API_KEY = '700a0b03c1mshad9f4e7a8667720p119614jsnbb6b551e59d3';
const API_HOST = 'bet365-api-inplay.p.rapidapi.com';
const API_URL = `https://${API_HOST}/bet365/get_event_with_markets/`;
let apiCallCount = 0;
const cache = {};


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

  // Check if the user's credits are less than the playedSum
  if (user.credits < playedSum && !user.isAdmin) {
      res.status(403).json({ message: "Skeni kreditsa te mjaftueshme" });
  } else {
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

      const playerOfUser = await User.findById(playerOf);

      if (ticket) {
          // Update the user's credits
          await User.findOneAndUpdate(
              { userName: userName }, 
              { $inc: { credits: -playedSum } },
              { new: true } // This option returns the updated document
          );

          await createFinance(ticket);

          if (playerOfUser.isAgent) {
            // Create a new Commission document
            const comission = await Comission.create({
                ticketType,
                playedSum,
                agentId: playerOf,
                gamesLength: games.length
            });

            if (!comission) {
                console.log('Failed to create commission');
            }
        }

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
          res.status(400).json({ error: true, message: 'Invalid ticket data' });
      }
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
    } else if (req.query.isAdmin === 'true') {
      query = Ticket.find({});
    } else {
      query = Ticket.find({ playerOf: req.params.id });
    }
  
    const tickets = await query.sort({ createdAt: -1 });
    res.json(tickets);
  });


//@desc Update the hasWon field for a game and update finance
//@route POST/api/tickets/:ticketId/games/:gameId
//@access Public
const updateGameHasWon = asyncHandler(async (req, res) => {
    const { ticketId, gameId } = req.params;
    const { hasWon } = req.body;
  
    const ticket = await Ticket.findOne({ ticketId });
  
    if (!ticket) {
      res.status(404).json({ error: true, message: 'Ticket not found' });
      return;
    }
  
    const game = ticket.games.id(gameId);
  
    if (!game) {
      res.status(404).json({ error: true, message: 'Game not found' });
      return;
    }
  
    game.hasWon = hasWon;
  
    await ticket.save();
  
    try {
      await updateFinanceBasedOnHasWon(ticketId);
      console.log('Finance updated successfully');
    } catch (error) {
      console.error('Error updating finance:', error);
    }
  
    res.status(200).json({
      message: 'Game updated successfully and finance updated',
      ticket
    });
  });

    //@desc Update the hasWon field for a game based from score and update finance
    //@access Public
    // Function to update game status based on scores
const updateGameStatus = async () => {
  try {
    const tickets = await Ticket.find({ "games.isOver": false });
    const now = Date.now();

    for (const ticket of tickets) {
      for (const game of ticket.games) {
        if (game.isOver) {
          console.log(`Skipping game with event ID: ${game.eventId} as it is marked as over.`);
          continue;
        }

        const cacheKey = game.eventId;
        const cacheEntry = cache[cacheKey];

        if (cacheEntry && (now - cacheEntry.timestamp) < 60000) { // 1 minute
          console.log(`Using cached result for event ID: ${game.eventId}`);
          updateGameFromCache(game, cacheEntry.data);
        } else {
          await fetchAndUpdateGameStatus(game, cacheKey, now);
        }
      }

      await ticket.save();
      await updateFinanceBasedOnHasWon(ticket.ticketId);
    }

    console.log('Game statuses and finances updated successfully.');
  } catch (error) {
    console.error('Error updating game statuses:', error);
  }
};

const fetchAndUpdateGameStatus = async (game, cacheKey, now) => {
  let success = false;
  let retryCount = 0;
  const maxRetries = 5;
  let delay = 1000; // 1 second

  while (!success && retryCount < maxRetries) {
    try {
      console.log(`Making API request #${apiCallCount + 1}`);
      apiCallCount++;

      const response = await axios.get(`${API_URL}${game.eventId}`, {
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST
        }
      });

      const eventData = response.data;
      if (eventData === "") {
        console.log(`Game with event ID: ${game.eventId} no longer exists.`);
        game.isOver = true;
        game.frequentCheckScheduled = false; // Stop frequent checks
        await game.save(); // Save the change to the database
        success = true;
      } else if (eventData && eventData.score) {
        cache[cacheKey] = {
          timestamp: now,
          data: eventData
        };

        updateGameFromCache(game, eventData);
        success = true;
      } else {
        console.error('Unexpected API response format:', JSON.stringify(response.data, null, 2));
        throw new Error('Unexpected API response format');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        retryCount++;
        console.error(`Rate limit hit, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      } else {
        throw error;
      }
    }
  }
};






const updateGameFromCache = (game, eventDetails) => {
  const [homeScore, awayScore] = eventDetails.score.split(':').map(Number);
  const n2 = game.coefficientPlayed;

  let hasWon = null;

  if ((n2 === '1' && homeScore > awayScore) ||
      (n2 === '2' && awayScore > homeScore) ||
      (n2 === 'X' && homeScore === awayScore)) {
    hasWon = true;
  } else {
    hasWon = false;
  }

  game.hasWon = hasWon;

  const [minutes, seconds] = eventDetails.timer.split(':').map(Number);

  if (minutes >= 80 && !game.frequentCheckScheduled && !game.isOver) {
    console.log(`Game with event ID: ${game.eventId} is approaching 90 minutes. Scheduling frequent checks.`);
    game.frequentCheckScheduled = true;
    scheduleFrequentChecks(game.eventId, 10); // check every 1 minute for the next 10 minutes
  }
};


const scheduleFrequentChecks = (eventId, durationMinutes) => {
  const endTime = Date.now() + durationMinutes * 60000;

  const frequentCheckInterval = setInterval(async () => {
    try {
      const now = Date.now();
      if (now >= endTime) {
        clearInterval(frequentCheckInterval);
        return;
      }
      console.log(`Running frequent check for event ID: ${eventId}`);
      await fetchAndUpdateGameStatus({ eventId }, eventId, now);
      console.log(`Frequent check for event ID: ${eventId} completed successfully`);
    } catch (error) {
      console.error(`Error in frequent checks for game results for event ID: ${eventId}:`, error);
    }
  }, 60000); // every 1 minute
};


  

export { createTicket, getTickets, updateGameHasWon, updateGameStatus }
    

