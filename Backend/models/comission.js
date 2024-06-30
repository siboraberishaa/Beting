import mongoose from "mongoose";

const comissionSchema = mongoose.Schema({
    agentId: {
        type: String,
        required: true
    },
    commissionPercentage: {
        type: Number,
        required: true
    },
    playedSum: {
        type: Number,
        required: true
    },
    gamesLength: {
        type: Number,
        required: true
    },
    
},{
    timestamps: true,
});

const Comission = mongoose.model("Comision", comissionSchema);

export default Comission;
