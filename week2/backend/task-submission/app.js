const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./src/routes/taskRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/taskdb")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error:", err));

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Task Submission API running" });
});

app.use(errorHandler);

module.exports = app;
