const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const AppError = require("./helpers/AppError");
const errorController = require("./controllers/errorController");
const autocompleteRoutes = require("./routes/autocompleteRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const comparablesRoutes = require("./routes/comparablesRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const http = require("http");

const app = express();
app.use(cookieParser());
require("dotenv").config();

app.use(
  cors({
    origin: "*", // Allow all origins (for testing purposes)
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;


app.use("/api/properties", propertyRoutes);
app.use("/api/autocomplete", autocompleteRoutes);
app.use("/api/comparables", comparablesRoutes); 
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});


// Set timeout to 2 minutes (120000 ms)
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
server.timeout = 120000; // Set timeout to 120 second
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(errorController);