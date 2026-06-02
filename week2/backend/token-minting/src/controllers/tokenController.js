const Token = require("../models/Token");

exports.mintToken = async (req, res, next) => {
    try {
        const {
            internId, walletAddress, tokenType,
            tokenName, amount, contractAddress,
            transactionHash, blockNumber, reason
        } = req.body;

        const token = await Token.create({
            internId, walletAddress, tokenType,
            tokenName, amount, contractAddress,
            transactionHash, blockNumber, reason,
            status: "minted",
            mintedAt: Date.now()
        });

        res.status(201).json({
            success: true,
            message: "Token minted and recorded",
            data: token
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllTokens = async (req, res, next) => {
    try {
        const tokens = await Token.find();
        res.json({
            success: true,
            count: tokens.length,
            data: tokens
        });
    } catch (error) {
        next(error);
    }
};

exports.getTokensByIntern = async (req, res, next) => {
    try {
        const tokens = await Token.find({
            internId: req.params.internId
        });
        res.json({ success: true, data: tokens });
    } catch (error) {
        next(error);
    }
};

exports.getTokensByWallet = async (req, res, next) => {
    try {
        const tokens = await Token.find({
            walletAddress: req.params.walletAddress
        });
        res.json({ success: true, data: tokens });
    } catch (error) {
        next(error);
    }
};

exports.updateTokenStatus = async (req, res, next) => {
    try {
        const token = await Token.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json({
            success: true,
            message: "Token status updated",
            data: token
        });
    } catch (error) {
        next(error);
    }
};
