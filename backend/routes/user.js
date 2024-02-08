const express = require("express");
const router = express.Router();

router.get("/id/bookings",(req,res)=>{
    res.json("Here are all the bookings for the user")
});
module.exports=router;