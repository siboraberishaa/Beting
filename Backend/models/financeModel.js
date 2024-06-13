import mongoose from "mongoose";

const financeSchema = mongoose.Schema({
    player: {
        type: String,
        required: true
    },
    playerId: {
        type: String,
        required: true
    },
    playerOf: {
        type: String,
    },
    commission: {
        type: Number,
        required: true
    },
    bet: {
        type: Number,
        required: true,
    },
    cancelled: {
        type: Number,
        default: 0.00
    },
    win: {
        type: Number,
        default: 0.00
    }, 
    total: {
        type: Number,
        required: true
    },
    
},{
    timestamps: true,
});

const Finance = mongoose.model("Finance", financeSchema);

export default Finance;
