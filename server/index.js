const express = require("express");
const cors = require("cors");
//const dotenv = require("dotenv")
const mongoose = require("mongoose");
const AppError = require("./helpers/AppError");
const errorController = require("./controllers/errorController");


const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
require("dotenv").config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

//app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});


app.listen(port, () => { console.log(`Server running on port ${port}`) });
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(errorController);