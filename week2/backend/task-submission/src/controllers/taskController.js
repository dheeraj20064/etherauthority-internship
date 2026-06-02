const Task = require("../models/Task");

exports.submitTask = async (req, res, next) => {
    try {
        const {
            title, description, internId,
            internWallet, weekNumber, category,
            submissionLink, githubLink, contractAddress
        } = req.body;

        const task = await Task.create({
            title, description, internId,
            internWallet, weekNumber, category,
            submissionLink, githubLink, contractAddress,
            status: "submitted",
            submittedAt: Date.now()
        });

        res.status(201).json({
            success: true,
            message: "Task submitted successfully",
            data: task
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};

exports.getTasksByIntern = async (req, res, next) => {
    try {
        const tasks = await Task.find({
            internId: req.params.internId
        });
        res.json({ success: true, data: tasks });
    } catch (error) {
        next(error);
    }
};

exports.updateTaskStatus = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { 
                status: req.body.status,
                mentorFeedback: req.body.mentorFeedback,
                score: req.body.score
            },
            { new: true }
        );
        res.json({
            success: true,
            message: "Task updated",
            data: task
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "Task deleted"
        });
    } catch (error) {
        next(error);
    }
};
