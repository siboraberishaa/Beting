import mongoose from "mongoose";

const transferSchema = mongoose.Schema({
    transferFrom: {
        type: String,
        required: true
    },
    transferTo: {
        type: String,
        required: true,
    },
    transferToId: {
        type: String,
        required: true,
    },
    transferSum: {
        type: Number,
        required: true
    }

},{
    timestamps: true,
});

const Transfer = mongoose.model("Transfer", transferSchema);

export default Transfer;
