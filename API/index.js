const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const carsRouter = require("../Routes/apiCars");
const usersRoutes = require("../Routes/apiusers");
const bookingRoutes = require("../Routes/bookingRoutes");
const app = express();

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());

app.use("/api/v1/cars", carsRouter);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
