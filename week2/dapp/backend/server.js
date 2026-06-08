require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const internRoutes = require("./routes/internRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/interns", internRoutes);

// Health check
app.get("/", (req, res) => {
    res.json({ 
        message: "Intern Management API running",
        version: "1.0.0"
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || "Server Error"
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});