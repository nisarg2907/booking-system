const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const roomRoutes = require("./room");


router.use("/user",userRoutes);
router.use("/room",roomRoutes);
module.exports=router;