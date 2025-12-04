const mongoose = require("mongoose");
const Booking = require("../../Models/bookingModel");
const Car = require("../../Models/cars");

const normalizeCarId = async (car) => {
  if (mongoose.isValidObjectId(car)) return car;

  const externalId = String(car);
  const foundCar = await Car.findOne({ externalId }).select("_id");

  if (!foundCar) return null;
  return foundCar._id;
};

// Create booking
const createBooking = async (req, res, next) => {
  try {
    const { user, car, startDate, endDate, totalPrice } = req.body;

    const carId = await normalizeCarId(car);
    if (!carId) {
      return res
        .status(400)
        .json({ message: "Invalid car reference provided" });
    }

    const booking = await Booking.create({
      user,
      car: carId,
      startDate,
      endDate,
      totalPrice,
    });

    res.status(201).json({ message: "Booking created", booking });
  } catch (error) {
    next(error);
  }
};

// Get all bookings
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("user car");
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// Get single booking
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("user car");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

// Update booking
const updateBooking = async (req, res, next) => {
  try {
    // If client is updating car, normalize it the same way as create
    if (req.body.car !== undefined) {
      const carId = await normalizeCarId(req.body.car);
      if (!carId) {
        return res
          .status(400)
          .json({ message: "Invalid car reference provided" });
      }
      req.body.car = carId;
    }

    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking updated", booking });
  } catch (error) {
    next(error);
  }
};

// Delete booking
const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
