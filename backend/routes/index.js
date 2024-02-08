const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const roomRoutes = require("./room");

router.get("/",(req,res)=>{
    res.json("Welcome to bookings .com")
});
router.use("/user",userRoutes);
router.use("/room",roomRoutes);
module.exports=router;