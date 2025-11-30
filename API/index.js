const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const carsRouter = require("../Routes/apiCars");
const usersRoutes = require("../Routes/apiusers");
const bookingRoutes = require("../Routes/bookingRoutes");
const authRoutes = require("../Routes/auth/auth");
const app = express();

const DB_URL = process.env.DB_URL;

const allowOrigins = [
  "http://localhost:5174/",
  "https://renti-goo.vercel.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowOrigins.find(origin) || !origin) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());

app.use("/api/v1/cars", carsRouter);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
