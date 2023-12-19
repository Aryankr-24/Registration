const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: "User",
        },
        amount: {
            type:Number,
            default: 500,
        },
        month: {
            type:Number,
            required:true,
        },
        year: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Payment", paymentSchema);