const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Task title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    internId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Intern",
        required: true
    },
    internWallet: {
        type: String,
        required: true
    },
    weekNumber: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: [
            "smart-contract",
            "react",
            "backend",
            "database",
            "defi",
            "nft",
            "ai"
        ]
    },
    status: {
        type: String,
        enum: [
            "pending",
            "inprogress",
            "submitted",
            "completed",
            "rejected"
        ],
        default: "pending"
    },
    submissionLink: {
        type: String
    },
    githubLink: {
        type: String
    },
    contractAddress: {
        type: String
    },
    mentorFeedback: {
        type: String
    },
    score: {
        type: Number,
        min: 0,
        max: 100
    },
    tokenReward: {
        type: Number,
        default: 0
    },
    submittedAt: {
        type: Date
    },
    completedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
