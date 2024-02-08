const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth")
const bookingRoutes = require("./reservation")


router.use("/bookings",bookingRoutes)
router.post("/login",authController.login);
router.post("/register",authController.register);
module.exports=router;