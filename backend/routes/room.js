const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room");
const bookingController = require("../controllers/reservation");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/all-rooms",roomController.getAllRooms);
router.post("/book-room", authMiddleware.verifyToken, bookingController.bookRoom);
module.exports = router;
