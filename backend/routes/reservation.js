const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation")
router.get("/:userId",reservationController.getuserRooms)

module.exports=router;