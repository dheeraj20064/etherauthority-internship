const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
    internId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Intern",
        required: true
    },
    walletAddress: {
        type: String,
        required: [true, "Wallet address is required"]
    },
    tokenType: {
        type: String,
        enum: ["IRT", "TCT", "ATT", "NFT"],
        required: true
    },
    tokenName: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    contractAddress: {
        type: String,
        required: true
    },
    transactionHash: {
        type: String
    },
    blockNumber: {
        type: Number
    },
    network: {
        type: String,
        default: "SecureChain Mainnet"
    },
    chainId: {
        type: Number,
        default: 34
    },
    reason: {
        type: String,
        enum: [
            "task-completion",
            "attendance",
            "reward",
            "certificate",
            "achievement"
        ]
    },
    status: {
        type: String,
        enum: ["pending", "minted", "failed"],
        default: "pending"
    },
    mintedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Token", TokenSchema);
