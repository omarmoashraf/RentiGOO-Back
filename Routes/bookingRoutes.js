const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../Controllers/Bookings/bookingController");

const router = express.Router();

router.post("/", createBooking); // Create
router.get("/", getAllBookings); // Read all
router.get("/:id", getBookingById); // Read one
router.put("/:id", updateBooking); // Update
router.delete("/:id", deleteBooking); // Delete

module.exports = router;
