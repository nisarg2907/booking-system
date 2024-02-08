const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room");
const bookingController = require("../controllers/reservation");

router.get("/all-rooms",roomController.getAllRooms);
router.post("/book-room",bookingController.bookRoom);
module.exports = router;