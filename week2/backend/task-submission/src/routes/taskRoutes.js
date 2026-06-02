const express = require("express");
const router = express.Router();
const {
    submitTask,
    getAllTasks,
    getTasksByIntern,
    updateTaskStatus,
    deleteTask
} = require("../controllers/taskController");

router.post("/submit", submitTask);
router.get("/", getAllTasks);
router.get("/intern/:internId", getTasksByIntern);
router.put("/:id", updateTaskStatus);
router.delete("/:id", deleteTask);

module.exports = router;
