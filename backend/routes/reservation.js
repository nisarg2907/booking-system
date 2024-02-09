const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/:userId",authMidlleware.verifyToken,reservationController.getuserRooms);

module.exports = router;
