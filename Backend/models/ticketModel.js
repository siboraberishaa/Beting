import mongoose from "mongoose";


const gamesSchema = mongoose.Schema({
    team1: {
      type: String,
      required: true,
    },
    team2: {
      type: String,
      required: true,
    },
    coefficientPlayed: {
        type: String,
        required: true
    },
    hasWon: {
        type: Boolean,
        default: null
    },
    isOver: {
        type: Boolean,
        default: false
    },
    eventId: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    frequentCheckScheduled: {
        type: Boolean,
        default: false,
      },
  });
  
const ticketSchema = mongoose.Schema({
    ticketId: {
        type: Number,
        required: true,
        unique: true
    },
    playerId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    ticketWin: {
        type: Number,
        required: true,
    },
    playedSum: {
        type: Number,
        required: true
    },
    playerOf: {
        type: String,
    },
    ticketType: {
        type: String,
    },
    games: [gamesSchema]

},{
    timestamps: true,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
