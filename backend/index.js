const express = require("express");
const dotenv = require("dotenv");
const appRoutes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

const app = express();
const Dburl = process.env.DB_URL;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
const port = process.env.PORT || 3001;

app.use("/api", appRoutes);
app.listen(port, () => {
  mongoose
    .connect(Dburl)
    .then(console.log("Database connected successfully"))
    .catch((err) => console.log(err));
  console.log("app is running on port", port);
});
