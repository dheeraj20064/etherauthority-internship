const Intern = require("../models/Intern");

exports.registerIntern = async (req, res, next) => {
    try {
        const { name, email, walletAddress, course } = req.body;
        const existing = await Intern.findOne({
            $or: [{ email }, { walletAddress }]
        });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Intern already registered"
            });
        }
        const intern = await Intern.create({
            name, email, walletAddress, course
        });
        res.status(201).json({
            success: true,
            message: "Intern registered successfully",
            data: intern
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllInterns = async (req, res, next) => {
    try {
        const interns = await Intern.find();
        res.json({
            success: true,
            count: interns.length,
            data: interns
        });
    } catch (error) {
        next(error);
    }
};

exports.getInternById = async (req, res, next) => {
    try {
        const intern = await Intern.findById(req.params.id);
        if (!intern) {
            return res.status(404).json({
                success: false,
                message: "Intern not found"
            });
        }
        res.json({ success: true, data: intern });
    } catch (error) {
        next(error);
    }
};

exports.updateIntern = async (req, res, next) => {
    try {
        const intern = await Intern.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.json({
            success: true,
            message: "Intern updated",
            data: intern
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteIntern = async (req, res, next) => {
    try {
        await Intern.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "Intern deleted"
        });
    } catch (error) {
        next(error);
    }
};