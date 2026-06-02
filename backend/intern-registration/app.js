const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const internRoutes = require("./src/routes/internRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/interndb")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error:", err));

app.use("/api/interns", internRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Intern Registration API running" });
});

app.use(errorHandler);

module.exports = app;
