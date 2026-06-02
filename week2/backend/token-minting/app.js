const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const tokenRoutes = require("./src/routes/tokenRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/tokendb")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error:", err));

app.use("/api/tokens", tokenRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Token Minting API running" });
});

app.use(errorHandler);

module.exports = app;
