const express = require("express");
const router = express.Router();
const {
    registerIntern,
    getAllInterns,
    getInternById,
    updateIntern,
    deleteIntern
} = require("../controllers/internController");

router.post("/register", registerIntern);
router.get("/", getAllInterns);
router.get("/:id", getInternById);
router.put("/:id", updateIntern);
router.delete("/:id", deleteIntern);

module.exports = router;