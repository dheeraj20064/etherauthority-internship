const mongoose = require("mongoose");

const InternSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true
    },
    walletAddress: {
        type: String,
        required: [true, "Wallet address is required"],
        unique: true
    },
    course: {
        type: String,
        default: "Web3+AI"
    },
    status: {
        type: String,
        enum: ["active", "completed", "inactive"],
        default: "active"
    },
    tasksCompleted: {
        type: Number,
        default: 0
    },
    tokensEarned: {
        type: Number,
        default: 0
    },
    githubProfile: {
        type: String
    },
    linkedinProfile: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Intern", InternSchema);
