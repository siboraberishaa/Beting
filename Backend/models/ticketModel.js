import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    ticketId: {
        type: Number,
        required: true,
        unique: true
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
    }

},{
    timestamps: true,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
