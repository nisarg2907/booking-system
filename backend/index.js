const express = require("express");
const env = require("dotenv");
const appRoutes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
env.config();


const app = express();
const Dburl = process.env.DB_URL;
app.use(cors())
app.use(express.json());
const port = process.env.PORT;

app.use("/api",appRoutes);
app.listen(port,()=>{
    mongoose.connect(Dburl).then(console.log("Database connected successfully")).catch((err)=>console.log(err));
    console.log("app is running on port",port)
})