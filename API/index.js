import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" Error connecting to MongoDB:", err));

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

export default app;
